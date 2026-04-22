<?php
// enviar.php - Script de envio de e-mail para HostGator (PHP Mail)

// Configurações
date_default_timezone_set('America/Sao_Paulo');
$destinatario = "contato@incentivart.com.br"; // Substitua pelo seu e-mail real
$assunto_padrao = "Novo contato via site - Incentivart";
$rate_limit_window = 300; // Janela em segundos
$rate_limit_max_requests = 5; // Máximo de envios na janela

$max_nome_length = 80;
$max_sobrenome_length = 120;
$max_email_length = 254;
$max_telefone_length = 30;
$max_mensagem_length = 800;

function respond_json($http_code, $status, $message) {
    http_response_code($http_code);
    echo json_encode([
        "status" => $status,
        "message" => $message
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function text_length($value) {
    if (function_exists('mb_strlen')) {
        return mb_strlen($value, 'UTF-8');
    }

    return strlen($value);
}

// Cabeçalhos de resposta JSON
header('Content-Type: application/json; charset=UTF-8');

// Verifica se é uma requisição POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';

    // Verificação de Honeypot
    $honeypot = isset($_POST['website']) ? trim($_POST['website']) : '';
    if ($honeypot !== '') {
        respond_json(400, "error", "Requisição inválida.");
    }

    // Limite IP
    $rate_file = __DIR__ . '/logs/rate_limit_' . preg_replace('/[^a-zA-Z0-9_-]/', '_', $ip) . '.log';
    $now = time();
    $window_start = $now - $rate_limit_window;
    $timestamps = [];

    $rate_handle = fopen($rate_file, 'c+');
    if ($rate_handle === false) {
        respond_json(500, "error", "Não foi possível processar o envio agora.");
    }

    if (!flock($rate_handle, LOCK_EX)) {
        fclose($rate_handle);
        respond_json(500, "error", "Não foi possível processar o envio agora.");
    }

    rewind($rate_handle);
    $rate_contents = stream_get_contents($rate_handle);
    if ($rate_contents !== false && trim($rate_contents) !== '') {
        $timestamps = array_map('intval', preg_split('/\R+/', trim($rate_contents)));
    }

    $recent = array_values(array_filter($timestamps, function($ts) use ($window_start) {
        return $ts >= $window_start;
    }));

    if (count($recent) >= $rate_limit_max_requests) {
        flock($rate_handle, LOCK_UN);
        fclose($rate_handle);
        respond_json(429, "error", "Muitas tentativas. Aguarde alguns minutos e tente novamente.");
    }

    $recent[] = $now;
    ftruncate($rate_handle, 0);
    rewind($rate_handle);
    fwrite($rate_handle, implode(PHP_EOL, $recent));
    fflush($rate_handle);
    flock($rate_handle, LOCK_UN);
    fclose($rate_handle);
    
    // Coleta os dados (sem sanitização destrutiva aqui, faremos no output)
    $nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
    $sobrenome = isset($_POST['sobrenome']) ? trim($_POST['sobrenome']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $telefone = isset($_POST['telefone']) ? trim($_POST['telefone']) : '';
    $mensagem = isset($_POST['mensagem']) ? trim($_POST['mensagem']) : '';
    $consentimento = isset($_POST['consentimento']) ? $_POST['consentimento'] : '';

    if (empty($consentimento)) {
        respond_json(400, "error", "É necessário aceitar a política de privacidade.");
    }

    // Validação básica
    if ($nome === '' || $sobrenome === '' || $email === '' || $telefone === '' || $mensagem === '') {
        respond_json(400, "error", "Preencha os campos obrigatórios.");
    }

    if (text_length($nome) > $max_nome_length || text_length($sobrenome) > $max_sobrenome_length) {
        respond_json(400, "error", "Nome ou sobrenome excede o tamanho permitido.");
    }

    if (text_length($email) > $max_email_length) {
        respond_json(400, "error", "E-mail excede o tamanho permitido.");
    }

    if (text_length($telefone) > $max_telefone_length) {
        respond_json(400, "error", "Telefone excede o tamanho permitido.");
    }

    if (text_length($mensagem) > $max_mensagem_length) {
        respond_json(400, "error", "Mensagem excede o tamanho permitido.");
    }

    // Validação de E-mail (segurança contra Header Injection)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond_json(400, "error", "E-mail inválido.");
    }

    $telefone_digits = preg_replace('/\D+/', '', $telefone);
    if (!preg_match('/^[0-9+()\s-]+$/', $telefone) || strlen($telefone_digits) < 10 || strlen($telefone_digits) > 13) {
        respond_json(400, "error", "Telefone inválido.");
    }

    // Segmentos
    $segmento_map = [
        'teatro' => 'Teatro',
        'musica' => 'Música',
        'audiovisual' => 'Audiovisual',
        'outros' => 'Outros'
    ];
    $segmento_input = isset($_POST['segmento']) ? $_POST['segmento'] : [];
    $segmentos_limpos = [];

    if (!is_array($segmento_input)) {
        $segmento_input = [$segmento_input];
    }

    foreach ($segmento_input as $item) {
        $segmento_key = trim((string) $item);
        if (isset($segmento_map[$segmento_key])) {
            $segmentos_limpos[] = $segmento_map[$segmento_key];
        }
    }

    $segmentos_limpos = array_values(array_unique($segmentos_limpos));
    $segmento_str = !empty($segmentos_limpos)
        ? implode(', ', array_map(function($item) {
            return htmlspecialchars($item, ENT_QUOTES, 'UTF-8');
        }, $segmentos_limpos))
        : 'Não informado';

    // Sanitização para Output (Previne XSS / Injeção de HTML no e-mail)
    $nome_safe = htmlspecialchars($nome, ENT_QUOTES, 'UTF-8');
    $sobrenome_safe = htmlspecialchars($sobrenome, ENT_QUOTES, 'UTF-8');
    $email_safe = htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); // Apenas para exibição no corpo
    $telefone_safe = htmlspecialchars($telefone, ENT_QUOTES, 'UTF-8');
    $mensagem_safe = nl2br(htmlspecialchars($mensagem, ENT_QUOTES, 'UTF-8'));

    // Monta o corpo do e-mail
    $corpo_email = "
    <html>
    <head>
      <title>Novo Contato do Site</title>
    </head>
    <body>
      <h2>Novo Contato Recebido</h2>
      <p><strong>Nome:</strong> $nome_safe $sobrenome_safe</p>
      <p><strong>E-mail:</strong> $email_safe</p>
      <p><strong>Telefone:</strong> $telefone_safe</p>
      <p><strong>Segmento de Interesse:</strong> $segmento_str</p>
      <hr>
      <h3>Mensagem:</h3>
      <p>$mensagem_safe</p>
      <hr>
      <p><small>Enviado em: " . date("d/m/Y H:i:s") . "</small></p>
    </body>
    </html>
    ";

    $email_header = str_replace(["\r", "\n"], '', $email);

    // Cabeçalhos do e-mail
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Site Incentivart <no-reply@incentivart.com.br>" . "\r\n"; // Use um e-mail do seu domínio
    $headers .= "Reply-To: $email_header" . "\r\n";

    // Tenta enviar
    if (mail($destinatario, $assunto_padrao, $corpo_email, $headers)) {
        respond_json(200, "success", "E-mail enviado com sucesso!");
    } else {
        respond_json(500, "error", "Falha ao enviar e-mail.");
    }

} else {
    respond_json(405, "error", "Método não permitido.");
}
?>
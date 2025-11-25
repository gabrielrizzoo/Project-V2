<?php
// enviar.php - Script de envio de e-mail para HostGator (PHP Mail)

// Configurações
$destinatario = "contato@incentivart.com.br"; // Substitua pelo seu e-mail real
$assunto_padrao = "Novo contato via site - Incentivart";

// Cabeçalhos de resposta JSON
header('Content-Type: application/json');

// Verifica se é uma requisição POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Coleta os dados (sem sanitização destrutiva aqui, faremos no output)
    $nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
    $sobrenome = isset($_POST['sobrenome']) ? trim($_POST['sobrenome']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $telefone = isset($_POST['telefone']) ? trim($_POST['telefone']) : '';
    $mensagem = isset($_POST['mensagem']) ? trim($_POST['mensagem']) : '';
    
    // Validação de E-mail (segurança contra Header Injection)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "E-mail inválido."]);
        exit;
    }

    // Segmentos
    $segmento_input = isset($_POST['segmento']) ? $_POST['segmento'] : [];
    if (is_array($segmento_input)) {
        // Sanitiza cada item do array
        $segmentos_limpos = array_map(function($item) {
            return htmlspecialchars($item, ENT_QUOTES, 'UTF-8');
        }, $segmento_input);
        $segmento_str = implode(", ", $segmentos_limpos);
    } else {
        $segmento_str = htmlspecialchars($segmento_input, ENT_QUOTES, 'UTF-8');
    }
    if (empty($segmento_str)) $segmento_str = 'Não informado';

    // Validação básica
    if (empty($nome) || empty($email) || empty($mensagem)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Preencha os campos obrigatórios."]);
        exit;
    }

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

    // Cabeçalhos do e-mail
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Site Incentivart <no-reply@incentivart.com.br>" . "\r\n"; // Use um e-mail do seu domínio
    $headers .= "Reply-To: $email" . "\r\n";

    // Tenta enviar
    if (mail($destinatario, $assunto_padrao, $corpo_email, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "E-mail enviado com sucesso!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Falha ao enviar e-mail."]);
    }

} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método não permitido."]);
}
?>
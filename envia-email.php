<?php

    $json = file_get_contents('php://input');
    $json = json_decode($json);

    // Email que será respondido
    $nome = $json->nome;
    $replyto = $json->email; 
    $mensagem_form = $json->mensagem;
    $telefone = $json->telefone;

    /* Destinatário e remetente - EDITAR SOMENTE ESTE BLOCO DO CÓDIGO */
    $to = "contato@gabrielcamargo.dev";
    $remetente = "contato@gabrielcamargo.dev"; // Deve ser um email válido do domínio

    /* Cabeçalho da mensagem  */
    $boundary = "XYZ-" . date("dmYis") . "-ZYX";
    $headers = "MIME-Version: 1.0\n";
    $headers.= "From: $remetente\n";
    $headers.= "Reply-To: $replyto\n";
    $headers.= "Content-type: multipart/mixed; boundary=\"$boundary\"\r\n";  
    $headers.= "$boundary\n"; 

    /* Layout da mensagem  */
    $corpo_mensagem = " 
    <br>Formulário via site
    <br>--------------------------------------------<br>
    <br><strong>Nome:</strong> $nome
    <br><strong>Email:</strong> $replyto
    <br><strong>Telefone:</strong> $telefone
    <br><strong>Mensagem:</strong> $mensagem_form
    <br><br>--------------------------------------------
    ";

    $mensagem = "--$boundary\n"; 
    $mensagem.= "Content-Transfer-Encoding: 8bits\n"; 
    $mensagem.= "Content-Type: text/html; charset=\"utf-8\"\n\n";
    $mensagem.= "$corpo_mensagem\n";

    /* Função que envia a mensagem */ 
    if(mail($to, $assunto, $mensagem, $headers)){
        $resposta = Array(
            'enviado' => true,
        );
    } 
    else {
        $resposta = Array(
            'enviado' => false,
        );
    }

    header("Content-type: application/json");
    $resposta = json_encode($resposta);
    echo $resposta;

?>
<?php

$to = 'max@sevenagesdesign.com';
$subject = 'Photo Order Form';

$form = $_POST['content'];

$message = '<html>';
$message .= '<head>';
$message .= '<link href="//sevenagesdesign.com/clients/wwp/style.css" rel="stylesheet" type="text/css"></link>';
$message .= '</head>';
$message .= '<body>';
$message .= $form;
$message .= '</body></html>';

$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'From: max@sevenagesdesign.com' . "\r\n";
$headers .= 'Reply-To: contact@maxazarcon.com' . "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

mail($to, $subject, strip_tags($message), $headers);

?>
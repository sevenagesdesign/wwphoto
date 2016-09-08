<?php

$to = 'max@sevenagesdesign.com';
$subject = 'Photo Order Form';

$form = $_POST['content'];

$message = '<html>';
$message .= '<body>';
$message .= $form;
$message .= '</body></html>';

$headers = "MIME-Version: 1.0\r\n";
$headers .= "From: max@sevenagesdesign.com\r\n";
$headers .= "Reply-To: contact@maxazarcon.com\r\n";
# $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

mail($to, $subject, strip_tags($message), $headers);

?>
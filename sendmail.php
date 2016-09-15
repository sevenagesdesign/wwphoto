<?php

$to = 'max@sevenagesdesign.com';
$subject = 'Photo Order Form';

$dbt = $_POST['dbt'];
$dbtNum = $_POST['dbtNum'];
$fName = $_POST['fName'];
$lName = $_POST['lName'];
$addr = $_POST['addr'];
$city = $_POST['city'];
$state = $_POST['state'];
$zip = $_POST['zip'];
$p1 = $_POST['p1'];
$p2 = $_POST['p2'];
$p3 = $_POST['p3'];
$email = $_POST['email'];
$ship = $_POST['ship'];
$pay = $_POST['pay'];
$collection = $_POST['collection'];
$alc = $_POST['alc'];
$tax = $_POST['tax'];
$total = $_POST['total'];
$coupon = $_POST['coupon'];

$message = "<html><body>";
$message .= "<p><strong>Debutante:</strong> $dbt</p> \r\n";
$message .= "<p><strong>Debutante #:</strong> $dbtNum</p><br><br> \r\n";
$message .= "\r\n";
$message .= "<h3>Ship to:</h3> \r\n";
$message .= "\r\n";
$message .= "$fName $lName<br> \r\n";
$message .= "$addr<br>\r\n";
$message .= "$city, $state $zip<br><br> \r\n";
$message .= "\r\n";
$message .= "Phone: ($p1) $p2-$p3<br> \r\n";
$message .= "Email: $email<br><br> \r\n";
$message .= "\r\n";
$message .= "<strong>Collected form data:</strong> \r\n";
$message .= "\r\n";
$message .= "Package Selections:\r\n";
$message .= $collection;
$message .= "\r\n";
$message .= "A La Carte Selections:\r\n";
$message .= $alc;
$message .= "\r\n";
$message .= "Payment method: $pay \r\n";
$message .= "Pickup option: $ship \r\n";
$message .= "\r\n";
$message .= "Tax: $tax \r\n";
$message .= "<em>Coupon:</em> $coupon \r\n";
$message .= "Total: $total";
$message .= "</body></html>";

$headers = "MIME-Version: 1.0 \r\n";
$headers .= "From: $fName $lName <$email> \r\n";
$headers .= "Reply-To: $email \r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

mail($to, $subject, strip_tags($message), $headers);

?>
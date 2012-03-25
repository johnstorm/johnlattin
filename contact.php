<?php
// multiple recipients
ob_start();
$to  = 'salim_d83@hotmail.com';
$from = 'salim_d83@hotmail.com';

if($_GET['email'] == '' or $_GET['message'] == '' or $_GET['name'] == ''){

	if(isset($_GET['type']) and $_GET['type'] == 'normal'){
		header('Location: contact-response.php?msg=mf');
		ob_end_flush();
		exit;
	}else{
  	echo "<span class='error'>Fields with (*) are required.</span>";
  	exit;
	}
}

// subject
$name = $_GET['name'];
$email = $_GET['email'];
$phone = $_GET['phone'];
$occupation = $_GET['occupation'];
$message = $_GET['message'];


// message
$subject = 'your website - Client Contact Form';
$message = "
<html>
<head>
  <title>Client Contact Form</title>
</head>
<body>
  <p>{$message}</p>
  <ul style='list-style:none; margin:20px; color:#666'>
    <li><span style='color:#999'>-Name:</span>$name</li>
    <li><span style='color:#999'>-Phone:</span>$phone</li>
    <li><span style='color:#999'>-Occupation:</span>$occupation</li>
    <li><span style='color:#999'>-email:</span>$email</li>
  </ul>
</body>
</html>
";

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
//$headers .= "To: <{$to}>" . "\r\n";
$headers .= "From: $name({$subject}) <$from>" . "\r\n";
$headers .= "Cc: {$to}". "\r\n";
$headers .= "Bcc: {$to}" . "\r\n";
// Mail it
$mail_sent = @mail($to, $subject, $message, $headers);

if($mail_sent){
	if(isset($_GET['type']) and $_GET['type'] == 'normal'){
		header('Location: contact-response.php?msg=s');
		ob_end_flush();
	}
  echo "Your message has been sent, thank you.";
  exit;
}else{
	if(isset($_GET['type']) and $_GET['type'] == 'normal'){
		header('Location: contact-response.php?msg=ns');
		ob_end_flush();
	}
  echo "<span class='error'>We couldn't send your message please try again, thank you.</span>";
  exit;
}
?>

<!DOCTYPE html>
<head>
<title>
	Quotes - Hastings Carpet Cleaning
</title>
	<link rel="stylesheet" type="text/css" href="styles.css">
	<link rel="stylesheet" type="text/css" media="only screen and (max-width: 480px), only screen and (max-device-width: 480px)" href="/blank.css" />
	<meta name="viewport" content="width=device-width">
	<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-12658383-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</head>
<body>
	

	<div id="header">
		<a href="index.html"><img src="static/hcctitle.png"></a>
	</div>
	
	<div id="nav">
		<a href="index.html">About Us</a> | <a href="services.html">Services</a> | <a href="quotes.html">Quotes</a> | <a href="contact.html">Contact</a>
	</div>
	
	<div id="context">
		<div id="wrap">
		
		<div id="content">
				<p>
				
<?php
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
	echo 'You did not include a valid email address! We need an email address to be able to reply to your quote request.<br><br><FORM><INPUT TYPE="button" VALUE="Back" onClick="history.go(-1);return true;"></FORM>';
} else {


date_default_timezone_set('Australia/Sydney');
$to = "quotes@hastingscarpetcleaning.com.au";
$subject = "Quote - " . date('m/d/Y h:i:s a');

$empty = "";
$endoflease = "";
$stains = "";
$pets = "";

if ($_POST['empty'] == "yes") $empty = "\n\tHouse is empty (unfurnished)";
if ($_POST['endoflease'] == "yes") $endoflease = "\n\tEnd of lease";
if ($_POST['stains'] == "yes") $stains = "\n\tStains or problem areas";
if ($_POST['petstains'] == "yes") $petstains = "\n\tPet/urine stains";
if ($_POST['pets'] == "yes") $pets = "\n\tPets";


$message = "Name: " . $_POST['name'] . 
			"\nStreet Name: " . $_POST['street'] .
			"\nCarpet type: " . $_POST['carpettype'] . 
			"\nRooms to be Cleaned: " . $_POST['rooms'] .
			"\nLevel of Soiling: " . $_POST['soiling'] .
			"\nAdditional Information: " . $empty . $endoflease . $stains . $pets . $petstains .
			"\nDate Required/Comments: " . $_POST['datecomments'];
$email = $_POST['email'];
$headers = "From: $email";
$sent = mail($to, $subject, $message, $headers);
if ($sent) {
	print "Quote successfully submitted. You will receive a quote ASAP.";
} else {
	print 'Error in sending quote! Try again.<br><br><FORM><INPUT TYPE="button" VALUE="Back" onClick="history.go(-1);return true;"></FORM>';
	}
}
?>

</p>
				
				
			</div>
			<div id="footer">
				Hastings Carpet Cleaning<br>
				<a href="privacypolicy.html">Privacy Policy</a> | <a href="terms.html">Terms and Conditions</a><br>
			</div>		
		</div>
	</div>

	
	
</body>
</html>
<?php

	$backButton = '<br><br><form class="backbutton"><input type="button" value="Back" onClick="history.go(-1); return true;"></form>';
	$error = null;
	$success = null;

	if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
		$error = "You did not include a valid email address. We need an email address to be able to reply to your quote request." . $_POST["email"];
	} else {
		date_default_timezone_set('Australia/Sydney');
		$to = "quotes@hastingscarpetcleaning.com.au";
		$subject = "Quote - " . date('m/d/Y h:i:s a');

		$email = $_POST["email"];

		$name = htmlentities($_POST["name"]);
		$suburb = htmlentities($_POST["suburb"]);
		$details = htmlentities($_POST["details"]);

		if (!$name) {
			$error = "You did not include your name.";
		} else if (!$suburb) {
			$error = "You did not include your suburb.";
		} else if (!$details) {
			$error = "You did not include any details in your quote request.";
		} else {
			$message = "Name:\t{$name}\nSuburb:\t{$suburb}\nDetails:\n{$details}";

			$headers = "From: {$email}";
			$sent = mail($to, $subject, $message, $headers);

			if ($sent) {
				$success = "Quote successfully submitted. You will receive a quote as soon as possible.";
			} else {
				$error = "Error in sending quote! Please try again.";
			}
		}
	}

	$title = "Request a Quote";
	include "header.php";

	if ($error) {
		echo '<div class="errormessage">', $error, '</div>';
		include "quoteform.php";
	} else if ($success) {
		echo '<div class="errormessage">', $success, '</div>';
	} else {
		echo '<div class="errormessage">Unknown error. Please try submitting the quote again, and if you see this again, contact the administrator.</div>';
		include "quoteform.php";
	}

	include "footer.php";
?>
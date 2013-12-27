<form id="quoteform" method="POST" action="./quotesubmit.php">
	<input type="text" name="name" placeholder="Name" value="<?php if ($_POST["name"]) {echo $_POST["name"];}?>">
	<input type="text" name="suburb" placeholder="Suburb" value="<?php if ($_POST["suburb"]) {echo $_POST["suburb"];}?>">
	<input type="email" name="email" placeholder="Email address" value="<?php if ($_POST["email"]) {echo $_POST["email"];}?>">
	<textarea name="details" placeholder="Details..."><?php if ($_POST["details"]) {echo $_POST["details"];}?></textarea>
	<input type="submit" id="submitbutton" value="Request a quote">
</form>
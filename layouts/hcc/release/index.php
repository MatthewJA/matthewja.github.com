<!DOCTYPE html>
<html>
	<head>
		<title>Hastings Carpet Cleaning</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name="description" content="Looking for a carpet cleaner in Port Macquarie? Hastings Carpet Cleaning services the Port Macquarie area for both commercial and residential carpet cleaning.">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<link rel="stylesheet" type="text/css" href="./static/styles.css">
		<!-- [if lt IE 9]
			<style type="text/css">
				.box {
					filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='static/townbeach_large.jpg', sizingMethod='scale');
					-ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='static/townbeach_large.jpg', sizingMethod='scale')";
				}
			</style>
		<![endif] -->

		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<link href='http://fonts.googleapis.com/css?family=Muli' rel='stylesheet' type='text/css'>

		<style type="text/css">
			#top {
				<?php 
					$images = array("townbeach", "flynnsbeach");
					$alignments = array("center", "right");
					$index = rand(0, 1);
					$backgroundimage = $images[$index];
					$backgroundalignment = $alignments[$index];
				?>
				background-image: url("./static/<?php echo $backgroundimage;?>_large.jpg");
				background-position: <?php echo $backgroundalignment;?>;
			}
		</style>

		<script type="text/javascript">
			var navigationHidden = true;

			$(document).ready(function() {
				$("#floatingnav").fadeOut(0);

				// need to hide toplink if the user scrolls up too far
				var scrollCheck = setInterval(function() {
					var scrollTop = $(window).scrollTop();
					var triggerHeight = $("#top").position().top + $('#top').outerHeight(true);
					if (!navigationHidden) {
						if (scrollTop < triggerHeight) {
							$("#floatingnav").fadeOut("fast");
							navigationHidden = true;
						}
					} else {
						if (scrollTop >= triggerHeight) {
							$('#floatingnav').fadeIn('fast', function() {
								navigationHidden = false;
							});
						}
					}
				}, 250);
			});
		</script>
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
		<div class="box" id="top">
			<div class="whitebox">
				<img src="static/white_fontside.png" class="titleimage" alt="Hastings Carpet Cleaning">
				<div id="nav">
					<a href="#about" class="headinglink aboutlink">About</a> | <a href="#prices" class="headinglink priceslink">Prices</a> | <a href="#contact" class="headinglink contactlink">Contact</a><br>
					<a href="./about.php" class="smallerheadinglink secondaboutlink">More Info</a> | <a href="./faq.php" class="smallerheadinglink faqlink">FAQs</a><br>
					<div class="phonenumbers">Mob: <a href="tel:0431350903">0431 350 903</a> <br> Ph: <a href="tel:0265824391">02 6582 4391</a></div>
				</div>
			</div>
		</div>

		<div class="box" id="about">
			<div class="bigheading"><div class="bigheadingspacer"></div><div class="verticalaligner">Looking for a carpet cleaner in Port Macquarie?</div></div>
			<div class="smallheading"><div class="verticalaligner">You're looking for Hastings Carpet Cleaning.</div></div>
			<div class="iconbox">
				<img src="./static/lighthouseicon.png" alt="Locally owned and operated."><br>
				<span>Locally owned and operated.</span>
			</div>
			<div class="iconbox">
				<img src="./static/efficiencyicon.png" alt="Prompt and efficient."><br>
				<span>Prompt and efficient.</span>
			</div>
			<div class="iconbox">
				<img src="./static/teamicon.png" alt="Family run business."><br>
				<span>Family run business.</span>
			</div><br>
			<div class="smallerheading"><a href="./about.php">Click here to see our services and qualifications.</a></div>
		</div>

		<div class="box" id="prices">
			<div class="bigheading"><div class="bigheadingspacer"></div><div class="verticalaligner">Get your carpets cleaned professionally.</div></div>
			<div class="smallheading"><div class="verticalaligner"></div></div>
			<div class="iconbox">
				<img src="./static/emptyroomsicon.png" alt="Empty rooms up to 18m^2 from $33."><br>
			</div>
			<div class="iconbox">
				<img src="./static/furnishedroomsicon.png" alt="Furnished rooms up to 18m^2 from $35."><br>
			</div>
			<div class="iconbox">
				<img src="./static/stairsicon.png" alt="Stairs from $60."><br>
			</div>
			<div class="smallerheading">10% discount for more than five rooms.</div>
			<div class="smallestheading">Minimum charge $85. Prices estimate only and may vary depending on your carpet condition.</div>
			<div class="smallestheading">GST included.</div>
		</div>

		<div class="box" id="contact">
			<div class="bigheading"><div class="bigheadingspacer"></div><div class="verticalaligner">Call now for a free quote.</div></div>

			<div id="contacts">
				<div class="contactsrow">
					<div class="contact">
						<img src="./static/phoneicon.png" class="contacticon" alt="Phone">
						<span class="contactdetail"><a href="tel:0265824391">02 6582 4391</a></span>
					</div>
					<div class="contact">
						<img src="./static/mobileicon.png" class="contacticon" alt="Mobile">
						<span class="contactdetail"><a href="tel:0431350903">0431 350 903</a></span>
					</div>
				</div>
				<div class="contactsrow">
					<div class="contact">
						<img src="./static/FB-f-Logo__blue_58.png" class="contacticon" alt="Facebook">
						<span class="contactdetail" id="fbcontactdetail"><a href="http://fb.me/hastingscarpetcleaning">hastingscarpetcleaning</a></span>
					</div>
					<div class="contact">
						<img src="./static/twitterlogo64.png" class="contacticon" alt="Twitter">
						<span class="contactdetail"><a href="http://twitter.com/PMQCarpetClean">@PMQCarpetClean</a></span>
					</div>
				</div>
			</div>

			<div class="smallheading"><div class="verticalaligner">Or request a quote online.</div></div>

			<?php include "quoteform.php"; ?>

			<div class="clear"></div>

		</div>

		<div id="floatingnav">
			<a href="#top">Home</a> | <a href="#about">Info</a> | <a href="#prices">Prices</a> | <a href="#contact">Contact</a> | <a href="./faq.php">FAQs</a>
		</div>

	</body>
</html>
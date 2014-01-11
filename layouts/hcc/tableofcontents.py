# Open a file and generate a table of contents for it.
# Output the modified file to stdout.

import re

with open("./release/faq.php") as f:
	text = f.read()

	# Get all the headings.
	headings = re.findall(r"<h2>(.*?)</h2>", text) # I could use BeautifulSoup, but regex is here and convenient.

	# Map the headings to (heading, headingID).
	headingIDs = {heading:re.sub("\W+", "", re.sub(r"\s+", "_", heading.lower())) for heading in headings}

	# Generate the contents table.
	contents = """<ul id="faqindex">\n"""
	for heading in headings:
		content = """\t<li><a href="#{}">{}</a></li>\n""".format(headingIDs[heading], heading)
		contents += content
	contents += """</ul>"""

	# Add IDs to the headings.
	for heading in headings:
		print r"""<h2>{}</h2>""".format(heading) in text
		text = text.replace("""<h2>{}</h2>""".format(heading), """<h2 id="{}">{}</h2>""".format(headingIDs[heading], heading))

	print text
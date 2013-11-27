###
CLASSES
###

class Snake
	# The snake controlled by the player.
	# All display and position values are a percentage of game width.
	constructor: (@x, @y) ->
		# Position.
		@d = 0 # Direction. Angle currently at on the circle.

		# Speed.
		@v = 0.00025 # Percentage points per millisecond, @v = rω; ω = @v/r

		# Circle properties.
		@targetR = 11 # 100%/@r = radius of circle of movement.
		@r = @targetR
		@dr = 2 # Change in @r when a key is pressed. @r should never be 0.


		# Circle centre.
		@x0 = @x - @radius()
		@y0 = @y

		# Image data.
		@colour = 
			snake: "#EFEFEF"
			debug: "#444444"

		@width = 0.015

	radius:-> Math.abs(1/@r)

	move: (dt) ->
		@updateRadius(dt)

		# Advance the snake along its circular path.
		console.log(@v/@radius())
		@d = (@d + @v/@radius() * dt) % (2*Math.PI)
		@x = @radius()*Math.cos(@d) + @x0
		@y = @radius()*Math.sin(@d) + @y0

	updateRadius: (dt) ->
		if @r == @targetR then return

		# Move the radius closer to the target radius.
		r = (@r*4 + @targetR)/5

		# Reposition centre in accordance with the new radius.
		if (@r < 0 and r > 0)
			k = @r/Math.abs(r)
		else if (@r > 0 and r < 0)
			k = Math.abs(@r)/r
		else
			k = @r/r

		# y1 - y = k(y0 - y) [Similarity of triangles]
		# y1 = k (y0 - y) + y
		x1 = k*(@x0-@x) + @x
		y1 = k*(@y0-@y) + @y

		# If the centre swapped sides, we need to move @d to the other side of the circle
		# and reverse the direction of motion.
		if (r < 0 and @r > 0) or (r > 0 and @r < 0)
			@d = (@d + Math.PI) % (2*Math.PI)
			@v = -@v

		# Assign variables.
		@r = r
		@x0 = x1
		@y0 = y1

	turn: (direction) ->
		# Change the radius of the circular path.
		# Direction is +1 for anticlockwise, -1 for clockwise.
		
		# Change radius.
		@targetR = @r - @dr * direction

	draw: (context) ->
		size = context.canvas.width

		# Debug.
		context.lineWidth = @width/10 * size
		context.strokeStyle = @colour.debug
		context.fillStyle = @colour.debug
		context.beginPath()
		context.arc(@x0*size, @y0*size, @width*size/4, 0, 2*Math.PI)
		context.closePath()
		context.fill()
		context.beginPath()
		context.arc(@x0*size, @y0*size, @radius()*size, 0, 2*Math.PI)
		context.closePath()
		context.stroke()

		# Snake head.
		context.fillStyle = @colour.snake
		context.beginPath()
		context.arc(@x*size, @y*size, @width*size, 0, 2*Math.PI)
		context.closePath()
		context.fill()

	handleKeyPress: (key) ->
		switch key
			when 37, 65 # Left arrow, A
				@turn(1)
			when 39, 68 # Right arrow, D
				@turn(-1)

###
HELPER FUNCTIONS
###


###
MAIN FUNCTIONS
###

updateCanvasSize = (canvas, context) ->
	# Make sure the canvas is exactly square and centred.

	# Find the largest possible frame which fits on the screen...
	height = Math.min(window.innerHeight, window.innerWidth)
	width = height

	# ...and make the canvas that size.
	canvas.style.width = "#{width}px"
	canvas.style.height = "#{height}px"
	context.canvas.width = width
	context.canvas.height = height

update = ( ->
	# Update the backend of the game.
	update = (dt, entities) ->
		for entity in entities
			entity.move?(dt)
).call(@)

draw = (->
	# Draw the game to the canvas.

	colour =
		background: "#222222"
		snake: "#EFEFEF"

	draw = (context, entities) ->
		# Clear the screen.
		context.fillStyle = colour.background
		context.fillRect(0, 0, context.canvas.width, context.canvas.height)

		# Draw entities.
		for entity in entities
			entity.draw(context)
).call(@)

getMainLoop = ( (canvas, entities) ->
	# The main game loop.

	# Element variables.
	context = canvas.getContext("2d")

	# Time variables.
	lastUpdate = (new Date()).getTime()

	# Entities.

	mainLoop = (fps) ->
		# Calculate dt and refresh time of last update.
		now = (new Date()).getTime()
		dt = now - lastUpdate
		lastUpdate = now

		# Maintain responsive layout.
		updateCanvasSize(canvas, context)

		# Update the canvas backend.
		update(dt, entities)

		# Update the canvas frontend.
		draw(context, entities)

		# Keep the game running.
		document.title = 1000/dt + " fps" if dt != 0
		setTimeout(mainLoop, 1/fps*1000)
)

start = (->
	# Setup the game and start it running.

	# Element variables.
	canvas = document.getElementById("canvas")

	# Entities.
	entities = []
	entities.push(new Snake(0.5, 0.5))

	handleKeyPress = (e) ->
		# Entities which accept keypresses should handle them appropriately.
		for entity in entities
			entity.handleKeyPress?(e.keyCode)

	start = ->
		canvas.addEventListener("keydown", handleKeyPress, false)
		canvas.focus()
		getMainLoop(canvas, entities)(1000)

).call(@)

start()
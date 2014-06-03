(function() {

	// width = height = 500
	var width = 500, height = 500; // Width and height of simulation in pixels.
	var cellSize = 3; // Size of a cell in pixels.
	var yCellCount = Math.floor(height/cellSize); // Number of cells in the up-down direction.
	var xCellCount = Math.floor(width/cellSize); // Number of cells in the left-right direction.

	// screen = pygame.display.set_mode((width, height))
	var context = $("#canvas").get(0).getContext("2d");

	context.canvas.width = width;
	context.canvas.height = height;

	// I'm going to ignore FPS and just try and run this as fast as possible.
	// fpsclock = pygame.time.Clock()
	// fps = 100

	// def makeBlankGrid():
	// 	return [[0 for i in range(width//5)] for i in range(height//5)]
	function makeBlankGrid() {
		// First, we make a new array of rows. Then we set those rows.
		var grid = new Array(yCellCount);
		for (var i = 0; i < yCellCount; i++) {
			grid[i] = new Array(xCellCount);
		}
		return grid;
	};

	// def neighbours(y,x,grid,state):
	// 	n = 0
	// 	for i in range(-1, 2):
	// 		for ii in range(-1, 2):
	// 			n += grid[(y+i)%ycells][(x+ii)%xcells]
	// 	n = n - state
	// 	return n
	function neighbours(y, x, grid, state) {
		var n = 0;
		for (var i = -1; i < 2; i++) {
			for (var ii = -1; ii < 2; ii++) {
				var yOff = (y+i)%yCellCount;
				if (yOff < 0) {
					yOff = yCellCount + yOff;
				}
				var xOff = (x+ii)%xCellCount;
				if (xOff < 0) {
					xOff = xCellCount + xOff;
				}
				n += grid[yOff][xOff];
			}
		}
		n -= 1;
		return n;
	}

	// def rules(st,n,T,M):
	// 	bolt = math.exp((n+M-4)/T)
	// 	if random.random()>bolt**2/(bolt**2+1):
	// 		return 0
	// 	else:
	// 		return 1
	function rules(state, n, temperature, magnetism) {
		var bolt = Math.exp((n+magnetism-4)/temperature);
		if (Math.random() > bolt*bolt/(bolt*bolt+1)) {
			return 0;
		}
		return 1;
	}

	// def pstate(T,M):
	// 	print("The temperature is",round(T,3),"and the external field is", round(M,3))

	// def thermprop(grid,M):
	// 	U=0
	// 	P=0
	// 	for y, row in enumerate(grid):
	// 		for x, square in enumerate(row):
	// 			state = grid[y][x]
	// 			P = P + (2*state-1)
	// 			n = neighbours(y,x,grid,state)
	// 			U = U + (n+M-4)*(1-2*state)
	// 	print("The internal energy is",round(U,3),"and the polarisation is",round(P,3))
	// grid = makeBlankGrid()
	// ycells = len(grid)
	// xcells = len(grid[0])
	// T=4
	// M=0

	var grid = makeBlankGrid();
	var temperature = 4;
	var magnetism = 0;

	// $(document).keypress(function(e) {
	// 	switch(e.charCode) {
	// 		case 119:
	// 			// w
	// 			console.log("Raising temperature from", temperature);
	// 			temperature = 1.1 * temperature;
	// 			break;
	// 		case 115:
	// 			// s
	// 			temperature = 0.9 * temperature;
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// });

	var paused = false

	function drawGrid(grid) {
		context.fillStyle = "rgb(255, 255, 255)";
		for (var y = 0; y < yCellCount; y++) {
			for (var x = 0; x < xCellCount; x++) {
				if (grid[y][x]) {
					context.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
				}
			}
		}
	};

	function mainLoop() {
		context.fillStyle = "rgb(0, 0, 0)";
		context.fillRect(0, 0, width, height);

		// Update slider-based variables.

		temperature = parseFloat($("#temperature").val());
		$("#tempdisplay").html(temperature+"");
		magnetism = parseFloat($("#magnetism").val());
		$("#magdisplay").html(magnetism+"");

		// Run simulation step.

		if (!paused) {
			var newGrid = makeBlankGrid();
			for (var y = 0; y < yCellCount; y++) {
				for (var x = 0; x < xCellCount; x++) {
					state = grid[y][x];
					n = neighbours(y, x, grid, state);
					newGrid[y][x] = rules(state, n, temperature, magnetism);
				}
			}
			grid = newGrid;
		}

		// while True:
		// 	screen.fill(0x000000)
		// 	for event in pygame.event.get():
		// 		if event.type == QUIT:
		// 			pygame.quit()
		// 			sys.exit()
		// 		elif event.type == MOUSEBUTTONDOWN:
		// 			# update editmode
		// 			mx, my = event.pos
		// 			gx, gy = mx//5, my//5
		// 			editmode = 0 if grid[gy][gx] else 1 # logical not would be nice ~grid[gy][gx]
		// 		elif event.type == KEYDOWN:
		// 			if event.key == K_SPACE:
		// 				paused = not paused
		// 			elif event.key == K_w:
		// 				T = math.sqrt(2)*T
		// 				pstate(T,M)
		// 			elif event.key == K_s:
		// 				T=T/math.sqrt(2)
		// 				pstate(T,M)
		// 			elif event.key == K_q:
		// 				M=M+0.2
		// 				pstate(T,M)
		// 			elif event.key == K_a:
		// 				M=M-0.2
		// 				pstate(T,M)
		// 			elif event.key == K_e:
		// 				thermprop(grid,M)
		// 		elif event.type == UPDATECELLS:
		// 			if not paused:
		// 				newgrid = makeBlankGrid()
		// 				for y, row in enumerate(grid):
		// 					for x, square in enumerate(row):
		// 						state = grid[y][x]
		// 						n = neighbours(y,x,grid,state)
		// 						newgrid[y][x] = rules(state,n,T,M)
		// 				grid = newgrid

			// 	if pygame.mouse.get_pressed()[0]: # left mouse button is down
			// 			mx, my = pygame.mouse.get_pos()
			// 			gx, gy = mx//5, my//5
			// 			grid[gy][gx] = editmode # either add a living or dead cell depending on what was first click on

			// 	for y, row in enumerate(grid): # draw
			// 		for x, square in enumerate(row):
			// 			if grid[y][x]:
			// 				pygame.draw.rect(screen, 0xFFFFFF, (x*5, y*5, 5, 5))

			// 	pygame.display.flip()
			// 	fpsclock.tick(fps)

		drawGrid(grid);

		setTimeout(mainLoop, 0); // Run, run, as fast as you can!
	};
			

	mainLoop();
}).call();
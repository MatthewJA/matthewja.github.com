# Holds all the formulae known to GEM.

define ["Equation"], (Equation) ->

	eq = (lhs, rhs) ->
		return (unique=false) ->
			new Equation(lhs, rhs, unique)

	formulae = {

		# Density

		"line-density":
			name: "Density (line)"
			keywords: ["density", "line", "length", "distance", "width",
				"height", "mass"]
			equation: eq("ρl", "m/l")

		"surface-density":
			name: "Density (surface)"
			keywords: ["density", "surface", "area", "mass"]
			equation: eq("ρA", "m/A")

		"volume-density":
			name: "Density (volume)"
			keywords: ["density", "volume", "mass"]
			equation: eq("ρV", "m/V")

		# Moments of inertia

		"pendulum-moment-of-inertia":
			name: "Moment of inertia (simple pendulum)"
			keywords: ["moment", "of", "inertia", "mass", "radius", "distance",
				"perpendicular", "displacement", "length", "point", "pendulum",
				"simple"]
			equation: eq("I", "m*r**2")

		"rod-end-moment-of-inertia":
			name: "Moment of inertia (rod with end axis)"
			keywords: ["moment", "of", "inertia", "mass", "radius", "distance",
				"perpendicular", "displacement", "length", "rod", "stick",
				"end", "axis", "with", "radius"]
			equation: eq("I", "m*l**2/3")

		"rod-centre-moment-of-inertia":
			name: "Moment of inertia (rod with centre axis)"
			keywords: ["moment", "of", "inertia", "mass", "radius", "distance",
				"perpendicular", "displacement", "length", "rod", "stick",
				"centre", "axis", "with", "radius"]
			equation: eq("I", "m*l**2/12")

		"disc-moment-of-inertia":
			name: "Moment of inertia (disc)"
			keywords: ["moment", "of", "inertia", "mass", "radius", "distance",
				"disc", "disk", "circle"]
			equation: eq("I", "m*r**2/4")

		# Kinematics

		"velocity":
			name: "Velocity"
			keywords: ["velocity", "speed", "distance", "displacement",
				"position", "location", "time"]
			equation: eq("v", "x/t")

		"acceleration":
			name: "Acceleration"
			keywords: ["acceleration", "velocity", "speed", "time"]
			equation: eq("a", "v/t")

		"jerk":
			name: "Jerk"
			keywords: ["jerk", "acceleration", "time"]
			equation: eq("j", "a/t")

		"angular-velocity":
			name: "Angular velocity"
			keywords: ["angular", "velocity", "rotation", "time", "radians",
				"angle"]
			equation: eq("ω", "θ/t")

		"angular-acceleration":
			name: "Angular acceleration"
			keywords: ["angular", "acceleration", "velocity", "rotation",
				"time", "radians", "angle"]
			equation: eq("α", "ω/t")

		# Dynamics

		"momentum":
			name: "Momentum"
			keywords: ["momentum", "mass", "velocity", "inertia"]
			equation: eq("p", "m*v")

		"force":
			name: "Force (Newton's 2nd Law)"
			keywords: ["force", "newton's", "law", "2nd", "mass",
				"acceleration"]
			equation: eq("F", "m*a")

		"impulse":
			name: "Impulse"
			keywords: ["impulse", "change", "momentum", "in", "force", "time"]
			equation: eq("Δp", "F*t")

		"angular-momentum":
			name: "Angular momentum"
			keywords: ["angular", "angle", "momentum", "radians", "rotation",
				"distance", "perpendicular"]
			equation: eq("L", "dp*p")

		"torque":
			name: "Torque"
			keywords: ["torque", "angular", "force", "distance", "moment",
				"perpendicular", "radius", "radial"]
			equation: eq("τ", "dp*F")

		"angular-impulse":
			name: "Angular impulse"
			keywords: ["angular", "angle", "radians", "impulse", "momentum",
				"torque", "moment", "time", "change", "in"]
			equation: eq("ΔL", "τ*t")

		# Energy

		"mechanical-work":
			name: "Mechanical Work"
			keywords: ["mechanical", "work", "energy", "force", "displacement",
				"distance", "movement", "motion", "length", "heat"]
			equation: eq("W", "F*d")

		"expansion-work":
			name: "Expansion Work"
			keywords: ["expansion", "work", "energy", "ideal", "gas",
				"pressure", "volume", "heat", "change", "in"]
			equation: eq("W", "P * ΔV")

		"first-law-of-thermodynamics":
			name: "First Law of Thermodynamics"
			keywords: ["conservation", "of", "energy", "work", "heat",
				"internal", "energy", "first", "law", "thermodynamics"]
			equation: eq("ΔU", "Q - W")

		"power":
			name: "Power"
			keywords: ["power", "time", "energy"]
			equation: eq("P", "E/t")

		"kinetic-energy":
			name: "Kinetic energy"
			keywords: ["kinetic", "energy", "mass", "velocity", "speed"]
			equation: eq("Ek", "1/2 * m * v**2")

		"approximate-gpe":
			name: "Gravitational potential energy (constant g)"
			keywords: ["gravitational", "potential", "energy", "constant",
				"approximate", "mass", "gravity", "height", "distance",
				"acceleration"]
			equation: eq("Ep", "m*g*h")

		"gpe":
			name: "Gravitational potential energy"
			keywords: ["gravitational", "potential", "energy", "mass", "earth",
				"radius", "distance", "displacement", "height", "gravity"]
			equation: eq("Ep", "-\\G*m*M/r")

		# Basic motion

		"projectile-motion-velocity":
			name: "Projectile motion velocity"
			keywords: ["projectile", "motion", "initial", "velocity",
				"final", "time", "acceleration"]
			equation: eq("v", "u + a*t")

		"projectile-motion-displacement":
			name: "Projectile motion displacement"
			keywords: ["projectile", "motion", "displacement", "distance",
				"height", "time", "acceleration"]
			equation: eq("s", "u*t + 1/2 * a * t**2")

		"gravitational-force":
			name: "Gravitational force"
			keywords: ["force", "gravity", "gravitational", "mass", "radius",
				"distance", "height", "earth", "displacement"]
			equation: eq("F", "\\G*m*M/r**2")

	}

	return {

		# Get an equation by name.
		#
		# @param name [String] The name of the equation to return.
		# @param unique [Boolean] Whether to rename the equation's variables.
		# @return [Equation] The equation of the given name.
		getEquation: (name, unique=false) ->
			if name of formulae
				return formulae[name].equation(unique)
			else
				throw new Error("No formula called " + name + " exists.")

		# Return an array of the names of all the formulae.
		#
		# @return [Array<String>] Names of all formulae.
		getAllFormulaNames: ->
			names = []
			for formula of formulae
				names.push(formula)

			return names

		# Return the proper name of an equation.
		#
		# @return [String] Proper name of an equation.
		getName: (name) ->
			if name of formulae
				return formulae[name].name
			else
				throw new Error("No formula called " + name + " exists.")

		# Return the keywords of an equation.
		#
		# @return [Array<String>] Array of keywords.
		getKeywords: (name) ->
			if name of formulae
				return formulae[name].keywords
			else
				throw new Error("No formula called " + name + " exists.")

	}
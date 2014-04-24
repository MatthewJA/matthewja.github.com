(function() {
	function processExpression() {
		var expr = new coffeequate.Equation("Ψ", $("#input").val());
		var uncty = expr.right.getUncertainty();
		$("#output").html("<math><msub><mi>σ</mi><mi>Ψ</mi></msub><mo>=</mo>" + uncty.toMathML() + "</math>");
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	};

	$("#input").keypress(
		function(e){
			var keycode = e.keyCode ? e.keyCode : e.which;
			if (keycode == '13') {
				processExpression();
			}
	});
}).call();
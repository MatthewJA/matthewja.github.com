// Generated by CoffeeScript 1.6.3
(function() {
  define(["coffeequate", "elementTools"], function(CQ, elementTools) {
    var Equation;
    return Equation = (function() {
      function Equation(lhs, rhs) {
        this.lhs = CQ(lhs);
        this.rhs = CQ(rhs);
        this.element = elementTools.makeEquation(this.toMathML());
        this.id = null;
      }

      Equation.prototype.toMathML = function() {
        return "<mrow>" + (this.lhs.toMathML()) + "<mo>=</mo>" + (this.rhs.toMathML()) + "</mrow>";
      };

      return Equation;

    })();
  });

}).call(this);
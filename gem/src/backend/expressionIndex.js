// Generated by CoffeeScript 1.6.3
(function() {
  define(function() {
    var expressions;
    expressions = [];
    return {
      add: function(expression) {
        expressions.push(expression);
        return expressions.length - 1;
      },
      get: function(expressionID) {
        if (expressionID >= expressions.length || expressionID < 0) {
          throw new Error("No expression with ID " + expressionID + " exists.");
        }
        return expressions[expressionID];
      },
      size: function() {
        return expressions.length;
      }
    };
  });

}).call(this);
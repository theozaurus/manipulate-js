beforeEach(function() {
  this.addMatchers({
    toBeEquivalentTo: function(expected){
      var html = this.actual;

      var wrappingElement = document.createElement("div");
      wrappingElement.appendChild(html);

      var string = wrappingElement.innerHTML;

      var notText = this.isNot ? " not" : "";
      this.message = function(){
        return "Expected '" + string + "'" + notText + " to be equivalent to '" + expected + "'";
      };

      return string == expected;
    }
  });
});

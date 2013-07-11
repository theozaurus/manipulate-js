beforeEach(function() {
  this.addMatchers({
    documentBeEquivalentTo: function(expected,options){

      var toString = function(object){
        if(object === null){
          return "";
        }else if(object instanceof Document || object instanceof DocumentFragment){
          return new XMLSerializer().serializeToString(object);
        }
        else{
          return object.toString();
        }
      };

      var toDocument = function(string){
        var doc = document.createDocumentFragment();
        var wrapper = document.createElement("div");
        wrapper.innerHTML = string;
        var size = wrapper.childNodes.length;
        for(var i=0; i < size; i++){
          doc.appendChild(wrapper.childNodes[0]);
        }
        return doc;
      };

      this.message = function () {
        return "Expected " + toString(this.actual) + " to be equivalent to " + toString(expected);
      };

      return EquivalentXml.isEquivalent(this.actual,toDocument(expected),options);
    }
  });

  this.addMatchers(EquivalentXml.jasmine);
});

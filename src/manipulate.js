if ("undefined" == typeof com) { var com = {}; }
if (!com.jivatechnology) { com.jivatechnology = {}; }

(function(){

  var scope = this;

  var Manipulation = function(){};

  Manipulation.prototype.then = function(link){
    this.next = link;
    link.previous = this;
    return link;
  };

  Manipulation.prototype.end = function(){
    if(this.previous){
      return this.previous.end();
    } else {
      return this;
    }
  };

  Manipulation.prototype.convert = function(v){
    return v;
  };

  Manipulation.prototype.render = function(v){
    var result = this.convert(v);
    if(this.next){
      return this.next.render(result);
    } else {
      return result;
    }
  };

  scope.Manipulate = {};
  scope.Manipulate.build = function(options){

    var klass = function(opts){
      if( typeof this.init == "function"){ this.init(opts); }
    };
    klass.prototype = new Manipulation();

    options = options || {};

    for(var n in options){
      if(options.hasOwnProperty(n)){
        klass.prototype[n] = options[n];
      }
    }

    return klass;
  };

}).call(com.jivatechnology);

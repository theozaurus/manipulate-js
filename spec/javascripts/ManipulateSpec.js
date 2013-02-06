describe("Manipulate", function() {

  var singleton = com.jivatechnology.Manipulate;

  describe("singleton method", function(){
    describe("#build", function(){
      it("should return a new class", function(){
        var result = singleton.build({});

        expect(typeof result.prototype.then).toEqual("function");
        expect(typeof result.prototype.render).toEqual("function");
        expect(typeof result.prototype.convert).toEqual("function");
      });

      it("should add instance methods to returned class", function(){
        var fun = function(){};
        var klass = singleton.build({convert: fun});

        var instance = new klass();

        expect(instance.convert).toBe(fun);
      });
    });
  });

  describe("built class", function(){
    it("should run init method when new", function(){
      var argument_passed;

      var klass = singleton.build({
        init: function(arg){
          argument_passed = arg;
        }
      });

      var options = {potates: true};
      var instance = new klass(options);

      expect(argument_passed).toEqual(options);
    });
  });

  describe("instance of built class", function(){

    var subject;
    var klass;

    beforeEach(function(){
      klass   = singleton.build({});
      subject = new klass();
    });

    describe("#then", function(){
      it("should set 'next' to the input and return that", function(){
        var extraManipulation = {};

        var result = subject.then(extraManipulation);

        expect(result).toBe(extraManipulation);
        expect(subject.next).toBe(extraManipulation);
      });
    });

    describe("#end", function(){
      it("should return the head of the chain", function(){
        var man1 = new klass();
        var man2 = new klass();
        var man3 = new klass();
        var man4 = new klass();

        man1.then(man2).then(man3).then(man4);

        expect(man1.end()).toBe(man1);
        expect(man2.end()).toBe(man1);
        expect(man3.end()).toBe(man1);
        expect(man4.end()).toBe(man1);
      });
    });

    describe("#render", function(){
      it("should call convert and return value if no chain", function(){
        var called = false;

        subject.convert = function(){
          called = true;
          return "wow";
        };

        result = subject.render(":-(");

        expect(called).toBeTruthy();
        expect(result).toEqual("wow");
      });

      it("should call convert along the chain of manipulations", function(){
        var man1 = singleton.build({convert: function(v){ return v.replace("a","b"); } });
        var man2 = singleton.build({convert: function(v){ return v.replace("b","c"); } });
        var man3 = singleton.build({convert: function(v){ return v.replace("c","d"); } });

        var chain = new man1();

        chain.then(new man2()).then(new man3());

        var result = chain.render("a");

        expect(result).toEqual("d");
      });
    });

    describe("#convert", function(){
      it("should return value passed in", function(){
        var string = "foo bar baz";

        var result = subject.render(string);

        expect(result).toEqual(string);
      });
    });

  });

});

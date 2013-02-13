//= require ../manipulate

(function(){

  this.HTML = {};

  this.HTML.noFollowLinks = this.build({
    convert: function(html){
      var elements = html.querySelectorAll("a");

      var size = elements.length;
      for(var i=0; i < size; i++){
        var element = elements[i];
        element.setAttribute("rel","nofollow");
      }

      return html;
    }
  });

  // Changes hx tags by hx+n. e.g. h1 becomes h2, and h2 becomes h3 if n is 1
  this.HTML.transposeHeaderElements = this.build({
    init:    function(n){ this.n = n || 2; },
    convert: function(html){
      var max = 6;
      var that = this;

      var createNewElement = function(element,headerNum){
        var newNumber = headerNum + that.n;
        if(newNumber > max){ newNumber = max; }
        if(newNumber != headerNum){
          var newElement = document.createElement("h"+newNumber);

          // Copy attributes
          var attributes_length = element.attributes.length;
          for(var i =0; i < attributes_length; i++){
            var attr = element.attributes[i];
            newElement.setAttributeNS(attr.namespaceURI, attr.name, attr.value);
          }

          // Move children
          var size = element.childNodes.length;
          for(var j = 0; j < size; j++){
            // Always use 0 as we append to the fragment it is removed from the
            // other element
            var child = element.childNodes[0];
            newElement.appendChild(child);
          }

          return newElement;
        }
      };

      var processElements = function(elements,headerNum){
        var size = elements.length;
        for(var i=0; i < size; i++){
          var element = elements[i];
          var newElement = createNewElement(element,headerNum);
          if(newElement){
            element.parentNode.replaceChild(newElement,element);
          }
        }
      };

      for(var headerNum = max - 1; headerNum > 0; headerNum--){
        var elements = html.querySelectorAll("h"+headerNum);
        processElements(elements,headerNum);
      }

      return html;
    }
  });

  // This will look for links like "<a href='http://foo.com'>http://foo.com</a>"
  // and turn them into "<a href='http://foo.com'><abbr title='http://foo.com'>foo.com</abbr></a>"
  // If links are longer than max length it will shorten then further
  // For example:
  //   "<a href='http://http://foo.com/really/long/link'>http://foo.com/really/long/link</a>"
  // To:
  //   "<a href='http://http://foo.com/really/long/link'><abbr title='http://foo.com/really/long/link'>foo.com…ng/link</abbr></a>"
  //
  // `max_length` decides what length links should be affected
  // `symbol`     is the symbol used to replace the middle of the link with
  // `slack`      gives a custom length to the symbol so we do not replace a single character with the symbol
  this.HTML.shortenLinks = new this.build({
    init:    function(opts){
      var merged = {max_length: 40, symbol: "…", slack: 3};
      for(var n in opts){
        if(opts.hasOwnProperty(n)){
          merged[n] = opts[n];
        }
      }
      this.opts = merged;
    },
    convert: function(html){
      var that = this;

      var shortenLink = function(link){
        var origDesc = link.innerHTML;
        var opts = that.opts;

        // Remove http scheme from links description
        var simpleDesc = origDesc.replace(/^https?:\/\//,'');

        var shortDesc = simpleDesc;
        if(simpleDesc.length > opts.max_length){
          var tailLength = (opts.max_length - opts.slack)/2;
          shortDesc = simpleDesc.substr(0,tailLength) + opts.symbol + simpleDesc.substr(-tailLength);
        }

        link.innerHTML = "<abbr title='"+origDesc+"'>"+shortDesc+"</abbr>";
      };

      var links = html.querySelectorAll("a");
      for(var i=0; i < links.length; i++){
        var link = links[i];
        if(link.href == link.innerHTML.replace("&amp;","&")){
          shortenLink(link);
        }
      }

      return html;
    }
  });

  this.HTML.toStr = new this.build({
    convert: function(html){
      var wrappingElement = document.createElement("wrapper");
      wrappingElement.appendChild(html);
      return wrappingElement.innerHTML;
    }
  });

}).call(com.jivatechnology.Manipulate);

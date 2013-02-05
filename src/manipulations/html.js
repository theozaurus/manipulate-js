//= require ../manipulate

(function(){

  this.HTML = {};

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
        if(link.href == link.innerHTML){
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

//= require ../manipulate
//= require marked

(function(){

  this.Markdown = {};
  this.Markdown.toHtmlStr = new this.build({
    init:    function(opts){ this.opts = opts; },
    convert: function(markdown){ return marked(markdown, this.opts); }
  });
  this.Markdown.toHtml = new this.build({
    init: function(opts){ this.opts = opts; },
    convert: function(markdown){
      var html_string = marked(markdown, this.opts);
      var element = document.createElement("div");
      var fragment = document.createDocumentFragment();

      element.innerHTML = html_string;
      for(var i = 0; i < element.children.length; i++){
        var e = element.children[i];
        fragment.appendChild(e);
      }

      return fragment;
    }
  });

}).call(com.jivatechnology.Manipulate);

//= require ../manipulate
//= require marked

(function(){

  this.Markdown = {};

  this.Markdown.latexToImage = new this.build({
    convert: function(markdown){
      var latex_regex = /\$(?! )(.*[^ ])\$/g;
      var img_url_prefix = 'http://chart.apis.google.com/chart?cht=tx&chf=bg,s,FFFFFF00&chl=';
      var text_with_latex = markdown.replace(latex_regex, function (match, latex) {
        return '![' + latex + ']' +
        '(' + img_url_prefix + encodeURIComponent(latex) + ' "' + latex + '")';
      });
      return text_with_latex;
    }
  });

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
      var size = element.children.length;
      for(var i = 0; i < size; i++){
        // Always use 0 as we append to the fragment it is removed from the
        // other element
        var e = element.children[0];
        fragment.appendChild(e);
      }

      return fragment;
    }
  });

}).call(com.jivatechnology.Manipulate);

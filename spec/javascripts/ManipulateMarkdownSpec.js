describe("Manipulate.Markdown", function(){

  var scope = com.jivatechnology.Manipulate.Markdown;
  var subject;

  describe("toHtmlStr", function(){
    beforeEach(function(){
      subject = new scope.toHtmlStr();
    });

    it("should return a DocumentFragment", function(){
      var result = subject.convert("This is __markdown__");

      expect( result ).toEqual("<p>This is <strong>markdown</strong></p>\n");
    });

    it("should allow 'marked' options to be passed", function(){
      subject = new scope.toHtmlStr({sanitize: true});

      var result = subject.convert("This is <h1>HTML</h1>");

      expect( result ).toEqual( "<p>This is &lt;h1&gt;HTML&lt;/h1&gt;</p>\n" );
    });

  });

  describe("latexToImage", function(){
    beforeEach(function(){
      subject = new scope.latexToImage();
    });

    it("should take latex between $ symbols and turn it into images for Google charts", function(){
      var result = subject.convert("The most famous equation? $E=mc^2$");

      expect(result).toEqual("The most famous equation? ![E=mc^2](http://chart.apis.google.com/chart?cht=tx&chf=bg,s,FFFFFF00&chl=E%3Dmc%5E2 \"E=mc^2\")");
    });

    it("should not convert content between $ symbols if there are spaces on the inside", function(){
      var result = subject.convert("The prices of apples yesterday was $10. Today they are $20.");

      expect(result).toEqual("The prices of apples yesterday was $10. Today they are $20.");
    });

  });

  describe("toHtml", function(){

    beforeEach(function(){
      subject = new scope.toHtml();
    });

    it("should return a DocumentFragment", function(){
      var result = subject.convert("This is __markdown__");

      expect( result instanceof DocumentFragment ).toBeTruthy();
      expect( result ).toBeEquivalentTo("<p>This is <strong>markdown</strong></p>");
    });

  });

});

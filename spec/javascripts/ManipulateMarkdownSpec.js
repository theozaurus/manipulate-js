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

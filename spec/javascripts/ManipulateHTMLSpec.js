describe("Manipulate.HTML", function(){

  var scope = com.jivatechnology.Manipulate.HTML;
  var subject;

  describe("shortenLinks", function(){

    beforeEach(function(){
      subject = new scope.shortenLinks({max_length: 25, symbol: "…", slack: 3});
    });

    it("should find links where the contents matches the href and shorten the contents", function(){
      var html = document.createDocumentFragment();
      var wrapperElement = document.createElement("p");
      wrapperElement.innerHTML =
        'Here\'s some text with a link <a href="http://foo.com/some/long/nonsense">http://foo.com/some/long/nonsense</a>';
      html.appendChild(wrapperElement);

      var result = subject.convert(html);
      var expected =
        '<p>Here\'s some text with a link <a href="http://foo.com/some/long/nonsense"><abbr title="http://foo.com/some/long/nonsense">foo.com/som…ng/nonsense</abbr></a></p>';

      expect(result).toBeEquivalentTo(expected);
    });

    it("should not shorten links where the href does not match the content", function(){
      var html = document.createDocumentFragment();
      var wrapperElement = document.createElement("p");
      wrapperElement.innerHTML =
        'Here\'s some text with a link <a href="http://foo.com/some/long/nonsense">Foo Nonsense</a>';
      html.appendChild(wrapperElement);

      var result = subject.convert(html);
      var expected =
        '<p>Here\'s some text with a link <a href="http://foo.com/some/long/nonsense">Foo Nonsense</a></p>';

      expect(result).toBeEquivalentTo(expected);
    });

  });

  describe("toStr", function(){

    beforeEach(function(){
      subject = new scope.toStr();
    });

    it("should serialize a DOM object", function(){
      var html = document.createDocumentFragment();
      var element = document.createElement("h1");
      element.innerHTML = "This is HTML";
      html.appendChild(element);

      var result = subject.convert(html);

      expect(typeof result).toEqual("string");
      expect(result).toEqual("<h1>This is HTML</h1>");
    });

  });

});
describe("Manipulate.HTML", function(){

  var scope = com.jivatechnology.Manipulate.HTML;
  var subject;

  describe("noFollowLinks", function(){
    beforeEach(function(){
      subject = new scope.noFollowLinks();
    });

    it("should make all links rel=nofollow", function(){
      var html = document.createDocumentFragment();
      var wrapperElement = document.createElement("div");
      wrapperElement.innerHTML = '<a href="foo">some link</a><a href="foo" rel="follow">other link</a>';
      html.appendChild(wrapperElement);

      var result = subject.convert(html);
      var expected =
        '<div><a href="foo" rel="nofollow">some link</a><a href="foo" rel="nofollow">other link</a></div>';

      expect(result).toBeEquivalentTo(expected);
    });
  });

  describe("transposeHeaderElements", function(){
    beforeEach(function(){
      subject = new scope.transposeHeaderElements(2);
    });

    it("should change header elements by `n` amount", function(){
      var html = document.createDocumentFragment();
      var wrapperElement = document.createElement("div");
      wrapperElement.innerHTML = '<h1 class="foo">I should be h3</h1><h2>I should be <span>h4</span></h2>';
      html.appendChild(wrapperElement);

      var result = subject.convert(html);
      var expected =
        '<div><h3 class="foo">I should be h3</h3><h4>I should be <span>h4</span></h4></div>';

      expect(result).toBeEquivalentTo(expected);
    });

    it("should not create any header elements that are greater than h6", function(){
      var html = document.createDocumentFragment();
      var wrapperElement = document.createElement("div");
      wrapperElement.innerHTML = '<h5>I should be h6</h5><h6>I should be h6</h6>';
      html.appendChild(wrapperElement);

      var result = subject.convert(html);
      var expected =
        '<div><h6>I should be h6</h6><h6>I should be h6</h6></div>';

      expect(result).toBeEquivalentTo(expected);
    });

    it("should handle header elements where the parentNode is the documentFragment", function(){
      var html = document.createDocumentFragment();
      var element = document.createElement("h1")
      element.innerHTML = "Hello";
      html.appendChild(element);

      var result = subject.convert(html);
      var expected = "<h3>Hello</h3>";

      expect(result).toBeEquivalentTo(expected);
    });

  });

  describe("shortenLinks", function(){

    beforeEach(function(){
      subject = new scope.shortenLinks({max_length: 25, symbol: "…", slack: 3});
    });

    it("should find links where the contents matches the href and shorten the contents", function(){
      var html = document.createDocumentFragment();
      var wrapperElement = document.createElement("p");
      wrapperElement.innerHTML =
        'Here\'s some text with a link <a href="http://foo.com/some?long=true&nonsense=true">http://foo.com/some?long=true&nonsense=true</a>';
      html.appendChild(wrapperElement);

      var result = subject.convert(html);
      var expected =
        '<p>Here\'s some text with a link <a href="http://foo.com/some?long=true&nonsense=true"><abbr title="http://foo.com/some?long=true&nonsense=true">foo.com/som…nsense=true</abbr></a></p>';

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

(function() {
  var endY;
  var startY;
  var interval;
  var startTime;

  function forAllTags(name, callback) {
    [].forEach.call(document.getElementsByTagName(name), callback);
  }

  function animate() {
    var t = Math.min(1, (new Date() - startTime) / 1000);
    t = 0.5 - 0.5 * Math.cos(t * Math.PI);
    t = 0.5 - 0.5 * Math.cos(t * Math.PI);
    scrollTo(0, Math.round(startY + (endY - startY) * t));
    if (t == 1) clearInterval(interval);
  }

  // Smooth scrolling for all internal links
  forAllTags('a', function(link) {
    var hash = /#(.*)$/.exec(link.href);
    if (hash) {
      link.onclick = function() {
        endY = document.getElementById(hash[1]).offsetTop;
        startY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        if (startY != endY) {
          if (interval) clearInterval(interval);
          interval = setInterval(animate, 10);
          startTime = new Date();
        }
        return false;
      };
    }
  });

  function syntaxHighlighting(pre) {
    pre.innerHTML = pre.innerHTML
      .replace(/(?:\b[0-9]+(?:\.[0-9]+)?\b|"[^"]*"|\btrue\b|\bfalse\b)/g, '<span class="literal">$&</span>')
      .replace(/(?:\b(?:dynamic_cast|if|else|for|while|return|void|int|bool|float|vec2|vec3|vec4|uniform|varying|attribute|sizeof|template|typename|virtual|class(?!=)|struct|enum|typedef|using|namespace|static|const|operator|try|catch|throw|private|protected|public|new|delete)|#(include|define|undef))\b/g, '<span class="keyword">$&</span>')
      .replace(/\/\/.*/g, '<span class="comment">$&</span>');
  }

  // Simple syntax highlighting
  forAllTags('pre', syntaxHighlighting);
  this.syntaxHighlighting = syntaxHighlighting;
})();

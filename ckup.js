(function(){
  var Ckup, tag, _ref, _i, _len, __clone = function(it){
    function fn(){ if (this.__proto__ !== it) this.__proto__ = it }
    return fn.prototype = it, new fn;
  }, _fn = function(tag){
    var tailless;
    tailless = tag === 'area' || tag === 'base' || tag === 'basefont' || tag === 'br' || tag === 'hr' || tag === 'img' || tag === 'input' || tag === 'link' || tag === 'meta';
    return Ckup[tag] = function(head, body){
      this.element(tag, head, body, tailless);
    };
  };
  Ckup = (_ref = typeof exports != 'undefined' && exports !== null ? exports : this.Ckup = {}, _ref.VERSION = '0.1.0', _ref.render = function(template){
    var me, _ref;
    template.call(me = (_ref = __clone(this), _ref._ = '', _ref));
    return me._;
  }, _ref.quote = (function(re, fn){
    return function(it){
      return ("" + it).replace(re, fn);
    };
  }(/[&<>\"\']/g, function(it){
    switch (it) {
    case '&':
      return '&amp;';
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    case '"':
      return '&#34;';
    case '\'':
      return '&#39;';
    }
  })), _ref.doctype = function(it){
    this._ += "<!DOCTYPE " + it + ">";
  }, _ref.text = function(it){
    this._ += this.quote(it);
  }, _ref.element = function(name, atrs, body, tailless){
    var code, key, val;
    code = '<' + name;
    if (typeof atrs === 'object') {
      for (key in atrs) {
        val = atrs[key];
        code += " " + key + "=\"" + this.quote(val) + "\"";
      }
    } else {
      body = atrs;
    }
    if (tailless) {
      this._ += code + '/>';
      return;
    }
    this._ += code + '>';
    if (typeof body === 'function') {
      body = body.call(this);
    }
    if (body) {
      this._ += body;
    }
    this._ += "</" + name + "\n>";
  }, _ref);
  for (_i = 0, _len = (_ref = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'keygen', 'kbd', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'tt', 'u', 'ul', 'video', 'xmp']).length; _i < _len; ++_i) {
    tag = _ref[_i];
    _fn(tag);
  }
  Ckup.$ = Ckup.quote;
}).call(this);

(function(){
  var ckup, tag, _i, _ref, _len, __clone = function(it){
    function fn(){ if (this.__proto__ !== it) this.__proto__ = it }
    return fn.prototype = it, new fn;
  }, __importAll = function(obj, src){ for (var key in src) obj[key] = src[key]; return obj }, __slice = [].slice, _fn = function(tag){
    var tailless;
    tailless = tag === 'area' || tag === 'base' || tag === 'basefont' || tag === 'br' || tag === 'hr' || tag === 'img' || tag === 'input' || tag === 'link' || tag === 'meta';
    ckup[tag] = function(){
      this.element(tag, arguments, tailless);
    };
  };
  ckup = typeof exports != 'undefined' && exports !== null ? exports : this.Ckup = {};
  ckup.VERSION = '0.1.4b';
  ckup.render = function(template){
    var me, _ref;
    if (typeof template !== 'function') {
      template = Function('with(this)' + (typeof Coco != 'undefined' && Coco !== null ? Coco : require('coco')).compile("" + template));
    }
    template.call(me = (_ref = __clone(this), _ref._ = '', _ref));
    return me._;
  };
  ckup.css = function(rules){
    var code, selector, children, that, kv, selectors, declarations, subrules, key, val, v, ss, k, s, _ref, _i, _ref2, _len, _j, _len2;
    code = '';
    if (typeof rules === 'function') {
      rules = rules.call(this);
    }
    for (selector in rules) {
      children = rules[selector];
      if (typeof children === 'function') {
        children = children.call(this);
      }
      if (that = (_ref = children.mixin, delete children.mixin, _ref)) {
        for (_i = 0, _len = (_ref2 = [].concat(that)).length; _i < _len; ++_i) {
          kv = _ref2[_i];
          __importAll(children, kv);
        }
      }
      subrules = declarations = selectors = '';
      for (key in children) {
        val = children[key];
        switch (typeof val) {
        case 'string':
        case 'number':
          if ((key = this.decamelize(key)).charAt() === '$') {
            key = key.slice(1);
            for (_i = 0, _len = (_ref2 = this.VENDORS).length; _i < _len; ++_i) {
              v = _ref2[_i];
              declarations += "  -" + v + "-" + key + ": " + val + ";\n";
            }
          }
          declarations += "  " + key + ": " + val + ";\n";
          break;
        default:
          ss = [];
          selectors || (selectors = selector.split(this.COMMA));
          for (_i = 0, _len = (_ref2 = key.split(this.COMMA)).length; _i < _len; ++_i) {
            k = _ref2[_i];
            for (_j = 0, _len2 = selectors.length; _j < _len2; ++_j) {
              s = selectors[_j];
              ss.push(s + " " + k);
            }
          }
          (subrules || (subrules = {}))[ss.join(', ')] = val;
        }
      }
      declarations && (code += selector + " {\n" + declarations + "}\n");
      subrules && (code += this.css(subrules));
    }
    return code;
  };
  ckup.COMMA = /\s*,\s*/;
  ckup.VENDORS = ['webkit', 'moz', 'ms', 'o'];
  ckup.quote = function(re, fn){
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
  });
  ckup.decamelize = function(re, fn){
    return function(it){
      return ("" + it).replace(re, fn);
    };
  }(/[A-Z]/g, function(it){
    return '-' + it.toLowerCase();
  });
  ckup.doctype = function(it){
    this._ += "<!DOCTYPE " + it + ">";
  };
  ckup.raw = function(it){
    this._ += it;
  };
  ckup.text = function(it){
    this._ += this.quote(it);
  };
  ckup.entity = function(it){
    this._ += "&" + (typeof it === 'number' ? '#' + it : it) + ";";
  };
  ckup.element = function(name, args, tailless){
    var code, bodies, arg, key, val, body, _i, _len;
    code = '<' + name;
    bodies = [];
    for (_i = 0, _len = args.length; _i < _len; ++_i) {
      arg = args[_i];
      if (typeof arg === 'object') {
        for (key in arg) {
          val = arg[key];
          code += " " + key + "=\"" + this.quote(val) + "\"";
        }
      } else {
        bodies.push(arg);
      }
    }
    if (tailless) {
      this._ += code + '/>';
      return;
    }
    this._ += code + '\n>';
    for (_i = 0, _len = bodies.length; _i < _len; ++_i) {
      body = bodies[_i];
      if (typeof body === 'function') {
        body = body.call(this);
      }
      if (body != null) {
        this._ += body;
      }
    }
    this._ += "</" + name + ">";
  };
  ckup.A = function(url, txt){
    var args;
    args = __slice.call(arguments);
    args[0] = {
      href: url
    };
    if (!txt) {
      args[1] = url;
    }
    this.element('a', args);
  };
  for (_i = 0, _len = (_ref = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'keygen', 'kbd', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'tt', 'u', 'ul', 'video', 'xmp']).length; _i < _len; ++_i) {
    tag = _ref[_i];
    _fn(tag);
  }
  ckup.$ = ckup.quote, ckup.R = ckup.raw, ckup.T = ckup.text, ckup.E = ckup.entity;
}).call(this);

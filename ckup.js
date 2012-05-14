(function(){
  var ckup, tag, __i, __ref, __len, __slice = [].slice;
  ckup = typeof exports != 'undefined' && exports !== null
    ? exports
    : this.Ckup = {};
  ckup.VERSION = '0.1.8';
  ckup.render = function(template, mixin){
    return this.renderer(template)(mixin);
  };
  ckup.renderer = function(template){
    var __this = this;
    if (typeof template !== 'function') {
      template = this.compile(template);
    }
    return function(mixin){
      var me;
      me = __clone(__this);
      if (mixin) {
        __import(me, mixin);
      }
      template.call(me);
      return me._;
    };
  };
  ckup.compile = function(code){
    return Function('with(this)' + (typeof Coco != 'undefined' && Coco !== null
      ? Coco
      : require('coco')).compile(code + ""));
  };
  ckup._ = '';
  ckup.css = function(rules){
    var code, selector, children, that, kv, selectors, declarations, subrules, key, val, v, ss, k, s, __i, __ref, __len, __j, __len1;
    code = '';
    if (typeof rules === 'function') {
      rules = rules.call(this);
    }
    for (selector in rules) {
      children = rules[selector];
      if (typeof children === 'function') {
        children = children.call(this);
      }
      if (that = children.mixin, delete children.mixin, that) {
        for (__i = 0, __len = (__ref = [].concat(that)).length; __i < __len; ++__i) {
          kv = __ref[__i];
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
            for (__i = 0, __len = (__ref = this.VENDORS).length; __i < __len; ++__i) {
              v = __ref[__i];
              declarations += "  -" + v + "-" + key + ": " + val + ";\n";
            }
          }
          declarations += "  " + key + ": " + val + ";\n";
          break;
        default:
          ss = [];
          selectors || (selectors = selector.split(this.COMMA));
          for (__i = 0, __len = (__ref = key.split(this.COMMA)).length; __i < __len; ++__i) {
            k = __ref[__i];
            for (__j = 0, __len1 = selectors.length; __j < __len1; ++__j) {
              s = selectors[__j];
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
  ckup.quote = (function(re){
    function fn(it){
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
    }
    return function(it){
      return (it + "").replace(re, fn);
    };
  }.call(this, /[&<>\"\']/g));
  ckup.decamelize = (function(re){
    function fn(it){
      return '-' + it.toLowerCase();
    }
    return function(it){
      return (it + "").replace(re, fn);
    };
  }.call(this, /[A-Z]/g));
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
    var code, bodies, arg, key, val, body, __i, __len;
    code = '<' + name;
    bodies = [];
    for (__i = 0, __len = args.length; __i < __len; ++__i) {
      arg = args[__i];
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
      this._ += code + "/>";
      return;
    }
    this._ += code + "\n>";
    for (__i = 0, __len = bodies.length; __i < __len; ++__i) {
      body = bodies[__i];
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
    var __ref;
    this.element('a', (__ref = __slice.call(arguments), __ref[0] = {
      href: url
    }, __ref[1] = txt || this.quote(url), __ref));
  };
  for (__i = 0, __len = (__ref = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr']).length; __i < __len; ++__i) {
    tag = __ref[__i];
    (__fn.call(this, tag === 'area' || tag === 'base' || tag === 'br' || tag === 'col' || tag === 'command' || tag === 'embed' || tag === 'hr' || tag === 'img' || tag === 'input' || tag === 'keygen' || tag === 'link' || tag === 'meta' || tag === 'param' || tag === 'source' || tag === 'track' || tag === 'wbr', tag));
  }
  ckup.$ = ckup.quote, ckup.R = ckup.raw, ckup.T = ckup.text, ckup.E = ckup.entity, ckup.v = ckup['var'];
  function __clone(it){
    function fun(){} fun.prototype = it;
    return new fun;
  }
  function __import(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function __importAll(obj, src){
    for (var key in src) obj[key] = src[key];
    return obj;
  }
  function __fn(tailless, tag){
    ckup[tag] = function(){
      this.element(tag, arguments, tailless);
    };
  }
}).call(this);

var goog = goog || {};
goog.global = this;
goog.isDef = function $goog$isDef$(val) {
  return void 0 !== val;
};
goog.exportPath_ = function $goog$exportPath_$(name, opt_object, opt_objectToExportTo) {
  var parts = name.split("."), cur = opt_objectToExportTo || goog.global;
  parts[0] in cur || !cur.execScript || cur.execScript("var " + parts[0]);
  for (var part;parts.length && (part = parts.shift());) {
    !parts.length && goog.isDef(opt_object) ? cur[part] = opt_object : cur = cur[part] ? cur[part] : cur[part] = {};
  }
};
goog.define = function $goog$define$(name, defaultValue) {
  var value = defaultValue;
  goog.exportPath_(name, value);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.provide = function $goog$provide$(name) {
  goog.exportPath_(name);
};
goog.setTestOnly = function $goog$setTestOnly$(opt_message) {
  if (!goog.DEBUG) {
    throw opt_message = opt_message || "", Error("Importing test-only code into non-debug environment" + opt_message ? ": " + opt_message : ".");
  }
};
goog.forwardDeclare = function $goog$forwardDeclare$() {
};
goog.getObjectByName = function $goog$getObjectByName$(name, opt_obj) {
  for (var parts = name.split("."), cur = opt_obj || goog.global, part;part = parts.shift();) {
    if (goog.isDefAndNotNull(cur[part])) {
      cur = cur[part];
    } else {
      return null;
    }
  }
  return cur;
};
goog.globalize = function $goog$globalize$(obj, opt_global) {
  var global = opt_global || goog.global, x;
  for (x in obj) {
    global[x] = obj[x];
  }
};
goog.addDependency = function $goog$addDependency$(relPath, provides, requires) {
  if (goog.DEPENDENCIES_ENABLED) {
    for (var provide, require, path = relPath.replace(/\\/g, "/"), deps = goog.dependencies_, i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path, path in deps.pathToNames || (deps.pathToNames[path] = {}), deps.pathToNames[path][provide] = !0;
    }
    for (var j = 0;require = requires[j];j++) {
      path in deps.requires || (deps.requires[path] = {}), deps.requires[path][require] = !0;
    }
  }
};
goog.useStrictRequires = !1;
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function $goog$require$() {
};
goog.basePath = "";
goog.nullFunction = function $goog$nullFunction$() {
};
goog.identityFunction = function $goog$identityFunction$(opt_returnValue) {
  return opt_returnValue;
};
goog.abstractMethod = function $goog$abstractMethod$() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function $goog$addSingletonGetter$(ctor) {
  ctor.getInstance = function $ctor$getInstance$() {
    if (ctor.instance_) {
      return ctor.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor);
    return ctor.instance_ = new ctor;
  };
};
goog.instantiatedSingletons_ = [];
goog.DEPENDENCIES_ENABLED = !1;
goog.DEPENDENCIES_ENABLED && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function $goog$inHtmlDocument_$() {
  var doc = goog.global.document;
  return "undefined" != typeof doc && "write" in doc;
}, goog.findBasePath_ = function $goog$findBasePath_$() {
  if (goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH;
  } else {
    if (goog.inHtmlDocument_()) {
      for (var doc = goog.global.document, scripts = doc.getElementsByTagName("script"), i = scripts.length - 1;0 <= i;--i) {
        var src = scripts[i].src, qmark = src.lastIndexOf("?"), l = -1 == qmark ? src.length : qmark;
        if ("base.js" == src.substr(l - 7, 7)) {
          goog.basePath = src.substr(0, l - 7);
          break;
        }
      }
    }
  }
}, goog.importScript_ = function $goog$importScript_$(src) {
  var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[src] && importScript(src) && (goog.dependencies_.written[src] = !0);
}, goog.writeScriptTag_ = function $goog$writeScriptTag_$(src) {
  if (goog.inHtmlDocument_()) {
    var doc = goog.global.document;
    if ("complete" == doc.readyState) {
      var isDeps = /\bdeps.js$/.test(src);
      if (isDeps) {
        return!1;
      }
      throw Error('Cannot write "' + src + '" after document load');
    }
    doc.write('<script type="text/javascript" src="' + src + '">\x3c/script>');
    return!0;
  }
  return!1;
}, goog.writeScripts_ = function $goog$writeScripts_$() {
  function visitNode(path) {
    if (!(path in deps.written)) {
      if (!(path in deps.visited) && (deps.visited[path] = !0, path in deps.requires)) {
        for (var requireName in deps.requires[path]) {
          if (!goog.isProvided_(requireName)) {
            if (requireName in deps.nameToPath) {
              visitNode(deps.nameToPath[requireName]);
            } else {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      path in seenScript || (seenScript[path] = !0, scripts.push(path));
    }
  }
  var scripts = [], seenScript = {}, deps = goog.dependencies_, path$$0;
  for (path$$0 in goog.included_) {
    deps.written[path$$0] || visitNode(path$$0);
  }
  for (var i = 0;i < scripts.length;i++) {
    if (scripts[i]) {
      goog.importScript_(goog.basePath + scripts[i]);
    } else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function $goog$getPathFromDeps_$(rule) {
  return rule in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[rule] : null;
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function $goog$typeOf$(value) {
  var s = typeof value;
  if ("object" == s) {
    if (value) {
      if (value instanceof Array) {
        return "array";
      }
      if (value instanceof Object) {
        return s;
      }
      var className = Object.prototype.toString.call(value);
      if ("[object Window]" == className) {
        return "object";
      }
      if ("[object Array]" == className || "number" == typeof value.length && "undefined" != typeof value.splice && "undefined" != typeof value.propertyIsEnumerable && !value.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == className || "undefined" != typeof value.call && "undefined" != typeof value.propertyIsEnumerable && !value.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == s && "undefined" == typeof value.call) {
      return "object";
    }
  }
  return s;
};
goog.isNull = function $goog$isNull$(val) {
  return null === val;
};
goog.isDefAndNotNull = function $goog$isDefAndNotNull$(val) {
  return null != val;
};
goog.isArray = function $goog$isArray$(val) {
  return "array" == goog.typeOf(val);
};
goog.isArrayLike = function $goog$isArrayLike$(val) {
  var type = goog.typeOf(val);
  return "array" == type || "object" == type && "number" == typeof val.length;
};
goog.isDateLike = function $goog$isDateLike$(val) {
  return goog.isObject(val) && "function" == typeof val.getFullYear;
};
goog.isString = function $goog$isString$(val) {
  return "string" == typeof val;
};
goog.isBoolean = function $goog$isBoolean$(val) {
  return "boolean" == typeof val;
};
goog.isNumber = function $goog$isNumber$(val) {
  return "number" == typeof val;
};
goog.isFunction = function $goog$isFunction$(val) {
  return "function" == goog.typeOf(val);
};
goog.isObject = function $goog$isObject$(val) {
  var type = typeof val;
  return "object" == type && null != val || "function" == type;
};
goog.getUid = function $goog$getUid$(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function $goog$hasUid$(obj) {
  return!!obj[goog.UID_PROPERTY_];
};
goog.removeUid = function $goog$removeUid$(obj) {
  "removeAttribute" in obj && obj.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete obj[goog.UID_PROPERTY_];
  } catch (ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function $goog$cloneObject$(obj) {
  var type = goog.typeOf(obj);
  if ("object" == type || "array" == type) {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = "array" == type ? [] : {}, key;
    for (key in obj) {
      clone[key] = goog.cloneObject(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.bindNative_ = function $goog$bindNative_$(fn, selfObj, var_args) {
  return fn.call.apply(fn.bind, arguments);
};
goog.bindJs_ = function $goog$bindJs_$(fn, selfObj, var_args) {
  if (!fn) {
    throw Error();
  }
  if (2 < arguments.length) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs);
    };
  }
  return function() {
    return fn.apply(selfObj, arguments);
  };
};
goog.bind = function $goog$bind$(fn, selfObj, var_args) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function $goog$partial$(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = args.slice();
    newArgs.push.apply(newArgs, arguments);
    return fn.apply(this, newArgs);
  };
};
goog.mixin = function $goog$mixin$(target, source) {
  for (var x in source) {
    target[x] = source[x];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return+new Date;
};
goog.globalEval = function $goog$globalEval$(script) {
  if (goog.global.execScript) {
    goog.global.execScript(script, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval(script);
      } else {
        var doc = goog.global.document, scriptElt = doc.createElement("script");
        scriptElt.type = "text/javascript";
        scriptElt.defer = !1;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function $goog$getCssName$(className, opt_modifier) {
  var getMapping = function $getMapping$(cssName) {
    return goog.cssNameMapping_[cssName] || cssName;
  }, renameByParts = function $renameByParts$(cssName) {
    for (var parts = cssName.split("-"), mapped = [], i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]));
    }
    return mapped.join("-");
  }, rename;
  rename = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? getMapping : renameByParts : function(a) {
    return a;
  };
  return opt_modifier ? className + "-" + rename(opt_modifier) : rename(className);
};
goog.setCssNameMapping = function $goog$setCssNameMapping$(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style;
};
goog.getMsg = function $goog$getMsg$(str, opt_values) {
  var values = opt_values || {}, key;
  for (key in values) {
    var value = ("" + values[key]).replace(/\$/g, "$$$$");
    str = str.replace(new RegExp("\\{\\$" + key + "\\}", "gi"), value);
  }
  return str;
};
goog.getMsgWithFallback = function $goog$getMsgWithFallback$(a) {
  return a;
};
goog.exportSymbol = function $goog$exportSymbol$(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo);
};
goog.exportProperty = function $goog$exportProperty$(object, publicName, symbol) {
  object[publicName] = symbol;
};
goog.inherits = function $goog$inherits$(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor;
  childCtor.base = function $childCtor$base$(me, methodName, var_args) {
    var args = Array.prototype.slice.call(arguments, 2);
    return parentCtor.prototype[methodName].apply(me, args);
  };
};
goog.base = function $goog$base$(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !caller) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if (caller.superClass_) {
    return caller.superClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1));
  }
  for (var args = Array.prototype.slice.call(arguments, 2), foundCaller = !1, ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if (ctor.prototype[opt_methodName] === caller) {
      foundCaller = !0;
    } else {
      if (foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args);
      }
    }
  }
  if (me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function $goog$scope$(fn) {
  fn.call(goog.global);
};
goog.MODIFY_FUNCTION_PROTOTYPES = !0;
goog.MODIFY_FUNCTION_PROTOTYPES && (Function.prototype.bind = Function.prototype.bind || function(selfObj, var_args) {
  if (1 < arguments.length) {
    var args = Array.prototype.slice.call(arguments, 1);
    args.unshift(this, selfObj);
    return goog.bind.apply(null, args);
  }
  return goog.bind(this, selfObj);
}, Function.prototype.partial = function $Function$$partial$(var_args) {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(this, null);
  return goog.bind.apply(null, args);
}, Function.prototype.inherits = function $Function$$inherits$(parentCtor) {
  goog.inherits(this, parentCtor);
}, Function.prototype.mixin = function $Function$$mixin$(source) {
  goog.mixin(this.prototype, source);
});
var i18n = {input:{}};
i18n.input.common = {};
i18n.input.common.Token = function $i18n$input$common$Token$() {
};
goog.debug = {};
goog.debug.Error = function $goog$debug$Error$(opt_msg) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var stack = Error().stack;
    stack && (this.stack = stack);
  }
  opt_msg && (this.message = String(opt_msg));
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function $goog$string$startsWith$(str, prefix) {
  return 0 == str.lastIndexOf(prefix, 0);
};
goog.string.endsWith = function $goog$string$endsWith$(str, suffix) {
  var l = str.length - suffix.length;
  return 0 <= l && str.indexOf(suffix, l) == l;
};
goog.string.caseInsensitiveStartsWith = function $goog$string$caseInsensitiveStartsWith$(str, prefix) {
  return 0 == goog.string.caseInsensitiveCompare(prefix, str.substr(0, prefix.length));
};
goog.string.caseInsensitiveEndsWith = function $goog$string$caseInsensitiveEndsWith$(str, suffix) {
  return 0 == goog.string.caseInsensitiveCompare(suffix, str.substr(str.length - suffix.length, suffix.length));
};
goog.string.caseInsensitiveEquals = function $goog$string$caseInsensitiveEquals$(str1, str2) {
  return str1.toLowerCase() == str2.toLowerCase();
};
goog.string.subs = function $goog$string$subs$(str, var_args) {
  for (var splitParts = str.split("%s"), returnString = "", subsArguments = Array.prototype.slice.call(arguments, 1);subsArguments.length && 1 < splitParts.length;) {
    returnString += splitParts.shift() + subsArguments.shift();
  }
  return returnString + splitParts.join("%s");
};
goog.string.collapseWhitespace = function $goog$string$collapseWhitespace$(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmpty = function $goog$string$isEmpty$(str) {
  return/^[\s\xa0]*$/.test(str);
};
goog.string.isEmptySafe = function $goog$string$isEmptySafe$(str) {
  return goog.string.isEmpty(goog.string.makeSafe(str));
};
goog.string.isBreakingWhitespace = function $goog$string$isBreakingWhitespace$(str) {
  return!/[^\t\n\r ]/.test(str);
};
goog.string.isAlpha = function $goog$string$isAlpha$(str) {
  return!/[^a-zA-Z]/.test(str);
};
goog.string.isNumeric = function $goog$string$isNumeric$(str) {
  return!/[^0-9]/.test(str);
};
goog.string.isAlphaNumeric = function $goog$string$isAlphaNumeric$(str) {
  return!/[^a-zA-Z0-9]/.test(str);
};
goog.string.isSpace = function $goog$string$isSpace$(ch) {
  return " " == ch;
};
goog.string.isUnicodeChar = function $goog$string$isUnicodeChar$(ch) {
  return 1 == ch.length && " " <= ch && "~" >= ch || "\u0080" <= ch && "\ufffd" >= ch;
};
goog.string.stripNewlines = function $goog$string$stripNewlines$(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function $goog$string$canonicalizeNewlines$(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function $goog$string$normalizeWhitespace$(str) {
  return str.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function $goog$string$normalizeSpaces$(str) {
  return str.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function $goog$string$collapseBreakingSpaces$(str) {
  return str.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = function $goog$string$trim$(str) {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function $goog$string$trimLeft$(str) {
  return str.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function $goog$string$trimRight$(str) {
  return str.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function $goog$string$caseInsensitiveCompare$(str1, str2) {
  var test1 = String(str1).toLowerCase(), test2 = String(str2).toLowerCase();
  return test1 < test2 ? -1 : test1 == test2 ? 0 : 1;
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function $goog$string$numerateCompare$(str1, str2) {
  if (str1 == str2) {
    return 0;
  }
  if (!str1) {
    return-1;
  }
  if (!str2) {
    return 1;
  }
  for (var tokens1 = str1.toLowerCase().match(goog.string.numerateCompareRegExp_), tokens2 = str2.toLowerCase().match(goog.string.numerateCompareRegExp_), count = Math.min(tokens1.length, tokens2.length), i = 0;i < count;i++) {
    var a = tokens1[i], b = tokens2[i];
    if (a != b) {
      var num1 = parseInt(a, 10);
      if (!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if (!isNaN(num2) && num1 - num2) {
          return num1 - num2;
        }
      }
      return a < b ? -1 : 1;
    }
  }
  return tokens1.length != tokens2.length ? tokens1.length - tokens2.length : str1 < str2 ? -1 : 1;
};
goog.string.urlEncode = function $goog$string$urlEncode$(str) {
  return encodeURIComponent(String(str));
};
goog.string.urlDecode = function $goog$string$urlDecode$(str) {
  return decodeURIComponent(str.replace(/\+/g, " "));
};
goog.string.newLineToBr = function $goog$string$newLineToBr$(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>");
};
goog.string.htmlEscape = function $goog$string$htmlEscape$(str, opt_isLikelyToContainHtmlChars) {
  if (opt_isLikelyToContainHtmlChars) {
    return str.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;").replace(goog.string.singleQuoteRe_, "&#39;");
  }
  if (!goog.string.allRe_.test(str)) {
    return str;
  }
  -1 != str.indexOf("&") && (str = str.replace(goog.string.amperRe_, "&amp;"));
  -1 != str.indexOf("<") && (str = str.replace(goog.string.ltRe_, "&lt;"));
  -1 != str.indexOf(">") && (str = str.replace(goog.string.gtRe_, "&gt;"));
  -1 != str.indexOf('"') && (str = str.replace(goog.string.quotRe_, "&quot;"));
  -1 != str.indexOf("'") && (str = str.replace(goog.string.singleQuoteRe_, "&#39;"));
  return str;
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /"/g;
goog.string.singleQuoteRe_ = /'/g;
goog.string.allRe_ = /[&<>"']/;
goog.string.unescapeEntities = function $goog$string$unescapeEntities$(str) {
  return goog.string.contains(str, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(str) : goog.string.unescapePureXmlEntities_(str) : str;
};
goog.string.unescapeEntitiesWithDocument = function $goog$string$unescapeEntitiesWithDocument$(str, document) {
  return goog.string.contains(str, "&") ? goog.string.unescapeEntitiesUsingDom_(str, document) : str;
};
goog.string.unescapeEntitiesUsingDom_ = function $goog$string$unescapeEntitiesUsingDom_$(str, opt_document) {
  var seen = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, div;
  div = opt_document ? opt_document.createElement("div") : document.createElement("div");
  return str.replace(goog.string.HTML_ENTITY_PATTERN_, function(s, entity) {
    var value = seen[s];
    if (value) {
      return value;
    }
    if ("#" == entity.charAt(0)) {
      var n = Number("0" + entity.substr(1));
      isNaN(n) || (value = String.fromCharCode(n));
    }
    value || (div.innerHTML = s + " ", value = div.firstChild.nodeValue.slice(0, -1));
    return seen[s] = value;
  });
};
goog.string.unescapePureXmlEntities_ = function $goog$string$unescapePureXmlEntities_$(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return'"';
      default:
        if ("#" == entity.charAt(0)) {
          var n = Number("0" + entity.substr(1));
          if (!isNaN(n)) {
            return String.fromCharCode(n);
          }
        }
        return s;
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function $goog$string$whitespaceEscape$(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml);
};
goog.string.stripQuotes = function $goog$string$stripQuotes$(str, quoteChars) {
  for (var length = quoteChars.length, i = 0;i < length;i++) {
    var quoteChar = 1 == length ? quoteChars : quoteChars.charAt(i);
    if (str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1);
    }
  }
  return str;
};
goog.string.truncate = function $goog$string$truncate$(str, chars, opt_protectEscapedCharacters) {
  opt_protectEscapedCharacters && (str = goog.string.unescapeEntities(str));
  str.length > chars && (str = str.substring(0, chars - 3) + "...");
  opt_protectEscapedCharacters && (str = goog.string.htmlEscape(str));
  return str;
};
goog.string.truncateMiddle = function $goog$string$truncateMiddle$(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  opt_protectEscapedCharacters && (str = goog.string.unescapeEntities(str));
  if (opt_trailingChars && str.length > chars) {
    opt_trailingChars > chars && (opt_trailingChars = chars);
    var endPoint = str.length - opt_trailingChars, startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint);
  } else {
    if (str.length > chars) {
      var half = Math.floor(chars / 2), endPos = str.length - half, half = half + chars % 2;
      str = str.substring(0, half) + "..." + str.substring(endPos);
    }
  }
  opt_protectEscapedCharacters && (str = goog.string.htmlEscape(str));
  return str;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function $goog$string$quote$(s) {
  s = String(s);
  if (s.quote) {
    return s.quote();
  }
  for (var sb = ['"'], i = 0;i < s.length;i++) {
    var ch = s.charAt(i), cc = ch.charCodeAt(0);
    sb[i + 1] = goog.string.specialEscapeChars_[ch] || (31 < cc && 127 > cc ? ch : goog.string.escapeChar(ch));
  }
  sb.push('"');
  return sb.join("");
};
goog.string.escapeString = function $goog$string$escapeString$(str) {
  for (var sb = [], i = 0;i < str.length;i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i));
  }
  return sb.join("");
};
goog.string.escapeChar = function $goog$string$escapeChar$(c) {
  if (c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c];
  }
  if (c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c];
  }
  var rv = c, cc = c.charCodeAt(0);
  if (31 < cc && 127 > cc) {
    rv = c;
  } else {
    if (256 > cc) {
      if (rv = "\\x", 16 > cc || 256 < cc) {
        rv += "0";
      }
    } else {
      rv = "\\u", 4096 > cc && (rv += "0");
    }
    rv += cc.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[c] = rv;
};
goog.string.toMap = function $goog$string$toMap$(s) {
  for (var rv = {}, i = 0;i < s.length;i++) {
    rv[s.charAt(i)] = !0;
  }
  return rv;
};
goog.string.contains = function $goog$string$contains$(str, subString) {
  return-1 != str.indexOf(subString);
};
goog.string.caseInsensitiveContains = function $goog$string$caseInsensitiveContains$(str, subString) {
  return goog.string.contains(str.toLowerCase(), subString.toLowerCase());
};
goog.string.countOf = function $goog$string$countOf$(s, ss) {
  return s && ss ? s.split(ss).length - 1 : 0;
};
goog.string.removeAt = function $goog$string$removeAt$(s, index, stringLength) {
  var resultStr = s;
  0 <= index && index < s.length && 0 < stringLength && (resultStr = s.substr(0, index) + s.substr(index + stringLength, s.length - index - stringLength));
  return resultStr;
};
goog.string.remove = function $goog$string$remove$(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "");
  return s.replace(re, "");
};
goog.string.removeAll = function $goog$string$removeAll$(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "");
};
goog.string.regExpEscape = function $goog$string$regExpEscape$(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = function $goog$string$repeat$(string, length) {
  return Array(length + 1).join(string);
};
goog.string.padNumber = function $goog$string$padNumber$(num, length, opt_precision) {
  var s = goog.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num), index = s.indexOf(".");
  -1 == index && (index = s.length);
  return goog.string.repeat("0", Math.max(0, length - index)) + s;
};
goog.string.makeSafe = function $goog$string$makeSafe$(obj) {
  return null == obj ? "" : String(obj);
};
goog.string.buildString = function $goog$string$buildString$(var_args) {
  return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function $goog$string$getRandomString$() {
  var x = 2147483648;
  return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function $goog$string$compareVersions$(version1, version2) {
  for (var order = 0, v1Subs = goog.string.trim(String(version1)).split("."), v2Subs = goog.string.trim(String(version2)).split("."), subCount = Math.max(v1Subs.length, v2Subs.length), subIdx = 0;0 == order && subIdx < subCount;subIdx++) {
    var v1Sub = v1Subs[subIdx] || "", v2Sub = v2Subs[subIdx] || "", v1CompParser = RegExp("(\\d*)(\\D*)", "g"), v2CompParser = RegExp("(\\d*)(\\D*)", "g");
    do {
      var v1Comp = v1CompParser.exec(v1Sub) || ["", "", ""], v2Comp = v2CompParser.exec(v2Sub) || ["", "", ""];
      if (0 == v1Comp[0].length && 0 == v2Comp[0].length) {
        break;
      }
      var v1CompNum = 0 == v1Comp[1].length ? 0 : parseInt(v1Comp[1], 10), v2CompNum = 0 == v2Comp[1].length ? 0 : parseInt(v2Comp[1], 10), order = goog.string.compareElements_(v1CompNum, v2CompNum) || goog.string.compareElements_(0 == v1Comp[2].length, 0 == v2Comp[2].length) || goog.string.compareElements_(v1Comp[2], v2Comp[2]);
    } while (0 == order);
  }
  return order;
};
goog.string.compareElements_ = function $goog$string$compareElements_$(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function $goog$string$hashCode$(str) {
  for (var result = 0, i = 0;i < str.length;++i) {
    result = 31 * result + str.charCodeAt(i), result %= goog.string.HASHCODE_MAX_;
  }
  return result;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function $goog$string$createUniqueString$() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function $goog$string$toNumber$(str) {
  var num = Number(str);
  return 0 == num && goog.string.isEmpty(str) ? NaN : num;
};
goog.string.isLowerCamelCase = function $goog$string$isLowerCamelCase$(str) {
  return/^[a-z]+([A-Z][a-z]*)*$/.test(str);
};
goog.string.isUpperCamelCase = function $goog$string$isUpperCamelCase$(str) {
  return/^([A-Z][a-z]*)+$/.test(str);
};
goog.string.toCamelCase = function $goog$string$toCamelCase$(str) {
  return String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase();
  });
};
goog.string.toSelectorCase = function $goog$string$toSelectorCase$(str) {
  return String(str).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function $goog$string$toTitleCase$(str, opt_delimiters) {
  var delimiters = goog.isString(opt_delimiters) ? goog.string.regExpEscape(opt_delimiters) : "\\s", delimiters = delimiters ? "|[" + delimiters + "]+" : "", regexp = new RegExp("(^" + delimiters + ")([a-z])", "g");
  return str.replace(regexp, function(all, p1, p2) {
    return p1 + p2.toUpperCase();
  });
};
goog.string.parseInt = function $goog$string$parseInt$(value) {
  isFinite(value) && (value = String(value));
  return goog.isString(value) ? /^\s*-?0x/i.test(value) ? parseInt(value, 16) : parseInt(value, 10) : NaN;
};
goog.string.splitLimit = function $goog$string$splitLimit$(str, separator, limit) {
  for (var parts = str.split(separator), returnVal = [];0 < limit && parts.length;) {
    returnVal.push(parts.shift()), limit--;
  }
  parts.length && returnVal.push(parts.join(separator));
  return returnVal;
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function $goog$asserts$AssertionError$(messagePattern, messageArgs) {
  messageArgs.unshift(messagePattern);
  goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
  messageArgs.shift();
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function $goog$asserts$doAssertFailure_$(defaultMessage, defaultArgs, givenMessage, givenArgs) {
  var message = "Assertion failed";
  if (givenMessage) {
    var message = message + (": " + givenMessage), args = givenArgs
  } else {
    defaultMessage && (message += ": " + defaultMessage, args = defaultArgs);
  }
  throw new goog.asserts.AssertionError("" + message, args || []);
};
goog.asserts.assert = function $goog$asserts$assert$(condition, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !condition && goog.asserts.doAssertFailure_("", null, opt_message, Array.prototype.slice.call(arguments, 2));
  return condition;
};
goog.asserts.fail = function $goog$asserts$fail$(opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function $goog$asserts$assertNumber$(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertString = function $goog$asserts$assertString$(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(value) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertFunction = function $goog$asserts$assertFunction$(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertObject = function $goog$asserts$assertObject$(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(value) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertArray = function $goog$asserts$assertArray$(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(value) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertBoolean = function $goog$asserts$assertBoolean$(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertElement = function $goog$asserts$assertElement$(value, opt_message, var_args) {
  !goog.asserts.ENABLE_ASSERTS || goog.isObject(value) && value.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertInstanceof = function $goog$asserts$assertInstanceof$(value, type, opt_message, var_args) {
  !goog.asserts.ENABLE_ASSERTS || value instanceof type || goog.asserts.doAssertFailure_("instanceof check failed.", null, opt_message, Array.prototype.slice.call(arguments, 3));
  return value;
};
goog.asserts.assertObjectPrototypeIsIntact = function $goog$asserts$assertObjectPrototypeIsIntact$() {
  for (var key in Object.prototype) {
    goog.asserts.fail(key + " should not be enumerable in Object.prototype.");
  }
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function $goog$array$peek$(array) {
  return array[array.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.indexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(arr, obj, opt_fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = null == opt_fromIndex ? 0 : 0 > opt_fromIndex ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if (goog.isString(arr)) {
    return goog.isString(obj) && 1 == obj.length ? arr.indexOf(obj, fromIndex) : -1;
  }
  for (var i = fromIndex;i < arr.length;i++) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return-1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.lastIndexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(null != arr.length);
  var fromIndex = null == opt_fromIndex ? arr.length - 1 : opt_fromIndex;
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(arr, obj, fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = null == opt_fromIndex ? arr.length - 1 : opt_fromIndex;
  0 > fromIndex && (fromIndex = Math.max(0, arr.length + fromIndex));
  if (goog.isString(arr)) {
    return goog.isString(obj) && 1 == obj.length ? arr.lastIndexOf(obj, fromIndex) : -1;
  }
  for (var i = fromIndex;0 <= i;i--) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return-1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.forEach) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    i in arr2 && f.call(opt_obj, arr2[i], i, arr);
  }
};
goog.array.forEachRight = function $goog$array$forEachRight$(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = l - 1;0 <= i;--i) {
    i in arr2 && f.call(opt_obj, arr2[i], i, arr);
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.filter) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, res = [], resLength = 0, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    if (i in arr2) {
      var val = arr2[i];
      f.call(opt_obj, val, i, arr) && (res[resLength++] = val);
    }
  }
  return res;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.map) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, res = Array(l), arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    i in arr2 && (res[i] = f.call(opt_obj, arr2[i], i, arr));
  }
  return res;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduce) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(null != arr.length);
  opt_obj && (f = goog.bind(f, opt_obj));
  return goog.array.ARRAY_PROTOTYPE_.reduce.call(arr, f, val);
} : function(arr, f, val$$0, opt_obj) {
  var rval = val$$0;
  goog.array.forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduceRight) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(null != arr.length);
  opt_obj && (f = goog.bind(f, opt_obj));
  return goog.array.ARRAY_PROTOTYPE_.reduceRight.call(arr, f, val);
} : function(arr, f, val$$0, opt_obj) {
  var rval = val$$0;
  goog.array.forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.some) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return!0;
    }
  }
  return!1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.every) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    if (i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
      return!1;
    }
  }
  return!0;
};
goog.array.count = function $goog$array$count$(arr$$0, f, opt_obj) {
  var count = 0;
  goog.array.forEach(arr$$0, function(element, index, arr) {
    f.call(opt_obj, element, index, arr) && ++count;
  }, opt_obj);
  return count;
};
goog.array.find = function $goog$array$find$(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return 0 > i ? null : goog.isString(arr) ? arr.charAt(i) : arr[i];
};
goog.array.findIndex = function $goog$array$findIndex$(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return-1;
};
goog.array.findRight = function $goog$array$findRight$(arr, f, opt_obj) {
  var i = goog.array.findIndexRight(arr, f, opt_obj);
  return 0 > i ? null : goog.isString(arr) ? arr.charAt(i) : arr[i];
};
goog.array.findIndexRight = function $goog$array$findIndexRight$(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = l - 1;0 <= i;i--) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return-1;
};
goog.array.contains = function $goog$array$contains$(arr, obj) {
  return 0 <= goog.array.indexOf(arr, obj);
};
goog.array.isEmpty = function $goog$array$isEmpty$(arr) {
  return 0 == arr.length;
};
goog.array.clear = function $goog$array$clear$(arr) {
  if (!goog.isArray(arr)) {
    for (var i = arr.length - 1;0 <= i;i--) {
      delete arr[i];
    }
  }
  arr.length = 0;
};
goog.array.insert = function $goog$array$insert$(arr, obj) {
  goog.array.contains(arr, obj) || arr.push(obj);
};
goog.array.insertAt = function $goog$array$insertAt$(arr, obj, opt_i) {
  goog.array.splice(arr, opt_i, 0, obj);
};
goog.array.insertArrayAt = function $goog$array$insertArrayAt$(arr, elementsToAdd, opt_i) {
  goog.partial(goog.array.splice, arr, opt_i, 0).apply(null, elementsToAdd);
};
goog.array.insertBefore = function $goog$array$insertBefore$(arr, obj, opt_obj2) {
  var i;
  2 == arguments.length || 0 > (i = goog.array.indexOf(arr, opt_obj2)) ? arr.push(obj) : goog.array.insertAt(arr, obj, i);
};
goog.array.remove = function $goog$array$remove$(arr, obj) {
  var i = goog.array.indexOf(arr, obj), rv;
  (rv = 0 <= i) && goog.array.removeAt(arr, i);
  return rv;
};
goog.array.removeAt = function $goog$array$removeAt$(arr, i) {
  goog.asserts.assert(null != arr.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length;
};
goog.array.removeIf = function $goog$array$removeIf$(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return 0 <= i ? (goog.array.removeAt(arr, i), !0) : !1;
};
goog.array.concat = function $goog$array$concat$(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.join = function $goog$array$join$(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.toArray = function $goog$array$toArray$(object) {
  var length = object.length;
  if (0 < length) {
    for (var rv = Array(length), i = 0;i < length;i++) {
      rv[i] = object[i];
    }
    return rv;
  }
  return[];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function $goog$array$extend$(arr1, var_args) {
  for (var i = 1;i < arguments.length;i++) {
    var arr2 = arguments[i], isArrayLike;
    if (goog.isArray(arr2) || (isArrayLike = goog.isArrayLike(arr2)) && Object.prototype.hasOwnProperty.call(arr2, "callee")) {
      arr1.push.apply(arr1, arr2);
    } else {
      if (isArrayLike) {
        for (var len1 = arr1.length, len2 = arr2.length, j = 0;j < len2;j++) {
          arr1[len1 + j] = arr2[j];
        }
      } else {
        arr1.push(arr2);
      }
    }
  }
};
goog.array.splice = function $goog$array$splice$(arr, index, howMany, var_args) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(arr, goog.array.slice(arguments, 1));
};
goog.array.slice = function $goog$array$slice$(arr, start, opt_end) {
  goog.asserts.assert(null != arr.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start) : goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end);
};
goog.array.removeDuplicates = function $goog$array$removeDuplicates$(arr, opt_rv, opt_hashFn) {
  for (var returnArray = opt_rv || arr, defaultHashFn = function $defaultHashFn$() {
    return goog.isObject(current) ? "o" + goog.getUid(current) : (typeof current).charAt(0) + current;
  }, hashFn = opt_hashFn || defaultHashFn, seen = {}, cursorInsert = 0, cursorRead = 0;cursorRead < arr.length;) {
    var current = arr[cursorRead++], key = hashFn(current);
    Object.prototype.hasOwnProperty.call(seen, key) || (seen[key] = !0, returnArray[cursorInsert++] = current);
  }
  returnArray.length = cursorInsert;
};
goog.array.binarySearch = function $goog$array$binarySearch$(arr, target, opt_compareFn) {
  return goog.array.binarySearch_(arr, opt_compareFn || goog.array.defaultCompare, !1, target);
};
goog.array.binarySelect = function $goog$array$binarySelect$(arr, evaluator, opt_obj) {
  return goog.array.binarySearch_(arr, evaluator, !0, void 0, opt_obj);
};
goog.array.binarySearch_ = function $goog$array$binarySearch_$(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
  for (var left = 0, right = arr.length, found;left < right;) {
    var middle = left + right >> 1, compareResult;
    compareResult = isEvaluator ? compareFn.call(opt_selfObj, arr[middle], middle, arr) : compareFn(opt_target, arr[middle]);
    0 < compareResult ? left = middle + 1 : (right = middle, found = !compareResult);
  }
  return found ? left : ~left;
};
goog.array.sort = function $goog$array$sort$(arr, opt_compareFn) {
  arr.sort(opt_compareFn || goog.array.defaultCompare);
};
goog.array.stableSort = function $goog$array$stableSort$(arr, opt_compareFn) {
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index;
  }
  for (var i = 0;i < arr.length;i++) {
    arr[i] = {index:i, value:arr[i]};
  }
  var valueCompareFn = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, stableCompareFn);
  for (i = 0;i < arr.length;i++) {
    arr[i] = arr[i].value;
  }
};
goog.array.sortObjectsByKey = function $goog$array$sortObjectsByKey$(arr, key, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, function(a, b) {
    return compare(a[key], b[key]);
  });
};
goog.array.isSorted = function $goog$array$isSorted$(arr, opt_compareFn, opt_strict) {
  for (var compare = opt_compareFn || goog.array.defaultCompare, i = 1;i < arr.length;i++) {
    var compareResult = compare(arr[i - 1], arr[i]);
    if (0 < compareResult || 0 == compareResult && opt_strict) {
      return!1;
    }
  }
  return!0;
};
goog.array.equals = function $goog$array$equals$(arr1, arr2, opt_equalsFn) {
  if (!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
    return!1;
  }
  for (var l = arr1.length, equalsFn = opt_equalsFn || goog.array.defaultCompareEquality, i = 0;i < l;i++) {
    if (!equalsFn(arr1[i], arr2[i])) {
      return!1;
    }
  }
  return!0;
};
goog.array.compare3 = function $goog$array$compare3$(arr1, arr2, opt_compareFn) {
  for (var compare = opt_compareFn || goog.array.defaultCompare, l = Math.min(arr1.length, arr2.length), i = 0;i < l;i++) {
    var result = compare(arr1[i], arr2[i]);
    if (0 != result) {
      return result;
    }
  }
  return goog.array.defaultCompare(arr1.length, arr2.length);
};
goog.array.defaultCompare = function $goog$array$defaultCompare$(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};
goog.array.defaultCompareEquality = function $goog$array$defaultCompareEquality$(a, b) {
  return a === b;
};
goog.array.binaryInsert = function $goog$array$binaryInsert$(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return 0 > index ? (goog.array.insertAt(array, value, -(index + 1)), !0) : !1;
};
goog.array.binaryRemove = function $goog$array$binaryRemove$(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return 0 <= index ? goog.array.removeAt(array, index) : !1;
};
goog.array.bucket = function $goog$array$bucket$(array, sorter, opt_obj) {
  for (var buckets = {}, i = 0;i < array.length;i++) {
    var value = array[i], key = sorter.call(opt_obj, value, i, array);
    if (goog.isDef(key)) {
      var bucket = buckets[key] || (buckets[key] = []);
      bucket.push(value);
    }
  }
  return buckets;
};
goog.array.toObject = function $goog$array$toObject$(arr, keyFunc, opt_obj) {
  var ret = {};
  goog.array.forEach(arr, function(element, index) {
    ret[keyFunc.call(opt_obj, element, index, arr)] = element;
  });
  return ret;
};
goog.array.range = function $goog$array$range$(startOrEnd, opt_end, opt_step) {
  var array = [], start = 0, end = startOrEnd, step = opt_step || 1;
  void 0 !== opt_end && (start = startOrEnd, end = opt_end);
  if (0 > step * (end - start)) {
    return[];
  }
  if (0 < step) {
    for (var i = start;i < end;i += step) {
      array.push(i);
    }
  } else {
    for (i = start;i > end;i += step) {
      array.push(i);
    }
  }
  return array;
};
goog.array.repeat = function $goog$array$repeat$(value, n) {
  for (var array = [], i = 0;i < n;i++) {
    array[i] = value;
  }
  return array;
};
goog.array.flatten = function $goog$array$flatten$(var_args) {
  for (var result = [], i = 0;i < arguments.length;i++) {
    var element = arguments[i];
    goog.isArray(element) ? result.push.apply(result, goog.array.flatten.apply(null, element)) : result.push(element);
  }
  return result;
};
goog.array.rotate = function $goog$array$rotate$(array, n) {
  goog.asserts.assert(null != array.length);
  array.length && (n %= array.length, 0 < n ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(array, array.splice(-n, n)) : 0 > n && goog.array.ARRAY_PROTOTYPE_.push.apply(array, array.splice(0, -n)));
  return array;
};
goog.array.moveItem = function $goog$array$moveItem$(arr, fromIndex, toIndex) {
  goog.asserts.assert(0 <= fromIndex && fromIndex < arr.length);
  goog.asserts.assert(0 <= toIndex && toIndex < arr.length);
  var removedItems = goog.array.ARRAY_PROTOTYPE_.splice.call(arr, fromIndex, 1);
  goog.array.ARRAY_PROTOTYPE_.splice.call(arr, toIndex, 0, removedItems[0]);
};
goog.array.zip = function $goog$array$zip$(var_args) {
  if (!arguments.length) {
    return[];
  }
  for (var result = [], i = 0;;i++) {
    for (var value = [], j = 0;j < arguments.length;j++) {
      var arr = arguments[j];
      if (i >= arr.length) {
        return result;
      }
      value.push(arr[i]);
    }
    result.push(value);
  }
};
goog.array.shuffle = function $goog$array$shuffle$(arr, opt_randFn) {
  for (var randFn = opt_randFn || Math.random, i = arr.length - 1;0 < i;i--) {
    var j = Math.floor(randFn() * (i + 1)), tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
};
goog.object = {};
goog.object.forEach = function $goog$object$forEach$(obj, f, opt_obj) {
  for (var key in obj) {
    f.call(opt_obj, obj[key], key, obj);
  }
};
goog.object.filter = function $goog$object$filter$(obj, f, opt_obj) {
  var res = {}, key;
  for (key in obj) {
    f.call(opt_obj, obj[key], key, obj) && (res[key] = obj[key]);
  }
  return res;
};
goog.object.map = function $goog$object$map$(obj, f, opt_obj) {
  var res = {}, key;
  for (key in obj) {
    res[key] = f.call(opt_obj, obj[key], key, obj);
  }
  return res;
};
goog.object.some = function $goog$object$some$(obj, f, opt_obj) {
  for (var key in obj) {
    if (f.call(opt_obj, obj[key], key, obj)) {
      return!0;
    }
  }
  return!1;
};
goog.object.every = function $goog$object$every$(obj, f, opt_obj) {
  for (var key in obj) {
    if (!f.call(opt_obj, obj[key], key, obj)) {
      return!1;
    }
  }
  return!0;
};
goog.object.getCount = function $goog$object$getCount$(obj) {
  var rv = 0, key;
  for (key in obj) {
    rv++;
  }
  return rv;
};
goog.object.getAnyKey = function $goog$object$getAnyKey$(obj) {
  for (var key in obj) {
    return key;
  }
};
goog.object.getAnyValue = function $goog$object$getAnyValue$(obj) {
  for (var key in obj) {
    return obj[key];
  }
};
goog.object.contains = function $goog$object$contains$(obj, val) {
  return goog.object.containsValue(obj, val);
};
goog.object.getValues = function $goog$object$getValues$(obj) {
  var res = [], i = 0, key;
  for (key in obj) {
    res[i++] = obj[key];
  }
  return res;
};
goog.object.getKeys = function $goog$object$getKeys$(obj) {
  var res = [], i = 0, key;
  for (key in obj) {
    res[i++] = key;
  }
  return res;
};
goog.object.getValueByKeys = function $goog$object$getValueByKeys$(obj, var_args) {
  for (var isArrayLike = goog.isArrayLike(var_args), keys = isArrayLike ? var_args : arguments, i = isArrayLike ? 0 : 1;i < keys.length && (obj = obj[keys[i]], goog.isDef(obj));i++) {
  }
  return obj;
};
goog.object.containsKey = function $goog$object$containsKey$(obj, key) {
  return key in obj;
};
goog.object.containsValue = function $goog$object$containsValue$(obj, val) {
  for (var key in obj) {
    if (obj[key] == val) {
      return!0;
    }
  }
  return!1;
};
goog.object.findKey = function $goog$object$findKey$(obj, f, opt_this) {
  for (var key in obj) {
    if (f.call(opt_this, obj[key], key, obj)) {
      return key;
    }
  }
};
goog.object.findValue = function $goog$object$findValue$(obj, f, opt_this) {
  var key = goog.object.findKey(obj, f, opt_this);
  return key && obj[key];
};
goog.object.isEmpty = function $goog$object$isEmpty$(obj) {
  for (var key in obj) {
    return!1;
  }
  return!0;
};
goog.object.clear = function $goog$object$clear$(obj) {
  for (var i in obj) {
    delete obj[i];
  }
};
goog.object.remove = function $goog$object$remove$(obj, key) {
  var rv;
  (rv = key in obj) && delete obj[key];
  return rv;
};
goog.object.add = function $goog$object$add$(obj, key, val) {
  if (key in obj) {
    throw Error('The object already contains the key "' + key + '"');
  }
  goog.object.set(obj, key, val);
};
goog.object.get = function $goog$object$get$(obj, key, opt_val) {
  return key in obj ? obj[key] : opt_val;
};
goog.object.set = function $goog$object$set$(obj, key, value) {
  obj[key] = value;
};
goog.object.setIfUndefined = function $goog$object$setIfUndefined$(obj, key, value) {
  return key in obj ? obj[key] : obj[key] = value;
};
goog.object.clone = function $goog$object$clone$(obj) {
  var res = {}, key;
  for (key in obj) {
    res[key] = obj[key];
  }
  return res;
};
goog.object.unsafeClone = function $goog$object$unsafeClone$(obj) {
  var type = goog.typeOf(obj);
  if ("object" == type || "array" == type) {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = "array" == type ? [] : {}, key;
    for (key in obj) {
      clone[key] = goog.object.unsafeClone(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.object.transpose = function $goog$object$transpose$(obj) {
  var transposed = {}, key;
  for (key in obj) {
    transposed[obj[key]] = key;
  }
  return transposed;
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function $goog$object$extend$(target, var_args) {
  for (var key, source, i = 1;i < arguments.length;i++) {
    source = arguments[i];
    for (key in source) {
      target[key] = source[key];
    }
    for (var j = 0;j < goog.object.PROTOTYPE_FIELDS_.length;j++) {
      key = goog.object.PROTOTYPE_FIELDS_[j], Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
  }
};
goog.object.create = function $goog$object$create$(var_args) {
  var argLength = arguments.length;
  if (1 == argLength && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0]);
  }
  if (argLength % 2) {
    throw Error("Uneven number of arguments");
  }
  for (var rv = {}, i = 0;i < argLength;i += 2) {
    rv[arguments[i]] = arguments[i + 1];
  }
  return rv;
};
goog.object.createSet = function $goog$object$createSet$(var_args) {
  var argLength = arguments.length;
  if (1 == argLength && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0]);
  }
  for (var rv = {}, i = 0;i < argLength;i++) {
    rv[arguments[i]] = !0;
  }
  return rv;
};
goog.object.createImmutableView = function $goog$object$createImmutableView$(obj) {
  var result = obj;
  Object.isFrozen && !Object.isFrozen(obj) && (result = Object.create(obj), Object.freeze(result));
  return result;
};
goog.object.isImmutableView = function $goog$object$isImmutableView$(obj) {
  return!!Object.isFrozen && Object.isFrozen(obj);
};
i18n.input.lang = {};
i18n.input.lang.InputToolCode = {INPUTMETHOD_ARRAY92_CHINESE_TRADITIONAL:"zh-hant-t-i0-array-1992", INPUTMETHOD_CANGJIE82_CHINESE_SIMPLIFIED:"zh-hans-t-i0-cangjie-1982", INPUTMETHOD_CANGJIE82_CHINESE_TRADITIONAL:"zh-hant-t-i0-cangjie-1982", INPUTMETHOD_CANGJIE87_CHINESE_SIMPLIFIED:"zh-hans-t-i0-cangjie-1987", INPUTMETHOD_CANGJIE87_CHINESE_TRADITIONAL:"zh-hant-t-i0-cangjie-1987", INPUTMETHOD_CANGJIE87_QUICK_CHINESE_TRADITIONAL:"zh-hant-t-i0-cangjie-1987-x-m0-simplified", INPUTMETHOD_CANTONESE_TRADITIONAL:"yue-hant-t-i0-und", 
INPUTMETHOD_DAYI88_CHINESE_TRADITIONAL:"zh-hant-t-i0-dayi-1988", INPUTMETHOD_PINYIN_CHINESE_SIMPLIFIED:"zh-t-i0-pinyin", INPUTMETHOD_PINYIN_CHINESE_TRADITIONAL:"zh-hant-t-i0-pinyin", INPUTMETHOD_TRANSLITERATION_AMHARIC:"am-t-i0-und", INPUTMETHOD_TRANSLITERATION_ARABIC:"ar-t-i0-und", INPUTMETHOD_TRANSLITERATION_BELARUSIAN:"be-t-i0-und", INPUTMETHOD_TRANSLITERATION_BENGALI:"bn-t-i0-und", INPUTMETHOD_TRANSLITERATION_BULGARIAN:"bg-t-i0-und", INPUTMETHOD_TRANSLITERATION_DUTCH:"nl-t-i0-und", INPUTMETHOD_TRANSLITERATION_ENGLISH:"en-t-i0-und", 
INPUTMETHOD_TRANSLITERATION_FRENCH:"fr-t-i0-und", INPUTMETHOD_TRANSLITERATION_GERMAN:"de-t-i0-und", INPUTMETHOD_TRANSLITERATION_GREEK:"el-t-i0-und", INPUTMETHOD_TRANSLITERATION_GUJARATI:"gu-t-i0-und", INPUTMETHOD_TRANSLITERATION_HEBREW:"he-t-i0-und", INPUTMETHOD_TRANSLITERATION_HINDI:"hi-t-i0-und", INPUTMETHOD_TRANSLITERATION_HIRAGANA:"ja-hira-t-i0-und", INPUTMETHOD_TRANSLITERATION_ITALIAN:"it-t-i0-und", INPUTMETHOD_TRANSLITERATION_JAPANESE:"ja-t-ja-hira-i0-und", INPUTMETHOD_TRANSLITERATION_KANNADA:"kn-t-i0-und", 
INPUTMETHOD_TRANSLITERATION_MALAYALAM:"ml-t-i0-und", INPUTMETHOD_TRANSLITERATION_MARATHI:"mr-t-i0-und", INPUTMETHOD_TRANSLITERATION_NEPALI:"ne-t-i0-und", INPUTMETHOD_TRANSLITERATION_ORIYA:"or-t-i0-und", INPUTMETHOD_TRANSLITERATION_PERSIAN:"fa-t-i0-und", INPUTMETHOD_TRANSLITERATION_POLISH:"pl-t-i0-und", INPUTMETHOD_TRANSLITERATION_PORTUGUESE:"pt-t-i0-und", INPUTMETHOD_TRANSLITERATION_PORTUGUESE_BRRAZIL:"pt-br-t-i0-und", INPUTMETHOD_TRANSLITERATION_PUNJABI:"pa-t-i0-und", INPUTMETHOD_TRANSLITERATION_RUSSIAN:"ru-t-i0-und", 
INPUTMETHOD_TRANSLITERATION_SANSKRIT:"sa-t-i0-und", INPUTMETHOD_TRANSLITERATION_SERBIAN:"sr-t-i0-und", INPUTMETHOD_TRANSLITERATION_SINHALESE:"si-t-i0-und", INPUTMETHOD_TRANSLITERATION_SPANISH:"es-t-i0-und", INPUTMETHOD_TRANSLITERATION_TAMIL:"ta-t-i0-und", INPUTMETHOD_TRANSLITERATION_TELUGU:"te-t-i0-und", INPUTMETHOD_TRANSLITERATION_TIGRINYA:"ti-t-i0-und", INPUTMETHOD_TRANSLITERATION_TURKISH:"tr-t-i0-und", INPUTMETHOD_TRANSLITERATION_UKRAINE:"uk-t-i0-und", INPUTMETHOD_TRANSLITERATION_URDU:"ur-t-i0-und", 
INPUTMETHOD_TRANSLITERATION_VIETNAMESE:"vi-t-i0-und", INPUTMETHOD_WUBI_CHINESE_SIMPLIFIED:"zh-t-i0-wubi-1986", INPUTMETHOD_ZHUYIN_CHINESE_TRADITIONAL:"zh-hant-t-i0-und", KEYBOARD_ALBANIAN:"sq-t-k0-und", KEYBOARD_ARABIC:"ar-t-k0-und", KEYBOARD_ARMENIAN_EASTERN:"hy-hyr-t-k0-und", KEYBOARD_ARMENIAN_WESTERN:"hy-hyt-t-k0-und", KEYBOARD_BASQUE:"eu-t-k0-und", KEYBOARD_BELARUSIAN:"be-t-k0-und", KEYBOARD_BENGALI_INSCRIPT:"bn-t-k0-und", KEYBOARD_BENGALI_PHONETIC:"bn-t-und-latn-k0-und", KEYBOARD_BOSNIAN:"bs-t-k0-und", 
KEYBOARD_BRAZILIAN_PORTUGUESE:"pt-br-t-k0-und", KEYBOARD_BULGARIAN:"bg-t-k0-und", KEYBOARD_BULGARIAN_PHONETIC:"bg-t-k0-qwerty", KEYBOARD_CATALAN:"ca-t-k0-und", KEYBOARD_CHEROKEE:"chr-t-k0-und", KEYBOARD_CHEROKEE_PHONETIC:"chr-t-und-latn-k0-und", KEYBOARD_CROATIAN:"hr-t-k0-und", KEYBOARD_CZECH:"cs-t-k0-und", KEYBOARD_CZECH_QWERTZ:"cs-t-k0-qwertz", KEYBOARD_DANISH:"da-t-k0-und", KEYBOARD_DARI:"prs-t-k0-und", KEYBOARD_DEVANAGARI_PHONETIC:"hi-t-k0-qwerty", KEYBOARD_DUTCH:"nl-t-k0-und", KEYBOARD_DUTCH_INTL:"nl-t-k0-intl", 
KEYBOARD_DZONGKHA:"dz-t-k0-und", KEYBOARD_ENGLISH:"en-t-k0-und", KEYBOARD_ENGLISH_DVORAK:"en-t-k0-dvorak", KEYBOARD_ESTONIAN:"et-t-k0-und", KEYBOARD_ETHIOPIC:"und-ethi-t-k0-und", KEYBOARD_TIGRINYA_ETHIOPIC:"ti-ethi-t-k0-und", KEYBOARD_FINNISH:"fi-t-k0-und", KEYBOARD_FRENCH:"fr-t-k0-und", KEYBOARD_FRENCH_INTL:"fr-t-k0-intl", KEYBOARD_GALICIAN:"gl-t-k0-und", KEYBOARD_GEORGIAN_QWERTY:"ka-t-k0-und", KEYBOARD_GEORGIAN_TYPEWRITER:"ka-t-k0-legacy", KEYBOARD_GERMAN:"de-t-k0-und", KEYBOARD_GERMAN_INTL:"de-t-k0-intl", 
KEYBOARD_GREEK:"el-t-k0-und", KEYBOARD_GUJARATI_INSCRIPT:"gu-t-k0-und", KEYBOARD_GUJARATI_PHONETIC:"gu-t-und-latn-k0-qwerty", KEYBOARD_GURMUKHI_INSCRIPT:"pa-guru-t-k0-und", KEYBOARD_GURMUKHI_PHONETIC:"pa-guru-t-und-latn-k0-und", KEYBOARD_HAITIAN:"ht-t-k0-und", KEYBOARD_HEBREW:"he-t-k0-und", KEYBOARD_HINDI:"hi-t-k0-und", KEYBOARD_HUNGARIAN_101:"hu-t-k0-101key", KEYBOARD_ICELANDIC:"is-t-k0-und", KEYBOARD_INDONESIAN:"id-t-k0-und", KEYBOARD_IRISH:"ga-t-k0-und", KEYBOARD_ITALIAN:"it-t-k0-und", KEYBOARD_ITALIAN_INTL:"it-t-k0-intl", 
KEYBOARD_JAVANESE:"jw-t-k0-und", KEYBOARD_KANNADA_INSCRIPT:"kn-t-k0-und", KEYBOARD_KANNADA_PHONETIC:"kn-t-und-latn-k0-und", KEYBOARD_KAZAKH:"kk-t-k0-und", KEYBOARD_KHMER:"km-t-k0-und", KEYBOARD_KOREAN:"ko-t-k0-und", KEYBOARD_KYRGYZ:"ky-cyrl-t-k0-und", KEYBOARD_LAO:"lo-t-k0-und", KEYBOARD_LATVIAN:"lv-t-k0-und", KEYBOARD_LITHUANIAN:"lt-t-k0-und", KEYBOARD_MACEDONIAN:"mk-t-k0-und", KEYBOARD_MALAY:"ms-t-k0-und", KEYBOARD_MALAYALAM_INSCRIPT:"ml-t-k0-und", KEYBOARD_MALAYALAM_PHONETIC:"ml-t-und-latn-k0-und", 
KEYBOARD_MALTESE:"mt-t-k0-und", KEYBOARD_MAORI:"mi-t-k0-und", KEYBOARD_MARATHI:"mr-t-k0-und", KEYBOARD_MONGOLIAN_CYRILLIC:"mn-cyrl-t-k0-und", KEYBOARD_MONTENEGRIN:"srp-t-k0-und", KEYBOARD_MYANMAR:"my-t-k0-und", KEYBOARD_NAVAJO:"nv-t-k0-und", KEYBOARD_NEPALI_INSCRIPT:"ne-t-k0-und", KEYBOARD_NEPALI_PHONETIC:"ne-t-und-latn-k0-und", KEYBOARD_NORWEGIAN:"no-t-k0-und", KEYBOARD_ORIYA_INSCRIPT:"or-t-k0-und", KEYBOARD_ORIYA_PHONETIC:"or-t-und-latn-k0-und", KEYBOARD_PAN_AFRICA_LATIN:"latn-002-t-k0-und", KEYBOARD_PASHTO:"ps-t-k0-und", 
KEYBOARD_PERSIAN:"fa-t-k0-und", KEYBOARD_POLISH:"pl-t-k0-und", KEYBOARD_PORTUGUESE:"pt-pt-t-k0-und", KEYBOARD_PORTUGUESE_BRAZIL_INTL:"pt-br-t-k0-intl", KEYBOARD_PORTUGUESE_PORTUGAL_INTL:"pt-pt-t-k0-intl", KEYBOARD_ROMANI:"rom-t-k0-und", KEYBOARD_ROMANIAN:"ro-t-k0-und", KEYBOARD_ROMANIAN_SR13392_PRIMARY:"ro-t-k0-legacy", KEYBOARD_ROMANIAN_SR13392_SECONDARY:"ro-t-k0-extended", KEYBOARD_RUSSIAN:"ru-t-k0-und", KEYBOARD_RUSSIAN_PHONETIC:"ru-t-k0-qwerty", KEYBOARD_SANSKRIT_PHONETIC:"sa-t-und-latn-k0-und", 
KEYBOARD_SERBIAN_CYRILLIC:"sr-cyrl-t-k0-und", KEYBOARD_SERBIAN_LATIN:"sr-latn-t-k0-und", KEYBOARD_SINHALA:"si-t-k0-und", KEYBOARD_SLOVAK:"sk-t-k0-und", KEYBOARD_SLOVAK_QWERTY:"sk-t-k0-qwerty", KEYBOARD_SLOVENIAN:"sl-t-k0-und", KEYBOARD_SOUTHERN_UZBEK:"uzs-t-k0-und", KEYBOARD_SPANISH:"es-t-k0-und", KEYBOARD_SPANISH_INTL:"es-t-k0-intl", KEYBOARD_SWAHILI:"sw-t-k0-und", KEYBOARD_SWEDISH:"sv-t-k0-und", KEYBOARD_SWISS_GERMAN:"de-ch-t-k0-und", KEYBOARD_TAGALOG:"tl-t-k0-und", KEYBOARD_TAMIL_99:"ta-t-k0-ta99", 
KEYBOARD_TAMIL_INSCRIPT:"ta-t-k0-und", KEYBOARD_TAMIL_ITRANS:"ta-t-k0-itrans", KEYBOARD_TAMIL_PHONETIC:"ta-t-und-latn-k0-und", KEYBOARD_TAMIL_TYPEWRITER:"ta-t-k0-typewriter", KEYBOARD_TATAR:"tt-t-k0-und", KEYBOARD_TELUGU_INSCRIPT:"te-t-k0-und", KEYBOARD_TELUGU_PHONETIC:"te-t-und-latn-k0-und", KEYBOARD_THAI:"th-t-k0-und", KEYBOARD_THAI_PATTAJOTI:"th-t-k0-pattajoti", KEYBOARD_THAI_TIS:"th-t-k0-tis", KEYBOARD_TIGRINYA:"ti-t-k0-und", KEYBOARD_TURKISH_F:"tr-t-k0-legacy", KEYBOARD_TURKISH_Q:"tr-t-k0-und", 
KEYBOARD_UIGHUR:"ug-t-k0-und", KEYBOARD_UKRAINIAN_101:"uk-t-k0-101key", KEYBOARD_URDU:"ur-t-k0-und", KEYBOARD_US_INTERNATIONAL:"en-us-t-k0-intl", KEYBOARD_UZBEK_CYRILLIC_PHONETIC:"uz-cyrl-t-k0-und", KEYBOARD_UZBEK_CYRILLIC_TYPEWRITTER:"uz-cyrl-t-k0-legacy", KEYBOARD_UZBEK_LATIN:"uz-latn-t-k0-und", KEYBOARD_VIETNAMESE_TCVN:"vi-t-k0-und", KEYBOARD_VIETNAMESE_TELEX:"vi-t-k0-legacy", KEYBOARD_VIETNAMESE_VIQR:"vi-t-k0-viqr", KEYBOARD_VIETNAMESE_VNI:"vi-t-k0-vni", KEYBOARD_WELSH:"cy-t-k0-und", KEYBOARD_YIDDISH:"yi-t-k0-und", 
HANDWRIT_AFRIKAANS:"af-t-i0-handwrit", HANDWRIT_ALBANIAN:"sq-t-i0-handwrit", HANDWRIT_ARABIC:"ar-t-i0-handwrit", HANDWRIT_BASQUE:"eu-t-i0-handwrit", HANDWRIT_BELARUSIAN:"be-t-i0-handwrit", HANDWRIT_BOSNIAN:"bs-t-i0-handwrit", HANDWRIT_BULGARIAN:"bg-t-i0-handwrit", HANDWRIT_CANTONESE:"zh-yue-t-i0-handwrit", HANDWRIT_CATALAN:"ca-t-i0-handwrit", HANDWRIT_CEBUANO:"ceb-t-i0-handwrit", HANDWRIT_CHINESE:"zh-t-i0-handwrit", HANDWRIT_CHINESE_SIMPLIFIED:"zh-hans-t-i0-handwrit", HANDWRIT_CHINESE_TRADITIONAL:"zh-hant-t-i0-handwrit", 
HANDWRIT_CROATIAN:"hr-t-i0-handwrit", HANDWRIT_CZECH:"cs-t-i0-handwrit", HANDWRIT_DANISH:"da-t-i0-handwrit", HANDWRIT_DUTCH:"nl-t-i0-handwrit", HANDWRIT_ENGLISH:"en-t-i0-handwrit", HANDWRIT_ESPERANTO:"eo-t-i0-handwrit", HANDWRIT_ESTONIAN:"et-t-i0-handwrit", HANDWRIT_FILIPINO:"fil-t-i0-handwrit", HANDWRIT_FINNISH:"fi-t-i0-handwrit", HANDWRIT_FRENCH:"fr-t-i0-handwrit", HANDWRIT_GALICIAN:"gl-t-i0-handwrit", HANDWRIT_GERMAN:"de-t-i0-handwrit", HANDWRIT_GREEK:"el-t-i0-handwrit", HANDWRIT_GUJARATI:"gu-t-i0-handwrit", 
HANDWRIT_HAITIAN:"ht-t-i0-handwrit", HANDWRIT_HEBREW:"he-t-i0-handwrit", HANDWRIT_HINDI:"hi-t-i0-handwrit", HANDWRIT_HMONG:"hmn-t-i0-handwrit", HANDWRIT_HUNGARIAN:"hu-t-i0-handwrit", HANDWRIT_ICELANDIC:"is-t-i0-handwrit", HANDWRIT_INDONESIAN:"id-t-i0-handwrit", HANDWRIT_IRISH:"ga-t-i0-handwrit", HANDWRIT_ITALIAN:"it-t-i0-handwrit", HANDWRIT_JAPANESE:"ja-t-i0-handwrit", HANDWRIT_JAVANESE:"jv-t-i0-handwrit", HANDWRIT_KANNADA:"kn-t-i0-handwrit", HANDWRIT_KOREAN:"ko-t-i0-handwrit", HANDWRIT_LATIN:"la-t-i0-handwrit", 
HANDWRIT_LATVIAN:"lv-t-i0-handwrit", HANDWRIT_LITHUANIAN:"lt-t-i0-handwrit", HANDWRIT_MACEDONIAN:"mk-t-i0-handwrit", HANDWRIT_MALAY:"ms-t-i0-handwrit", HANDWRIT_MALTESE:"mt-t-i0-handwrit", HANDWRIT_MAORI:"mi-t-i0-handwrit", HANDWRIT_MARATHI:"mr-t-i0-handwrit", HANDWRIT_MONGOLIAN:"mn-t-i0-handwrit", HANDWRIT_NORWEGIAN:"no-t-i0-handwrit", HANDWRIT_NORWEGIAN_BOKMAL:"nb-t-i0-handwrit", HANDWRIT_NORWEGIAN_NYNORSK:"nn-t-i0-handwrit", HANDWRIT_PERSIAN:"fa-t-i0-handwrit", HANDWRIT_POLISH:"pl-t-i0-handwrit", 
HANDWRIT_PORTUGUESE:"pt-t-i0-handwrit", HANDWRIT_PORTUGUESE_BRAZIL:"pt-br-t-i0-handwrit", HANDWRIT_PORTUGUESE_PORTUGAL:"pt-pt-t-i0-handwrit", HANDWRIT_PUNJABI:"pa-t-i0-handwrit", HANDWRIT_ROMANIAN:"ro-t-i0-handwrit", HANDWRIT_RUSSIAN:"ru-t-i0-handwrit", HANDWRIT_SERBIAN:"sr-t-i0-handwrit", HANDWRIT_SLOVAK:"sk-t-i0-handwrit", HANDWRIT_SLOVENIAN:"sl-t-i0-handwrit", HANDWRIT_SOMALI:"so-t-i0-handwrit", HANDWRIT_SPANISH:"es-t-i0-handwrit", HANDWRIT_SWAHILI:"sw-t-i0-handwrit", HANDWRIT_SWEDISH:"sv-t-i0-handwrit", 
HANDWRIT_TAMIL:"ta-t-i0-handwrit", HANDWRIT_TELUGU:"te-t-i0-handwrit", HANDWRIT_THAI:"th-t-i0-handwrit", HANDWRIT_TURKISH:"tr-t-i0-handwrit", HANDWRIT_UKRAINIAN:"uk-t-i0-handwrit", HANDWRIT_VIETNAMESE:"vi-t-i0-handwrit", HANDWRIT_WELSH:"cy-t-i0-handwrit", HANDWRIT_ZULU:"zu-t-i0-handwrit"};
i18n.input.lang.InputToolType = {IME:"im", KBD:"vkd", HWT:"hw"};
i18n.input.lang.InputTool = function $i18n$input$lang$InputTool$(inputToolCode) {
  this.code = inputToolCode;
  this.type = null;
  this.parseInputToolCode_();
};
i18n.input.lang.InputTool.RtlKeyboards = [i18n.input.lang.InputToolCode.KEYBOARD_ARABIC, i18n.input.lang.InputToolCode.KEYBOARD_DARI, i18n.input.lang.InputToolCode.KEYBOARD_HEBREW, i18n.input.lang.InputToolCode.KEYBOARD_PASHTO, i18n.input.lang.InputToolCode.KEYBOARD_PERSIAN, i18n.input.lang.InputToolCode.KEYBOARD_SOUTHERN_UZBEK, i18n.input.lang.InputToolCode.KEYBOARD_UIGHUR, i18n.input.lang.InputToolCode.KEYBOARD_URDU, i18n.input.lang.InputToolCode.KEYBOARD_YIDDISH];
i18n.input.lang.InputTool.RtlIMEs = [i18n.input.lang.InputToolCode.INPUTMETHOD_TRANSLITERATION_ARABIC, i18n.input.lang.InputToolCode.INPUTMETHOD_TRANSLITERATION_HEBREW, i18n.input.lang.InputToolCode.INPUTMETHOD_TRANSLITERATION_PERSIAN, i18n.input.lang.InputToolCode.INPUTMETHOD_TRANSLITERATION_URDU];
i18n.input.lang.InputTool.instances_ = {};
i18n.input.lang.InputTool.get = function $i18n$input$lang$InputTool$get$(inputToolCode) {
  if (!inputToolCode) {
    return null;
  }
  goog.object.contains(i18n.input.lang.InputToolCode, inputToolCode) || (inputToolCode = i18n.input.lang.InputTool.parseToBCP47_(inputToolCode));
  inputToolCode = inputToolCode.replace(/_/g, "-");
  goog.object.contains(i18n.input.lang.InputToolCode, inputToolCode) || (inputToolCode = i18n.input.lang.InputTool.parseToBCP47_(inputToolCode + "-und"));
  return i18n.input.lang.InputTool.instances_[inputToolCode] ? i18n.input.lang.InputTool.instances_[inputToolCode] : goog.object.contains(i18n.input.lang.InputToolCode, inputToolCode) ? (i18n.input.lang.InputTool.instances_[inputToolCode] = new i18n.input.lang.InputTool(inputToolCode), i18n.input.lang.InputTool.instances_[inputToolCode]) : null;
};
i18n.input.lang.InputTool.PHONETIC_INSCRIPT_LANGS_ = "bn gu pa kn ml or sa ta te ne".split(" ");
i18n.input.lang.InputTool.BCP47_SPECIAL_ = {im_pinyin_zh_hans:i18n.input.lang.InputToolCode.INPUTMETHOD_PINYIN_CHINESE_SIMPLIFIED, im_pinyin_zh_hant:i18n.input.lang.InputToolCode.INPUTMETHOD_PINYIN_CHINESE_TRADITIONAL, im_t13n_ja:i18n.input.lang.InputToolCode.INPUTMETHOD_TRANSLITERATION_JAPANESE, "im_t13n_ja-Hira":i18n.input.lang.InputToolCode.INPUTMETHOD_TRANSLITERATION_HIRAGANA, im_wubi_zh_hans:i18n.input.lang.InputToolCode.INPUTMETHOD_WUBI_CHINESE_SIMPLIFIED, im_zhuyin_zh_hant:i18n.input.lang.InputToolCode.INPUTMETHOD_ZHUYIN_CHINESE_TRADITIONAL, 
vkd_bg_phone:i18n.input.lang.InputToolCode.KEYBOARD_BULGARIAN_PHONETIC, vkd_chr_phone:i18n.input.lang.InputToolCode.KEYBOARD_CHEROKEE_PHONETIC, vkd_cs_qwertz:i18n.input.lang.InputToolCode.KEYBOARD_CZECH_QWERTZ, vkd_deva_phone:i18n.input.lang.InputToolCode.KEYBOARD_DEVANAGARI_PHONETIC, vkd_en_dvorak:i18n.input.lang.InputToolCode.KEYBOARD_ENGLISH_DVORAK, vkd_es_es:i18n.input.lang.InputToolCode.KEYBOARD_SPANISH, vkd_ethi:i18n.input.lang.InputToolCode.KEYBOARD_ETHIOPIC, vkd_gu_phone:i18n.input.lang.InputToolCode.KEYBOARD_GUJARATI_PHONETIC, 
vkd_guru_inscript:i18n.input.lang.InputToolCode.KEYBOARD_GURMUKHI_INSCRIPT, vkd_guru_phone:i18n.input.lang.InputToolCode.KEYBOARD_GURMUKHI_PHONETIC, vkd_hu_101:i18n.input.lang.InputToolCode.KEYBOARD_HUNGARIAN_101, vkd_hy_east:i18n.input.lang.InputToolCode.KEYBOARD_ARMENIAN_EASTERN, vkd_hy_west:i18n.input.lang.InputToolCode.KEYBOARD_ARMENIAN_WESTERN, vkd_ka_qwerty:i18n.input.lang.InputToolCode.KEYBOARD_GEORGIAN_QWERTY, vkd_ka_typewriter:i18n.input.lang.InputToolCode.KEYBOARD_GEORGIAN_TYPEWRITER, vkd_ro_sr13392_primary:i18n.input.lang.InputToolCode.KEYBOARD_ROMANIAN_SR13392_PRIMARY, 
vkd_ro_sr13392_secondary:i18n.input.lang.InputToolCode.KEYBOARD_ROMANIAN_SR13392_SECONDARY, vkd_sk_qwerty:i18n.input.lang.InputToolCode.KEYBOARD_SLOVAK_QWERTY, vkd_ta_itrans:i18n.input.lang.InputToolCode.KEYBOARD_TAMIL_ITRANS, vkd_ta_tamil99:i18n.input.lang.InputToolCode.KEYBOARD_TAMIL_99, vkd_ta_typewriter:i18n.input.lang.InputToolCode.KEYBOARD_TAMIL_TYPEWRITER, vkd_th_pattajoti:i18n.input.lang.InputToolCode.KEYBOARD_THAI_PATTAJOTI, vkd_th_tis:i18n.input.lang.InputToolCode.KEYBOARD_THAI_TIS, vkd_tr_f:i18n.input.lang.InputToolCode.KEYBOARD_TURKISH_F, 
vkd_tr_q:i18n.input.lang.InputToolCode.KEYBOARD_TURKISH_Q, vkd_uk_101:i18n.input.lang.InputToolCode.KEYBOARD_UKRAINIAN_101, vkd_uz_cyrl_phone:i18n.input.lang.InputToolCode.KEYBOARD_UZBEK_CYRILLIC_PHONETIC, vkd_uz_cyrl_type:i18n.input.lang.InputToolCode.KEYBOARD_UZBEK_CYRILLIC_TYPEWRITTER, vkd_vi_tcvn:i18n.input.lang.InputToolCode.KEYBOARD_VIETNAMESE_TCVN, vkd_vi_telex:i18n.input.lang.InputToolCode.KEYBOARD_VIETNAMESE_TELEX, vkd_vi_viqr:i18n.input.lang.InputToolCode.KEYBOARD_VIETNAMESE_VIQR};
i18n.input.lang.InputTool.BCP47_SPECIAL_REVERSE_ = goog.object.transpose(i18n.input.lang.InputTool.BCP47_SPECIAL_);
i18n.input.lang.InputTool.SpecialLayoutCodes_ = goog.object.create(i18n.input.lang.InputToolCode.KEYBOARD_DUTCH_INTL, "us_intl", i18n.input.lang.InputToolCode.KEYBOARD_FRENCH_INTL, "us_intl", i18n.input.lang.InputToolCode.KEYBOARD_GERMAN_INTL, "us_intl", i18n.input.lang.InputToolCode.KEYBOARD_HAITIAN, "fr", i18n.input.lang.InputToolCode.KEYBOARD_INDONESIAN, "latn_002", i18n.input.lang.InputToolCode.KEYBOARD_IRISH, "latn_002", i18n.input.lang.InputToolCode.KEYBOARD_ITALIAN_INTL, "us_intl", i18n.input.lang.InputToolCode.KEYBOARD_JAVANESE, 
"latn_002", i18n.input.lang.InputToolCode.KEYBOARD_MARATHI, "deva_phone", i18n.input.lang.InputToolCode.KEYBOARD_MALAY, "latn_002", i18n.input.lang.InputToolCode.KEYBOARD_PORTUGUESE_BRAZIL_INTL, "us_intl", i18n.input.lang.InputToolCode.KEYBOARD_PORTUGUESE_PORTUGAL_INTL, "us_intl", i18n.input.lang.InputToolCode.KEYBOARD_SPANISH_INTL, "us_intl", i18n.input.lang.InputToolCode.KEYBOARD_SWAHILI, "latn_002", i18n.input.lang.InputToolCode.KEYBOARD_TAGALOG, "latn_002", i18n.input.lang.InputToolCode.KEYBOARD_TIGRINYA, 
"ethi", i18n.input.lang.InputToolCode.KEYBOARD_WELSH, "latn_002");
i18n.input.lang.InputTool.parseToBCP47_ = function $i18n$input$lang$InputTool$parseToBCP47_$(itCode) {
  if (i18n.input.lang.InputTool.BCP47_SPECIAL_[itCode]) {
    return i18n.input.lang.InputTool.BCP47_SPECIAL_[itCode];
  }
  if ("vkd_iw" == itCode) {
    return i18n.input.lang.InputToolCode.KEYBOARD_HEBREW;
  }
  if ("im_t13n_iw" == itCode) {
    return i18n.input.lang.InputToolCode.INPUTMETHOD_TRANSLITERATION_HEBREW;
  }
  if ("tr-t-k0-lagacy" == itCode) {
    return i18n.input.lang.InputToolCode.KEYBOARD_TURKISH_F;
  }
  var parts = itCode.split("_"), code;
  code = goog.string.startsWith(itCode, "im_t13n") ? parts[2] + "-t-i0-und" : 2 == parts.length ? parts[1] + "-t-k0-und" : goog.array.contains(i18n.input.lang.InputTool.PHONETIC_INSCRIPT_LANGS_, parts[1]) ? "inscript" == parts[2] ? parts[1] + "-t-k0-und" : parts[1] + "-t-und-latn-k0-und" : parts[1] + "-" + parts[2] + "-t-k0-und";
  return goog.object.contains(i18n.input.lang.InputToolCode, code) ? code : itCode;
};
i18n.input.lang.InputTool.getInputTool = function $i18n$input$lang$InputTool$getInputTool$(type, code) {
  return type == i18n.input.lang.InputToolType.IME ? "zh" == code || "zh-Hans" == code ? i18n.input.lang.InputTool.get(i18n.input.lang.InputToolCode.INPUTMETHOD_PINYIN_CHINESE_SIMPLIFIED) : "zh-Hant" == code ? i18n.input.lang.InputTool.get(i18n.input.lang.InputToolCode.INPUTMETHOD_ZHUYIN_CHINESE_TRADITIONAL) : "ja" == code ? i18n.input.lang.InputTool.get(i18n.input.lang.InputToolCode.INPUTMETHOD_TRANSLITERATION_JAPANESE) : i18n.input.lang.InputTool.get(code + "-t-i0-und") : type == i18n.input.lang.InputToolType.KBD ? 
  i18n.input.lang.InputTool.get("vkd_" + code) : null;
};
i18n.input.lang.InputTool.prototype.parseLayoutCode_ = function $i18n$input$lang$InputTool$$parseLayoutCode_$() {
  if (!i18n.input.lang.InputTool.SpecialLayoutCodes_[this.code]) {
    if (i18n.input.lang.InputTool.BCP47_SPECIAL_REVERSE_[this.code]) {
      i18n.input.lang.InputTool.BCP47_SPECIAL_REVERSE_[this.code].slice(4);
    } else {
      var parts = this.code.split("-t-"), countryCode = parts[0], inputToolType = parts[1], countryCode = countryCode.replace(/-/g, "_");
      "en_us" == countryCode && (countryCode = "us");
      if ((!goog.array.contains(i18n.input.lang.InputTool.PHONETIC_INSCRIPT_LANGS_, countryCode) || "und-latn-k0-und" != inputToolType && "k0-und" != inputToolType) && "k0-und" != inputToolType) {
        var matches = inputToolType.match(/k0-(.*)/);
        matches[1] && matches[1].replace("qwerty", "phone");
      }
    }
  }
};
i18n.input.lang.InputTool.prototype.parseInputToolCode_ = function $i18n$input$lang$InputTool$$parseInputToolCode_$() {
  0 <= this.code.indexOf("-i0") ? (this.type = i18n.input.lang.InputToolType.IME, goog.string.endsWith(this.code, "-handwrit") && (this.type = i18n.input.lang.InputToolType.HWT)) : 0 <= this.code.indexOf("-k0") && (this.type = i18n.input.lang.InputToolType.KBD);
  var codes = this.code.split(/-t|-i0|-k0/);
  "yue-hant" == codes[0] && (codes[0] = "zh-Hant");
  switch(this.code) {
    case i18n.input.lang.InputToolCode.INPUTMETHOD_CANTONESE_TRADITIONAL:
      codes[0] = "zh-Hant";
      break;
    case i18n.input.lang.InputToolCode.INPUTMETHOD_PINYIN_CHINESE_SIMPLIFIED:
    ;
    case i18n.input.lang.InputToolCode.INPUTMETHOD_WUBI_CHINESE_SIMPLIFIED:
      codes[0] = "zh-Hans";
  }
  this.formatLanguageCode_(codes[0]);
  codes[1] && this.formatLanguageCode_(codes[1]);
  this.type == i18n.input.lang.InputToolType.KBD && this.parseLayoutCode_();
};
i18n.input.lang.InputTool.prototype.toString = function $i18n$input$lang$InputTool$$toString$() {
  return this.code;
};
i18n.input.lang.InputTool.prototype.isRightToLeft = function $i18n$input$lang$InputTool$$isRightToLeft$() {
  return goog.array.contains(i18n.input.lang.InputTool.RtlIMEs, this.code) || goog.array.contains(i18n.input.lang.InputTool.RtlKeyboards, this.code);
};
i18n.input.lang.InputTool.prototype.formatLanguageCode_ = function $i18n$input$lang$InputTool$$formatLanguageCode_$(code) {
  if ("und-ethi" == code) {
    return "et";
  }
  var parts = code.split("-"), retCode;
  return retCode = 2 == parts.length ? 2 == parts[1].length ? parts[0] + "-" + parts[1].toUpperCase() : parts[0] + "-" + parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : parts[0];
};
i18n.input.keyboard = {};
i18n.input.keyboard.KeyCode = {};
i18n.input.keyboard.KeyCode.CODES101 = "\u00c01234567890\u00bd\u00bbQWERTYUIOP\u00db\u00dd\u00dcASDFGHJKL\u00ba\u00deZXCVBNM\u00bc\u00be\u00bf ";
i18n.input.keyboard.KeyCode.CODES102 = "\u00c01234567890\u00bd\u00bbQWERTYUIOP\u00db\u00ddASDFGHJKL\u00ba\u00de\u00dc\u00e2ZXCVBNM\u00bc\u00be\u00bf ";
i18n.input.keyboard.KeyCode.ALLCODES101 = "\u00c01234567890\u00bd\u00bb\b\tQWERTYUIOP\u00db\u00dd\u00dc\u0014ASDFGHJKL\u00ba\u00de\r\u0010ZXCVBNM\u00bc\u00be\u00bf\u0010\u0111 \u0111";
i18n.input.keyboard.KeyCode.ALLCODES102 = "\u00c01234567890\u00bd\u00bb\b\tQWERTYUIOP\u00db\u00dd\r\u0014ASDFGHJKL\u00ba\u00de\u00dc\r\u0010\u00e2ZXCVBNM\u00bc\u00be\u00bf\u0010\u0111 \u0111";
i18n.input.keyboard.KeyCode.OEM_CODES = {de:goog.object.create(["Y", 90, "Z", 89, "\u00dc", 192, "\u00db", 189, "\u00dd", 187, "\u00ba", 219, "\u00bb", 221, "\u00bf", 220, "\u00cc", 186, "\u00bd", 191]), fr:goog.object.create(["Q", 65, "A", 81, "Z", 87, "W", 90, "\u00dd", 219, "\u00ba", 221, "M", 186, "\u00c0", 222, "\u00de", 192, "\u00bc", 77, "\u00be", 188, "\u00bf", 190, "\u00df", 191, "\u00db", 189])};
i18n.input.keyboard.KeyCode.MOZ_CODES = {59:186, 61:187, 107:187, 109:189, 173:189};
i18n.input.keyboard.KeyCode.MOZ_SHIFT_CHAR_CODES = {126:192, 95:189, 124:220, 58:186, 60:188, 62:190, 63:191};
i18n.input.keyboard.ParsedLayout = function $i18n$input$keyboard$ParsedLayout$(layout) {
  this.id = layout.id;
  this.view = {id:layout.id, title:layout.title, isRTL:"rtl" == layout.direction, is102:!!layout.is102Keyboard, mappings:goog.object.create(["", null, "s", null, "c", null, "l", null, "sc", null, "cl", null, "sl", null, "scl", null])};
  this.ambiRegex_ = this.transforms = null;
  this.parseKeyMappings_(layout);
  this.parseTransforms_(layout);
};
i18n.input.keyboard.ParsedLayout.prototype.parseKeyMappings_ = function $i18n$input$keyboard$ParsedLayout$$parseKeyMappings_$(layout) {
  var codes = this.view.is102 ? i18n.input.keyboard.KeyCode.CODES102 : i18n.input.keyboard.KeyCode.CODES101, mappings = layout.mappings, m;
  for (m in mappings) {
    var map = mappings[m], modes = m.split(/,/);
    modes.join(",") != m && modes.push("");
    var parsed = {}, from;
    for (from in map) {
      var to = map[from];
      if ("" == from && (from = codes, this.view.is102)) {
        var normalizedTo = to.slice(0, 25), normalizedTo = normalizedTo + to.slice(26, 37), normalizedTo = normalizedTo + to.charAt(25), to = normalizedTo += to.slice(37)
      }
      from = from.replace("m", "\u00bd");
      from = from.replace("=", "\u00bb");
      from = from.replace(";", "\u00ba");
      if (1 == from.length) {
        parsed[from] = goog.isArray(to) ? to : ["S", to, to];
      } else {
        for (var j = 0, i = 0, c;c = from.charAt(i);++i) {
          var t = to.charAt(j++);
          if (t == to.charAt(j) && "{" == t) {
            var k = to.indexOf("}}", j);
            if (k < j) {
              break;
            }
            var s = to.slice(j + 1, k), parts = s.split("||");
            3 == parts.length ? parsed[c] = parts : 1 == parts.length && (parsed[c] = ["S", s, s]);
            j = k + 2;
          } else {
            parsed[c] = ["S", t, t];
          }
        }
      }
    }
    for (var i = 0, mode;mode = modes[i], void 0 != mode;++i) {
      this.view.mappings[mode] = parsed;
    }
  }
};
i18n.input.keyboard.ParsedLayout.prototype.parseTransforms_ = function $i18n$input$keyboard$ParsedLayout$$parseTransforms_$(layout) {
  var transforms = layout.transform;
  if (transforms) {
    var regobjs = [], regexesalone = [], sum_numgrps = 1, regex;
    for (regex in transforms) {
      var regobj = new RegExp(regex + "$"), repl = transforms[regex];
      regobjs[sum_numgrps] = [regobj, repl];
      regexesalone.push("(" + regex + "$)");
      var grpCountRegexp = new RegExp(regex + "|.*"), numgrps = grpCountRegexp.exec("").length, sum_numgrps = sum_numgrps + numgrps;
    }
    var longregobj = new RegExp(regexesalone.join("|"));
    this.transforms = [longregobj, regobjs];
  }
  var hisPruReg = layout.historyPruneRegex;
  hisPruReg && (this.ambiRegex_ = new RegExp("^(" + hisPruReg + ")$"));
};
i18n.input.keyboard.ParsedLayout.prototype.transform = function $i18n$input$keyboard$ParsedLayout$$transform$(prevstr, transat, ch) {
  if (!this.transforms) {
    return null;
  }
  var str;
  str = 0 < transat ? prevstr.slice(0, transat) + "\u001d" + prevstr.slice(transat) + ch : prevstr + ch;
  var longr = this.transforms[0], matchArr = longr.exec(str);
  if (matchArr) {
    for (var rs = this.transforms[1], i = 1;i < matchArr.length && !matchArr[i];i++) {
    }
    var matchGroup = i, regobj = rs[matchGroup][0], repl = rs[matchGroup][1], m = regobj.exec(str), rmstr = str.slice(m.index), numseps = -1 < rmstr.search("\u001d") ? 1 : 0, backlen = rmstr.length - numseps - ch.length, newstr = str.replace(regobj, repl), replstr = newstr.slice(m.index), replstr = replstr.replace("\u001d", "");
    return{back:backlen, chars:replstr};
  }
  return null;
};
i18n.input.keyboard.ParsedLayout.prototype.isAmbiChars = function $i18n$input$keyboard$ParsedLayout$$isAmbiChars$(chars) {
  return this.ambiRegex_ ? !!this.ambiRegex_.exec(chars) : !1;
};
goog.functions = {};
goog.functions.constant = function $goog$functions$constant$(retValue) {
  return function() {
    return retValue;
  };
};
goog.functions.FALSE = goog.functions.constant(!1);
goog.functions.TRUE = goog.functions.constant(!0);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function $goog$functions$identity$(opt_returnValue) {
  return opt_returnValue;
};
goog.functions.error = function $goog$functions$error$(message) {
  return function() {
    throw Error(message);
  };
};
goog.functions.fail = function $goog$functions$fail$(err) {
  return function() {
    throw err;
  };
};
goog.functions.lock = function $goog$functions$lock$(f, opt_numArgs) {
  opt_numArgs = opt_numArgs || 0;
  return function() {
    return f.apply(this, Array.prototype.slice.call(arguments, 0, opt_numArgs));
  };
};
goog.functions.nth = function $goog$functions$nth$(n) {
  return function() {
    return arguments[n];
  };
};
goog.functions.withReturnValue = function $goog$functions$withReturnValue$(f, retValue) {
  return goog.functions.sequence(f, goog.functions.constant(retValue));
};
goog.functions.compose = function $goog$functions$compose$(fn, var_args) {
  var functions = arguments, length = functions.length;
  return function() {
    var result;
    length && (result = functions[length - 1].apply(this, arguments));
    for (var i = length - 2;0 <= i;i--) {
      result = functions[i].call(this, result);
    }
    return result;
  };
};
goog.functions.sequence = function $goog$functions$sequence$(var_args) {
  var functions = arguments, length = functions.length;
  return function() {
    for (var result, i = 0;i < length;i++) {
      result = functions[i].apply(this, arguments);
    }
    return result;
  };
};
goog.functions.and = function $goog$functions$and$(var_args) {
  var functions = arguments, length = functions.length;
  return function() {
    for (var i = 0;i < length;i++) {
      if (!functions[i].apply(this, arguments)) {
        return!1;
      }
    }
    return!0;
  };
};
goog.functions.or = function $goog$functions$or$(var_args) {
  var functions = arguments, length = functions.length;
  return function() {
    for (var i = 0;i < length;i++) {
      if (functions[i].apply(this, arguments)) {
        return!0;
      }
    }
    return!1;
  };
};
goog.functions.not = function $goog$functions$not$(f) {
  return function() {
    return!f.apply(this, arguments);
  };
};
goog.functions.create = function $goog$functions$create$(constructor, var_args) {
  var temp = function $temp$() {
  };
  temp.prototype = constructor.prototype;
  var obj = new temp;
  constructor.apply(obj, Array.prototype.slice.call(arguments, 1));
  return obj;
};
goog.functions.CACHE_RETURN_VALUE = !0;
goog.functions.cacheReturnValue = function $goog$functions$cacheReturnValue$(fn) {
  var called = !1, value;
  return function() {
    if (!goog.functions.CACHE_RETURN_VALUE) {
      return fn();
    }
    called || (value = fn(), called = !0);
    return value;
  };
};
goog.math = {};
goog.math.randomInt = function $goog$math$randomInt$(a) {
  return Math.floor(Math.random() * a);
};
goog.math.uniformRandom = function $goog$math$uniformRandom$(a, b) {
  return a + Math.random() * (b - a);
};
goog.math.clamp = function $goog$math$clamp$(value, min, max) {
  return Math.min(Math.max(value, min), max);
};
goog.math.modulo = function $goog$math$modulo$(a, b) {
  var r = a % b;
  return 0 > r * b ? r + b : r;
};
goog.math.lerp = function $goog$math$lerp$(a, b, x) {
  return a + x * (b - a);
};
goog.math.nearlyEquals = function $goog$math$nearlyEquals$(a, b, opt_tolerance) {
  return Math.abs(a - b) <= (opt_tolerance || 1E-6);
};
goog.math.standardAngle = function $goog$math$standardAngle$(angle) {
  return goog.math.modulo(angle, 360);
};
goog.math.standardAngleInRadians = function $goog$math$standardAngleInRadians$(angle) {
  return goog.math.modulo(angle, 2 * Math.PI);
};
goog.math.toRadians = function $goog$math$toRadians$(angleDegrees) {
  return angleDegrees * Math.PI / 180;
};
goog.math.toDegrees = function $goog$math$toDegrees$(angleRadians) {
  return 180 * angleRadians / Math.PI;
};
goog.math.angleDx = function $goog$math$angleDx$(degrees, radius) {
  return radius * Math.cos(goog.math.toRadians(degrees));
};
goog.math.angleDy = function $goog$math$angleDy$(degrees, radius) {
  return radius * Math.sin(goog.math.toRadians(degrees));
};
goog.math.angle = function $goog$math$angle$(x1, y1, x2, y2) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(y2 - y1, x2 - x1)));
};
goog.math.angleDifference = function $goog$math$angleDifference$(startAngle, endAngle) {
  var d = goog.math.standardAngle(endAngle) - goog.math.standardAngle(startAngle);
  180 < d ? d -= 360 : -180 >= d && (d = 360 + d);
  return d;
};
goog.math.sign = function $goog$math$sign$(x) {
  return 0 == x ? 0 : 0 > x ? -1 : 1;
};
goog.math.longestCommonSubsequence = function $goog$math$longestCommonSubsequence$(array1, array2, opt_compareFn, opt_collectorFn) {
  for (var compare = opt_compareFn || function(a, b) {
    return a == b;
  }, collect = opt_collectorFn || function(i1) {
    return array1[i1];
  }, length1 = array1.length, length2 = array2.length, arr = [], i = 0;i < length1 + 1;i++) {
    arr[i] = [], arr[i][0] = 0;
  }
  for (var j = 0;j < length2 + 1;j++) {
    arr[0][j] = 0;
  }
  for (i = 1;i <= length1;i++) {
    for (j = 1;j <= length2;j++) {
      compare(array1[i - 1], array2[j - 1]) ? arr[i][j] = arr[i - 1][j - 1] + 1 : arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);
    }
  }
  for (var result = [], i = length1, j = length2;0 < i && 0 < j;) {
    compare(array1[i - 1], array2[j - 1]) ? (result.unshift(collect(i - 1, j - 1)), i--, j--) : arr[i - 1][j] > arr[i][j - 1] ? i-- : j--;
  }
  return result;
};
goog.math.sum = function $goog$math$sum$(var_args) {
  return goog.array.reduce(arguments, function(sum, value) {
    return sum + value;
  }, 0);
};
goog.math.average = function $goog$math$average$(var_args) {
  return goog.math.sum.apply(null, arguments) / arguments.length;
};
goog.math.sampleVariance = function $goog$math$sampleVariance$(var_args) {
  var sampleSize = arguments.length;
  if (2 > sampleSize) {
    return 0;
  }
  var mean = goog.math.average.apply(null, arguments), variance = goog.math.sum.apply(null, goog.array.map(arguments, function(val) {
    return Math.pow(val - mean, 2);
  })) / (sampleSize - 1);
  return variance;
};
goog.math.standardDeviation = function $goog$math$standardDeviation$(var_args) {
  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));
};
goog.math.isInt = function $goog$math$isInt$(num) {
  return isFinite(num) && 0 == num % 1;
};
goog.math.isFiniteNumber = function $goog$math$isFiniteNumber$(num) {
  return isFinite(num) && !isNaN(num);
};
goog.math.log10Floor = function $goog$math$log10Floor$(num) {
  if (0 < num) {
    var x = Math.round(Math.log(num) * Math.LOG10E);
    return x - (parseFloat("1e" + x) > num);
  }
  return 0 == num ? -Infinity : NaN;
};
goog.math.safeFloor = function $goog$math$safeFloor$(num, opt_epsilon) {
  goog.asserts.assert(!goog.isDef(opt_epsilon) || 0 < opt_epsilon);
  return Math.floor(num + (opt_epsilon || 2E-15));
};
goog.math.safeCeil = function $goog$math$safeCeil$(num, opt_epsilon) {
  goog.asserts.assert(!goog.isDef(opt_epsilon) || 0 < opt_epsilon);
  return Math.ceil(num - (opt_epsilon || 2E-15));
};
goog.math.Coordinate = function $goog$math$Coordinate$(opt_x, opt_y) {
  this.x = goog.isDef(opt_x) ? opt_x : 0;
  this.y = goog.isDef(opt_y) ? opt_y : 0;
};
goog.math.Coordinate.prototype.clone = function $goog$math$Coordinate$$clone$() {
  return new goog.math.Coordinate(this.x, this.y);
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function $goog$math$Coordinate$$toString$() {
  return "(" + this.x + ", " + this.y + ")";
});
goog.math.Coordinate.equals = function $goog$math$Coordinate$equals$(a, b) {
  return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1;
};
goog.math.Coordinate.distance = function $goog$math$Coordinate$distance$(a, b) {
  var dx = a.x - b.x, dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};
goog.math.Coordinate.magnitude = function $goog$math$Coordinate$magnitude$(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
};
goog.math.Coordinate.azimuth = function $goog$math$Coordinate$azimuth$(a) {
  return goog.math.angle(0, 0, a.x, a.y);
};
goog.math.Coordinate.squaredDistance = function $goog$math$Coordinate$squaredDistance$(a, b) {
  var dx = a.x - b.x, dy = a.y - b.y;
  return dx * dx + dy * dy;
};
goog.math.Coordinate.difference = function $goog$math$Coordinate$difference$(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y);
};
goog.math.Coordinate.sum = function $goog$math$Coordinate$sum$(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y);
};
goog.math.Coordinate.prototype.ceil = function $goog$math$Coordinate$$ceil$() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this;
};
goog.math.Coordinate.prototype.floor = function $goog$math$Coordinate$$floor$() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this;
};
goog.math.Coordinate.prototype.round = function $goog$math$Coordinate$$round$() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this;
};
goog.math.Coordinate.prototype.translate = function $goog$math$Coordinate$$translate$(tx, opt_ty) {
  tx instanceof goog.math.Coordinate ? (this.x += tx.x, this.y += tx.y) : (this.x += tx, goog.isNumber(opt_ty) && (this.y += opt_ty));
  return this;
};
goog.math.Size = function $goog$math$Size$(width, height) {
  this.width = width;
  this.height = height;
};
goog.math.Size.equals = function $goog$math$Size$equals$(a, b) {
  return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1;
};
goog.math.Size.prototype.clone = function $goog$math$Size$$clone$() {
  return new goog.math.Size(this.width, this.height);
};
goog.DEBUG && (goog.math.Size.prototype.toString = function $goog$math$Size$$toString$() {
  return "(" + this.width + " x " + this.height + ")";
});
goog.math.Size.prototype.area = function $goog$math$Size$$area$() {
  return this.width * this.height;
};
goog.math.Size.prototype.isEmpty = function $goog$math$Size$$isEmpty$() {
  return!this.area();
};
goog.math.Size.prototype.ceil = function $goog$math$Size$$ceil$() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Size.prototype.floor = function $goog$math$Size$$floor$() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Size.prototype.round = function $goog$math$Size$$round$() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function $goog$labs$userAgent$util$getNativeUserAgentString_$() {
  var navigator = goog.labs.userAgent.util.getNavigator_();
  if (navigator) {
    var userAgent = navigator.userAgent;
    if (userAgent) {
      return userAgent;
    }
  }
  return "";
};
goog.labs.userAgent.util.getNavigator_ = function $goog$labs$userAgent$util$getNavigator_$() {
  return goog.global.navigator;
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function $goog$labs$userAgent$util$setUserAgent$(opt_userAgent) {
  goog.labs.userAgent.util.userAgent_ = opt_userAgent || goog.labs.userAgent.util.getNativeUserAgentString_();
};
goog.labs.userAgent.util.getUserAgent = function $goog$labs$userAgent$util$getUserAgent$() {
  return goog.labs.userAgent.util.userAgent_;
};
goog.labs.userAgent.util.matchUserAgent = function $goog$labs$userAgent$util$matchUserAgent$(str) {
  var userAgent = goog.labs.userAgent.util.getUserAgent();
  return goog.string.contains(userAgent, str);
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function $goog$labs$userAgent$util$matchUserAgentIgnoreCase$(str) {
  var userAgent = goog.labs.userAgent.util.getUserAgent();
  return goog.string.caseInsensitiveContains(userAgent, str);
};
goog.labs.userAgent.util.extractVersionTuples = function $goog$labs$userAgent$util$extractVersionTuples$(userAgent) {
  for (var versionRegExp = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), data = [], match;match = versionRegExp.exec(userAgent);) {
    data.push([match[1], match[2], match[3] || void 0]);
  }
  return data;
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function $goog$labs$userAgent$browser$matchOpera_$() {
  return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR");
};
goog.labs.userAgent.browser.matchIE_ = function $goog$labs$userAgent$browser$matchIE_$() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.browser.matchFirefox_ = function $goog$labs$userAgent$browser$matchFirefox_$() {
  return goog.labs.userAgent.util.matchUserAgent("Firefox");
};
goog.labs.userAgent.browser.matchSafari_ = function $goog$labs$userAgent$browser$matchSafari_$() {
  return goog.labs.userAgent.util.matchUserAgent("Safari") && !goog.labs.userAgent.util.matchUserAgent("Chrome") && !goog.labs.userAgent.util.matchUserAgent("CriOS") && !goog.labs.userAgent.util.matchUserAgent("Android");
};
goog.labs.userAgent.browser.matchChrome_ = function $goog$labs$userAgent$browser$matchChrome_$() {
  return goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS");
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function $goog$labs$userAgent$browser$matchAndroidBrowser_$() {
  return goog.labs.userAgent.util.matchUserAgent("Android") && !goog.labs.userAgent.util.matchUserAgent("Chrome") && !goog.labs.userAgent.util.matchUserAgent("CriOS");
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function $goog$labs$userAgent$browser$isSilk$() {
  return goog.labs.userAgent.util.matchUserAgent("Silk");
};
goog.labs.userAgent.browser.getVersion = function $goog$labs$userAgent$browser$getVersion$() {
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  if (goog.labs.userAgent.browser.isIE()) {
    return goog.labs.userAgent.browser.getIEVersion_(userAgentString);
  }
  if (goog.labs.userAgent.browser.isOpera()) {
    return goog.labs.userAgent.browser.getOperaVersion_(userAgentString);
  }
  var versionTuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString);
  return goog.labs.userAgent.browser.getVersionFromTuples_(versionTuples);
};
goog.labs.userAgent.browser.isVersionOrHigher = function $goog$labs$userAgent$browser$isVersionOrHigher$(version) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), version);
};
goog.labs.userAgent.browser.getIEVersion_ = function $goog$labs$userAgent$browser$getIEVersion_$(userAgent) {
  var rv = /rv: *([\d\.]*)/.exec(userAgent);
  if (rv && rv[1]) {
    return rv[1];
  }
  var version = "", msie = /MSIE +([\d\.]+)/.exec(userAgent);
  if (msie && msie[1]) {
    var tridentVersion = /Trident\/(\d.\d)/.exec(userAgent);
    if ("7.0" == msie[1]) {
      if (tridentVersion && tridentVersion[1]) {
        switch(tridentVersion[1]) {
          case "4.0":
            version = "8.0";
            break;
          case "5.0":
            version = "9.0";
            break;
          case "6.0":
            version = "10.0";
            break;
          case "7.0":
            version = "11.0";
        }
      } else {
        version = "7.0";
      }
    } else {
      version = msie[1];
    }
  }
  return version;
};
goog.labs.userAgent.browser.getOperaVersion_ = function $goog$labs$userAgent$browser$getOperaVersion_$(userAgent) {
  var versionTuples = goog.labs.userAgent.util.extractVersionTuples(userAgent), lastTuple = goog.array.peek(versionTuples);
  return "OPR" == lastTuple[0] && lastTuple[1] ? lastTuple[1] : goog.labs.userAgent.browser.getVersionFromTuples_(versionTuples);
};
goog.labs.userAgent.browser.getVersionFromTuples_ = function $goog$labs$userAgent$browser$getVersionFromTuples_$(versionTuples) {
  goog.asserts.assert(2 < versionTuples.length, "Couldn't extract version tuple from user agent string");
  return versionTuples[2] && versionTuples[2][1] ? versionTuples[2][1] : "";
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function $goog$labs$userAgent$engine$isPresto$() {
  return goog.labs.userAgent.util.matchUserAgent("Presto");
};
goog.labs.userAgent.engine.isTrident = function $goog$labs$userAgent$engine$isTrident$() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.engine.isWebKit = function $goog$labs$userAgent$engine$isWebKit$() {
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit");
};
goog.labs.userAgent.engine.isGecko = function $goog$labs$userAgent$engine$isGecko$() {
  return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident();
};
goog.labs.userAgent.engine.getVersion = function $goog$labs$userAgent$engine$getVersion$() {
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  if (userAgentString) {
    var tuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString), engineTuple = tuples[1];
    if (engineTuple) {
      return "Gecko" == engineTuple[0] ? goog.labs.userAgent.engine.getVersionForKey_(tuples, "Firefox") : engineTuple[1];
    }
    var browserTuple = tuples[0], info;
    if (browserTuple && (info = browserTuple[2])) {
      var match = /Trident\/([^\s;]+)/.exec(info);
      if (match) {
        return match[1];
      }
    }
  }
  return "";
};
goog.labs.userAgent.engine.isVersionOrHigher = function $goog$labs$userAgent$engine$isVersionOrHigher$(version) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), version);
};
goog.labs.userAgent.engine.getVersionForKey_ = function $goog$labs$userAgent$engine$getVersionForKey_$(tuples, key) {
  var pair = goog.array.find(tuples, function(pair) {
    return key == pair[0];
  });
  return pair && pair[1] || "";
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function $goog$userAgent$getUserAgentString$() {
  return goog.labs.userAgent.util.getUserAgent();
};
goog.userAgent.getNavigator = function $goog$userAgent$getNavigator$() {
  return goog.global.navigator || null;
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function $goog$userAgent$isMobile_$() {
  return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function $goog$userAgent$determinePlatform_$() {
  var navigator = goog.userAgent.getNavigator();
  return navigator && navigator.platform || "";
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD;
goog.userAgent.initPlatform_ = function $goog$userAgent$initPlatform_$() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11");
  var ua = goog.userAgent.getUserAgentString();
  goog.userAgent.detectedAndroid_ = !!ua && goog.string.contains(ua, "Android");
  goog.userAgent.detectedIPhone_ = !!ua && goog.string.contains(ua, "iPhone");
  goog.userAgent.detectedIPad_ = !!ua && goog.string.contains(ua, "iPad");
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.userAgent.detectedAndroid_;
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.userAgent.detectedIPhone_;
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.userAgent.detectedIPad_;
goog.userAgent.determineVersion_ = function $goog$userAgent$determineVersion_$() {
  var version = "", re;
  if (goog.userAgent.OPERA && goog.global.opera) {
    var operaVersion = goog.global.opera.version;
    return goog.isFunction(operaVersion) ? operaVersion() : operaVersion;
  }
  goog.userAgent.GECKO ? re = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? re = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && (re = /WebKit\/(\S+)/);
  if (re) {
    var arr = re.exec(goog.userAgent.getUserAgentString()), version = arr ? arr[1] : ""
  }
  if (goog.userAgent.IE) {
    var docMode = goog.userAgent.getDocumentMode_();
    if (docMode > parseFloat(version)) {
      return String(docMode);
    }
  }
  return version;
};
goog.userAgent.getDocumentMode_ = function $goog$userAgent$getDocumentMode_$() {
  var doc = goog.global.document;
  return doc ? doc.documentMode : void 0;
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function $goog$userAgent$compare$(v1, v2) {
  return goog.string.compareVersions(v1, v2);
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function $goog$userAgent$isVersionOrHigher$(version) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[version] || (goog.userAgent.isVersionOrHigherCache_[version] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, version));
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function $goog$userAgent$isDocumentModeOrHigher$(documentMode) {
  return goog.userAgent.IE && goog.userAgent.DOCUMENT_MODE >= documentMode;
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
var JSCompiler_inline_result$$0;
var doc$$inline_1 = goog.global.document;
if (doc$$inline_1 && goog.userAgent.IE) {
  var mode$$inline_2 = goog.userAgent.getDocumentMode_();
  JSCompiler_inline_result$$0 = mode$$inline_2 || ("CSS1Compat" == doc$$inline_1.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5);
} else {
  JSCompiler_inline_result$$0 = void 0;
}
goog.userAgent.DOCUMENT_MODE = JSCompiler_inline_result$$0;
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), CAN_USE_PARENT_ELEMENT_PROPERTY:goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT, 
INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};
goog.dom.classes = {};
goog.dom.classes.set = function $goog$dom$classes$set$(element, className) {
  element.className = className;
};
goog.dom.classes.get = function $goog$dom$classes$get$(element) {
  var className = element.className;
  return goog.isString(className) && className.match(/\S+/g) || [];
};
goog.dom.classes.add = function $goog$dom$classes$add$(element, var_args) {
  var classes = goog.dom.classes.get(element), args = goog.array.slice(arguments, 1), expectedCount = classes.length + args.length;
  goog.dom.classes.add_(classes, args);
  goog.dom.classes.set(element, classes.join(" "));
  return classes.length == expectedCount;
};
goog.dom.classes.remove = function $goog$dom$classes$remove$(element, var_args) {
  var classes = goog.dom.classes.get(element), args = goog.array.slice(arguments, 1), newClasses = goog.dom.classes.getDifference_(classes, args);
  goog.dom.classes.set(element, newClasses.join(" "));
  return newClasses.length == classes.length - args.length;
};
goog.dom.classes.add_ = function $goog$dom$classes$add_$(classes, args) {
  for (var i = 0;i < args.length;i++) {
    goog.array.contains(classes, args[i]) || classes.push(args[i]);
  }
};
goog.dom.classes.getDifference_ = function $goog$dom$classes$getDifference_$(arr1, arr2) {
  return goog.array.filter(arr1, function(item) {
    return!goog.array.contains(arr2, item);
  });
};
goog.dom.classes.swap = function $goog$dom$classes$swap$(element, fromClass, toClass) {
  for (var classes = goog.dom.classes.get(element), removed = !1, i = 0;i < classes.length;i++) {
    classes[i] == fromClass && (goog.array.splice(classes, i--, 1), removed = !0);
  }
  removed && (classes.push(toClass), goog.dom.classes.set(element, classes.join(" ")));
  return removed;
};
goog.dom.classes.addRemove = function $goog$dom$classes$addRemove$(element, classesToRemove, classesToAdd) {
  var classes = goog.dom.classes.get(element);
  goog.isString(classesToRemove) ? goog.array.remove(classes, classesToRemove) : goog.isArray(classesToRemove) && (classes = goog.dom.classes.getDifference_(classes, classesToRemove));
  goog.isString(classesToAdd) && !goog.array.contains(classes, classesToAdd) ? classes.push(classesToAdd) : goog.isArray(classesToAdd) && goog.dom.classes.add_(classes, classesToAdd);
  goog.dom.classes.set(element, classes.join(" "));
};
goog.dom.classes.has = function $goog$dom$classes$has$(element, className) {
  return goog.array.contains(goog.dom.classes.get(element), className);
};
goog.dom.classes.enable = function $goog$dom$classes$enable$(element, className, enabled) {
  enabled ? goog.dom.classes.add(element, className) : goog.dom.classes.remove(element, className);
};
goog.dom.classes.toggle = function $goog$dom$classes$toggle$(element, className) {
  var add = !goog.dom.classes.has(element, className);
  goog.dom.classes.enable(element, className, add);
  return add;
};
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", ARTICLE:"ARTICLE", ASIDE:"ASIDE", AUDIO:"AUDIO", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDI:"BDI", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", COMMAND:"COMMAND", DATA:"DATA", DATALIST:"DATALIST", DD:"DD", DEL:"DEL", DETAILS:"DETAILS", DFN:"DFN", 
DIALOG:"DIALOG", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", EMBED:"EMBED", FIELDSET:"FIELDSET", FIGCAPTION:"FIGCAPTION", FIGURE:"FIGURE", FONT:"FONT", FOOTER:"FOOTER", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HEADER:"HEADER", HGROUP:"HGROUP", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", KEYGEN:"KEYGEN", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", 
MAP:"MAP", MARK:"MARK", MATH:"MATH", MENU:"MENU", META:"META", METER:"METER", NAV:"NAV", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", OUTPUT:"OUTPUT", P:"P", PARAM:"PARAM", PRE:"PRE", PROGRESS:"PROGRESS", Q:"Q", RP:"RP", RT:"RT", RUBY:"RUBY", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SECTION:"SECTION", SELECT:"SELECT", SMALL:"SMALL", SOURCE:"SOURCE", SPAN:"SPAN", STRIKE:"STRIKE", STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUMMARY:"SUMMARY", 
SUP:"SUP", SVG:"SVG", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TIME:"TIME", TITLE:"TITLE", TR:"TR", TRACK:"TRACK", TT:"TT", U:"U", UL:"UL", VAR:"VAR", VIDEO:"VIDEO", WBR:"WBR"};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.getDomHelper = function $goog$dom$getDomHelper$(opt_element) {
  return opt_element ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(opt_element)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper);
};
goog.dom.getDocument = function $goog$dom$getDocument$() {
  return document;
};
goog.dom.getElement = function $goog$dom$getElement$(element) {
  return goog.dom.getElementHelper_(document, element);
};
goog.dom.getElementHelper_ = function $goog$dom$getElementHelper_$(doc, element) {
  return goog.isString(element) ? doc.getElementById(element) : element;
};
goog.dom.getRequiredElement = function $goog$dom$getRequiredElement$(id) {
  return goog.dom.getRequiredElementHelper_(document, id);
};
goog.dom.getRequiredElementHelper_ = function $goog$dom$getRequiredElementHelper_$(doc, id) {
  goog.asserts.assertString(id);
  var element = goog.dom.getElementHelper_(doc, id);
  return element = goog.asserts.assertElement(element, "No element found with id: " + id);
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function $goog$dom$getElementsByTagNameAndClass$(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(document, opt_tag, opt_class, opt_el);
};
goog.dom.getElementsByClass = function $goog$dom$getElementsByClass$(className, opt_el) {
  var parent = opt_el || document;
  return goog.dom.canUseQuerySelector_(parent) ? parent.querySelectorAll("." + className) : goog.dom.getElementsByTagNameAndClass_(document, "*", className, opt_el);
};
goog.dom.getElementByClass = function $goog$dom$getElementByClass$(className, opt_el) {
  var parent = opt_el || document, retVal = null;
  return(retVal = goog.dom.canUseQuerySelector_(parent) ? parent.querySelector("." + className) : goog.dom.getElementsByTagNameAndClass_(document, "*", className, opt_el)[0]) || null;
};
goog.dom.getRequiredElementByClass = function $goog$dom$getRequiredElementByClass$(className, opt_root) {
  var retValue = goog.dom.getElementByClass(className, opt_root);
  return goog.asserts.assert(retValue, "No element found with className: " + className);
};
goog.dom.canUseQuerySelector_ = function $goog$dom$canUseQuerySelector_$(parent) {
  return!(!parent.querySelectorAll || !parent.querySelector);
};
goog.dom.getElementsByTagNameAndClass_ = function $goog$dom$getElementsByTagNameAndClass_$(doc, opt_tag, opt_class, opt_el) {
  var parent = opt_el || doc, tagName = opt_tag && "*" != opt_tag ? opt_tag.toUpperCase() : "";
  if (goog.dom.canUseQuerySelector_(parent) && (tagName || opt_class)) {
    var query = tagName + (opt_class ? "." + opt_class : "");
    return parent.querySelectorAll(query);
  }
  if (opt_class && parent.getElementsByClassName) {
    var els = parent.getElementsByClassName(opt_class);
    if (tagName) {
      for (var arrayLike = {}, len = 0, i = 0, el;el = els[i];i++) {
        tagName == el.nodeName && (arrayLike[len++] = el);
      }
      arrayLike.length = len;
      return arrayLike;
    }
    return els;
  }
  els = parent.getElementsByTagName(tagName || "*");
  if (opt_class) {
    arrayLike = {};
    for (i = len = 0;el = els[i];i++) {
      var className = el.className;
      "function" == typeof className.split && goog.array.contains(className.split(/\s+/), opt_class) && (arrayLike[len++] = el);
    }
    arrayLike.length = len;
    return arrayLike;
  }
  return els;
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function $goog$dom$setProperties$(element, properties) {
  goog.object.forEach(properties, function(val, key) {
    "style" == key ? element.style.cssText = val : "class" == key ? element.className = val : "for" == key ? element.htmlFor = val : key in goog.dom.DIRECT_ATTRIBUTE_MAP_ ? element.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[key], val) : goog.string.startsWith(key, "aria-") || goog.string.startsWith(key, "data-") ? element.setAttribute(key, val) : element[key] = val;
  });
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
goog.dom.getViewportSize = function $goog$dom$getViewportSize$(opt_window) {
  return goog.dom.getViewportSize_(opt_window || window);
};
goog.dom.getViewportSize_ = function $goog$dom$getViewportSize_$(win) {
  var doc = win.document, el = goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body;
  return new goog.math.Size(el.clientWidth, el.clientHeight);
};
goog.dom.getDocumentHeight = function $goog$dom$getDocumentHeight$() {
  return goog.dom.getDocumentHeight_(window);
};
goog.dom.getDocumentHeight_ = function $goog$dom$getDocumentHeight_$(win) {
  var doc = win.document, height = 0;
  if (doc) {
    var vh = goog.dom.getViewportSize_(win).height, body = doc.body, docEl = doc.documentElement;
    if (goog.dom.isCss1CompatMode_(doc) && docEl.scrollHeight) {
      height = docEl.scrollHeight != vh ? docEl.scrollHeight : docEl.offsetHeight;
    } else {
      var sh = docEl.scrollHeight, oh = docEl.offsetHeight;
      docEl.clientHeight != oh && (sh = body.scrollHeight, oh = body.offsetHeight);
      height = sh > vh ? sh > oh ? sh : oh : sh < oh ? sh : oh;
    }
  }
  return height;
};
goog.dom.getPageScroll = function $goog$dom$getPageScroll$(opt_window) {
  var win = opt_window || goog.global || window;
  return goog.dom.getDomHelper(win.document).getDocumentScroll();
};
goog.dom.getDocumentScroll = function $goog$dom$getDocumentScroll$() {
  return goog.dom.getDocumentScroll_(document);
};
goog.dom.getDocumentScroll_ = function $goog$dom$getDocumentScroll_$(doc) {
  var el = goog.dom.getDocumentScrollElement_(doc), win = goog.dom.getWindow_(doc);
  return goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && win.pageYOffset != el.scrollTop ? new goog.math.Coordinate(el.scrollLeft, el.scrollTop) : new goog.math.Coordinate(win.pageXOffset || el.scrollLeft, win.pageYOffset || el.scrollTop);
};
goog.dom.getDocumentScrollElement = function $goog$dom$getDocumentScrollElement$() {
  return goog.dom.getDocumentScrollElement_(document);
};
goog.dom.getDocumentScrollElement_ = function $goog$dom$getDocumentScrollElement_$(doc) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body || doc.documentElement;
};
goog.dom.getWindow = function $goog$dom$getWindow$(opt_doc) {
  return opt_doc ? goog.dom.getWindow_(opt_doc) : window;
};
goog.dom.getWindow_ = function $goog$dom$getWindow_$(doc) {
  return doc.parentWindow || doc.defaultView;
};
goog.dom.createDom = function $goog$dom$createDom$(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(document, arguments);
};
goog.dom.createDom_ = function $goog$dom$createDom_$(doc, args) {
  var tagName = args[0], attributes = args[1];
  if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && attributes && (attributes.name || attributes.type)) {
    var tagNameArr = ["<", tagName];
    attributes.name && tagNameArr.push(' name="', goog.string.htmlEscape(attributes.name), '"');
    if (attributes.type) {
      tagNameArr.push(' type="', goog.string.htmlEscape(attributes.type), '"');
      var clone = {};
      goog.object.extend(clone, attributes);
      delete clone.type;
      attributes = clone;
    }
    tagNameArr.push(">");
    tagName = tagNameArr.join("");
  }
  var element = doc.createElement(tagName);
  attributes && (goog.isString(attributes) ? element.className = attributes : goog.isArray(attributes) ? goog.dom.classes.add.apply(null, [element].concat(attributes)) : goog.dom.setProperties(element, attributes));
  2 < args.length && goog.dom.append_(doc, element, args, 2);
  return element;
};
goog.dom.append_ = function $goog$dom$append_$(doc, parent, args, startIndex) {
  function childHandler(child) {
    child && parent.appendChild(goog.isString(child) ? doc.createTextNode(child) : child);
  }
  for (var i = startIndex;i < args.length;i++) {
    var arg = args[i];
    goog.isArrayLike(arg) && !goog.dom.isNodeLike(arg) ? goog.array.forEach(goog.dom.isNodeList(arg) ? goog.array.toArray(arg) : arg, childHandler) : childHandler(arg);
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function $goog$dom$createElement$(name) {
  return document.createElement(name);
};
goog.dom.createTextNode = function $goog$dom$createTextNode$(content) {
  return document.createTextNode(String(content));
};
goog.dom.createTable = function $goog$dom$createTable$(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(document, rows, columns, !!opt_fillWithNbsp);
};
goog.dom.createTable_ = function $goog$dom$createTable_$(doc, rows, columns, fillWithNbsp) {
  for (var rowHtml = ["<tr>"], i = 0;i < columns;i++) {
    rowHtml.push(fillWithNbsp ? "<td>&nbsp;</td>" : "<td></td>");
  }
  rowHtml.push("</tr>");
  for (var rowHtml = rowHtml.join(""), totalHtml = ["<table>"], i = 0;i < rows;i++) {
    totalHtml.push(rowHtml);
  }
  totalHtml.push("</table>");
  var elem = doc.createElement(goog.dom.TagName.DIV);
  elem.innerHTML = totalHtml.join("");
  return elem.removeChild(elem.firstChild);
};
goog.dom.htmlToDocumentFragment = function $goog$dom$htmlToDocumentFragment$(htmlString) {
  return goog.dom.htmlToDocumentFragment_(document, htmlString);
};
goog.dom.htmlToDocumentFragment_ = function $goog$dom$htmlToDocumentFragment_$(doc, htmlString) {
  var tempDiv = doc.createElement("div");
  goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (tempDiv.innerHTML = "<br>" + htmlString, tempDiv.removeChild(tempDiv.firstChild)) : tempDiv.innerHTML = htmlString;
  if (1 == tempDiv.childNodes.length) {
    return tempDiv.removeChild(tempDiv.firstChild);
  }
  for (var fragment = doc.createDocumentFragment();tempDiv.firstChild;) {
    fragment.appendChild(tempDiv.firstChild);
  }
  return fragment;
};
goog.dom.isCss1CompatMode = function $goog$dom$isCss1CompatMode$() {
  return goog.dom.isCss1CompatMode_(document);
};
goog.dom.isCss1CompatMode_ = function $goog$dom$isCss1CompatMode_$(doc) {
  return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == doc.compatMode;
};
goog.dom.canHaveChildren = function $goog$dom$canHaveChildren$(node) {
  if (node.nodeType != goog.dom.NodeType.ELEMENT) {
    return!1;
  }
  switch(node.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.COMMAND:
    ;
    case goog.dom.TagName.EMBED:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.KEYGEN:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.SOURCE:
    ;
    case goog.dom.TagName.STYLE:
    ;
    case goog.dom.TagName.TRACK:
    ;
    case goog.dom.TagName.WBR:
      return!1;
  }
  return!0;
};
goog.dom.appendChild = function $goog$dom$appendChild$(parent, child) {
  parent.appendChild(child);
};
goog.dom.append = function $goog$dom$append$(parent, var_args) {
  goog.dom.append_(goog.dom.getOwnerDocument(parent), parent, arguments, 1);
};
goog.dom.removeChildren = function $goog$dom$removeChildren$(node) {
  for (var child;child = node.firstChild;) {
    node.removeChild(child);
  }
};
goog.dom.insertSiblingBefore = function $goog$dom$insertSiblingBefore$(newNode, refNode) {
  refNode.parentNode && refNode.parentNode.insertBefore(newNode, refNode);
};
goog.dom.insertSiblingAfter = function $goog$dom$insertSiblingAfter$(newNode, refNode) {
  refNode.parentNode && refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
};
goog.dom.insertChildAt = function $goog$dom$insertChildAt$(parent, child, index) {
  parent.insertBefore(child, parent.childNodes[index] || null);
};
goog.dom.removeNode = function $goog$dom$removeNode$(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
};
goog.dom.replaceNode = function $goog$dom$replaceNode$(newNode, oldNode) {
  var parent = oldNode.parentNode;
  parent && parent.replaceChild(newNode, oldNode);
};
goog.dom.flattenElement = function $goog$dom$flattenElement$(element) {
  var child, parent = element.parentNode;
  if (parent && parent.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if (element.removeNode) {
      return element.removeNode(!1);
    }
    for (;child = element.firstChild;) {
      parent.insertBefore(child, element);
    }
    return goog.dom.removeNode(element);
  }
};
goog.dom.getChildren = function $goog$dom$getChildren$(element) {
  return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != element.children ? element.children : goog.array.filter(element.childNodes, function(node) {
    return node.nodeType == goog.dom.NodeType.ELEMENT;
  });
};
goog.dom.getFirstElementChild = function $goog$dom$getFirstElementChild$(node) {
  return void 0 != node.firstElementChild ? node.firstElementChild : goog.dom.getNextElementNode_(node.firstChild, !0);
};
goog.dom.getLastElementChild = function $goog$dom$getLastElementChild$(node) {
  return void 0 != node.lastElementChild ? node.lastElementChild : goog.dom.getNextElementNode_(node.lastChild, !1);
};
goog.dom.getNextElementSibling = function $goog$dom$getNextElementSibling$(node) {
  return void 0 != node.nextElementSibling ? node.nextElementSibling : goog.dom.getNextElementNode_(node.nextSibling, !0);
};
goog.dom.getPreviousElementSibling = function $goog$dom$getPreviousElementSibling$(node) {
  return void 0 != node.previousElementSibling ? node.previousElementSibling : goog.dom.getNextElementNode_(node.previousSibling, !1);
};
goog.dom.getNextElementNode_ = function $goog$dom$getNextElementNode_$(node, forward) {
  for (;node && node.nodeType != goog.dom.NodeType.ELEMENT;) {
    node = forward ? node.nextSibling : node.previousSibling;
  }
  return node;
};
goog.dom.getNextNode = function $goog$dom$getNextNode$(node) {
  if (!node) {
    return null;
  }
  if (node.firstChild) {
    return node.firstChild;
  }
  for (;node && !node.nextSibling;) {
    node = node.parentNode;
  }
  return node ? node.nextSibling : null;
};
goog.dom.getPreviousNode = function $goog$dom$getPreviousNode$(node) {
  if (!node) {
    return null;
  }
  if (!node.previousSibling) {
    return node.parentNode;
  }
  for (node = node.previousSibling;node && node.lastChild;) {
    node = node.lastChild;
  }
  return node;
};
goog.dom.isNodeLike = function $goog$dom$isNodeLike$(obj) {
  return goog.isObject(obj) && 0 < obj.nodeType;
};
goog.dom.isElement = function $goog$dom$isElement$(obj) {
  return goog.isObject(obj) && obj.nodeType == goog.dom.NodeType.ELEMENT;
};
goog.dom.isWindow = function $goog$dom$isWindow$(obj) {
  return goog.isObject(obj) && obj.window == obj;
};
goog.dom.getParentElement = function $goog$dom$getParentElement$(element) {
  if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY) {
    var isIe9 = goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10");
    if (!(isIe9 && goog.global.SVGElement && element instanceof goog.global.SVGElement)) {
      return element.parentElement;
    }
  }
  var parent = element.parentNode;
  return goog.dom.isElement(parent) ? parent : null;
};
goog.dom.contains = function $goog$dom$contains$(parent, descendant) {
  if (parent.contains && descendant.nodeType == goog.dom.NodeType.ELEMENT) {
    return parent == descendant || parent.contains(descendant);
  }
  if ("undefined" != typeof parent.compareDocumentPosition) {
    return parent == descendant || Boolean(parent.compareDocumentPosition(descendant) & 16);
  }
  for (;descendant && parent != descendant;) {
    descendant = descendant.parentNode;
  }
  return descendant == parent;
};
goog.dom.compareNodeOrder = function $goog$dom$compareNodeOrder$(node1, node2) {
  if (node1 == node2) {
    return 0;
  }
  if (node1.compareDocumentPosition) {
    return node1.compareDocumentPosition(node2) & 2 ? 1 : -1;
  }
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    if (node1.nodeType == goog.dom.NodeType.DOCUMENT) {
      return-1;
    }
    if (node2.nodeType == goog.dom.NodeType.DOCUMENT) {
      return 1;
    }
  }
  if ("sourceIndex" in node1 || node1.parentNode && "sourceIndex" in node1.parentNode) {
    var isElement1 = node1.nodeType == goog.dom.NodeType.ELEMENT, isElement2 = node2.nodeType == goog.dom.NodeType.ELEMENT;
    if (isElement1 && isElement2) {
      return node1.sourceIndex - node2.sourceIndex;
    }
    var parent1 = node1.parentNode, parent2 = node2.parentNode;
    return parent1 == parent2 ? goog.dom.compareSiblingOrder_(node1, node2) : !isElement1 && goog.dom.contains(parent1, node2) ? -1 * goog.dom.compareParentsDescendantNodeIe_(node1, node2) : !isElement2 && goog.dom.contains(parent2, node1) ? goog.dom.compareParentsDescendantNodeIe_(node2, node1) : (isElement1 ? node1.sourceIndex : parent1.sourceIndex) - (isElement2 ? node2.sourceIndex : parent2.sourceIndex);
  }
  var doc = goog.dom.getOwnerDocument(node1), range1, range2;
  range1 = doc.createRange();
  range1.selectNode(node1);
  range1.collapse(!0);
  range2 = doc.createRange();
  range2.selectNode(node2);
  range2.collapse(!0);
  return range1.compareBoundaryPoints(goog.global.Range.START_TO_END, range2);
};
goog.dom.compareParentsDescendantNodeIe_ = function $goog$dom$compareParentsDescendantNodeIe_$(textNode, node) {
  var parent = textNode.parentNode;
  if (parent == node) {
    return-1;
  }
  for (var sibling = node;sibling.parentNode != parent;) {
    sibling = sibling.parentNode;
  }
  return goog.dom.compareSiblingOrder_(sibling, textNode);
};
goog.dom.compareSiblingOrder_ = function $goog$dom$compareSiblingOrder_$(node1, node2) {
  for (var s = node2;s = s.previousSibling;) {
    if (s == node1) {
      return-1;
    }
  }
  return 1;
};
goog.dom.findCommonAncestor = function $goog$dom$findCommonAncestor$(var_args) {
  var i, count = arguments.length;
  if (!count) {
    return null;
  }
  if (1 == count) {
    return arguments[0];
  }
  var paths = [], minLength = Infinity;
  for (i = 0;i < count;i++) {
    for (var ancestors = [], node = arguments[i];node;) {
      ancestors.unshift(node), node = node.parentNode;
    }
    paths.push(ancestors);
    minLength = Math.min(minLength, ancestors.length);
  }
  var output = null;
  for (i = 0;i < minLength;i++) {
    for (var first = paths[0][i], j = 1;j < count;j++) {
      if (first != paths[j][i]) {
        return output;
      }
    }
    output = first;
  }
  return output;
};
goog.dom.getOwnerDocument = function $goog$dom$getOwnerDocument$(node) {
  goog.asserts.assert(node, "Node cannot be null or undefined.");
  return node.nodeType == goog.dom.NodeType.DOCUMENT ? node : node.ownerDocument || node.document;
};
goog.dom.getFrameContentDocument = function $goog$dom$getFrameContentDocument$(frame) {
  var doc = frame.contentDocument || frame.contentWindow.document;
  return doc;
};
goog.dom.getFrameContentWindow = function $goog$dom$getFrameContentWindow$(frame) {
  return frame.contentWindow || goog.dom.getWindow(goog.dom.getFrameContentDocument(frame));
};
goog.dom.setTextContent = function $goog$dom$setTextContent$(node, text) {
  goog.asserts.assert(null != node, "goog.dom.setTextContent expects a non-null value for node");
  if ("textContent" in node) {
    node.textContent = text;
  } else {
    if (node.nodeType == goog.dom.NodeType.TEXT) {
      node.data = text;
    } else {
      if (node.firstChild && node.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (;node.lastChild != node.firstChild;) {
          node.removeChild(node.lastChild);
        }
        node.firstChild.data = text;
      } else {
        goog.dom.removeChildren(node);
        var doc = goog.dom.getOwnerDocument(node);
        node.appendChild(doc.createTextNode(String(text)));
      }
    }
  }
};
goog.dom.getOuterHtml = function $goog$dom$getOuterHtml$(element) {
  if ("outerHTML" in element) {
    return element.outerHTML;
  }
  var doc = goog.dom.getOwnerDocument(element), div = doc.createElement("div");
  div.appendChild(element.cloneNode(!0));
  return div.innerHTML;
};
goog.dom.findNode = function $goog$dom$findNode$(root, p) {
  var rv = [], found = goog.dom.findNodes_(root, p, rv, !0);
  return found ? rv[0] : void 0;
};
goog.dom.findNodes = function $goog$dom$findNodes$(root, p) {
  var rv = [];
  goog.dom.findNodes_(root, p, rv, !1);
  return rv;
};
goog.dom.findNodes_ = function $goog$dom$findNodes_$(root, p, rv, findOne) {
  if (null != root) {
    for (var child = root.firstChild;child;) {
      if (p(child) && (rv.push(child), findOne) || goog.dom.findNodes_(child, p, rv, findOne)) {
        return!0;
      }
      child = child.nextSibling;
    }
  }
  return!1;
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function $goog$dom$isFocusableTabIndex$(element) {
  return goog.dom.hasSpecifiedTabIndex_(element) && goog.dom.isTabIndexFocusable_(element);
};
goog.dom.setFocusableTabIndex = function $goog$dom$setFocusableTabIndex$(element, enable) {
  enable ? element.tabIndex = 0 : (element.tabIndex = -1, element.removeAttribute("tabIndex"));
};
goog.dom.isFocusable = function $goog$dom$isFocusable$(element) {
  var focusable;
  return(focusable = goog.dom.nativelySupportsFocus_(element) ? !element.disabled && (!goog.dom.hasSpecifiedTabIndex_(element) || goog.dom.isTabIndexFocusable_(element)) : goog.dom.isFocusableTabIndex(element)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(element) : focusable;
};
goog.dom.hasSpecifiedTabIndex_ = function $goog$dom$hasSpecifiedTabIndex_$(element) {
  var attrNode = element.getAttributeNode("tabindex");
  return goog.isDefAndNotNull(attrNode) && attrNode.specified;
};
goog.dom.isTabIndexFocusable_ = function $goog$dom$isTabIndexFocusable_$(element) {
  var index = element.tabIndex;
  return goog.isNumber(index) && 0 <= index && 32768 > index;
};
goog.dom.nativelySupportsFocus_ = function $goog$dom$nativelySupportsFocus_$(element) {
  return element.tagName == goog.dom.TagName.A || element.tagName == goog.dom.TagName.INPUT || element.tagName == goog.dom.TagName.TEXTAREA || element.tagName == goog.dom.TagName.SELECT || element.tagName == goog.dom.TagName.BUTTON;
};
goog.dom.hasNonZeroBoundingRect_ = function $goog$dom$hasNonZeroBoundingRect_$(element) {
  var rect = goog.isFunction(element.getBoundingClientRect) ? element.getBoundingClientRect() : {height:element.offsetHeight, width:element.offsetWidth};
  return goog.isDefAndNotNull(rect) && 0 < rect.height && 0 < rect.width;
};
goog.dom.getTextContent = function $goog$dom$getTextContent$(node) {
  var textContent;
  if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in node) {
    textContent = goog.string.canonicalizeNewlines(node.innerText);
  } else {
    var buf = [];
    goog.dom.getTextContent_(node, buf, !0);
    textContent = buf.join("");
  }
  textContent = textContent.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  textContent = textContent.replace(/\u200B/g, "");
  goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (textContent = textContent.replace(/ +/g, " "));
  " " != textContent && (textContent = textContent.replace(/^\s*/, ""));
  return textContent;
};
goog.dom.getRawTextContent = function $goog$dom$getRawTextContent$(node) {
  var buf = [];
  goog.dom.getTextContent_(node, buf, !1);
  return buf.join("");
};
goog.dom.getTextContent_ = function $goog$dom$getTextContent_$(node, buf, normalizeWhitespace) {
  if (!(node.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
    if (node.nodeType == goog.dom.NodeType.TEXT) {
      normalizeWhitespace ? buf.push(String(node.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : buf.push(node.nodeValue);
    } else {
      if (node.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        buf.push(goog.dom.PREDEFINED_TAG_VALUES_[node.nodeName]);
      } else {
        for (var child = node.firstChild;child;) {
          goog.dom.getTextContent_(child, buf, normalizeWhitespace), child = child.nextSibling;
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function $goog$dom$getNodeTextLength$(node) {
  return goog.dom.getTextContent(node).length;
};
goog.dom.getNodeTextOffset = function $goog$dom$getNodeTextOffset$(node, opt_offsetParent) {
  for (var root = opt_offsetParent || goog.dom.getOwnerDocument(node).body, buf = [];node && node != root;) {
    for (var cur = node;cur = cur.previousSibling;) {
      buf.unshift(goog.dom.getTextContent(cur));
    }
    node = node.parentNode;
  }
  return goog.string.trimLeft(buf.join("")).replace(/ +/g, " ").length;
};
goog.dom.getNodeAtOffset = function $goog$dom$getNodeAtOffset$(parent, offset, opt_result) {
  for (var stack = [parent], pos = 0, cur = null;0 < stack.length && pos < offset;) {
    if (cur = stack.pop(), !(cur.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
      if (cur.nodeType == goog.dom.NodeType.TEXT) {
        var text = cur.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "), pos = pos + text.length
      } else {
        if (cur.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          pos += goog.dom.PREDEFINED_TAG_VALUES_[cur.nodeName].length;
        } else {
          for (var i = cur.childNodes.length - 1;0 <= i;i--) {
            stack.push(cur.childNodes[i]);
          }
        }
      }
    }
  }
  goog.isObject(opt_result) && (opt_result.remainder = cur ? cur.nodeValue.length + offset - pos - 1 : 0, opt_result.node = cur);
  return cur;
};
goog.dom.isNodeList = function $goog$dom$isNodeList$(val) {
  if (val && "number" == typeof val.length) {
    if (goog.isObject(val)) {
      return "function" == typeof val.item || "string" == typeof val.item;
    }
    if (goog.isFunction(val)) {
      return "function" == typeof val.item;
    }
  }
  return!1;
};
goog.dom.getAncestorByTagNameAndClass = function $goog$dom$getAncestorByTagNameAndClass$(element, opt_tag, opt_class) {
  if (!opt_tag && !opt_class) {
    return null;
  }
  var tagName = opt_tag ? opt_tag.toUpperCase() : null;
  return goog.dom.getAncestor(element, function(node) {
    return(!tagName || node.nodeName == tagName) && (!opt_class || goog.dom.classes.has(node, opt_class));
  }, !0);
};
goog.dom.getAncestorByClass = function $goog$dom$getAncestorByClass$(element, className) {
  return goog.dom.getAncestorByTagNameAndClass(element, null, className);
};
goog.dom.getAncestor = function $goog$dom$getAncestor$(element, matcher, opt_includeNode, opt_maxSearchSteps) {
  opt_includeNode || (element = element.parentNode);
  for (var ignoreSearchSteps = null == opt_maxSearchSteps, steps = 0;element && (ignoreSearchSteps || steps <= opt_maxSearchSteps);) {
    if (matcher(element)) {
      return element;
    }
    element = element.parentNode;
    steps++;
  }
  return null;
};
goog.dom.getActiveElement = function $goog$dom$getActiveElement$(doc) {
  try {
    return doc && doc.activeElement;
  } catch (e) {
  }
  return null;
};
goog.dom.getPixelRatio = goog.functions.cacheReturnValue(function() {
  var win = goog.dom.getWindow(), isFirefoxMobile = goog.userAgent.GECKO && goog.userAgent.MOBILE;
  return goog.isDef(win.devicePixelRatio) && !isFirefoxMobile ? win.devicePixelRatio : win.matchMedia ? goog.dom.matchesPixelRatio_(0.75) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(3) || 1 : 1;
});
goog.dom.matchesPixelRatio_ = function $goog$dom$matchesPixelRatio_$(pixelRatio) {
  var win = goog.dom.getWindow(), query = "(-webkit-min-device-pixel-ratio: " + pixelRatio + "),(min--moz-device-pixel-ratio: " + pixelRatio + "),(min-resolution: " + pixelRatio + "dppx)";
  return win.matchMedia(query).matches ? pixelRatio : 0;
};
goog.dom.DomHelper = function $goog$dom$DomHelper$(opt_document) {
  this.document_ = opt_document || goog.global.document || document;
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.getDocument = function $goog$dom$DomHelper$$getDocument$() {
  return this.document_;
};
goog.dom.DomHelper.prototype.getElement = function $goog$dom$DomHelper$$getElement$(element) {
  return goog.dom.getElementHelper_(this.document_, element);
};
goog.dom.DomHelper.prototype.getRequiredElement = function $goog$dom$DomHelper$$getRequiredElement$(id) {
  return goog.dom.getRequiredElementHelper_(this.document_, id);
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function $goog$dom$DomHelper$$getElementsByTagNameAndClass$(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, opt_tag, opt_class, opt_el);
};
goog.dom.DomHelper.prototype.getElementsByClass = function $goog$dom$DomHelper$$getElementsByClass$(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementsByClass(className, doc);
};
goog.dom.DomHelper.prototype.getElementByClass = function $goog$dom$DomHelper$$getElementByClass$(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementByClass(className, doc);
};
goog.dom.DomHelper.prototype.getRequiredElementByClass = function $goog$dom$DomHelper$$getRequiredElementByClass$(className, opt_root) {
  var root = opt_root || this.document_;
  return goog.dom.getRequiredElementByClass(className, root);
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function $goog$dom$DomHelper$$getViewportSize$(opt_window) {
  return goog.dom.getViewportSize(opt_window || this.getWindow());
};
goog.dom.DomHelper.prototype.getDocumentHeight = function $goog$dom$DomHelper$$getDocumentHeight$() {
  return goog.dom.getDocumentHeight_(this.getWindow());
};
goog.dom.DomHelper.prototype.createDom = function $goog$dom$DomHelper$$createDom$(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(this.document_, arguments);
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function $goog$dom$DomHelper$$createElement$(name) {
  return this.document_.createElement(name);
};
goog.dom.DomHelper.prototype.createTextNode = function $goog$dom$DomHelper$$createTextNode$(content) {
  return this.document_.createTextNode(String(content));
};
goog.dom.DomHelper.prototype.createTable = function $goog$dom$DomHelper$$createTable$(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(this.document_, rows, columns, !!opt_fillWithNbsp);
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function $goog$dom$DomHelper$$htmlToDocumentFragment$(htmlString) {
  return goog.dom.htmlToDocumentFragment_(this.document_, htmlString);
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function $goog$dom$DomHelper$$isCss1CompatMode$() {
  return goog.dom.isCss1CompatMode_(this.document_);
};
goog.dom.DomHelper.prototype.getWindow = function $goog$dom$DomHelper$$getWindow$() {
  return goog.dom.getWindow_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function $goog$dom$DomHelper$$getDocumentScrollElement$() {
  return goog.dom.getDocumentScrollElement_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScroll = function $goog$dom$DomHelper$$getDocumentScroll$() {
  return goog.dom.getDocumentScroll_(this.document_);
};
goog.dom.DomHelper.prototype.getActiveElement = function $goog$dom$DomHelper$$getActiveElement$(opt_doc) {
  return goog.dom.getActiveElement(opt_doc || this.document_);
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.disposable = {};
goog.disposable.IDisposable = function $goog$disposable$IDisposable$() {
};
goog.Disposable = function $goog$Disposable$() {
  goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.instances_[goog.getUid(this)] = this);
};
goog.Disposable.MonitoringMode = {OFF:0, PERMANENT:1, INTERACTIVE:2};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.INCLUDE_STACK_ON_CREATION = !0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function $goog$Disposable$getUndisposedObjects$() {
  var ret = [], id;
  for (id in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty(id) && ret.push(goog.Disposable.instances_[Number(id)]);
  }
  return ret;
};
goog.Disposable.clearUndisposedObjects = function $goog$Disposable$clearUndisposedObjects$() {
  goog.Disposable.instances_ = {};
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function $goog$Disposable$$isDisposed$() {
  return this.disposed_;
};
goog.Disposable.prototype.dispose = function $goog$Disposable$$dispose$() {
  if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
    var uid = goog.getUid(this);
    if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(uid)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    delete goog.Disposable.instances_[uid];
  }
};
goog.Disposable.prototype.registerDisposable = function $goog$Disposable$$registerDisposable$(disposable) {
  this.addOnDisposeCallback(goog.partial(goog.dispose, disposable));
};
goog.Disposable.prototype.addOnDisposeCallback = function $goog$Disposable$$addOnDisposeCallback$(callback, opt_scope) {
  this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []);
  this.onDisposeCallbacks_.push(goog.bind(callback, opt_scope));
};
goog.Disposable.prototype.disposeInternal = function $goog$Disposable$$disposeInternal$() {
  if (this.onDisposeCallbacks_) {
    for (;this.onDisposeCallbacks_.length;) {
      this.onDisposeCallbacks_.shift()();
    }
  }
};
goog.Disposable.isDisposed = function $goog$Disposable$isDisposed$(obj) {
  return obj && "function" == typeof obj.isDisposed ? obj.isDisposed() : !1;
};
goog.dispose = function $goog$dispose$(obj) {
  obj && "function" == typeof obj.dispose && obj.dispose();
};
goog.disposeAll = function $goog$disposeAll$(var_args) {
  for (var i = 0, len = arguments.length;i < len;++i) {
    var disposable = arguments[i];
    goog.isArrayLike(disposable) ? goog.disposeAll.apply(null, disposable) : goog.dispose(disposable);
  }
};
goog.events = {};
goog.events.EventId = function $goog$events$EventId$(eventId) {
  this.id = eventId;
};
goog.events.EventId.prototype.toString = function $goog$events$EventId$$toString$() {
  return this.id;
};
goog.events.Event = function $goog$events$Event$(type, opt_target) {
  this.type = type instanceof goog.events.EventId ? String(type) : type;
  this.currentTarget = this.target = opt_target;
  this.defaultPrevented = this.propagationStopped_ = !1;
  this.returnValue_ = !0;
};
goog.events.Event.prototype.disposeInternal = function $goog$events$Event$$disposeInternal$() {
};
goog.events.Event.prototype.dispose = function $goog$events$Event$$dispose$() {
};
goog.events.Event.prototype.stopPropagation = function $goog$events$Event$$stopPropagation$() {
  this.propagationStopped_ = !0;
};
goog.events.Event.prototype.preventDefault = function $goog$events$Event$$preventDefault$() {
  this.defaultPrevented = !0;
  this.returnValue_ = !1;
};
goog.events.Event.stopPropagation = function $goog$events$Event$stopPropagation$(e) {
  e.stopPropagation();
};
goog.events.Event.preventDefault = function $goog$events$Event$preventDefault$(e) {
  e.preventDefault();
};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function $goog$debug$EntryPointMonitor$() {
};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function $goog$debug$entryPointRegistry$register$(callback) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = callback;
  if (goog.debug.entryPointRegistry.monitorsMayExist_) {
    for (var monitors = goog.debug.entryPointRegistry.monitors_, i = 0;i < monitors.length;i++) {
      callback(goog.bind(monitors[i].wrap, monitors[i]));
    }
  }
};
goog.debug.entryPointRegistry.monitorAll = function $goog$debug$entryPointRegistry$monitorAll$(monitor) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
  for (var transformer = goog.bind(monitor.wrap, monitor), i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer);
  }
  goog.debug.entryPointRegistry.monitors_.push(monitor);
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function $goog$debug$entryPointRegistry$unmonitorAllIfPossible$(monitor) {
  var monitors = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert(monitor == monitors[monitors.length - 1], "Only the most recent monitor can be unwrapped.");
  for (var transformer = goog.bind(monitor.unwrap, monitor), i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer);
  }
  monitors.length--;
};
goog.reflect = {};
goog.reflect.object = function $goog$reflect$object$(type, object) {
  return object;
};
goog.reflect.sinkValue = function $goog$reflect$sinkValue$(x) {
  goog.reflect.sinkValue[" "](x);
  return x;
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function $goog$reflect$canAccessProperty$(obj, prop) {
  try {
    return goog.reflect.sinkValue(obj[prop]), !0;
  } catch (e) {
  }
  return!1;
};
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), HAS_W3C_EVENT_SUPPORT:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), HAS_NAVIGATOR_ONLINE_PROPERTY:!goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"), HAS_HTML5_NETWORK_EVENT_SUPPORT:goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && 
goog.userAgent.isVersionOrHigher("8") || goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"), HTML5_NETWORK_EVENTS_FIRE_ON_BODY:goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), TOUCH_ENABLED:"ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || 
!goog.global.navigator.msMaxTouchPoints)};
goog.events.getVendorPrefixedName_ = function $goog$events$getVendorPrefixedName_$(eventName) {
  return goog.userAgent.WEBKIT ? "webkit" + eventName : goog.userAgent.OPERA ? "o" + eventName.toLowerCase() : eventName.toLowerCase();
};
goog.events.EventType = {CLICK:"click", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", MOUSEENTER:"mouseenter", MOUSELEAVE:"mouseleave", SELECTSTART:"selectstart", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? "focusout" : "DOMFocusOut", CHANGE:"change", SELECT:"select", SUBMIT:"submit", 
INPUT:"input", PROPERTYCHANGE:"propertychange", DRAGSTART:"dragstart", DRAG:"drag", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", DRAGEND:"dragend", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", BEFOREUNLOAD:"beforeunload", CONSOLEMESSAGE:"consolemessage", CONTEXTMENU:"contextmenu", DOMCONTENTLOADED:"DOMContentLoaded", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", ORIENTATIONCHANGE:"orientationchange", 
READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", ONLINE:"online", OFFLINE:"offline", MESSAGE:"message", CONNECT:"connect", ANIMATIONSTART:goog.events.getVendorPrefixedName_("AnimationStart"), ANIMATIONEND:goog.events.getVendorPrefixedName_("AnimationEnd"), ANIMATIONITERATION:goog.events.getVendorPrefixedName_("AnimationIteration"), 
TRANSITIONEND:goog.events.getVendorPrefixedName_("TransitionEnd"), POINTERDOWN:"pointerdown", POINTERUP:"pointerup", POINTERCANCEL:"pointercancel", POINTERMOVE:"pointermove", POINTEROVER:"pointerover", POINTEROUT:"pointerout", POINTERENTER:"pointerenter", POINTERLEAVE:"pointerleave", GOTPOINTERCAPTURE:"gotpointercapture", LOSTPOINTERCAPTURE:"lostpointercapture", MSGESTURECHANGE:"MSGestureChange", MSGESTUREEND:"MSGestureEnd", MSGESTUREHOLD:"MSGestureHold", MSGESTURESTART:"MSGestureStart", MSGESTURETAP:"MSGestureTap", 
MSGOTPOINTERCAPTURE:"MSGotPointerCapture", MSINERTIASTART:"MSInertiaStart", MSLOSTPOINTERCAPTURE:"MSLostPointerCapture", MSPOINTERCANCEL:"MSPointerCancel", MSPOINTERDOWN:"MSPointerDown", MSPOINTERENTER:"MSPointerEnter", MSPOINTERHOVER:"MSPointerHover", MSPOINTERLEAVE:"MSPointerLeave", MSPOINTERMOVE:"MSPointerMove", MSPOINTEROUT:"MSPointerOut", MSPOINTEROVER:"MSPointerOver", MSPOINTERUP:"MSPointerUp", TEXTINPUT:"textinput", COMPOSITIONSTART:"compositionstart", COMPOSITIONUPDATE:"compositionupdate", 
COMPOSITIONEND:"compositionend", EXIT:"exit", LOADABORT:"loadabort", LOADCOMMIT:"loadcommit", LOADREDIRECT:"loadredirect", LOADSTART:"loadstart", LOADSTOP:"loadstop", RESPONSIVE:"responsive", SIZECHANGED:"sizechanged", UNRESPONSIVE:"unresponsive", VISIBILITYCHANGE:"visibilitychange", STORAGE:"storage", DOMSUBTREEMODIFIED:"DOMSubtreeModified", DOMNODEINSERTED:"DOMNodeInserted", DOMNODEREMOVED:"DOMNodeRemoved", DOMNODEREMOVEDFROMDOCUMENT:"DOMNodeRemovedFromDocument", DOMNODEINSERTEDINTODOCUMENT:"DOMNodeInsertedIntoDocument", 
DOMATTRMODIFIED:"DOMAttrModified", DOMCHARACTERDATAMODIFIED:"DOMCharacterDataModified"};
goog.events.BrowserEvent = function $goog$events$BrowserEvent$(opt_e, opt_currentTarget) {
  goog.events.Event.call(this, opt_e ? opt_e.type : "");
  this.relatedTarget = this.currentTarget = this.target = null;
  this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
  this.state = null;
  this.platformModifierKey = !1;
  this.event_ = null;
  opt_e && this.init(opt_e, opt_currentTarget);
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.init = function $goog$events$BrowserEvent$$init$(e, opt_currentTarget) {
  var type = this.type = e.type;
  this.target = e.target || e.srcElement;
  this.currentTarget = opt_currentTarget;
  var relatedTarget = e.relatedTarget;
  relatedTarget ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(relatedTarget, "nodeName") || (relatedTarget = null)) : type == goog.events.EventType.MOUSEOVER ? relatedTarget = e.fromElement : type == goog.events.EventType.MOUSEOUT && (relatedTarget = e.toElement);
  this.relatedTarget = relatedTarget;
  this.offsetX = goog.userAgent.WEBKIT || void 0 !== e.offsetX ? e.offsetX : e.layerX;
  this.offsetY = goog.userAgent.WEBKIT || void 0 !== e.offsetY ? e.offsetY : e.layerY;
  this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX;
  this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY;
  this.screenX = e.screenX || 0;
  this.screenY = e.screenY || 0;
  this.button = e.button;
  this.keyCode = e.keyCode || 0;
  this.charCode = e.charCode || ("keypress" == type ? e.keyCode : 0);
  this.ctrlKey = e.ctrlKey;
  this.altKey = e.altKey;
  this.shiftKey = e.shiftKey;
  this.metaKey = e.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? e.metaKey : e.ctrlKey;
  this.state = e.state;
  this.event_ = e;
  e.defaultPrevented && this.preventDefault();
};
goog.events.BrowserEvent.prototype.isButton = function $goog$events$BrowserEvent$$isButton$(button) {
  return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == button : "click" == this.type ? button == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[button]);
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function $goog$events$BrowserEvent$$isMouseActionButton$() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey);
};
goog.events.BrowserEvent.prototype.stopPropagation = function $goog$events$BrowserEvent$$stopPropagation$() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0;
};
goog.events.BrowserEvent.prototype.preventDefault = function $goog$events$BrowserEvent$$preventDefault$() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var be = this.event_;
  if (be.preventDefault) {
    be.preventDefault();
  } else {
    if (be.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        if (be.ctrlKey || 112 <= be.keyCode && 123 >= be.keyCode) {
          be.keyCode = -1;
        }
      } catch (ex) {
      }
    }
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function $goog$events$BrowserEvent$$getBrowserEvent$() {
  return this.event_;
};
goog.events.BrowserEvent.prototype.disposeInternal = function $goog$events$BrowserEvent$$disposeInternal$() {
};
goog.events.Listenable = function $goog$events$Listenable$() {
};
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1E6 * Math.random() | 0);
goog.events.Listenable.addImplementation = function $goog$events$Listenable$addImplementation$(cls) {
  cls.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0;
};
goog.events.Listenable.isImplementedBy = function $goog$events$Listenable$isImplementedBy$(obj) {
  try {
    return!(!obj || !obj[goog.events.Listenable.IMPLEMENTED_BY_PROP]);
  } catch (e) {
    return!1;
  }
};
goog.events.ListenableKey = function $goog$events$ListenableKey$() {
};
goog.events.ListenableKey.counter_ = 0;
goog.events.ListenableKey.reserveKey = function $goog$events$ListenableKey$reserveKey$() {
  return++goog.events.ListenableKey.counter_;
};
goog.events.Listener = function $goog$events$Listener$(listener, proxy, src, type, capture, opt_handler) {
  this.listener = listener;
  this.proxy = proxy;
  this.src = src;
  this.type = type;
  this.capture = !!capture;
  this.handler = opt_handler;
  this.key = goog.events.ListenableKey.reserveKey();
  this.removed = this.callOnce = !1;
};
goog.events.Listener.ENABLE_MONITORING = !1;
goog.events.Listener.prototype.markAsRemoved = function $goog$events$Listener$$markAsRemoved$() {
  this.removed = !0;
  this.handler = this.src = this.proxy = this.listener = null;
};
goog.events.ListenerMap = function $goog$events$ListenerMap$(src) {
  this.src = src;
  this.listeners = {};
  this.typeCount_ = 0;
};
goog.events.ListenerMap.prototype.getTypeCount = function $goog$events$ListenerMap$$getTypeCount$() {
  return this.typeCount_;
};
goog.events.ListenerMap.prototype.add = function $goog$events$ListenerMap$$add$(type, listener, callOnce, opt_useCapture, opt_listenerScope) {
  var typeStr = type.toString(), listenerArray = this.listeners[typeStr];
  listenerArray || (listenerArray = this.listeners[typeStr] = [], this.typeCount_++);
  var listenerObj, index = goog.events.ListenerMap.findListenerIndex_(listenerArray, listener, opt_useCapture, opt_listenerScope);
  -1 < index ? (listenerObj = listenerArray[index], callOnce || (listenerObj.callOnce = !1)) : (listenerObj = new goog.events.Listener(listener, null, this.src, typeStr, !!opt_useCapture, opt_listenerScope), listenerObj.callOnce = callOnce, listenerArray.push(listenerObj));
  return listenerObj;
};
goog.events.ListenerMap.prototype.remove = function $goog$events$ListenerMap$$remove$(type, listener, opt_useCapture, opt_listenerScope) {
  var typeStr = type.toString();
  if (!(typeStr in this.listeners)) {
    return!1;
  }
  var listenerArray = this.listeners[typeStr], index = goog.events.ListenerMap.findListenerIndex_(listenerArray, listener, opt_useCapture, opt_listenerScope);
  if (-1 < index) {
    var listenerObj = listenerArray[index];
    listenerObj.markAsRemoved();
    goog.array.removeAt(listenerArray, index);
    0 == listenerArray.length && (delete this.listeners[typeStr], this.typeCount_--);
    return!0;
  }
  return!1;
};
goog.events.ListenerMap.prototype.removeByKey = function $goog$events$ListenerMap$$removeByKey$(listener) {
  var type = listener.type;
  if (!(type in this.listeners)) {
    return!1;
  }
  var removed = goog.array.remove(this.listeners[type], listener);
  removed && (listener.markAsRemoved(), 0 == this.listeners[type].length && (delete this.listeners[type], this.typeCount_--));
  return removed;
};
goog.events.ListenerMap.prototype.removeAll = function $goog$events$ListenerMap$$removeAll$(opt_type) {
  var typeStr = opt_type && opt_type.toString(), count = 0, type;
  for (type in this.listeners) {
    if (!typeStr || type == typeStr) {
      for (var listenerArray = this.listeners[type], i = 0;i < listenerArray.length;i++) {
        ++count, listenerArray[i].markAsRemoved();
      }
      delete this.listeners[type];
      this.typeCount_--;
    }
  }
  return count;
};
goog.events.ListenerMap.prototype.getListeners = function $goog$events$ListenerMap$$getListeners$(type, capture) {
  var listenerArray = this.listeners[type.toString()], rv = [];
  if (listenerArray) {
    for (var i = 0;i < listenerArray.length;++i) {
      var listenerObj = listenerArray[i];
      listenerObj.capture == capture && rv.push(listenerObj);
    }
  }
  return rv;
};
goog.events.ListenerMap.prototype.getListener = function $goog$events$ListenerMap$$getListener$(type, listener, capture, opt_listenerScope) {
  var listenerArray = this.listeners[type.toString()], i = -1;
  listenerArray && (i = goog.events.ListenerMap.findListenerIndex_(listenerArray, listener, capture, opt_listenerScope));
  return-1 < i ? listenerArray[i] : null;
};
goog.events.ListenerMap.prototype.hasListener = function $goog$events$ListenerMap$$hasListener$(opt_type, opt_capture) {
  var hasType = goog.isDef(opt_type), typeStr = hasType ? opt_type.toString() : "", hasCapture = goog.isDef(opt_capture);
  return goog.object.some(this.listeners, function(listenerArray) {
    for (var i = 0;i < listenerArray.length;++i) {
      if (!(hasType && listenerArray[i].type != typeStr || hasCapture && listenerArray[i].capture != opt_capture)) {
        return!0;
      }
    }
    return!1;
  });
};
goog.events.ListenerMap.findListenerIndex_ = function $goog$events$ListenerMap$findListenerIndex_$(listenerArray, listener, opt_useCapture, opt_listenerScope) {
  for (var i = 0;i < listenerArray.length;++i) {
    var listenerObj = listenerArray[i];
    if (!listenerObj.removed && listenerObj.listener == listener && listenerObj.capture == !!opt_useCapture && listenerObj.handler == opt_listenerScope) {
      return i;
    }
  }
  return-1;
};
goog.events.listeners_ = {};
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1E6 * Math.random() | 0);
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.CaptureSimulationMode = {OFF_AND_FAIL:0, OFF_AND_SILENT:1, ON:2};
goog.events.CAPTURE_SIMULATION_MODE = 2;
goog.events.listenerCountEstimate_ = 0;
goog.events.listen = function $goog$events$listen$(src, type, listener, opt_capt, opt_handler) {
  if (goog.isArray(type)) {
    for (var i = 0;i < type.length;i++) {
      goog.events.listen(src, type[i], listener, opt_capt, opt_handler);
    }
    return null;
  }
  listener = goog.events.wrapListener(listener);
  return goog.events.Listenable.isImplementedBy(src) ? src.listen(type, listener, opt_capt, opt_handler) : goog.events.listen_(src, type, listener, !1, opt_capt, opt_handler);
};
goog.events.listen_ = function $goog$events$listen_$(src, type, listener, callOnce, opt_capt, opt_handler) {
  if (!type) {
    throw Error("Invalid event type");
  }
  var capture = !!opt_capt;
  if (capture && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL) {
      return goog.asserts.fail("Can not register capture listener in IE8-."), null;
    }
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT) {
      return null;
    }
  }
  var listenerMap = goog.events.getListenerMap_(src);
  listenerMap || (src[goog.events.LISTENER_MAP_PROP_] = listenerMap = new goog.events.ListenerMap(src));
  var listenerObj = listenerMap.add(type, listener, callOnce, opt_capt, opt_handler);
  if (listenerObj.proxy) {
    return listenerObj;
  }
  var proxy = goog.events.getProxy();
  listenerObj.proxy = proxy;
  proxy.src = src;
  proxy.listener = listenerObj;
  src.addEventListener ? src.addEventListener(type.toString(), proxy, capture) : src.attachEvent(goog.events.getOnString_(type.toString()), proxy);
  goog.events.listenerCountEstimate_++;
  return listenerObj;
};
goog.events.getProxy = function $goog$events$getProxy$() {
  var proxyCallbackFunction = goog.events.handleBrowserEvent_, f = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(eventObject) {
    return proxyCallbackFunction.call(f.src, f.listener, eventObject);
  } : function(eventObject) {
    var v = proxyCallbackFunction.call(f.src, f.listener, eventObject);
    if (!v) {
      return v;
    }
  };
  return f;
};
goog.events.listenOnce = function $goog$events$listenOnce$(src, type, listener, opt_capt, opt_handler) {
  if (goog.isArray(type)) {
    for (var i = 0;i < type.length;i++) {
      goog.events.listenOnce(src, type[i], listener, opt_capt, opt_handler);
    }
    return null;
  }
  listener = goog.events.wrapListener(listener);
  return goog.events.Listenable.isImplementedBy(src) ? src.listenOnce(type, listener, opt_capt, opt_handler) : goog.events.listen_(src, type, listener, !0, opt_capt, opt_handler);
};
goog.events.listenWithWrapper = function $goog$events$listenWithWrapper$(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.listen(src, listener, opt_capt, opt_handler);
};
goog.events.unlisten = function $goog$events$unlisten$(src, type, listener, opt_capt, opt_handler) {
  if (goog.isArray(type)) {
    for (var i = 0;i < type.length;i++) {
      goog.events.unlisten(src, type[i], listener, opt_capt, opt_handler);
    }
    return null;
  }
  listener = goog.events.wrapListener(listener);
  if (goog.events.Listenable.isImplementedBy(src)) {
    return src.unlisten(type, listener, opt_capt, opt_handler);
  }
  if (!src) {
    return!1;
  }
  var capture = !!opt_capt, listenerMap = goog.events.getListenerMap_(src);
  if (listenerMap) {
    var listenerObj = listenerMap.getListener(type, listener, capture, opt_handler);
    if (listenerObj) {
      return goog.events.unlistenByKey(listenerObj);
    }
  }
  return!1;
};
goog.events.unlistenByKey = function $goog$events$unlistenByKey$(key) {
  if (goog.isNumber(key)) {
    return!1;
  }
  var listener = key;
  if (!listener || listener.removed) {
    return!1;
  }
  var src = listener.src;
  if (goog.events.Listenable.isImplementedBy(src)) {
    return src.unlistenByKey(listener);
  }
  var type = listener.type, proxy = listener.proxy;
  src.removeEventListener ? src.removeEventListener(type, proxy, listener.capture) : src.detachEvent && src.detachEvent(goog.events.getOnString_(type), proxy);
  goog.events.listenerCountEstimate_--;
  var listenerMap = goog.events.getListenerMap_(src);
  listenerMap ? (listenerMap.removeByKey(listener), 0 == listenerMap.getTypeCount() && (listenerMap.src = null, src[goog.events.LISTENER_MAP_PROP_] = null)) : listener.markAsRemoved();
  return!0;
};
goog.events.unlistenWithWrapper = function $goog$events$unlistenWithWrapper$(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.unlisten(src, listener, opt_capt, opt_handler);
};
goog.events.removeAll = function $goog$events$removeAll$(opt_obj, opt_type) {
  if (!opt_obj) {
    return 0;
  }
  if (goog.events.Listenable.isImplementedBy(opt_obj)) {
    return opt_obj.removeAllListeners(opt_type);
  }
  var listenerMap = goog.events.getListenerMap_(opt_obj);
  if (!listenerMap) {
    return 0;
  }
  var count = 0, typeStr = opt_type && opt_type.toString(), type;
  for (type in listenerMap.listeners) {
    if (!typeStr || type == typeStr) {
      for (var listeners = goog.array.clone(listenerMap.listeners[type]), i = 0;i < listeners.length;++i) {
        goog.events.unlistenByKey(listeners[i]) && ++count;
      }
    }
  }
  return count;
};
goog.events.removeAllNativeListeners = function $goog$events$removeAllNativeListeners$() {
  return goog.events.listenerCountEstimate_ = 0;
};
goog.events.getListeners = function $goog$events$getListeners$(obj, type, capture) {
  if (goog.events.Listenable.isImplementedBy(obj)) {
    return obj.getListeners(type, capture);
  }
  if (!obj) {
    return[];
  }
  var listenerMap = goog.events.getListenerMap_(obj);
  return listenerMap ? listenerMap.getListeners(type, capture) : [];
};
goog.events.getListener = function $goog$events$getListener$(src, type, listener, opt_capt, opt_handler) {
  listener = goog.events.wrapListener(listener);
  var capture = !!opt_capt;
  if (goog.events.Listenable.isImplementedBy(src)) {
    return src.getListener(type, listener, capture, opt_handler);
  }
  if (!src) {
    return null;
  }
  var listenerMap = goog.events.getListenerMap_(src);
  return listenerMap ? listenerMap.getListener(type, listener, capture, opt_handler) : null;
};
goog.events.hasListener = function $goog$events$hasListener$(obj, opt_type, opt_capture) {
  if (goog.events.Listenable.isImplementedBy(obj)) {
    return obj.hasListener(opt_type, opt_capture);
  }
  var listenerMap = goog.events.getListenerMap_(obj);
  return!!listenerMap && listenerMap.hasListener(opt_type, opt_capture);
};
goog.events.expose = function $goog$events$expose$(e) {
  var str = [], key;
  for (key in e) {
    e[key] && e[key].id ? str.push(key + " = " + e[key] + " (" + e[key].id + ")") : str.push(key + " = " + e[key]);
  }
  return str.join("\n");
};
goog.events.getOnString_ = function $goog$events$getOnString_$(type) {
  return type in goog.events.onStringMap_ ? goog.events.onStringMap_[type] : goog.events.onStringMap_[type] = goog.events.onString_ + type;
};
goog.events.fireListeners = function $goog$events$fireListeners$(obj, type, capture, eventObject) {
  return goog.events.Listenable.isImplementedBy(obj) ? obj.fireListeners(type, capture, eventObject) : goog.events.fireListeners_(obj, type, capture, eventObject);
};
goog.events.fireListeners_ = function $goog$events$fireListeners_$(obj, type, capture, eventObject) {
  var retval = 1, listenerMap = goog.events.getListenerMap_(obj);
  if (listenerMap) {
    var listenerArray = listenerMap.listeners[type.toString()];
    if (listenerArray) {
      for (var listenerArray = goog.array.clone(listenerArray), i = 0;i < listenerArray.length;i++) {
        var listener = listenerArray[i];
        listener && listener.capture == capture && !listener.removed && (retval &= !1 !== goog.events.fireListener(listener, eventObject));
      }
    }
  }
  return Boolean(retval);
};
goog.events.fireListener = function $goog$events$fireListener$(listener, eventObject) {
  var listenerFn = listener.listener, listenerHandler = listener.handler || listener.src;
  listener.callOnce && goog.events.unlistenByKey(listener);
  return listenerFn.call(listenerHandler, eventObject);
};
goog.events.getTotalListenerCount = function $goog$events$getTotalListenerCount$() {
  return goog.events.listenerCountEstimate_;
};
goog.events.dispatchEvent = function $goog$events$dispatchEvent$(src, e) {
  goog.asserts.assert(goog.events.Listenable.isImplementedBy(src), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance.");
  return src.dispatchEvent(e);
};
goog.events.protectBrowserEventEntryPoint = function $goog$events$protectBrowserEventEntryPoint$(errorHandler) {
  goog.events.handleBrowserEvent_ = errorHandler.protectEntryPoint(goog.events.handleBrowserEvent_);
};
goog.events.handleBrowserEvent_ = function $goog$events$handleBrowserEvent_$(listener, opt_evt) {
  if (listener.removed) {
    return!0;
  }
  if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    var ieEvent = opt_evt || goog.getObjectByName("window.event"), evt = new goog.events.BrowserEvent(ieEvent, this), retval = !0;
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
      if (!goog.events.isMarkedIeEvent_(ieEvent)) {
        goog.events.markIeEvent_(ieEvent);
        for (var ancestors = [], parent = evt.currentTarget;parent;parent = parent.parentNode) {
          ancestors.push(parent);
        }
        for (var type = listener.type, i = ancestors.length - 1;!evt.propagationStopped_ && 0 <= i;i--) {
          evt.currentTarget = ancestors[i], retval &= goog.events.fireListeners_(ancestors[i], type, !0, evt);
        }
        for (i = 0;!evt.propagationStopped_ && i < ancestors.length;i++) {
          evt.currentTarget = ancestors[i], retval &= goog.events.fireListeners_(ancestors[i], type, !1, evt);
        }
      }
    } else {
      retval = goog.events.fireListener(listener, evt);
    }
    return retval;
  }
  return goog.events.fireListener(listener, new goog.events.BrowserEvent(opt_evt, this));
};
goog.events.markIeEvent_ = function $goog$events$markIeEvent_$(e) {
  var useReturnValue = !1;
  if (0 == e.keyCode) {
    try {
      e.keyCode = -1;
      return;
    } catch (ex) {
      useReturnValue = !0;
    }
  }
  if (useReturnValue || void 0 == e.returnValue) {
    e.returnValue = !0;
  }
};
goog.events.isMarkedIeEvent_ = function $goog$events$isMarkedIeEvent_$(e) {
  return 0 > e.keyCode || void 0 != e.returnValue;
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function $goog$events$getUniqueId$(identifier) {
  return identifier + "_" + goog.events.uniqueIdCounter_++;
};
goog.events.getListenerMap_ = function $goog$events$getListenerMap_$(src) {
  var listenerMap = src[goog.events.LISTENER_MAP_PROP_];
  return listenerMap instanceof goog.events.ListenerMap ? listenerMap : null;
};
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
goog.events.wrapListener = function $goog$events$wrapListener$(listener) {
  goog.asserts.assert(listener, "Listener can not be null.");
  if (goog.isFunction(listener)) {
    return listener;
  }
  goog.asserts.assert(listener.handleEvent, "An object listener must have handleEvent method.");
  return listener[goog.events.LISTENER_WRAPPER_PROP_] || (listener[goog.events.LISTENER_WRAPPER_PROP_] = function $listener$goog$events$LISTENER_WRAPPER_PROP_$(e) {
    return listener.handleEvent(e);
  });
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.events.handleBrowserEvent_ = transformer(goog.events.handleBrowserEvent_);
});
goog.events.EventTarget = function $goog$events$EventTarget$() {
  goog.Disposable.call(this);
  this.eventTargetListeners_ = new goog.events.ListenerMap(this);
  this.actualEventTarget_ = this;
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.Listenable.addImplementation(goog.events.EventTarget);
goog.events.EventTarget.MAX_ANCESTORS_ = 1E3;
goog.events.EventTarget.prototype.parentEventTarget_ = null;
goog.events.EventTarget.prototype.getParentEventTarget = function $goog$events$EventTarget$$getParentEventTarget$() {
  return this.parentEventTarget_;
};
goog.events.EventTarget.prototype.setParentEventTarget = function $goog$events$EventTarget$$setParentEventTarget$(parent) {
  this.parentEventTarget_ = parent;
};
goog.events.EventTarget.prototype.addEventListener = function $goog$events$EventTarget$$addEventListener$(type, handler, opt_capture, opt_handlerScope) {
  goog.events.listen(this, type, handler, opt_capture, opt_handlerScope);
};
goog.events.EventTarget.prototype.removeEventListener = function $goog$events$EventTarget$$removeEventListener$(type, handler, opt_capture, opt_handlerScope) {
  goog.events.unlisten(this, type, handler, opt_capture, opt_handlerScope);
};
goog.events.EventTarget.prototype.dispatchEvent = function $goog$events$EventTarget$$dispatchEvent$(e) {
  this.assertInitialized_();
  var ancestorsTree, ancestor = this.getParentEventTarget();
  if (ancestor) {
    ancestorsTree = [];
    for (var ancestorCount = 1;ancestor;ancestor = ancestor.getParentEventTarget()) {
      ancestorsTree.push(ancestor), goog.asserts.assert(++ancestorCount < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop");
    }
  }
  return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, e, ancestorsTree);
};
goog.events.EventTarget.prototype.disposeInternal = function $goog$events$EventTarget$$disposeInternal$() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  this.removeAllListeners();
  this.parentEventTarget_ = null;
};
goog.events.EventTarget.prototype.listen = function $goog$events$EventTarget$$listen$(type, listener, opt_useCapture, opt_listenerScope) {
  this.assertInitialized_();
  return this.eventTargetListeners_.add(String(type), listener, !1, opt_useCapture, opt_listenerScope);
};
goog.events.EventTarget.prototype.listenOnce = function $goog$events$EventTarget$$listenOnce$(type, listener, opt_useCapture, opt_listenerScope) {
  return this.eventTargetListeners_.add(String(type), listener, !0, opt_useCapture, opt_listenerScope);
};
goog.events.EventTarget.prototype.unlisten = function $goog$events$EventTarget$$unlisten$(type, listener, opt_useCapture, opt_listenerScope) {
  return this.eventTargetListeners_.remove(String(type), listener, opt_useCapture, opt_listenerScope);
};
goog.events.EventTarget.prototype.unlistenByKey = function $goog$events$EventTarget$$unlistenByKey$(key) {
  return this.eventTargetListeners_.removeByKey(key);
};
goog.events.EventTarget.prototype.removeAllListeners = function $goog$events$EventTarget$$removeAllListeners$(opt_type) {
  return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(opt_type) : 0;
};
goog.events.EventTarget.prototype.fireListeners = function $goog$events$EventTarget$$fireListeners$(type, capture, eventObject) {
  var listenerArray = this.eventTargetListeners_.listeners[String(type)];
  if (!listenerArray) {
    return!0;
  }
  for (var listenerArray = goog.array.clone(listenerArray), rv = !0, i = 0;i < listenerArray.length;++i) {
    var listener = listenerArray[i];
    if (listener && !listener.removed && listener.capture == capture) {
      var listenerFn = listener.listener, listenerHandler = listener.handler || listener.src;
      listener.callOnce && this.unlistenByKey(listener);
      rv = !1 !== listenerFn.call(listenerHandler, eventObject) && rv;
    }
  }
  return rv && !1 != eventObject.returnValue_;
};
goog.events.EventTarget.prototype.getListeners = function $goog$events$EventTarget$$getListeners$(type, capture) {
  return this.eventTargetListeners_.getListeners(String(type), capture);
};
goog.events.EventTarget.prototype.getListener = function $goog$events$EventTarget$$getListener$(type, listener, capture, opt_listenerScope) {
  return this.eventTargetListeners_.getListener(String(type), listener, capture, opt_listenerScope);
};
goog.events.EventTarget.prototype.hasListener = function $goog$events$EventTarget$$hasListener$(opt_type, opt_capture) {
  var id = goog.isDef(opt_type) ? String(opt_type) : void 0;
  return this.eventTargetListeners_.hasListener(id, opt_capture);
};
goog.events.EventTarget.prototype.assertInitialized_ = function $goog$events$EventTarget$$assertInitialized_$() {
  goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?");
};
goog.events.EventTarget.dispatchEventInternal_ = function $goog$events$EventTarget$dispatchEventInternal_$(target, e, opt_ancestorsTree) {
  var type = e.type || e;
  if (goog.isString(e)) {
    e = new goog.events.Event(e, target);
  } else {
    if (e instanceof goog.events.Event) {
      e.target = e.target || target;
    } else {
      var oldEvent = e;
      e = new goog.events.Event(type, target);
      goog.object.extend(e, oldEvent);
    }
  }
  var rv = !0, currentTarget;
  if (opt_ancestorsTree) {
    for (var i = opt_ancestorsTree.length - 1;!e.propagationStopped_ && 0 <= i;i--) {
      currentTarget = e.currentTarget = opt_ancestorsTree[i], rv = currentTarget.fireListeners(type, !0, e) && rv;
    }
  }
  e.propagationStopped_ || (currentTarget = e.currentTarget = target, rv = currentTarget.fireListeners(type, !0, e) && rv, e.propagationStopped_ || (rv = currentTarget.fireListeners(type, !1, e) && rv));
  if (opt_ancestorsTree) {
    for (i = 0;!e.propagationStopped_ && i < opt_ancestorsTree.length;i++) {
      currentTarget = e.currentTarget = opt_ancestorsTree[i], rv = currentTarget.fireListeners(type, !1, e) && rv;
    }
  }
  return rv;
};
i18n.input.keyboard.EventType = {KEYBOARD_CLOSED:"kc", KEYBOARD_MINIMIZED:"kmi", KEYBOARD_MAXIMIZED:"kma", COMMIT_START:"kcs", COMMIT_END:"kce", LAYOUT_LOADED:"lld", LAYOUT_ACTIVATED:"lat"};
i18n.input.keyboard.LayoutEvent = function $i18n$input$keyboard$LayoutEvent$(type, layoutView) {
  goog.events.Event.call(this, type);
  this.layoutView = layoutView;
};
goog.inherits(i18n.input.keyboard.LayoutEvent, goog.events.Event);
i18n.input.keyboard.Model = function $i18n$input$keyboard$Model$() {
  goog.events.EventTarget.call(this);
  this.layouts_ = {};
  this.delayActiveLayout_ = this.activeLayout_ = "";
  this.historyState_ = {previous:{text:"", transat:-1}, ambi:"", current:{text:"", transat:-1}};
  goog.exportSymbol("google.elements.keyboard.loadme", goog.bind(this.onLayoutLoaded_, this));
};
goog.inherits(i18n.input.keyboard.Model, goog.events.EventTarget);
i18n.input.keyboard.Model.STATIC_DIR = "/layouts/";
i18n.input.keyboard.Model.prototype.loadLayout = function $i18n$input$keyboard$Model$$loadLayout$(layoutCode) {
  if (layoutCode) {
    var parsedLayout = this.layouts_[layoutCode];
    void 0 == parsedLayout ? (this.layouts_[layoutCode] = !1, "ko" == layoutCode && (layoutCode = "hangul"), i18n.input.keyboard.Model.loadLayoutScript_(layoutCode)) : parsedLayout && this.dispatchEvent(new i18n.input.keyboard.LayoutEvent(i18n.input.keyboard.EventType.LAYOUT_LOADED, parsedLayout.view));
  }
};
i18n.input.keyboard.Model.prototype.activateLayout = function $i18n$input$keyboard$Model$$activateLayout$(layoutCode) {
  if (layoutCode && this.activeLayout_ != layoutCode) {
    var parsedLayout = this.layouts_[layoutCode];
    parsedLayout ? (this.activeLayout_ = layoutCode, this.delayActiveLayout_ = "", this.clearHistory_(), this.dispatchEvent(new i18n.input.keyboard.LayoutEvent(i18n.input.keyboard.EventType.LAYOUT_ACTIVATED, parsedLayout.view))) : !1 == parsedLayout && (this.delayActiveLayout_ = layoutCode);
  }
};
i18n.input.keyboard.Model.prototype.translate = function $i18n$input$keyboard$Model$$translate$(chars, charsBeforeCaret) {
  if (!this.activeLayout_ || !chars) {
    return null;
  }
  var parsedLayout = this.layouts_[this.activeLayout_];
  if (!parsedLayout) {
    return null;
  }
  this.matchHistory_(charsBeforeCaret);
  var result, history = this.historyState_;
  history.ambi && (result = parsedLayout.transform(history.previous.text, history.previous.transat, history.ambi + chars)) && 0 > result.back && (result = null);
  if (result) {
    var prev = history.previous.text, prev = prev.slice(0, prev.length - result.back), prev = prev + result.chars;
    result.back = history.current.text.length;
    result.chars = prev;
  } else {
    result = parsedLayout.transform(history.current.text, history.current.transat, chars);
  }
  parsedLayout.isAmbiChars(history.ambi + chars) ? (history.ambi || (history.previous = goog.object.clone(history.current)), history.ambi += chars) : parsedLayout.isAmbiChars(chars) ? (history.previous = goog.object.clone(history.current), history.ambi = chars) : (history.previous.text = "", history.previous.transat = -1, history.ambi = "");
  var text = history.current.text, transat = history.current.transat;
  result ? (text = text.slice(0, text.length - result.back), text += result.chars, transat = text.length) : (text += chars, result = {back:0, chars:chars});
  var spacePos = text.lastIndexOf(" ");
  0 <= spacePos && (text = text.slice(spacePos + 1), transat = transat > spacePos ? transat - (spacePos + 1) : -1);
  history.current.text = text;
  history.current.transat = transat;
  return result;
};
i18n.input.keyboard.Model.prototype.hasTransforms = function $i18n$input$keyboard$Model$$hasTransforms$() {
  var parsedLayout = this.layouts_[this.activeLayout_];
  return!!parsedLayout && !!parsedLayout.transforms;
};
i18n.input.keyboard.Model.prototype.processBackspace = function $i18n$input$keyboard$Model$$processBackspace$(charsBeforeCaret) {
  this.matchHistory_(charsBeforeCaret);
  var history = this.historyState_, text = history.current.text;
  if (text) {
    text = text.slice(0, text.length - 1);
    history.current.text = text;
    history.current.transat > text.length && (history.current.transat = text.length);
    if (text = history.ambi) {
      history.ambi = text.slice(0, text.length - 1);
    }
    history.ambi || (history.previous = {text:"", transat:-1});
  } else {
    history.previous = {text:"", transat:-1}, history.ambi = "", history.current = goog.object.clone(history.previous);
  }
};
i18n.input.keyboard.Model.prototype.onLayoutLoaded_ = function $i18n$input$keyboard$Model$$onLayoutLoaded_$(layout) {
  if ("hangul" == layout.id) {
    i18n.input.keyboard.Model.loadLayoutScript_("ko");
  } else {
    var parsedLayout = new i18n.input.keyboard.ParsedLayout(layout);
    parsedLayout.id && (this.layouts_[parsedLayout.id] = parsedLayout);
    this.delayActiveLayout_ == layout.id && (this.activateLayout(this.delayActiveLayout_), this.delayActiveLayout_ = "");
    this.dispatchEvent(new i18n.input.keyboard.LayoutEvent(i18n.input.keyboard.EventType.LAYOUT_LOADED, parsedLayout.view));
  }
};
i18n.input.keyboard.Model.prototype.matchHistory_ = function $i18n$input$keyboard$Model$$matchHistory_$(text) {
  var hisText = this.historyState_.current.text;
  hisText && text && (goog.string.endsWith(text, hisText) || goog.string.endsWith(hisText, text)) || this.clearHistory_();
};
i18n.input.keyboard.Model.prototype.clearHistory_ = function $i18n$input$keyboard$Model$$clearHistory_$() {
  this.historyState_.ambi = "";
  this.historyState_.previous = {text:"", transat:-1};
  this.historyState_.current = goog.object.clone(this.historyState_.previous);
};
i18n.input.keyboard.Model.loadLayoutScript_ = function $i18n$input$keyboard$Model$loadLayoutScript_$(layoutCode) {
  var script = goog.dom.createElement("script");
  script.src = i18n.input.keyboard.Model.STATIC_DIR + layoutCode + ".js";
  goog.dom.appendChild(document.body, script);
};
goog.dom.ViewportSizeMonitor = function $goog$dom$ViewportSizeMonitor$(opt_window) {
  goog.events.EventTarget.call(this);
  this.window_ = opt_window || window;
  this.listenerKey_ = goog.events.listen(this.window_, goog.events.EventType.RESIZE, this.handleResize_, !1, this);
  this.size_ = goog.dom.getViewportSize(this.window_);
};
goog.inherits(goog.dom.ViewportSizeMonitor, goog.events.EventTarget);
goog.dom.ViewportSizeMonitor.getInstanceForWindow = function $goog$dom$ViewportSizeMonitor$getInstanceForWindow$(opt_window) {
  var currentWindow = opt_window || window, uid = goog.getUid(currentWindow);
  return goog.dom.ViewportSizeMonitor.windowInstanceMap_[uid] = goog.dom.ViewportSizeMonitor.windowInstanceMap_[uid] || new goog.dom.ViewportSizeMonitor(currentWindow);
};
goog.dom.ViewportSizeMonitor.removeInstanceForWindow = function $goog$dom$ViewportSizeMonitor$removeInstanceForWindow$(opt_window) {
  var uid = goog.getUid(opt_window || window);
  goog.dispose(goog.dom.ViewportSizeMonitor.windowInstanceMap_[uid]);
  delete goog.dom.ViewportSizeMonitor.windowInstanceMap_[uid];
};
goog.dom.ViewportSizeMonitor.windowInstanceMap_ = {};
goog.dom.ViewportSizeMonitor.prototype.listenerKey_ = null;
goog.dom.ViewportSizeMonitor.prototype.window_ = null;
goog.dom.ViewportSizeMonitor.prototype.size_ = null;
goog.dom.ViewportSizeMonitor.prototype.getSize = function $goog$dom$ViewportSizeMonitor$$getSize$() {
  return this.size_ ? this.size_.clone() : null;
};
goog.dom.ViewportSizeMonitor.prototype.disposeInternal = function $goog$dom$ViewportSizeMonitor$$disposeInternal$() {
  goog.dom.ViewportSizeMonitor.superClass_.disposeInternal.call(this);
  this.listenerKey_ && (goog.events.unlistenByKey(this.listenerKey_), this.listenerKey_ = null);
  this.size_ = this.window_ = null;
};
goog.dom.ViewportSizeMonitor.prototype.handleResize_ = function $goog$dom$ViewportSizeMonitor$$handleResize_$() {
  var size = goog.dom.getViewportSize(this.window_);
  goog.math.Size.equals(size, this.size_) || (this.size_ = size, this.dispatchEvent(goog.events.EventType.RESIZE));
};
goog.events.EventHandler = function $goog$events$EventHandler$(opt_scope) {
  goog.Disposable.call(this);
  this.handler_ = opt_scope;
  this.keys_ = {};
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.typeArray_ = [];
goog.events.EventHandler.prototype.listen = function $goog$events$EventHandler$$listen$(src, type, opt_fn, opt_capture) {
  return this.listen_(src, type, opt_fn, opt_capture);
};
goog.events.EventHandler.prototype.listen_ = function $goog$events$EventHandler$$listen_$(src, type, opt_fn, opt_capture, opt_scope) {
  goog.isArray(type) || (type && (goog.events.EventHandler.typeArray_[0] = type.toString()), type = goog.events.EventHandler.typeArray_);
  for (var i = 0;i < type.length;i++) {
    var listenerObj = goog.events.listen(src, type[i], opt_fn || this.handleEvent, opt_capture || !1, opt_scope || this.handler_ || this);
    if (!listenerObj) {
      break;
    }
    var key = listenerObj.key;
    this.keys_[key] = listenerObj;
  }
  return this;
};
goog.events.EventHandler.prototype.listenOnce = function $goog$events$EventHandler$$listenOnce$(src, type, opt_fn, opt_capture) {
  return this.listenOnce_(src, type, opt_fn, opt_capture);
};
goog.events.EventHandler.prototype.listenOnce_ = function $goog$events$EventHandler$$listenOnce_$(src, type, opt_fn, opt_capture, opt_scope) {
  if (goog.isArray(type)) {
    for (var i = 0;i < type.length;i++) {
      this.listenOnce_(src, type[i], opt_fn, opt_capture, opt_scope);
    }
  } else {
    var listenerObj = goog.events.listenOnce(src, type, opt_fn || this.handleEvent, opt_capture, opt_scope || this.handler_ || this);
    if (!listenerObj) {
      return this;
    }
    var key = listenerObj.key;
    this.keys_[key] = listenerObj;
  }
  return this;
};
goog.events.EventHandler.prototype.listenWithWrapper = function $goog$events$EventHandler$$listenWithWrapper$(src, wrapper, listener, opt_capt) {
  return this.listenWithWrapper_(src, wrapper, listener, opt_capt);
};
goog.events.EventHandler.prototype.listenWithWrapper_ = function $goog$events$EventHandler$$listenWithWrapper_$(src, wrapper, listener, opt_capt, opt_scope) {
  wrapper.listen(src, listener, opt_capt, opt_scope || this.handler_ || this, this);
  return this;
};
goog.events.EventHandler.prototype.unlisten = function $goog$events$EventHandler$$unlisten$(src, type, opt_fn, opt_capture, opt_scope) {
  if (goog.isArray(type)) {
    for (var i = 0;i < type.length;i++) {
      this.unlisten(src, type[i], opt_fn, opt_capture, opt_scope);
    }
  } else {
    var listener = goog.events.getListener(src, type, opt_fn || this.handleEvent, opt_capture, opt_scope || this.handler_ || this);
    listener && (goog.events.unlistenByKey(listener), delete this.keys_[listener.key]);
  }
  return this;
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function $goog$events$EventHandler$$unlistenWithWrapper$(src, wrapper, listener, opt_capt, opt_scope) {
  wrapper.unlisten(src, listener, opt_capt, opt_scope || this.handler_ || this, this);
  return this;
};
goog.events.EventHandler.prototype.removeAll = function $goog$events$EventHandler$$removeAll$() {
  goog.object.forEach(this.keys_, goog.events.unlistenByKey);
  this.keys_ = {};
};
goog.events.EventHandler.prototype.disposeInternal = function $goog$events$EventHandler$$disposeInternal$() {
  goog.events.EventHandler.superClass_.disposeInternal.call(this);
  this.removeAll();
};
goog.events.EventHandler.prototype.handleEvent = function $goog$events$EventHandler$$handleEvent$() {
  throw Error("EventHandler.handleEvent not implemented");
};
goog.math.Box = function $goog$math$Box$(top, right, bottom, left) {
  this.top = top;
  this.right = right;
  this.bottom = bottom;
  this.left = left;
};
goog.math.Box.boundingBox = function $goog$math$Box$boundingBox$(var_args) {
  for (var box = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), i = 1;i < arguments.length;i++) {
    var coord = arguments[i];
    box.top = Math.min(box.top, coord.y);
    box.right = Math.max(box.right, coord.x);
    box.bottom = Math.max(box.bottom, coord.y);
    box.left = Math.min(box.left, coord.x);
  }
  return box;
};
goog.math.Box.prototype.clone = function $goog$math$Box$$clone$() {
  return new goog.math.Box(this.top, this.right, this.bottom, this.left);
};
goog.DEBUG && (goog.math.Box.prototype.toString = function $goog$math$Box$$toString$() {
  return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)";
});
goog.math.Box.prototype.contains = function $goog$math$Box$$contains$(other) {
  return goog.math.Box.contains(this, other);
};
goog.math.Box.equals = function $goog$math$Box$equals$(a, b) {
  return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1;
};
goog.math.Box.contains = function $goog$math$Box$contains$(box, other) {
  return box && other ? other instanceof goog.math.Box ? other.left >= box.left && other.right <= box.right && other.top >= box.top && other.bottom <= box.bottom : other.x >= box.left && other.x <= box.right && other.y >= box.top && other.y <= box.bottom : !1;
};
goog.math.Box.relativePositionX = function $goog$math$Box$relativePositionX$(box, coord) {
  return coord.x < box.left ? coord.x - box.left : coord.x > box.right ? coord.x - box.right : 0;
};
goog.math.Box.relativePositionY = function $goog$math$Box$relativePositionY$(box, coord) {
  return coord.y < box.top ? coord.y - box.top : coord.y > box.bottom ? coord.y - box.bottom : 0;
};
goog.math.Box.distance = function $goog$math$Box$distance$(box, coord) {
  var x = goog.math.Box.relativePositionX(box, coord), y = goog.math.Box.relativePositionY(box, coord);
  return Math.sqrt(x * x + y * y);
};
goog.math.Box.intersects = function $goog$math$Box$intersects$(a, b) {
  return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom;
};
goog.math.Box.intersectsWithPadding = function $goog$math$Box$intersectsWithPadding$(a, b, padding) {
  return a.left <= b.right + padding && b.left <= a.right + padding && a.top <= b.bottom + padding && b.top <= a.bottom + padding;
};
goog.math.Box.prototype.ceil = function $goog$math$Box$$ceil$() {
  this.top = Math.ceil(this.top);
  this.right = Math.ceil(this.right);
  this.bottom = Math.ceil(this.bottom);
  this.left = Math.ceil(this.left);
  return this;
};
goog.math.Box.prototype.floor = function $goog$math$Box$$floor$() {
  this.top = Math.floor(this.top);
  this.right = Math.floor(this.right);
  this.bottom = Math.floor(this.bottom);
  this.left = Math.floor(this.left);
  return this;
};
goog.math.Box.prototype.round = function $goog$math$Box$$round$() {
  this.top = Math.round(this.top);
  this.right = Math.round(this.right);
  this.bottom = Math.round(this.bottom);
  this.left = Math.round(this.left);
  return this;
};
goog.math.Box.prototype.translate = function $goog$math$Box$$translate$(tx, opt_ty) {
  tx instanceof goog.math.Coordinate ? (this.left += tx.x, this.right += tx.x, this.top += tx.y, this.bottom += tx.y) : (this.left += tx, this.right += tx, goog.isNumber(opt_ty) && (this.top += opt_ty, this.bottom += opt_ty));
  return this;
};
goog.math.Rect = function $goog$math$Rect$(x, y, w, h) {
  this.left = x;
  this.top = y;
  this.width = w;
  this.height = h;
};
goog.math.Rect.prototype.clone = function $goog$math$Rect$$clone$() {
  return new goog.math.Rect(this.left, this.top, this.width, this.height);
};
goog.math.Rect.createFromBox = function $goog$math$Rect$createFromBox$(box) {
  return new goog.math.Rect(box.left, box.top, box.right - box.left, box.bottom - box.top);
};
goog.DEBUG && (goog.math.Rect.prototype.toString = function $goog$math$Rect$$toString$() {
  return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)";
});
goog.math.Rect.equals = function $goog$math$Rect$equals$(a, b) {
  return a == b ? !0 : a && b ? a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height : !1;
};
goog.math.Rect.prototype.intersection = function $goog$math$Rect$$intersection$(rect) {
  var x0 = Math.max(this.left, rect.left), x1 = Math.min(this.left + this.width, rect.left + rect.width);
  if (x0 <= x1) {
    var y0 = Math.max(this.top, rect.top), y1 = Math.min(this.top + this.height, rect.top + rect.height);
    if (y0 <= y1) {
      return this.left = x0, this.top = y0, this.width = x1 - x0, this.height = y1 - y0, !0;
    }
  }
  return!1;
};
goog.math.Rect.intersection = function $goog$math$Rect$intersection$(a, b) {
  var x0 = Math.max(a.left, b.left), x1 = Math.min(a.left + a.width, b.left + b.width);
  if (x0 <= x1) {
    var y0 = Math.max(a.top, b.top), y1 = Math.min(a.top + a.height, b.top + b.height);
    if (y0 <= y1) {
      return new goog.math.Rect(x0, y0, x1 - x0, y1 - y0);
    }
  }
  return null;
};
goog.math.Rect.intersects = function $goog$math$Rect$intersects$(a, b) {
  return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;
};
goog.math.Rect.prototype.intersects = function $goog$math$Rect$$intersects$(rect) {
  return goog.math.Rect.intersects(this, rect);
};
goog.math.Rect.difference = function $goog$math$Rect$difference$(a, b) {
  var intersection = goog.math.Rect.intersection(a, b);
  if (!intersection || !intersection.height || !intersection.width) {
    return[a.clone()];
  }
  var result = [], top = a.top, height = a.height, ar = a.left + a.width, ab = a.top + a.height, br = b.left + b.width, bb = b.top + b.height;
  b.top > a.top && (result.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), top = b.top, height -= b.top - a.top);
  bb < ab && (result.push(new goog.math.Rect(a.left, bb, a.width, ab - bb)), height = bb - top);
  b.left > a.left && result.push(new goog.math.Rect(a.left, top, b.left - a.left, height));
  br < ar && result.push(new goog.math.Rect(br, top, ar - br, height));
  return result;
};
goog.math.Rect.prototype.difference = function $goog$math$Rect$$difference$(rect) {
  return goog.math.Rect.difference(this, rect);
};
goog.math.Rect.prototype.boundingRect = function $goog$math$Rect$$boundingRect$(rect) {
  var right = Math.max(this.left + this.width, rect.left + rect.width), bottom = Math.max(this.top + this.height, rect.top + rect.height);
  this.left = Math.min(this.left, rect.left);
  this.top = Math.min(this.top, rect.top);
  this.width = right - this.left;
  this.height = bottom - this.top;
};
goog.math.Rect.boundingRect = function $goog$math$Rect$boundingRect$(a, b) {
  if (!a || !b) {
    return null;
  }
  var clone = a.clone();
  clone.boundingRect(b);
  return clone;
};
goog.math.Rect.prototype.contains = function $goog$math$Rect$$contains$(another) {
  return another instanceof goog.math.Rect ? this.left <= another.left && this.left + this.width >= another.left + another.width && this.top <= another.top && this.top + this.height >= another.top + another.height : another.x >= this.left && another.x <= this.left + this.width && another.y >= this.top && another.y <= this.top + this.height;
};
goog.math.Rect.prototype.squaredDistance = function $goog$math$Rect$$squaredDistance$(point) {
  var dx = point.x < this.left ? this.left - point.x : Math.max(point.x - (this.left + this.width), 0), dy = point.y < this.top ? this.top - point.y : Math.max(point.y - (this.top + this.height), 0);
  return dx * dx + dy * dy;
};
goog.math.Rect.prototype.distance = function $goog$math$Rect$$distance$(point) {
  return Math.sqrt(this.squaredDistance(point));
};
goog.math.Rect.prototype.getSize = function $goog$math$Rect$$getSize$() {
  return new goog.math.Size(this.width, this.height);
};
goog.math.Rect.prototype.ceil = function $goog$math$Rect$$ceil$() {
  this.left = Math.ceil(this.left);
  this.top = Math.ceil(this.top);
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Rect.prototype.floor = function $goog$math$Rect$$floor$() {
  this.left = Math.floor(this.left);
  this.top = Math.floor(this.top);
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Rect.prototype.round = function $goog$math$Rect$$round$() {
  this.left = Math.round(this.left);
  this.top = Math.round(this.top);
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.math.Rect.prototype.translate = function $goog$math$Rect$$translate$(tx, opt_ty) {
  tx instanceof goog.math.Coordinate ? (this.left += tx.x, this.top += tx.y) : (this.left += tx, goog.isNumber(opt_ty) && (this.top += opt_ty));
  return this;
};
goog.dom.vendor = {};
goog.dom.vendor.getVendorJsPrefix = function $goog$dom$vendor$getVendorJsPrefix$() {
  return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null;
};
goog.dom.vendor.getVendorPrefix = function $goog$dom$vendor$getVendorPrefix$() {
  return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null;
};
goog.dom.vendor.getPrefixedPropertyName = function $goog$dom$vendor$getPrefixedPropertyName$(propertyName, opt_object) {
  if (opt_object && propertyName in opt_object) {
    return propertyName;
  }
  var prefix = goog.dom.vendor.getVendorJsPrefix();
  if (prefix) {
    var prefix = prefix.toLowerCase(), prefixedPropertyName = prefix + goog.string.toTitleCase(propertyName);
    return!goog.isDef(opt_object) || prefixedPropertyName in opt_object ? prefixedPropertyName : null;
  }
  return null;
};
goog.dom.vendor.getPrefixedEventType = function $goog$dom$vendor$getPrefixedEventType$(eventType) {
  var prefix = goog.dom.vendor.getVendorJsPrefix() || "";
  return(prefix + eventType).toLowerCase();
};
goog.style = {};
goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS = !1;
goog.style.setStyle = function $goog$style$setStyle$(element, style, opt_value) {
  goog.isString(style) ? goog.style.setStyle_(element, opt_value, style) : goog.object.forEach(style, goog.partial(goog.style.setStyle_, element));
};
goog.style.setStyle_ = function $goog$style$setStyle_$(element, value, style) {
  var propertyName = goog.style.getVendorJsStyleName_(element, style);
  propertyName && (element.style[propertyName] = value);
};
goog.style.getVendorJsStyleName_ = function $goog$style$getVendorJsStyleName_$(element, style) {
  var camelStyle = goog.string.toCamelCase(style);
  if (void 0 === element.style[camelStyle]) {
    var prefixedStyle = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(camelStyle);
    if (void 0 !== element.style[prefixedStyle]) {
      return prefixedStyle;
    }
  }
  return camelStyle;
};
goog.style.getVendorStyleName_ = function $goog$style$getVendorStyleName_$(element, style) {
  var camelStyle = goog.string.toCamelCase(style);
  if (void 0 === element.style[camelStyle]) {
    var prefixedStyle = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(camelStyle);
    if (void 0 !== element.style[prefixedStyle]) {
      return goog.dom.vendor.getVendorPrefix() + "-" + style;
    }
  }
  return style;
};
goog.style.getStyle = function $goog$style$getStyle$(element, property) {
  var styleValue = element.style[goog.string.toCamelCase(property)];
  return "undefined" !== typeof styleValue ? styleValue : element.style[goog.style.getVendorJsStyleName_(element, property)] || "";
};
goog.style.getComputedStyle = function $goog$style$getComputedStyle$(element, property) {
  var doc = goog.dom.getOwnerDocument(element);
  if (doc.defaultView && doc.defaultView.getComputedStyle) {
    var styles = doc.defaultView.getComputedStyle(element, null);
    if (styles) {
      return styles[property] || styles.getPropertyValue(property) || "";
    }
  }
  return "";
};
goog.style.getCascadedStyle = function $goog$style$getCascadedStyle$(element, style) {
  return element.currentStyle ? element.currentStyle[style] : null;
};
goog.style.getStyle_ = function $goog$style$getStyle_$(element, style) {
  return goog.style.getComputedStyle(element, style) || goog.style.getCascadedStyle(element, style) || element.style && element.style[style];
};
goog.style.getComputedBoxSizing = function $goog$style$getComputedBoxSizing$(element) {
  return goog.style.getStyle_(element, "boxSizing") || goog.style.getStyle_(element, "MozBoxSizing") || goog.style.getStyle_(element, "WebkitBoxSizing") || null;
};
goog.style.getComputedPosition = function $goog$style$getComputedPosition$(element) {
  return goog.style.getStyle_(element, "position");
};
goog.style.getBackgroundColor = function $goog$style$getBackgroundColor$(element) {
  return goog.style.getStyle_(element, "backgroundColor");
};
goog.style.getComputedOverflowX = function $goog$style$getComputedOverflowX$(element) {
  return goog.style.getStyle_(element, "overflowX");
};
goog.style.getComputedOverflowY = function $goog$style$getComputedOverflowY$(element) {
  return goog.style.getStyle_(element, "overflowY");
};
goog.style.getComputedZIndex = function $goog$style$getComputedZIndex$(element) {
  return goog.style.getStyle_(element, "zIndex");
};
goog.style.getComputedTextAlign = function $goog$style$getComputedTextAlign$(element) {
  return goog.style.getStyle_(element, "textAlign");
};
goog.style.getComputedCursor = function $goog$style$getComputedCursor$(element) {
  return goog.style.getStyle_(element, "cursor");
};
goog.style.getComputedTransform = function $goog$style$getComputedTransform$(element) {
  var property = goog.style.getVendorStyleName_(element, "transform");
  return goog.style.getStyle_(element, property) || goog.style.getStyle_(element, "transform");
};
goog.style.setPosition = function $goog$style$setPosition$(el, arg1, opt_arg2) {
  var x, y, buggyGeckoSubPixelPos = goog.userAgent.GECKO && (goog.userAgent.MAC || goog.userAgent.X11) && goog.userAgent.isVersionOrHigher("1.9");
  arg1 instanceof goog.math.Coordinate ? (x = arg1.x, y = arg1.y) : (x = arg1, y = opt_arg2);
  el.style.left = goog.style.getPixelStyleValue_(x, buggyGeckoSubPixelPos);
  el.style.top = goog.style.getPixelStyleValue_(y, buggyGeckoSubPixelPos);
};
goog.style.getPosition = function $goog$style$getPosition$(element) {
  return new goog.math.Coordinate(element.offsetLeft, element.offsetTop);
};
goog.style.getClientViewportElement = function $goog$style$getClientViewportElement$(opt_node) {
  var doc;
  doc = opt_node ? goog.dom.getOwnerDocument(opt_node) : goog.dom.getDocument();
  return!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || goog.dom.getDomHelper(doc).isCss1CompatMode() ? doc.documentElement : doc.body;
};
goog.style.getViewportPageOffset = function $goog$style$getViewportPageOffset$(doc) {
  var body = doc.body, documentElement = doc.documentElement, scrollLeft = body.scrollLeft || documentElement.scrollLeft, scrollTop = body.scrollTop || documentElement.scrollTop;
  return new goog.math.Coordinate(scrollLeft, scrollTop);
};
goog.style.getBoundingClientRect_ = function $goog$style$getBoundingClientRect_$(el) {
  var rect;
  try {
    rect = el.getBoundingClientRect();
  } catch (e) {
    return{left:0, top:0, right:0, bottom:0};
  }
  if (goog.userAgent.IE && el.ownerDocument.body) {
    var doc = el.ownerDocument;
    rect.left -= doc.documentElement.clientLeft + doc.body.clientLeft;
    rect.top -= doc.documentElement.clientTop + doc.body.clientTop;
  }
  return rect;
};
goog.style.getOffsetParent = function $goog$style$getOffsetParent$(element) {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8)) {
    return element.offsetParent;
  }
  for (var doc = goog.dom.getOwnerDocument(element), positionStyle = goog.style.getStyle_(element, "position"), skipStatic = "fixed" == positionStyle || "absolute" == positionStyle, parent = element.parentNode;parent && parent != doc;parent = parent.parentNode) {
    if (positionStyle = goog.style.getStyle_(parent, "position"), skipStatic = skipStatic && "static" == positionStyle && parent != doc.documentElement && parent != doc.body, !skipStatic && (parent.scrollWidth > parent.clientWidth || parent.scrollHeight > parent.clientHeight || "fixed" == positionStyle || "absolute" == positionStyle || "relative" == positionStyle)) {
      return parent;
    }
  }
  return null;
};
goog.style.getVisibleRectForElement = function $goog$style$getVisibleRectForElement$(element) {
  for (var visibleRect = new goog.math.Box(0, Infinity, Infinity, 0), dom = goog.dom.getDomHelper(element), body = dom.getDocument().body, documentElement = dom.getDocument().documentElement, scrollEl = dom.getDocumentScrollElement(), el = element;el = goog.style.getOffsetParent(el);) {
    if (!(goog.userAgent.IE && 0 == el.clientWidth || goog.userAgent.WEBKIT && 0 == el.clientHeight && el == body) && el != body && el != documentElement && "visible" != goog.style.getStyle_(el, "overflow")) {
      var pos = goog.style.getPageOffset(el), client = goog.style.getClientLeftTop(el);
      pos.x += client.x;
      pos.y += client.y;
      visibleRect.top = Math.max(visibleRect.top, pos.y);
      visibleRect.right = Math.min(visibleRect.right, pos.x + el.clientWidth);
      visibleRect.bottom = Math.min(visibleRect.bottom, pos.y + el.clientHeight);
      visibleRect.left = Math.max(visibleRect.left, pos.x);
    }
  }
  var scrollX = scrollEl.scrollLeft, scrollY = scrollEl.scrollTop;
  visibleRect.left = Math.max(visibleRect.left, scrollX);
  visibleRect.top = Math.max(visibleRect.top, scrollY);
  var winSize = dom.getViewportSize();
  visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
  visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
  return 0 <= visibleRect.top && 0 <= visibleRect.left && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
};
goog.style.getContainerOffsetToScrollInto = function $goog$style$getContainerOffsetToScrollInto$(element, container, opt_center) {
  var elementPos = goog.style.getPageOffset(element), containerPos = goog.style.getPageOffset(container), containerBorder = goog.style.getBorderBox(container), relX = elementPos.x - containerPos.x - containerBorder.left, relY = elementPos.y - containerPos.y - containerBorder.top, spaceX = container.clientWidth - element.offsetWidth, spaceY = container.clientHeight - element.offsetHeight, scrollLeft = container.scrollLeft, scrollTop = container.scrollTop;
  opt_center ? (scrollLeft += relX - spaceX / 2, scrollTop += relY - spaceY / 2) : (scrollLeft += Math.min(relX, Math.max(relX - spaceX, 0)), scrollTop += Math.min(relY, Math.max(relY - spaceY, 0)));
  return new goog.math.Coordinate(scrollLeft, scrollTop);
};
goog.style.scrollIntoContainerView = function $goog$style$scrollIntoContainerView$(element, container, opt_center) {
  var offset = goog.style.getContainerOffsetToScrollInto(element, container, opt_center);
  container.scrollLeft = offset.x;
  container.scrollTop = offset.y;
};
goog.style.getClientLeftTop = function $goog$style$getClientLeftTop$(el) {
  if (goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("1.9")) {
    var left = parseFloat(goog.style.getComputedStyle(el, "borderLeftWidth"));
    if (goog.style.isRightToLeft(el)) {
      var scrollbarWidth = el.offsetWidth - el.clientWidth - left - parseFloat(goog.style.getComputedStyle(el, "borderRightWidth")), left = left + scrollbarWidth
    }
    return new goog.math.Coordinate(left, parseFloat(goog.style.getComputedStyle(el, "borderTopWidth")));
  }
  return new goog.math.Coordinate(el.clientLeft, el.clientTop);
};
goog.style.getPageOffset = function $goog$style$getPageOffset$(el) {
  var box, doc = goog.dom.getOwnerDocument(el), positionStyle = goog.style.getStyle_(el, "position");
  goog.asserts.assertObject(el, "Parameter is required");
  var BUGGY_GECKO_BOX_OBJECT = !goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS && goog.userAgent.GECKO && doc.getBoxObjectFor && !el.getBoundingClientRect && "absolute" == positionStyle && (box = doc.getBoxObjectFor(el)) && (0 > box.screenX || 0 > box.screenY), pos = new goog.math.Coordinate(0, 0), viewportElement = goog.style.getClientViewportElement(doc);
  if (el == viewportElement) {
    return pos;
  }
  if (goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS || el.getBoundingClientRect) {
    box = goog.style.getBoundingClientRect_(el);
    var scrollCoord = goog.dom.getDomHelper(doc).getDocumentScroll();
    pos.x = box.left + scrollCoord.x;
    pos.y = box.top + scrollCoord.y;
  } else {
    if (doc.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT) {
      box = doc.getBoxObjectFor(el);
      var vpBox = doc.getBoxObjectFor(viewportElement);
      pos.x = box.screenX - vpBox.screenX;
      pos.y = box.screenY - vpBox.screenY;
    } else {
      var parent = el;
      do {
        pos.x += parent.offsetLeft;
        pos.y += parent.offsetTop;
        parent != el && (pos.x += parent.clientLeft || 0, pos.y += parent.clientTop || 0);
        if (goog.userAgent.WEBKIT && "fixed" == goog.style.getComputedPosition(parent)) {
          pos.x += doc.body.scrollLeft;
          pos.y += doc.body.scrollTop;
          break;
        }
        parent = parent.offsetParent;
      } while (parent && parent != el);
      if (goog.userAgent.OPERA || goog.userAgent.WEBKIT && "absolute" == positionStyle) {
        pos.y -= doc.body.offsetTop;
      }
      for (parent = el;(parent = goog.style.getOffsetParent(parent)) && parent != doc.body && parent != viewportElement;) {
        pos.x -= parent.scrollLeft, goog.userAgent.OPERA && "TR" == parent.tagName || (pos.y -= parent.scrollTop);
      }
    }
  }
  return pos;
};
goog.style.getPageOffsetLeft = function $goog$style$getPageOffsetLeft$(el) {
  return goog.style.getPageOffset(el).x;
};
goog.style.getPageOffsetTop = function $goog$style$getPageOffsetTop$(el) {
  return goog.style.getPageOffset(el).y;
};
goog.style.getFramedPageOffset = function $goog$style$getFramedPageOffset$(el, relativeWin) {
  var position = new goog.math.Coordinate(0, 0), currentWin = goog.dom.getWindow(goog.dom.getOwnerDocument(el)), currentEl = el;
  do {
    var offset = currentWin == relativeWin ? goog.style.getPageOffset(currentEl) : goog.style.getClientPositionForElement_(goog.asserts.assert(currentEl));
    position.x += offset.x;
    position.y += offset.y;
  } while (currentWin && currentWin != relativeWin && (currentEl = currentWin.frameElement) && (currentWin = currentWin.parent));
  return position;
};
goog.style.translateRectForAnotherFrame = function $goog$style$translateRectForAnotherFrame$(rect, origBase, newBase) {
  if (origBase.getDocument() != newBase.getDocument()) {
    var body = origBase.getDocument().body, pos = goog.style.getFramedPageOffset(body, newBase.getWindow()), pos = goog.math.Coordinate.difference(pos, goog.style.getPageOffset(body));
    goog.userAgent.IE && !origBase.isCss1CompatMode() && (pos = goog.math.Coordinate.difference(pos, origBase.getDocumentScroll()));
    rect.left += pos.x;
    rect.top += pos.y;
  }
};
goog.style.getRelativePosition = function $goog$style$getRelativePosition$(a, b) {
  var ap = goog.style.getClientPosition(a), bp = goog.style.getClientPosition(b);
  return new goog.math.Coordinate(ap.x - bp.x, ap.y - bp.y);
};
goog.style.getClientPositionForElement_ = function $goog$style$getClientPositionForElement_$(el) {
  var pos;
  if (goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS || el.getBoundingClientRect) {
    var box = goog.style.getBoundingClientRect_(el);
    pos = new goog.math.Coordinate(box.left, box.top);
  } else {
    var scrollCoord = goog.dom.getDomHelper(el).getDocumentScroll(), pageCoord = goog.style.getPageOffset(el);
    pos = new goog.math.Coordinate(pageCoord.x - scrollCoord.x, pageCoord.y - scrollCoord.y);
  }
  return goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher(12) ? goog.math.Coordinate.sum(pos, goog.style.getCssTranslation(el)) : pos;
};
goog.style.getClientPosition = function $goog$style$getClientPosition$(el) {
  goog.asserts.assert(el);
  if (el.nodeType == goog.dom.NodeType.ELEMENT) {
    return goog.style.getClientPositionForElement_(el);
  }
  var isAbstractedEvent = goog.isFunction(el.getBrowserEvent), be = el, targetEvent = el;
  el.targetTouches ? targetEvent = el.targetTouches[0] : isAbstractedEvent && be.getBrowserEvent().targetTouches && (targetEvent = be.getBrowserEvent().targetTouches[0]);
  return new goog.math.Coordinate(targetEvent.clientX, targetEvent.clientY);
};
goog.style.setPageOffset = function $goog$style$setPageOffset$(el, x, opt_y) {
  var cur = goog.style.getPageOffset(el);
  x instanceof goog.math.Coordinate && (opt_y = x.y, x = x.x);
  var dx = x - cur.x, dy = opt_y - cur.y;
  goog.style.setPosition(el, el.offsetLeft + dx, el.offsetTop + dy);
};
goog.style.setSize = function $goog$style$setSize$(element, w, opt_h) {
  var h;
  if (w instanceof goog.math.Size) {
    h = w.height, w = w.width;
  } else {
    if (void 0 == opt_h) {
      throw Error("missing height argument");
    }
    h = opt_h;
  }
  goog.style.setWidth(element, w);
  goog.style.setHeight(element, h);
};
goog.style.getPixelStyleValue_ = function $goog$style$getPixelStyleValue_$(value, round) {
  "number" == typeof value && (value = (round ? Math.round(value) : value) + "px");
  return value;
};
goog.style.setHeight = function $goog$style$setHeight$(element, height) {
  element.style.height = goog.style.getPixelStyleValue_(height, !0);
};
goog.style.setWidth = function $goog$style$setWidth$(element, width) {
  element.style.width = goog.style.getPixelStyleValue_(width, !0);
};
goog.style.getSize = function $goog$style$getSize$(element) {
  return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, element);
};
goog.style.evaluateWithTemporaryDisplay_ = function $goog$style$evaluateWithTemporaryDisplay_$(fn, element) {
  if ("none" != goog.style.getStyle_(element, "display")) {
    return fn(element);
  }
  var style = element.style, originalDisplay = style.display, originalVisibility = style.visibility, originalPosition = style.position;
  style.visibility = "hidden";
  style.position = "absolute";
  style.display = "inline";
  var retVal = fn(element);
  style.display = originalDisplay;
  style.position = originalPosition;
  style.visibility = originalVisibility;
  return retVal;
};
goog.style.getSizeWithDisplay_ = function $goog$style$getSizeWithDisplay_$(element) {
  var offsetWidth = element.offsetWidth, offsetHeight = element.offsetHeight, webkitOffsetsZero = goog.userAgent.WEBKIT && !offsetWidth && !offsetHeight;
  if ((!goog.isDef(offsetWidth) || webkitOffsetsZero) && element.getBoundingClientRect) {
    var clientRect = goog.style.getBoundingClientRect_(element);
    return new goog.math.Size(clientRect.right - clientRect.left, clientRect.bottom - clientRect.top);
  }
  return new goog.math.Size(offsetWidth, offsetHeight);
};
goog.style.getTransformedSize = function $goog$style$getTransformedSize$(element) {
  if (!element.getBoundingClientRect) {
    return null;
  }
  var clientRect = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, element);
  return new goog.math.Size(clientRect.right - clientRect.left, clientRect.bottom - clientRect.top);
};
goog.style.getBounds = function $goog$style$getBounds$(element) {
  var o = goog.style.getPageOffset(element), s = goog.style.getSize(element);
  return new goog.math.Rect(o.x, o.y, s.width, s.height);
};
goog.style.toCamelCase = function $goog$style$toCamelCase$(selector) {
  return goog.string.toCamelCase(String(selector));
};
goog.style.toSelectorCase = function $goog$style$toSelectorCase$(selector) {
  return goog.string.toSelectorCase(selector);
};
goog.style.getOpacity = function $goog$style$getOpacity$(el) {
  var style = el.style, result = "";
  if ("opacity" in style) {
    result = style.opacity;
  } else {
    if ("MozOpacity" in style) {
      result = style.MozOpacity;
    } else {
      if ("filter" in style) {
        var match = style.filter.match(/alpha\(opacity=([\d.]+)\)/);
        match && (result = String(match[1] / 100));
      }
    }
  }
  return "" == result ? result : Number(result);
};
goog.style.setOpacity = function $goog$style$setOpacity$(el, alpha) {
  var style = el.style;
  "opacity" in style ? style.opacity = alpha : "MozOpacity" in style ? style.MozOpacity = alpha : "filter" in style && (style.filter = "" === alpha ? "" : "alpha(opacity=" + 100 * alpha + ")");
};
goog.style.setTransparentBackgroundImage = function $goog$style$setTransparentBackgroundImage$(el, src) {
  var style = el.style;
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + src + '", sizingMethod="crop")' : (style.backgroundImage = "url(" + src + ")", style.backgroundPosition = "top left", style.backgroundRepeat = "no-repeat");
};
goog.style.clearTransparentBackgroundImage = function $goog$style$clearTransparentBackgroundImage$(el) {
  var style = el.style;
  "filter" in style ? style.filter = "" : style.backgroundImage = "none";
};
goog.style.showElement = function $goog$style$showElement$(el, display) {
  goog.style.setElementShown(el, display);
};
goog.style.setElementShown = function $goog$style$setElementShown$(el, isShown) {
  el.style.display = isShown ? "" : "none";
};
goog.style.isElementShown = function $goog$style$isElementShown$(el) {
  return "none" != el.style.display;
};
goog.style.installStyles = function $goog$style$installStyles$(stylesString, opt_node) {
  var dh = goog.dom.getDomHelper(opt_node), styleSheet = null, doc = dh.getDocument();
  if (goog.userAgent.IE && doc.createStyleSheet) {
    styleSheet = doc.createStyleSheet(), goog.style.setStyles(styleSheet, stylesString);
  } else {
    var head = dh.getElementsByTagNameAndClass("head")[0];
    if (!head) {
      var body = dh.getElementsByTagNameAndClass("body")[0], head = dh.createDom("head");
      body.parentNode.insertBefore(head, body);
    }
    styleSheet = dh.createDom("style");
    goog.style.setStyles(styleSheet, stylesString);
    dh.appendChild(head, styleSheet);
  }
  return styleSheet;
};
goog.style.uninstallStyles = function $goog$style$uninstallStyles$(styleSheet) {
  var node = styleSheet.ownerNode || styleSheet.owningElement || styleSheet;
  goog.dom.removeNode(node);
};
goog.style.setStyles = function $goog$style$setStyles$(element, stylesString) {
  goog.userAgent.IE && goog.isDef(element.cssText) ? element.cssText = stylesString : element.innerHTML = stylesString;
};
goog.style.setPreWrap = function $goog$style$setPreWrap$(el) {
  var style = el.style;
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (style.whiteSpace = "pre", style.wordWrap = "break-word") : style.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap";
};
goog.style.setInlineBlock = function $goog$style$setInlineBlock$(el) {
  var style = el.style;
  style.position = "relative";
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (style.zoom = "1", style.display = "inline") : style.display = goog.userAgent.GECKO ? goog.userAgent.isVersionOrHigher("1.9a") ? "inline-block" : "-moz-inline-box" : "inline-block";
};
goog.style.isRightToLeft = function $goog$style$isRightToLeft$(el) {
  return "rtl" == goog.style.getStyle_(el, "direction");
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function $goog$style$isUnselectable$(el) {
  return goog.style.unselectableStyle_ ? "none" == el.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == el.getAttribute("unselectable") : !1;
};
goog.style.setUnselectable = function $goog$style$setUnselectable$(el, unselectable, opt_noRecurse) {
  var descendants = opt_noRecurse ? null : el.getElementsByTagName("*"), name = goog.style.unselectableStyle_;
  if (name) {
    var value = unselectable ? "none" : "";
    el.style[name] = value;
    if (descendants) {
      for (var i = 0, descendant;descendant = descendants[i];i++) {
        descendant.style[name] = value;
      }
    }
  } else {
    if (goog.userAgent.IE || goog.userAgent.OPERA) {
      if (value = unselectable ? "on" : "", el.setAttribute("unselectable", value), descendants) {
        for (i = 0;descendant = descendants[i];i++) {
          descendant.setAttribute("unselectable", value);
        }
      }
    }
  }
};
goog.style.getBorderBoxSize = function $goog$style$getBorderBoxSize$(element) {
  return new goog.math.Size(element.offsetWidth, element.offsetHeight);
};
goog.style.setBorderBoxSize = function $goog$style$setBorderBoxSize$(element, size) {
  var doc = goog.dom.getOwnerDocument(element), isCss1CompatMode = goog.dom.getDomHelper(doc).isCss1CompatMode();
  if (!goog.userAgent.IE || isCss1CompatMode && goog.userAgent.isVersionOrHigher("8")) {
    goog.style.setBoxSizingSize_(element, size, "border-box");
  } else {
    var style = element.style;
    if (isCss1CompatMode) {
      var paddingBox = goog.style.getPaddingBox(element), borderBox = goog.style.getBorderBox(element);
      style.pixelWidth = size.width - borderBox.left - paddingBox.left - paddingBox.right - borderBox.right;
      style.pixelHeight = size.height - borderBox.top - paddingBox.top - paddingBox.bottom - borderBox.bottom;
    } else {
      style.pixelWidth = size.width, style.pixelHeight = size.height;
    }
  }
};
goog.style.getContentBoxSize = function $goog$style$getContentBoxSize$(element) {
  var doc = goog.dom.getOwnerDocument(element), ieCurrentStyle = goog.userAgent.IE && element.currentStyle;
  if (ieCurrentStyle && goog.dom.getDomHelper(doc).isCss1CompatMode() && "auto" != ieCurrentStyle.width && "auto" != ieCurrentStyle.height && !ieCurrentStyle.boxSizing) {
    var width = goog.style.getIePixelValue_(element, ieCurrentStyle.width, "width", "pixelWidth"), height = goog.style.getIePixelValue_(element, ieCurrentStyle.height, "height", "pixelHeight");
    return new goog.math.Size(width, height);
  }
  var borderBoxSize = goog.style.getBorderBoxSize(element), paddingBox = goog.style.getPaddingBox(element), borderBox = goog.style.getBorderBox(element);
  return new goog.math.Size(borderBoxSize.width - borderBox.left - paddingBox.left - paddingBox.right - borderBox.right, borderBoxSize.height - borderBox.top - paddingBox.top - paddingBox.bottom - borderBox.bottom);
};
goog.style.setContentBoxSize = function $goog$style$setContentBoxSize$(element, size) {
  var doc = goog.dom.getOwnerDocument(element), isCss1CompatMode = goog.dom.getDomHelper(doc).isCss1CompatMode();
  if (!goog.userAgent.IE || isCss1CompatMode && goog.userAgent.isVersionOrHigher("8")) {
    goog.style.setBoxSizingSize_(element, size, "content-box");
  } else {
    var style = element.style;
    if (isCss1CompatMode) {
      style.pixelWidth = size.width, style.pixelHeight = size.height;
    } else {
      var paddingBox = goog.style.getPaddingBox(element), borderBox = goog.style.getBorderBox(element);
      style.pixelWidth = size.width + borderBox.left + paddingBox.left + paddingBox.right + borderBox.right;
      style.pixelHeight = size.height + borderBox.top + paddingBox.top + paddingBox.bottom + borderBox.bottom;
    }
  }
};
goog.style.setBoxSizingSize_ = function $goog$style$setBoxSizingSize_$(element, size, boxSizing) {
  var style = element.style;
  goog.userAgent.GECKO ? style.MozBoxSizing = boxSizing : goog.userAgent.WEBKIT ? style.WebkitBoxSizing = boxSizing : style.boxSizing = boxSizing;
  style.width = Math.max(size.width, 0) + "px";
  style.height = Math.max(size.height, 0) + "px";
};
goog.style.getIePixelValue_ = function $goog$style$getIePixelValue_$(element, value, name, pixelName) {
  if (/^\d+px?$/.test(value)) {
    return parseInt(value, 10);
  }
  var oldStyleValue = element.style[name], oldRuntimeValue = element.runtimeStyle[name];
  element.runtimeStyle[name] = element.currentStyle[name];
  element.style[name] = value;
  var pixelValue = element.style[pixelName];
  element.style[name] = oldStyleValue;
  element.runtimeStyle[name] = oldRuntimeValue;
  return pixelValue;
};
goog.style.getIePixelDistance_ = function $goog$style$getIePixelDistance_$(element, propName) {
  var value = goog.style.getCascadedStyle(element, propName);
  return value ? goog.style.getIePixelValue_(element, value, "left", "pixelLeft") : 0;
};
goog.style.getBox_ = function $goog$style$getBox_$(element, stylePrefix) {
  if (goog.userAgent.IE) {
    var left = goog.style.getIePixelDistance_(element, stylePrefix + "Left"), right = goog.style.getIePixelDistance_(element, stylePrefix + "Right"), top = goog.style.getIePixelDistance_(element, stylePrefix + "Top"), bottom = goog.style.getIePixelDistance_(element, stylePrefix + "Bottom");
    return new goog.math.Box(top, right, bottom, left);
  }
  left = goog.style.getComputedStyle(element, stylePrefix + "Left");
  right = goog.style.getComputedStyle(element, stylePrefix + "Right");
  top = goog.style.getComputedStyle(element, stylePrefix + "Top");
  bottom = goog.style.getComputedStyle(element, stylePrefix + "Bottom");
  return new goog.math.Box(parseFloat(top), parseFloat(right), parseFloat(bottom), parseFloat(left));
};
goog.style.getPaddingBox = function $goog$style$getPaddingBox$(element) {
  return goog.style.getBox_(element, "padding");
};
goog.style.getMarginBox = function $goog$style$getMarginBox$(element) {
  return goog.style.getBox_(element, "margin");
};
goog.style.ieBorderWidthKeywords_ = {thin:2, medium:4, thick:6};
goog.style.getIePixelBorder_ = function $goog$style$getIePixelBorder_$(element, prop) {
  if ("none" == goog.style.getCascadedStyle(element, prop + "Style")) {
    return 0;
  }
  var width = goog.style.getCascadedStyle(element, prop + "Width");
  return width in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[width] : goog.style.getIePixelValue_(element, width, "left", "pixelLeft");
};
goog.style.getBorderBox = function $goog$style$getBorderBox$(element) {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    var left = goog.style.getIePixelBorder_(element, "borderLeft"), right = goog.style.getIePixelBorder_(element, "borderRight"), top = goog.style.getIePixelBorder_(element, "borderTop"), bottom = goog.style.getIePixelBorder_(element, "borderBottom");
    return new goog.math.Box(top, right, bottom, left);
  }
  left = goog.style.getComputedStyle(element, "borderLeftWidth");
  right = goog.style.getComputedStyle(element, "borderRightWidth");
  top = goog.style.getComputedStyle(element, "borderTopWidth");
  bottom = goog.style.getComputedStyle(element, "borderBottomWidth");
  return new goog.math.Box(parseFloat(top), parseFloat(right), parseFloat(bottom), parseFloat(left));
};
goog.style.getFontFamily = function $goog$style$getFontFamily$(el) {
  var doc = goog.dom.getOwnerDocument(el), font = "";
  if (doc.body.createTextRange && goog.dom.contains(doc, el)) {
    var range = doc.body.createTextRange();
    range.moveToElementText(el);
    try {
      font = range.queryCommandValue("FontName");
    } catch (e) {
      font = "";
    }
  }
  font || (font = goog.style.getStyle_(el, "fontFamily"));
  var fontsArray = font.split(",");
  1 < fontsArray.length && (font = fontsArray[0]);
  return goog.string.stripQuotes(font, "\"'");
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function $goog$style$getLengthUnits$(value) {
  var units = value.match(goog.style.lengthUnitRegex_);
  return units && units[0] || null;
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {cm:1, "in":1, mm:1, pc:1, pt:1};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {em:1, ex:1};
goog.style.getFontSize = function $goog$style$getFontSize$(el) {
  var fontSize = goog.style.getStyle_(el, "fontSize"), sizeUnits = goog.style.getLengthUnits(fontSize);
  if (fontSize && "px" == sizeUnits) {
    return parseInt(fontSize, 10);
  }
  if (goog.userAgent.IE) {
    if (sizeUnits in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) {
      return goog.style.getIePixelValue_(el, fontSize, "left", "pixelLeft");
    }
    if (el.parentNode && el.parentNode.nodeType == goog.dom.NodeType.ELEMENT && sizeUnits in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
      var parentElement = el.parentNode, parentSize = goog.style.getStyle_(parentElement, "fontSize");
      return goog.style.getIePixelValue_(parentElement, fontSize == parentSize ? "1em" : fontSize, "left", "pixelLeft");
    }
  }
  var sizeElement = goog.dom.createDom("span", {style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});
  goog.dom.appendChild(el, sizeElement);
  fontSize = sizeElement.offsetHeight;
  goog.dom.removeNode(sizeElement);
  return fontSize;
};
goog.style.parseStyleAttribute = function $goog$style$parseStyleAttribute$(value) {
  var result = {};
  goog.array.forEach(value.split(/\s*;\s*/), function(pair) {
    var keyValue = pair.split(/\s*:\s*/);
    2 == keyValue.length && (result[goog.string.toCamelCase(keyValue[0].toLowerCase())] = keyValue[1]);
  });
  return result;
};
goog.style.toStyleAttribute = function $goog$style$toStyleAttribute$(obj) {
  var buffer = [];
  goog.object.forEach(obj, function(value, key) {
    buffer.push(goog.string.toSelectorCase(key), ":", value, ";");
  });
  return buffer.join("");
};
goog.style.setFloat = function $goog$style$setFloat$(el, value) {
  el.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = value;
};
goog.style.getFloat = function $goog$style$getFloat$(el) {
  return el.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || "";
};
goog.style.getScrollbarWidth = function $goog$style$getScrollbarWidth$(opt_className) {
  var outerDiv = goog.dom.createElement("div");
  opt_className && (outerDiv.className = opt_className);
  outerDiv.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
  var innerDiv = goog.dom.createElement("div");
  goog.style.setSize(innerDiv, "200px", "200px");
  outerDiv.appendChild(innerDiv);
  goog.dom.appendChild(goog.dom.getDocument().body, outerDiv);
  var width = outerDiv.offsetWidth - outerDiv.clientWidth;
  goog.dom.removeNode(outerDiv);
  return width;
};
goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation = function $goog$style$getCssTranslation$(element) {
  var transform = goog.style.getComputedTransform(element);
  if (!transform) {
    return new goog.math.Coordinate(0, 0);
  }
  var matches = transform.match(goog.style.MATRIX_TRANSLATION_REGEX_);
  return matches ? new goog.math.Coordinate(parseFloat(matches[1]), parseFloat(matches[2])) : new goog.math.Coordinate(0, 0);
};
goog.style.bidi = {};
goog.style.bidi.getScrollLeft = function $goog$style$bidi$getScrollLeft$(element) {
  var isRtl = goog.style.isRightToLeft(element);
  if (isRtl && goog.userAgent.GECKO) {
    return-element.scrollLeft;
  }
  if (isRtl && (!goog.userAgent.IE || !goog.userAgent.isVersionOrHigher("8"))) {
    var overflowX = goog.style.getComputedOverflowX(element);
    if ("visible" != overflowX) {
      return element.scrollWidth - element.clientWidth - element.scrollLeft;
    }
  }
  return element.scrollLeft;
};
goog.style.bidi.getOffsetStart = function $goog$style$bidi$getOffsetStart$(element) {
  var offsetLeftForReal = element.offsetLeft, bestParent = element.offsetParent;
  bestParent || "fixed" != goog.style.getComputedPosition(element) || (bestParent = goog.dom.getOwnerDocument(element).documentElement);
  if (!bestParent) {
    return offsetLeftForReal;
  }
  if (goog.userAgent.GECKO) {
    var borderWidths = goog.style.getBorderBox(bestParent), offsetLeftForReal = offsetLeftForReal + borderWidths.left
  } else {
    goog.userAgent.isDocumentModeOrHigher(8) && (borderWidths = goog.style.getBorderBox(bestParent), offsetLeftForReal -= borderWidths.left);
  }
  if (goog.style.isRightToLeft(bestParent)) {
    var elementRightOffset = offsetLeftForReal + element.offsetWidth;
    return bestParent.clientWidth - elementRightOffset;
  }
  return offsetLeftForReal;
};
goog.style.bidi.setScrollOffset = function $goog$style$bidi$setScrollOffset$(element, offsetStart) {
  offsetStart = Math.max(offsetStart, 0);
  goog.style.isRightToLeft(element) ? goog.userAgent.GECKO ? element.scrollLeft = -offsetStart : goog.userAgent.IE && goog.userAgent.isVersionOrHigher("8") ? element.scrollLeft = offsetStart : element.scrollLeft = element.scrollWidth - offsetStart - element.clientWidth : element.scrollLeft = offsetStart;
};
goog.style.bidi.setPosition = function $goog$style$bidi$setPosition$(elem, left, top, isRtl) {
  goog.isNull(top) || (elem.style.top = top + "px");
  isRtl ? (elem.style.right = left + "px", elem.style.left = "") : (elem.style.left = left + "px", elem.style.right = "");
};
goog.fx = {};
goog.fx.Dragger = function $goog$fx$Dragger$(target, opt_handle, opt_limits) {
  goog.events.EventTarget.call(this);
  this.target = target;
  this.handle = opt_handle || target;
  this.limits = opt_limits || new goog.math.Rect(NaN, NaN, NaN, NaN);
  this.document_ = goog.dom.getOwnerDocument(target);
  this.eventHandler_ = new goog.events.EventHandler(this);
  this.registerDisposable(this.eventHandler_);
  goog.events.listen(this.handle, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.startDrag, !1, this);
};
goog.inherits(goog.fx.Dragger, goog.events.EventTarget);
goog.fx.Dragger.HAS_SET_CAPTURE_ = goog.userAgent.IE || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.3");
goog.fx.Dragger.cloneNode = function $goog$fx$Dragger$cloneNode$(sourceEl) {
  for (var clonedEl = sourceEl.cloneNode(!0), origTexts = sourceEl.getElementsByTagName("textarea"), dragTexts = clonedEl.getElementsByTagName("textarea"), i = 0;i < origTexts.length;i++) {
    dragTexts[i].value = origTexts[i].value;
  }
  switch(sourceEl.tagName.toLowerCase()) {
    case "tr":
      return goog.dom.createDom("table", null, goog.dom.createDom("tbody", null, clonedEl));
    case "td":
    ;
    case "th":
      return goog.dom.createDom("table", null, goog.dom.createDom("tbody", null, goog.dom.createDom("tr", null, clonedEl)));
    case "textarea":
      clonedEl.value = sourceEl.value;
    default:
      return clonedEl;
  }
};
goog.fx.Dragger.EventType = {EARLY_CANCEL:"earlycancel", START:"start", BEFOREDRAG:"beforedrag", DRAG:"drag", END:"end"};
goog.fx.Dragger.prototype.clientX = 0;
goog.fx.Dragger.prototype.clientY = 0;
goog.fx.Dragger.prototype.screenX = 0;
goog.fx.Dragger.prototype.screenY = 0;
goog.fx.Dragger.prototype.startX = 0;
goog.fx.Dragger.prototype.startY = 0;
goog.fx.Dragger.prototype.deltaX = 0;
goog.fx.Dragger.prototype.deltaY = 0;
goog.fx.Dragger.prototype.enabled_ = !0;
goog.fx.Dragger.prototype.dragging_ = !1;
goog.fx.Dragger.prototype.hysteresisDistanceSquared_ = 0;
goog.fx.Dragger.prototype.ieDragStartCancellingOn_ = !1;
goog.fx.Dragger.prototype.useRightPositioningForRtl_ = !1;
goog.fx.Dragger.prototype.getHandler = function $goog$fx$Dragger$$getHandler$() {
  return this.eventHandler_;
};
goog.fx.Dragger.prototype.setLimits = function $goog$fx$Dragger$$setLimits$(limits) {
  this.limits = limits || new goog.math.Rect(NaN, NaN, NaN, NaN);
};
goog.fx.Dragger.prototype.setEnabled = function $goog$fx$Dragger$$setEnabled$(enabled) {
  this.enabled_ = enabled;
};
goog.fx.Dragger.prototype.disposeInternal = function $goog$fx$Dragger$$disposeInternal$() {
  goog.fx.Dragger.superClass_.disposeInternal.call(this);
  goog.events.unlisten(this.handle, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.startDrag, !1, this);
  this.cleanUpAfterDragging_();
  this.handle = this.target = null;
};
goog.fx.Dragger.prototype.isRightToLeft_ = function $goog$fx$Dragger$$isRightToLeft_$() {
  goog.isDef(this.rightToLeft_) || (this.rightToLeft_ = goog.style.isRightToLeft(this.target));
  return this.rightToLeft_;
};
goog.fx.Dragger.prototype.startDrag = function $goog$fx$Dragger$$startDrag$(e) {
  var isMouseDown = e.type == goog.events.EventType.MOUSEDOWN;
  if (!this.enabled_ || this.dragging_ || isMouseDown && !e.isMouseActionButton()) {
    this.dispatchEvent(goog.fx.Dragger.EventType.EARLY_CANCEL);
  } else {
    this.maybeReinitTouchEvent_(e);
    if (0 == this.hysteresisDistanceSquared_) {
      if (this.fireDragStart_(e)) {
        this.dragging_ = !0, e.preventDefault();
      } else {
        return;
      }
    } else {
      e.preventDefault();
    }
    this.setupDragHandlers();
    this.clientX = this.startX = e.clientX;
    this.clientY = this.startY = e.clientY;
    this.screenX = e.screenX;
    this.screenY = e.screenY;
    this.computeInitialPosition();
    this.pageScroll = goog.dom.getDomHelper(this.document_).getDocumentScroll();
    goog.now();
  }
};
goog.fx.Dragger.prototype.setupDragHandlers = function $goog$fx$Dragger$$setupDragHandlers$() {
  var doc = this.document_, docEl = doc.documentElement, useCapture = !goog.fx.Dragger.HAS_SET_CAPTURE_;
  this.eventHandler_.listen(doc, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], this.handleMove_, useCapture);
  this.eventHandler_.listen(doc, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP], this.endDrag, useCapture);
  goog.fx.Dragger.HAS_SET_CAPTURE_ ? (docEl.setCapture(!1), this.eventHandler_.listen(docEl, goog.events.EventType.LOSECAPTURE, this.endDrag)) : this.eventHandler_.listen(goog.dom.getWindow(doc), goog.events.EventType.BLUR, this.endDrag);
  goog.userAgent.IE && this.ieDragStartCancellingOn_ && this.eventHandler_.listen(doc, goog.events.EventType.DRAGSTART, goog.events.Event.preventDefault);
  this.scrollTarget_ && this.eventHandler_.listen(this.scrollTarget_, goog.events.EventType.SCROLL, this.onScroll_, useCapture);
};
goog.fx.Dragger.prototype.fireDragStart_ = function $goog$fx$Dragger$$fireDragStart_$(e) {
  return this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.START, this, e.clientX, e.clientY, e));
};
goog.fx.Dragger.prototype.cleanUpAfterDragging_ = function $goog$fx$Dragger$$cleanUpAfterDragging_$() {
  this.eventHandler_.removeAll();
  goog.fx.Dragger.HAS_SET_CAPTURE_ && this.document_.releaseCapture();
};
goog.fx.Dragger.prototype.endDrag = function $goog$fx$Dragger$$endDrag$(e, opt_dragCanceled) {
  this.cleanUpAfterDragging_();
  if (this.dragging_) {
    this.maybeReinitTouchEvent_(e);
    this.dragging_ = !1;
    var x = this.limitX(this.deltaX), y = this.limitY(this.deltaY), dragCanceled = opt_dragCanceled || e.type == goog.events.EventType.TOUCHCANCEL;
    this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.END, this, e.clientX, e.clientY, e, x, y, dragCanceled));
  } else {
    this.dispatchEvent(goog.fx.Dragger.EventType.EARLY_CANCEL);
  }
};
goog.fx.Dragger.prototype.maybeReinitTouchEvent_ = function $goog$fx$Dragger$$maybeReinitTouchEvent_$(e) {
  var type = e.type;
  type == goog.events.EventType.TOUCHSTART || type == goog.events.EventType.TOUCHMOVE ? e.init(e.getBrowserEvent().targetTouches[0], e.currentTarget) : type != goog.events.EventType.TOUCHEND && type != goog.events.EventType.TOUCHCANCEL || e.init(e.getBrowserEvent().changedTouches[0], e.currentTarget);
};
goog.fx.Dragger.prototype.handleMove_ = function $goog$fx$Dragger$$handleMove_$(e) {
  if (this.enabled_) {
    this.maybeReinitTouchEvent_(e);
    var sign = this.useRightPositioningForRtl_ && this.isRightToLeft_() ? -1 : 1, dx = sign * (e.clientX - this.clientX), dy = e.clientY - this.clientY;
    this.clientX = e.clientX;
    this.clientY = e.clientY;
    this.screenX = e.screenX;
    this.screenY = e.screenY;
    if (!this.dragging_) {
      var diffX = this.startX - this.clientX, diffY = this.startY - this.clientY, distance = diffX * diffX + diffY * diffY;
      if (distance > this.hysteresisDistanceSquared_) {
        if (this.fireDragStart_(e)) {
          this.dragging_ = !0;
        } else {
          this.isDisposed() || this.endDrag(e);
          return;
        }
      }
    }
    var pos = this.calculatePosition_(dx, dy), x = pos.x, y = pos.y;
    if (this.dragging_) {
      var rv = this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.BEFOREDRAG, this, e.clientX, e.clientY, e, x, y));
      rv && (this.doDrag(e, x, y, !1), e.preventDefault());
    }
  }
};
goog.fx.Dragger.prototype.calculatePosition_ = function $goog$fx$Dragger$$calculatePosition_$(dx, dy) {
  var pageScroll = goog.dom.getDomHelper(this.document_).getDocumentScroll();
  dx += pageScroll.x - this.pageScroll.x;
  dy += pageScroll.y - this.pageScroll.y;
  this.pageScroll = pageScroll;
  this.deltaX += dx;
  this.deltaY += dy;
  var x = this.limitX(this.deltaX), y = this.limitY(this.deltaY);
  return new goog.math.Coordinate(x, y);
};
goog.fx.Dragger.prototype.onScroll_ = function $goog$fx$Dragger$$onScroll_$(e) {
  var pos = this.calculatePosition_(0, 0);
  e.clientX = this.clientX;
  e.clientY = this.clientY;
  this.doDrag(e, pos.x, pos.y, !0);
};
goog.fx.Dragger.prototype.doDrag = function $goog$fx$Dragger$$doDrag$(e, x, y) {
  this.defaultAction(x, y);
  this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.DRAG, this, e.clientX, e.clientY, e, x, y));
};
goog.fx.Dragger.prototype.limitX = function $goog$fx$Dragger$$limitX$(x) {
  var rect = this.limits, left = isNaN(rect.left) ? null : rect.left, width = isNaN(rect.width) ? 0 : rect.width, maxX = null != left ? left + width : Infinity, minX = null != left ? left : -Infinity;
  return Math.min(maxX, Math.max(minX, x));
};
goog.fx.Dragger.prototype.limitY = function $goog$fx$Dragger$$limitY$(y) {
  var rect = this.limits, top = isNaN(rect.top) ? null : rect.top, height = isNaN(rect.height) ? 0 : rect.height, maxY = null != top ? top + height : Infinity, minY = null != top ? top : -Infinity;
  return Math.min(maxY, Math.max(minY, y));
};
goog.fx.Dragger.prototype.computeInitialPosition = function $goog$fx$Dragger$$computeInitialPosition$() {
  this.deltaX = this.useRightPositioningForRtl_ ? goog.style.bidi.getOffsetStart(this.target) : this.target.offsetLeft;
  this.deltaY = this.target.offsetTop;
};
goog.fx.Dragger.prototype.defaultAction = function $goog$fx$Dragger$$defaultAction$(x, y) {
  this.useRightPositioningForRtl_ && this.isRightToLeft_() ? this.target.style.right = x + "px" : this.target.style.left = x + "px";
  this.target.style.top = y + "px";
};
goog.fx.DragEvent = function $goog$fx$DragEvent$(type, dragobj, clientX, clientY, browserEvent, opt_actX, opt_actY) {
  goog.events.Event.call(this, type);
  this.clientX = clientX;
  this.clientY = clientY;
  this.left = goog.isDef(opt_actX) ? opt_actX : dragobj.deltaX;
  this.top = goog.isDef(opt_actY) ? opt_actY : dragobj.deltaY;
};
goog.inherits(goog.fx.DragEvent, goog.events.Event);
i18n.input.common.Dragger = function $i18n$input$common$Dragger$(target, opt_handle, opt_limits) {
  goog.fx.Dragger.call(this, target, opt_handle, opt_limits);
  if (opt_handle && this.document_ != goog.dom.getOwnerDocument(opt_handle)) {
    var win = goog.dom.getWindow(goog.dom.getOwnerDocument(opt_handle));
    goog.asserts.assert(goog.dom.getWindow(this.document_) == win.parent);
    this.frameElement_ = win.frameElement;
  }
};
goog.inherits(i18n.input.common.Dragger, goog.fx.Dragger);
i18n.input.common.Dragger.prototype.startDrag = function $i18n$input$common$Dragger$$startDrag$(e) {
  this.fixClientPositon_(e);
  i18n.input.common.Dragger.superClass_.startDrag.call(this, e);
};
i18n.input.common.Dragger.prototype.setupDragHandlers = function $i18n$input$common$Dragger$$setupDragHandlers$() {
  this.setupDragHandlersOnDocument_(this.document_);
  var doc = goog.dom.getOwnerDocument(this.handle);
  doc != this.document_ && this.setupDragHandlersOnDocument_(doc);
  this.scrollTarget_ && this.eventHandler_.listen(this.scrollTarget_, goog.events.EventType.SCROLL, this.onScroll_, !goog.fx.Dragger.HAS_SET_CAPTURE_);
};
i18n.input.common.Dragger.prototype.setupDragHandlersOnDocument_ = function $i18n$input$common$Dragger$$setupDragHandlersOnDocument_$(doc) {
  var docEl = doc.documentElement, useCapture = !goog.fx.Dragger.HAS_SET_CAPTURE_;
  this.eventHandler_.listen(doc, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], this.handleMoveOverride_, useCapture);
  this.eventHandler_.listen(doc, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP], this.endDrag, useCapture);
  goog.fx.Dragger.HAS_SET_CAPTURE_ ? (docEl.setCapture(!1), this.eventHandler_.listen(docEl, goog.events.EventType.LOSECAPTURE, this.endDrag)) : this.eventHandler_.listen(goog.dom.getWindow(doc), goog.events.EventType.BLUR, this.endDrag);
  goog.userAgent.IE && this.ieDragStartCancellingOn_ && this.eventHandler_.listen(doc, goog.events.EventType.DRAGSTART, goog.events.Event.preventDefault);
};
i18n.input.common.Dragger.prototype.handleMoveOverride_ = function $i18n$input$common$Dragger$$handleMoveOverride_$(e) {
  this.fixClientPositon_(e);
  this.handleMove_(e);
};
i18n.input.common.Dragger.prototype.fixClientPositon_ = function $i18n$input$common$Dragger$$fixClientPositon_$(e) {
  goog.dom.getOwnerDocument(e.target) != this.document_ && this.frameElement_ && (e.clientX += this.frameElement_.offsetLeft, e.clientY += this.frameElement_.offsetTop);
};
i18n.input.common.ConstrainedDragger = function $i18n$input$common$ConstrainedDragger$(target, opt_handle) {
  i18n.input.common.Dragger.call(this, target, opt_handle);
  this.viewportSizeMonitor_ = new goog.dom.ViewportSizeMonitor(goog.dom.getDomHelper(target).getWindow());
  var eventHandler = new goog.events.EventHandler(this);
  eventHandler.listen(this.viewportSizeMonitor_, goog.events.EventType.RESIZE, this.handleResize_);
  this.registerDisposable(eventHandler);
};
goog.inherits(i18n.input.common.ConstrainedDragger, i18n.input.common.Dragger);
i18n.input.common.ConstrainedDragger.DRAG_PADDING_ = 2;
i18n.input.common.ConstrainedDragger.prototype.handleResize_ = function $i18n$input$common$ConstrainedDragger$$handleResize_$() {
  "none" != this.target.style.display.toLowerCase() && this.repositionTarget();
};
i18n.input.common.ConstrainedDragger.prototype.getBoundary = function $i18n$input$common$ConstrainedDragger$$getBoundary$() {
  var padding = i18n.input.common.ConstrainedDragger.DRAG_PADDING_, size = goog.style.getSize(this.target), bound = this.viewportSizeMonitor_.getSize();
  bound.width -= padding + size.width;
  bound.height -= padding + size.height;
  return new goog.math.Box(padding, bound.width, bound.height, padding);
};
i18n.input.common.ConstrainedDragger.prototype.repositionTarget = function $i18n$input$common$ConstrainedDragger$$repositionTarget$(opt_pos) {
  var bound = this.getBoundary();
  this.setLimits(goog.math.Rect.createFromBox(bound));
  var pos = opt_pos || goog.style.getClientPosition(this.target);
  pos.x = Math.min(pos.x, bound.right);
  pos.y = Math.min(pos.y, bound.bottom);
  pos.x = Math.max(pos.x, bound.left);
  pos.y = Math.max(pos.y, bound.top);
  goog.style.setPosition(this.target, pos);
};
i18n.input.common.ConstrainedDragger.prototype.disposeInternal = function $i18n$input$common$ConstrainedDragger$$disposeInternal$() {
  goog.dispose(this.viewportSizeMonitor_);
  i18n.input.common.ConstrainedDragger.superClass_.disposeInternal.call(this);
};
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function $goog$uri$utils$buildFromEncodedParts$(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
  var out = "";
  opt_scheme && (out += opt_scheme + ":");
  opt_domain && (out += "//", opt_userInfo && (out += opt_userInfo + "@"), out += opt_domain, opt_port && (out += ":" + opt_port));
  opt_path && (out += opt_path);
  opt_queryData && (out += "?" + opt_queryData);
  opt_fragment && (out += "#" + opt_fragment);
  return out;
};
goog.uri.utils.splitRe_ = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function $goog$uri$utils$split$(uri) {
  goog.uri.utils.phishingProtection_();
  return uri.match(goog.uri.utils.splitRe_);
};
goog.uri.utils.needsPhishingProtection_ = goog.userAgent.WEBKIT;
goog.uri.utils.phishingProtection_ = function $goog$uri$utils$phishingProtection_$() {
  if (goog.uri.utils.needsPhishingProtection_) {
    goog.uri.utils.needsPhishingProtection_ = !1;
    var location = goog.global.location;
    if (location) {
      var href = location.href;
      if (href) {
        var domain = goog.uri.utils.getDomain(href);
        if (domain && domain != location.hostname) {
          throw goog.uri.utils.needsPhishingProtection_ = !0, Error();
        }
      }
    }
  }
};
goog.uri.utils.decodeIfPossible_ = function $goog$uri$utils$decodeIfPossible_$(uri) {
  return uri && decodeURIComponent(uri);
};
goog.uri.utils.getComponentByIndex_ = function $goog$uri$utils$getComponentByIndex_$(componentIndex, uri) {
  return goog.uri.utils.split(uri)[componentIndex] || null;
};
goog.uri.utils.getScheme = function $goog$uri$utils$getScheme$(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, uri);
};
goog.uri.utils.getEffectiveScheme = function $goog$uri$utils$getEffectiveScheme$(uri) {
  var scheme = goog.uri.utils.getScheme(uri);
  if (!scheme && self.location) {
    var protocol = self.location.protocol, scheme = protocol.substr(0, protocol.length - 1)
  }
  return scheme ? scheme.toLowerCase() : "";
};
goog.uri.utils.getUserInfoEncoded = function $goog$uri$utils$getUserInfoEncoded$(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, uri);
};
goog.uri.utils.getUserInfo = function $goog$uri$utils$getUserInfo$(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(uri));
};
goog.uri.utils.getDomainEncoded = function $goog$uri$utils$getDomainEncoded$(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, uri);
};
goog.uri.utils.getDomain = function $goog$uri$utils$getDomain$(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(uri));
};
goog.uri.utils.getPort = function $goog$uri$utils$getPort$(uri) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, uri)) || null;
};
goog.uri.utils.getPathEncoded = function $goog$uri$utils$getPathEncoded$(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, uri);
};
goog.uri.utils.getPath = function $goog$uri$utils$getPath$(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(uri));
};
goog.uri.utils.getQueryData = function $goog$uri$utils$getQueryData$(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, uri);
};
goog.uri.utils.getFragmentEncoded = function $goog$uri$utils$getFragmentEncoded$(uri) {
  var hashIndex = uri.indexOf("#");
  return 0 > hashIndex ? null : uri.substr(hashIndex + 1);
};
goog.uri.utils.setFragmentEncoded = function $goog$uri$utils$setFragmentEncoded$(uri, fragment) {
  return goog.uri.utils.removeFragment(uri) + (fragment ? "#" + fragment : "");
};
goog.uri.utils.getFragment = function $goog$uri$utils$getFragment$(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(uri));
};
goog.uri.utils.getHost = function $goog$uri$utils$getHost$(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(pieces[goog.uri.utils.ComponentIndex.SCHEME], pieces[goog.uri.utils.ComponentIndex.USER_INFO], pieces[goog.uri.utils.ComponentIndex.DOMAIN], pieces[goog.uri.utils.ComponentIndex.PORT]);
};
goog.uri.utils.getPathAndAfter = function $goog$uri$utils$getPathAndAfter$(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, pieces[goog.uri.utils.ComponentIndex.PATH], pieces[goog.uri.utils.ComponentIndex.QUERY_DATA], pieces[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.removeFragment = function $goog$uri$utils$removeFragment$(uri) {
  var hashIndex = uri.indexOf("#");
  return 0 > hashIndex ? uri : uri.substr(0, hashIndex);
};
goog.uri.utils.haveSameDomain = function $goog$uri$utils$haveSameDomain$(uri1, uri2) {
  var pieces1 = goog.uri.utils.split(uri1), pieces2 = goog.uri.utils.split(uri2);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.SCHEME] == pieces2[goog.uri.utils.ComponentIndex.SCHEME] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT];
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function $goog$uri$utils$assertNoFragmentsOrQueries_$(uri) {
  if (goog.DEBUG && (0 <= uri.indexOf("#") || 0 <= uri.indexOf("?"))) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + uri + "]");
  }
};
goog.uri.utils.appendQueryData_ = function $goog$uri$utils$appendQueryData_$(buffer) {
  if (buffer[1]) {
    var baseUri = buffer[0], hashIndex = baseUri.indexOf("#");
    0 <= hashIndex && (buffer.push(baseUri.substr(hashIndex)), buffer[0] = baseUri = baseUri.substr(0, hashIndex));
    var questionIndex = baseUri.indexOf("?");
    0 > questionIndex ? buffer[1] = "?" : questionIndex == baseUri.length - 1 && (buffer[1] = void 0);
  }
  return buffer.join("");
};
goog.uri.utils.appendKeyValuePairs_ = function $goog$uri$utils$appendKeyValuePairs_$(key, value, pairs) {
  if (goog.isArray(value)) {
    goog.asserts.assertArray(value);
    for (var j = 0;j < value.length;j++) {
      goog.uri.utils.appendKeyValuePairs_(key, String(value[j]), pairs);
    }
  } else {
    null != value && pairs.push("&", key, "" === value ? "" : "=", goog.string.urlEncode(value));
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function $goog$uri$utils$buildQueryDataBuffer_$(buffer, keysAndValues, opt_startIndex) {
  goog.asserts.assert(0 == Math.max(keysAndValues.length - (opt_startIndex || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
  for (var i = opt_startIndex || 0;i < keysAndValues.length;i += 2) {
    goog.uri.utils.appendKeyValuePairs_(keysAndValues[i], keysAndValues[i + 1], buffer);
  }
  return buffer;
};
goog.uri.utils.buildQueryData = function $goog$uri$utils$buildQueryData$(keysAndValues, opt_startIndex) {
  var buffer = goog.uri.utils.buildQueryDataBuffer_([], keysAndValues, opt_startIndex);
  buffer[0] = "";
  return buffer.join("");
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function $goog$uri$utils$buildQueryDataBufferFromMap_$(buffer, map) {
  for (var key in map) {
    goog.uri.utils.appendKeyValuePairs_(key, map[key], buffer);
  }
  return buffer;
};
goog.uri.utils.buildQueryDataFromMap = function $goog$uri$utils$buildQueryDataFromMap$(map) {
  var buffer = goog.uri.utils.buildQueryDataBufferFromMap_([], map);
  buffer[0] = "";
  return buffer.join("");
};
goog.uri.utils.appendParams = function $goog$uri$utils$appendParams$(uri, var_args) {
  return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([uri], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([uri], arguments, 1));
};
goog.uri.utils.appendParamsFromMap = function $goog$uri$utils$appendParamsFromMap$(uri, map) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([uri], map));
};
goog.uri.utils.appendParam = function $goog$uri$utils$appendParam$(uri, key, opt_value) {
  var paramArr = [uri, "&", key];
  goog.isDefAndNotNull(opt_value) && paramArr.push("=", goog.string.urlEncode(opt_value));
  return goog.uri.utils.appendQueryData_(paramArr);
};
goog.uri.utils.findParam_ = function $goog$uri$utils$findParam_$(uri, startIndex, keyEncoded, hashOrEndIndex) {
  for (var index = startIndex, keyLength = keyEncoded.length;0 <= (index = uri.indexOf(keyEncoded, index)) && index < hashOrEndIndex;) {
    var precedingChar = uri.charCodeAt(index - 1);
    if (precedingChar == goog.uri.utils.CharCode_.AMPERSAND || precedingChar == goog.uri.utils.CharCode_.QUESTION) {
      var followingChar = uri.charCodeAt(index + keyLength);
      if (!followingChar || followingChar == goog.uri.utils.CharCode_.EQUAL || followingChar == goog.uri.utils.CharCode_.AMPERSAND || followingChar == goog.uri.utils.CharCode_.HASH) {
        return index;
      }
    }
    index += keyLength + 1;
  }
  return-1;
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function $goog$uri$utils$hasParam$(uri, keyEncoded) {
  return 0 <= goog.uri.utils.findParam_(uri, 0, keyEncoded, uri.search(goog.uri.utils.hashOrEndRe_));
};
goog.uri.utils.getParamValue = function $goog$uri$utils$getParamValue$(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_), foundIndex = goog.uri.utils.findParam_(uri, 0, keyEncoded, hashOrEndIndex);
  if (0 > foundIndex) {
    return null;
  }
  var endPosition = uri.indexOf("&", foundIndex);
  if (0 > endPosition || endPosition > hashOrEndIndex) {
    endPosition = hashOrEndIndex;
  }
  foundIndex += keyEncoded.length + 1;
  return goog.string.urlDecode(uri.substr(foundIndex, endPosition - foundIndex));
};
goog.uri.utils.getParamValues = function $goog$uri$utils$getParamValues$(uri, keyEncoded) {
  for (var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_), position = 0, foundIndex, result = [];0 <= (foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex));) {
    position = uri.indexOf("&", foundIndex);
    if (0 > position || position > hashOrEndIndex) {
      position = hashOrEndIndex;
    }
    foundIndex += keyEncoded.length + 1;
    result.push(goog.string.urlDecode(uri.substr(foundIndex, position - foundIndex)));
  }
  return result;
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function $goog$uri$utils$removeParam$(uri, keyEncoded) {
  for (var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_), position = 0, foundIndex, buffer = [];0 <= (foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex));) {
    buffer.push(uri.substring(position, foundIndex)), position = Math.min(uri.indexOf("&", foundIndex) + 1 || hashOrEndIndex, hashOrEndIndex);
  }
  buffer.push(uri.substr(position));
  return buffer.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1");
};
goog.uri.utils.setParam = function $goog$uri$utils$setParam$(uri, keyEncoded, value) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(uri, keyEncoded), keyEncoded, value);
};
goog.uri.utils.appendPath = function $goog$uri$utils$appendPath$(baseUri, path) {
  goog.uri.utils.assertNoFragmentsOrQueries_(baseUri);
  goog.string.endsWith(baseUri, "/") && (baseUri = baseUri.substr(0, baseUri.length - 1));
  goog.string.startsWith(path, "/") && (path = path.substr(1));
  return goog.string.buildString(baseUri, "/", path);
};
goog.uri.utils.setPath = function $goog$uri$utils$setPath$(uri, path) {
  goog.string.startsWith(path, "/") || (path = "/" + path);
  var parts = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(parts[goog.uri.utils.ComponentIndex.SCHEME], parts[goog.uri.utils.ComponentIndex.USER_INFO], parts[goog.uri.utils.ComponentIndex.DOMAIN], parts[goog.uri.utils.ComponentIndex.PORT], path, parts[goog.uri.utils.ComponentIndex.QUERY_DATA], parts[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function $goog$uri$utils$makeUnique$(uri) {
  return goog.uri.utils.setParam(uri, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString());
};
goog.positioning = {};
goog.positioning.Corner = {TOP_LEFT:0, TOP_RIGHT:2, BOTTOM_LEFT:1, BOTTOM_RIGHT:3, TOP_START:4, TOP_END:6, BOTTOM_START:5, BOTTOM_END:7};
goog.positioning.CornerBit = {BOTTOM:1, RIGHT:2, FLIP_RTL:4};
goog.positioning.Overflow = {IGNORE:0, ADJUST_X:1, FAIL_X:2, ADJUST_Y:4, FAIL_Y:8, RESIZE_WIDTH:16, RESIZE_HEIGHT:32, ADJUST_X_EXCEPT_OFFSCREEN:65, ADJUST_Y_EXCEPT_OFFSCREEN:132};
goog.positioning.OverflowStatus = {NONE:0, ADJUSTED_X:1, ADJUSTED_Y:2, WIDTH_ADJUSTED:4, HEIGHT_ADJUSTED:8, FAILED_LEFT:16, FAILED_RIGHT:32, FAILED_TOP:64, FAILED_BOTTOM:128, FAILED_OUTSIDE_VIEWPORT:256};
goog.positioning.OverflowStatus.FAILED = goog.positioning.OverflowStatus.FAILED_LEFT | goog.positioning.OverflowStatus.FAILED_RIGHT | goog.positioning.OverflowStatus.FAILED_TOP | goog.positioning.OverflowStatus.FAILED_BOTTOM | goog.positioning.OverflowStatus.FAILED_OUTSIDE_VIEWPORT;
goog.positioning.OverflowStatus.FAILED_HORIZONTAL = goog.positioning.OverflowStatus.FAILED_LEFT | goog.positioning.OverflowStatus.FAILED_RIGHT;
goog.positioning.OverflowStatus.FAILED_VERTICAL = goog.positioning.OverflowStatus.FAILED_TOP | goog.positioning.OverflowStatus.FAILED_BOTTOM;
goog.positioning.positionAtAnchor = function $goog$positioning$positionAtAnchor$(anchorElement, anchorElementCorner, movableElement, movableElementCorner, opt_offset, opt_margin, opt_overflow, opt_preferredSize, opt_viewport) {
  goog.asserts.assert(movableElement);
  var movableParentTopLeft = goog.positioning.getOffsetParentPageOffset(movableElement), anchorRect = goog.positioning.getVisiblePart_(anchorElement);
  goog.style.translateRectForAnotherFrame(anchorRect, goog.dom.getDomHelper(anchorElement), goog.dom.getDomHelper(movableElement));
  var corner = goog.positioning.getEffectiveCorner(anchorElement, anchorElementCorner), absolutePos = new goog.math.Coordinate(corner & goog.positioning.CornerBit.RIGHT ? anchorRect.left + anchorRect.width : anchorRect.left, corner & goog.positioning.CornerBit.BOTTOM ? anchorRect.top + anchorRect.height : anchorRect.top), absolutePos = goog.math.Coordinate.difference(absolutePos, movableParentTopLeft);
  opt_offset && (absolutePos.x += (corner & goog.positioning.CornerBit.RIGHT ? -1 : 1) * opt_offset.x, absolutePos.y += (corner & goog.positioning.CornerBit.BOTTOM ? -1 : 1) * opt_offset.y);
  var viewport;
  if (opt_overflow) {
    if (opt_viewport) {
      viewport = opt_viewport;
    } else {
      if (viewport = goog.style.getVisibleRectForElement(movableElement)) {
        viewport.top -= movableParentTopLeft.y, viewport.right -= movableParentTopLeft.x, viewport.bottom -= movableParentTopLeft.y, viewport.left -= movableParentTopLeft.x;
      }
    }
  }
  return goog.positioning.positionAtCoordinate(absolutePos, movableElement, movableElementCorner, opt_margin, viewport, opt_overflow, opt_preferredSize);
};
goog.positioning.getOffsetParentPageOffset = function $goog$positioning$getOffsetParentPageOffset$(movableElement) {
  var movableParentTopLeft, parent = movableElement.offsetParent;
  if (parent) {
    var isBody = parent.tagName == goog.dom.TagName.HTML || parent.tagName == goog.dom.TagName.BODY;
    isBody && "static" == goog.style.getComputedPosition(parent) || (movableParentTopLeft = goog.style.getPageOffset(parent), isBody || (movableParentTopLeft = goog.math.Coordinate.difference(movableParentTopLeft, new goog.math.Coordinate(goog.style.bidi.getScrollLeft(parent), parent.scrollTop))));
  }
  return movableParentTopLeft || new goog.math.Coordinate;
};
goog.positioning.getVisiblePart_ = function $goog$positioning$getVisiblePart_$(el) {
  var rect = goog.style.getBounds(el), visibleBox = goog.style.getVisibleRectForElement(el);
  visibleBox && rect.intersection(goog.math.Rect.createFromBox(visibleBox));
  return rect;
};
goog.positioning.positionAtCoordinate = function $goog$positioning$positionAtCoordinate$(absolutePos, movableElement, movableElementCorner, opt_margin, opt_viewport, opt_overflow, opt_preferredSize) {
  absolutePos = absolutePos.clone();
  var status = goog.positioning.OverflowStatus.NONE, corner = goog.positioning.getEffectiveCorner(movableElement, movableElementCorner), elementSize = goog.style.getSize(movableElement), size = opt_preferredSize ? opt_preferredSize.clone() : elementSize.clone();
  if (opt_margin || corner != goog.positioning.Corner.TOP_LEFT) {
    corner & goog.positioning.CornerBit.RIGHT ? absolutePos.x -= size.width + (opt_margin ? opt_margin.right : 0) : opt_margin && (absolutePos.x += opt_margin.left), corner & goog.positioning.CornerBit.BOTTOM ? absolutePos.y -= size.height + (opt_margin ? opt_margin.bottom : 0) : opt_margin && (absolutePos.y += opt_margin.top);
  }
  if (opt_overflow && (status = opt_viewport ? goog.positioning.adjustForViewport_(absolutePos, size, opt_viewport, opt_overflow) : goog.positioning.OverflowStatus.FAILED_OUTSIDE_VIEWPORT, status & goog.positioning.OverflowStatus.FAILED)) {
    return status;
  }
  goog.style.setPosition(movableElement, absolutePos);
  goog.math.Size.equals(elementSize, size) || goog.style.setBorderBoxSize(movableElement, size);
  return status;
};
goog.positioning.adjustForViewport_ = function $goog$positioning$adjustForViewport_$(pos, size, viewport, overflow) {
  var status = goog.positioning.OverflowStatus.NONE, ADJUST_X_EXCEPT_OFFSCREEN = goog.positioning.Overflow.ADJUST_X_EXCEPT_OFFSCREEN, ADJUST_Y_EXCEPT_OFFSCREEN = goog.positioning.Overflow.ADJUST_Y_EXCEPT_OFFSCREEN;
  (overflow & ADJUST_X_EXCEPT_OFFSCREEN) == ADJUST_X_EXCEPT_OFFSCREEN && (pos.x < viewport.left || pos.x >= viewport.right) && (overflow &= ~goog.positioning.Overflow.ADJUST_X);
  (overflow & ADJUST_Y_EXCEPT_OFFSCREEN) == ADJUST_Y_EXCEPT_OFFSCREEN && (pos.y < viewport.top || pos.y >= viewport.bottom) && (overflow &= ~goog.positioning.Overflow.ADJUST_Y);
  pos.x < viewport.left && overflow & goog.positioning.Overflow.ADJUST_X && (pos.x = viewport.left, status |= goog.positioning.OverflowStatus.ADJUSTED_X);
  pos.x < viewport.left && pos.x + size.width > viewport.right && overflow & goog.positioning.Overflow.RESIZE_WIDTH && (size.width = Math.max(size.width - (pos.x + size.width - viewport.right), 0), status |= goog.positioning.OverflowStatus.WIDTH_ADJUSTED);
  pos.x + size.width > viewport.right && overflow & goog.positioning.Overflow.ADJUST_X && (pos.x = Math.max(viewport.right - size.width, viewport.left), status |= goog.positioning.OverflowStatus.ADJUSTED_X);
  overflow & goog.positioning.Overflow.FAIL_X && (status = status | (pos.x < viewport.left ? goog.positioning.OverflowStatus.FAILED_LEFT : 0) | (pos.x + size.width > viewport.right ? goog.positioning.OverflowStatus.FAILED_RIGHT : 0));
  pos.y < viewport.top && overflow & goog.positioning.Overflow.ADJUST_Y && (pos.y = viewport.top, status |= goog.positioning.OverflowStatus.ADJUSTED_Y);
  pos.y <= viewport.top && pos.y + size.height < viewport.bottom && overflow & goog.positioning.Overflow.RESIZE_HEIGHT && (size.height = Math.max(size.height - (viewport.top - pos.y), 0), pos.y = viewport.top, status |= goog.positioning.OverflowStatus.HEIGHT_ADJUSTED);
  pos.y >= viewport.top && pos.y + size.height > viewport.bottom && overflow & goog.positioning.Overflow.RESIZE_HEIGHT && (size.height = Math.max(size.height - (pos.y + size.height - viewport.bottom), 0), status |= goog.positioning.OverflowStatus.HEIGHT_ADJUSTED);
  pos.y + size.height > viewport.bottom && overflow & goog.positioning.Overflow.ADJUST_Y && (pos.y = Math.max(viewport.bottom - size.height, viewport.top), status |= goog.positioning.OverflowStatus.ADJUSTED_Y);
  overflow & goog.positioning.Overflow.FAIL_Y && (status = status | (pos.y < viewport.top ? goog.positioning.OverflowStatus.FAILED_TOP : 0) | (pos.y + size.height > viewport.bottom ? goog.positioning.OverflowStatus.FAILED_BOTTOM : 0));
  return status;
};
goog.positioning.getEffectiveCorner = function $goog$positioning$getEffectiveCorner$(element, corner) {
  return(corner & goog.positioning.CornerBit.FLIP_RTL && goog.style.isRightToLeft(element) ? corner ^ goog.positioning.CornerBit.RIGHT : corner) & ~goog.positioning.CornerBit.FLIP_RTL;
};
goog.positioning.flipCornerHorizontal = function $goog$positioning$flipCornerHorizontal$(corner) {
  return corner ^ goog.positioning.CornerBit.RIGHT;
};
goog.positioning.flipCornerVertical = function $goog$positioning$flipCornerVertical$(corner) {
  return corner ^ goog.positioning.CornerBit.BOTTOM;
};
goog.positioning.flipCorner = function $goog$positioning$flipCorner$(corner) {
  return corner ^ goog.positioning.CornerBit.BOTTOM ^ goog.positioning.CornerBit.RIGHT;
};
i18n.input.common.GlobalSettings = {};
i18n.input.common.GlobalSettings.ApplicationName = "jsapi";
i18n.input.common.GlobalSettings.KeyboardHelpUrl = "";
i18n.input.common.GlobalSettings.KeyboardShowMinMax = !1;
i18n.input.common.GlobalSettings.ShowStatusBar = !0;
i18n.input.common.GlobalSettings.showGoogleLogo = !1;
i18n.input.common.GlobalSettings.StatusBarToggleLanguageShortcut = "shift";
i18n.input.common.GlobalSettings.StatusBarToggleSbcShortcut = "shift+space";
i18n.input.common.GlobalSettings.StatusBarPunctuationShortcut = "ctrl+.";
i18n.input.common.GlobalSettings.KeyboardDefaultLocation = goog.positioning.Corner.BOTTOM_END;
i18n.input.common.GlobalSettings.HandwritingDefaultLocation = goog.positioning.Corner.BOTTOM_END;
i18n.input.common.GlobalSettings.isOfflineMode = !1;
i18n.input.common.GlobalSettings.canSendFakeEvents = !0;
i18n.input.common.GlobalSettings.canListenInCaptureForIE8 = !goog.userAgent.IE || goog.userAgent.isVersionOrHigher(9);
i18n.input.common.GlobalSettings.chromeExtension = {ACT_FLAG:"IS_INPUT_ACTIVE", ACTIVE_UI_IFRAME_ID:"GOOGLE_INPUT_ACTIVE_UI", APP_FLAG:"GOOGLE_INPUT_NON_CHEXT_FLAG", CHEXT_FLAG:"GOOGLE_INPUT_CHEXT_FLAG", INPUTTOOL:"input", INPUTTOOL_STAT:"input_stat", STATUS_BAR_IFRAME_ID:"GOOGLE_INPUT_STATUS_BAR"};
i18n.input.common.GlobalSettings.BUILD_SOURCE = "jsapi";
i18n.input.common.GlobalSettings.ENABLE_XHR = !1;
i18n.input.common.GlobalSettings.enableStatusBarMetrics = !1;
i18n.input.common.GlobalSettings.onScreenKeyboard = !0;
i18n.input.common.GlobalSettings.enableUserDict = !1;
i18n.input.common.GlobalSettings.MAX_INT = 2147483647;
i18n.input.common.GlobalSettings.enableUserPrefs = !0;
i18n.input.common.GlobalSettings.IFRAME_WRAPPER = !1;
i18n.input.common.GlobalSettings.css = "";
i18n.input.common.GlobalSettings.alternativeImageUrl = "";
i18n.input.common.dom = {};
i18n.input.common.dom.sameDomainIframes_ = {};
i18n.input.common.dom.isEditable = function $i18n$input$common$dom$isEditable$(element) {
  if (!element.tagName || element.readOnly) {
    return!1;
  }
  switch(element.tagName.toUpperCase()) {
    case "TEXTAREA":
      return!0;
    case "INPUT":
      return "TEXT" == element.type.toUpperCase() || "SEARCH" == element.type.toUpperCase();
    case "DIV":
      return element.isContentEditable;
    case "IFRAME":
      try {
        var ifdoc = i18n.input.common.dom.getSameDomainFrameDoc(element);
        return!!ifdoc && (ifdoc.designMode && "ON" == ifdoc.designMode.toUpperCase() || ifdoc.body && ifdoc.body.isContentEditable);
      } catch (e) {
      }
    ;
  }
  return!1;
};
i18n.input.common.dom.setClasses = function $i18n$input$common$dom$setClasses$(elem, classes) {
  if (elem) {
    for (var i = 0;i < classes.length;i++) {
      0 == i ? goog.dom.classes.set(elem, classes[0]) : goog.dom.classes.add(elem, classes[i]);
    }
  }
};
i18n.input.common.dom.getSameDomainFrameDoc = function $i18n$input$common$dom$getSameDomainFrameDoc$(element) {
  var uid = goog.getUid(document), frameUid = goog.getUid(element), states = i18n.input.common.dom.sameDomainIframes_[uid];
  states || (states = i18n.input.common.dom.sameDomainIframes_[uid] = {});
  try {
    var url = window.location.href || "";
    if (!(frameUid in states)) {
      if (element.src) {
        var pos = element.src.indexOf("//"), protocol = 0 > pos ? "N/A" : element.src.slice(0, pos);
        states[frameUid] = "" != protocol && "http:" != protocol && "https:" != protocol || goog.uri.utils.haveSameDomain(element.src, url);
      } else {
        states[frameUid] = !0;
      }
    }
    return states[frameUid] ? goog.dom.getFrameContentDocument(element) : null;
  } catch (e) {
    return states[frameUid] = !1, null;
  }
};
i18n.input.common.dom.getSameDomainDocuments = function $i18n$input$common$dom$getSameDomainDocuments$(opt_doc) {
  var doc = opt_doc || document, iframes = [], rets = [];
  goog.array.extend(iframes, doc.getElementsByTagName(goog.dom.TagName.IFRAME), doc.getElementsByTagName(goog.dom.TagName.FRAME));
  goog.array.forEach(iframes, function(frame) {
    var frameDoc = i18n.input.common.dom.getSameDomainFrameDoc(frame);
    frameDoc && rets.push(frameDoc);
  });
  return rets;
};
i18n.input.common.dom.createIframeWrapper = function $i18n$input$common$dom$createIframeWrapper$(opt_doc) {
  var doc = opt_doc || document, dom = goog.dom.getDomHelper(), frame = dom.createDom(goog.dom.TagName.IFRAME, {frameborder:"0", scrolling:"no", style:"background-color:transparent;border:0;display:none;"});
  dom.append(doc.body, frame);
  var frameDoc = dom.getFrameContentDocument(frame), css = i18n.input.common.GlobalSettings.alternativeImageUrl ? i18n.input.common.GlobalSettings.css.replace(/\/\/ssl.gstatic.com\/inputtools\/images/g, i18n.input.common.GlobalSettings.alternativeImageUrl) : i18n.input.common.GlobalSettings.css;
  goog.style.installStyles("html body{border:0;margin:0;padding:0} html,body{overflow:hidden}" + css, frameDoc.body);
  return frame;
};
i18n.input.common.dom.iframeWrapperProperty_ = ["box-shadow", "z-index", "margin", "position", "display"];
i18n.input.common.dom.copyNecessaryStyle = function $i18n$input$common$dom$copyNecessaryStyle$(element, iframe) {
  goog.style.setContentBoxSize(iframe, goog.style.getSize(element));
  goog.array.forEach(i18n.input.common.dom.iframeWrapperProperty_, function(property) {
    goog.style.setStyle(iframe, property, goog.style.getComputedStyle(element, property));
  });
};
goog.events.KeyCodes = {WIN_KEY_FF_LINUX:0, MAC_ENTER:3, BACKSPACE:8, TAB:9, NUM_CENTER:12, ENTER:13, SHIFT:16, CTRL:17, ALT:18, PAUSE:19, CAPS_LOCK:20, ESC:27, SPACE:32, PAGE_UP:33, PAGE_DOWN:34, END:35, HOME:36, LEFT:37, UP:38, RIGHT:39, DOWN:40, PRINT_SCREEN:44, INSERT:45, DELETE:46, ZERO:48, ONE:49, TWO:50, THREE:51, FOUR:52, FIVE:53, SIX:54, SEVEN:55, EIGHT:56, NINE:57, FF_SEMICOLON:59, FF_EQUALS:61, FF_DASH:173, QUESTION_MARK:63, A:65, B:66, C:67, D:68, E:69, F:70, G:71, H:72, I:73, J:74, K:75, 
L:76, M:77, N:78, O:79, P:80, Q:81, R:82, S:83, T:84, U:85, V:86, W:87, X:88, Y:89, Z:90, META:91, WIN_KEY_RIGHT:92, CONTEXT_MENU:93, NUM_ZERO:96, NUM_ONE:97, NUM_TWO:98, NUM_THREE:99, NUM_FOUR:100, NUM_FIVE:101, NUM_SIX:102, NUM_SEVEN:103, NUM_EIGHT:104, NUM_NINE:105, NUM_MULTIPLY:106, NUM_PLUS:107, NUM_MINUS:109, NUM_PERIOD:110, NUM_DIVISION:111, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, NUMLOCK:144, SCROLL_LOCK:145, FIRST_MEDIA_KEY:166, 
LAST_MEDIA_KEY:183, SEMICOLON:186, DASH:189, EQUALS:187, COMMA:188, PERIOD:190, SLASH:191, APOSTROPHE:192, TILDE:192, SINGLE_QUOTE:222, OPEN_SQUARE_BRACKET:219, BACKSLASH:220, CLOSE_SQUARE_BRACKET:221, WIN_KEY:224, MAC_FF_META:224, MAC_WK_CMD_LEFT:91, MAC_WK_CMD_RIGHT:93, WIN_IME:229, PHANTOM:255};
goog.events.KeyCodes.isTextModifyingKeyEvent = function $goog$events$KeyCodes$isTextModifyingKeyEvent$(e) {
  if (e.altKey && !e.ctrlKey || e.metaKey || e.keyCode >= goog.events.KeyCodes.F1 && e.keyCode <= goog.events.KeyCodes.F12) {
    return!1;
  }
  switch(e.keyCode) {
    case goog.events.KeyCodes.ALT:
    ;
    case goog.events.KeyCodes.CAPS_LOCK:
    ;
    case goog.events.KeyCodes.CONTEXT_MENU:
    ;
    case goog.events.KeyCodes.CTRL:
    ;
    case goog.events.KeyCodes.DOWN:
    ;
    case goog.events.KeyCodes.END:
    ;
    case goog.events.KeyCodes.ESC:
    ;
    case goog.events.KeyCodes.HOME:
    ;
    case goog.events.KeyCodes.INSERT:
    ;
    case goog.events.KeyCodes.LEFT:
    ;
    case goog.events.KeyCodes.MAC_FF_META:
    ;
    case goog.events.KeyCodes.META:
    ;
    case goog.events.KeyCodes.NUMLOCK:
    ;
    case goog.events.KeyCodes.NUM_CENTER:
    ;
    case goog.events.KeyCodes.PAGE_DOWN:
    ;
    case goog.events.KeyCodes.PAGE_UP:
    ;
    case goog.events.KeyCodes.PAUSE:
    ;
    case goog.events.KeyCodes.PHANTOM:
    ;
    case goog.events.KeyCodes.PRINT_SCREEN:
    ;
    case goog.events.KeyCodes.RIGHT:
    ;
    case goog.events.KeyCodes.SCROLL_LOCK:
    ;
    case goog.events.KeyCodes.SHIFT:
    ;
    case goog.events.KeyCodes.UP:
    ;
    case goog.events.KeyCodes.WIN_KEY:
    ;
    case goog.events.KeyCodes.WIN_KEY_RIGHT:
      return!1;
    case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
      return!goog.userAgent.GECKO;
    default:
      return e.keyCode < goog.events.KeyCodes.FIRST_MEDIA_KEY || e.keyCode > goog.events.KeyCodes.LAST_MEDIA_KEY;
  }
};
goog.events.KeyCodes.firesKeyPressEvent = function $goog$events$KeyCodes$firesKeyPressEvent$(keyCode, opt_heldKeyCode, opt_shiftKey, opt_ctrlKey, opt_altKey) {
  if (!(goog.userAgent.IE || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("525"))) {
    return!0;
  }
  if (goog.userAgent.MAC && opt_altKey) {
    return goog.events.KeyCodes.isCharacterKey(keyCode);
  }
  if (opt_altKey && !opt_ctrlKey) {
    return!1;
  }
  goog.isNumber(opt_heldKeyCode) && (opt_heldKeyCode = goog.events.KeyCodes.normalizeKeyCode(opt_heldKeyCode));
  if (!opt_shiftKey && (opt_heldKeyCode == goog.events.KeyCodes.CTRL || opt_heldKeyCode == goog.events.KeyCodes.ALT || goog.userAgent.MAC && opt_heldKeyCode == goog.events.KeyCodes.META)) {
    return!1;
  }
  if (goog.userAgent.WEBKIT && opt_ctrlKey && opt_shiftKey) {
    switch(keyCode) {
      case goog.events.KeyCodes.BACKSLASH:
      ;
      case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
      ;
      case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
      ;
      case goog.events.KeyCodes.TILDE:
      ;
      case goog.events.KeyCodes.SEMICOLON:
      ;
      case goog.events.KeyCodes.DASH:
      ;
      case goog.events.KeyCodes.EQUALS:
      ;
      case goog.events.KeyCodes.COMMA:
      ;
      case goog.events.KeyCodes.PERIOD:
      ;
      case goog.events.KeyCodes.SLASH:
      ;
      case goog.events.KeyCodes.APOSTROPHE:
      ;
      case goog.events.KeyCodes.SINGLE_QUOTE:
        return!1;
    }
  }
  if (goog.userAgent.IE && opt_ctrlKey && opt_heldKeyCode == keyCode) {
    return!1;
  }
  switch(keyCode) {
    case goog.events.KeyCodes.ENTER:
      return!(goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9));
    case goog.events.KeyCodes.ESC:
      return!goog.userAgent.WEBKIT;
  }
  return goog.events.KeyCodes.isCharacterKey(keyCode);
};
goog.events.KeyCodes.isCharacterKey = function $goog$events$KeyCodes$isCharacterKey$(keyCode) {
  if (keyCode >= goog.events.KeyCodes.ZERO && keyCode <= goog.events.KeyCodes.NINE || keyCode >= goog.events.KeyCodes.NUM_ZERO && keyCode <= goog.events.KeyCodes.NUM_MULTIPLY || keyCode >= goog.events.KeyCodes.A && keyCode <= goog.events.KeyCodes.Z || goog.userAgent.WEBKIT && 0 == keyCode) {
    return!0;
  }
  switch(keyCode) {
    case goog.events.KeyCodes.SPACE:
    ;
    case goog.events.KeyCodes.QUESTION_MARK:
    ;
    case goog.events.KeyCodes.NUM_PLUS:
    ;
    case goog.events.KeyCodes.NUM_MINUS:
    ;
    case goog.events.KeyCodes.NUM_PERIOD:
    ;
    case goog.events.KeyCodes.NUM_DIVISION:
    ;
    case goog.events.KeyCodes.SEMICOLON:
    ;
    case goog.events.KeyCodes.FF_SEMICOLON:
    ;
    case goog.events.KeyCodes.DASH:
    ;
    case goog.events.KeyCodes.EQUALS:
    ;
    case goog.events.KeyCodes.FF_EQUALS:
    ;
    case goog.events.KeyCodes.COMMA:
    ;
    case goog.events.KeyCodes.PERIOD:
    ;
    case goog.events.KeyCodes.SLASH:
    ;
    case goog.events.KeyCodes.APOSTROPHE:
    ;
    case goog.events.KeyCodes.SINGLE_QUOTE:
    ;
    case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
    ;
    case goog.events.KeyCodes.BACKSLASH:
    ;
    case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
      return!0;
    default:
      return!1;
  }
};
goog.events.KeyCodes.normalizeKeyCode = function $goog$events$KeyCodes$normalizeKeyCode$(keyCode) {
  return goog.userAgent.GECKO ? goog.events.KeyCodes.normalizeGeckoKeyCode(keyCode) : goog.userAgent.MAC && goog.userAgent.WEBKIT ? goog.events.KeyCodes.normalizeMacWebKitKeyCode(keyCode) : keyCode;
};
goog.events.KeyCodes.normalizeGeckoKeyCode = function $goog$events$KeyCodes$normalizeGeckoKeyCode$(keyCode) {
  switch(keyCode) {
    case goog.events.KeyCodes.FF_EQUALS:
      return goog.events.KeyCodes.EQUALS;
    case goog.events.KeyCodes.FF_SEMICOLON:
      return goog.events.KeyCodes.SEMICOLON;
    case goog.events.KeyCodes.FF_DASH:
      return goog.events.KeyCodes.DASH;
    case goog.events.KeyCodes.MAC_FF_META:
      return goog.events.KeyCodes.META;
    case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
      return goog.events.KeyCodes.WIN_KEY;
    default:
      return keyCode;
  }
};
goog.events.KeyCodes.normalizeMacWebKitKeyCode = function $goog$events$KeyCodes$normalizeMacWebKitKeyCode$(keyCode) {
  switch(keyCode) {
    case goog.events.KeyCodes.MAC_WK_CMD_RIGHT:
      return goog.events.KeyCodes.META;
    default:
      return keyCode;
  }
};
goog.ui = {};
goog.ui.IdGenerator = function $goog$ui$IdGenerator$() {
};
goog.addSingletonGetter(goog.ui.IdGenerator);
goog.ui.IdGenerator.prototype.nextId_ = 0;
goog.ui.IdGenerator.prototype.getNextUniqueId = function $goog$ui$IdGenerator$$getNextUniqueId$() {
  return ":" + (this.nextId_++).toString(36);
};
goog.ui.Component = function $goog$ui$Component$(opt_domHelper) {
  goog.events.EventTarget.call(this);
  this.dom_ = opt_domHelper || goog.dom.getDomHelper();
  this.rightToLeft_ = goog.ui.Component.defaultRightToLeft_;
};
goog.inherits(goog.ui.Component, goog.events.EventTarget);
goog.ui.Component.ALLOW_DETACHED_DECORATION = !1;
goog.ui.Component.prototype.idGenerator_ = goog.ui.IdGenerator.getInstance();
goog.ui.Component.DEFAULT_BIDI_DIR = 0;
goog.ui.Component.defaultRightToLeft_ = 1 == goog.ui.Component.DEFAULT_BIDI_DIR ? !1 : -1 == goog.ui.Component.DEFAULT_BIDI_DIR ? !0 : null;
goog.ui.Component.EventType = {BEFORE_SHOW:"beforeshow", SHOW:"show", HIDE:"hide", DISABLE:"disable", ENABLE:"enable", HIGHLIGHT:"highlight", UNHIGHLIGHT:"unhighlight", ACTIVATE:"activate", DEACTIVATE:"deactivate", SELECT:"select", UNSELECT:"unselect", CHECK:"check", UNCHECK:"uncheck", FOCUS:"focus", BLUR:"blur", OPEN:"open", CLOSE:"close", ENTER:"enter", LEAVE:"leave", ACTION:"action", CHANGE:"change"};
goog.ui.Component.Error = {NOT_SUPPORTED:"Method not supported", DECORATE_INVALID:"Invalid element to decorate", ALREADY_RENDERED:"Component already rendered", PARENT_UNABLE_TO_BE_SET:"Unable to set parent component", CHILD_INDEX_OUT_OF_BOUNDS:"Child component index out of bounds", NOT_OUR_CHILD:"Child is not in parent component", NOT_IN_DOCUMENT:"Operation not supported while component is not in document", STATE_INVALID:"Invalid component state"};
goog.ui.Component.State = {ALL:255, DISABLED:1, HOVER:2, ACTIVE:4, SELECTED:8, CHECKED:16, FOCUSED:32, OPENED:64};
goog.ui.Component.getStateTransitionEvent = function $goog$ui$Component$getStateTransitionEvent$(state, isEntering) {
  switch(state) {
    case goog.ui.Component.State.DISABLED:
      return isEntering ? goog.ui.Component.EventType.DISABLE : goog.ui.Component.EventType.ENABLE;
    case goog.ui.Component.State.HOVER:
      return isEntering ? goog.ui.Component.EventType.HIGHLIGHT : goog.ui.Component.EventType.UNHIGHLIGHT;
    case goog.ui.Component.State.ACTIVE:
      return isEntering ? goog.ui.Component.EventType.ACTIVATE : goog.ui.Component.EventType.DEACTIVATE;
    case goog.ui.Component.State.SELECTED:
      return isEntering ? goog.ui.Component.EventType.SELECT : goog.ui.Component.EventType.UNSELECT;
    case goog.ui.Component.State.CHECKED:
      return isEntering ? goog.ui.Component.EventType.CHECK : goog.ui.Component.EventType.UNCHECK;
    case goog.ui.Component.State.FOCUSED:
      return isEntering ? goog.ui.Component.EventType.FOCUS : goog.ui.Component.EventType.BLUR;
    case goog.ui.Component.State.OPENED:
      return isEntering ? goog.ui.Component.EventType.OPEN : goog.ui.Component.EventType.CLOSE;
  }
  throw Error(goog.ui.Component.Error.STATE_INVALID);
};
goog.ui.Component.setDefaultRightToLeft = function $goog$ui$Component$setDefaultRightToLeft$(rightToLeft) {
  goog.ui.Component.defaultRightToLeft_ = rightToLeft;
};
goog.ui.Component.prototype.id_ = null;
goog.ui.Component.prototype.inDocument_ = !1;
goog.ui.Component.prototype.element_ = null;
goog.ui.Component.prototype.rightToLeft_ = null;
goog.ui.Component.prototype.model_ = null;
goog.ui.Component.prototype.parent_ = null;
goog.ui.Component.prototype.children_ = null;
goog.ui.Component.prototype.childIndex_ = null;
goog.ui.Component.prototype.wasDecorated_ = !1;
goog.ui.Component.prototype.getId = function $goog$ui$Component$$getId$() {
  return this.id_ || (this.id_ = this.idGenerator_.getNextUniqueId());
};
goog.ui.Component.prototype.setId = function $goog$ui$Component$$setId$(id) {
  this.parent_ && this.parent_.childIndex_ && (goog.object.remove(this.parent_.childIndex_, this.id_), goog.object.add(this.parent_.childIndex_, id, this));
  this.id_ = id;
};
goog.ui.Component.prototype.getElement = function $goog$ui$Component$$getElement$() {
  return this.element_;
};
goog.ui.Component.prototype.setElementInternal = function $goog$ui$Component$$setElementInternal$(element) {
  this.element_ = element;
};
goog.ui.Component.prototype.getElementsByClass = function $goog$ui$Component$$getElementsByClass$(className) {
  return this.element_ ? this.dom_.getElementsByClass(className, this.element_) : [];
};
goog.ui.Component.prototype.getElementByClass = function $goog$ui$Component$$getElementByClass$(className) {
  return this.element_ ? this.dom_.getElementByClass(className, this.element_) : null;
};
goog.ui.Component.prototype.getRequiredElementByClass = function $goog$ui$Component$$getRequiredElementByClass$(className) {
  var el = this.getElementByClass(className);
  goog.asserts.assert(el, "Expected element in component with class: %s", className);
  return el;
};
goog.ui.Component.prototype.getHandler = function $goog$ui$Component$$getHandler$() {
  this.googUiComponentHandler_ || (this.googUiComponentHandler_ = new goog.events.EventHandler(this));
  return this.googUiComponentHandler_;
};
goog.ui.Component.prototype.setParent = function $goog$ui$Component$$setParent$(parent) {
  if (this == parent) {
    throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
  }
  if (parent && this.parent_ && this.id_ && this.parent_.getChild(this.id_) && this.parent_ != parent) {
    throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
  }
  this.parent_ = parent;
  goog.ui.Component.superClass_.setParentEventTarget.call(this, parent);
};
goog.ui.Component.prototype.getParent = function $goog$ui$Component$$getParent$() {
  return this.parent_;
};
goog.ui.Component.prototype.setParentEventTarget = function $goog$ui$Component$$setParentEventTarget$(parent) {
  if (this.parent_ && this.parent_ != parent) {
    throw Error(goog.ui.Component.Error.NOT_SUPPORTED);
  }
  goog.ui.Component.superClass_.setParentEventTarget.call(this, parent);
};
goog.ui.Component.prototype.getDomHelper = function $goog$ui$Component$$getDomHelper$() {
  return this.dom_;
};
goog.ui.Component.prototype.isInDocument = function $goog$ui$Component$$isInDocument$() {
  return this.inDocument_;
};
goog.ui.Component.prototype.createDom = function $goog$ui$Component$$createDom$() {
  this.element_ = this.dom_.createElement("div");
};
goog.ui.Component.prototype.render = function $goog$ui$Component$$render$(opt_parentElement) {
  this.render_(opt_parentElement);
};
goog.ui.Component.prototype.render_ = function $goog$ui$Component$$render_$(opt_parentElement, opt_beforeNode) {
  if (this.inDocument_) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.element_ || this.createDom();
  opt_parentElement ? opt_parentElement.insertBefore(this.element_, opt_beforeNode || null) : this.dom_.getDocument().body.appendChild(this.element_);
  this.parent_ && !this.parent_.isInDocument() || this.enterDocument();
};
goog.ui.Component.prototype.decorate = function $goog$ui$Component$$decorate$(element) {
  if (this.inDocument_) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  if (element && this.canDecorate(element)) {
    this.wasDecorated_ = !0;
    var doc = goog.dom.getOwnerDocument(element);
    this.dom_ && this.dom_.getDocument() == doc || (this.dom_ = goog.dom.getDomHelper(element));
    this.decorateInternal(element);
    goog.ui.Component.ALLOW_DETACHED_DECORATION && !goog.dom.contains(doc, element) || this.enterDocument();
  } else {
    throw Error(goog.ui.Component.Error.DECORATE_INVALID);
  }
};
goog.ui.Component.prototype.canDecorate = function $goog$ui$Component$$canDecorate$() {
  return!0;
};
goog.ui.Component.prototype.decorateInternal = function $goog$ui$Component$$decorateInternal$(element) {
  this.element_ = element;
};
goog.ui.Component.prototype.enterDocument = function $goog$ui$Component$$enterDocument$() {
  this.inDocument_ = !0;
  this.forEachChild(function(child) {
    !child.isInDocument() && child.getElement() && child.enterDocument();
  });
};
goog.ui.Component.prototype.exitDocument = function $goog$ui$Component$$exitDocument$() {
  this.forEachChild(function(child) {
    child.isInDocument() && child.exitDocument();
  });
  this.googUiComponentHandler_ && this.googUiComponentHandler_.removeAll();
  this.inDocument_ = !1;
};
goog.ui.Component.prototype.disposeInternal = function $goog$ui$Component$$disposeInternal$() {
  this.inDocument_ && this.exitDocument();
  this.googUiComponentHandler_ && (this.googUiComponentHandler_.dispose(), delete this.googUiComponentHandler_);
  this.forEachChild(function(child) {
    child.dispose();
  });
  !this.wasDecorated_ && this.element_ && goog.dom.removeNode(this.element_);
  this.parent_ = this.model_ = this.element_ = this.childIndex_ = this.children_ = null;
  goog.ui.Component.superClass_.disposeInternal.call(this);
};
goog.ui.Component.prototype.addChild = function $goog$ui$Component$$addChild$(child, opt_render) {
  this.addChildAt(child, this.getChildCount(), opt_render);
};
goog.ui.Component.prototype.addChildAt = function $goog$ui$Component$$addChildAt$(child, index, opt_render) {
  goog.asserts.assert(!!child, "Provided element must not be null.");
  if (child.inDocument_ && (opt_render || !this.inDocument_)) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  if (0 > index || index > this.getChildCount()) {
    throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);
  }
  this.childIndex_ && this.children_ || (this.childIndex_ = {}, this.children_ = []);
  child.getParent() == this ? (goog.object.set(this.childIndex_, child.getId(), child), goog.array.remove(this.children_, child)) : goog.object.add(this.childIndex_, child.getId(), child);
  child.setParent(this);
  goog.array.insertAt(this.children_, child, index);
  if (child.inDocument_ && this.inDocument_ && child.getParent() == this) {
    var contentElement = this.getContentElement();
    contentElement.insertBefore(child.getElement(), contentElement.childNodes[index] || null);
  } else {
    if (opt_render) {
      this.element_ || this.createDom();
      var sibling = this.getChildAt(index + 1);
      child.render_(this.getContentElement(), sibling ? sibling.element_ : null);
    } else {
      this.inDocument_ && !child.inDocument_ && child.element_ && child.element_.parentNode && child.element_.parentNode.nodeType == goog.dom.NodeType.ELEMENT && child.enterDocument();
    }
  }
};
goog.ui.Component.prototype.getContentElement = function $goog$ui$Component$$getContentElement$() {
  return this.element_;
};
goog.ui.Component.prototype.isRightToLeft = function $goog$ui$Component$$isRightToLeft$() {
  null == this.rightToLeft_ && (this.rightToLeft_ = goog.style.isRightToLeft(this.inDocument_ ? this.element_ : this.dom_.getDocument().body));
  return this.rightToLeft_;
};
goog.ui.Component.prototype.setRightToLeft = function $goog$ui$Component$$setRightToLeft$(rightToLeft) {
  if (this.inDocument_) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.rightToLeft_ = rightToLeft;
};
goog.ui.Component.prototype.hasChildren = function $goog$ui$Component$$hasChildren$() {
  return!!this.children_ && 0 != this.children_.length;
};
goog.ui.Component.prototype.getChildCount = function $goog$ui$Component$$getChildCount$() {
  return this.children_ ? this.children_.length : 0;
};
goog.ui.Component.prototype.getChild = function $goog$ui$Component$$getChild$(id) {
  return this.childIndex_ && id ? goog.object.get(this.childIndex_, id) || null : null;
};
goog.ui.Component.prototype.getChildAt = function $goog$ui$Component$$getChildAt$(index) {
  return this.children_ ? this.children_[index] || null : null;
};
goog.ui.Component.prototype.forEachChild = function $goog$ui$Component$$forEachChild$(f, opt_obj) {
  this.children_ && goog.array.forEach(this.children_, f, opt_obj);
};
goog.ui.Component.prototype.indexOfChild = function $goog$ui$Component$$indexOfChild$(child) {
  return this.children_ && child ? goog.array.indexOf(this.children_, child) : -1;
};
goog.ui.Component.prototype.removeChild = function $goog$ui$Component$$removeChild$(child, opt_unrender) {
  if (child) {
    var id = goog.isString(child) ? child : child.getId();
    child = this.getChild(id);
    id && child && (goog.object.remove(this.childIndex_, id), goog.array.remove(this.children_, child), opt_unrender && (child.exitDocument(), child.element_ && goog.dom.removeNode(child.element_)), child.setParent(null));
  }
  if (!child) {
    throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);
  }
  return child;
};
goog.ui.Component.prototype.removeChildAt = function $goog$ui$Component$$removeChildAt$(index, opt_unrender) {
  return this.removeChild(this.getChildAt(index), opt_unrender);
};
goog.ui.Component.prototype.removeChildren = function $goog$ui$Component$$removeChildren$(opt_unrender) {
  for (var removedChildren = [];this.hasChildren();) {
    removedChildren.push(this.removeChildAt(0, opt_unrender));
  }
  return removedChildren;
};
goog.a11y = {};
goog.a11y.aria = {};
goog.a11y.aria.State = {ACTIVEDESCENDANT:"activedescendant", ATOMIC:"atomic", AUTOCOMPLETE:"autocomplete", BUSY:"busy", CHECKED:"checked", CONTROLS:"controls", DESCRIBEDBY:"describedby", DISABLED:"disabled", DROPEFFECT:"dropeffect", EXPANDED:"expanded", FLOWTO:"flowto", GRABBED:"grabbed", HASPOPUP:"haspopup", HIDDEN:"hidden", INVALID:"invalid", LABEL:"label", LABELLEDBY:"labelledby", LEVEL:"level", LIVE:"live", MULTILINE:"multiline", MULTISELECTABLE:"multiselectable", ORIENTATION:"orientation", OWNS:"owns", 
POSINSET:"posinset", PRESSED:"pressed", READONLY:"readonly", RELEVANT:"relevant", REQUIRED:"required", SELECTED:"selected", SETSIZE:"setsize", SORT:"sort", VALUEMAX:"valuemax", VALUEMIN:"valuemin", VALUENOW:"valuenow", VALUETEXT:"valuetext"};
goog.a11y.aria.AutoCompleteValues = {INLINE:"inline", LIST:"list", BOTH:"both", NONE:"none"};
goog.a11y.aria.DropEffectValues = {COPY:"copy", MOVE:"move", LINK:"link", EXECUTE:"execute", POPUP:"popup", NONE:"none"};
goog.a11y.aria.LivePriority = {OFF:"off", POLITE:"polite", ASSERTIVE:"assertive"};
goog.a11y.aria.OrientationValues = {VERTICAL:"vertical", HORIZONTAL:"horizontal"};
goog.a11y.aria.RelevantValues = {ADDITIONS:"additions", REMOVALS:"removals", TEXT:"text", ALL:"all"};
goog.a11y.aria.SortValues = {ASCENDING:"ascending", DESCENDING:"descending", NONE:"none", OTHER:"other"};
goog.a11y.aria.CheckedValues = {TRUE:"true", FALSE:"false", MIXED:"mixed", UNDEFINED:"undefined"};
goog.a11y.aria.ExpandedValues = {TRUE:"true", FALSE:"false", UNDEFINED:"undefined"};
goog.a11y.aria.GrabbedValues = {TRUE:"true", FALSE:"false", UNDEFINED:"undefined"};
goog.a11y.aria.InvalidValues = {FALSE:"false", TRUE:"true", GRAMMAR:"grammar", SPELLING:"spelling"};
goog.a11y.aria.PressedValues = {TRUE:"true", FALSE:"false", MIXED:"mixed", UNDEFINED:"undefined"};
goog.a11y.aria.SelectedValues = {TRUE:"true", FALSE:"false", UNDEFINED:"undefined"};
goog.a11y.aria.datatables = {};
goog.a11y.aria.datatables.getDefaultValuesMap = function $goog$a11y$aria$datatables$getDefaultValuesMap$() {
  goog.a11y.aria.DefaultStateValueMap_ || (goog.a11y.aria.DefaultStateValueMap_ = goog.object.create(goog.a11y.aria.State.ATOMIC, !1, goog.a11y.aria.State.AUTOCOMPLETE, "none", goog.a11y.aria.State.DROPEFFECT, "none", goog.a11y.aria.State.HASPOPUP, !1, goog.a11y.aria.State.LIVE, "off", goog.a11y.aria.State.MULTILINE, !1, goog.a11y.aria.State.MULTISELECTABLE, !1, goog.a11y.aria.State.ORIENTATION, "vertical", goog.a11y.aria.State.READONLY, !1, goog.a11y.aria.State.RELEVANT, "additions text", goog.a11y.aria.State.REQUIRED, 
  !1, goog.a11y.aria.State.SORT, "none", goog.a11y.aria.State.BUSY, !1, goog.a11y.aria.State.DISABLED, !1, goog.a11y.aria.State.HIDDEN, !1, goog.a11y.aria.State.INVALID, "false"));
  return goog.a11y.aria.DefaultStateValueMap_;
};
goog.a11y.aria.Role = {ALERT:"alert", ALERTDIALOG:"alertdialog", APPLICATION:"application", ARTICLE:"article", BANNER:"banner", BUTTON:"button", CHECKBOX:"checkbox", COLUMNHEADER:"columnheader", COMBOBOX:"combobox", COMPLEMENTARY:"complementary", CONTENTINFO:"contentinfo", DEFINITION:"definition", DIALOG:"dialog", DIRECTORY:"directory", DOCUMENT:"document", FORM:"form", GRID:"grid", GRIDCELL:"gridcell", GROUP:"group", HEADING:"heading", IMG:"img", LINK:"link", LIST:"list", LISTBOX:"listbox", LISTITEM:"listitem", 
LOG:"log", MAIN:"main", MARQUEE:"marquee", MATH:"math", MENU:"menu", MENUBAR:"menubar", MENU_ITEM:"menuitem", MENU_ITEM_CHECKBOX:"menuitemcheckbox", MENU_ITEM_RADIO:"menuitemradio", NAVIGATION:"navigation", NOTE:"note", OPTION:"option", PRESENTATION:"presentation", PROGRESSBAR:"progressbar", RADIO:"radio", RADIOGROUP:"radiogroup", REGION:"region", ROW:"row", ROWGROUP:"rowgroup", ROWHEADER:"rowheader", SCROLLBAR:"scrollbar", SEARCH:"search", SEPARATOR:"separator", SLIDER:"slider", SPINBUTTON:"spinbutton", 
STATUS:"status", TAB:"tab", TAB_LIST:"tablist", TAB_PANEL:"tabpanel", TEXTBOX:"textbox", TIMER:"timer", TOOLBAR:"toolbar", TOOLTIP:"tooltip", TREE:"tree", TREEGRID:"treegrid", TREEITEM:"treeitem"};
goog.a11y.aria.ARIA_PREFIX_ = "aria-";
goog.a11y.aria.ROLE_ATTRIBUTE_ = "role";
goog.a11y.aria.TAGS_WITH_ASSUMED_ROLES_ = [goog.dom.TagName.A, goog.dom.TagName.AREA, goog.dom.TagName.BUTTON, goog.dom.TagName.HEAD, goog.dom.TagName.INPUT, goog.dom.TagName.LINK, goog.dom.TagName.MENU, goog.dom.TagName.META, goog.dom.TagName.OPTGROUP, goog.dom.TagName.OPTION, goog.dom.TagName.PROGRESS, goog.dom.TagName.STYLE, goog.dom.TagName.SELECT, goog.dom.TagName.SOURCE, goog.dom.TagName.TEXTAREA, goog.dom.TagName.TITLE, goog.dom.TagName.TRACK];
goog.a11y.aria.setRole = function $goog$a11y$aria$setRole$(element, roleName) {
  roleName ? (goog.asserts.ENABLE_ASSERTS && goog.asserts.assert(goog.object.containsValue(goog.a11y.aria.Role, roleName), "No such ARIA role " + roleName), element.setAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_, roleName)) : goog.a11y.aria.removeRole(element);
};
goog.a11y.aria.getRole = function $goog$a11y$aria$getRole$(element) {
  var role = element.getAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_);
  return role || null;
};
goog.a11y.aria.removeRole = function $goog$a11y$aria$removeRole$(element) {
  element.removeAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_);
};
goog.a11y.aria.setState = function $goog$a11y$aria$setState$(element, stateName, value) {
  if (goog.isArrayLike(value)) {
    var array = value;
    value = array.join(" ");
  }
  var attrStateName = goog.a11y.aria.getAriaAttributeName_(stateName);
  if ("" === value || void 0 == value) {
    var defaultValueMap = goog.a11y.aria.datatables.getDefaultValuesMap();
    stateName in defaultValueMap ? element.setAttribute(attrStateName, defaultValueMap[stateName]) : element.removeAttribute(attrStateName);
  } else {
    element.setAttribute(attrStateName, value);
  }
};
goog.a11y.aria.removeState = function $goog$a11y$aria$removeState$(element, stateName) {
  element.removeAttribute(goog.a11y.aria.getAriaAttributeName_(stateName));
};
goog.a11y.aria.getState = function $goog$a11y$aria$getState$(element, stateName) {
  var attr = element.getAttribute(goog.a11y.aria.getAriaAttributeName_(stateName)), isNullOrUndefined = null == attr || void 0 == attr;
  return isNullOrUndefined ? "" : String(attr);
};
goog.a11y.aria.getActiveDescendant = function $goog$a11y$aria$getActiveDescendant$(element) {
  var id = goog.a11y.aria.getState(element, goog.a11y.aria.State.ACTIVEDESCENDANT);
  return goog.dom.getOwnerDocument(element).getElementById(id);
};
goog.a11y.aria.setActiveDescendant = function $goog$a11y$aria$setActiveDescendant$(element, activeElement) {
  var id = "";
  activeElement && (id = activeElement.id, goog.asserts.assert(id, "The active element should have an id."));
  goog.a11y.aria.setState(element, goog.a11y.aria.State.ACTIVEDESCENDANT, id);
};
goog.a11y.aria.getLabel = function $goog$a11y$aria$getLabel$(element) {
  return goog.a11y.aria.getState(element, goog.a11y.aria.State.LABEL);
};
goog.a11y.aria.setLabel = function $goog$a11y$aria$setLabel$(element, label) {
  goog.a11y.aria.setState(element, goog.a11y.aria.State.LABEL, label);
};
goog.a11y.aria.assertRoleIsSetInternalUtil = function $goog$a11y$aria$assertRoleIsSetInternalUtil$(element, allowedRoles) {
  if (!goog.array.contains(goog.a11y.aria.TAGS_WITH_ASSUMED_ROLES_, element.tagName)) {
    var elementRole = goog.a11y.aria.getRole(element);
    goog.asserts.assert(null != elementRole, "The element ARIA role cannot be null.");
    goog.asserts.assert(goog.array.contains(allowedRoles, elementRole), 'Non existing or incorrect role set for element.The role set is "' + elementRole + '". The role should be any of "' + allowedRoles + '". Check the ARIA specification for more details http://www.w3.org/TR/wai-aria/roles.');
  }
};
goog.a11y.aria.getStateBoolean = function $goog$a11y$aria$getStateBoolean$(element, stateName) {
  var attr = element.getAttribute(goog.a11y.aria.getAriaAttributeName_(stateName));
  goog.asserts.assert(goog.isBoolean(attr) || null == attr || "true" == attr || "false" == attr);
  return null == attr ? attr : goog.isBoolean(attr) ? attr : "true" == attr;
};
goog.a11y.aria.getStateNumber = function $goog$a11y$aria$getStateNumber$(element, stateName) {
  var attr = element.getAttribute(goog.a11y.aria.getAriaAttributeName_(stateName));
  goog.asserts.assert((null == attr || !isNaN(Number(attr))) && !goog.isBoolean(attr));
  return null == attr ? null : Number(attr);
};
goog.a11y.aria.getStateString = function $goog$a11y$aria$getStateString$(element, stateName) {
  var attr = element.getAttribute(goog.a11y.aria.getAriaAttributeName_(stateName));
  goog.asserts.assert((null == attr || goog.isString(attr)) && isNaN(Number(attr)) && "true" != attr && "false" != attr);
  return null == attr ? null : attr;
};
goog.a11y.aria.getStringArrayStateInternalUtil = function $goog$a11y$aria$getStringArrayStateInternalUtil$(element, stateName) {
  var attrValue = element.getAttribute(goog.a11y.aria.getAriaAttributeName_(stateName));
  return goog.a11y.aria.splitStringOnWhitespace_(attrValue);
};
goog.a11y.aria.splitStringOnWhitespace_ = function $goog$a11y$aria$splitStringOnWhitespace_$(stringValue) {
  return stringValue ? stringValue.split(/\s+/) : [];
};
goog.a11y.aria.getAriaAttributeName_ = function $goog$a11y$aria$getAriaAttributeName_$(ariaName) {
  goog.asserts.ENABLE_ASSERTS && (goog.asserts.assert(ariaName, "ARIA attribute cannot be empty."), goog.asserts.assert(goog.object.containsValue(goog.a11y.aria.State, ariaName), "No such ARIA attribute " + ariaName));
  return goog.a11y.aria.ARIA_PREFIX_ + ariaName;
};
goog.events.KeyHandler = function $goog$events$KeyHandler$(opt_element, opt_capture) {
  goog.events.EventTarget.call(this);
  opt_element && this.attach(opt_element, opt_capture);
};
goog.inherits(goog.events.KeyHandler, goog.events.EventTarget);
goog.events.KeyHandler.prototype.element_ = null;
goog.events.KeyHandler.prototype.keyPressKey_ = null;
goog.events.KeyHandler.prototype.keyDownKey_ = null;
goog.events.KeyHandler.prototype.keyUpKey_ = null;
goog.events.KeyHandler.prototype.lastKey_ = -1;
goog.events.KeyHandler.prototype.keyCode_ = -1;
goog.events.KeyHandler.prototype.altKey_ = !1;
goog.events.KeyHandler.EventType = {KEY:"key"};
goog.events.KeyHandler.safariKey_ = {3:goog.events.KeyCodes.ENTER, 12:goog.events.KeyCodes.NUMLOCK, 63232:goog.events.KeyCodes.UP, 63233:goog.events.KeyCodes.DOWN, 63234:goog.events.KeyCodes.LEFT, 63235:goog.events.KeyCodes.RIGHT, 63236:goog.events.KeyCodes.F1, 63237:goog.events.KeyCodes.F2, 63238:goog.events.KeyCodes.F3, 63239:goog.events.KeyCodes.F4, 63240:goog.events.KeyCodes.F5, 63241:goog.events.KeyCodes.F6, 63242:goog.events.KeyCodes.F7, 63243:goog.events.KeyCodes.F8, 63244:goog.events.KeyCodes.F9, 
63245:goog.events.KeyCodes.F10, 63246:goog.events.KeyCodes.F11, 63247:goog.events.KeyCodes.F12, 63248:goog.events.KeyCodes.PRINT_SCREEN, 63272:goog.events.KeyCodes.DELETE, 63273:goog.events.KeyCodes.HOME, 63275:goog.events.KeyCodes.END, 63276:goog.events.KeyCodes.PAGE_UP, 63277:goog.events.KeyCodes.PAGE_DOWN, 63289:goog.events.KeyCodes.NUMLOCK, 63302:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.keyIdentifier_ = {Up:goog.events.KeyCodes.UP, Down:goog.events.KeyCodes.DOWN, Left:goog.events.KeyCodes.LEFT, Right:goog.events.KeyCodes.RIGHT, Enter:goog.events.KeyCodes.ENTER, F1:goog.events.KeyCodes.F1, F2:goog.events.KeyCodes.F2, F3:goog.events.KeyCodes.F3, F4:goog.events.KeyCodes.F4, F5:goog.events.KeyCodes.F5, F6:goog.events.KeyCodes.F6, F7:goog.events.KeyCodes.F7, F8:goog.events.KeyCodes.F8, F9:goog.events.KeyCodes.F9, F10:goog.events.KeyCodes.F10, F11:goog.events.KeyCodes.F11, 
F12:goog.events.KeyCodes.F12, "U+007F":goog.events.KeyCodes.DELETE, Home:goog.events.KeyCodes.HOME, End:goog.events.KeyCodes.END, PageUp:goog.events.KeyCodes.PAGE_UP, PageDown:goog.events.KeyCodes.PAGE_DOWN, Insert:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.USES_KEYDOWN_ = goog.userAgent.IE || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("525");
goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ = goog.userAgent.MAC && goog.userAgent.GECKO;
goog.events.KeyHandler.prototype.handleKeyDown_ = function $goog$events$KeyHandler$$handleKeyDown_$(e) {
  goog.userAgent.WEBKIT && (this.lastKey_ == goog.events.KeyCodes.CTRL && !e.ctrlKey || this.lastKey_ == goog.events.KeyCodes.ALT && !e.altKey || goog.userAgent.MAC && this.lastKey_ == goog.events.KeyCodes.META && !e.metaKey) && (this.keyCode_ = this.lastKey_ = -1);
  -1 == this.lastKey_ && (e.ctrlKey && e.keyCode != goog.events.KeyCodes.CTRL ? this.lastKey_ = goog.events.KeyCodes.CTRL : e.altKey && e.keyCode != goog.events.KeyCodes.ALT ? this.lastKey_ = goog.events.KeyCodes.ALT : e.metaKey && e.keyCode != goog.events.KeyCodes.META && (this.lastKey_ = goog.events.KeyCodes.META));
  goog.events.KeyHandler.USES_KEYDOWN_ && !goog.events.KeyCodes.firesKeyPressEvent(e.keyCode, this.lastKey_, e.shiftKey, e.ctrlKey, e.altKey) ? this.handleEvent(e) : (this.keyCode_ = goog.events.KeyCodes.normalizeKeyCode(e.keyCode), goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (this.altKey_ = e.altKey));
};
goog.events.KeyHandler.prototype.resetState = function $goog$events$KeyHandler$$resetState$() {
  this.keyCode_ = this.lastKey_ = -1;
};
goog.events.KeyHandler.prototype.handleKeyup_ = function $goog$events$KeyHandler$$handleKeyup_$(e) {
  this.resetState();
  this.altKey_ = e.altKey;
};
goog.events.KeyHandler.prototype.handleEvent = function $goog$events$KeyHandler$$handleEvent$(e) {
  var be = e.getBrowserEvent(), keyCode, charCode, altKey = be.altKey;
  goog.userAgent.IE && e.type == goog.events.EventType.KEYPRESS ? (keyCode = this.keyCode_, charCode = keyCode != goog.events.KeyCodes.ENTER && keyCode != goog.events.KeyCodes.ESC ? be.keyCode : 0) : goog.userAgent.WEBKIT && e.type == goog.events.EventType.KEYPRESS ? (keyCode = this.keyCode_, charCode = 0 <= be.charCode && 63232 > be.charCode && goog.events.KeyCodes.isCharacterKey(keyCode) ? be.charCode : 0) : goog.userAgent.OPERA ? (keyCode = this.keyCode_, charCode = goog.events.KeyCodes.isCharacterKey(keyCode) ? 
  be.keyCode : 0) : (keyCode = be.keyCode || this.keyCode_, charCode = be.charCode || 0, goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (altKey = this.altKey_), goog.userAgent.MAC && charCode == goog.events.KeyCodes.QUESTION_MARK && keyCode == goog.events.KeyCodes.WIN_KEY && (keyCode = goog.events.KeyCodes.SLASH));
  var key = keyCode = goog.events.KeyCodes.normalizeKeyCode(keyCode), keyIdentifier = be.keyIdentifier;
  keyCode ? 63232 <= keyCode && keyCode in goog.events.KeyHandler.safariKey_ ? key = goog.events.KeyHandler.safariKey_[keyCode] : 25 == keyCode && e.shiftKey && (key = 9) : keyIdentifier && keyIdentifier in goog.events.KeyHandler.keyIdentifier_ && (key = goog.events.KeyHandler.keyIdentifier_[keyIdentifier]);
  var repeat = key == this.lastKey_;
  this.lastKey_ = key;
  var event = new goog.events.KeyEvent(key, charCode, repeat, be);
  event.altKey = altKey;
  this.dispatchEvent(event);
};
goog.events.KeyHandler.prototype.getElement = function $goog$events$KeyHandler$$getElement$() {
  return this.element_;
};
goog.events.KeyHandler.prototype.attach = function $goog$events$KeyHandler$$attach$(element, opt_capture) {
  this.keyUpKey_ && this.detach();
  this.element_ = element;
  this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this, opt_capture);
  this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, opt_capture, this);
  this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, opt_capture, this);
};
goog.events.KeyHandler.prototype.detach = function $goog$events$KeyHandler$$detach$() {
  this.keyPressKey_ && (goog.events.unlistenByKey(this.keyPressKey_), goog.events.unlistenByKey(this.keyDownKey_), goog.events.unlistenByKey(this.keyUpKey_), this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null);
  this.element_ = null;
  this.keyCode_ = this.lastKey_ = -1;
};
goog.events.KeyHandler.prototype.disposeInternal = function $goog$events$KeyHandler$$disposeInternal$() {
  goog.events.KeyHandler.superClass_.disposeInternal.call(this);
  this.detach();
};
goog.events.KeyEvent = function $goog$events$KeyEvent$(keyCode, charCode, repeat, browserEvent) {
  goog.events.BrowserEvent.call(this, browserEvent);
  this.type = goog.events.KeyHandler.EventType.KEY;
  this.keyCode = keyCode;
  this.charCode = charCode;
  this.repeat = repeat;
};
goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent);
goog.dom.classlist = {};
goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST = !1;
goog.dom.classlist.get = function $goog$dom$classlist$get$(element) {
  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {
    return element.classList;
  }
  var className = element.className;
  return goog.isString(className) && className.match(/\S+/g) || [];
};
goog.dom.classlist.set = function $goog$dom$classlist$set$(element, className) {
  element.className = className;
};
goog.dom.classlist.contains = function $goog$dom$classlist$contains$(element, className) {
  return goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList ? element.classList.contains(className) : goog.array.contains(goog.dom.classlist.get(element), className);
};
goog.dom.classlist.add = function $goog$dom$classlist$add$(element, className) {
  goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList ? element.classList.add(className) : goog.dom.classlist.contains(element, className) || (element.className += 0 < element.className.length ? " " + className : className);
};
goog.dom.classlist.addAll = function $goog$dom$classlist$addAll$(element, classesToAdd) {
  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {
    goog.array.forEach(classesToAdd, function(className) {
      goog.dom.classlist.add(element, className);
    });
  } else {
    var classMap = {};
    goog.array.forEach(goog.dom.classlist.get(element), function(className) {
      classMap[className] = !0;
    });
    goog.array.forEach(classesToAdd, function(className) {
      classMap[className] = !0;
    });
    element.className = "";
    for (var className$$0 in classMap) {
      element.className += 0 < element.className.length ? " " + className$$0 : className$$0;
    }
  }
};
goog.dom.classlist.remove = function $goog$dom$classlist$remove$(element, className) {
  goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList ? element.classList.remove(className) : goog.dom.classlist.contains(element, className) && (element.className = goog.array.filter(goog.dom.classlist.get(element), function(c) {
    return c != className;
  }).join(" "));
};
goog.dom.classlist.removeAll = function $goog$dom$classlist$removeAll$(element, classesToRemove) {
  goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList ? goog.array.forEach(classesToRemove, function(className) {
    goog.dom.classlist.remove(element, className);
  }) : element.className = goog.array.filter(goog.dom.classlist.get(element), function(className) {
    return!goog.array.contains(classesToRemove, className);
  }).join(" ");
};
goog.dom.classlist.enable = function $goog$dom$classlist$enable$(element, className, enabled) {
  enabled ? goog.dom.classlist.add(element, className) : goog.dom.classlist.remove(element, className);
};
goog.dom.classlist.enableAll = function $goog$dom$classlist$enableAll$(element, classesToEnable, enabled) {
  var f = enabled ? goog.dom.classlist.addAll : goog.dom.classlist.removeAll;
  f(element, classesToEnable);
};
goog.dom.classlist.swap = function $goog$dom$classlist$swap$(element, fromClass, toClass) {
  return goog.dom.classlist.contains(element, fromClass) ? (goog.dom.classlist.remove(element, fromClass), goog.dom.classlist.add(element, toClass), !0) : !1;
};
goog.dom.classlist.toggle = function $goog$dom$classlist$toggle$(element, className) {
  var add = !goog.dom.classlist.contains(element, className);
  goog.dom.classlist.enable(element, className, add);
  return add;
};
goog.dom.classlist.addRemove = function $goog$dom$classlist$addRemove$(element, classToRemove, classToAdd) {
  goog.dom.classlist.remove(element, classToRemove);
  goog.dom.classlist.add(element, classToAdd);
};
goog.ui.registry = {};
goog.ui.registry.getDefaultRenderer = function $goog$ui$registry$getDefaultRenderer$(componentCtor) {
  for (var key, rendererCtor;componentCtor;) {
    key = goog.getUid(componentCtor);
    if (rendererCtor = goog.ui.registry.defaultRenderers_[key]) {
      break;
    }
    componentCtor = componentCtor.superClass_ ? componentCtor.superClass_.constructor : null;
  }
  return rendererCtor ? goog.isFunction(rendererCtor.getInstance) ? rendererCtor.getInstance() : new rendererCtor : null;
};
goog.ui.registry.setDefaultRenderer = function $goog$ui$registry$setDefaultRenderer$(componentCtor, rendererCtor) {
  if (!goog.isFunction(componentCtor)) {
    throw Error("Invalid component class " + componentCtor);
  }
  if (!goog.isFunction(rendererCtor)) {
    throw Error("Invalid renderer class " + rendererCtor);
  }
  var key = goog.getUid(componentCtor);
  goog.ui.registry.defaultRenderers_[key] = rendererCtor;
};
goog.ui.registry.getDecoratorByClassName = function $goog$ui$registry$getDecoratorByClassName$(className) {
  return className in goog.ui.registry.decoratorFunctions_ ? goog.ui.registry.decoratorFunctions_[className]() : null;
};
goog.ui.registry.setDecoratorByClassName = function $goog$ui$registry$setDecoratorByClassName$(className, decoratorFn) {
  if (!className) {
    throw Error("Invalid class name " + className);
  }
  if (!goog.isFunction(decoratorFn)) {
    throw Error("Invalid decorator function " + decoratorFn);
  }
  goog.ui.registry.decoratorFunctions_[className] = decoratorFn;
};
goog.ui.registry.getDecorator = function $goog$ui$registry$getDecorator$(element) {
  var decorator;
  goog.asserts.assert(element);
  for (var classNames = goog.dom.classlist.get(element), i = 0, len = classNames.length;i < len;i++) {
    if (decorator = goog.ui.registry.getDecoratorByClassName(classNames[i])) {
      return decorator;
    }
  }
  return null;
};
goog.ui.registry.reset = function $goog$ui$registry$reset$() {
  goog.ui.registry.defaultRenderers_ = {};
  goog.ui.registry.decoratorFunctions_ = {};
};
goog.ui.registry.defaultRenderers_ = {};
goog.ui.registry.decoratorFunctions_ = {};
goog.ui.ContainerRenderer = function $goog$ui$ContainerRenderer$(opt_ariaRole) {
  this.ariaRole_ = opt_ariaRole;
};
goog.addSingletonGetter(goog.ui.ContainerRenderer);
goog.ui.ContainerRenderer.getCustomRenderer = function $goog$ui$ContainerRenderer$getCustomRenderer$(ctor, cssClassName) {
  var renderer = new ctor;
  renderer.getCssClass = function $renderer$getCssClass$() {
    return cssClassName;
  };
  return renderer;
};
goog.ui.ContainerRenderer.CSS_CLASS = "goog-container";
goog.ui.ContainerRenderer.prototype.getAriaRole = function $goog$ui$ContainerRenderer$$getAriaRole$() {
  return this.ariaRole_;
};
goog.ui.ContainerRenderer.prototype.enableTabIndex = function $goog$ui$ContainerRenderer$$enableTabIndex$(element, enable) {
  element && (element.tabIndex = enable ? 0 : -1);
};
goog.ui.ContainerRenderer.prototype.createDom = function $goog$ui$ContainerRenderer$$createDom$(container) {
  return container.getDomHelper().createDom("div", this.getClassNames(container).join(" "));
};
goog.ui.ContainerRenderer.prototype.getContentElement = function $goog$ui$ContainerRenderer$$getContentElement$(element) {
  return element;
};
goog.ui.ContainerRenderer.prototype.canDecorate = function $goog$ui$ContainerRenderer$$canDecorate$(element) {
  return "DIV" == element.tagName;
};
goog.ui.ContainerRenderer.prototype.decorate = function $goog$ui$ContainerRenderer$$decorate$(container, element) {
  element.id && container.setId(element.id);
  var baseClass = this.getCssClass(), hasBaseClass = !1, classNames = goog.dom.classlist.get(element);
  classNames && goog.array.forEach(classNames, function(className) {
    className == baseClass ? hasBaseClass = !0 : className && this.setStateFromClassName(container, className, baseClass);
  }, this);
  hasBaseClass || goog.dom.classlist.add(element, baseClass);
  this.decorateChildren(container, this.getContentElement(element));
  return element;
};
goog.ui.ContainerRenderer.prototype.setStateFromClassName = function $goog$ui$ContainerRenderer$$setStateFromClassName$(container, className, baseClass) {
  className == baseClass + "-disabled" ? container.setEnabled(!1) : className == baseClass + "-horizontal" ? container.setOrientation(goog.ui.Container.Orientation.HORIZONTAL) : className == baseClass + "-vertical" && container.setOrientation(goog.ui.Container.Orientation.VERTICAL);
};
goog.ui.ContainerRenderer.prototype.decorateChildren = function $goog$ui$ContainerRenderer$$decorateChildren$(container, element, opt_firstChild) {
  if (element) {
    for (var node = opt_firstChild || element.firstChild, next;node && node.parentNode == element;) {
      next = node.nextSibling;
      if (node.nodeType == goog.dom.NodeType.ELEMENT) {
        var child = this.getDecoratorForChild(node);
        child && (child.setElementInternal(node), container.isEnabled() || child.setEnabled(!1), container.addChild(child), child.decorate(node));
      } else {
        node.nodeValue && "" != goog.string.trim(node.nodeValue) || element.removeChild(node);
      }
      node = next;
    }
  }
};
goog.ui.ContainerRenderer.prototype.getDecoratorForChild = function $goog$ui$ContainerRenderer$$getDecoratorForChild$(element) {
  return goog.ui.registry.getDecorator(element);
};
goog.ui.ContainerRenderer.prototype.initializeDom = function $goog$ui$ContainerRenderer$$initializeDom$(container) {
  var elem = container.getElement();
  goog.asserts.assert(elem, "The container DOM element cannot be null.");
  goog.style.setUnselectable(elem, !0, goog.userAgent.GECKO);
  goog.userAgent.IE && (elem.hideFocus = !0);
  var ariaRole = this.getAriaRole();
  ariaRole && goog.a11y.aria.setRole(elem, ariaRole);
};
goog.ui.ContainerRenderer.prototype.getKeyEventTarget = function $goog$ui$ContainerRenderer$$getKeyEventTarget$(container) {
  return container.getElement();
};
goog.ui.ContainerRenderer.prototype.getCssClass = function $goog$ui$ContainerRenderer$$getCssClass$() {
  return goog.ui.ContainerRenderer.CSS_CLASS;
};
goog.ui.ContainerRenderer.prototype.getClassNames = function $goog$ui$ContainerRenderer$$getClassNames$(container) {
  var baseClass = this.getCssClass(), isHorizontal = container.getOrientation() == goog.ui.Container.Orientation.HORIZONTAL, classNames = [baseClass, isHorizontal ? baseClass + "-horizontal" : baseClass + "-vertical"];
  container.isEnabled() || classNames.push(baseClass + "-disabled");
  return classNames;
};
goog.ui.ContainerRenderer.prototype.getDefaultOrientation = function $goog$ui$ContainerRenderer$$getDefaultOrientation$() {
  return goog.ui.Container.Orientation.VERTICAL;
};
goog.ui.ControlRenderer = function $goog$ui$ControlRenderer$() {
};
goog.addSingletonGetter(goog.ui.ControlRenderer);
goog.ui.ControlRenderer.getCustomRenderer = function $goog$ui$ControlRenderer$getCustomRenderer$(ctor, cssClassName) {
  var renderer = new ctor;
  renderer.getCssClass = function $renderer$getCssClass$() {
    return cssClassName;
  };
  return renderer;
};
goog.ui.ControlRenderer.CSS_CLASS = "goog-control";
goog.ui.ControlRenderer.IE6_CLASS_COMBINATIONS = [];
goog.ui.ControlRenderer.TOGGLE_ARIA_STATE_MAP_ = goog.object.create(goog.a11y.aria.Role.BUTTON, goog.a11y.aria.State.PRESSED, goog.a11y.aria.Role.CHECKBOX, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.MENU_ITEM, goog.a11y.aria.State.SELECTED, goog.a11y.aria.Role.MENU_ITEM_CHECKBOX, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.MENU_ITEM_RADIO, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.RADIO, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.TAB, goog.a11y.aria.State.SELECTED, goog.a11y.aria.Role.TREEITEM, 
goog.a11y.aria.State.SELECTED);
goog.ui.ControlRenderer.prototype.getAriaRole = function $goog$ui$ControlRenderer$$getAriaRole$() {
};
goog.ui.ControlRenderer.prototype.createDom = function $goog$ui$ControlRenderer$$createDom$(control) {
  var element = control.getDomHelper().createDom("div", this.getClassNames(control).join(" "), control.getContent());
  this.setAriaStates(control, element);
  return element;
};
goog.ui.ControlRenderer.prototype.getContentElement = function $goog$ui$ControlRenderer$$getContentElement$(element) {
  return element;
};
goog.ui.ControlRenderer.prototype.enableClassName = function $goog$ui$ControlRenderer$$enableClassName$(control, className, enable) {
  var element = control.getElement ? control.getElement() : control;
  if (element) {
    var classNames = [className];
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("7") && (classNames = this.getAppliedCombinedClassNames_(goog.dom.classlist.get(element), className), classNames.push(className));
    goog.dom.classlist.enableAll(element, classNames, enable);
  }
};
goog.ui.ControlRenderer.prototype.enableExtraClassName = function $goog$ui$ControlRenderer$$enableExtraClassName$(control, className, enable) {
  this.enableClassName(control, className, enable);
};
goog.ui.ControlRenderer.prototype.canDecorate = function $goog$ui$ControlRenderer$$canDecorate$() {
  return!0;
};
goog.ui.ControlRenderer.prototype.decorate = function $goog$ui$ControlRenderer$$decorate$(control, element) {
  element.id && control.setId(element.id);
  var contentElem = this.getContentElement(element);
  contentElem && contentElem.firstChild ? control.setContentInternal(contentElem.firstChild.nextSibling ? goog.array.clone(contentElem.childNodes) : contentElem.firstChild) : control.setContentInternal(null);
  var state = 0, rendererClassName = this.getCssClass(), structuralClassName = this.getStructuralCssClass(), hasRendererClassName = !1, hasStructuralClassName = !1, hasCombinedClassName = !1, classNames = goog.array.toArray(goog.dom.classlist.get(element));
  goog.array.forEach(classNames, function(className) {
    hasRendererClassName || className != rendererClassName ? hasStructuralClassName || className != structuralClassName ? state |= this.getStateFromClass(className) : hasStructuralClassName = !0 : (hasRendererClassName = !0, structuralClassName == rendererClassName && (hasStructuralClassName = !0));
  }, this);
  control.setStateInternal(state);
  hasRendererClassName || (classNames.push(rendererClassName), structuralClassName == rendererClassName && (hasStructuralClassName = !0));
  hasStructuralClassName || classNames.push(structuralClassName);
  var extraClassNames = control.getExtraClassNames();
  extraClassNames && classNames.push.apply(classNames, extraClassNames);
  if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("7")) {
    var combinedClasses = this.getAppliedCombinedClassNames_(classNames);
    0 < combinedClasses.length && (classNames.push.apply(classNames, combinedClasses), hasCombinedClassName = !0);
  }
  hasRendererClassName && hasStructuralClassName && !extraClassNames && !hasCombinedClassName || goog.dom.classlist.set(element, classNames.join(" "));
  this.setAriaStates(control, element);
  return element;
};
goog.ui.ControlRenderer.prototype.initializeDom = function $goog$ui$ControlRenderer$$initializeDom$(control) {
  control.isRightToLeft() && this.setRightToLeft(control.getElement(), !0);
  control.isEnabled() && this.setFocusable(control, control.isVisible());
};
goog.ui.ControlRenderer.prototype.setAriaRole = function $goog$ui$ControlRenderer$$setAriaRole$(element, opt_preferredRole) {
  var ariaRole = opt_preferredRole || this.getAriaRole();
  if (ariaRole) {
    goog.asserts.assert(element, "The element passed as a first parameter cannot be null.");
    var currentRole = goog.a11y.aria.getRole(element);
    ariaRole != currentRole && goog.a11y.aria.setRole(element, ariaRole);
  }
};
goog.ui.ControlRenderer.prototype.setAriaStates = function $goog$ui$ControlRenderer$$setAriaStates$(control, element) {
  goog.asserts.assert(control);
  goog.asserts.assert(element);
  control.isVisible() || goog.a11y.aria.setState(element, goog.a11y.aria.State.HIDDEN, !control.isVisible());
  control.isEnabled() || this.updateAriaState(element, goog.ui.Component.State.DISABLED, !control.isEnabled());
  control.isSupportedState(goog.ui.Component.State.SELECTED) && this.updateAriaState(element, goog.ui.Component.State.SELECTED, control.isSelected());
  control.isSupportedState(goog.ui.Component.State.CHECKED) && this.updateAriaState(element, goog.ui.Component.State.CHECKED, control.isChecked());
  control.isSupportedState(goog.ui.Component.State.OPENED) && this.updateAriaState(element, goog.ui.Component.State.OPENED, control.isOpen());
};
goog.ui.ControlRenderer.prototype.setAllowTextSelection = function $goog$ui$ControlRenderer$$setAllowTextSelection$(element, allow) {
  goog.style.setUnselectable(element, !allow, !goog.userAgent.IE && !goog.userAgent.OPERA);
};
goog.ui.ControlRenderer.prototype.setRightToLeft = function $goog$ui$ControlRenderer$$setRightToLeft$(element, rightToLeft) {
  this.enableClassName(element, this.getStructuralCssClass() + "-rtl", rightToLeft);
};
goog.ui.ControlRenderer.prototype.isFocusable = function $goog$ui$ControlRenderer$$isFocusable$(control) {
  var keyTarget;
  return control.isSupportedState(goog.ui.Component.State.FOCUSED) && (keyTarget = control.getKeyEventTarget()) ? goog.dom.isFocusableTabIndex(keyTarget) : !1;
};
goog.ui.ControlRenderer.prototype.setFocusable = function $goog$ui$ControlRenderer$$setFocusable$(control, focusable) {
  var keyTarget;
  if (control.isSupportedState(goog.ui.Component.State.FOCUSED) && (keyTarget = control.getKeyEventTarget())) {
    if (!focusable && control.isFocused()) {
      try {
        keyTarget.blur();
      } catch (e) {
      }
      control.isFocused() && control.handleBlur(null);
    }
    goog.dom.isFocusableTabIndex(keyTarget) != focusable && goog.dom.setFocusableTabIndex(keyTarget, focusable);
  }
};
goog.ui.ControlRenderer.prototype.setVisible = function $goog$ui$ControlRenderer$$setVisible$(element, visible) {
  goog.style.setElementShown(element, visible);
  element && goog.a11y.aria.setState(element, goog.a11y.aria.State.HIDDEN, !visible);
};
goog.ui.ControlRenderer.prototype.setState = function $goog$ui$ControlRenderer$$setState$(control, state, enable) {
  var element = control.getElement();
  if (element) {
    var className = this.getClassForState(state);
    className && this.enableClassName(control, className, enable);
    this.updateAriaState(element, state, enable);
  }
};
goog.ui.ControlRenderer.prototype.updateAriaState = function $goog$ui$ControlRenderer$$updateAriaState$(element, state, enable) {
  goog.ui.ControlRenderer.ARIA_ATTRIBUTE_MAP_ || (goog.ui.ControlRenderer.ARIA_ATTRIBUTE_MAP_ = goog.object.create(goog.ui.Component.State.DISABLED, goog.a11y.aria.State.DISABLED, goog.ui.Component.State.SELECTED, goog.a11y.aria.State.SELECTED, goog.ui.Component.State.CHECKED, goog.a11y.aria.State.CHECKED, goog.ui.Component.State.OPENED, goog.a11y.aria.State.EXPANDED));
  goog.asserts.assert(element, "The element passed as a first parameter cannot be null.");
  var ariaAttr = goog.ui.ControlRenderer.getAriaStateForAriaRole_(element, goog.ui.ControlRenderer.ARIA_ATTRIBUTE_MAP_[state]);
  ariaAttr && goog.a11y.aria.setState(element, ariaAttr, enable);
};
goog.ui.ControlRenderer.getAriaStateForAriaRole_ = function $goog$ui$ControlRenderer$getAriaStateForAriaRole_$(element, attr) {
  var role = goog.a11y.aria.getRole(element);
  if (!role) {
    return attr;
  }
  var matchAttr = goog.ui.ControlRenderer.TOGGLE_ARIA_STATE_MAP_[role] || attr;
  return goog.ui.ControlRenderer.isAriaState_(attr) ? matchAttr : attr;
};
goog.ui.ControlRenderer.isAriaState_ = function $goog$ui$ControlRenderer$isAriaState_$(attr) {
  return attr == goog.a11y.aria.State.CHECKED || attr == goog.a11y.aria.State.SELECTED;
};
goog.ui.ControlRenderer.prototype.getKeyEventTarget = function $goog$ui$ControlRenderer$$getKeyEventTarget$(control) {
  return control.getElement();
};
goog.ui.ControlRenderer.prototype.getCssClass = function $goog$ui$ControlRenderer$$getCssClass$() {
  return goog.ui.ControlRenderer.CSS_CLASS;
};
goog.ui.ControlRenderer.prototype.getIe6ClassCombinations = function $goog$ui$ControlRenderer$$getIe6ClassCombinations$() {
  return[];
};
goog.ui.ControlRenderer.prototype.getStructuralCssClass = function $goog$ui$ControlRenderer$$getStructuralCssClass$() {
  return this.getCssClass();
};
goog.ui.ControlRenderer.prototype.getClassNames = function $goog$ui$ControlRenderer$$getClassNames$(control) {
  var cssClass = this.getCssClass(), classNames = [cssClass], structuralCssClass = this.getStructuralCssClass();
  structuralCssClass != cssClass && classNames.push(structuralCssClass);
  var classNamesForState = this.getClassNamesForState(control.getState());
  classNames.push.apply(classNames, classNamesForState);
  var extraClassNames = control.getExtraClassNames();
  extraClassNames && classNames.push.apply(classNames, extraClassNames);
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("7") && classNames.push.apply(classNames, this.getAppliedCombinedClassNames_(classNames));
  return classNames;
};
goog.ui.ControlRenderer.prototype.getAppliedCombinedClassNames_ = function $goog$ui$ControlRenderer$$getAppliedCombinedClassNames_$(classes, opt_includedClass) {
  var toAdd = [];
  opt_includedClass && (classes = classes.concat([opt_includedClass]));
  goog.array.forEach(this.getIe6ClassCombinations(), function(combo) {
    !goog.array.every(combo, goog.partial(goog.array.contains, classes)) || opt_includedClass && !goog.array.contains(combo, opt_includedClass) || toAdd.push(combo.join("_"));
  });
  return toAdd;
};
goog.ui.ControlRenderer.prototype.getClassNamesForState = function $goog$ui$ControlRenderer$$getClassNamesForState$(state) {
  for (var classNames = [];state;) {
    var mask = state & -state;
    classNames.push(this.getClassForState(mask));
    state &= ~mask;
  }
  return classNames;
};
goog.ui.ControlRenderer.prototype.getClassForState = function $goog$ui$ControlRenderer$$getClassForState$(state) {
  this.classByState_ || this.createClassByStateMap_();
  return this.classByState_[state];
};
goog.ui.ControlRenderer.prototype.getStateFromClass = function $goog$ui$ControlRenderer$$getStateFromClass$(className) {
  this.stateByClass_ || this.createStateByClassMap_();
  var state = parseInt(this.stateByClass_[className], 10);
  return isNaN(state) ? 0 : state;
};
goog.ui.ControlRenderer.prototype.createClassByStateMap_ = function $goog$ui$ControlRenderer$$createClassByStateMap_$() {
  var baseClass = this.getStructuralCssClass(), isValidClassName = !goog.string.contains(goog.string.normalizeWhitespace(baseClass), " ");
  goog.asserts.assert(isValidClassName, "ControlRenderer has an invalid css class: '" + baseClass + "'");
  this.classByState_ = goog.object.create(goog.ui.Component.State.DISABLED, baseClass + "-disabled", goog.ui.Component.State.HOVER, baseClass + "-hover", goog.ui.Component.State.ACTIVE, baseClass + "-active", goog.ui.Component.State.SELECTED, baseClass + "-selected", goog.ui.Component.State.CHECKED, baseClass + "-checked", goog.ui.Component.State.FOCUSED, baseClass + "-focused", goog.ui.Component.State.OPENED, baseClass + "-open");
};
goog.ui.ControlRenderer.prototype.createStateByClassMap_ = function $goog$ui$ControlRenderer$$createStateByClassMap_$() {
  this.classByState_ || this.createClassByStateMap_();
  this.stateByClass_ = goog.object.transpose(this.classByState_);
};
goog.ui.decorate = function $goog$ui$decorate$(element) {
  var decorator = goog.ui.registry.getDecorator(element);
  decorator && decorator.decorate(element);
  return decorator;
};
goog.ui.Control = function $goog$ui$Control$(opt_content, opt_renderer, opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
  this.renderer_ = opt_renderer || goog.ui.registry.getDefaultRenderer(this.constructor);
  this.setContentInternal(goog.isDef(opt_content) ? opt_content : null);
};
goog.inherits(goog.ui.Control, goog.ui.Component);
goog.ui.Control.registerDecorator = goog.ui.registry.setDecoratorByClassName;
goog.ui.Control.getDecorator = goog.ui.registry.getDecorator;
goog.ui.Control.decorate = goog.ui.decorate;
goog.ui.Control.prototype.content_ = null;
goog.ui.Control.prototype.state_ = 0;
goog.ui.Control.prototype.supportedStates_ = goog.ui.Component.State.DISABLED | goog.ui.Component.State.HOVER | goog.ui.Component.State.ACTIVE | goog.ui.Component.State.FOCUSED;
goog.ui.Control.prototype.autoStates_ = goog.ui.Component.State.ALL;
goog.ui.Control.prototype.statesWithTransitionEvents_ = 0;
goog.ui.Control.prototype.visible_ = !0;
goog.ui.Control.prototype.extraClassNames_ = null;
goog.ui.Control.prototype.handleMouseEvents_ = !0;
goog.ui.Control.prototype.allowTextSelection_ = !1;
goog.ui.Control.prototype.preferredAriaRole_ = null;
goog.ui.Control.prototype.isHandleMouseEvents = function $goog$ui$Control$$isHandleMouseEvents$() {
  return this.handleMouseEvents_;
};
goog.ui.Control.prototype.setHandleMouseEvents = function $goog$ui$Control$$setHandleMouseEvents$(enable) {
  this.isInDocument() && enable != this.handleMouseEvents_ && this.enableMouseEventHandling_(enable);
  this.handleMouseEvents_ = enable;
};
goog.ui.Control.prototype.getKeyEventTarget = function $goog$ui$Control$$getKeyEventTarget$() {
  return this.renderer_.getKeyEventTarget(this);
};
goog.ui.Control.prototype.getKeyHandler = function $goog$ui$Control$$getKeyHandler$() {
  return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler);
};
goog.ui.Control.prototype.getExtraClassNames = function $goog$ui$Control$$getExtraClassNames$() {
  return this.extraClassNames_;
};
goog.ui.Control.prototype.addClassName = function $goog$ui$Control$$addClassName$(className) {
  className && (this.extraClassNames_ ? goog.array.contains(this.extraClassNames_, className) || this.extraClassNames_.push(className) : this.extraClassNames_ = [className], this.renderer_.enableExtraClassName(this, className, !0));
};
goog.ui.Control.prototype.removeClassName = function $goog$ui$Control$$removeClassName$(className) {
  className && this.extraClassNames_ && goog.array.remove(this.extraClassNames_, className) && (0 == this.extraClassNames_.length && (this.extraClassNames_ = null), this.renderer_.enableExtraClassName(this, className, !1));
};
goog.ui.Control.prototype.enableClassName = function $goog$ui$Control$$enableClassName$(className, enable) {
  enable ? this.addClassName(className) : this.removeClassName(className);
};
goog.ui.Control.prototype.createDom = function $goog$ui$Control$$createDom$() {
  var element = this.renderer_.createDom(this);
  this.setElementInternal(element);
  this.renderer_.setAriaRole(element, this.getPreferredAriaRole());
  this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(element, !1);
  this.isVisible() || this.renderer_.setVisible(element, !1);
};
goog.ui.Control.prototype.getPreferredAriaRole = function $goog$ui$Control$$getPreferredAriaRole$() {
  return this.preferredAriaRole_;
};
goog.ui.Control.prototype.getContentElement = function $goog$ui$Control$$getContentElement$() {
  return this.renderer_.getContentElement(this.getElement());
};
goog.ui.Control.prototype.canDecorate = function $goog$ui$Control$$canDecorate$(element) {
  return this.renderer_.canDecorate(element);
};
goog.ui.Control.prototype.decorateInternal = function $goog$ui$Control$$decorateInternal$(element) {
  element = this.renderer_.decorate(this, element);
  this.setElementInternal(element);
  this.renderer_.setAriaRole(element, this.getPreferredAriaRole());
  this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(element, !1);
  this.visible_ = "none" != element.style.display;
};
goog.ui.Control.prototype.enterDocument = function $goog$ui$Control$$enterDocument$() {
  goog.ui.Control.superClass_.enterDocument.call(this);
  this.renderer_.initializeDom(this);
  if (this.supportedStates_ & ~goog.ui.Component.State.DISABLED && (this.isHandleMouseEvents() && this.enableMouseEventHandling_(!0), this.isSupportedState(goog.ui.Component.State.FOCUSED))) {
    var keyTarget = this.getKeyEventTarget();
    if (keyTarget) {
      var keyHandler = this.getKeyHandler();
      keyHandler.attach(keyTarget);
      this.getHandler().listen(keyHandler, goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent).listen(keyTarget, goog.events.EventType.FOCUS, this.handleFocus).listen(keyTarget, goog.events.EventType.BLUR, this.handleBlur);
    }
  }
};
goog.ui.Control.prototype.enableMouseEventHandling_ = function $goog$ui$Control$$enableMouseEventHandling_$(enable) {
  var handler = this.getHandler(), element = this.getElement();
  enable ? (handler.listen(element, goog.events.EventType.MOUSEOVER, this.handleMouseOver).listen(element, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(element, goog.events.EventType.MOUSEUP, this.handleMouseUp).listen(element, goog.events.EventType.MOUSEOUT, this.handleMouseOut), this.handleContextMenu != goog.nullFunction && handler.listen(element, goog.events.EventType.CONTEXTMENU, this.handleContextMenu), goog.userAgent.IE && handler.listen(element, goog.events.EventType.DBLCLICK, 
  this.handleDblClick)) : (handler.unlisten(element, goog.events.EventType.MOUSEOVER, this.handleMouseOver).unlisten(element, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).unlisten(element, goog.events.EventType.MOUSEUP, this.handleMouseUp).unlisten(element, goog.events.EventType.MOUSEOUT, this.handleMouseOut), this.handleContextMenu != goog.nullFunction && handler.unlisten(element, goog.events.EventType.CONTEXTMENU, this.handleContextMenu), goog.userAgent.IE && handler.unlisten(element, 
  goog.events.EventType.DBLCLICK, this.handleDblClick));
};
goog.ui.Control.prototype.exitDocument = function $goog$ui$Control$$exitDocument$() {
  goog.ui.Control.superClass_.exitDocument.call(this);
  this.keyHandler_ && this.keyHandler_.detach();
  this.isVisible() && this.isEnabled() && this.renderer_.setFocusable(this, !1);
};
goog.ui.Control.prototype.disposeInternal = function $goog$ui$Control$$disposeInternal$() {
  goog.ui.Control.superClass_.disposeInternal.call(this);
  this.keyHandler_ && (this.keyHandler_.dispose(), delete this.keyHandler_);
  delete this.renderer_;
  this.extraClassNames_ = this.content_ = null;
};
goog.ui.Control.prototype.getContent = function $goog$ui$Control$$getContent$() {
  return this.content_;
};
goog.ui.Control.prototype.setContentInternal = function $goog$ui$Control$$setContentInternal$(content) {
  this.content_ = content;
};
goog.ui.Control.prototype.setRightToLeft = function $goog$ui$Control$$setRightToLeft$(rightToLeft) {
  goog.ui.Control.superClass_.setRightToLeft.call(this, rightToLeft);
  var element = this.getElement();
  element && this.renderer_.setRightToLeft(element, rightToLeft);
};
goog.ui.Control.prototype.isAllowTextSelection = function $goog$ui$Control$$isAllowTextSelection$() {
  return this.allowTextSelection_;
};
goog.ui.Control.prototype.setAllowTextSelection = function $goog$ui$Control$$setAllowTextSelection$(allow) {
  this.allowTextSelection_ = allow;
  var element = this.getElement();
  element && this.renderer_.setAllowTextSelection(element, allow);
};
goog.ui.Control.prototype.isVisible = function $goog$ui$Control$$isVisible$() {
  return this.visible_;
};
goog.ui.Control.prototype.setVisible = function $goog$ui$Control$$setVisible$(visible, opt_force) {
  if (opt_force || this.visible_ != visible && this.dispatchEvent(visible ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
    var element = this.getElement();
    element && this.renderer_.setVisible(element, visible);
    this.isEnabled() && this.renderer_.setFocusable(this, visible);
    this.visible_ = visible;
    return!0;
  }
  return!1;
};
goog.ui.Control.prototype.isEnabled = function $goog$ui$Control$$isEnabled$() {
  return!this.hasState(goog.ui.Component.State.DISABLED);
};
goog.ui.Control.prototype.isParentDisabled_ = function $goog$ui$Control$$isParentDisabled_$() {
  var parent = this.getParent();
  return!!parent && "function" == typeof parent.isEnabled && !parent.isEnabled();
};
goog.ui.Control.prototype.setEnabled = function $goog$ui$Control$$setEnabled$(enable) {
  !this.isParentDisabled_() && this.isTransitionAllowed(goog.ui.Component.State.DISABLED, !enable) && (enable || (this.setActive(!1), this.setHighlighted(!1)), this.isVisible() && this.renderer_.setFocusable(this, enable), this.setState(goog.ui.Component.State.DISABLED, !enable));
};
goog.ui.Control.prototype.setHighlighted = function $goog$ui$Control$$setHighlighted$(highlight) {
  this.isTransitionAllowed(goog.ui.Component.State.HOVER, highlight) && this.setState(goog.ui.Component.State.HOVER, highlight);
};
goog.ui.Control.prototype.isActive = function $goog$ui$Control$$isActive$() {
  return this.hasState(goog.ui.Component.State.ACTIVE);
};
goog.ui.Control.prototype.setActive = function $goog$ui$Control$$setActive$(active) {
  this.isTransitionAllowed(goog.ui.Component.State.ACTIVE, active) && this.setState(goog.ui.Component.State.ACTIVE, active);
};
goog.ui.Control.prototype.isSelected = function $goog$ui$Control$$isSelected$() {
  return this.hasState(goog.ui.Component.State.SELECTED);
};
goog.ui.Control.prototype.setSelected = function $goog$ui$Control$$setSelected$(select) {
  this.isTransitionAllowed(goog.ui.Component.State.SELECTED, select) && this.setState(goog.ui.Component.State.SELECTED, select);
};
goog.ui.Control.prototype.isChecked = function $goog$ui$Control$$isChecked$() {
  return this.hasState(goog.ui.Component.State.CHECKED);
};
goog.ui.Control.prototype.setChecked = function $goog$ui$Control$$setChecked$(check) {
  this.isTransitionAllowed(goog.ui.Component.State.CHECKED, check) && this.setState(goog.ui.Component.State.CHECKED, check);
};
goog.ui.Control.prototype.isFocused = function $goog$ui$Control$$isFocused$() {
  return this.hasState(goog.ui.Component.State.FOCUSED);
};
goog.ui.Control.prototype.setFocused = function $goog$ui$Control$$setFocused$(focused) {
  this.isTransitionAllowed(goog.ui.Component.State.FOCUSED, focused) && this.setState(goog.ui.Component.State.FOCUSED, focused);
};
goog.ui.Control.prototype.isOpen = function $goog$ui$Control$$isOpen$() {
  return this.hasState(goog.ui.Component.State.OPENED);
};
goog.ui.Control.prototype.setOpen = function $goog$ui$Control$$setOpen$(open) {
  this.isTransitionAllowed(goog.ui.Component.State.OPENED, open) && this.setState(goog.ui.Component.State.OPENED, open);
};
goog.ui.Control.prototype.getState = function $goog$ui$Control$$getState$() {
  return this.state_;
};
goog.ui.Control.prototype.hasState = function $goog$ui$Control$$hasState$(state) {
  return!!(this.state_ & state);
};
goog.ui.Control.prototype.setState = function $goog$ui$Control$$setState$(state, enable) {
  this.isSupportedState(state) && enable != this.hasState(state) && (this.renderer_.setState(this, state, enable), this.state_ = enable ? this.state_ | state : this.state_ & ~state);
};
goog.ui.Control.prototype.setStateInternal = function $goog$ui$Control$$setStateInternal$(state) {
  this.state_ = state;
};
goog.ui.Control.prototype.isSupportedState = function $goog$ui$Control$$isSupportedState$(state) {
  return!!(this.supportedStates_ & state);
};
goog.ui.Control.prototype.setSupportedState = function $goog$ui$Control$$setSupportedState$(state, support) {
  if (this.isInDocument() && this.hasState(state) && !support) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  !support && this.hasState(state) && this.setState(state, !1);
  this.supportedStates_ = support ? this.supportedStates_ | state : this.supportedStates_ & ~state;
};
goog.ui.Control.prototype.isAutoState = function $goog$ui$Control$$isAutoState$(state) {
  return!!(this.autoStates_ & state) && this.isSupportedState(state);
};
goog.ui.Control.prototype.setDispatchTransitionEvents = function $goog$ui$Control$$setDispatchTransitionEvents$(states, enable) {
  this.statesWithTransitionEvents_ = enable ? this.statesWithTransitionEvents_ | states : this.statesWithTransitionEvents_ & ~states;
};
goog.ui.Control.prototype.isTransitionAllowed = function $goog$ui$Control$$isTransitionAllowed$(state, enable) {
  return this.isSupportedState(state) && this.hasState(state) != enable && (!(this.statesWithTransitionEvents_ & state) || this.dispatchEvent(goog.ui.Component.getStateTransitionEvent(state, enable))) && !this.isDisposed();
};
goog.ui.Control.prototype.handleMouseOver = function $goog$ui$Control$$handleMouseOver$(e) {
  !goog.ui.Control.isMouseEventWithinElement_(e, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.ENTER) && this.isEnabled() && this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0);
};
goog.ui.Control.prototype.handleMouseOut = function $goog$ui$Control$$handleMouseOut$(e) {
  !goog.ui.Control.isMouseEventWithinElement_(e, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.LEAVE) && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1), this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!1));
};
goog.ui.Control.prototype.handleContextMenu = goog.nullFunction;
goog.ui.Control.isMouseEventWithinElement_ = function $goog$ui$Control$isMouseEventWithinElement_$(e, elem) {
  return!!e.relatedTarget && goog.dom.contains(elem, e.relatedTarget);
};
goog.ui.Control.prototype.handleMouseDown = function $goog$ui$Control$$handleMouseDown$(e) {
  this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0), e.isMouseActionButton() && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!0), this.renderer_.isFocusable(this) && this.getKeyEventTarget().focus()));
  !this.isAllowTextSelection() && e.isMouseActionButton() && e.preventDefault();
};
goog.ui.Control.prototype.handleMouseUp = function $goog$ui$Control$$handleMouseUp$(e) {
  this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0), this.isActive() && this.performActionInternal(e) && this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1));
};
goog.ui.Control.prototype.handleDblClick = function $goog$ui$Control$$handleDblClick$(e) {
  this.isEnabled() && this.performActionInternal(e);
};
goog.ui.Control.prototype.performActionInternal = function $goog$ui$Control$$performActionInternal$(e) {
  this.isAutoState(goog.ui.Component.State.CHECKED) && this.setChecked(!this.isChecked());
  this.isAutoState(goog.ui.Component.State.SELECTED) && this.setSelected(!0);
  this.isAutoState(goog.ui.Component.State.OPENED) && this.setOpen(!this.isOpen());
  var actionEvent = new goog.events.Event(goog.ui.Component.EventType.ACTION, this);
  e && (actionEvent.altKey = e.altKey, actionEvent.ctrlKey = e.ctrlKey, actionEvent.metaKey = e.metaKey, actionEvent.shiftKey = e.shiftKey, actionEvent.platformModifierKey = e.platformModifierKey);
  return this.dispatchEvent(actionEvent);
};
goog.ui.Control.prototype.handleFocus = function $goog$ui$Control$$handleFocus$() {
  this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(!0);
};
goog.ui.Control.prototype.handleBlur = function $goog$ui$Control$$handleBlur$() {
  this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1);
  this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(!1);
};
goog.ui.Control.prototype.handleKeyEvent = function $goog$ui$Control$$handleKeyEvent$(e) {
  return this.isVisible() && this.isEnabled() && this.handleKeyEventInternal(e) ? (e.preventDefault(), e.stopPropagation(), !0) : !1;
};
goog.ui.Control.prototype.handleKeyEventInternal = function $goog$ui$Control$$handleKeyEventInternal$(e) {
  return e.keyCode == goog.events.KeyCodes.ENTER && this.performActionInternal(e);
};
goog.ui.registry.setDefaultRenderer(goog.ui.Control, goog.ui.ControlRenderer);
goog.ui.registry.setDecoratorByClassName(goog.ui.ControlRenderer.CSS_CLASS, function() {
  return new goog.ui.Control(null);
});
goog.ui.Container = function $goog$ui$Container$(opt_orientation, opt_renderer, opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
  this.renderer_ = opt_renderer || goog.ui.ContainerRenderer.getInstance();
  this.orientation_ = opt_orientation || this.renderer_.getDefaultOrientation();
};
goog.inherits(goog.ui.Container, goog.ui.Component);
goog.ui.Container.EventType = {AFTER_SHOW:"aftershow", AFTER_HIDE:"afterhide"};
goog.ui.Container.Orientation = {HORIZONTAL:"horizontal", VERTICAL:"vertical"};
goog.ui.Container.prototype.keyEventTarget_ = null;
goog.ui.Container.prototype.keyHandler_ = null;
goog.ui.Container.prototype.renderer_ = null;
goog.ui.Container.prototype.orientation_ = null;
goog.ui.Container.prototype.visible_ = !0;
goog.ui.Container.prototype.enabled_ = !0;
goog.ui.Container.prototype.focusable_ = !0;
goog.ui.Container.prototype.highlightedIndex_ = -1;
goog.ui.Container.prototype.openItem_ = null;
goog.ui.Container.prototype.mouseButtonPressed_ = !1;
goog.ui.Container.prototype.allowFocusableChildren_ = !1;
goog.ui.Container.prototype.openFollowsHighlight_ = !0;
goog.ui.Container.prototype.childElementIdMap_ = null;
goog.ui.Container.prototype.getKeyEventTarget = function $goog$ui$Container$$getKeyEventTarget$() {
  return this.keyEventTarget_ || this.renderer_.getKeyEventTarget(this);
};
goog.ui.Container.prototype.getKeyHandler = function $goog$ui$Container$$getKeyHandler$() {
  return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler(this.getKeyEventTarget()));
};
goog.ui.Container.prototype.createDom = function $goog$ui$Container$$createDom$() {
  this.setElementInternal(this.renderer_.createDom(this));
};
goog.ui.Container.prototype.getContentElement = function $goog$ui$Container$$getContentElement$() {
  return this.renderer_.getContentElement(this.getElement());
};
goog.ui.Container.prototype.canDecorate = function $goog$ui$Container$$canDecorate$(element) {
  return this.renderer_.canDecorate(element);
};
goog.ui.Container.prototype.decorateInternal = function $goog$ui$Container$$decorateInternal$(element) {
  this.setElementInternal(this.renderer_.decorate(this, element));
  "none" == element.style.display && (this.visible_ = !1);
};
goog.ui.Container.prototype.enterDocument = function $goog$ui$Container$$enterDocument$() {
  goog.ui.Container.superClass_.enterDocument.call(this);
  this.forEachChild(function(child) {
    child.isInDocument() && this.registerChildId_(child);
  }, this);
  var elem = this.getElement();
  this.renderer_.initializeDom(this);
  this.setVisible(this.visible_, !0);
  this.getHandler().listen(this, goog.ui.Component.EventType.ENTER, this.handleEnterItem).listen(this, goog.ui.Component.EventType.HIGHLIGHT, this.handleHighlightItem).listen(this, goog.ui.Component.EventType.UNHIGHLIGHT, this.handleUnHighlightItem).listen(this, goog.ui.Component.EventType.OPEN, this.handleOpenItem).listen(this, goog.ui.Component.EventType.CLOSE, this.handleCloseItem).listen(elem, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(goog.dom.getOwnerDocument(elem), goog.events.EventType.MOUSEUP, 
  this.handleDocumentMouseUp).listen(elem, [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEUP, goog.events.EventType.MOUSEOVER, goog.events.EventType.MOUSEOUT, goog.events.EventType.CONTEXTMENU], this.handleChildMouseEvents);
  this.isFocusable() && this.enableFocusHandling_(!0);
};
goog.ui.Container.prototype.enableFocusHandling_ = function $goog$ui$Container$$enableFocusHandling_$(enable) {
  var handler = this.getHandler(), keyTarget = this.getKeyEventTarget();
  enable ? handler.listen(keyTarget, goog.events.EventType.FOCUS, this.handleFocus).listen(keyTarget, goog.events.EventType.BLUR, this.handleBlur).listen(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent) : handler.unlisten(keyTarget, goog.events.EventType.FOCUS, this.handleFocus).unlisten(keyTarget, goog.events.EventType.BLUR, this.handleBlur).unlisten(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent);
};
goog.ui.Container.prototype.exitDocument = function $goog$ui$Container$$exitDocument$() {
  this.setHighlightedIndex(-1);
  this.openItem_ && this.openItem_.setOpen(!1);
  this.mouseButtonPressed_ = !1;
  goog.ui.Container.superClass_.exitDocument.call(this);
};
goog.ui.Container.prototype.disposeInternal = function $goog$ui$Container$$disposeInternal$() {
  goog.ui.Container.superClass_.disposeInternal.call(this);
  this.keyHandler_ && (this.keyHandler_.dispose(), this.keyHandler_ = null);
  this.renderer_ = this.openItem_ = this.childElementIdMap_ = this.keyEventTarget_ = null;
};
goog.ui.Container.prototype.handleEnterItem = function $goog$ui$Container$$handleEnterItem$() {
  return!0;
};
goog.ui.Container.prototype.handleHighlightItem = function $goog$ui$Container$$handleHighlightItem$(e) {
  var index = this.indexOfChild(e.target);
  if (-1 < index && index != this.highlightedIndex_) {
    var item = this.getHighlighted();
    item && item.setHighlighted(!1);
    this.highlightedIndex_ = index;
    item = this.getHighlighted();
    this.isMouseButtonPressed() && item.setActive(!0);
    this.openFollowsHighlight_ && this.openItem_ && item != this.openItem_ && (item.isSupportedState(goog.ui.Component.State.OPENED) ? item.setOpen(!0) : this.openItem_.setOpen(!1));
  }
  var element = this.getElement();
  goog.asserts.assert(element, "The DOM element for the container cannot be null.");
  null != e.target.getElement() && goog.a11y.aria.setState(element, goog.a11y.aria.State.ACTIVEDESCENDANT, e.target.getElement().id);
};
goog.ui.Container.prototype.handleUnHighlightItem = function $goog$ui$Container$$handleUnHighlightItem$(e) {
  e.target == this.getHighlighted() && (this.highlightedIndex_ = -1);
  var element = this.getElement();
  goog.asserts.assert(element, "The DOM element for the container cannot be null.");
  goog.a11y.aria.removeState(element, goog.a11y.aria.State.ACTIVEDESCENDANT);
};
goog.ui.Container.prototype.handleOpenItem = function $goog$ui$Container$$handleOpenItem$(e) {
  var item = e.target;
  item && item != this.openItem_ && item.getParent() == this && (this.openItem_ && this.openItem_.setOpen(!1), this.openItem_ = item);
};
goog.ui.Container.prototype.handleCloseItem = function $goog$ui$Container$$handleCloseItem$(e) {
  e.target == this.openItem_ && (this.openItem_ = null);
};
goog.ui.Container.prototype.handleMouseDown = function $goog$ui$Container$$handleMouseDown$(e) {
  this.enabled_ && this.setMouseButtonPressed(!0);
  var keyTarget = this.getKeyEventTarget();
  keyTarget && goog.dom.isFocusableTabIndex(keyTarget) ? keyTarget.focus() : e.preventDefault();
};
goog.ui.Container.prototype.handleDocumentMouseUp = function $goog$ui$Container$$handleDocumentMouseUp$() {
  this.setMouseButtonPressed(!1);
};
goog.ui.Container.prototype.handleChildMouseEvents = function $goog$ui$Container$$handleChildMouseEvents$(e) {
  var control = this.getOwnerControl(e.target);
  if (control) {
    switch(e.type) {
      case goog.events.EventType.MOUSEDOWN:
        control.handleMouseDown(e);
        break;
      case goog.events.EventType.MOUSEUP:
        control.handleMouseUp(e);
        break;
      case goog.events.EventType.MOUSEOVER:
        control.handleMouseOver(e);
        break;
      case goog.events.EventType.MOUSEOUT:
        control.handleMouseOut(e);
        break;
      case goog.events.EventType.CONTEXTMENU:
        control.handleContextMenu(e);
    }
  }
};
goog.ui.Container.prototype.getOwnerControl = function $goog$ui$Container$$getOwnerControl$(node) {
  if (this.childElementIdMap_) {
    for (var elem = this.getElement();node && node !== elem;) {
      var id = node.id;
      if (id in this.childElementIdMap_) {
        return this.childElementIdMap_[id];
      }
      node = node.parentNode;
    }
  }
  return null;
};
goog.ui.Container.prototype.handleFocus = function $goog$ui$Container$$handleFocus$() {
};
goog.ui.Container.prototype.handleBlur = function $goog$ui$Container$$handleBlur$() {
  this.setHighlightedIndex(-1);
  this.setMouseButtonPressed(!1);
  this.openItem_ && this.openItem_.setOpen(!1);
};
goog.ui.Container.prototype.handleKeyEvent = function $goog$ui$Container$$handleKeyEvent$(e) {
  return this.isEnabled() && this.isVisible() && (0 != this.getChildCount() || this.keyEventTarget_) && this.handleKeyEventInternal(e) ? (e.preventDefault(), e.stopPropagation(), !0) : !1;
};
goog.ui.Container.prototype.handleKeyEventInternal = function $goog$ui$Container$$handleKeyEventInternal$(e) {
  var highlighted = this.getHighlighted();
  if (highlighted && "function" == typeof highlighted.handleKeyEvent && highlighted.handleKeyEvent(e) || this.openItem_ && this.openItem_ != highlighted && "function" == typeof this.openItem_.handleKeyEvent && this.openItem_.handleKeyEvent(e)) {
    return!0;
  }
  if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) {
    return!1;
  }
  switch(e.keyCode) {
    case goog.events.KeyCodes.ESC:
      if (this.isFocusable()) {
        this.getKeyEventTarget().blur();
      } else {
        return!1;
      }
      break;
    case goog.events.KeyCodes.HOME:
      this.highlightFirst();
      break;
    case goog.events.KeyCodes.END:
      this.highlightLast();
      break;
    case goog.events.KeyCodes.UP:
      if (this.orientation_ == goog.ui.Container.Orientation.VERTICAL) {
        this.highlightPrevious();
      } else {
        return!1;
      }
      break;
    case goog.events.KeyCodes.LEFT:
      if (this.orientation_ == goog.ui.Container.Orientation.HORIZONTAL) {
        this.isRightToLeft() ? this.highlightNext() : this.highlightPrevious();
      } else {
        return!1;
      }
      break;
    case goog.events.KeyCodes.DOWN:
      if (this.orientation_ == goog.ui.Container.Orientation.VERTICAL) {
        this.highlightNext();
      } else {
        return!1;
      }
      break;
    case goog.events.KeyCodes.RIGHT:
      if (this.orientation_ == goog.ui.Container.Orientation.HORIZONTAL) {
        this.isRightToLeft() ? this.highlightPrevious() : this.highlightNext();
      } else {
        return!1;
      }
      break;
    default:
      return!1;
  }
  return!0;
};
goog.ui.Container.prototype.registerChildId_ = function $goog$ui$Container$$registerChildId_$(child) {
  var childElem = child.getElement(), id = childElem.id || (childElem.id = child.getId());
  this.childElementIdMap_ || (this.childElementIdMap_ = {});
  this.childElementIdMap_[id] = child;
};
goog.ui.Container.prototype.addChild = function $goog$ui$Container$$addChild$(child, opt_render) {
  goog.asserts.assertInstanceof(child, goog.ui.Control, "The child of a container must be a control");
  goog.ui.Container.superClass_.addChild.call(this, child, opt_render);
};
goog.ui.Container.prototype.addChildAt = function $goog$ui$Container$$addChildAt$(control, index, opt_render) {
  control.setDispatchTransitionEvents(goog.ui.Component.State.HOVER, !0);
  control.setDispatchTransitionEvents(goog.ui.Component.State.OPENED, !0);
  !this.isFocusable() && this.isFocusableChildrenAllowed() || control.setSupportedState(goog.ui.Component.State.FOCUSED, !1);
  control.setHandleMouseEvents(!1);
  goog.ui.Container.superClass_.addChildAt.call(this, control, index, opt_render);
  control.isInDocument() && this.isInDocument() && this.registerChildId_(control);
  index <= this.highlightedIndex_ && this.highlightedIndex_++;
};
goog.ui.Container.prototype.removeChild = function $goog$ui$Container$$removeChild$(control, opt_unrender) {
  if (control = goog.isString(control) ? this.getChild(control) : control) {
    var index = this.indexOfChild(control);
    -1 != index && (index == this.highlightedIndex_ ? (control.setHighlighted(!1), this.highlightedIndex_ = -1) : index < this.highlightedIndex_ && this.highlightedIndex_--);
    var childElem = control.getElement();
    childElem && childElem.id && this.childElementIdMap_ && goog.object.remove(this.childElementIdMap_, childElem.id);
  }
  control = goog.ui.Container.superClass_.removeChild.call(this, control, opt_unrender);
  control.setHandleMouseEvents(!0);
  return control;
};
goog.ui.Container.prototype.getOrientation = function $goog$ui$Container$$getOrientation$() {
  return this.orientation_;
};
goog.ui.Container.prototype.setOrientation = function $goog$ui$Container$$setOrientation$(orientation) {
  if (this.getElement()) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.orientation_ = orientation;
};
goog.ui.Container.prototype.isVisible = function $goog$ui$Container$$isVisible$() {
  return this.visible_;
};
goog.ui.Container.prototype.setVisible = function $goog$ui$Container$$setVisible$(visible, opt_force) {
  if (opt_force || this.visible_ != visible && this.dispatchEvent(visible ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
    this.visible_ = visible;
    var elem = this.getElement();
    elem && (goog.style.setElementShown(elem, visible), this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), this.enabled_ && this.visible_), opt_force || this.dispatchEvent(this.visible_ ? goog.ui.Container.EventType.AFTER_SHOW : goog.ui.Container.EventType.AFTER_HIDE));
    return!0;
  }
  return!1;
};
goog.ui.Container.prototype.isEnabled = function $goog$ui$Container$$isEnabled$() {
  return this.enabled_;
};
goog.ui.Container.prototype.setEnabled = function $goog$ui$Container$$setEnabled$(enable) {
  this.enabled_ != enable && this.dispatchEvent(enable ? goog.ui.Component.EventType.ENABLE : goog.ui.Component.EventType.DISABLE) && (enable ? (this.enabled_ = !0, this.forEachChild(function(child) {
    child.wasDisabled ? delete child.wasDisabled : child.setEnabled(!0);
  })) : (this.forEachChild(function(child) {
    child.isEnabled() ? child.setEnabled(!1) : child.wasDisabled = !0;
  }), this.enabled_ = !1, this.setMouseButtonPressed(!1)), this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), enable && this.visible_));
};
goog.ui.Container.prototype.isFocusable = function $goog$ui$Container$$isFocusable$() {
  return this.focusable_;
};
goog.ui.Container.prototype.setFocusable = function $goog$ui$Container$$setFocusable$(focusable) {
  focusable != this.focusable_ && this.isInDocument() && this.enableFocusHandling_(focusable);
  this.focusable_ = focusable;
  this.enabled_ && this.visible_ && this.renderer_.enableTabIndex(this.getKeyEventTarget(), focusable);
};
goog.ui.Container.prototype.isFocusableChildrenAllowed = function $goog$ui$Container$$isFocusableChildrenAllowed$() {
  return this.allowFocusableChildren_;
};
goog.ui.Container.prototype.setFocusableChildrenAllowed = function $goog$ui$Container$$setFocusableChildrenAllowed$(focusable) {
  this.allowFocusableChildren_ = focusable;
};
goog.ui.Container.prototype.setHighlightedIndex = function $goog$ui$Container$$setHighlightedIndex$(index) {
  var child = this.getChildAt(index);
  child ? child.setHighlighted(!0) : -1 < this.highlightedIndex_ && this.getHighlighted().setHighlighted(!1);
};
goog.ui.Container.prototype.setHighlighted = function $goog$ui$Container$$setHighlighted$(item) {
  this.setHighlightedIndex(this.indexOfChild(item));
};
goog.ui.Container.prototype.getHighlighted = function $goog$ui$Container$$getHighlighted$() {
  return this.getChildAt(this.highlightedIndex_);
};
goog.ui.Container.prototype.highlightFirst = function $goog$ui$Container$$highlightFirst$() {
  this.highlightHelper(function(index, max) {
    return(index + 1) % max;
  }, this.getChildCount() - 1);
};
goog.ui.Container.prototype.highlightLast = function $goog$ui$Container$$highlightLast$() {
  this.highlightHelper(function(index, max) {
    index--;
    return 0 > index ? max - 1 : index;
  }, 0);
};
goog.ui.Container.prototype.highlightNext = function $goog$ui$Container$$highlightNext$() {
  this.highlightHelper(function(index, max) {
    return(index + 1) % max;
  }, this.highlightedIndex_);
};
goog.ui.Container.prototype.highlightPrevious = function $goog$ui$Container$$highlightPrevious$() {
  this.highlightHelper(function(index, max) {
    index--;
    return 0 > index ? max - 1 : index;
  }, this.highlightedIndex_);
};
goog.ui.Container.prototype.highlightHelper = function $goog$ui$Container$$highlightHelper$(fn, startIndex) {
  for (var curIndex = 0 > startIndex ? this.indexOfChild(this.openItem_) : startIndex, numItems = this.getChildCount(), curIndex = fn.call(this, curIndex, numItems), visited = 0;visited <= numItems;) {
    var control = this.getChildAt(curIndex);
    if (control && this.canHighlightItem(control)) {
      return this.setHighlightedIndexFromKeyEvent(curIndex), !0;
    }
    visited++;
    curIndex = fn.call(this, curIndex, numItems);
  }
  return!1;
};
goog.ui.Container.prototype.canHighlightItem = function $goog$ui$Container$$canHighlightItem$(item) {
  return item.isVisible() && item.isEnabled() && item.isSupportedState(goog.ui.Component.State.HOVER);
};
goog.ui.Container.prototype.setHighlightedIndexFromKeyEvent = function $goog$ui$Container$$setHighlightedIndexFromKeyEvent$(index) {
  this.setHighlightedIndex(index);
};
goog.ui.Container.prototype.isMouseButtonPressed = function $goog$ui$Container$$isMouseButtonPressed$() {
  return this.mouseButtonPressed_;
};
goog.ui.Container.prototype.setMouseButtonPressed = function $goog$ui$Container$$setMouseButtonPressed$(pressed) {
  this.mouseButtonPressed_ = pressed;
};
i18n.input.keyboard.View = function $i18n$input$keyboard$View$(view, domHelper, opt_keyboardHelpUrl, opt_isIframeWrapper) {
  this.keyboardHelpUrl_ = opt_keyboardHelpUrl || "";
  if (this.isIframeWraper_ = !!opt_isIframeWrapper) {
    this.iframe_ = i18n.input.common.dom.createIframeWrapper(domHelper.getDocument()), domHelper = goog.dom.getDomHelper(goog.dom.getFrameContentDocument(this.iframe_));
  }
  this.view_ = view;
  this.state_ = "";
  this.buttons_ = {};
  this.isIE6_ = goog.userAgent.IE && !goog.userAgent.isVersionOrHigher(7);
  this.isTier2Opera_ = goog.userAgent.OPERA && !goog.userAgent.isVersionOrHigher(11);
  this.isTier2FF_ = goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher(3);
  this.eventHandler_ = new goog.events.EventHandler(this);
  goog.ui.Container.call(this, void 0, void 0, domHelper);
};
goog.inherits(i18n.input.keyboard.View, goog.ui.Container);
i18n.input.keyboard.View.prototype.dragger_ = null;
i18n.input.keyboard.View.prototype.isDragged_ = !1;
i18n.input.keyboard.View.prototype.titleBar_ = null;
i18n.input.keyboard.View.prototype.titleBtnGroup_ = null;
i18n.input.keyboard.View.prototype.closeBtn_ = null;
i18n.input.keyboard.View.prototype.minBtn_ = null;
i18n.input.keyboard.View.prototype.helpBtn_ = null;
i18n.input.keyboard.View.prototype.contentPanel_ = null;
i18n.input.keyboard.View.prototype.activeBtn_ = null;
i18n.input.keyboard.View.prototype.hoverBtn_ = null;
i18n.input.keyboard.View.prototype.titleBarWidth_ = 0;
i18n.input.keyboard.View.BTN_IMG_DIR = "btnimgs/";
i18n.input.keyboard.View.VISUALIZE_CLICK_BUTTON_LAG_ = 250;
i18n.input.keyboard.View.CSS_ = {ALTGR:"vk-sf-c273", BOX:"vk-box", BUTTON_BACKGROUND:"vk-sf-b", CLOSE_BUTTON:"vk-sf-cl", FF2:"vk-sf-ff2", HELP_BUTTON:"vk-sf-hp", IE:"vk-sf-ie", KEY_BUTTON:"vk-btn", KEY_BUTTON_ACTIVE:"vk-sf-a", KEY_BUTTON_HOVER:"vk-sf-h", KEY_BUTTON_SELECTED:"vk-sf-s", KEY_CAPTION:"vk-cap", KEY_CAPTION_IMAGE:"vk-cap-i", MAX_BUTTON:"vk-sf-max", MIN_BUTTON:"vk-sf-min", TITLE_BAR:"vk-t", TITLE_BUTTON:"vk-t-btn", TITLE_BUTTON_GROUP:"vk-t-btns", TITLE_BUTTON_BOX:"vk-t-btn-o", TITLE_BUTTON_HOVER:"vk-sf-th", 
MINIMIZE:"vk-min"};
i18n.input.keyboard.View.prototype.render = function $i18n$input$keyboard$View$$render$(opt_parentElement) {
  i18n.input.keyboard.View.superClass_.render.call(this, opt_parentElement);
  this.isIframeWraper_ && (goog.style.setElementShown(this.iframe_, !0), i18n.input.common.dom.copyNecessaryStyle(this.getElement(), this.iframe_));
  this.reposition();
};
i18n.input.keyboard.View.prototype.createDom = function $i18n$input$keyboard$View$$createDom$() {
  i18n.input.keyboard.View.superClass_.createDom.call(this);
  var container = this.getElement();
  container.id = "kbd";
  goog.dom.classes.add(container, "notranslate");
  goog.dom.classes.add(container, i18n.input.keyboard.View.CSS_.BOX);
  goog.userAgent.IE && goog.dom.classes.add(container, i18n.input.keyboard.View.CSS_.IE);
  this.isTier2FF_ && goog.dom.classes.add(container, i18n.input.keyboard.View.CSS_.FF2);
  var titleBar = this.buildTitleBar_();
  this.contentPanel_ = this.buildContentPane_();
  this.getDomHelper().appendChild(container, titleBar);
  this.getDomHelper().appendChild(container, this.contentPanel_);
  this.isIE6_ && (container.style.position = "absolute", container.style.width = "1px");
  this.isTier2Opera_ && (container.style.height = "201px", container.style.bottom = "10px", container.style.zIndex = "20001");
};
i18n.input.keyboard.View.prototype.enterDocument = function $i18n$input$keyboard$View$$enterDocument$() {
  i18n.input.keyboard.View.superClass_.enterDocument.call(this);
  this.resizeKeyButtons_();
  this.setFocusableChildrenAllowed(!1);
  this.setFocusable(!1);
  this.dragger_ = new i18n.input.common.ConstrainedDragger(this.isIframeWraper_ ? this.iframe_ : this.getElement(), this.titleBar_);
  this.eventHandler_.listen(this.dragger_, goog.fx.Dragger.EventType.START, function() {
    this.isDragged_ = !0;
    this.dragger_.repositionTarget();
  });
  var eventsForButtonUI = [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEOVER, goog.events.EventType.MOUSEOUT], doc = this.getDomHelper().getDocument();
  this.isIframeWraper_ && (doc = goog.dom.getOwnerDocument(this.iframe_));
  var mouseUpFunc = goog.bind(this.onButtonMouseEvents_, this, null);
  this.eventHandler_.listen(doc, goog.events.EventType.MOUSEUP, mouseUpFunc);
  goog.array.forEach(i18n.input.common.dom.getSameDomainDocuments(doc), function(iframeDoc) {
    this.eventHandler_.listen(iframeDoc, goog.events.EventType.MOUSEUP, mouseUpFunc);
  }, this);
  for (var code in this.buttons_) {
    var button = this.buttons_[Number(code)];
    code = parseInt(code, 10);
    goog.isArrayLike(button) || (button = [button]);
    for (var i = 0, btn;btn = button[i];++i) {
      this.eventHandler_.listen(btn, goog.events.EventType.CLICK, goog.bind(this.onButtonClick_, this, code)), this.isIE6_ || this.eventHandler_.listen(btn, eventsForButtonUI, goog.bind(this.onButtonMouseEvents_, this, btn));
    }
  }
  var titleButtons = [this.closeBtn_, this.minBtn_];
  for (i in titleButtons) {
    titleButtons[i] && this.eventHandler_.listen(titleButtons[i], goog.events.EventType.CLICK, this.onTitleButtonClick_);
  }
  titleButtons.push(this.helpBtn_);
  for (i in titleButtons) {
    titleButtons[i] && this.eventHandler_.listen(titleButtons[i], eventsForButtonUI, this.onTitleButtonHoverEvents_);
  }
  this.eventHandler_.listen(this.getElement(), goog.events.EventType.MOUSEDOWN, goog.events.Event.stopPropagation);
};
i18n.input.keyboard.View.prototype.exitDocument = function $i18n$input$keyboard$View$$exitDocument$() {
  i18n.input.keyboard.View.superClass_.exitDocument.call(this);
  this.eventHandler_.removeAll();
};
i18n.input.keyboard.View.prototype.onButtonClick_ = function $i18n$input$keyboard$View$$onButtonClick_$(code) {
  this.dispatchEvent(new goog.events.Event(goog.ui.Component.EventType.ACTION, {keyCode:code}));
};
i18n.input.keyboard.View.prototype.onButtonMouseEvents_ = function $i18n$input$keyboard$View$$onButtonMouseEvents_$(btn, e) {
  var isActive = !1, isSelected = !1;
  btn && (isActive = goog.dom.classes.has(btn, i18n.input.keyboard.View.CSS_.KEY_BUTTON_ACTIVE), isSelected = goog.dom.classes.has(btn, i18n.input.keyboard.View.CSS_.KEY_BUTTON_SELECTED));
  switch(e.type) {
    case goog.events.EventType.MOUSEOVER:
      this.hoverBtn_ = btn;
      isActive || isSelected || (i18n.input.common.dom.setClasses(btn, [i18n.input.keyboard.View.CSS_.KEY_BUTTON, i18n.input.keyboard.View.CSS_.KEY_BUTTON_HOVER]), goog.dom.classes.add(btn.firstChild, i18n.input.keyboard.View.CSS_.KEY_BUTTON_HOVER));
      break;
    case goog.events.EventType.MOUSEOUT:
      this.hoverBtn_ = null;
      isActive || isSelected || (goog.dom.classes.set(btn, i18n.input.keyboard.View.CSS_.KEY_BUTTON), goog.dom.classes.remove(btn.firstChild, i18n.input.keyboard.View.CSS_.KEY_BUTTON_HOVER));
      break;
    case goog.events.EventType.MOUSEDOWN:
      isSelected || (i18n.input.common.dom.setClasses(btn, [i18n.input.keyboard.View.CSS_.KEY_BUTTON, i18n.input.keyboard.View.CSS_.KEY_BUTTON_ACTIVE]), this.activeBtn_ = btn);
      break;
    case goog.events.EventType.MOUSEUP:
      this.activeBtn_ && (goog.dom.classes.set(this.activeBtn_, i18n.input.keyboard.View.CSS_.KEY_BUTTON), goog.dom.classes.remove(this.activeBtn_.firstChild, i18n.input.keyboard.View.CSS_.KEY_BUTTON_HOVER), this.activeBtn_ = null), this.hoverBtn_ && (i18n.input.common.dom.setClasses(this.hoverBtn_, [i18n.input.keyboard.View.CSS_.KEY_BUTTON, i18n.input.keyboard.View.CSS_.KEY_BUTTON_HOVER]), goog.dom.classes.add(this.hoverBtn_.firstChild, i18n.input.keyboard.View.CSS_.KEY_BUTTON_HOVER));
  }
};
i18n.input.keyboard.View.prototype.onTitleButtonHoverEvents_ = function $i18n$input$keyboard$View$$onTitleButtonHoverEvents_$(e) {
  if (e.type == goog.events.EventType.MOUSEOVER || e.type == goog.events.EventType.MOUSEOUT) {
    var targetElement = null, titleButtonTargets = [this.closeBtn_, this.minBtn_, this.helpBtn_];
    goog.array.contains(titleButtonTargets, e.target) ? targetElement = e.target.firstChild : goog.array.contains(titleButtonTargets, e.target.parentElement) && (targetElement = e.target);
    if (targetElement) {
      switch(e.type) {
        case goog.events.EventType.MOUSEOVER:
          goog.dom.classes.add(targetElement, i18n.input.keyboard.View.CSS_.TITLE_BUTTON_HOVER);
          break;
        case goog.events.EventType.MOUSEOUT:
          goog.dom.classes.remove(targetElement, i18n.input.keyboard.View.CSS_.TITLE_BUTTON_HOVER);
      }
    }
  }
};
i18n.input.keyboard.View.prototype.onTitleButtonClick_ = function $i18n$input$keyboard$View$$onTitleButtonClick_$(e) {
  switch(e.target) {
    case this.closeBtn_:
    ;
    case this.closeBtn_.firstChild:
      this.dispatchEvent(i18n.input.keyboard.EventType.KEYBOARD_CLOSED);
      break;
    case this.minBtn_:
    ;
    case this.minBtn_.firstChild:
      this.dispatchEvent(i18n.input.keyboard.EventType.KEYBOARD_MINIMIZED);
  }
};
i18n.input.keyboard.View.prototype.getCommitChars = function $i18n$input$keyboard$View$$getCommitChars$(keyCode) {
  var keyChar = String.fromCharCode(keyCode), item = this.view_.mappings[this.state_][keyChar];
  if (item) {
    var chars = item[2];
    if (chars) {
      return chars;
    }
  }
  if (keyCode == goog.events.KeyCodes.SPACE) {
    return " ";
  }
  var codes = this.view_.is102 ? i18n.input.keyboard.KeyCode.CODES102 : i18n.input.keyboard.KeyCode.CODES101;
  return 0 <= codes.indexOf(keyChar) ? "" : null;
};
i18n.input.keyboard.View.prototype.reposition = function $i18n$input$keyboard$View$$reposition$(opt_pos) {
  if (this.getElement() && !this.isTier2Opera_) {
    var doc = this.getDomHelper().getDocument();
    this.isIframeWraper_ && (doc = goog.dom.getOwnerDocument(this.iframe_));
    if (!opt_pos) {
      var anchorRect = this.dragger_.getBoundary(), corner = goog.positioning.getEffectiveCorner(doc.body, i18n.input.common.GlobalSettings.KeyboardDefaultLocation);
      opt_pos = new goog.math.Coordinate(corner & goog.positioning.CornerBit.RIGHT ? anchorRect.right : anchorRect.left, corner & goog.positioning.CornerBit.BOTTOM ? anchorRect.bottom : anchorRect.top);
    }
    this.dragger_.repositionTarget(opt_pos);
  }
};
i18n.input.keyboard.View.prototype.repositionToAnchor = function $i18n$input$keyboard$View$$repositionToAnchor$(anchoredPosition, corner, opt_margin) {
  this.getElement() && (anchoredPosition.reposition(this.getElement(), corner, opt_margin), this.isVisible() && this.dragger_.repositionTarget());
};
i18n.input.keyboard.View.prototype.getPosition = function $i18n$input$keyboard$View$$getPosition$() {
  return goog.style.getPosition(this.isIframeWraper_ ? this.iframe_ : this.getElement());
};
i18n.input.keyboard.View.prototype.refreshState = function $i18n$input$keyboard$View$$refreshState$(state) {
  if (this.view_) {
    this.view_.mappings[state] && (this.state_ = state);
    var ss = {20:"l", 16:"s", 273:"c"}, code;
    for (code in this.buttons_) {
      var button = this.buttons_[Number(code)];
      code = parseInt(code, 10);
      var s = ss[code];
      if (s) {
        goog.isArrayLike(button) || (button = [button]);
        for (var i = 0, btn;btn = button[i];++i) {
          goog.dom.classes.set(btn, i18n.input.keyboard.View.CSS_.KEY_BUTTON), 0 <= state.indexOf(s) && goog.dom.classes.add(btn, i18n.input.keyboard.View.CSS_.KEY_BUTTON_SELECTED);
        }
      } else {
        var caption = this.buildCaption_(code);
        caption && (this.getDomHelper().removeChildren(button), this.getDomHelper().appendChild(button, caption));
      }
    }
    this.hoverBtn_ && !goog.dom.classes.has(this.hoverBtn_, i18n.input.keyboard.View.CSS_.KEY_BUTTON_SELECTED) && (i18n.input.common.dom.setClasses(this.hoverBtn_, [i18n.input.keyboard.View.CSS_.KEY_BUTTON, i18n.input.keyboard.View.CSS_.KEY_BUTTON_HOVER]), goog.dom.classes.add(this.hoverBtn_.firstChild, i18n.input.keyboard.View.CSS_.KEY_BUTTON_HOVER));
  }
};
i18n.input.keyboard.View.prototype.setVisible = function $i18n$input$keyboard$View$$setVisible$(visible) {
  var ret = i18n.input.keyboard.View.superClass_.setVisible.call(this, visible, !0);
  this.isIframeWraper_ && goog.style.setElementShown(this.iframe_, visible);
  visible && this.dragger_ && this.dragger_.repositionTarget();
  return ret;
};
i18n.input.keyboard.View.prototype.isDragged = function $i18n$input$keyboard$View$$isDragged$() {
  return this.isDragged_;
};
i18n.input.keyboard.View.prototype.setDragged = function $i18n$input$keyboard$View$$setDragged$(isDragged) {
  this.isDragged_ = isDragged;
};
i18n.input.keyboard.View.prototype.visualizeClickButton = function $i18n$input$keyboard$View$$visualizeClickButton$(keyCode) {
  if (this.isVisible()) {
    var button = this.buttons_[keyCode];
    button && (i18n.input.common.dom.setClasses(button, [i18n.input.keyboard.View.CSS_.KEY_BUTTON, i18n.input.keyboard.View.CSS_.KEY_BUTTON_ACTIVE]), window.setTimeout(function() {
      goog.dom.classes.set(button, i18n.input.keyboard.View.CSS_.KEY_BUTTON);
    }, i18n.input.keyboard.View.VISUALIZE_CLICK_BUTTON_LAG_));
  }
};
i18n.input.keyboard.View.prototype.isRTL = function $i18n$input$keyboard$View$$isRTL$() {
  return this.view_.isRTL;
};
i18n.input.keyboard.View.prototype.resizeKeyButtons_ = function $i18n$input$keyboard$View$$resizeKeyButtons_$() {
  var buttonScales = this.view_.is102 ? [{13:2}, {0:1.5, 13:1.5}, {0:1.75, 13:1.25}, {0:1.25, 12:2.75}, {0:3, 1:9, 2:3}] : [{13:2}, {0:1.5, 13:1.5}, {0:1.75, 12:2.25}, {0:2.25, 11:2.75}, {0:3, 1:9, 2:3}], width = 29, marginWidth = 4, firstButton = this.contentPanel_.children[0].children[0];
  if (firstButton) {
    var widthStyle = goog.style.getComputedStyle(firstButton, "width"), width = goog.userAgent.WEBKIT && widthStyle ? Number(widthStyle.slice(0, -2)) : goog.style.getSize(firstButton).width, box = goog.style.getMarginBox(firstButton), marginWidth = box.right + box.left, width = width + marginWidth
  }
  for (var i = 0;i < buttonScales.length;i++) {
    for (var j in buttonScales[i]) {
      j = Number(j);
      var button = this.contentPanel_.children[i].children[j];
      button.style.width = width * buttonScales[i][j] - marginWidth + "px";
    }
  }
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher(8) && (this.titleBarWidth_ = 15 * width - marginWidth - 2, this.titleBar_.style.width = this.titleBarWidth_ + "px");
};
i18n.input.keyboard.View.prototype.normalizeInlineBlock_ = function $i18n$input$keyboard$View$$normalizeInlineBlock_$(elem) {
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher(8) ? (elem.style.display = "inline", elem.style.zoom = 1) : elem.style.display = "inline-block";
};
i18n.input.keyboard.View.prototype.buildTitleBar_ = function $i18n$input$keyboard$View$$buildTitleBar_$() {
  var isRTL = this.isRTL(), ret = this.getDomHelper().createDom(goog.dom.TagName.DIV, {dir:isRTL ? "rtl" : "ltr", style:"white-space: nowrap;"});
  this.titleBar_ = this.getDomHelper().createDom(goog.dom.TagName.DIV, {"class":i18n.input.keyboard.View.CSS_.TITLE_BAR}, this.view_.title);
  this.titleBar_.style.textAlign = isRTL ? "right" : "left";
  this.normalizeInlineBlock_(this.titleBar_);
  this.getDomHelper().appendChild(ret, this.titleBar_);
  this.titleBtnGroup_ = this.getDomHelper().createDom(goog.dom.TagName.DIV, {"class":i18n.input.keyboard.View.CSS_.TITLE_BUTTON_GROUP});
  this.getDomHelper().appendChild(ret, this.titleBtnGroup_);
  var self = this, createTitleBtn = function $createTitleBtn$(sfCss, opt_isHelp) {
    var titleBtn = self.getDomHelper().createDom(opt_isHelp ? goog.dom.TagName.A : goog.dom.TagName.DIV, opt_isHelp ? {target:"_blank", href:this.keyboardHelpUrl_, "class":i18n.input.keyboard.View.CSS_.TITLE_BUTTON_BOX} : {"class":i18n.input.keyboard.View.CSS_.TITLE_BUTTON_BOX});
    goog.dom.classes.add(titleBtn, sfCss);
    var titleBtnInner = self.getDomHelper().createDom(goog.dom.TagName.DIV, {"class":i18n.input.keyboard.View.CSS_.TITLE_BUTTON});
    goog.dom.classes.add(titleBtnInner, sfCss);
    self.getDomHelper().appendChild(titleBtn, titleBtnInner);
    self.getDomHelper().appendChild(self.titleBtnGroup_, titleBtn);
    self.normalizeInlineBlock_(titleBtn);
    return titleBtn;
  }, right = isRTL ? "left" : "right", paddingRight = isRTL ? "paddingLeft" : "paddingRight";
  this.titleBtnGroup_.style[right] = 0;
  this.normalizeInlineBlock_(this.titleBtnGroup_);
  i18n.input.common.GlobalSettings.KeyboardHelpUrl && (this.helpBtn_ = createTitleBtn(i18n.input.keyboard.View.CSS_.HELP_BUTTON, !0));
  i18n.input.common.GlobalSettings.KeyboardShowMinMax && (this.minBtn_ = createTitleBtn(i18n.input.keyboard.View.CSS_.MIN_BUTTON));
  this.closeBtn_ = createTitleBtn(i18n.input.keyboard.View.CSS_.CLOSE_BUTTON);
  this.closeBtn_.style[paddingRight] = "14px";
  return ret;
};
i18n.input.keyboard.View.prototype.buildContentPane_ = function $i18n$input$keyboard$View$$buildContentPane_$() {
  var is102 = this.view_.is102, buttonCounts = [14, 14, is102 ? 14 : 13, is102 ? 13 : 12, 3], codes = is102 ? i18n.input.keyboard.KeyCode.ALLCODES102 : i18n.input.keyboard.KeyCode.ALLCODES101, codeIndex = 0, table = this.getDomHelper().createDom(goog.dom.TagName.DIV);
  table.dir = table.style.direction = "ltr";
  for (var i = 0;5 > i;++i) {
    var row = this.getDomHelper().createDom(goog.dom.TagName.DIV);
    row.style.whiteSpace = "nowrap";
    for (var j = 0;j < buttonCounts[i];++j) {
      var code = codes.charCodeAt(codeIndex++), button = this.buildButton_(code);
      this.getDomHelper().appendChild(row, button);
    }
    this.getDomHelper().appendChild(table, row);
  }
  return table;
};
i18n.input.keyboard.View.prototype.buildButton_ = function $i18n$input$keyboard$View$$buildButton_$(code) {
  var caption = this.buildCaption_(code), button = this.getDomHelper().createDom(goog.dom.TagName.BUTTON, {id:"K" + code, type:"button", "class":i18n.input.keyboard.View.CSS_.KEY_BUTTON, style:"visibility:" + (caption ? "" : "hidden")});
  caption && this.getDomHelper().appendChild(button, caption);
  this.buttons_[code] = this.buttons_[code] ? [this.buttons_[code], button] : button;
  return button;
};
i18n.input.keyboard.View.MODIFIER_CSS_ = {8:"vk-sf-c8", 16:"vk-sf-c16", 20:"vk-sf-c20"};
i18n.input.keyboard.View.prototype.buildCaption_ = function $i18n$input$keyboard$View$$buildCaption_$(code) {
  var codes = goog.events.KeyCodes;
  if (code == codes.TAB || code == codes.ENTER) {
    return null;
  }
  var caption = this.getDomHelper().createDom(goog.dom.TagName.SPAN);
  if (i18n.input.keyboard.View.MODIFIER_CSS_[code]) {
    return i18n.input.common.dom.setClasses(caption, [i18n.input.keyboard.View.CSS_.KEY_CAPTION, i18n.input.keyboard.View.CSS_.BUTTON_BACKGROUND, i18n.input.keyboard.View.MODIFIER_CSS_[code]]), caption;
  }
  if (273 == code) {
    return i18n.input.common.dom.setClasses(caption, [i18n.input.keyboard.View.CSS_.KEY_CAPTION, i18n.input.keyboard.View.CSS_.ALTGR]), caption.innerHTML = "Ctrl + Alt", caption;
  }
  var child = null, disp = this.view_.mappings[this.state_][String.fromCharCode(code)];
  disp && disp[1] && ("S" == disp[0] ? (child = this.getDomHelper().createTextNode(disp[1]), goog.dom.classes.set(caption, i18n.input.keyboard.View.CSS_.KEY_CAPTION)) : "P" == disp[0] && (child = this.getDomHelper().createDom(goog.dom.TagName.IMG, {src:i18n.input.keyboard.View.BTN_IMG_DIR + this.view_.id + "_" + disp[1] + ".png"}), goog.dom.classes.set(child, i18n.input.keyboard.View.CSS_.KEY_CAPTION_IMAGE)));
  child ? this.getDomHelper().appendChild(caption, child) : (this.getDomHelper().appendChild(caption, goog.dom.createTextNode(".")), caption.style.visibility = "hidden");
  return caption;
};
i18n.input.keyboard.View.prototype.disposeInternal = function $i18n$input$keyboard$View$$disposeInternal$() {
  goog.dispose(this.eventHandler_);
  goog.dispose(this.dragger_);
  i18n.input.keyboard.View.superClass_.disposeInternal.call(this);
  this.isIframeWraper_ && goog.dom.removeNode(this.iframe_);
};
i18n.input.common.CommandType = {CHANGE_STATE:"changeState", CHANGE_FOCUS:"cfx", CHANGE_DIRECTION:"cd", TOGGLE_ITA:"tita", HIDE_EDITOR:"he", TOGGLE_SBC:"tsbc", TOGGLE_LANGUAGE:"tlang", PUNCTUATION:"pun", LOAD_CONFIG:"lc", SHOW_KEYBOARD:"sk", MINIMIZE_KEYBOARD:"mk", LOAD_LAYOUT:"ll", REPOSITION_ELEMENT:"re", COMMIT:"cm", SHOW_STATUSBAR:"ss"};
i18n.input.common.Metrics = {};
i18n.input.common.Metrics.Param = {ACTION:"act", SHOW_TIME:"st", BAR_LANG_KEY_COUNT:"ltkc", BAR_LANG_CLICK_COUNT:"ltcc", BAR_BC_KEY_COUNT:"bckc", BAR_BC_CLICK_COUNT:"bccc", BAR_PUNC_KEY_COUNT:"ptkc", BAR_PUNC_CLICK_COUNT:"ptcc", BAR_DRAG_COUNT:"bdc", PPE_CANDIDATE_INDEX:"ci", PPE_SOURCE_LENGTH:"slen", PPE_TARGET_LENGTH:"tlen", PPE_SELECT_DURATION:"dur", PPE_BACKSPACE_COUNT:"bsc", PPE_COMMIT_KEY:"key", SGM_CANDIDATE_INDEX:"ci", SGM_CANDIDATE_CLICK_COUNT:"ccc", VK_LAYOUT:"lay", VK_KEY_CLICK_COUNT:"kcc", 
VK_KEY_KEY_COUNT:"kkc", VK_WORD_COUNT:"wc", VK_DRAG_COUNT:"kdc", VK_MINIMIZED_TIME:"mt", QUERY_LATENCY:"ql", PREDICTION:"pre", OFFLINE_DECODER:"od"};
i18n.input.common.Metrics.Type = {POPUP_EDITOR:"ppe", STATUS_BAR:"bar", SUGGEST_MENU:"sgm", VIRTUAL_KEYBOARD:"vk", HANDWRITING:"hwt"};
i18n.input.common.Metrics.Action = {PAGE_UNLOAD:"ul", CLOSE:"cl", SWITCH:"sw", PPE_COMMIT_SOURCE:"cmts", PPE_COMMIT_TARGET:"cmtt", PPE_COMMIT_DELAY:"cmtd"};
i18n.input.common.Metrics.STATUSBAR_MAP = goog.object.create(i18n.input.common.CommandType.TOGGLE_LANGUAGE, [i18n.input.common.Metrics.Param.BAR_LANG_KEY_COUNT, i18n.input.common.Metrics.Param.BAR_LANG_CLICK_COUNT], i18n.input.common.CommandType.TOGGLE_SBC, [i18n.input.common.Metrics.Param.BAR_BC_KEY_COUNT, i18n.input.common.Metrics.Param.BAR_BC_CLICK_COUNT], i18n.input.common.CommandType.PUNCTUATION, [i18n.input.common.Metrics.Param.BAR_PUNC_KEY_COUNT, i18n.input.common.Metrics.Param.BAR_PUNC_CLICK_COUNT]);
i18n.input.common.AbstractStatSession = function $i18n$input$common$AbstractStatSession$() {
};
goog.inherits(i18n.input.common.AbstractStatSession, goog.Disposable);
i18n.input.common.AbstractStatSession.nullFunction_ = function $i18n$input$common$AbstractStatSession$nullFunction_$() {
};
i18n.input.common.AbstractStatSession.prototype.setInputToolCode = goog.functions.NULL;
i18n.input.common.AbstractStatSession.prototype.increase = goog.functions.NULL;
i18n.input.common.AbstractStatSession.prototype.get = goog.nullFunction;
i18n.input.common.AbstractStatSession.prototype.set = goog.functions.NULL;
i18n.input.common.AbstractStatSession.prototype.setConst = goog.functions.NULL;
i18n.input.common.AbstractStatSession.prototype.push = goog.functions.NULL;
i18n.input.common.AbstractStatSession.prototype.pop = goog.functions.withReturnValue(goog.nullFunction, "");
i18n.input.common.AbstractStatSession.prototype.report = goog.functions.NULL;
i18n.input.common.Statistics = function $i18n$input$common$Statistics$() {
  this.sessions_ = {};
  this.eventHandler_ = new goog.events.EventHandler(this);
  this.eventHandler_.listen(window, [goog.events.EventType.BEFOREUNLOAD, goog.events.EventType.UNLOAD], this.handleUnload_);
};
goog.inherits(i18n.input.common.Statistics, goog.Disposable);
goog.addSingletonGetter(i18n.input.common.Statistics);
i18n.input.common.Statistics.prototype.getSession = function $i18n$input$common$Statistics$$getSession$(type) {
  return this.sessions_[type] || new i18n.input.common.AbstractStatSession(type);
};
i18n.input.common.Statistics.prototype.handleUnload_ = function $i18n$input$common$Statistics$$handleUnload_$() {
  this.dispose();
};
i18n.input.common.Statistics.prototype.disposeInternal = function $i18n$input$common$Statistics$$disposeInternal$() {
  goog.dispose(this.eventHandler_);
  for (var type in this.sessions_) {
    goog.dispose(this.sessions_[type]), delete this.sessions_[type];
  }
  i18n.input.common.Statistics.superClass_.disposeInternal.call(this);
};
i18n.input.keyboard.Controller = function $i18n$input$keyboard$Controller$(opt_keyboardHelpUrl, opt_isIframeWrapper) {
  goog.events.EventTarget.call(this);
  this.model_ = new i18n.input.keyboard.Model;
  this.domHelper_ = goog.dom.getDomHelper();
  this.keyDownResults_ = {};
  this.eventHandler_ = new goog.events.EventHandler(this);
  this.statSession_ = i18n.input.common.Statistics.getInstance().getSession(i18n.input.common.Metrics.Type.VIRTUAL_KEYBOARD);
  this.wordSeparators_ = {};
  this.titleMap_ = {};
  this.keyboardHelpUrl_ = opt_keyboardHelpUrl || "";
  this.isIframeWraper_ = !!opt_isIframeWrapper;
  this.model_.setParentEventTarget(this);
  this.eventHandler_.listen(this.model_, i18n.input.keyboard.EventType.LAYOUT_ACTIVATED, this.onLayoutActivated_);
  for (var i = 0, c;c = i18n.input.keyboard.Controller.WORD_SEPARATORS_.charAt(i);++i) {
    this.wordSeparators_[c] = !0;
  }
  i18n.input.keyboard.Controller.Css && (goog.style.installStyles(i18n.input.keyboard.Controller.Css), i18n.input.keyboard.Controller.Css = "");
};
goog.inherits(i18n.input.keyboard.Controller, goog.events.EventTarget);
i18n.input.keyboard.Controller.prototype.inputable_ = null;
i18n.input.keyboard.Controller.prototype.listening_ = !0;
i18n.input.keyboard.Controller.prototype.state_ = 0;
i18n.input.keyboard.Controller.prototype.activeView_ = null;
i18n.input.keyboard.Controller.prototype.oemId_ = "en";
i18n.input.keyboard.Controller.prototype.anchoredPosition_ = null;
i18n.input.keyboard.Controller.prototype.anchoredCorner_ = null;
i18n.input.keyboard.Controller.prototype.anchoredMargin_ = null;
i18n.input.keyboard.Controller.prototype.visible_ = !0;
i18n.input.keyboard.Controller.prototype.pinShift_ = !1;
i18n.input.keyboard.Controller.prototype.pinAltGr_ = !1;
i18n.input.keyboard.Controller.WORD_SEPARATORS_ = " \u00a0\n\r`~!@#$%^&*()_+-=[]{}\\|;:'\",./<>?";
i18n.input.keyboard.Controller.Css = "";
i18n.input.keyboard.Controller.StateBit = {SHIFT:1, ALT:2, CTRL:4, CAPS:8, META:16, SHIFT_CLICK:256, ALTGR_CLICK:512};
i18n.input.keyboard.Controller.getInstance = function $i18n$input$keyboard$Controller$getInstance$() {
  i18n.input.keyboard.Controller.INSTANCE || (i18n.input.keyboard.Controller.INSTANCE = new i18n.input.keyboard.Controller);
  return i18n.input.keyboard.Controller.INSTANCE;
};
i18n.input.keyboard.Controller.prototype.setInputable = function $i18n$input$keyboard$Controller$$setInputable$(inputable) {
  this.inputable_ = inputable;
};
i18n.input.keyboard.Controller.prototype.loadLayout = function $i18n$input$keyboard$Controller$$loadLayout$(layoutCode) {
  this.model_.loadLayout(layoutCode);
};
i18n.input.keyboard.Controller.prototype.activateLayout = function $i18n$input$keyboard$Controller$$activateLayout$(layoutCode, opt_title) {
  opt_title && (this.titleMap_[layoutCode] = opt_title);
  this.model_.activateLayout(layoutCode);
};
i18n.input.keyboard.Controller.prototype.setVisible = function $i18n$input$keyboard$Controller$$setVisible$(visible) {
  this.visible_ = visible;
  this.activeView_ && (visible || (this.state_ = 0, this.activeView_.refreshState(this.getUiState_())), this.activeView_.setVisible(visible));
};
i18n.input.keyboard.Controller.prototype.reposition = function $i18n$input$keyboard$Controller$$reposition$(anchoredPosition, corner, opt_margin) {
  this.activeView_ ? this.activeView_.repositionToAnchor(anchoredPosition, corner, opt_margin) : (this.anchoredPosition_ = anchoredPosition, this.anchoredCorner_ = corner, this.anchoredMargin_ = opt_margin || new goog.math.Box(0, 0, 0, 0));
};
i18n.input.keyboard.Controller.prototype.handleEvent = function $i18n$input$keyboard$Controller$$handleEvent$(e) {
  if (!this.listening_ || !this.activeView_) {
    return!1;
  }
  var ret = !1;
  switch(e.type) {
    case goog.events.EventType.KEYDOWN:
      ret = this.onKeyDown_(e);
      break;
    case goog.events.EventType.KEYPRESS:
      ret = this.onKeyPress_(e);
      break;
    case goog.events.EventType.KEYUP:
      ret = this.onKeyUp_(e);
  }
  return ret;
};
i18n.input.keyboard.Controller.prototype.onKeyboardClosed_ = function $i18n$input$keyboard$Controller$$onKeyboardClosed_$() {
  this.setVisible(!1);
};
i18n.input.keyboard.Controller.prototype.onKeyButtonClicked_ = function $i18n$input$keyboard$Controller$$onKeyButtonClicked_$(e) {
  if (this.activeView_) {
    this.inputable_ && this.inputable_.setFocus();
    var keyCode = e.target.keyCode;
    if (keyCode) {
      var codes = goog.events.KeyCodes, states = i18n.input.keyboard.Controller.StateBit;
      switch(keyCode) {
        case codes.SHIFT:
          this.state_ & states.SHIFT && (this.state_ |= states.SHIFT_CLICK, this.state_ &= ~states.SHIFT);
          this.state_ ^= states.SHIFT_CLICK;
          this.activeView_.refreshState(this.getUiState_());
          break;
        case 273:
          this.state_ & states.ALT && this.state_ & states.CTRL && (this.state_ |= states.ALTGR_CLICK, this.state_ &= ~(states.ALT | states.CTRL));
          this.state_ ^= states.ALTGR_CLICK;
          this.activeView_.refreshState(this.getUiState_());
          break;
        case codes.CAPS_LOCK:
          this.state_ ^= states.CAPS;
          this.activeView_.refreshState(this.getUiState_());
          break;
        default:
          this.commitChars_(keyCode);
      }
      this.statSession_.increase(i18n.input.common.Metrics.Param.VK_KEY_CLICK_COUNT);
    }
  }
};
i18n.input.keyboard.Controller.prototype.onLayoutActivated_ = function $i18n$input$keyboard$Controller$$onLayoutActivated_$(e) {
  var view = e.layoutView;
  view.title = this.titleMap_[view.id] || view.title;
  var anchoredPosition = this.anchoredPosition_, anchoredCorner = this.anchoredCorner_, anchoredMargin = this.anchoredMargin_;
  this.anchoredMargin_ = this.anchoredCorner_ = this.anchoredPosition_ = null;
  var isDragged = !1, lastViewPosition = null;
  this.activeView_ && (this.visible_ = this.activeView_.isVisible(), isDragged = this.activeView_.isDragged(), this.activeView_.isVisible() && isDragged && (lastViewPosition = this.activeView_.getPosition()), this.activeView_.dispose(), this.statSession_.set(i18n.input.common.Metrics.Param.ACTION, i18n.input.common.Metrics.Action.SWITCH), this.statSession_.report());
  this.statSession_.setConst(i18n.input.common.Metrics.Param.VK_LAYOUT, view.id);
  this.statSession_.setInputToolCode("vkd_" + view.id);
  this.activeView_ = new i18n.input.keyboard.View(view, this.domHelper_, this.keyboardHelpUrl_, this.isIframeWraper_);
  this.activeView_.setParentEventTarget(this);
  this.activeView_.render();
  this.activeView_.setDragged(isDragged);
  this.activeView_.setVisible(this.visible_);
  lastViewPosition ? this.activeView_.reposition(lastViewPosition) : anchoredPosition && goog.isDefAndNotNull(anchoredCorner) ? (this.activeView_.repositionToAnchor(anchoredPosition, anchoredCorner, anchoredMargin), this.activeView_.setDragged(!0)) : this.activeView_.reposition();
  this.activeView_.refreshState(this.getUiState_());
  this.eventHandler_.listen(this.activeView_, goog.ui.Component.EventType.ACTION, this.onKeyButtonClicked_).listen(this.activeView_, [i18n.input.keyboard.EventType.KEYBOARD_CLOSED, i18n.input.keyboard.EventType.KEYBOARD_MINIMIZED], this.onKeyboardClosed_);
};
i18n.input.keyboard.Controller.prototype.onKeyDown_ = function $i18n$input$keyboard$Controller$$onKeyDown_$(e) {
  var codes = goog.events.KeyCodes, states = i18n.input.keyboard.Controller.StateBit, code = this.normalizeKeyCode_(e.keyCode);
  this.updateState_(code, e);
  if (this.state_ & states.META) {
    return this.keyDownReturn_(code, !1);
  }
  var ctrl = !!(this.state_ & states.CTRL), alt = !!(this.state_ & states.ALT), meta = !!(this.state_ & states.META);
  if (code == codes.CTRL || code == codes.ALT || code == codes.SHIFT || code == codes.CAPS_LOCK) {
    return this.keyDownReturn_(code, code == codes.CAPS_LOCK);
  }
  if (meta || ctrl != alt) {
    return this.keyDownReturn_(code, this.onHotKey_(code));
  }
  this.statSession_.increase(i18n.input.common.Metrics.Param.VK_KEY_KEY_COUNT);
  this.activeView_.visualizeClickButton(code);
  return this.keyDownReturn_(code, this.commitChars_(code));
};
i18n.input.keyboard.Controller.prototype.onKeyPress_ = function $i18n$input$keyboard$Controller$$onKeyPress_$(e) {
  if (this.keyDownResults_[0]) {
    return!0;
  }
  if (goog.userAgent.MAC && goog.userAgent.GECKO) {
    var code = i18n.input.keyboard.KeyCode.MOZ_SHIFT_CHAR_CODES[e.charCode];
    if (code) {
      return this.commitChars_(code);
    }
  }
  return this.keyDownResults_[0];
};
i18n.input.keyboard.Controller.prototype.onKeyUp_ = function $i18n$input$keyboard$Controller$$onKeyUp_$(e) {
  var codes = goog.events.KeyCodes, states = i18n.input.keyboard.Controller.StateBit, code = this.normalizeKeyCode_(e.keyCode), state = this.state_;
  code == codes.CAPS_LOCK && goog.userAgent.MAC && goog.userAgent.WEBKIT ? state &= ~states.CAPS : code == codes.SHIFT ? (state &= ~states.SHIFT, state &= ~states.SHIFT_CLICK) : code == codes.ALT ? (state &= ~states.ALT, state &= ~states.ALTGR_CLICK) : code == codes.CTRL ? (state &= ~states.CTRL, state &= ~states.ALTGR_CLICK) : code == codes.META && (state &= ~states.META);
  this.state_ != state && (this.state_ = state, this.activeView_.refreshState(this.getUiState_()));
  var ret = this.keyDownResults_[code];
  delete this.keyDownResults_[code];
  return ret;
};
i18n.input.keyboard.Controller.prototype.updateState_ = function $i18n$input$keyboard$Controller$$updateState_$(code, e) {
  var codes = goog.events.KeyCodes, states = i18n.input.keyboard.Controller.StateBit, state = this.state_ & (states.CAPS | states.SHIFT_CLICK | states.ALTGR_CLICK);
  code == codes.CAPS_LOCK && (state = goog.userAgent.MAC && goog.userAgent.WEBKIT ? state | states.CAPS : state ^ states.CAPS);
  if (code == codes.SHIFT || e.shiftKey) {
    state |= states.SHIFT;
  }
  if (code == codes.ALT || e.altKey) {
    state |= states.ALT;
  }
  if (code == codes.CTRL || e.ctrlKey) {
    state |= states.CTRL;
  }
  if (code == codes.META || e.metaKey) {
    state |= states.META;
  }
  this.state_ != state && (this.state_ = state, this.activeView_.refreshState(this.getUiState_()));
};
i18n.input.keyboard.Controller.prototype.keyDownReturn_ = function $i18n$input$keyboard$Controller$$keyDownReturn_$(code, ret) {
  return this.keyDownResults_[0] = this.keyDownResults_[code] = ret;
};
i18n.input.keyboard.Controller.prototype.commitChars_ = function $i18n$input$keyboard$Controller$$commitChars_$(keyCode) {
  var codes = goog.events.KeyCodes, states = i18n.input.keyboard.Controller.StateBit;
  if (!this.inputable_) {
    return!1;
  }
  var chars = this.activeView_.getCommitChars(keyCode);
  chars && !this.wordSeparators_[chars] ? this.wordStarted_ || (this.wordStarted_ = !0, this.statSession_.increase(i18n.input.common.Metrics.Param.VK_WORD_COUNT)) : this.wordStarted_ && keyCode != codes.BACKSPACE && (this.wordStarted_ = !1);
  if (this.state_ & states.SHIFT_CLICK || this.state_ & states.ALTGR_CLICK) {
    var state = this.state_;
    this.pinShift_ || (state &= ~states.SHIFT_CLICK);
    this.pinAltGr_ || (state &= ~states.ALTGR_CLICK);
    state != this.state_ && (this.state_ = state, this.activeView_.refreshState(this.getUiState_()));
  }
  if ("" == chars) {
    return!0;
  }
  if (null == chars && keyCode != codes.BACKSPACE) {
    return!1;
  }
  var trans = {back:1, chars:""};
  if (this.model_.hasTransforms()) {
    var text = this.inputable_.getTextBeforeCursor(20) || "";
    keyCode == codes.BACKSPACE ? this.model_.processBackspace(text) : trans = this.model_.translate(chars, text);
  } else {
    chars && (trans = {back:0, chars:chars});
  }
  this.dispatchEvent(new goog.events.Event(i18n.input.keyboard.EventType.COMMIT_START));
  this.inputable_.commitText(trans.chars, trans.back);
  this.dispatchEvent(new goog.events.Event(i18n.input.keyboard.EventType.COMMIT_END));
  return!0;
};
i18n.input.keyboard.Controller.prototype.normalizeKeyCode_ = function $i18n$input$keyboard$Controller$$normalizeKeyCode_$(keyCode) {
  var code = keyCode, codes = goog.events.KeyCodes;
  goog.userAgent.LINUX && (code == codes.META && goog.userAgent.WEBKIT || code == codes.MAC_FF_META && goog.userAgent.GECKO) && (code = codes.ALT);
  var code = i18n.input.keyboard.KeyCode.MOZ_CODES[code] || code, keyMap = i18n.input.keyboard.KeyCode.OEM_CODES[this.oemId_];
  keyMap && (code = keyMap[String.fromCharCode(code)] || code);
  return code;
};
i18n.input.keyboard.Controller.prototype.onHotKey_ = function $i18n$input$keyboard$Controller$$onHotKey_$() {
  return!1;
};
i18n.input.keyboard.Controller.prototype.getUiState_ = function $i18n$input$keyboard$Controller$$getUiState_$() {
  var uiState = "", states = i18n.input.keyboard.Controller.StateBit;
  if (this.state_ & states.SHIFT || this.state_ & states.SHIFT_CLICK) {
    uiState += "s";
  }
  if (this.state_ & states.ALT && this.state_ & states.CTRL || this.state_ & states.ALTGR_CLICK) {
    uiState += "c";
  }
  this.state_ & states.CAPS && (uiState += "l");
  return uiState;
};
i18n.input.keyboard.Controller.prototype.disposeInternal = function $i18n$input$keyboard$Controller$$disposeInternal$() {
  goog.dispose(this.activeView_);
  goog.dispose(this.model_);
  goog.dispose(this.statSession_);
  goog.dispose(this.eventHandler_);
  i18n.input.keyboard.Controller.superClass_.disposeInternal.call(this);
};
i18n.input.common.Inputable = function $i18n$input$common$Inputable$() {
};
goog.positioning.AbstractPosition = function $goog$positioning$AbstractPosition$() {
};
goog.positioning.AbstractPosition.prototype.reposition = function $goog$positioning$AbstractPosition$$reposition$() {
};
goog.positioning.AnchoredPosition = function $goog$positioning$AnchoredPosition$(anchorElement, corner, opt_overflow) {
  this.element = anchorElement;
  this.corner = corner;
  this.overflow_ = opt_overflow;
};
goog.inherits(goog.positioning.AnchoredPosition, goog.positioning.AbstractPosition);
goog.positioning.AnchoredPosition.prototype.reposition = function $goog$positioning$AnchoredPosition$$reposition$(movableElement, movableCorner, opt_margin) {
  goog.positioning.positionAtAnchor(this.element, this.corner, movableElement, movableCorner, void 0, opt_margin, this.overflow_);
};
i18n.input.keyboard.Standalone = function $i18n$input$keyboard$Standalone$() {
  this.activeInput_ = null;
  i18n.input.keyboard.Controller.getInstance().setInputable(this);
};
i18n.input.keyboard.Standalone.prototype.getEventTypes = function $i18n$input$keyboard$Standalone$$getEventTypes$() {
  return[goog.events.EventType.KEYDOWN, goog.events.EventType.KEYPRESS, goog.events.EventType.KEYUP];
};
i18n.input.keyboard.Standalone.prototype.handleEvent = function $i18n$input$keyboard$Standalone$$handleEvent$(e) {
  var ret = !1;
  if (!goog.array.contains(this.getEventTypes(), e.type)) {
    return!1;
  }
  var controller = i18n.input.keyboard.Controller.getInstance();
  controller.handleEvent(e) && (e.stopPropagation(), e.preventDefault());
  ret || (ret = void 0);
  return ret;
};
i18n.input.keyboard.Standalone.prototype.setActiveInput = function $i18n$input$keyboard$Standalone$$setActiveInput$(input) {
  var tag = input.tagName.toUpperCase(), type = input.type.toUpperCase();
  if (!("INPUT" != tag && "TEXTAREA" != tag || "INPUT" == tag && "TEXT" != type)) {
    for (var eventtypes = this.getEventTypes(), i = 0, et;et = eventtypes[i];++i) {
      this.activeInput_ && goog.events.unlisten(this.activeInput_, et, this.handleEvent, !1, this), input && goog.events.listen(input, et, this.handleEvent, !1, this);
    }
    this.activeInput_ = input;
  }
};
i18n.input.keyboard.Standalone.prototype.getTextBeforeCursor = function $i18n$input$keyboard$Standalone$$getTextBeforeCursor$() {
  if (!this.activeInput_) {
    return "";
  }
  if (document.selection) {
    var bookmark = document.selection.createRange().getBookmark(), selection = this.activeInput_.createTextRange();
    selection.moveToBookmark(bookmark);
    var before = this.activeInput_.createTextRange();
    before.collapse(!0);
    before.setEndPoint("EndToStart", selection);
    return before.text;
  }
  return this.activeInput_.value.slice(0, this.activeInput_.selectionStart);
};
i18n.input.keyboard.Standalone.prototype.commitText = function $i18n$input$keyboard$Standalone$$commitText$(text, opt_back) {
  if (this.activeInput_) {
    var back = opt_back ? opt_back : 0;
    if (document.selection) {
      var range = document.selection.createRange();
      range.parentElement() == this.activeInput_ && (!text && 1 == back && range.text && (back = 0), range.moveStart("character", -back), range.text = text, range.collapse(!1), range.select());
    } else {
      var value = this.activeInput_.value, from = this.activeInput_.selectionStart, to = this.activeInput_.selectionEnd;
      from > to && (from += to, to = from - to, from -= to);
      !text && 1 == back && from < to && (back = 0);
      // Test if removing variation sequence FE00 - FE0F or second part of supplementary character
      // If so, remove the extra character
      if (from > 0 && back > 0) {
        var last_code = value.slice(from-1, from)[0].charCodeAt();
        if (last_code >= 0xdc00 && last_code <= 0xdfff) back += 1;
        else if (last_code >= 0xfe00 && last_code <= 0xfe0f) back += 1;
      }

      from -= from < back ? from : back;
      var part1 = value.slice(0, from);
      var last1 = part1.substr(-1);
       this.activeInput_.value = value.slice(0, from) + text + value.slice(to);
      from += text.length;
      this.activeInput_.setSelectionRange(from, from);
    }
  }
};
i18n.input.keyboard.Standalone.prototype.setFocus = function $i18n$input$keyboard$Standalone$$setFocus$() {
  this.activeInput_ && this.activeInput_.focus();
};
(function() {
  goog.exportSymbol("i18n.input.keyboard.Keyboard", i18n.input.keyboard.Standalone);
  goog.exportSymbol("i18n.input.keyboard.EventType", i18n.input.keyboard.EventType);
  var prototype = i18n.input.keyboard.Standalone.prototype;
  goog.exportProperty(prototype, "register", prototype.setActiveInput);
  var controller = i18n.input.keyboard.Controller;
  goog.exportProperty(prototype, "loadLayout", function(layout) {
    controller.getInstance().loadLayout(layout);
  });
  goog.exportProperty(prototype, "activateLayout", function(layout) {
    controller.getInstance().activateLayout(layout);
  });
  goog.exportProperty(prototype, "setVisible", function(visible) {
    controller.getInstance().setVisible(visible);
  });
  goog.exportProperty(prototype, "reposition", function(anchorElement, anchorCorner, selfCorner, margins) {
    var anchoredPosition = new goog.positioning.AnchoredPosition(anchorElement, anchorCorner), marginBox;
    margins && 4 == margins.length && (marginBox = new goog.math.Box(margins[0], margins[1], margins[2], margins[3]));
    controller.getInstance().reposition(anchoredPosition, selfCorner, marginBox);
  });
  goog.exportProperty(prototype, "addEventListener", function(type, listener, opt_scope) {
    controller.getInstance().listen(type, listener, opt_scope);
  });
})();
i18n.input.keyboard.Controller.Css = ".vk-box,.vk-btn,.vk-btn-n,.vk-cap,.vk-cap-i,.vk-t,.vk-t-btn{display:inline-block;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none}.vk-box{height:auto;padding:10px;background-color:white;border:1px solid #b8b8b8;border:1px solid rgba(0,0,0,0.3);z-index:2147483644;font-family:arial,sans-serif;font-size:14px;position:fixed;box-shadow:0 4px 16px rgba(0,0,0,0.2)}.vk-box.vk-min{padding:2px}.vk-box.vk-sf-ie{border:1px solid #ccc}.vk-btn{border:1px solid #dcdcdc;border:1px solid rgba(0,0,0,0.1);width:29px;height:29px;margin:2px;text-align:center;vertical-align:middle;position:relative;padding:1px;min-width:0px;max-width:500px;min-height:0px;max-height:50px;color:#444;background-color:#f5f5f5;background-image:linear-gradient(top,#f5f5f5,#f1f1f1);background-image:-webkit-gradient(linear,left top,left bottom,from(#f5f5f5),to(#f1f1f1));background-image:-webkit-linear-gradient(top,#f5f5f5,#f1f1f1);background-image:-moz-linear-gradient(top,#f5f5f5,#f1f1f1);background-image:-ms-linear-gradient(top,#f5f5f5,#f1f1f1);background-image:-o-linear-gradient(top,#f5f5f5,#f1f1f1);background-image:linear-gradient(top,#f5f5f5,#f1f1f1);filter:progid:DXImageTransform.Microsoft.gradient(startColorStr='#f5f5f5',EndColorStr='#f1f1f1');border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px}.vk-btn.vk-sf-h{border-color:#c6c6c6;color:#222;background-color:#f8f8f8;background-image:-webkit-gradient(linear,left top,left bottom,from(#f8f8f8),to(#f1f1f1));background-image:-webkit-linear-gradient(top,#f8f8f8,#f1f1f1);background-image:-moz-linear-gradient(top,#f8f8f8,#f1f1f1);background-image:-ms-linear-gradient(top,#f8f8f8,#f1f1f1);background-image:-o-linear-gradient(top,#f8f8f8,#f1f1f1);background-image:linear-gradient(top,#f8f8f8,#f1f1f1);filter:progid:DXImageTransform.Microsoft.gradient(startColorStr='#f8f8f8',EndColorStr='#f1f1f1');box-shadow:0px 1px 1px rgba(0,0,0,0.1)}.vk-btn.vk-sf-a{border-color:#c6c6c6;color:#333;background-color:#f6f6f6;background-image:-webkit-gradient(linear,left top,left bottom,from(#f6f6f6),to(#f1f1f1));background-image:-webkit-linear-gradient(top,#f6f6f6,#f1f1f1);background-image:-moz-linear-gradient(top,#f6f6f6,#f1f1f1);background-image:-ms-linear-gradient(top,#f6f6f6,#f1f1f1);background-image:-o-linear-gradient(top,#f6f6f6,#f1f1f1);background-image:linear-gradient(top,#f6f6f6,#f1f1f1);filter:progid:DXImageTransform.Microsoft.gradient(startColorStr='#f6f6f6',EndColorStr='#f1f1f1');box-shadow:inset 0px 1px 2px rgba(0,0,0,0.1)}.vk-btn.vk-sf-s{border-color:#ccc;color:#333;background-color:#eeeeee;background-image:-webkit-gradient(linear,left top,left bottom,from(#eeeeee),to(#e0e0e0));background-image:-webkit-linear-gradient(top,#eeeeee,#e0e0e0);background-image:-moz-linear-gradient(top,#eeeeee,#e0e0e0);background-image:-ms-linear-gradient(top,#eeeeee,#e0e0e0);background-image:-o-linear-gradient(top,#eeeeee,#e0e0e0);background-image:linear-gradient(top,#eeeeee,#e0e0e0);filter:progid:DXImageTransform.Microsoft.gradient(startColorStr='#EEEEEE',EndColorStr='#E0E0E0');box-shadow:inset 0px 1px 2px rgba(0,0,0,0.1)}.vk-cap,.vk-t{font-size:14px;font-family:arial,sans-serif;font-weight:normal;line-height:25px}.vk-cap{cursor:default}.vk-cap.vk-sf-b,.vk-t-btn{background-repeat:no-repeat}.vk-cap.vk-sf-b{background-image:url('//ssl.gstatic.com/inputtools/images/ita_sprite6.png');width:22px;height:17px;opacity:.667}.vk-sf-ff2 .vk-cap.vk-sf-b{display:block;position:relative;left:6px;top:0}.vk-cap.vk-sf-b.vk-sf-h{opacity:.9}.vk-cap.vk-sf-b.vk-sf-c8{background-position:-714px -16px}.vk-cap.vk-sf-b.vk-sf-c20{background-position:-614px -66px}.vk-cap.vk-sf-b.vk-sf-c16{background-position:-814px -16px}.vk-cap.vk-sf-c273{font-size:14px}.vk-cap-i{border:none;width:20px;height:20px}.vk-t{height:24px;cursor:move;padding:0px 3px;color:black;display:inline-block;overflow:hidden;width:100%}.vk-t.vk-min{width:auto}.vk-t-btns{margin:0px;padding:0px;position:absolute;display:inline-block;white-space:nowrap;top:0}.vk-t-btns.vk-min{position:relative}.vk-t-btn{margin:0px;background-image:url('//ssl.gstatic.com/inputtools/images/ita_sprite6.png');height:14px!important;width:14px!important;opacity:.4;filter:alpha(opacity=40)}.vk-t-btn.vk-sf-hp{background-position:-670px -70px}.vk-t-btn.vk-sf-min{background-position:-720px -70px}.vk-t-btn.vk-sf-max{background-position:-770px -70px}.vk-t-btn.vk-sf-cl{background-position:-670px -20px}.vk-t-btn.vk-sf-th{opacity:1;filter:alpha(opacity=100)}.vk-t-btn-o{padding:13px 4px 8px 4px;cursor:default;display:inline-block;position:relative}.vk-t-btn-o.vk-min{padding:2px}.vk-t-btn-o.vk-sf-hp{cursor:pointer}";

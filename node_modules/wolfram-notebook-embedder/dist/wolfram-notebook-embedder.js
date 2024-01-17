(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.WolframNotebookEmbedder = {}));
})(this, (function (exports) { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var installedScripts = {};
  var libraryLoading = {};
  var counter = 0;
  var isStyleInsertionPatched = false;
  var insertedStyles = [];
  var styleInsertionCallbacks = [];

  function installScript(url) {
    if (!installedScripts[url]) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(script);
      installedScripts[url] = true;
    }
  }

  function loadLibrary(libraryURL) {
    if (!libraryLoading[libraryURL]) {
      libraryLoading[libraryURL] = new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onerror = reject;
        var callbackName;

        do {
          callbackName = '_wolframNotebookEmbedderCallback' + ++counter;
        } while (window[callbackName]);

        window[callbackName] = function (lib) {
          delete window[callbackName];
          resolve(lib);
        };

        script.src = libraryURL + '?callback=' + callbackName;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
      });
    }

    return libraryLoading[libraryURL];
  }

  function split(s, separators) {
    var before = null;
    var after = null;

    for (var i = 0; i < separators.length; ++i) {
      var sep = separators[i];
      var index = s.indexOf(sep);

      if (index >= 0 && (before === null || index < before.length)) {
        before = s.substring(0, index);
        after = s.substring(index + sep.length);
      }
    }

    return [before, after];
  }

  function isNotebookStyleElement(element, domains) {
    var name = element.tagName.toLowerCase();

    if (name === 'link' && (element.rel === 'stylesheet' || element.type === 'text/css')) {
      return domains.some(function (domain) {
        return element.href.startsWith(domain);
      });
    } else if (name === 'style') {
      if (element.dataset.isWolframNotebookStyle || element.innerText.indexOf('._ccc') >= 0) {
        return true;
      }

      if (element.id === 'erd_scroll_detection_scrollbar_style') {
        return true;
      }
    }

    return false;
  }

  function patchShadowStyleInsertion(container, domains) {
    function callback(element, allowMove) {
      var styleElement = allowMove && !element.didInsertWithoutCloning ? element : element.cloneNode(true);
      element.didInsertWithoutCloning = true;
      container.appendChild(styleElement);
    }

    function handleStyleElement(element, allowMove) {
      if (isNotebookStyleElement(element, domains)) {
        insertedStyles.push(element);
        styleInsertionCallbacks.forEach(function (cb) {
          cb(element, allowMove);
        });
        return true;
      }

      return false;
    }

    if (!isStyleInsertionPatched) {
      var existingLinks = document.getElementsByTagName('link');

      for (var i = 0; i < existingLinks.length; ++i) {
        handleStyleElement(existingLinks[i], false);
      }

      var existingStyles = document.getElementsByTagName('style');

      for (var _i = 0; _i < existingStyles.length; ++_i) {
        handleStyleElement(existingStyles[_i], false);
      }

      var head = document.getElementsByTagName('head')[0];

      if (head) {
        var originalAppendChild = head.appendChild;

        head.appendChild = function (child) {
          if (!handleStyleElement(child, true)) {
            originalAppendChild.call(this, child);
          }
        };
      }

      isStyleInsertionPatched = true;
    }

    insertedStyles.forEach(function (existingStyle) {
      callback(existingStyle, false);
    });
    styleInsertionCallbacks.push(callback);
    var index = styleInsertionCallbacks.length - 1;
    return function () {
      styleInsertionCallbacks.splice(index, 1);
    };
  }

  function getNotebookData(source) {
    var cloudBase = null;
    var params = '';
    var usePost = false;
    var notebookExpr = null;
    var notebookSource = {};

    if (typeof source === 'string') {
      var _split = split(source, ['/obj/', '/objects/']),
          domain = _split[0],
          remainingPaths = _split[1];

      if (!domain || !remainingPaths) {
        throw new Error('InvalidCloudObjectURL');
      }

      cloudBase = domain;
      var path = remainingPaths.split('?', 1)[0];

      if (!path) {
        throw new Error('InvalidCloudObjectURL');
      }

      params = 'path=' + encodeURIComponent(path);
    } else if (source && typeof source === 'object') {
      cloudBase = source.cloudBase || 'https://www.wolframcloud.com';
      notebookSource.cloudBase = cloudBase;
      var hasPath = typeof source.path !== 'undefined';
      var hasExpr = typeof source.expr !== 'undefined';
      var hasURL = typeof source.url !== 'undefined';
      var paramCount = (hasPath ? 1 : 0) + (hasExpr ? 1 : 0) + (hasURL ? 1 : 0);

      if (paramCount !== 1) {
        throw new Error('InvalidSourceParameters');
      }

      if (hasPath) {
        params = 'path=' + encodeURIComponent(source.path);
        notebookSource.path = source.path;
      } else if (hasURL) {
        params = 'url=' + encodeURIComponent(source.url);
        notebookSource.url = source.url;
      } else if (hasExpr) {
        notebookExpr = source.expr;
        params = 'expr=' + encodeURIComponent(source.expr);
        usePost = true;
        notebookSource.expr = source.expr;
      }
    }

    if (!cloudBase) {
      throw new Error('InvalidSource');
    }

    if (cloudBase.charAt(cloudBase.length - 1) === '/') {
      cloudBase = cloudBase.substring(0, cloudBase.length - 1);
    }

    var embeddingAPI = cloudBase + '/notebooks/embedding';

    if (!usePost) {
      embeddingAPI += '?' + params;
    }

    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.addEventListener('load', function () {
        if (req.status === 200) {
          var text = req.responseText;
          var data = JSON.parse(text);
          var extraData = data.extraData || [];
          extraData.notebookSource = notebookSource;
          resolve({
            notebookID: data.notebookID,
            mainScript: cloudBase + data.mainScript,
            otherScripts: (data.otherScripts || []).map(function (script) {
              return cloudBase + script;
            }),
            stylesheetDomains: [cloudBase].concat(data.stylesheetDomains),
            notebookExpr: notebookExpr,
            extraData: extraData
          });
        } else {
          reject(new Error('ResolveError'));
        }
      });
      req.addEventListener('error', function () {
        reject(new Error('RequestError'));
      });
      req.addEventListener('abort', function () {
        reject(new Error('RequestAborted'));
      });

      if (usePost) {
        req.open('POST', embeddingAPI, true);
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      } else {
        req.open('GET', embeddingAPI, true);
      }

      if (usePost) {
        req.send(params);
      } else {
        req.send();
      }
    });
  }

  function defaultValue(value, fallback) {
    if (value === undefined) {
      return fallback;
    } else {
      return value;
    }
  }

  function embed(source, node, options) {
    var theOptions = options || {};
    var _theOptions$useShadow = theOptions.useShadowDOM,
        useShadowDOM = _theOptions$useShadow === void 0 ? false : _theOptions$useShadow;
    var useShadow = useShadowDOM && node.attachShadow;
    var container;
    var shadowRoot;
    var containerNodes = [node];
    var cleanupHandlers = [];

    function onContainerDimensionsChange(_ref) {
      var width = _ref.width,
          height = _ref.height;
      containerNodes.forEach(function (containerNode) {
        if (width != null) {
          containerNode.style.width = width + "px";
        }

        if (height != null) {
          containerNode.style.height = height + "px";
        }
      });
    }

    return Promise.resolve().then(function () {
      if (useShadow) {
        var shadowHost = document.createElement('div');
        shadowHost.style.width = '100%';
        shadowHost.style.height = '100%';
        shadowRoot = shadowHost.attachShadow({
          mode: 'open'
        });
        container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        node.appendChild(shadowHost);
        Object.defineProperty(container, 'ownerDocument', {
          value: shadowRoot
        });

        shadowRoot.createElement = function () {
          var _document;

          return (_document = document).createElement.apply(_document, arguments);
        };

        shadowRoot.createElementNS = function () {
          var _document2;

          return (_document2 = document).createElementNS.apply(_document2, arguments);
        };

        shadowRoot.createTextNode = function () {
          var _document3;

          return (_document3 = document).createTextNode.apply(_document3, arguments);
        };

        shadowRoot.createDocumentFragment = function () {
          var _document4;

          return (_document4 = document).createDocumentFragment.apply(_document4, arguments);
        };

        shadowRoot.documentElement = container;
        shadowRoot.defaultView = window;
        containerNodes.push(shadowHost);
        containerNodes.push(container);
        shadowRoot.appendChild(container);
      } else {
        container = node;
      }

      return getNotebookData(source);
    }).then(function (_ref2) {
      var notebookID = _ref2.notebookID,
          mainScript = _ref2.mainScript,
          otherScripts = _ref2.otherScripts,
          stylesheetDomains = _ref2.stylesheetDomains,
          notebookExpr = _ref2.notebookExpr,
          extraData = _ref2.extraData;

      if (useShadow) {
        var cleanup = patchShadowStyleInsertion(shadowRoot, stylesheetDomains);
        cleanupHandlers.push(cleanup);

        for (var i = 0; i < node.children.length - 1; ++i) {
          container.appendChild(node.children[i]);
        }
      }

      for (var _i2 = 0; _i2 < otherScripts.length; ++_i2) {
        installScript(otherScripts[_i2]);
      }

      return loadLibrary(mainScript).then(function (lib) {
        return [notebookID, lib, notebookExpr, extraData];
      });
    }).then(function (_ref3) {
      var theNotebookID = _ref3[0],
          lib = _ref3[1],
          notebookExpr = _ref3[2],
          extraData = _ref3[3];
      return lib.embed(theNotebookID, container, {
        width: defaultValue(theOptions.width, null),
        maxHeight: defaultValue(theOptions.maxHeight, Infinity),
        showBorder: defaultValue(theOptions.showBorder, null),
        allowInteract: defaultValue(theOptions.allowInteract, true),
        showRenderProgress: defaultValue(theOptions.showRenderProgress, true),
        notebookExpr: notebookExpr,
        extraData: extraData,
        onContainerDimensionsChange: onContainerDimensionsChange
      });
    }).then(function (embedding) {
      return _extends({}, embedding, {
        detach: function detach() {
          embedding.detach();
          cleanupHandlers.forEach(function (cleanup) {
            cleanup();
          });
        },
        setAttributes: function setAttributes(attrs) {
          var width = attrs.width,
              maxHeight = attrs.maxHeight,
              showBorder = attrs.showBorder,
              allowInteract = attrs.allowInteract,
              showRenderProgress = attrs.showRenderProgress;
          embedding.setAttributes({
            width: width,
            maxHeight: maxHeight,
            showBorder: showBorder,
            allowInteract: allowInteract,
            showRenderProgress: showRenderProgress
          });
        }
      });
    });
  }
  var main = {
    embed: embed
  };

  exports["default"] = main;
  exports.embed = embed;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=wolfram-notebook-embedder.js.map

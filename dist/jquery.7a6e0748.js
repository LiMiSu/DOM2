// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"jquery.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// window.jQuery=function (selector) {
// // console.log('我是jQuery')
//     const elements=document.querySelectorAll(selector);
//     const api={
//         //api可以操作elements
//         // "addClass":function(className){};//最新的ES6语法可以省略function和冒号
//         addClass(className){
//             for (let i=0;i<elements.length;i++){//闭包：函数访问外部变量
//                 elements[i].classList.add(className);
//             }
//             // return api;//返回调用者可以链式调用 就是this 函数都能返回
//             return this;
//         }
//     }
//     return api;//返回的不是元素，而是可以操作的对象
// }
//可以：
// window.jQuery = function (selector) {
//     const elements = document.querySelectorAll(selector);
//     return {
//         addClass(className) {
//             for (let i = 0; i < elements.length; i++) {
//                 elements[i].classList.add(className);
//             }
//             return this;//这时候就没有api这个名字了，所以return this
//         }
//     }
// }
//总结！！！！：
//1、jQuery整体返回一个对象；   2、对象里面有各种api；   3、要调用api都要通过对象.api操作；
// 4、所以api里面的this在调用时都是返回的对象；   5、所以每个api里return this就是返回对象就可以一直链式调用！！！！
//开始
// window.jQuery = function (selector) {
//     const elements = document.querySelectorAll(selector);
//     return {
//         addClass(className) {
//             for (let i = 0; i < elements.length; i++) {
//                 elements[i].classList.add(className);
//             }
//             return this;
//         },
//         find(selector){
//             let array=[];
//             for (let i=0;i<elements.length;i++){
//                 // console.log(elements[i].querySelectorAll(selector));
//                 array = array.concat(Array.from(elements[i].querySelectorAll(selector)));
//             }
//             return array;//这样就不能链式调用了
//         }
//     }
// }
// window.jQuery = function (selectorOArray) {
//     let elements;
//     if (typeof selectorOArray==="string"){
//         elements = document.querySelectorAll(selectorOArray);
//     }else if (selectorOArray instanceof Array){
//         elements=selectorOArray;
//     }
//     return {
//         addClass(className) {
//             for (let i = 0; i < elements.length; i++) {
//                 elements[i].classList.add(className);
//             }
//             return this;
//         },
//         find(selector){
//             let array=[];
//             for (let i=0;i<elements.length;i++){
//                 // console.log(elements[i].querySelectorAll(selector));
//                 array = array.concat(Array.from(elements[i].querySelectorAll(selector)));
//             }
//             // const newApi = jQuery(array);//return一个新的api对象
//             // return newApi;//想办法链式调用，用不同的elements，互不污染，而且在内部又生成的jQuery对象能继承外部jQuery对象。闭包又来了吧
//             return jQuery(array);//总结就是：jQuery就是给他传什么它就会返回一个对象去操作什么，传啥操啥
//         },
//     }
// }
// window.jQuery = function (selectorOArray) {
//     let elements;
//     if (typeof selectorOArray === "string") {
//         elements = document.querySelectorAll(selectorOArray);
//     } else if (selectorOArray instanceof Array) {
//         elements = selectorOArray;
//     }
//     return {//api对象
//         addClass(className) {
//             for (let i = 0; i < elements.length; i++) {
//                 elements[i].classList.add(className);
//             }
//             return this;
//         },
//         find(selector) {
//             let array = [];
//             for (let i = 0; i < elements.length; i++) {
//                 array = array.concat(Array.from(elements[i].querySelectorAll(selector)));
//             }
//             //为了回退操作的时候找到原来的jQuery对象
//             array.oldApi = this;//this就是旧的api对象
//             return jQuery(array);//返回的新的api对象
//         },
//         oldApi: selectorOArray.oldApi,//要把数组里的oldApi挂到对象上来，链式调用是对象调用不是数组调用，不然访问不到
//         end() {//回退操作
//             return this.oldApi;//这里找得到是因为先有的return jQuery(array)才会有调用回退操作，是return jQuery(array)调用的end
//         }
//     }
// }
window.$ = window.jQuery = function (selectorOArray) {
  var elements;

  if (typeof selectorOArray === "string") {
    elements = document.querySelectorAll(selectorOArray);
  } else if (selectorOArray instanceof Array) {
    elements = selectorOArray;
  }

  var api = Object.create(jQuery.prototype); //相当于：const api={__proto__:jQuery.prototype};
  // api.elements = elements;
  // api.oldApi = selectorOArray.oldApi;
  //可以简写：浅复制

  Object.assign(api, {
    elements: elements,
    oldApi: selectorOArray.oldApi
  });
  return api;
};

jQuery.prototype = {
  constructor: jQuery,
  addClass: function addClass(className) {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className);
    }

    return this;
  },
  find: function find(selector) {
    var array = [];

    for (var i = 0; i < this.elements.length; i++) {
      array = array.concat(Array.from(this.elements[i].querySelectorAll(selector)));
    }

    array.oldApi = this;
    return jQuery(array);
  },
  end: function end() {
    return this.oldApi;
  },
  each: function each(fn) {
    for (var i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }

    return this;
  },
  parent: function parent() {
    var array = [];
    this.each(function (node) {
      if (array.indexOf(node.parentNode) === -1) {
        //判断一下是不是已经找到了，有时候会找好多次
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  //打印出
  print: function print() {
    console.log(this.elements);
  },
  children: function children() {
    var array = [];
    this.each(function (node) {
      array.push.apply(array, _toConsumableArray(node.children)); //把数组里面的数组拆开
    });
    return jQuery(array);
  },
  prev: function prev() {
    var array = [];
    this.each(function (node) {
      var last = node.previousSibling;

      if (last && last.nodeType === 3) {
        last = last.previousSibling;
      }

      array.push(last);
    });
    return jQuery(array);
  },
  next: function next() {
    var array = [];
    this.each(function (node) {
      var next = node.nextSibling;

      if (next && next.nodeType === 3) {
        next = next.nextSibling;
      }

      array.push(next);
    });
    return jQuery(array);
  },
  index: function index() {
    var array = [];
    this.each(function (node) {
      var list = Array.from(node.parentNode.childNodes).filter(function (n) {
        return n.nodeType === 1;
      });
      var i;

      for (i = 0; i < list.length; i++) {
        if (list[i] === node) {
          break;
        }
      }

      array.push(i);
    });
    return jQuery(array);
  },
  siblings: function siblings() {
    var array = [];
    this.each(function (node) {
      if (array.indexOf.apply(array, _toConsumableArray(Array.from(node.parentNode.childNodes).filter(function (n) {
        return n !== node;
      }))) === -1) array.push.apply(array, _toConsumableArray(Array.from(node.parentNode.childNodes).filter(function (n) {
        return n !== node;
      })));
    });
    return jQuery(array);
  }
};
},{}],"C:/Users/SuMi/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "13293" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/SuMi/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","jquery.js"], null)
//# sourceMappingURL=/jquery.7a6e0748.js.map
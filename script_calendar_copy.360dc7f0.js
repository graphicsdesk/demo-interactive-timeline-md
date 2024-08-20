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
})({"scripts/script_calendar_copy.js":[function(require,module,exports) {
var width, height;
var vbWidth, vbHeight;
var vbMinX = 0;
var vbMinY = 0;
var viewBox; // using d3 for convenience

var main = d3.select('main');
var scrolly = main.select('#scrolly');
var sticky = scrolly.select('#sticky-thing');
var article = scrolly.select('article');
var step = article.selectAll('.step');
document.addEventListener("DOMContentLoaded", function () {
  var width, height;
  var vbMinX = 0;
  var vbMinY = 0;
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var events = [{
    date: new Date('2024-08-26'),
    event_no: '1',
    label: 'First day of NSOP',
    segment: 'start',
    link: 'https://cdn.pixabay.com/photo/2017/05/11/16/40/emoji-2304720_1280.png'
  }, {
    date: new Date('2024-09-01'),
    event_no: '2',
    label: 'End of NSOP',
    segment: 'end'
  }, {
    date: new Date('2024-09-03'),
    event_no: '3',
    label: 'First day of class',
    segment: 'start',
    link: 'https://cdn.pixabay.com/photo/2016/08/21/18/48/emoticon-1610518_1280.png'
  }, {
    date: new Date('2024-09-13'),
    event_no: '4',
    label: 'End of shopping period',
    segment: 'end'
  }, {
    date: new Date('2024-10-08'),
    event_no: '5',
    label: 'Last day to drop classes',
    segment: 'na'
  }, {
    date: new Date('2024-10-17'),
    event_no: '6',
    label: 'Fall midterm date',
    segment: 'na',
    link: 'https://cdn.pixabay.com/photo/2016/04/01/00/28/face-1298202_640.png'
  }, {
    date: new Date('2024-10-26'),
    event_no: '7',
    label: 'Homecoming game',
    segment: 'na',
    link: 'https://st.depositphotos.com/1001911/1222/v/450/depositphotos_12221489-stock-illustration-big-smile-emoticon.jpg'
  }, {
    date: new Date('2024-11-04'),
    event_no: '8',
    label: 'Start of election holiday',
    segment: 'start',
    link: 'https://i.pinimg.com/736x/3b/54/30/3b543046fc90ac07131e54d4c3dde292.jpg'
  }, {
    date: new Date('2024-11-05'),
    event_no: '9',
    label: 'End of election holiday',
    segment: 'end'
  }, {
    date: new Date('2024-11-14'),
    event_no: '10',
    label: 'Last day to withdraw/PDF',
    segment: 'na'
  }, {
    date: new Date('2024-11-27'),
    event_no: '11',
    label: 'Start of Thanksgiving break',
    segment: 'start',
    link: 'https://i.pinimg.com/originals/a2/5c/19/a25c198273a072fc9a608ee01a3bff80.png'
  }, {
    date: new Date('2024-11-29'),
    event_no: '12',
    label: 'End of Thanksgiving break',
    segment: 'end'
  }, {
    date: new Date('2024-12-09'),
    event_no: '13',
    label: 'Last day of class',
    segment: 'na',
    link: 'https://t4.ftcdn.net/jpg/05/91/75/69/360_F_591756994_RWtNuVkWDKEIer7eozEne5xe3rZo2QbD.jpg'
  }, {
    date: new Date('2024-12-10'),
    event_no: '14',
    label: 'Start of reading period',
    segment: 'start',
    link: 'https://cdn.pixabay.com/photo/2017/05/11/16/40/emoji-2304720_1280.png'
  }, {
    date: new Date('2024-12-12'),
    event_no: '15',
    label: 'End of reading period',
    segment: 'end'
  }, {
    date: new Date('2024-12-13'),
    event_no: '16',
    label: 'Start of finals',
    segment: 'start'
  }, {
    date: new Date('2024-12-20'),
    event_no: '17',
    label: 'End of finals',
    segment: 'end'
  }];

  function createCalendar(month, year, container) {
    width = document.body.clientWidth;
    height = window.innerHeight;
    var cellSize = Math.min(width / 7, height / 8); // Adjust cell size based on viewport

    var firstDay = new Date(year, month, 1).getDay(); // Day of the week for the 1st of the month

    var daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month
    // Create SVG container

    var svg = d3.select(container).append("svg").attr("width", width).attr("height", height).style("display", "block").style("margin", "auto").attr("viewBox", "0 0 ".concat(width, " ").concat(height)).style("background", "#fff"); // Add month label

    svg.append("text").attr("x", width / 2).attr("y", cellSize / 4).attr("text-anchor", "middle").text(monthNames[month] + " " + year).style("font-weight", "bold").style("font-size", "16px"); // Add day headers

    svg.selectAll(".header").data(daysOfWeek).enter().append("text").attr("x", function (d, i) {
      return i * cellSize + cellSize / 2;
    }).attr("y", cellSize / 2 + 10).attr("text-anchor", "middle").text(function (d) {
      return d;
    }).style("font-weight", "bold"); // Add day cells

    svg.selectAll(".day").data(d3.range(daysInMonth)).enter().append("text").attr("x", function (d, i) {
      return (i + firstDay) % 7 * cellSize + cellSize / 2;
    }).attr("y", function (d) {
      return Math.floor((d + firstDay) / 7) * cellSize + cellSize + 30;
    }).attr("text-anchor", "middle").text(function (d) {
      return d + 1;
    }).style("font-size", "14px"); // Highlight events

    events.forEach(function (event) {
      if (event.date.getUTCMonth() === month && event.date.getUTCFullYear() === year) {
        var day = event.date.getUTCDate();
        var x = (day + firstDay - 1) % 7 * cellSize + cellSize / 2;
        var y = Math.floor((day + firstDay - 1) / 7) * cellSize + cellSize + 30;
        svg.append("circle").attr("cx", x).attr("cy", y).attr("r", 10).attr("fill", "red");

        if (event.link) {
          svg.append("image").attr("xlink:href", event.link).attr("x", x - 10).attr("y", y - 10).attr("width", 20).attr("height", 20);
        }
      }
    }); // Add grid lines

    svg.selectAll("line.vertical").data(d3.range(8)).enter().append("line").attr("class", "vertical").attr("x1", function (d) {
      return d * cellSize;
    }).attr("y1", 0).attr("x2", function (d) {
      return d * cellSize;
    }).attr("y2", height).attr("stroke", "#ddd");
    svg.selectAll("line.horizontal").data(d3.range(8)).enter().append("line").attr("class", "horizontal").attr("x1", 0).attr("y1", function (d) {
      return d * cellSize;
    }).attr("x2", width).attr("y2", function (d) {
      return d * cellSize;
    }).attr("stroke", "#ddd");
  }

  var months = [8, 9, 10, 11, 12]; // August to December

  var year = 2024;
  months.forEach(function (month) {
    createCalendar(month, year, '#calendars');
  });
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53647" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/script_calendar_copy.js"], "script")
//# sourceMappingURL=/script_calendar_copy.360dc7f0.js.map
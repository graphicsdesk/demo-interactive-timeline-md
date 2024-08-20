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
})({"../../node_modules/scrollama/build/scrollama.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.scrollama = factory());
}(this, (function () { 'use strict';

  // DOM helper functions

  // public
  function selectAll(selector, parent = document) {
    if (typeof selector === 'string') {
      return Array.from(parent.querySelectorAll(selector));
    } else if (selector instanceof Element) {
      return [selector];
    } else if (selector instanceof NodeList) {
      return Array.from(selector);
    } else if (selector instanceof Array) {
      return selector;
    }
    return [];
  }

  // SETUP
  function create(className) {
  	const el = document.createElement("div");
  	el.className = `scrollama__debug-step ${className}`;
  	el.style.position = "fixed";
  	el.style.left = "0";
  	el.style.width = "100%";
  	el.style.zIndex = "9999";
  	el.style.borderTop = "2px solid black";
  	el.style.borderBottom = "2px solid black";

  	const p = document.createElement("p");
  	p.style.position = "absolute";
  	p.style.left = "0";
  	p.style.height = "1px";
  	p.style.width = "100%";
  	p.style.borderTop = "1px dashed black";

  	el.appendChild(p);
  	document.body.appendChild(el);
  	return el;
  }

  // UPDATE
  function update({ id, step, marginTop }) {
  	const { index, height } = step;
  	const className = `scrollama__debug-step--${id}-${index}`;
  	let el = document.querySelector(`.${className}`);
  	if (!el) el = create(className);

  	el.style.top = `${marginTop * -1}px`;
  	el.style.height = `${height}px`;
  	el.querySelector("p").style.top = `${height / 2}px`;
  }

  function generateId() {
      const alphabet = "abcdefghijklmnopqrstuvwxyz";
      const date = Date.now();
      const result = [];
      for (let i = 0; i < 6; i += 1) {
        const char = alphabet[Math.floor(Math.random() * alphabet.length)];
        result.push(char);
      }
      return `${result.join("")}${date}`;
    }

  function err$1(msg) {
  	console.error(`scrollama error: ${msg}`);
  }

  function getIndex(node) {
  	return +node.getAttribute("data-scrollama-index");
  }

  function createProgressThreshold(height, threshold) {
      const count = Math.ceil(height / threshold);
      const t = [];
      const ratio = 1 / count;
      for (let i = 0; i < count + 1; i += 1) {
        t.push(i * ratio);
      }
      return t;
    }

  function parseOffset(x) {
  	if (typeof x === "string" && x.indexOf("px") > 0) {
  		const v = +x.replace("px", "");
  		if (!isNaN(v)) return { format: "pixels", value: v };
  		else {
  			err("offset value must be in 'px' format. Fallback to 0.5.");
  			return { format: "percent", value: 0.5 };
  		}
  	} else if (typeof x === "number" || !isNaN(+x)) {
  		if (x > 1) err("offset value is greater than 1. Fallback to 1.");
  		if (x < 0) err("offset value is lower than 0. Fallback to 0.");
  		return { format: "percent", value: Math.min(Math.max(0, x), 1) };
  	}
  	return null;
  }

  function indexSteps(steps) {
  	steps.forEach((step) =>
  		step.node.setAttribute("data-scrollama-index", step.index)
  	);
  }

  function getOffsetTop(node) {
    const { top } = node.getBoundingClientRect();
    const scrollTop = window.pageYOffset;
    const clientTop = document.body.clientTop || 0;
    return top + scrollTop - clientTop;
  }

  let currentScrollY;
  let comparisonScrollY;
  let direction;

  function onScroll(container) {
  	const scrollTop = container ? container.scrollTop : window.pageYOffset;

  	if (currentScrollY === scrollTop) return;
  	currentScrollY = scrollTop;
  	if (currentScrollY > comparisonScrollY) direction = "down";
  	else if (currentScrollY < comparisonScrollY) direction = "up";
  	comparisonScrollY = currentScrollY;
  }

  function setupScroll(container) {
  	currentScrollY = 0;
  	comparisonScrollY = 0;
  	document.addEventListener("scroll", () => onScroll(container));
  }

  function scrollama() {
  	let cb = {};

  	let id = generateId();
  	let steps = [];
  	let globalOffset;
  	let containerElement;
  	let rootElement;

  	let progressThreshold = 0;

  	let isEnabled = false;
  	let isProgress = false;
  	let isDebug = false;
  	let isTriggerOnce = false;

  	let exclude = [];

  	/* HELPERS */
  	function reset() {
  		cb = {
  			stepEnter: () => { },
  			stepExit: () => { },
  			stepProgress: () => { },
  		};
  		exclude = [];
  	}

  	function handleEnable(shouldEnable) {
  		if (shouldEnable && !isEnabled) updateObservers();
  		if (!shouldEnable && isEnabled) disconnectObservers();
  		isEnabled = shouldEnable;
  	}

  	/* NOTIFY CALLBACKS */
  	function notifyProgress(element, progress) {
  		const index = getIndex(element);
  		const step = steps[index];
  		if (progress !== undefined) step.progress = progress;
  		const response = { element, index, progress, direction };
  		if (step.state === "enter") cb.stepProgress(response);
  	}

  	function notifyStepEnter(element, check = true) {
  		const index = getIndex(element);
  		const step = steps[index];
  		const response = { element, index, direction };

  		step.direction = direction;
  		step.state = "enter";

  		// if (isPreserveOrder && check && direction !== "up")
  		//   notifyOthers(index, "above");
  		// if (isPreserveOrder && check && direction === "up")
  		//   notifyOthers(index, "below");

  		if (!exclude[index]) cb.stepEnter(response);
  		if (isTriggerOnce) exclude[index] = true;
  	}

  	function notifyStepExit(element, check = true) {
  		const index = getIndex(element);
  		const step = steps[index];

  		if (!step.state) return false;

  		const response = { element, index, direction };

  		if (isProgress) {
  			if (direction === "down" && step.progress < 1) notifyProgress(element, 1);
  			else if (direction === "up" && step.progress > 0)
  				notifyProgress(element, 0);
  		}

  		step.direction = direction;
  		step.state = "exit";

  		cb.stepExit(response);
  	}

  	/* OBSERVERS - HANDLING */
  	function resizeStep([entry]) {
  		const index = getIndex(entry.target);
  		const step = steps[index];
  		const h = entry.target.offsetHeight;
  		if (h !== step.height) {
  			step.height = h;
  			disconnectObserver(step);
  			updateStepObserver(step);
  			updateResizeObserver(step);
  		}
  	}

  	function intersectStep([entry]) {
  		onScroll(containerElement);

  		const { isIntersecting, target } = entry;
  		if (isIntersecting) notifyStepEnter(target);
  		else notifyStepExit(target);
  	}

  	function intersectProgress([entry]) {
  		const index = getIndex(entry.target);
  		const step = steps[index];
  		const { isIntersecting, intersectionRatio, target } = entry;
  		if (isIntersecting && step.state === "enter")
  			notifyProgress(target, intersectionRatio);
  	}

  	/*  OBSERVERS - CREATION */
  	function disconnectObserver({ observers }) {
  		Object.keys(observers).map((name) => {
  			observers[name].disconnect();
  		});
  	}

  	function disconnectObservers() {
  		steps.forEach(disconnectObserver);
  	}

  	function updateResizeObserver(step) {
  		const observer = new ResizeObserver(resizeStep);
  		observer.observe(step.node);
  		step.observers.resize = observer;
  	}

  	function updateResizeObservers() {
  		steps.forEach(updateResizeObserver);
  	}

  	function updateStepObserver(step) {
  		const h = window.innerHeight;
  		const off = step.offset || globalOffset;
  		const factor = off.format === "pixels" ? 1 : h;
  		const offset = off.value * factor;
  		const marginTop = step.height / 2 - offset;
  		const marginBottom = step.height / 2 - (h - offset);
  		const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
  		const root = rootElement;

  		const threshold = 0.5;
  		const options = { rootMargin, threshold, root };
  		const observer = new IntersectionObserver(intersectStep, options);

  		observer.observe(step.node);
  		step.observers.step = observer;

  		if (isDebug) update({ id, step, marginTop, marginBottom });
  	}

  	function updateStepObservers() {
  		steps.forEach(updateStepObserver);
  	}

  	function updateProgressObserver(step) {
  		const h = window.innerHeight;
  		const off = step.offset || globalOffset;
  		const factor = off.format === "pixels" ? 1 : h;
  		const offset = off.value * factor;
  		const marginTop = -offset + step.height;
  		const marginBottom = offset - h;
  		const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;

  		const threshold = createProgressThreshold(step.height, progressThreshold);
  		const options = { rootMargin, threshold };
  		const observer = new IntersectionObserver(intersectProgress, options);

  		observer.observe(step.node);
  		step.observers.progress = observer;
  	}

  	function updateProgressObservers() {
  		steps.forEach(updateProgressObserver);
  	}

  	function updateObservers() {
  		disconnectObservers();
  		updateResizeObservers();
  		updateStepObservers();
  		if (isProgress) updateProgressObservers();
  	}

  	/* SETUP */
  	const S = {};

  	S.setup = ({
  		step,
  		parent,
  		offset = 0.5,
  		threshold = 4,
  		progress = false,
  		once = false,
  		debug = false,
  		container = undefined,
  		root = null
  	}) => {

  		setupScroll(container);

  		steps = selectAll(step, parent).map((node, index) => ({
  			index,
  			direction: undefined,
  			height: node.offsetHeight,
  			node,
  			observers: {},
  			offset: parseOffset(node.dataset.offset),
  			top: getOffsetTop(node),
  			progress: 0,
  			state: undefined,
  		}));

  		if (!steps.length) {
  			err$1("no step elements");
  			return S;
  		}

  		isProgress = progress;
  		isTriggerOnce = once;
  		isDebug = debug;
  		progressThreshold = Math.max(1, +threshold);
  		globalOffset = parseOffset(offset);
  		containerElement = container;
  		rootElement = root;

  		reset();
  		indexSteps(steps);
  		handleEnable(true);
  		return S;
  	};

  	S.enable = () => {
  		handleEnable(true);
  		return S;
  	};

  	S.disable = () => {
  		handleEnable(false);
  		return S;
  	};

  	S.destroy = () => {
  		handleEnable(false);
  		reset();
  		return S;
  	};

  	S.resize = () => {
  		updateObservers();
  		return S;
  	};

  	S.offset = (x) => {
  		if (x === null || x === undefined) return globalOffset.value;
  		globalOffset = parseOffset(x);
  		updateObservers();
  		return S;
  	};

  	S.onStepEnter = (f) => {
  		if (typeof f === "function") cb.stepEnter = f;
  		else err$1("onStepEnter requires a function");
  		return S;
  	};

  	S.onStepExit = (f) => {
  		if (typeof f === "function") cb.stepExit = f;
  		else err$1("onStepExit requires a function");
  		return S;
  	};

  	S.onStepProgress = (f) => {
  		if (typeof f === "function") cb.stepProgress = f;
  		else err$1("onStepProgress requires a function");
  		return S;
  	};
  	return S;
  }

  return scrollama;

})));

},{}],"../../node_modules/d3-selection/src/namespaces.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xhtml = exports.default = void 0;
var xhtml = exports.xhtml = "http://www.w3.org/1999/xhtml";

var _default = exports.default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
},{}],"../../node_modules/d3-selection/src/namespace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _namespaces = _interopRequireDefault(require("./namespaces"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function _default(name) {
  var prefix = name += "",
      i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return _namespaces.default.hasOwnProperty(prefix) ? {
    space: _namespaces.default[prefix],
    local: name
  } : name;
}
},{"./namespaces":"../../node_modules/d3-selection/src/namespaces.js"}],"../../node_modules/d3-selection/src/creator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _namespace = _interopRequireDefault(require("./namespace"));

var _namespaces = require("./namespaces");

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function creatorInherit(name) {
  return function () {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === _namespaces.xhtml && document.documentElement.namespaceURI === _namespaces.xhtml ? document.createElement(name) : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function () {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function _default(name) {
  var fullname = (0, _namespace.default)(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
},{"./namespace":"../../node_modules/d3-selection/src/namespace.js","./namespaces":"../../node_modules/d3-selection/src/namespaces.js"}],"../../node_modules/d3-selection/src/selector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function none() {}

function _default(selector) {
  return selector == null ? none : function () {
    return this.querySelector(selector);
  };
}
},{}],"../../node_modules/d3-selection/src/selection/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

var _selector = _interopRequireDefault(require("../selector"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function _default(select) {
  if (typeof select !== "function") select = (0, _selector.default)(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new _index.Selection(subgroups, this._parents);
}
},{"./index":"../../node_modules/d3-selection/src/selection/index.js","../selector":"../../node_modules/d3-selection/src/selector.js"}],"../../node_modules/d3-selection/src/selectorAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function empty() {
  return [];
}

function _default(selector) {
  return selector == null ? empty : function () {
    return this.querySelectorAll(selector);
  };
}
},{}],"../../node_modules/d3-selection/src/selection/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

var _selectorAll = _interopRequireDefault(require("../selectorAll"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function _default(select) {
  if (typeof select !== "function") select = (0, _selectorAll.default)(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new _index.Selection(subgroups, parents);
}
},{"./index":"../../node_modules/d3-selection/src/selection/index.js","../selectorAll":"../../node_modules/d3-selection/src/selectorAll.js"}],"../../node_modules/d3-selection/src/matcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(selector) {
  return function () {
    return this.matches(selector);
  };
}
},{}],"../../node_modules/d3-selection/src/selection/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

var _matcher = _interopRequireDefault(require("../matcher"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function _default(match) {
  if (typeof match !== "function") match = (0, _matcher.default)(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new _index.Selection(subgroups, this._parents);
}
},{"./index":"../../node_modules/d3-selection/src/selection/index.js","../matcher":"../../node_modules/d3-selection/src/matcher.js"}],"../../node_modules/d3-selection/src/selection/sparse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(update) {
  return new Array(update.length);
}
},{}],"../../node_modules/d3-selection/src/selection/enter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnterNode = EnterNode;
exports.default = _default;

var _sparse = _interopRequireDefault(require("./sparse"));

var _index = require("./index");

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function _default() {
  return new _index.Selection(this._enter || this._groups.map(_sparse.default), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function (child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function (child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function (selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function (selector) {
    return this._parent.querySelectorAll(selector);
  }
};
},{"./sparse":"../../node_modules/d3-selection/src/selection/sparse.js","./index":"../../node_modules/d3-selection/src/selection/index.js"}],"../../node_modules/d3-selection/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return function () {
    return x;
  };
}
},{}],"../../node_modules/d3-selection/src/selection/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

var _enter = require("./enter");

var _constant = _interopRequireDefault(require("../constant"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length; // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.

  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  } // Put any non-null nodes that don’t fit into exit.


  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue; // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.

  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);

      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  } // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.


  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);

    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  } // Add any remaining nodes that were not bound to data to exit.


  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
      exit[i] = node;
    }
  }
}

function _default(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function (d) {
      data[++j] = d;
    });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;
  if (typeof value !== "function") value = (0, _constant.default)(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key); // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.

    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;

        while (!(next = updateGroup[i1]) && ++i1 < dataLength);

        previous._next = next || null;
      }
    }
  }

  update = new _index.Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
},{"./index":"../../node_modules/d3-selection/src/selection/index.js","./enter":"../../node_modules/d3-selection/src/selection/enter.js","../constant":"../../node_modules/d3-selection/src/constant.js"}],"../../node_modules/d3-selection/src/selection/exit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sparse = _interopRequireDefault(require("./sparse"));

var _index = require("./index");

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function _default() {
  return new _index.Selection(this._exit || this._groups.map(_sparse.default), this._parents);
}
},{"./sparse":"../../node_modules/d3-selection/src/selection/sparse.js","./index":"../../node_modules/d3-selection/src/selection/index.js"}],"../../node_modules/d3-selection/src/selection/join.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(onenter, onupdate, onexit) {
  var enter = this.enter(),
      update = this,
      exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
},{}],"../../node_modules/d3-selection/src/selection/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

function _default(selection) {
  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new _index.Selection(merges, this._parents);
}
},{"./index":"../../node_modules/d3-selection/src/selection/index.js"}],"../../node_modules/d3-selection/src/selection/order.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}
},{}],"../../node_modules/d3-selection/src/selection/sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

function _default(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }

    sortgroup.sort(compareNode);
  }

  return new _index.Selection(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
},{"./index":"../../node_modules/d3-selection/src/selection/index.js"}],"../../node_modules/d3-selection/src/selection/call.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
},{}],"../../node_modules/d3-selection/src/selection/nodes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var nodes = new Array(this.size()),
      i = -1;
  this.each(function () {
    nodes[++i] = this;
  });
  return nodes;
}
},{}],"../../node_modules/d3-selection/src/selection/node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}
},{}],"../../node_modules/d3-selection/src/selection/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var size = 0;
  this.each(function () {
    ++size;
  });
  return size;
}
},{}],"../../node_modules/d3-selection/src/selection/empty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  return !this.node();
}
},{}],"../../node_modules/d3-selection/src/selection/each.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}
},{}],"../../node_modules/d3-selection/src/selection/attr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _namespace = _interopRequireDefault(require("../namespace"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function () {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function () {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function _default(name, value) {
  var fullname = (0, _namespace.default)(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }

  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
},{"../namespace":"../../node_modules/d3-selection/src/namespace.js"}],"../../node_modules/d3-selection/src/window.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || // node is a Node
  node.document && node // node is a Window
  || node.defaultView; // node is a Document
}
},{}],"../../node_modules/d3-selection/src/selection/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.styleValue = styleValue;

var _window = _interopRequireDefault(require("../window"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function () {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
  };
}

function _default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name) || (0, _window.default)(node).getComputedStyle(node, null).getPropertyValue(name);
}
},{"../window":"../../node_modules/d3-selection/src/window.js"}],"../../node_modules/d3-selection/src/selection/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function propertyRemove(name) {
  return function () {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function () {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];else this[name] = v;
  };
}

function _default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
},{}],"../../node_modules/d3-selection/src/selection/classed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function (name) {
    var i = this._names.indexOf(name);

    if (i < 0) {
      this._names.push(name);

      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function (name) {
    var i = this._names.indexOf(name);

    if (i >= 0) {
      this._names.splice(i, 1);

      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function (name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node),
      i = -1,
      n = names.length;

  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node),
      i = -1,
      n = names.length;

  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function () {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function () {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function () {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function _default(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()),
        i = -1,
        n = names.length;

    while (++i < n) if (!list.contains(names[i])) return false;

    return true;
  }

  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
},{}],"../../node_modules/d3-selection/src/selection/text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function _default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
},{}],"../../node_modules/d3-selection/src/selection/html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function () {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function _default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
},{}],"../../node_modules/d3-selection/src/selection/raise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function _default() {
  return this.each(raise);
}
},{}],"../../node_modules/d3-selection/src/selection/lower.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function _default() {
  return this.each(lower);
}
},{}],"../../node_modules/d3-selection/src/selection/append.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _creator = _interopRequireDefault(require("../creator"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function _default(name) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name);
  return this.select(function () {
    return this.appendChild(create.apply(this, arguments));
  });
}
},{"../creator":"../../node_modules/d3-selection/src/creator.js"}],"../../node_modules/d3-selection/src/selection/insert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _creator = _interopRequireDefault(require("../creator"));

var _selector = _interopRequireDefault(require("../selector"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function constantNull() {
  return null;
}

function _default(name, before) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name),
      select = before == null ? constantNull : typeof before === "function" ? before : (0, _selector.default)(before);
  return this.select(function () {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}
},{"../creator":"../../node_modules/d3-selection/src/creator.js","../selector":"../../node_modules/d3-selection/src/selector.js"}],"../../node_modules/d3-selection/src/selection/remove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function _default() {
  return this.each(remove);
}
},{}],"../../node_modules/d3-selection/src/selection/clone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function selection_cloneShallow() {
  var clone = this.cloneNode(false),
      parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true),
      parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function _default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
},{}],"../../node_modules/d3-selection/src/selection/datum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
},{}],"../../node_modules/d3-selection/src/selection/on.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customEvent = customEvent;
exports.default = _default;
exports.event = void 0;
var filterEvents = {};
var event = exports.event = null;

if (typeof document !== "undefined") {
  var element = document.documentElement;

  if (!("onmouseenter" in element)) {
    filterEvents = {
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    };
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function (event) {
    var related = event.relatedTarget;

    if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function (event1) {
    var event0 = event; // Events can be reentrant (e.g., focus).

    exports.event = event = event1;

    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      exports.event = event = event0;
    }
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
        i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name: name
    };
  });
}

function onRemove(typename) {
  return function () {
    var on = this.__on;
    if (!on) return;

    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }

    if (++i) on.length = i;else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function (d, i, group) {
    var on = this.__on,
        o,
        listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {
      type: typename.type,
      name: typename.name,
      value: value,
      listener: listener,
      capture: capture
    };
    if (!on) this.__on = [o];else on.push(o);
  };
}

function _default(typename, value, capture) {
  var typenames = parseTypenames(typename + ""),
      i,
      n = typenames.length,
      t;

  if (arguments.length < 2) {
    var on = this.node().__on;

    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;

  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));

  return this;
}

function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  exports.event = event = event1;

  try {
    return listener.apply(that, args);
  } finally {
    exports.event = event = event0;
  }
}
},{}],"../../node_modules/d3-selection/src/selection/dispatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _window = _interopRequireDefault(require("../window"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function dispatchEvent(node, type, params) {
  var window = (0, _window.default)(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function () {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function () {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function _default(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
},{"../window":"../../node_modules/d3-selection/src/window.js"}],"../../node_modules/d3-selection/src/selection/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selection = Selection;
exports.root = exports.default = void 0;

var _select = _interopRequireDefault(require("./select"));

var _selectAll = _interopRequireDefault(require("./selectAll"));

var _filter = _interopRequireDefault(require("./filter"));

var _data = _interopRequireDefault(require("./data"));

var _enter = _interopRequireDefault(require("./enter"));

var _exit = _interopRequireDefault(require("./exit"));

var _join = _interopRequireDefault(require("./join"));

var _merge = _interopRequireDefault(require("./merge"));

var _order = _interopRequireDefault(require("./order"));

var _sort = _interopRequireDefault(require("./sort"));

var _call = _interopRequireDefault(require("./call"));

var _nodes = _interopRequireDefault(require("./nodes"));

var _node = _interopRequireDefault(require("./node"));

var _size = _interopRequireDefault(require("./size"));

var _empty = _interopRequireDefault(require("./empty"));

var _each = _interopRequireDefault(require("./each"));

var _attr = _interopRequireDefault(require("./attr"));

var _style = _interopRequireDefault(require("./style"));

var _property = _interopRequireDefault(require("./property"));

var _classed = _interopRequireDefault(require("./classed"));

var _text = _interopRequireDefault(require("./text"));

var _html = _interopRequireDefault(require("./html"));

var _raise = _interopRequireDefault(require("./raise"));

var _lower = _interopRequireDefault(require("./lower"));

var _append = _interopRequireDefault(require("./append"));

var _insert = _interopRequireDefault(require("./insert"));

var _remove = _interopRequireDefault(require("./remove"));

var _clone = _interopRequireDefault(require("./clone"));

var _datum = _interopRequireDefault(require("./datum"));

var _on = _interopRequireDefault(require("./on"));

var _dispatch = _interopRequireDefault(require("./dispatch"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

var root = exports.root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: _select.default,
  selectAll: _selectAll.default,
  filter: _filter.default,
  data: _data.default,
  enter: _enter.default,
  exit: _exit.default,
  join: _join.default,
  merge: _merge.default,
  order: _order.default,
  sort: _sort.default,
  call: _call.default,
  nodes: _nodes.default,
  node: _node.default,
  size: _size.default,
  empty: _empty.default,
  each: _each.default,
  attr: _attr.default,
  style: _style.default,
  property: _property.default,
  classed: _classed.default,
  text: _text.default,
  html: _html.default,
  raise: _raise.default,
  lower: _lower.default,
  append: _append.default,
  insert: _insert.default,
  remove: _remove.default,
  clone: _clone.default,
  datum: _datum.default,
  on: _on.default,
  dispatch: _dispatch.default
};

var _default = exports.default = selection;
},{"./select":"../../node_modules/d3-selection/src/selection/select.js","./selectAll":"../../node_modules/d3-selection/src/selection/selectAll.js","./filter":"../../node_modules/d3-selection/src/selection/filter.js","./data":"../../node_modules/d3-selection/src/selection/data.js","./enter":"../../node_modules/d3-selection/src/selection/enter.js","./exit":"../../node_modules/d3-selection/src/selection/exit.js","./join":"../../node_modules/d3-selection/src/selection/join.js","./merge":"../../node_modules/d3-selection/src/selection/merge.js","./order":"../../node_modules/d3-selection/src/selection/order.js","./sort":"../../node_modules/d3-selection/src/selection/sort.js","./call":"../../node_modules/d3-selection/src/selection/call.js","./nodes":"../../node_modules/d3-selection/src/selection/nodes.js","./node":"../../node_modules/d3-selection/src/selection/node.js","./size":"../../node_modules/d3-selection/src/selection/size.js","./empty":"../../node_modules/d3-selection/src/selection/empty.js","./each":"../../node_modules/d3-selection/src/selection/each.js","./attr":"../../node_modules/d3-selection/src/selection/attr.js","./style":"../../node_modules/d3-selection/src/selection/style.js","./property":"../../node_modules/d3-selection/src/selection/property.js","./classed":"../../node_modules/d3-selection/src/selection/classed.js","./text":"../../node_modules/d3-selection/src/selection/text.js","./html":"../../node_modules/d3-selection/src/selection/html.js","./raise":"../../node_modules/d3-selection/src/selection/raise.js","./lower":"../../node_modules/d3-selection/src/selection/lower.js","./append":"../../node_modules/d3-selection/src/selection/append.js","./insert":"../../node_modules/d3-selection/src/selection/insert.js","./remove":"../../node_modules/d3-selection/src/selection/remove.js","./clone":"../../node_modules/d3-selection/src/selection/clone.js","./datum":"../../node_modules/d3-selection/src/selection/datum.js","./on":"../../node_modules/d3-selection/src/selection/on.js","./dispatch":"../../node_modules/d3-selection/src/selection/dispatch.js"}],"../../node_modules/d3-selection/src/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./selection/index");

function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([[document.querySelector(selector)]], [document.documentElement]) : new _index.Selection([[selector]], _index.root);
}
},{"./selection/index":"../../node_modules/d3-selection/src/selection/index.js"}],"../../node_modules/d3-selection/src/create.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _creator = _interopRequireDefault(require("./creator"));

var _select = _interopRequireDefault(require("./select"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function _default(name) {
  return (0, _select.default)((0, _creator.default)(name).call(document.documentElement));
}
},{"./creator":"../../node_modules/d3-selection/src/creator.js","./select":"../../node_modules/d3-selection/src/select.js"}],"../../node_modules/d3-selection/src/local.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = local;
var nextId = 0;

function local() {
  return new Local();
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function (node) {
    var id = this._;

    while (!(id in node)) if (!(node = node.parentNode)) return;

    return node[id];
  },
  set: function (node, value) {
    return node[this._] = value;
  },
  remove: function (node) {
    return this._ in node && delete node[this._];
  },
  toString: function () {
    return this._;
  }
};
},{}],"../../node_modules/d3-selection/src/sourceEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _on = require("./selection/on");

function _default() {
  var current = _on.event,
      source;

  while (source = current.sourceEvent) current = source;

  return current;
}
},{"./selection/on":"../../node_modules/d3-selection/src/selection/on.js"}],"../../node_modules/d3-selection/src/point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(node, event) {
  var svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
}
},{}],"../../node_modules/d3-selection/src/mouse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));

var _point = _interopRequireDefault(require("./point"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function _default(node) {
  var event = (0, _sourceEvent.default)();
  if (event.changedTouches) event = event.changedTouches[0];
  return (0, _point.default)(node, event);
}
},{"./sourceEvent":"../../node_modules/d3-selection/src/sourceEvent.js","./point":"../../node_modules/d3-selection/src/point.js"}],"../../node_modules/d3-selection/src/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./selection/index");

function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([document.querySelectorAll(selector)], [document.documentElement]) : new _index.Selection([selector == null ? [] : selector], _index.root);
}
},{"./selection/index":"../../node_modules/d3-selection/src/selection/index.js"}],"../../node_modules/d3-selection/src/touch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));

var _point = _interopRequireDefault(require("./point"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function _default(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = (0, _sourceEvent.default)().changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return (0, _point.default)(node, touch);
    }
  }

  return null;
}
},{"./sourceEvent":"../../node_modules/d3-selection/src/sourceEvent.js","./point":"../../node_modules/d3-selection/src/point.js"}],"../../node_modules/d3-selection/src/touches.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));

var _point = _interopRequireDefault(require("./point"));

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

function _default(node, touches) {
  if (touches == null) touches = (0, _sourceEvent.default)().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = (0, _point.default)(node, touches[i]);
  }

  return points;
}
},{"./sourceEvent":"../../node_modules/d3-selection/src/sourceEvent.js","./point":"../../node_modules/d3-selection/src/point.js"}],"../../node_modules/d3-selection/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "clientPoint", {
  enumerable: true,
  get: function () {
    return _point.default;
  }
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function () {
    return _create.default;
  }
});
Object.defineProperty(exports, "creator", {
  enumerable: true,
  get: function () {
    return _creator.default;
  }
});
Object.defineProperty(exports, "customEvent", {
  enumerable: true,
  get: function () {
    return _on.customEvent;
  }
});
Object.defineProperty(exports, "event", {
  enumerable: true,
  get: function () {
    return _on.event;
  }
});
Object.defineProperty(exports, "local", {
  enumerable: true,
  get: function () {
    return _local.default;
  }
});
Object.defineProperty(exports, "matcher", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "mouse", {
  enumerable: true,
  get: function () {
    return _mouse.default;
  }
});
Object.defineProperty(exports, "namespace", {
  enumerable: true,
  get: function () {
    return _namespace.default;
  }
});
Object.defineProperty(exports, "namespaces", {
  enumerable: true,
  get: function () {
    return _namespaces.default;
  }
});
Object.defineProperty(exports, "select", {
  enumerable: true,
  get: function () {
    return _select.default;
  }
});
Object.defineProperty(exports, "selectAll", {
  enumerable: true,
  get: function () {
    return _selectAll.default;
  }
});
Object.defineProperty(exports, "selection", {
  enumerable: true,
  get: function () {
    return _index.default;
  }
});
Object.defineProperty(exports, "selector", {
  enumerable: true,
  get: function () {
    return _selector.default;
  }
});
Object.defineProperty(exports, "selectorAll", {
  enumerable: true,
  get: function () {
    return _selectorAll.default;
  }
});
Object.defineProperty(exports, "style", {
  enumerable: true,
  get: function () {
    return _style.styleValue;
  }
});
Object.defineProperty(exports, "touch", {
  enumerable: true,
  get: function () {
    return _touch.default;
  }
});
Object.defineProperty(exports, "touches", {
  enumerable: true,
  get: function () {
    return _touches.default;
  }
});
Object.defineProperty(exports, "window", {
  enumerable: true,
  get: function () {
    return _window.default;
  }
});

var _create = _interopRequireDefault(require("./create"));

var _creator = _interopRequireDefault(require("./creator"));

var _local = _interopRequireDefault(require("./local"));

var _matcher = _interopRequireDefault(require("./matcher"));

var _mouse = _interopRequireDefault(require("./mouse"));

var _namespace = _interopRequireDefault(require("./namespace"));

var _namespaces = _interopRequireDefault(require("./namespaces"));

var _point = _interopRequireDefault(require("./point"));

var _select = _interopRequireDefault(require("./select"));

var _selectAll = _interopRequireDefault(require("./selectAll"));

var _index = _interopRequireDefault(require("./selection/index"));

var _selector = _interopRequireDefault(require("./selector"));

var _selectorAll = _interopRequireDefault(require("./selectorAll"));

var _style = require("./selection/style");

var _touch = _interopRequireDefault(require("./touch"));

var _touches = _interopRequireDefault(require("./touches"));

var _window = _interopRequireDefault(require("./window"));

var _on = require("./selection/on");

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./create":"../../node_modules/d3-selection/src/create.js","./creator":"../../node_modules/d3-selection/src/creator.js","./local":"../../node_modules/d3-selection/src/local.js","./matcher":"../../node_modules/d3-selection/src/matcher.js","./mouse":"../../node_modules/d3-selection/src/mouse.js","./namespace":"../../node_modules/d3-selection/src/namespace.js","./namespaces":"../../node_modules/d3-selection/src/namespaces.js","./point":"../../node_modules/d3-selection/src/point.js","./select":"../../node_modules/d3-selection/src/select.js","./selectAll":"../../node_modules/d3-selection/src/selectAll.js","./selection/index":"../../node_modules/d3-selection/src/selection/index.js","./selector":"../../node_modules/d3-selection/src/selector.js","./selectorAll":"../../node_modules/d3-selection/src/selectorAll.js","./selection/style":"../../node_modules/d3-selection/src/selection/style.js","./touch":"../../node_modules/d3-selection/src/touch.js","./touches":"../../node_modules/d3-selection/src/touches.js","./window":"../../node_modules/d3-selection/src/window.js","./selection/on":"../../node_modules/d3-selection/src/selection/on.js"}],"scripts/script_timeline.js":[function(require,module,exports) {
"use strict";

var _scrollama = _interopRequireDefault(require("scrollama"));

var _d3Selection = require("d3-selection");

function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

/**
 * Resizer script to toggle multiple artboards for responsiveness. Adapted from:
 * https://github.com/newsdev/ai2html/blob/gh-pages/_includes/resizer-script.html
 */
x;
var width, height;
var vbWidth, vbHeight;
var vbMinX = 0;
var vbMinY = 0;
var viewBox; // using d3 for convenience

var main = d3.select('main');
var scrolly = main.select('#scrolly');
var sticky = scrolly.select('#sticky-thing');
var article = scrolly.select('article');
var step = article.selectAll('.step'); // some stuff for custom date formats

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]; // using UTC dates bc otherwise there's weird timezone stuff 

function getFormattedDate(date) {
  var formattedDate = "".concat(days[date.getUTCDay()], ", ").concat(months[date.getUTCMonth()], " ").concat(date.getUTCDate());
  return formattedDate;
}

width = document.body.clientWidth;
height = window.innerHeight;
vbWidth = Math.max(750, width);
vbHeight = height;
viewBox = "".concat(vbMinX, " ").concat(vbMinY, " ").concat(vbWidth, " ").concat(vbHeight);
/* Updates graphic elements when window resizes */
// updateGraphic();
// Define the dimensions and margins of the SVG
//width = 800;
//height = 100;

var margin = {
  top: 20,
  right: 70,
  bottom: 30,
  left: 40
}; // Define the timeline data

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
}]; // find days bt two dates

function daysBetween(date1, date2) {
  var oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day

  return Math.floor((date2 - date1) / oneDay);
} // find weeks bt two dates


function weeksBetween(date1, date2) {
  var oneWeek = 1000 * 60 * 60 * 24 * 7; // milliseconds in a week

  return Math.floor((date2 - date1) / oneWeek);
} // loop thru events


for (var i = 0; i < events.length; i++) {
  console.log(events); // create yAddtn if undefined (get error later otherwise)

  if (events[i]["yAddtn"] === undefined) {
    events[i]["yAddtn"] = Math.floor(Math.random() * (90 - 50) + 50);
  }

  if (i > 0) {
    // calculate min required spacing based on the date difference
    var weekDiff = weeksBetween(events[i - 1].date, events[i].date);
    var minSpacing = weekDiff > 1 ? 0 : 20; // No minimum spacing if more than 1 week apart (otherwise, min is 20)

    var valid = false; // valid if greater than previous event and more than 20 away

    var maxAttempts = 100;
    var attempts = 0;

    while (attempts < maxAttempts) {
      attempts++; // Generate a new yAddtn value

      var newYAddtn = 20 + Math.floor(Math.random() * (90 - 50) + 50); //console.log(newYAddtn);

      if (weekDiff < 1 && newYAddtn >= events[i - 1]["yAddtn"] + minSpacing) {
        events[i]["yAddtn"] = newYAddtn;
        valid = true;
        break;
      }
    }

    if (!valid) {
      console.warn("Failed to find a valid yAddtn for event ".concat(i, " after ").concat(maxAttempts, " attempts"));
    }
  }
}

console.log(events); // Create the SVG container

var svg = d3.select('svg').attr('width', width).attr('height', height).attr('viewBox', "0 0 ".concat(width, " ").concat(height));
var arrowPoints = [[0, 0], [0, 20], [20, 10]]; // Append marker definitions for arrows

svg.append('defs').append('marker').attr('id', 'arrowhead').attr('viewBox', '0 0 10 10').attr('refX', 9) // Adjust this as needed
.attr('refY', 5).attr('markerWidth', 5).attr('markerHeight', 5).attr('orient', 'auto-start-reverse').append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z') // Arrowhead shape
.attr('fill', 'black');
var imageElement = svg.selectAll('image'); // Define scales

var x = d3.scaleTime().domain(d3.extent(events, function (d) {
  return d.date;
})).range([margin.left, width - margin.right]); // Define a constant y value for all segments

var y = height / 2; // Function to create curved path

function createCurvedPath(d, xVal) {
  var startX = x(d.date); // Adjust as needed

  var startY = y + 10; // Adjust as needed

  var endX = x(d.date) - 40;
  var endY = y + d.yAddtn - 5;

  if (typeof xVal !== "undefined") {
    return d3.line().curve(d3.curveBasis).x(function (d) {
      return d[0];
    }).y(function (d) {
      return d[1];
    })([[xVal, startY], [xVal, endY], [xVal - 40, endY]]);
  }

  return d3.line().curve(d3.curveBasis).x(function (d) {
    return d[0];
  }).y(function (d) {
    return d[1];
  })([[startX, startY], [startX, endY], [endX, endY]]);
}

var textYPositions = {}; // Function to adjust text positions based on overlaps

function detectOverlaps() {
  var textElements = svg.selectAll('text.label');
  var bbox = textElements.nodes().map(function (node) {
    return node.getBBox();
  }); // Clear previously stored positions

  textYPositions = {}; // Adjust positions based on overlap detection

  for (var _i2 = 0; _i2 < bbox.length; _i2++) {
    textYPositions[_i2] = bbox[_i2].y + bbox[_i2].height / 2; // Store the center y position of the text

    for (var j = _i2 + 1; j < bbox.length; j++) {
      if (doRectanglesOverlap(bbox[_i2], bbox[j])) {
        var newY = bbox[j].y + bbox[j].height + 10; // Example adjustment: shift text down to avoid overlap

        d3.select(textElements.nodes()[j]).attr('y', bbox[j].y + bbox[j].height + 10); // Shift down

        return newY; //
      }
    }
  }
} // Function to check if two rectangles overlap


function doRectanglesOverlap(bbox1, bbox2) {
  return !(bbox1.x > bbox2.x + bbox2.width || bbox1.x + bbox1.width < bbox2.x || bbox1.y > bbox2.y + bbox2.height || bbox1.y + bbox1.height < bbox2.y);
} // Initial call to draw elements and handle overlaps


drawInitialElements(); // Function to update the view to focus on a specific event

function updateView(eventIndex, moveText) {
  //  console.log("update");
  var selectedEvent = events[eventIndex]; //  console.log('event',selectedEvent);

  var eventDate = selectedEvent.date; // Define a range around the selected event

  var focusRange = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds
  // center selected event

  var startDate = new Date(eventDate.getTime() - focusRange / 2);
  var endDate = new Date(eventDate.getTime() + focusRange / 2);
  var xScaleDomain = [startDate, endDate]; //const xScaleDomain = [eventDate, new Date(eventDate.getTime() + focusRange)];
  // Update the x scale domain

  x.domain(xScaleDomain);
  var newX = d3.scaleTime().domain(xScaleDomain).range([margin.left, width - margin.right]); // Redraw the lines, circles, and labels based on the new scale

  svg.selectAll('.line').transition().duration(2000).attr('x1', function (d, i) {
    return newX(events[i].date);
  }).attr('y1', y).attr('x2', function (d) {
    return newX(d.date);
  }).attr('y2', y);
  svg.selectAll('.red-line').transition().duration(2000).attr('x1', function (d, i) {
    return newX(events[i].date);
  }).attr('y1', y).attr('x2', function (d) {
    return newX(d.date);
  }).attr('y2', y);
  svg.selectAll('circle').transition().duration(2000).attr('cx', function (d) {
    return newX(d.date);
  });
  /*
  svg.selectAll('image').transition()
  .duration(2000)
  .attr('x', d => newX(d.date)-45);
  */
  // this below does something interesting. it's not exactly right, but it looks cool (image stays in place until next one).
  // might want to mess with it a bit

  if (events[eventIndex].link) {
    console.log(events[eventIndex]);
    svg.selectAll('image').transition().duration(2000).attr('x', function (d) {
      return newX(d.date) - 45;
    });
  }

  if (events[eventIndex].segment == 'na') {
    svg.selectAll('image').transition().duration(2000).attr('x', function (d) {
      return newX(d.date) - 45;
    });
  }

  svg.selectAll('text.label') // different attrs based on if there's an arrow or not
  .transition().duration(2000).attr('x', function (d) {
    return newX(d.date) - 45;
  })
  /*
  .attr('text-anchor',  d => {
    const align = d.segment === 'end' ? 'end' : 'middle';
  return align;
  })
      .attr('x',  d => {
        const xPos = d.segment === 'end' ? newX(d.date) - 45 : newX(d.date);
  return xPos;
      })
      */

  /*
  .attr('y',  d => {
    const yPos = d.segment === 'end' ? y+55 : y + Math.floor(Math.random()*(90-30)+30);
  return yPos;
  })
  */
  //  .on('end', detectOverlaps); // NEED TO FIX SO IT DOESN'T UPDATE AGAIN

  /*
   const align = d.segment === 'end' && d.event_no === '2' ? 'end' : 'middle';
  return align;
  })
  .attr('x',  d => {
    const xPos = d.segment === 'end' && d.event_no === '2' ? newX(d.date) - 45 : newX(d.date);
  return xPos;
  })
  .attr('y',  d => {
    const yPos = d.segment === 'end' && d.event_no === '2' ? y+55 : y+30;
  return yPos;
  })
  .on('end', detectAndHandleTextOverlaps);
  
  */
  ; // Draw curved arrows pointing to circles

  svg.selectAll('path.curved-arrow').transition().duration(2000).attr('d', function (d) {
    return createCurvedPath(d, newX(d.date));
  }); // TBH I THINK IT'S UNNECESSARY TO DO THIS WHOLE NEWX THING BC IT'S ALWAYS GOING TO BE THE WINDOW WIDTH/2
  // update date
  //dateText.text(getCenterDate().toDateString());

  /*
  // COULD DO THIS INSTEA OF HAVING THE WHOLE GETCENTERDATE FUNCITON:
  dateText.text(x.invert(newX(eventDate)).toDateString());
  */
  //dateText.text(x.invert(document.body.clientWidth/2).toDateString());
  //dateText.text(x.invert(newX(eventDate)).toDateString());

  console.log("event 1", events[eventIndex].date);
  console.log("event 2", events[eventIndex + 1].date);

  if (eventIndex > 0) {
    startCounter(events[eventIndex - 1].date, events[eventIndex].date);
  }
} //TESTING COUNTER


var testDate = x.invert(Math.ceil(document.body.clientWidth / 2)); //let currDate = testDate;
//dateText.text(d3.timeDay.offset(testDate, 0).toDateString());
// Function to update counter display

function updateCounter(newDate) {
  dateText.text(getFormattedDate(newDate));
} // Start counter update


function startCounter(date1, date2) {
  var currDate = date1;
  var interval = setInterval(function () {
    if (currDate >= date2) {
      clearInterval(interval);
      return;
    }

    currDate = d3.timeDay.offset(currDate, 1);
    updateCounter(currDate);
  }, 2000 / daysBetween(date1, date2)); // Update every x seconds

  console.log(currDate);
}
/*
function updateDateText() {
  dateText.text(x.invert(document.body.clientWidth/2).toUTCString());



}
*/
//setInterval(updateDateText,10);


function getCenterDate() {
  // Calculate the center of the view on the x-axis
  var centerX = width / 2; // Get the date corresponding to the center position

  var centerDate = x.invert(centerX); // Output the date at the center

  console.log("Date at the center:", centerDate);
  return centerDate;
} // add a thing that counts the date


var dateText = svg.append('text').attr('class', 'date-text').attr('x', width / 2).attr('y', 30) // Position the text element at the top
.attr('text-anchor', 'middle').attr('font-size', '16px').classed('roboto', true).attr('fill', 'black').text(''); // Initial empty text
// Draw the initial SVG elements

function drawInitialElements() {
  // Draw the lines connecting events
  svg.selectAll('line.line').data(events.slice(1)).enter().append('line').attr('class', 'line').attr('x1', function (d, i) {
    return x(events[i].date);
  }).attr('y1', y).attr('x2', function (d) {
    return x(d.date);
  }).attr('y2', y).attr('id', function (d, i) {
    return "line-".concat(i + 1);
  });
  svg.selectAll('line.red-line').data(events.slice(1)).enter().append('line').attr('class', 'red-line').attr('x1', function (d, i) {
    return x(events[i].date);
  }).attr('y1', y).attr('x2', function (d) {
    return x(d.date);
  }).attr('y2', y).attr('id', function (d, i) {
    return "red-line-".concat(i + 1);
  }); // Draw the events as circles

  svg.selectAll('circle').data(events).enter().append('circle').attr('cx', function (d) {
    return x(d.date);
  }).attr('cy', y).attr('r', 5).attr('class', 'event').attr('id', function (d, i) {
    return "circle-".concat(i + 1);
  }); // Add event labels

  svg.selectAll('text.label').data(events).enter().append('text').attr('class', 'label').attr('x', function (d) {
    return x(d.date);
  }).attr('y', function (d) {
    return y + d.yAddtn;
  }) // hacky way of making sure the text doesn't overlap
  .text(function (d) {
    return d.label;
  }).classed('roboto-light', true).attr('id', function (d, i) {
    return "label-".concat(i + 1);
  }).attr('text-anchor', 'end'); // right align the text;
  // Draw curved arrows pointing to circles

  svg.selectAll('path.curved-arrow').data(events).enter().append('path').attr('class', 'curved-arrow').attr('d', function (d) {
    return createCurvedPath(d);
  }).style('fill', 'none') // Ensure the path is not filled
  .style('stroke', 'black') // Set the stroke color
  .style('stroke-width', 2) // Set the stroke width
  .attr('marker-start', 'url(#arrowhead)').attr('id', function (d, i) {
    return "arrow-".concat(i + 1);
  });
  svg.selectAll('image').data(events.filter(function (event) {
    return event.link;
  })).enter().append('image') // .attr('visibility','hidden')
  .attr("x", width / 2 - 100) // X position
  .attr('xlink:href', function (d) {
    return d.link;
  }) // FIGURE OUT HOW TO MAKE IT NOT HAVE THIS AT FIRST
  .attr("y", y - 110) // Y position
  .attr("width", 100) // Width of the image
  .attr("height", 100).attr('id', function (d, i) {
    return "image-".concat(i + 1);
  });
}

function updateImage(imageLink) {
  imageElement.attr("xlink:href", imageLink); // URL to your PNG image
} // Draw the initial elements


drawInitialElements(); // initialize the scrollama

var scroller = (0, _scrollama.default)();

function handleStepEnter(response) {
  if (response.direction == 'down') {
    // Call the appropriate step function based on the scroll index
    stepFunctionsDown[response.index]();
  } else if (response.direction == 'up') {
    stepFunctionsUp[response.index]();
  } // Update the sticky element's class


  sticky.attr('class', 'step-' + response.index);
  console.log('index', response.index);
  return response;
}

function handleStepExit(response) {
  if (response.index == 0 && response.direction == 'up') {
    // sticky.attr('class', 'none');
    svg.selectAll("circle").classed('hidden', true); //svg.selectAll(".line").classed('hidden', true,); 

    updateView(0);
  }
}

function setup() {
  updateView(0);
  d3.selectAll('#sticky-thing').classed('hidden', true);
  svg.selectAll("circle").classed('hidden', true);
  svg.selectAll(".line").classed('hidden', false);
  svg.selectAll("image").classed('hidden', true); // svg.selectAll("line").classed('line', true,); 
  //  svg.selectAll("text").classed('hidden', true,); 
  //  svg.selectAll("text").classed('hidden', true,); 

  svg.selectAll("svg").classed('draw', false);
} // populate stepFunctions


var stepFunctionsDown = [];

var _loop = function _loop(_i3) {
  svg.selectAll("#label-".concat(_i3)).classed('hidden', true);
  svg.selectAll("#arrow-".concat(_i3)).classed('hidden', true);
  stepFunctionsDown.push(function () {
    updateView(_i3 - 1);

    if (events[_i3].segment != 'end') {
      console.log('not end');
    }

    console.log('hi'); // svg.selectAll('circle').attr('class', (d, j) => j === i ? 'event highlighted-event' : 'event');
    // svg.selectAll('line').attr('class', (d, j) => j === i ? 'line highlighted' : 'line').classed('draw',true).classed('visible',true);
    //svg.selectAll(`#circle-${i}`).attr('class', (d, j) => j === i ? 'event highlighted-event' : 'event');

    svg.selectAll("#circle-".concat(_i3)).classed('event highlighted-event', true).classed('hidden', false);
    svg.selectAll("#circle-".concat(_i3 - 1)).classed('highlighted-event', false).classed('hidden', false);
    svg.selectAll("#label-".concat(_i3)).classed('fade_in', true).classed('visible', true);
    svg.selectAll("#arrow-".concat(_i3)).classed('fade_in', true).classed('visible', true); // WANT TO MAKE THIS APPEAR EARLIER/LATER THAN OTHERS

    svg.selectAll("#label-".concat(_i3)).classed('fade_in', true).classed('visible', true);
    svg.selectAll("#image-".concat(_i3)).classed('visible', true);
    /*
    if(events[i].link) {
      updateImage(events[i].link);
      imageElement.attr('visibility','visible');
    }
    */

    /*
    else {
      imageElement.attr('visibility','hidden');
    }
    */

    if (events[_i3 - 1].segment == 'start') {
      //   console.log(events[i-1]);
      // svg.selectAll(`#line-${i}`).classed('draw line highlighted visible',true).classed('hidden',false);
      svg.selectAll("#red-line-".concat(_i3)).classed('draw highlighted visible', true).classed('hidden', false);
    }

    if (events[_i3].segment == 'end') {
      // i+1 bc the first event has no arrow associated whoops
      console.log("end");
    }
    /*
    svg.selectAll(`.line-${i}`).each(function(d, j) {
     // Determine if the current element should be highlighted
     const isHighlighted = j === i;
          // Apply classes based on the condition
     d3.select(this)
       .classed('line', true) // Always apply 'event'
       .classed('draw line highlighted visible', isHighlighted) // Apply 'highlighted-event' if isHighlighted is true
       .classed('hidden', !isHighlighted); // Apply 'hidden' if isHighlighted is false
       console.log('hello');
       console.log(j === i);
    });
    */
    // svg.selectAll(`.line-${i}`).attr('class', (d, j) => j === i ? 'draw line highlighted visible' : 'line hidden');

  });
};

for (var _i4 = 0; _i4 < events.length + 2; _i4++) {
  _loop(_i4);
}
/* for (let i =0; i < events.length;i++) {
   stepFunctions.push(step_ + i);
 }*/
//console.log(stepFunctionsDown);


var stepFunctionsUp = [];
svg.selectAll('.highlighted').attr('y', y + 100);

var _loop2 = function _loop2(_i5) {
  stepFunctionsUp.push(function () {
    // NEED TO GIGURE OUT WHY IT DOESNT SHOW LAST EVENT
    updateView(_i5 - 1); //svg.selectAll('circle').attr('class', (d, j) => j === i ? 'event highlighted-event' : 'event');
    //svg.selectAll('line').attr('class', (d, j) => j === i ? 'line highlighted' : 'line').classed('draw',false).classed('visible',false);

    svg.selectAll("#circle-".concat(_i5)).classed('event highlighted-event', true).classed('hidden', false);
    svg.selectAll("#circle-".concat(_i5 - 1)).classed('highlighted-event', false).classed('hidden', false);
    svg.selectAll("#label-".concat(_i5)).classed('fade-in', true); // WANT TO MAKE THIS APPEAR EARLIER/LATER THAN OTHERS

    svg.selectAll("#image-".concat(_i5 + 1)).classed('visible', false); //svg.selectAll('line').attr('class', (d, j) => j === i ? 'draw line highlighted visible' : 'line');
    //svg.selectAll(`#line-${i}`).classed('line visible',true).classed('hidden',false);

    svg.selectAll("#red-line-".concat(_i5)).classed('red-line visible', true).classed('hidden', false); //svg.selectAll(`#line-${i+1}`).classed('highlighted',false).classed('hidden',false);

    svg.selectAll("#red-line-".concat(_i5 + 1)).classed('highlighted', false).classed('hidden', false);
    /*
           if(events[i-1].segment == 'end') {
            console.log(events[i-1]);
            svg.selectAll(`#line-${i}`).classed('draw line highlighted visible',true).classed('hidden',false);
    
    
           }*/
  });
};

for (var _i6 = 0; _i6 < events.length; _i6++) {
  _loop2(_i6);
} // Create scrollable sections


var steps = d3.select('#scroll-steps').selectAll('div').data(events).enter().append('div').attr('class', 'step').text(function (d) {
  return d.label;
}); // Initialize scrollama

function init() {
  setup();
  scroller.setup({
    step: '#scrolly article .step',
    offset: 0.98,
    debug: false
  }).onStepEnter(handleStepEnter).onStepExit(handleStepExit); // Setup resize event listener

  window.addEventListener('resize', scroller.resize);
} // Kick things off


init();
},{"scrollama":"../../node_modules/scrollama/build/scrollama.js","d3-selection":"../../node_modules/d3-selection/src/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/script_timeline.js"], "script")
//# sourceMappingURL=/script_timeline.ba7169b3.js.map
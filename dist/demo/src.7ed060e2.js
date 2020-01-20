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
})({"../node_modules/symbol-observable/es/ponyfill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = symbolObservablePonyfill;

function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}

;
},{}],"../node_modules/symbol-observable/es/index.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ponyfill = _interopRequireDefault(require("./ponyfill.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill.default)(root);
var _default = result;
exports.default = _default;
},{"./ponyfill.js":"../node_modules/symbol-observable/es/ponyfill.js"}],"../node_modules/redux/es/redux.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyMiddleware = applyMiddleware;
exports.bindActionCreators = bindActionCreators;
exports.combineReducers = combineReducers;
exports.compose = compose;
exports.createStore = createStore;
exports.__DO_NOT_USE__ActionTypes = void 0;

var _symbolObservable = _interopRequireDefault(require("symbol-observable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

exports.__DO_NOT_USE__ActionTypes = ActionTypes;

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */


function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[_symbolObservable.default] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable.default] = observable, _ref2;
}
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */


function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if ("development" !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */


function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */


function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */


function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}
},{"symbol-observable":"../node_modules/symbol-observable/es/index.js"}],"../node_modules/redux-thunk/es/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
var _default = thunk;
exports.default = _default;
},{}],"../src/actions/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_BOX_EDIT = exports.GRID_CONTAINER_EDIT = exports.GRID_BOX_IN_PLACE_DIALOG = exports.GRID_CONTAINER_IN_PLACE_DIALOG = exports.GRID_LOADING = exports.GRID_UI_STATE = exports.REQUEST_GRID_BOX_EDITING_UPDATE = exports.REQUEST_GRID_BOX_EDITING_REMOVE = exports.REQUEST_GRID_BOX_EDITING_MOVE = exports.REQUEST_GRID_BOX_EDITING_CREATE = exports.REQUEST_GRID_BOX_EDITING_SEARCH = exports.REQUEST_GRID_BOX_EDITING_META_TYPES = exports.REQUEST_GRID_CONTAINER_EDITING_UPDATE = exports.REQUEST_GRID_CONTAINER_EDITING_MOVE = exports.REQUEST_GRID_CONTAINER_EDITING_DELETE = exports.REQUEST_GRID_CONTAINER_EDITING_ADD = exports.REQUEST_GRID_CONTAINER_EDITING_GET_TYPES = exports.REQUEST_GRID_PERMISSION_RIGHTS = exports.REQUEST_GRID_STYLES_GET = exports.REQUEST_GRID_DOCUMENT_REVISIONS = exports.REQUEST_GRID_DOCUMENT_REVERT_TO_REVISION = exports.REQUEST_GRID_DOCUMENT_REVERT_DRAFT = exports.REQUEST_GRID_DOCUMENT_PUBLISH_DRAFT = exports.REQUEST_GRID_DOCUMENT_CHECK_DRAFT_STATE = exports.REQUEST_GRID_DOCUMENT_LOAD = void 0;
// ajax action types
var REQUEST_GRID_DOCUMENT_LOAD = 'REQUEST-GRID_DOCUMENT-LOAD';
exports.REQUEST_GRID_DOCUMENT_LOAD = REQUEST_GRID_DOCUMENT_LOAD;
var REQUEST_GRID_DOCUMENT_CHECK_DRAFT_STATE = 'REQUEST-GRID_DOCUMENT-CHECK_DRAFT_STATE';
exports.REQUEST_GRID_DOCUMENT_CHECK_DRAFT_STATE = REQUEST_GRID_DOCUMENT_CHECK_DRAFT_STATE;
var REQUEST_GRID_DOCUMENT_PUBLISH_DRAFT = 'REQUEST-GRID_DOCUMENT-PUBLISH_DRAFT';
exports.REQUEST_GRID_DOCUMENT_PUBLISH_DRAFT = REQUEST_GRID_DOCUMENT_PUBLISH_DRAFT;
var REQUEST_GRID_DOCUMENT_REVERT_DRAFT = 'REQUEST-GRID_DOCUMENT-REVERT_DRAFT';
exports.REQUEST_GRID_DOCUMENT_REVERT_DRAFT = REQUEST_GRID_DOCUMENT_REVERT_DRAFT;
var REQUEST_GRID_DOCUMENT_REVERT_TO_REVISION = 'REQUEST-GRID_DOCUMENT-REVERT_TO_REVISION';
exports.REQUEST_GRID_DOCUMENT_REVERT_TO_REVISION = REQUEST_GRID_DOCUMENT_REVERT_TO_REVISION;
var REQUEST_GRID_DOCUMENT_REVISIONS = 'REQUEST-GRID_DOCUMENT-REVISIONS';
exports.REQUEST_GRID_DOCUMENT_REVISIONS = REQUEST_GRID_DOCUMENT_REVISIONS;
var REQUEST_GRID_STYLES_GET = 'REQUEST-GRID_STYLES-GET';
exports.REQUEST_GRID_STYLES_GET = REQUEST_GRID_STYLES_GET;
var REQUEST_GRID_PERMISSION_RIGHTS = 'REQUEST-GRID_PERMISSION-RIGHTS';
exports.REQUEST_GRID_PERMISSION_RIGHTS = REQUEST_GRID_PERMISSION_RIGHTS;
var REQUEST_GRID_CONTAINER_EDITING_GET_TYPES = 'REQUEST-GRID_CONTAINER_EDITING-GET_TYPES';
exports.REQUEST_GRID_CONTAINER_EDITING_GET_TYPES = REQUEST_GRID_CONTAINER_EDITING_GET_TYPES;
var REQUEST_GRID_CONTAINER_EDITING_ADD = 'REQUEST-GRID_CONTAINER_EDITING-ADD';
exports.REQUEST_GRID_CONTAINER_EDITING_ADD = REQUEST_GRID_CONTAINER_EDITING_ADD;
var REQUEST_GRID_CONTAINER_EDITING_DELETE = 'REQUEST-GRID_CONTAINER_EDITING-DELETE';
exports.REQUEST_GRID_CONTAINER_EDITING_DELETE = REQUEST_GRID_CONTAINER_EDITING_DELETE;
var REQUEST_GRID_CONTAINER_EDITING_MOVE = 'REQUEST-GRID_CONTAINER_EDITING-MOVE';
exports.REQUEST_GRID_CONTAINER_EDITING_MOVE = REQUEST_GRID_CONTAINER_EDITING_MOVE;
var REQUEST_GRID_CONTAINER_EDITING_UPDATE = 'REQUEST-GRID_CONTAINER_EDITING-UPDATE';
exports.REQUEST_GRID_CONTAINER_EDITING_UPDATE = REQUEST_GRID_CONTAINER_EDITING_UPDATE;
var REQUEST_GRID_BOX_EDITING_META_TYPES = 'REQUEST-GRID_BOX_EDITING-META_TYPES';
exports.REQUEST_GRID_BOX_EDITING_META_TYPES = REQUEST_GRID_BOX_EDITING_META_TYPES;
var REQUEST_GRID_BOX_EDITING_SEARCH = 'REQUEST-GRID_BOX_EDITING-SEARCH';
exports.REQUEST_GRID_BOX_EDITING_SEARCH = REQUEST_GRID_BOX_EDITING_SEARCH;
var REQUEST_GRID_BOX_EDITING_CREATE = 'REQUEST-GRID_BOX_EDITING-CREATE';
exports.REQUEST_GRID_BOX_EDITING_CREATE = REQUEST_GRID_BOX_EDITING_CREATE;
var REQUEST_GRID_BOX_EDITING_MOVE = 'REQUEST-GRID_BOX_EDITING-MOVE';
exports.REQUEST_GRID_BOX_EDITING_MOVE = REQUEST_GRID_BOX_EDITING_MOVE;
var REQUEST_GRID_BOX_EDITING_REMOVE = 'REQUEST-GRID_BOX_EDITING-REMOVE';
exports.REQUEST_GRID_BOX_EDITING_REMOVE = REQUEST_GRID_BOX_EDITING_REMOVE;
var REQUEST_GRID_BOX_EDITING_UPDATE = 'REQUEST-GRID_BOX_EDITING-UPDATE';
exports.REQUEST_GRID_BOX_EDITING_UPDATE = REQUEST_GRID_BOX_EDITING_UPDATE;
var GRID_UI_STATE = "GRID-UI-STATE";
exports.GRID_UI_STATE = GRID_UI_STATE;
var GRID_LOADING = 'GRID_LOADING';
exports.GRID_LOADING = GRID_LOADING;
var GRID_CONTAINER_IN_PLACE_DIALOG = "GRID-CONTAINER-IN-PLACE-DIALOG";
exports.GRID_CONTAINER_IN_PLACE_DIALOG = GRID_CONTAINER_IN_PLACE_DIALOG;
var GRID_BOX_IN_PLACE_DIALOG = "GRID-BOX-IN-PLACE-DIALOG";
exports.GRID_BOX_IN_PLACE_DIALOG = GRID_BOX_IN_PLACE_DIALOG;
var GRID_CONTAINER_EDIT = "GRID-CONTAINER-EDIT";
exports.GRID_CONTAINER_EDIT = GRID_CONTAINER_EDIT;
var GRID_BOX_EDIT = "GRID-BOX-EDIT";
exports.GRID_BOX_EDIT = GRID_BOX_EDIT;
},{}],"../src/reducer/update-ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateUI;

var _types = require("../actions/types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function updateUI(state, action) {
  switch (action.type) {
    case _types.GRID_UI_STATE:
      var new_state = _objectSpread({}, state);

      new_state[action.payload.key] = action.payload.value;
      return new_state;

    case _types.GRID_LOADING:
      return _objectSpread({}, state, {
        is_loading: action.payload.is_loading
      });
      break;

    case _types.GRID_CONTAINER_EDIT:
      return _objectSpread({}, state, {
        edit_container: action.payload.container_id
      });

    case _types.GRID_BOX_EDIT:
      return _objectSpread({}, state, {
        edit_box: action.payload.box
      });

    case _types.GRID_CONTAINER_IN_PLACE_DIALOG:
      return _objectSpread({}, state, {
        container_dialog_index: action.payload.index
      });

    case _types.GRID_BOX_IN_PLACE_DIALOG:
      return _objectSpread({}, state, {
        box_dialog: _objectSpread({}, action.payload)
      });

    default:
      return state;
  }
}
},{"../actions/types":"../src/actions/types.js"}],"../src/helper/store-iterator.js":[function(require,module,exports) {
'use strict';
/**
 *
 * @param container
 * @param container_id
 * @return {object|null}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findContainer = findContainer;
exports.findSlot = findSlot;
exports.findBoxPath = findBoxPath;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function findContainer(container, container_id) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = container[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;

      if (c.id === container_id) {
        return c;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
}
/**
 *
 * @param {array} container
 * @param {int} container_id
 * @param {int} slot_id
 * @return {null|object}
 */


function findSlot(container, container_id, slot_id) {
  var c = findContainer(container, container_id);

  if (_typeof(c) === _typeof({})) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = c.slots[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var s = _step2.value;

        if (s.id === slot_id) {
          return s;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return null;
}
/**
 *
 * @param container
 * @param box_id
 * @return {null|object}
 */


function findBoxPath(container, box_id) {
  for (var container_index in container) {
    if (!container.hasOwnProperty(container_index)) continue;
    var c = container[container_index];

    for (var slot_index in c.slots) {
      if (!c.slots.hasOwnProperty(slot_index)) continue;
      var s = c.slots[slot_index];

      for (var box_index in s.boxes) {
        if (!s.boxes.hasOwnProperty(box_index)) continue;
        var b = s.boxes[box_index];
        if (b.id === box_id) return {
          container_index: container_index,
          container_id: c.id,
          slot_index: slot_index,
          slot_id: s.id,
          box_index: box_index,
          box_id: box_id
        };
      }
    }
  }

  return null;
}
},{}],"../src/actions/state.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionGridUpdate = actionGridUpdate;
exports.actionGridIsLoading = actionGridIsLoading;
exports.actionGridContainerAdd = actionGridContainerAdd;
exports.GRID_BOX_ADD = exports.GRID_CONTAINER_REMOVE = exports.GRID_CONTAINER_MOVE = exports.GRID_CONTAINER_ADD = exports.GRID_IS_LOADING = exports.GRID_UPDATE = exports.GRID_LOADING = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GRID_LOADING = 'GRID_LOADING';
exports.GRID_LOADING = GRID_LOADING;
var GRID_UPDATE = "GRID-UPDATE";
exports.GRID_UPDATE = GRID_UPDATE;
var GRID_IS_LOADING = "GRID-IS-LOADING";
exports.GRID_IS_LOADING = GRID_IS_LOADING;
var GRID_CONTAINER_ADD = "GRID-CONTAINER-ADD";
exports.GRID_CONTAINER_ADD = GRID_CONTAINER_ADD;
var GRID_CONTAINER_MOVE = "GRID-CONTAINER-MOVE";
exports.GRID_CONTAINER_MOVE = GRID_CONTAINER_MOVE;
var GRID_CONTAINER_REMOVE = "GRID-CONTAINER-REMOVE";
exports.GRID_CONTAINER_REMOVE = GRID_CONTAINER_REMOVE;
var GRID_BOX_ADD = "GRID-BOX-ADD"; // helper for default action object

exports.GRID_BOX_ADD = GRID_BOX_ADD;

function _create_action(type, payload) {
  var more = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _objectSpread({
    type: type,
    payload: payload
  }, more);
}

function actionGridUpdate(grid) {
  return _create_action(GRID_UPDATE, {
    grid: grid
  });
}

function actionGridIsLoading(is_loading) {
  return _create_action(GRID_IS_LOADING, {
    is_loading: is_loading
  });
}
/**
 *
 * @param args
 * @param container
 * @return {type, payload}
 */


function actionGridContainerAdd(args, container) {
  return _create_action(GRID_CONTAINER_ADD, _objectSpread({}, args, {
    container: container
  }));
}
},{}],"../src/reducer/update-grid.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateGrid;

var _storeIterator = require("../helper/store-iterator");

var _types = require("../actions/types");

var _state = require("../actions/state");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function updateGrid(state, action) {
  switch (action.type) {
    case _types.REQUEST_GRID_DOCUMENT_LOAD:
    case _types.REQUEST_GRID_DOCUMENT_REVERT_DRAFT:
    case _types.REQUEST_GRID_DOCUMENT_REVERT_TO_REVISION:
      return _objectSpread({}, action.payload.grid);

    case _types.REQUEST_GRID_DOCUMENT_CHECK_DRAFT_STATE:
      return _objectSpread({}, state, {
        isDraft: action.payload.isDraft
      });

    default:
      return _objectSpread({}, state, {
        container: updateContainerList(state.container, action)
      });
  }
}

function updateContainerList() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.REQUEST_GRID_CONTAINER_EDITING_ADD:
    case _state.GRID_CONTAINER_ADD:
      return addContainer(state, action);

    case _types.REQUEST_GRID_CONTAINER_EDITING_DELETE:
      return deleteContainer(state, action);

    case _types.REQUEST_GRID_CONTAINER_EDITING_MOVE:
      return moveContainer(state, action);

    case _types.REQUEST_GRID_CONTAINER_EDITING_UPDATE:
      return updateContainer(state, action);

    default:
      return updateBoxes(state, action);
  }
}

function addContainer(state, action) {
  return [].concat(_toConsumableArray(state.slice(0, action.payload.to_index)), [action.payload.container], _toConsumableArray(state.slice(action.payload.to_index)));
}

function deleteContainer(state, action) {
  return _toConsumableArray(state.filter(function (c) {
    return c.id !== action.payload.container_id;
  }));
}

function moveContainer(state, action) {
  var _action$payload = action.payload,
      to_index = _action$payload.to_index,
      container_id = _action$payload.container_id;
  var target_container = state.filter(function (c) {
    return c.id === container_id;
  })[0];
  var new_list = state.filter(function (c) {
    return c.id !== container_id;
  });
  new_list.splice(to_index, 0, target_container);
  return new_list;
}
/**
 * update single container element
 * @param state
 * @param action
 * @return {Array}
 */


function updateContainer(state, action) {
  var container = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = state[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;

      if (c.id === action.payload.container_id) {
        container.push(_objectSpread({}, action.payload.container));
      } else {
        container.push(_objectSpread({}, c));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return container;
}

function updateBoxes(state, action) {
  var container = null;

  switch (action.type) {
    case _types.REQUEST_GRID_BOX_EDITING_CREATE:
      return createBox(state, action);

    case _types.REQUEST_GRID_BOX_EDITING_REMOVE:
      return removeBox(state, action);

    case _types.REQUEST_GRID_BOX_EDITING_MOVE:
      return moveBox(state, action);

    default:
      return state;
  }
}

function createBox(state, action) {
  var _action$payload2 = action.payload,
      to_container_id = _action$payload2.to_container_id,
      to_slot_id = _action$payload2.to_slot_id,
      to_box_index = _action$payload2.to_box_index,
      box = _action$payload2.box;

  var container = _toConsumableArray(state);

  (0, _storeIterator.findSlot)(container, to_container_id, to_slot_id).boxes.splice(to_box_index, 0, box);
  return container;
}

function removeBox(state, action) {
  var _action$payload3 = action.payload,
      container_id = _action$payload3.container_id,
      slot_id = _action$payload3.slot_id,
      index = _action$payload3.index;

  var container = _toConsumableArray(state);

  (0, _storeIterator.findSlot)(container, container_id, slot_id).boxes.splice(index, 1);
  return container;
}

function moveBox(state, action) {
  var _action$payload4 = action.payload,
      from_container_id = _action$payload4.from_container_id,
      from_slot_id = _action$payload4.from_slot_id,
      from_box_index = _action$payload4.from_box_index,
      to_container_id = _action$payload4.to_container_id,
      to_slot_id = _action$payload4.to_slot_id,
      to_box_index = _action$payload4.to_box_index;

  var container = _toConsumableArray(state);

  var same_slot_correction = 0;

  if (from_container_id === to_container_id && from_slot_id === to_slot_id) {
    /**
     * no need for operation. it's the same position
     */
    if (from_box_index === to_box_index || from_box_index + 1 === to_box_index) return container;
    /**
     * if dragged box before destination and in same slot we need to decrease the index because of coming slice operation
     */

    if (from_box_index < to_box_index) {
      same_slot_correction = -1;
    }
  }

  var box = (0, _storeIterator.findSlot)(container, from_container_id, from_slot_id).boxes.splice(from_box_index, 1)[0];
  var slot = (0, _storeIterator.findSlot)(container, to_container_id, to_slot_id);
  slot.boxes = [].concat(_toConsumableArray(slot.boxes.slice(0, to_box_index + same_slot_correction)), [box], _toConsumableArray(slot.boxes.slice(to_box_index + same_slot_correction)));
  return container;
}
},{"../helper/store-iterator":"../src/helper/store-iterator.js","../actions/types":"../src/actions/types.js","../actions/state":"../src/actions/state.js"}],"../src/reducer/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridReducer = gridReducer;

var _types = require("../actions/types");

var _updateUi = _interopRequireDefault(require("./update-ui"));

var _updateGrid = _interopRequireDefault(require("./update-grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function boxEditor(state, action) {
  return state;
}

function containerEditor(state, action) {
  return state;
}

function updateRevisions(state, action) {
  switch (action.type) {
    case _types.REQUEST_GRID_DOCUMENT_REVISIONS:
      return _toConsumableArray(action.payload.revisions);
  }

  return state;
}

function updateStyles(state, action) {
  switch (action.type) {
    case _types.REQUEST_GRID_STYLES_GET:
      return _objectSpread({}, action.payload.styles);
  }

  return state;
}

function updateRights(state, action) {
  switch (action.type) {
    case _types.REQUEST_GRID_PERMISSION_RIGHTS:
      return _objectSpread({}, action.payload.rights);
  }

  return state;
}

function updateBoxTypes(state, action) {
  switch (action.type) {
    case _types.REQUEST_GRID_BOX_EDITING_META_TYPES:
      return _toConsumableArray(action.payload.box_types);

    case _types.REQUEST_GRID_BOX_EDITING_SEARCH:
      var types = [];

      for (var i in state) {
        var box_type = _objectSpread({}, state[i]);

        if (box_type.type === action.payload.box_meta_type) {
          box_type.boxes = action.payload.boxes;
        }

        types.push(box_type);
      }

      console.log(state, types);
      return types;

    default:
      return state;
  }
} // this way


function gridReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  // important never mutate, but always create new object
  return {
    revisions: updateRevisions(state.revisions, action),
    styles: updateStyles(state.styles, action),
    rights: updateRights(state.rights, action),
    ui: (0, _updateUi.default)(state.ui, action),
    grid: (0, _updateGrid.default)(state.grid, action),
    box_editor: boxEditor(state.box_editor, action),
    container_editor: containerEditor(state.container_editor, action),
    container_types: action.type === _types.REQUEST_GRID_CONTAINER_EDITING_GET_TYPES ? action.payload.container_types : state.container_types,
    box_types: updateBoxTypes(state.box_types, action)
  };
} // or this way
// import { combineReducers } from 'redux'
// const grid_app = combineReducers({
//   box_editor: box_editor(state.box_editor, action),
//   container_editor: box_editor(state.container_editor, action),
//   grid: update_grid(state.grid, action),
// })
},{"../actions/types":"../src/actions/types.js","./update-ui":"../src/reducer/update-ui.js","./update-grid":"../src/reducer/update-grid.js"}],"../src/store/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGridStore;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reducer = require("../reducer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createGridStore() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    // ui states
    ui: {},
    // grid state
    grid: {},
    // others
    revisions: [],
    container_types: [],
    box_types: [],
    rights: [],
    styles: []
  };
  var middleware = null;

  if ("development" !== 'production') {
    var logger = function logger(store) {
      return function (next) {
        return function (action) {
          if (typeof action !== "function") console.log('dispatching', action);
          var result = next(action); // console.log('next state', store.getState());

          return result;
        };
      };
    };

    middleware = (0, _redux.applyMiddleware)(logger, _reduxThunk.default);
  } else {
    middleware = (0, _redux.applyMiddleware)(_reduxThunk.default);
  }

  return (0, _redux.createStore)(_reducer.gridReducer, state, middleware);
}
},{"redux":"../node_modules/redux/es/redux.js","redux-thunk":"../node_modules/redux-thunk/es/index.js","../reducer":"../src/reducer/index.js"}],"../src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GridApp;

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GridApp() {
  var store = (0, _store.default)();
  window.gridStore = store;
}
},{"./store":"../src/store/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53583" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.js"], null)
//# sourceMappingURL=/src.7ed060e2.js.map
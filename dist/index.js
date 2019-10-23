'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pouchdb = require('pouchdb');

var _pouchdb2 = _interopRequireDefault(_pouchdb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function plugin(plugin) {
  _pouchdb2.default.plugin(plugin);
}

function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!options.name) throw new Error('vuejs-pouchdb → error → please set db name!');
  var dbName = options.name;
  delete options.name;
  var db = new _pouchdb2.default(dbName, options);

  Vue.pouch = db;
  Vue.prototype.$pouch = db;
}

exports.default = {
  install: install,
  plugin: plugin,
  pouchdb: _pouchdb2.default
};

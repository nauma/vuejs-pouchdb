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

function syncRemote(localDB, sync) {
	if (!sync.db) throw new Error('vuejs sync → error → please set remote db name!');

	var options = sync.options || {};

	var onChange = sync.onChange || function () {};
	var onPaused = sync.onPaused || function () {};
	var onActive = sync.onActive || function () {};
	var onError = sync.onError || function () {};

	return localDB.sync(sync.db, options).on('change', onChange).on('paused', onPaused).on('active', onActive).on('error', onError);
}

function install(Vue) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	if (!options.name) throw new Error('vuejs-pouchdb → error → please set db name!');

	var dbName = options.name;
	var sync = options.sync;

	delete options.name;
	var db = new _pouchdb2.default(dbName, options);

	if (sync) {
		delete options.sync;
		Vue.pouchSyncHandler = syncRemote(db, sync);
		Vue.prototype.$pouchSyncHandler = Vue.pouchSyncHandler;
	}

	Vue.pouch = db;
	Vue.prototype.$pouch = db;
}

exports.default = {
	install: install,
	plugin: plugin,
	pouchdb: _pouchdb2.default
};

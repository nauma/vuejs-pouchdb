import pouchdb from 'pouchdb'

function plugin (plugin) {
	pouchdb.plugin(plugin)
}

function syncRemote(localDB, sync) {
	if(!sync.db) throw new Error('vuejs sync → error → please set remote db name!')

	let options = sync.options || {}

	let onChange = sync.onChange || function() {}
	let onPaused = sync.onPaused || function() {}
	let onActive = sync.onActive || function() {}
	let onError  = sync.onError  || function() {}

	return localDB.sync(sync.db, options).
					 on('change', onChange).
					 on('paused', onPaused).
					 on('active', onActive).
					 on('error', onError)
}

function install (Vue, options = {}) {
	if(!options.name) throw new Error('vuejs-pouchdb → error → please set db name!')

	let dbName = options.name
	let sync = options.sync

	delete options.name
	let db = new pouchdb(dbName, options)

	if(sync) {
		delete options.sync
		Vue.pouchSyncHandler = syncRemote(db, sync)
		Vue.prototype.$pouchSyncHandler = Vue.pouchSyncHandler
	}

	Vue.pouch = db
	Vue.prototype.$pouch = db
}

export default {
	install,
	plugin,
	pouchdb
}

import pouchdb from 'pouchdb'

export function plugin (plugin) {
	pouchdb.plugin(plugin)
}

export function install (Vue, options = {}) {
	if(!options.name) throw new Error('vuejs-pouchdb → error → please set db name!')
	let db = new pouchdb(options.name)

	Vue.pouch = db
	Vue.prototype.$pouch = db
}

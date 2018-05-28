# Vuejs-pouchdb

Using pouchdb in vue

# install

```js
npm i vuejs-pouchdb --save
```

# using
### setup
```js
import Vue from 'vue'
import VuePouchDB from 'vuejs-pouchdb'

Vue.use(VuePouchDB, { name: 'test-db' })
```

### using in components

```js
this.$pouch.get('name')
    .then(data => {
        console.log(data)
    })
```
and:
`Vue.pouch`
`VuePouchDB.pouchdb`

### install plugins
```js
import Vue from 'vue'
import VuePouchDB from 'vuejs-pouchdb'
import PouchDbDebug from 'pouchdb-debug'

VuePouchDB.plugin(PouchDebug)
// enable debug
VuePouchDB.pouchdb.debug.enable('*')

Vue.use(VuePouchDB, { name: 'test-db' })
```

License
----
ISC

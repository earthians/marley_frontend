import './index.css'

import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { initSocket } from './socket';

import {
	FrappeUI,
	Button,
	Input,
	TextInput,
	FormControl,
	ErrorMessage,
	Dialog,
	Alert,
	Badge,
	setConfig,
	frappeRequest,
	FeatherIcon,
	resourcesPlugin,
	Avatar,
	Tooltip,
	ListView,
	ListHeader,
	ListHeaderItem,
	ListRows,
	ListRow,
	ListRowItem,
	ListSelectBanner,
} from 'frappe-ui'

let globalComponents = {
	Button,
	Input,
	TextInput,
	FormControl,
	ErrorMessage,
	Dialog,
	Alert,
	Badge,
	FeatherIcon,
	Avatar,
	Tooltip,
	ListView,
	ListHeader,
	ListHeaderItem,
	ListRows,
	ListRow,
	ListRowItem,
	ListSelectBanner,
}

let app = createApp(App)
setConfig('resourceFetcher', frappeRequest)

let socket
if (import.meta.env.DEV) {
	frappeRequest({ url: '/api/method/marley_frontend.www.healthcare.get_context_for_dev' }).then(
		(values) => {
			for (let key in values) {
				window[key] = values[key]
			}
			socket = initSocket();
			app.config.globalProperties.$socket = socket
			app.provide("$socket", socket)
		},
	)
} else {
	socket = initSocket();
	app.provide("$socket", socket)
}
// app.use(FrappeUI)
app.use(resourcesPlugin)

for (let key in globalComponents) {
	app.component(key, globalComponents[key])
}

app.use(router).mount('#app')

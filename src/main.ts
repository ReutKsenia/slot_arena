import './assets/styles/main.scss'

import 'virtual:svg-icons-register';

import { createApp } from 'vue'
import { pinia } from '@/stores';

import App from './App.vue'
import { router } from './router'
import '@/assets/styles/main.scss';

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

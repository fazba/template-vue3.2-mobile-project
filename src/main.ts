import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import '@/assets/css/index.less'
import 'vant/lib/index.css'
const app = createApp(App)
app.use(router).mount('#app')

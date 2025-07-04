import { createApp } from 'vue';
import { router } from './providers/router';
import { pinia } from './providers/pinia';
import App from './App.vue';
import './styles/style.scss';

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
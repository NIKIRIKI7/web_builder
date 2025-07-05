import { createApp } from 'vue';
import { router } from './providers/router';
import { pinia } from './providers/pinia';
import { i18n } from '@/shared/i18n';
import App from './App.vue';
import './styles/style.scss';
import { setupCanvasAutoSave } from '@/features/Canvas/model/canvasStore';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);

setupCanvasAutoSave();

app.mount('#app');
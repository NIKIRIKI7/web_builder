import { createApp } from 'vue';
import { router } from './providers/router';
import { pinia } from './providers/pinia';
import { i18n } from '@/shared/i18n';
import App from './App.vue';
import './styles/style.scss';
import { initializeCommandHandlers } from '@/features/Canvas/model/commands';
import '@/widgets/EditorPanel/ui/controls';

initializeCommandHandlers();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);

app.mount('#app');
import { createApp } from 'vue';

import { initializeCommandHandlers } from '@/features/Canvas/model/commands';
import { i18n } from '@/shared/i18n';
import '@/widgets/EditorPanel/ui/controls';

import App from './App.vue';
import { pinia } from './providers/pinia';
import { router } from './providers/router';
import './styles/style.scss';

initializeCommandHandlers();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);

app.mount('#app');
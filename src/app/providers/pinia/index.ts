import { createPinia } from 'pinia';
// 1. Импортируем плагин
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// 2. Создаем экземпляр как обычно
const pinia = createPinia();

// 3. Регистрируем плагин в экземпляре Pinia
pinia.use(piniaPluginPersistedstate);

// 4. Экспортируем уже настроенный экземпляр
export { pinia };
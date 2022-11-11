import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/stores';
import '@/components/FontAwesomeIcon/index.scss';
import i18n from '@/language/index';
import cuCustom from '@/colorui/components/cu-custom.vue';

import 'uno.css';
import '@/assets/style/main.scss';

export function createApp() {
  const app = createSSRApp(App);
  app.component('cu-custom', cuCustom);
  // Configure store
  setupStore(app);

  app.use(i18n);

  return {
    app,
  };
}

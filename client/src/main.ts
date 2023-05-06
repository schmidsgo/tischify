import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import VueTablerIcons from 'vue-tabler-icons';

const vuetify = createVuetify({
  components,
  directives
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueTablerIcons);

app.use(vuetify).mount('#app');

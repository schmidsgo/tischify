import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'vuetify/styles';
import { createVuetify, type ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    bgGrey: '#E0E0E0',
    bgPink: '#FF4081',
    Blue: '#2979FF',
    lightBlue: '#03A9F4',
    darkGrey: '#757575',
    lightGrey: '#2f2f2f',
    Gold: '#FFAB00'
  }
};

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  components,
  directives
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(vuetify).mount('#app');

import { createApp } from 'vue';
import { createVuetify, ThemeDefinition } from 'vuetify';

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    bgGrey: '#E0E0E0',
    bgPink: '#FF4081',
    Blue: '#2979FF',
    darkGrey: '#757575'
  }
};

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme
    }
  }
});

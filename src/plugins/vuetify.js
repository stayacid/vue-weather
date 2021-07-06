import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import en from './en'
import ru from './ru'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ru, en },
    current: 'ru',
  },
});

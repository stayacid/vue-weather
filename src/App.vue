<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>

      <v-col cols="2" class="pa-0">
        <v-select
          :items="langs"
          v-model="currentLang"
          item-value="abbr"
          item-text="lang"
          return-object
        ></v-select>
      </v-col>
    </v-app-bar>

    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => {
    return {
      currentLang: { lang: 'Russian', abbr: 'ru' },
      langs: [
        { lang: 'Russian', abbr: 'ru' },
        { lang: 'English', abbr: 'en' },
      ],
    };
  },

  methods: {},

  watch: {
    currentLang: function(newLang) {
      this.$vuetify.lang.current = newLang.abbr;
    },
  },
};
</script>

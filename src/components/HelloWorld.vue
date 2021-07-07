<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-form
          class="d-flex align-center"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model.trim="city"
            :label="
              $vuetify.lang.t('$vuetify.search') +
                ' ' +
                $vuetify.lang.t('$vuetify.address')
            "
            :rules="cityRules"
            required
            @keydown.enter.prevent=""
            ref="input"
          ></v-text-field>

          <v-btn :disabled="!valid" color="success" class="mx-4" @click="send">
            {{ $vuetify.lang.t('$vuetify.search') }}
          </v-btn>
        </v-form>

        <v-card-actions v-if="prevCities.length">
          <v-btn
            v-for="city in prevCities"
            :key="city.name"
            @click="send(null, city.name)"
          >
            {{ city.name }}
          </v-btn>
        </v-card-actions>
      </v-col>

      <v-col>
        <v-card
          elevation="1"
          class="mx-auto my-12 px-2"
          max-width="460"
          v-if="cityWeather && cityWeather.cod === 200"
        >
          <v-card-title>{{ this.cityWeather.name }}</v-card-title>

          <v-card-text>
            <v-row justify="center" class="mb-2">
              <h3>Температура</h3>
            </v-row>
            <v-row justify="space-between">
              <div>
                <p class="ma-0">номинал</p>
                <p>{{ this.cityWeather.main.temp }}</p>
              </div>
              <div>
                <p class="ma-0">ощущается как</p>
                <p>{{ this.cityWeather.main.feels_like }}</p>
              </div>
              <div>
                <p class="ma-0">минимальная</p>
                <p>{{ this.cityWeather.main.temp_min }}</p>
              </div>
              <div>
                <p class="ma-0">максимальная</p>
                <p>{{ this.cityWeather.main.temp_max }}</p>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    lang: {
      type: Object,
    },
  },

  data: () => ({
    valid: true,
    city: '',
    cityWeather: null,
    prevCities: [],
    cityRules: [
      (v) => !!v || 'address is required',
      (v) => (v && v.length >= 3) || 'address must be more than 3 characters',
    ],
    url: 'https://api.openweathermap.org/data/2.5/weather',
    apiKey: '84e2a9ad0b2bca1922b23252454cc8a2',
  }),

  beforeMount() {
    const prev = JSON.parse(sessionStorage.getItem('prevCities'));
    if (prev) {
      this.prevCities = prev;
    }
  },

  methods: {
    async send(e, city) {
      let response = await fetch(
        `${this.url}?q=${city ? city : this.city}&appid=${this.apiKey}&lang=${
          this.lang.abbr
        }&units=metric`
      );
      let result = await response.json();
      this.cityWeather = result;
    },
    validate() {
      this.$refs.form.validate();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },

  computed: {
    err() {
      if (this.cityWeather) {
        return this.cityWeather.cod === '404';
      }
    },
  },

  watch: {
    cityWeather(val) {
      if (
        val.cod === 200 &&
        !this.prevCities.some((city) => city.id === val.id)
      ) {
        this.prevCities.push(val);
        sessionStorage.setItem('prevCities', JSON.stringify(this.prevCities));
      } else if (val.cod === '404') {
        this.cityRules.push(() => 'No city was found'); // не нашёл в доках способ триггерить ошибку, поэтому такой костыль
        this.$refs.form.validate();
        this.cityRules.splice(-1, 1);
      }
    },
  },
};
</script>

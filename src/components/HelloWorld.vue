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
          ></v-text-field>

          <v-btn :disabled="!valid" color="success" class="mx-4" @click="send">
            {{ $vuetify.lang.t('$vuetify.search') }}
          </v-btn>
        </v-form>
      </v-col>

      <!-- <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a href="https://community.vuetifyjs.com" target="_blank"
            >Discord Community</a
          >
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          What's next?
        </h2>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    valid: true,
    city: '',
    cityRules: [
        v => !!v || 'address is required',
        v => (v && v.length >= 3) || 'address must be more than 3 characters',
      ],
  }),

  methods: {
    send() {
      this.validate();
      fetch("https://swapi.co/api/people/")
        .then(response => response.json())
        .then(res => {
          if (this.search) {
            this.people = res.results.filter(people =>
              people.name.toLowerCase().includes(this.search.toLowerCase())
            );
          } else {
            this.people = res.results;
          }
        });
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

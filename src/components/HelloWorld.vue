<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-form class="d-flex align-center" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            label="Name"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mx-4"
            @click="validate"
          >
            Search
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
      name: '',
      /*nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],*/
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
  }),

  methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
};
</script>

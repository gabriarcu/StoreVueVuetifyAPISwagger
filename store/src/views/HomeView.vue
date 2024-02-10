<template>
  <div>
    <h1>Homepage</h1>
    <router-link v-if="!isLoggedIn" to="/login"><button>Login</button></router-link>
    <p v-if="isLoggedIn">{{ user.lastName }} </p>
    <p v-if="isLoggedIn">{{ token }} </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'HomeView',
  data() {
    return {

    }

  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapGetters(["user"]),
    ...mapGetters(["token"]),
  },
  methods: {

  },

  mounted() {

  }
}
</script>

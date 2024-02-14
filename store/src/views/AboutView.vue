<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: 'AboutView',
  data() {
    return {
      utenti: []
    }
  },
  methods: {
    getUtenti() {
      fetch('http://localhost:3000/utenti', {
        method: 'GET'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.utenti = data; // Assegna i dati ottenuti dalla risposta a this.utenti
        })
        .catch(error => {

          console.error('There was a problem with your fetch operation:', error);
        });

    }


  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapGetters(["user"]),
    ...mapGetters(["token"]),
  },
  mounted() {
    this.getUtenti();
  }
}
</script>

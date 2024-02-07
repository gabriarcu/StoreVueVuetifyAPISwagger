<template>
    <div>
      <!-- <v-img class="mx-auto my-6" max-width="228"
        src="logo.png"></v-img> -->
  
      <v-card class="mx-auto pa-12 pb-8 my-6" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
  
        <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
          variant="outlined" id="email"></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
  
          <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
            Forgot login password?</a>
        </div>
  
        <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
          density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
          @click:append-inner="visible = !visible" id="pwd"></v-text-field>
  
        <v-card class="mb-12" color="surface-variant" variant="tonal">
          <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If
            you must login now, you can also click "Forgot login password?" below to reset the login password.
          </v-card-text>
        </v-card>
  
        <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="Login()">
          Log In
        </v-btn>
  
        <v-card-text class="text-center">
          <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'LoginView',
    data() {
      return {
        utente: [],
        visible: false,
      }
    },
    methods: {
      Login() {
        const salt = 'paleocapa';
        let email = document.getElementById('email').value;
        let pwd = document.getElementById('pwd').value;
        const hashedPwd = this.$CryptoJS.SHA256(pwd + salt).toString();
        console.log(pwd);
        console.log(hashedPwd);
  
  
  
  
        // dmurphy@classicmodelcars.com
        // 627875803c550ed188130bada97e51aa11db572877cd9adc8c1aeced41b617c7
  
        fetch('http://localhost:3000/impiegati/' + email + '/' + hashedPwd)
          .then(response => response.json())
          .then(data => {
            this.utente = data;
            console.log(this.utente);
          })
  
  
      },
  
    },
    mounted() {
  
    }
  }
  </script>
  
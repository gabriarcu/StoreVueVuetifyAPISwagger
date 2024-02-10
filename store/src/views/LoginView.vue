<template>
  <div>
    <h1>LOGIN</h1>
    <form @submit="login">
      <input id="email" placeholder="email" />
      <br />
      <br />
      <input id="password" placeholder="password" type="password" />
      <br />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: 'LoginView',
  data: () => {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async login(e) {
      e.preventDefault();
      const salt = 'paleocapa';
      const mail = document.getElementById('email').value;
      let pwd = document.getElementById('password').value;
      const hashedPwd = this.$CryptoJS.SHA256(pwd + salt).toString();
      console.log(hashedPwd);
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: mail,
          password: hashedPwd
        }),
      });
      const { user, token } = await response.json();
      this.setUser(user);
      this.setToken(token);
      this.$router.push("/about");
      // localStorage.setItem("user", JSON.stringify (user));
      // localStorage.setItem("token", token);
    },

  },
};
</script>
<template>
  <div class="login-wrapper">
    <div class="container" style="max-width: 400px">
      <h2 class="text-center mb-4">Iniciar Sesión</h2>

      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Correo electrónico</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
            required
          />
        </div>

        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <button type="submit" class="btn btn-danger w-100">Entrar</button>
      </form>

      <!-- 🔻 Link estilizado como botón -->
      <router-link
        to="/register"
        class="btn btn-outline-secondary w-100 mt-2 text-center"
      >
        Crear cuenta nueva
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login", {
          email: this.email.trim(),
          password: this.password,
        });

        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));

        this.$router.push("/pizzas"); // o "/home" si así se llama tu ruta
      } catch (error) {
        console.error("Error en login:", error);
        this.error = error.response?.data?.msg || "Error al iniciar sesión";
      }
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.container {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
</style>

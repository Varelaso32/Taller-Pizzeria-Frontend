<template>
  <div class="login-wrapper">
    <div class="container" style="max-width: 400px">
      <h2 class="text-center mb-4">Crear Cuenta</h2>

      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="name" class="form-label">Nombre</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="name"
            required
          />
        </div>

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

        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <button type="submit" class="btn btn-danger w-100">Registrarse</button>
        <button
          class="btn btn-outline-secondary w-100 mt-2"
          @click="$router.push('/login')"
        >
          Volver
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterView",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async register() {
      try {
        await axios.post("http://127.0.0.1:8000/api/users", {
          name: this.name,
          email: this.email,
          password: this.password,
          role: "cliente",
        });

        this.$router.push("/login");
      } catch (error) {
        this.error = error.response?.data?.msg || "Error al registrar usuario";
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

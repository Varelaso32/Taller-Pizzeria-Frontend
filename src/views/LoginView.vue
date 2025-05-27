<template>
  <div class="login-container container mt-5">
    <h2 class="text-center mb-4">Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="username" class="form-label">Correo:</label>
        <input
          id="username"
          v-model="username"
          required
          class="form-control"
          autocomplete="username"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña:</label>
        <input
          id="password"
          type="password"
          v-model="password"
          required
          class="form-control"
          autocomplete="current-password"
        />
      </div>
      <button type="submit" class="btn btn-danger w-100">Entrar</button>
    </form>
    <p v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const validUser = {
  username: 'admin@example.com',
  password: '1234'
}

function handleLogin() {
  if (username.value === validUser.username && password.value === validUser.password) {
    localStorage.setItem('user', JSON.stringify({ username: username.value }))
    errorMessage.value = ''
    router.push({ name: 'home' })
  } else {
    errorMessage.value = 'Usuario o contraseña incorrectos'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
</style>

<template>
  <div class="login-wrapper">
    <div class="container" style="max-width: 400px;">
      <h2 class="text-center mb-4">Iniciar Sesión</h2>

      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Correo electrónico</label>
          <input type="email" id="email" class="form-control" v-model="email" required />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" id="password" class="form-control" v-model="password" required />
        </div>

        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <button type="submit" class="btn btn-danger w-100">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login() {
      const validUser = {
        email: 'admin@example.com',
        password: '1234'
      };

      if (this.email === validUser.email && this.password === validUser.password) {
        localStorage.setItem('user', JSON.stringify({ email: this.email }));
        this.$router.push('/');
      } else {
        this.error = 'Correo o contraseña incorrectos';
      }
    }
  }
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

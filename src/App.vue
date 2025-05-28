<template>
  <div id="app">
    <div v-if="isLoggedIn" class="d-flex flex-column flex-md-row">
      <!-- Sidebar tipo acordeón -->
      <nav class="sidebar bg-danger text-white p-3 d-flex flex-column justify-content-between">
        <div>
          <h4 class="fw-bold text-white mb-4">🍕 Pizzería</h4>

      <div class="accordion" id="sidebarAccordion">
        <!-- Gestión General -->
        <div class="accordion-item bg-danger border-0">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed bg-danger text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#gestionGeneral"
              aria-expanded="false"
              aria-controls="gestionGeneral"
            >
              🧾 Gestión General
            </button>
          </h2>
          <div
            id="gestionGeneral"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion"
          >
            <div class="accordion-body p-0">
              <router-link class="nav-link ps-4 py-2" to="/users"
                >👥 Usuarios</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/customers"
                >👤 Clientes</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/employees"
                >🧑‍💼 Empleados</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/supliders"
                >🚚 Proveedores</router-link
              >
            </div>
          </div>
        </div>

        <!-- Productos -->
        <div class="accordion-item bg-danger border-0">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed bg-danger text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#productos"
              aria-expanded="false"
              aria-controls="productos"
            >
              🍕 Productos
            </button>
          </h2>
          <div
            id="productos"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion"
          >
            <div class="accordion-body p-0">
              <router-link class="nav-link ps-4 py-2" to="/pizzas"
                >🍕 Pizzas</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/pizza-sizes"
                >📏 Pizza Size</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/ingredients"
                >🌶️ Ingredientes</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/RawMaterials"
                >🧂 Materias Primas</router-link
              >
            </div>
          </div>
        </div>
      </nav>

      <!-- Contenido principal -->
      <main class="main-content flex-grow-1 p-4">
        <router-view />
      </main>
    </div>

    <!-- Si no está logueado -->
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false
    };
  },
  created() {
    this.checkAuth();
  },
  watch: {
    $route() {
      this.checkAuth();
    }
  },
  methods: {
    checkAuth() {
      this.isLoggedIn = !!localStorage.getItem('user');
    },
    logout() {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  min-height: 100vh;
}

.nav-link {
  color: #fff;
  text-decoration: none;
}

.nav-link:hover {
  background-color: #9b0d19;
  border-radius: 5px;
}

.nav-link.router-link-exact-active {
  background-color: #000000;
  color: #ffffff !important;
  border-radius: 5px;
}

.accordion-button:focus {
  box-shadow: none;
}

.accordion-button:not(.collapsed) {
  background-color: #a40f1b;
}

.main-content {
  background-color: #ffffff;
  color: #000000;
  min-height: 100vh;
}
</style>

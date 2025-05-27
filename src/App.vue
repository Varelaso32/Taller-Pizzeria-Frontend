<template>
  <div id="app" class="d-flex flex-column flex-md-row">
    <!-- Sidebar tipo acordeón -->
    <nav class="sidebar bg-danger text-white p-3">
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
              <router-link class="nav-link ps-4 py-2" to="/suppliers"
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
              <router-link class="nav-link ps-4 py-2" to="/categories"
                >📂 Categorías</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/products"
                >🍕 Productos</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/ingredients"
                >🌶️ Ingredientes</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/raw-materials"
                >🧂 Materias Primas</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/pizza-sizes"
                >📏 Tamaños</router-link
              >
            </div>
          </div>
        </div>

        <!-- Relaciones -->
        <div class="accordion-item bg-danger border-0">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed bg-danger text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#relaciones"
              aria-expanded="false"
              aria-controls="relaciones"
            >
              🔁 Relaciones
            </button>
          </h2>
          <div
            id="relaciones"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion"
          >
            <div class="accordion-body p-0">
              <router-link class="nav-link ps-4 py-2" to="/pizza-ingredients"
                >🍽️ Ingred. por Pizza</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/pizza-raw-materials"
                >⚙️ Mat. por Pizza</router-link
              >
            </div>
          </div>
        </div>

        <!-- Operaciones -->
        <div class="accordion-item bg-danger border-0">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed bg-danger text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#operaciones"
              aria-expanded="false"
              aria-controls="operaciones"
            >
              📦 Operaciones
            </button>
          </h2>
          <div
            id="operaciones"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion"
          >
            <div class="accordion-body p-0">
              <router-link class="nav-link ps-4 py-2" to="/orders"
                >📦 Órdenes</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/order-pizzas"
                >🍕 Orden Pizzas</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/order-extras"
                >➕ Extras</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/purchases"
                >🧾 Compras</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/pay-modes"
                >💳 Modos de Pago</router-link
              >
            </div>
          </div>
        </div>

        <!-- Acerca -->
        <div class="accordion-item bg-danger border-0">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed bg-danger text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#otros"
              aria-expanded="false"
              aria-controls="otros"
            >
              ℹ️ Otros
            </button>
          </h2>
          <div
            id="otros"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion"
          >
            <div class="accordion-body p-0">
              <router-link class="nav-link ps-4 py-2" to="/"
                >🏠 Inicio</router-link
              >
            </div>
            <div class="accordion-body p-0">
              <router-link class="nav-link ps-4 py-2" to="/about"
                >ℹ️ Acerca</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <main class="main-content flex-grow-1 p-4">
      <router-view />
    </main>
  </div>
</template>

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
 
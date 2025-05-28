<template>
  <div id="app" class="d-flex flex-column flex-md-row">
    <!-- Sidebar tipo acordeón -->
    <nav class="sidebar bg-danger text-white p-3">
      <h4 class="fw-bold text-white mb-4">🍕 {{ $t("sidebar.title") }}</h4>

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
              🧾 {{ $t("sidebar.general") }}
            </button>
          </h2>
          <div
            id="gestionGeneral"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion"
          >
            <div class="accordion-body p-0">
              <router-link class="nav-link ps-4 py-2" to="/users"
                >👥 {{ $t("sidebar.users") }}</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/clients"
                >👤 {{ $t("sidebar.clients") }}</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/employees"
                >🧑‍💼 {{ $t("sidebar.employees") }}</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/supliders"
                >🚚 {{ $t("sidebar.suppliers") }}</router-link
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
              💰 {{ $t("sidebar.products") }}
            </button>
          </h2>
          <div
            id="productos"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion"
          >
            <div class="accordion-body p-0">
              <router-link class="nav-link ps-4 py-2" to="/pizzas"
                >🍕 {{ $t("sidebar.pizzas") }}</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/pizza-sizes"
                >📏 {{ $t("sidebar.pizzaSizes") }}</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/ingredients"
                >🌶️ {{ $t("sidebar.ingredients") }}</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/RawMaterials"
                >🧂 {{ $t("sidebar.rawMaterials") }}</router-link
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
              🔁 {{ $t("sidebar.relations") }}
            </button>
          </h2>
          <div
            id="relaciones"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion"
          >
            <div class="accordion-body p-0">
              <router-link class="nav-link ps-4 py-2" to="/pizza-ingredients"
                >🍽️ {{ $t("sidebar.pizzaIngredients") }}</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/pizza-raw-materials"
                >⚙️ {{ $t("sidebar.pizzaRawMaterials") }}</router-link
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
              📦 {{ $t("sidebar.operations") }}
            </button>
          </h2>
          <div
            id="operaciones"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion"
          >
            <div class="accordion-body p-0">
              <router-link class="nav-link ps-4 py-2" to="/orders"
                >📦 {{ $t("sidebar.orders") }}</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/order-pizzas"
                >🍕 {{ $t("sidebar.orderPizzas") }}</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/order-extras"
                >➕ {{ $t("sidebar.extras") }}</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/purchases"
                >🧾 {{ $t("sidebar.purchases") }}</router-link
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
              ℹ️ {{ $t("sidebar.other") }}
            </button>
          </h2>
          <div
            id="otros"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion"
          >
            <div class="accordion-body p-0">
              <router-link class="nav-link ps-4 py-2" to="/"
                >🏠 {{ $t("sidebar.home") }}</router-link
              >
              <router-link class="nav-link ps-4 py-2" to="/about"
                >ℹ️ {{ $t("sidebar.about") }}</router-link
              >
            </div>
          </div>
        </div>

        <!-- Botones de idioma -->
        <div class="mt-4 text-center">
          <button
            @click="$i18n.locale = 'es'"
            class="btn btn-light btn-sm me-2"
          >
            🇪🇸 ES
          </button>
          <button @click="$i18n.locale = 'en'" class="btn btn-light btn-sm">
            🇺🇸 EN
          </button>
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

<template>
  <div id="app" class="d-flex flex-column flex-md-row">
    <!-- Sidebar -->
    <nav class="sidebar p-3">
      <!-- Encabezado -->
      <h4 class="fw-bold text-white mb-4">🍕 {{ $t("sidebar.title") }}</h4>

      <!-- Menú acordeón -->
      <div class="accordion" id="sidebarAccordion">
        <!-- Gestión General -->
        <div class="accordion-item bg-transparent border-0">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed bg-transparent text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#gestionGeneral"
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
              <router-link class="nav-link" to="/users"
                >👥 {{ $t("sidebar.users") }}</router-link
              >
              <router-link class="nav-link" to="/customers"
                >👤 {{ $t("sidebar.customers") }}</router-link
              >
              <router-link class="nav-link" to="/employees"
                >🧑‍💼 {{ $t("sidebar.employees") }}</router-link
              >
              <router-link class="nav-link" to="/suppliers"
                >🚚 {{ $t("sidebar.suppliers") }}</router-link
              >
            </div>
          </div>
        </div>

        <!-- Productos -->
        <div class="accordion-item bg-transparent border-0">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed bg-transparent text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#productos"
            >
              🍕 {{ $t("sidebar.products") }}
            </button>
          </h2>
          <div
            id="productos"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion"
          >
            <div class="accordion-body p-0">
              <router-link class="nav-link" to="/categories"
                >📂 {{ $t("sidebar.categories") }}</router-link
              >
              <router-link class="nav-link" to="/products"
                >🍕 {{ $t("sidebar.pizzas") }}</router-link
              >
              <router-link class="nav-link" to="/ingredients"
                >🌶️ {{ $t("sidebar.ingredients") }}</router-link
              >
              <router-link class="nav-link" to="/raw-materials"
                >🧂 {{ $t("sidebar.rawMaterials") }}</router-link
              >
              <router-link class="nav-link" to="/pizza-sizes"
                >📏 {{ $t("sidebar.sizes") }}</router-link
              >
            </div>
          </div>
        </div>

        <!-- Relaciones -->
        <div class="accordion-item bg-transparent border-0">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed bg-transparent text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#relaciones"
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
              <router-link class="nav-link" to="/pizza-ingredients"
                >🍽️ {{ $t("sidebar.pizzaIngredients") }}</router-link
              >
              <router-link class="nav-link" to="/pizza-raw-materials"
                >⚙️ {{ $t("sidebar.pizzaRawMaterials") }}</router-link
              >
            </div>
          </div>
        </div>

        <!-- Operaciones -->
        <div class="accordion-item bg-transparent border-0">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed bg-transparent text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#operaciones"
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
              <router-link class="nav-link" to="/orders"
                >📦 {{ $t("sidebar.orders") }}</router-link
              >
              <router-link class="nav-link" to="/order-pizzas"
                >🍕 {{ $t("sidebar.orderPizzas") }}</router-link
              >
              <router-link class="nav-link" to="/order-extras"
                >➕ {{ $t("sidebar.orderExtras") }}</router-link
              >
              <router-link class="nav-link" to="/purchases"
                >🧾 {{ $t("sidebar.purchases") }}</router-link
              >
              <router-link class="nav-link" to="/pay-modes"
                >💳 {{ $t("sidebar.payModes") }}</router-link
              >
            </div>
          </div>
        </div>

        <!-- Otros -->
        <div class="accordion-item bg-transparent border-0">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed bg-transparent text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#otros"
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
              <router-link class="nav-link" to="/">{{
                $t("sidebar.home")
              }}</router-link>
              <router-link class="nav-link" to="/about">{{
                $t("sidebar.about")
              }}</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones de idioma -->
      <div class="lang-switcher mt-auto d-flex gap-2 pt-4">
        <button
          @click="$i18n.locale = 'es'"
          class="btn btn-outline-light btn-sm w-100"
        >
          🇪🇸 ES
        </button>
        <button
          @click="$i18n.locale = 'en'"
          class="btn btn-outline-light btn-sm w-100"
        >
          🇬🇧 EN
        </button>
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
  width: 260px;
  min-height: 100vh;
  background-color: #f44336; /* rojo suave */
  display: flex;
  flex-direction: column;
}

.accordion-button {
  background-color: transparent;
  color: #ffffff;
  font-weight: 600;
  transition: background-color 0.2s;
  border: none;
}

.accordion-button:not(.collapsed) {
  background-color: #c1121f; /* rojo fuerte */
  color: #fff;
}

.accordion-body {
  background-color: #ffebee; /* submenú: rojo muy claro */
}

.accordion-body .nav-link {
  color: #212529;
  padding: 8px 16px;
  display: block;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.accordion-body .nav-link:hover {
  background-color: #c1121f;
  color: #fff;
  border-radius: 6px;
}

.nav-link.router-link-exact-active {
  background-color: #a60f1a;
  color: #ffffff !important;
  border-radius: 6px;
}

.lang-switcher {
  padding: 1rem;
  border-top: 1px solid #ffcccc;
}

.lang-switcher button {
  font-weight: bold;
  font-size: 0.85rem;
  border-radius: 6px;
  background-color: #ffffff;
  color: #c1121f;
  border: 1px solid #c1121f;
}

.lang-switcher button:hover {
  background-color: #c1121f;
  color: white;
}

.main-content {
  background-color: #ffffff;
  color: #000000;
  min-height: 100vh;
}
</style>

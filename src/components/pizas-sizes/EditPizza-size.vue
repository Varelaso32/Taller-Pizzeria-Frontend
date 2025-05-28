<template>
  <div class="container py-4">
    <h1 class="text-danger fw-bold mb-4">Editar Tamaño de Pizza</h1>
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">Datos del Tamaño</div>
      <div class="card-body">
        <form @submit.prevent="updatePizzaSize">
          <!-- Pizza -->
          <div class="mb-3">
            <label for="pizza_id" class="form-label">Pizza:</label>
            <select
              id="pizza_id"
              v-model="form.pizza_id"
              class="form-select"
              required
            >
              <option disabled value="">Seleccione una pizza</option>
              <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                {{ pizza.name }}
              </option>
            </select>
          </div>

          <!-- Tamaño -->
          <div class="mb-3">
            <label for="size" class="form-label">Tamaño:</label>
            <select id="size" v-model="form.size" class="form-select" required>
              <option disabled value="">Seleccione un tamaño</option>
              <option value="pequeña">Pequeña</option>
              <option value="mediana">Mediana</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <!-- Precio -->
          <div class="mb-3">
            <label for="price" class="form-label">Precio (COP):</label>
            <input
              id="price"
              v-model="form.price"
              type="number"
              class="form-control"
              required
              placeholder="Ingrese el precio en COP"
            />
          </div>

          <!-- Botones -->
          <button type="submit" class="btn btn-warning text-white">
            <font-awesome-icon icon="save" class="me-2" />
            Actualizar
          </button>
          <button
            type="button"
            class="btn btn-secondary ms-2"
            @click="cancelEdit"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditPizzaSize",
  data() {
    return {
      form: {
        pizza_id: "",
        size: "",
        price: "",
      },
      pizzas: [],
    };
  },
  methods: {
    async fetchPizzaSize() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/pizza-sizes/${id}`
        );
        this.form = response.data;
      } catch (error) {
        console.error("Error al cargar tamaño:", error);
        Swal.fire("Error", "No se pudo cargar el tamaño de pizza.", "error");
        this.$router.push({ name: "PizzaSizes" });
      }
    },
    async fetchPizzas() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/pizzas");
        this.pizzas = response.data;
      } catch (error) {
        console.error("Error al cargar pizzas:", error);
        Swal.fire("Error", "No se pudieron cargar las pizzas.", "error");
      }
    },
    async updatePizzaSize() {
      const id = this.$route.params.id;
      try {
        await axios.put(
          `http://127.0.0.1:8000/api/pizza-sizes/${id}`,
          this.form
        );
        Swal.fire(
          "¡Actualizado!",
          "El tamaño de pizza ha sido actualizado correctamente.",
          "success"
        );
        this.$router.push({ name: "Pizza-Sizes" });
      } catch (error) {
        console.error("Error al actualizar tamaño:", error);
        Swal.fire(
          "Error",
          "No se pudo actualizar el tamaño de pizza.",
          "error"
        );
      }
    },
    cancelEdit() {
      this.$router.push({ name: "Pizza-Sizes" });
    },
  },
  mounted() {
    this.fetchPizzaSize();
    this.fetchPizzas();
  },
};
</script>

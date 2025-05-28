<template>
  <div class="container py-4">
    <h1 class="text-danger fw-bold mb-4">Nuevo Tamaño de Pizza</h1>
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">Datos del Tamaño</div>
      <div class="card-body">
        <form @submit.prevent="createPizzaSize">
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
          <button
            type="submit"
            class="btn text-white"
            style="background-color: #c1121f"
          >
            Guardar
          </button>
          <button
            type="button"
            class="btn btn-secondary ms-2"
            @click="cancelCreate"
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
  name: "NewPizzaSize",
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
    async fetchPizzas() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/pizzas");
        this.pizzas = res.data;
      } catch (err) {
        console.error("Error al obtener pizzas:", err);
        Swal.fire("Error", "No se pudieron cargar las pizzas.", "error");
      }
    },
    async createPizzaSize() {
      try {
        await axios.post("http://127.0.0.1:8000/api/pizza-sizes", this.form);
        Swal.fire(
          "¡Creado!",
          "Tamaño de pizza registrado correctamente.",
          "success"
        );
        this.$router.push({ name: "Pizza-Sizes" }); // redirige después de guardar
      } catch (err) {
        console.error("Error al crear tamaño:", err);
        Swal.fire("Error", "No se pudo crear el tamaño de pizza.", "error");
      }
    },
    cancelCreate() {
      this.$router.push({ name: "Pizza-Sizes" });
    },
  },
  mounted() {
    this.fetchPizzas();
  },
};
</script>

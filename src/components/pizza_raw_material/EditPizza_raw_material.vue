<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">Editar Ingrediente de Pizza</h1>
    <div class="card">
      <div class="card-header fw-bold">Información del Ingrediente</div>
      <div class="card-body">
        <form @submit.prevent="updatePizzaRawMaterial">
          <!-- Pizza -->
          <div class="mb-3">
            <label for="pizza_id" class="form-label">Pizza</label>
            <select
              id="pizza_id"
              v-model="form.pizza_id"
              class="form-select"
              required
            >
              <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                {{ pizza.name }}
              </option>
            </select>
          </div>

          <!-- Materia Prima -->
          <div class="mb-3">
            <label for="raw_material_id" class="form-label">Ingrediente</label>
            <select
              id="raw_material_id"
              v-model="form.raw_material_id"
              class="form-select"
              required
            >
              <option
                v-for="material in rawMaterials"
                :key="material.id"
                :value="material.id"
              >
                {{ material.name }}
              </option>
            </select>
          </div>

          <!-- Cantidad -->
          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              id="quantity"
              v-model="form.quantity"
              class="form-control"
              required
            />
          </div>

          <!-- Botones -->
          <button type="submit" class="btn text-white" style="background-color: #c1121f">
            Guardar
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">
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
  name: "EditPizzaRawMaterial",
  data() {
    return {
      form: {
        pizza_id: "",
        raw_material_id: "",
        quantity: 0,
      },
      pizzas: [],
      rawMaterials: [],
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "PizzaRawMaterialList" });
    },
    async updatePizzaRawMaterial() {
      const id = this.$route.params.id;

      try {
        await axios.put(`http://127.0.0.1:8000/api/pizza-raw-materials/${id}`, this.form);
        Swal.fire({
          icon: "success",
          title: "Actualizado",
          text: "El ingrediente fue actualizado correctamente",
          timer: 2000,
          showConfirmButton: false,
          position: "top-end",
        });
        this.$router.push({ name: "PizzaRawMaterials" });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.msg || "Error al actualizar el ingrediente.",
        });
      }
    },
    async loadData() {
      const id = this.$route.params.id;

      try {
        const [pizzaRes, materialRes, currentRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/pizzas"),
          axios.get("http://127.0.0.1:8000/api/raw-materials"),
          axios.get(`http://127.0.0.1:8000/api/pizza-raw-materials/${id}`),
        ]);

        this.pizzas = pizzaRes.data;
        this.rawMaterials = materialRes.data;
        this.form = {
          pizza_id: currentRes.data.pizza_id,
          raw_material_id: currentRes.data.raw_material_id,
          quantity: currentRes.data.quantity,
        };
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al cargar los datos.",
        });
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

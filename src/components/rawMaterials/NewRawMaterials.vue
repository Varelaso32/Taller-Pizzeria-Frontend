<template>
  <div class="container py-4">
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">Nueva Materia Prima</div>
      <div class="card-body">
        <form @submit.prevent="createRawMaterial">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="form-control"
              required
              maxlength="100"
            />
          </div>
          <div class="mb-3">
            <label for="unit" class="form-label">Unidad</label>
            <input
              type="text"
              id="unit"
              v-model="form.unit"
              class="form-control"
              required
              maxlength="50"
            />
          </div>
          <div class="mb-3">
            <label for="current_stock" class="form-label">Stock Actual</label>
            <input
              type="number"
              id="current_stock"
              v-model="form.current_stock"
              class="form-control"
              min="0"
              required
            />
          </div>
          <button type="submit" class="btn btn-danger me-2">Crear</button>
          <button type="button" class="btn btn-secondary" @click="cancelCreate">
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
  name: "NewRawMaterials",
  data() {
    return {
      form: {
        name: "",
        unit: "",
        current_stock: 0,
      },
    };
  },
  methods: {
    createRawMaterial() {
      axios
        .post("http://127.0.0.1:8000/api/raw-materials", this.form)
        .then(() => {
          Swal.fire(
            "Creado",
            "La materia prima ha sido creada correctamente.",
            "success"
          );
          this.$router.push({ name: "RawMaterials" });
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            Swal.fire("Error", error.response.data.msg, "error");
          } else {
            Swal.fire("Error", "No se pudo crear la materia prima.", "error");
          }
        });
    },
    cancelCreate() {
      this.$router.push({ name: "RawMaterials" });
    },
  },
};
</script>

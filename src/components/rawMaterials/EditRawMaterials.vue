<template>
  <div class="container py-4">
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">Editar Materia Prima</div>
      <div class="card-body">
        <form v-if="form" @submit.prevent="updateRawMaterial">
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
          <button type="submit" class="btn btn-danger me-2">Guardar</button>
          <button type="button" class="btn btn-secondary" @click="cancelEdit">
            Cancelar
          </button>
        </form>
        <div v-else>
          <p>Cargando datos...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditRawMaterials",
  data() {
    return {
      form: null,
    };
  },
  mounted() {
    this.fetchRawMaterial();
  },
  methods: {
    fetchRawMaterial() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/raw-materials/${id}`)
        .then((response) => {
          this.form = response.data;
        })
        .catch(() => {
          Swal.fire("Error", "No se pudo cargar la materia prima.", "error");
          this.$router.push({ name: "RawMaterials" });
        });
    },
    updateRawMaterial() {
      const id = this.$route.params.id;
      axios
        .put(`http://127.0.0.1:8000/api/raw-materials/${id}`, this.form)
        .then(() => {
          Swal.fire(
            "Actualizado",
            "La materia prima ha sido actualizada correctamente.",
            "success"
          );
          this.$router.push({ name: "RawMaterials" });
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            Swal.fire("Error", error.response.data.msg, "error");
          } else {
            Swal.fire(
              "Error",
              "No se pudo actualizar la materia prima.",
              "error"
            );
          }
        });
    },
    cancelEdit() {
      this.$router.push({ name: "RawMaterials" });
    },
  },
};
</script>

<template>
  <div class="container py-4">
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">{{ $t("rawMaterials.editTitle") }}</div>
      <div class="card-body">
        <form @submit.prevent="updateRawMaterial">
          <div class="mb-3">
            <label for="name" class="form-label">{{ $t("rawMaterials.name") }}</label>
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
            <label for="unit" class="form-label">{{ $t("rawMaterials.unit") }}</label>
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
            <label for="current_stock" class="form-label">{{ $t("rawMaterials.current_stock") }}</label>
            <input
              type="number"
              id="current_stock"
              v-model="form.current_stock"
              class="form-control"
              min="0"
              required
            />
          </div>
          <button type="submit" class="btn btn-danger me-2">{{ $t("buttons.update") }}</button>
          <button type="button" class="btn btn-secondary" @click="cancelUpdate">
            {{ $t("buttons.cancel") }}
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
  name: "EditRawMaterials",
  data() {
    return {
      form: {
        name: "",
        unit: "",
        current_stock: 0,
      },
    };
  },
  mounted() {
    this.loadRawMaterial();
  },
  methods: {
    loadRawMaterial() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/raw-materials/${id}`)
        .then((response) => {
          this.form = response.data;
        })
        .catch(() => {
          Swal.fire(this.$t("alerts.error"), this.$t("rawMaterials.loadError"), "error");
          this.$router.push({ name: "RawMaterials" });
        });
    },
    updateRawMaterial() {
      const id = this.$route.params.id;
      axios
        .put(`http://127.0.0.1:8000/api/raw-materials/${id}`, this.form)
        .then(() => {
          Swal.fire(
            this.$t("alerts.updated"),
            this.$t("rawMaterials.updatedSuccess"),
            "success"
          );
          this.$router.push({ name: "RawMaterials" });
        })
        .catch(() => {
          Swal.fire(this.$t("alerts.error"), this.$t("rawMaterials.updateError"), "error");
        });
    },
    cancelUpdate() {
      this.$router.push({ name: "RawMaterials" });
    },
  },
};
</script>

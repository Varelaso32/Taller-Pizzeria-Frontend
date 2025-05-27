<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-primary">
        <font-awesome-icon icon="code-branch" class="me-2" />
        {{ $t("branches.editBranch") }}
      </h1>
      <button @click="$router.go(-1)" class="btn btn-secondary">
        {{ $t("common.back") }}
      </button>
    </div>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="name" class="form-label">{{
              $t("branches.name")
            }}</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="form.name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">{{
              $t("branches.address")
            }}</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="form.address"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">
            {{ $t("common.save") }}
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
  name: "EditBranch",
  data() {
    return {
      form: {
        name: "",
        address: "",
      },
    };
  },
  created() {
    this.fetchBranch();
  },
  methods: {
    fetchBranch() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/branches/${id}`)
        .then((response) => {
          this.form = {
            name: response.data.name,
            address: response.data.address,
          };
        })
        .catch(() => {
          Swal.fire({
            title: "Error",
            text: "No se pudo cargar la sucursal",
            icon: "error",
            confirmButtonColor: "#0d6efd",
          });
        });
    },
    submitForm() {
      const id = this.$route.params.id;
      axios
        .put(`http://127.0.0.1:8000/api/branches/${id}`, this.form)
        .then(() => {
          Swal.fire({
            title: "¡Éxito!",
            text: "Sucursal actualizada correctamente",
            icon: "success",
            confirmButtonColor: "#0d6efd",
          }).then(() => {
            this.$router.push({ name: "Branches" });
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Error",
            text: "No se pudo actualizar la sucursal",
            icon: "error",
            confirmButtonColor: "#0d6efd",
          });
        });
    },
  },
};
</script>

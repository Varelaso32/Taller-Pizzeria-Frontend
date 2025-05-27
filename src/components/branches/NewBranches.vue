<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-primary">
        <font-awesome-icon icon="code-branch" class="me-2" />
        {{ $t("branches.newBranch") }}
      </h1>
      <button @click="$router.go(-1)" class="btn btn-secondary">
        {{ $t("common.back") }}
      </button>
    </div>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="name" class="form-label">{{ $t("branches.name") }}</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="form.name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">{{ $t("branches.address") }}</label>
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
  name: "NewBranch",
  data() {
    return {
      form: {
        name: "",
        address: "",
      },
    };
  },
  methods: {
    submitForm() {
      axios
        .post("http://127.0.0.1:8000/api/branches", this.form)
        .then(() => {
          Swal.fire({
            title: "¡Éxito!",
            text: "Sucursal creada correctamente",
            icon: "success",
            confirmButtonColor: "#0d6efd",
          }).then(() => {
            this.$router.push({ name: "Branches" });
          });
        })
        .catch((error) => {
          console.error("Error creating branch:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo crear la sucursal",
            icon: "error",
            confirmButtonColor: "#0d6efd",
          });
        });
    },
  },
};
</script>
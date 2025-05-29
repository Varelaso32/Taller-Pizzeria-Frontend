<template>
  <div class="container py-4">
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">{{ $t("suppliers.new") }}</div>
      <div class="card-body">
        <form @submit.prevent="createSupplier">
          <div class="mb-3">
            <label for="name" class="form-label">{{ $t("suppliers.name") }}</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="form-control"
              required
              maxlength="255"
            />
          </div>
          <div class="mb-3">
            <label for="contact_info" class="form-label">{{ $t("suppliers.contact") }}</label>
            <input
              type="text"
              id="contact_info"
              v-model="form.contact_info"
              class="form-control"
              required
              maxlength="255"
            />
          </div>
          <button type="submit" class="btn btn-danger me-2">{{ $t("buttons.create") }}</button>
          <button type="button" class="btn btn-secondary" @click="cancelCreate">
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
  name: "NewSupliders",
  data() {
    return {
      form: {
        name: "",
        contact_info: "",
      },
    };
  },
  methods: {
    createSupplier() {
      axios
        .post("http://127.0.0.1:8000/api/suppliers", this.form)
        .then(() => {
          Swal.fire(
            this.$t("alerts.created"),
            this.$t("suppliers.created_success"),
            "success"
          );
          this.$router.push({ name: "Supliders" });
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            Swal.fire(this.$t("alerts.error"), error.response.data.msg, "error");
          } else {
            Swal.fire(this.$t("alerts.error"), this.$t("suppliers.create_error"), "error");
          }
        });
    },
    cancelCreate() {
      this.$router.push({ name: "Supliders" });
    },
  },
};
</script>

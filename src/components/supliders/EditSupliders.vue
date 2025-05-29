<template>
  <div class="container py-4">
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">{{ $t("suppliers.edit") }}</div>
      <div class="card-body">
        <form v-if="form" @submit.prevent="updateSupplier">
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
          <button type="submit" class="btn btn-danger me-2">{{ $t("buttons.save") }}</button>
          <button type="button" class="btn btn-secondary" @click="cancelEdit">
            {{ $t("buttons.cancel") }}
          </button>
        </form>
        <div v-else>
          <p>{{ $t("loading") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditSupliders",
  data() {
    return {
      form: null,
    };
  },
  mounted() {
    this.fetchSupplier();
  },
  methods: {
    fetchSupplier() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/suppliers/${id}`)
        .then((response) => {
          this.form = response.data;
        })
        .catch(() => {
          Swal.fire(this.$t("alerts.error"), this.$t("suppliers.load_error"), "error");
          this.$router.push({ name: "Supliders" });
        });
    },
    updateSupplier() {
      const id = this.$route.params.id;
      axios
        .put(`http://127.0.0.1:8000/api/suppliers/${id}`, this.form)
        .then(() => {
          Swal.fire(
            this.$t("alerts.updated"),
            this.$t("suppliers.updated_success"),
            "success"
          );
          this.$router.push({ name: "Supliders" });
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            Swal.fire(this.$t("alerts.error"), error.response.data.msg, "error");
          } else {
            Swal.fire(this.$t("alerts.error"), this.$t("suppliers.update_error"), "error");
          }
        });
    },
    cancelEdit() {
      this.$router.push({ name: "Supliders" });
    },
  },
};
</script>

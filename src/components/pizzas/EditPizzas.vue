<template>
  <div class="container py-4">
    <h1 class="text-danger fw-bold mb-4">{{ $t("pizzas.editTitle") }}</h1>
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">{{ $t("pizzas.dataTitle") }}</div>
      <div class="card-body">
        <form @submit.prevent="updatePizza">
          <div class="mb-3">
            <label for="name" class="form-label">{{ $t("pizzas.name") }}</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="form-control"
              required
              :placeholder="$t('pizzas.namePlaceholder')"
            />
          </div>

          <button type="submit" class="btn btn-danger">
            {{ $t("buttons.update") }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancelEdit">
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
  name: "EditPizza",
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  mounted() {
    this.fetchPizza();
  },
  methods: {
    fetchPizza() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/pizzas/${id}`)
        .then((response) => {
          this.form.name = response.data.name;
        })
        .catch(() => {
          Swal.fire(this.$t("alerts.error"), this.$t("pizzas.loadError"), "error");
          this.$router.push({ name: "Pizzas" });
        });
    },
    updatePizza() {
      const id = this.$route.params.id;
      axios
        .put(`http://127.0.0.1:8000/api/pizzas/${id}`, this.form)
        .then(() => {
          Swal.fire(this.$t("alerts.updated"), this.$t("pizzas.updatedSuccess"), "success");
          this.$router.push({ name: "Pizzas" });
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            Swal.fire(this.$t("alerts.error"), this.$t("pizzas.errorNameInvalid"), "error");
          } else {
            Swal.fire(this.$t("alerts.error"), this.$t("pizzas.updateError"), "error");
          }
        });
    },
    cancelEdit() {
      this.$router.push({ name: "Pizzas" });
    },
  },
};
</script>

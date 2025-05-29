<template>
  <div class="container py-4">
    <h1 class="text-danger fw-bold mb-4">{{ $t("pizzas.newTitle") }}</h1>
    <div class="card shadow-sm rounded">
      <div class="card-header fw-bold">{{ $t("pizzas.dataTitle") }}</div>
      <div class="card-body">
        <form @submit.prevent="createPizza">
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
            {{ $t("buttons.create") }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancelCreate">
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
  name: "NewPizza",
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  methods: {
    createPizza() {
  const vm = this;
  axios
    .post("http://127.0.0.1:8000/api/pizzas", this.form)
    .then(() => {
      Swal.fire(vm.$t("alerts.created"), vm.$t("pizzas.createdSuccess"), "success");
      vm.$router.push({ name: "Pizzas" });
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        Swal.fire(vm.$t("alerts.error"), vm.$t("pizzas.errorNameInvalid"), "error");
      } else {
        Swal.fire(vm.$t("alerts.error"), vm.$t("pizzas.createError"), "error");
      }
    });
},
    cancelCreate() {
      this.$router.push({ name: "Pizzas" });
    },
  },
};
</script>

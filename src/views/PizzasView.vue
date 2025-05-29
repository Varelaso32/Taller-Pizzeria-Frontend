<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="pizza-slice" class="me-2" />
        {{ $t("pizzas.title") }}
      </h1>
      <button @click="newPizza" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        {{ $t("pizzas.new") }}
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>{{ $t("pizzas.name") }}</th>
            <th>{{ $t("pizzas.created") }}</th>
            <th>{{ $t("pizzas.updated") }}</th>
            <th class="text-center">{{ $t("pizzas.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pizza, index) in pizzas" :key="pizza.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ pizza.name }}</td>
            <td>{{ formatDate(pizza.created_at) }}</td>
            <td>{{ formatDate(pizza.updated_at) }}</td>
            <td class="text-center">
              <button @click="editPizza(pizza.id)" class="btn btn-sm btn-warning me-2">
                <font-awesome-icon icon="pencil" />
              </button>
              <button @click="deletePizza(pizza.id)" class="btn btn-sm btn-danger">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="pizzas.length === 0">
            <td colspan="5" class="text-center py-4 text-muted">
              {{ $t("pizzas.noPizzas") }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "PizzasView",
  data() {
    return {
      pizzas: [],
    };
  },
  methods: {
    fetchPizzas() {
      axios
        .get("http://127.0.0.1:8000/api/pizzas")
        .then((response) => {
          this.pizzas = response.data;
        })
        .catch((error) => {
          console.error(this.$t("pizzas.errorLoad"), error);
        });
    },
    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleString();
    },
    newPizza() {
      this.$router.push({ name: "NewPizzas" });
    },
    editPizza(id) {
      this.$router.push({ name: "EditPizzas", params: { id } });
    },
    deletePizza(id) {
      Swal.fire({
        title: this.$t("pizzas.deleteTitle", { id }),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: this.$t("pizzas.deleteConfirm"),
        cancelButtonText: this.$t("pizzas.deleteCancel"),
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/pizzas/${id}`)
            .then(() => {
              Swal.fire(
                this.$t("pizzas.deleted"),
                this.$t("pizzas.deletedMsg"),
                "success"
              );
              this.fetchPizzas();
            })
            .catch((error) => {
              console.error(this.$t("pizzas.deleteError"), error);
              Swal.fire(this.$t("alerts.error"), this.$t("pizzas.deleteError"), "error");
            });
        }
      });
    },
  },
  mounted() {
    this.fetchPizzas();
  },
};
</script>

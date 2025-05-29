<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="pizza-slice" class="me-2" />
        {{ $t("orderPizza.title") }}
      </h1>
      <button @click="newOrderPizza" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        {{ $t("orderPizza.create") }}
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>ID</th>
            <th>{{ $t("orderPizza.order") }}</th>
            <th>{{ $t("orderPizza.unitPrice") }}</th>
            <th>{{ $t("orderPizza.quantity") }}</th>
            <th>{{ $t("orderPizza.createdAt") }}</th>
            <th class="text-center">{{ $t("orderPizza.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pizza in pizzas" :key="pizza.id">
            <th scope="row">{{ pizza.id }}</th>
            <td>{{ pizza.order_id }}</td>
            <td>{{ pizza.pizza_size_price }}</td>
            <td>{{ pizza.quantity }}</td>
            <td>{{ pizza.created_at }}</td>
            <td class="text-center">
              <button @click="editOrderPizza(pizza.id)" class="btn btn-sm btn-warning me-2">
                <font-awesome-icon icon="pencil" />
              </button>
              <button @click="deleteOrderPizza(pizza.id)" class="btn btn-sm btn-danger">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="pizzas.length === 0">
            <td colspan="6" class="text-center py-4 text-muted">
              {{ $t("orderPizza.noData") }}
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
  name: "OrderPizzaView",
  data() {
    return {
      pizzas: [],
    };
  },
  methods: {
    fetchPizzas() {
      axios
        .get("http://127.0.0.1:8000/api/order_pizzas")
        .then((res) => {
          this.pizzas = res.data;
        })
        .catch((err) => {
          console.error("Error loading pizzas:", err);
        });
    },
    deleteOrderPizza(id) {
      Swal.fire({
        title: this.$t("orderPizza.confirmDelete"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: this.$t("orderPizza.delete"),
        cancelButtonText: this.$t("orderPizza.cancel"),
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/order_pizzas/${id}`)
            .then(() => {
              Swal.fire(this.$t("orderPizza.deleted"), "", "success");
              this.fetchPizzas();
            })
            .catch(() => {
              Swal.fire(this.$t("orderPizza.deleteError"), "", "error");
            });
        }
      });
    },
    editOrderPizza(id) {
      this.$router.push({ name: "EditOrderPizza", params: { id } });
    },
    newOrderPizza() {
      this.$router.push({ name: "NewOrderPizza" });
    },
  },
  mounted() {
    this.fetchPizzas();
  },
};
</script>

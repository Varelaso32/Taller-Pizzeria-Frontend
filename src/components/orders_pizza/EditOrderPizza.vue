<template>
  <div class="container py-4">
    <h1 class="h3 mb-4 text-danger">
      <font-awesome-icon icon="pizza-slice" class="me-2" />
      {{ $t("orderPizza.editTitle") }}
    </h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">{{ $t("orderPizza.formRegister") }}</div>
      <div class="card-body">
        <form @submit.prevent="updateOrderPizza">
          <div class="mb-3">
            <label for="order_id" class="form-label">{{ $t("orderPizza.order") }}</label>
            <select id="order_id" v-model="form.order_id" class="form-select" required>
              <option value="">{{ $t("orderPizza.selectOrder") }}</option>
              <option v-for="order in orders" :key="order.id" :value="order.id">
                {{ order.id }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="pizza_size_price" class="form-label">{{ $t("orderPizza.size") }}</label>
            <select id="pizza_size_price" v-model="form.pizza_size_price" class="form-select" required>
              <option value="">{{ $t("orderPizza.selectSize") }}</option>
              <option value="6.99">Pequeña - $6.99</option>
              <option value="8.99">Mediana - $8.99</option>
              <option value="10.99">Grande - $10.99</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="quantity" class="form-label">{{ $t("orderPizza.quantity") }}</label>
            <input type="number" min="1" class="form-control" id="quantity" v-model="form.quantity" required />
          </div>

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-danger me-2">
              <font-awesome-icon icon="save" class="me-2" />
              {{ $t("orderPizza.save") }}
            </button>
            <router-link to="/order-pizza" class="btn btn-secondary">
              {{ $t("orderPizza.back") }}
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPizzaSlice, faSave } from "@fortawesome/free-solid-svg-icons";

library.add(faPizzaSlice, faSave);

export default {
  name: "EditOrderPizza",
  data() {
    return {
      orders: [],
      form: {
        order_id: "",
        pizza_size_price: "",
        quantity: 1,
      },
    };
  },
  methods: {
    getOrders() {
      axios.get("http://127.0.0.1:8000/api/orders")
        .then(res => (this.orders = res.data))
        .catch(err => console.error("Error al obtener órdenes:", err));
    },
    getOrderPizza() {
      const id = this.$route.params.id;
      axios.get(`http://127.0.0.1:8000/api/order_pizzas/${id}`)
        .then(res => {
          this.form = {
            order_id: res.data.order_id,
            pizza_size_price: res.data.pizza_size_price,
            quantity: res.data.quantity,
          };
        })
        .catch(err => console.error("Error al obtener pizza por orden:", err));
    },
    updateOrderPizza() {
      const id = this.$route.params.id;
      axios.put(`http://127.0.0.1:8000/api/order_pizzas/${id}`, this.form)
        .then(() => {
          Swal.fire(this.$t("orderPizza.updated"), "", "success");
          this.$router.push("/order-pizza");
        })
        .catch(() => Swal.fire("Error", this.$t("orderPizza.updateError"), "error"));
    },
  },
  mounted() {
    this.getOrders();
    this.getOrderPizza();
  },
};
</script>

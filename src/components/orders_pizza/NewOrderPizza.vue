<template>
  <div class="container py-4">
    <h1 class="text-danger fw-bold mb-4">
      <font-awesome-icon icon="plus" class="me-2" />
      Nueva Pizza en Orden
    </h1>

    <div class="card">
      <div class="card-header fw-bold bg-danger text-white">
        Formulario de Registro
      </div>
      <div class="card-body">
        <form @submit.prevent="saveOrderPizza">
          <!-- Orden -->
          <div class="mb-3">
            <label for="order_id" class="form-label">Orden</label>
            <select
              v-model="orderPizza.order_id"
              id="order_id"
              class="form-select"
              required
            >
              <option disabled value="">Seleccione una orden</option>
              <option v-for="order in orders" :key="order.id" :value="order.id">
                 {{ order.client_name }} - Orden #{{ order.id }}
              </option>
            </select>
          </div>

          <!-- Tamaño de Pizza -->
          <div class="mb-3">
            <label for="pizza_size_id" class="form-label"
              >Tamaño de Pizza</label
            >
            <select
              v-model="orderPizza.pizza_size_id"
              id="pizza_size_id"
              class="form-select"
              required
            >
              <option disabled value="">Seleccione un tamaño</option>
              <option
                v-for="size in pizzaSizes"
                :key="size.id"
                :value="size.id"
              >
                {{ size.pizza_name }} - ${{ Number(size.price).toFixed(2) }}
              </option>
            </select>
          </div>

          <!-- Cantidad -->
          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad</label>
            <input
              type="number"
              id="quantity"
              class="form-control"
              v-model="orderPizza.quantity"
              min="1"
              required
            />
          </div>

          <!-- Botones -->
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-danger me-2">
              <font-awesome-icon icon="save" class="me-1" />
              Guardar
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="$router.back()"
            >
              <font-awesome-icon icon="arrow-left" class="me-1" />
              Cancelar
            </button>
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
import { faSave, faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faSave, faArrowLeft, faPlus);

export default {
  name: "NewOrderPizza",
  data() {
    return {
      orderPizza: {
        order_id: "",
        pizza_size_id: "",
        quantity: 1,
      },
      orders: [],
      pizzaSizes: [],
    };
  },
  methods: {
    fetchOrders() {
      axios.get("http://127.0.0.1:8000/api/orders").then((res) => {
        this.orders = res.data;
      });
    },
    fetchPizzaSizes() {
      axios.get("http://127.0.0.1:8000/api/pizza-sizes").then((res) => {
        this.pizzaSizes = res.data;
      });
    },
    saveOrderPizza() {
      axios
        .post("http://127.0.0.1:8000/api/order_pizzas", this.orderPizza)
        .then(() => {
          Swal.fire(
            "Guardado",
            "Pizza agregada a la orden correctamente",
            "success"
          );
          this.$router.push({ name: "OrderPizza" });
        })
        .catch((error) => {
          console.error("Error al guardar:", error);
          Swal.fire(
            "Error",
            "No se pudo guardar la pizza en la orden",
            "error"
          );
        });
    },
  },
  mounted() {
    this.fetchOrders();
    this.fetchPizzaSizes();
  },
};
</script>

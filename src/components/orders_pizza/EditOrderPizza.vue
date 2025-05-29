<template>
  <div class="container py-4">
    <h1 class="text-danger fw-bold mb-4">
      <font-awesome-icon icon="pencil" class="me-2" />
      Editar Pizza en Orden
    </h1>

    <div class="card">
      <div class="card-header fw-bold bg-danger text-white">
        Formulario de Edición
      </div>
      <div class="card-body">
        <form @submit.prevent="updateOrderPizza">
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
                Orden #{{ order.id }}
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
                {{ size.name }} - ${{ Number(size.price).toFixed(2) }}
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
            <button type="submit" class="btn btn-warning me-2 text-white">
              <font-awesome-icon icon="save" class="me-1" />
              Actualizar
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
import {
  faSave,
  faArrowLeft,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSave, faArrowLeft, faPencil);

export default {
  name: "EditOrderPizza",
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
    fetchOrderPizza() {
      axios
        .get(`http://127.0.0.1:8000/api/order_pizzas/${this.$route.params.id}`)
        .then((res) => {
          this.orderPizza = res.data;
        })
        .catch((err) => {
          console.error("Error al cargar la pizza por orden:", err);
        });
    },
    updateOrderPizza() {
      axios
        .put(
          `http://127.0.0.1:8000/api/order_pizzas/${this.$route.params.id}`,
          this.orderPizza
        )
        .then(() => {
          Swal.fire(
            "Actualizado",
            "La pizza fue actualizada correctamente",
            "success"
          );
          this.$router.push({ name: "OrderPizza" });
        })
        .catch((err) => {
          console.error("Error al actualizar:", err);
          Swal.fire("Error", "No se pudo actualizar la pizza", "error");
        });
    },
  },
  mounted() {
    this.fetchOrders();
    this.fetchPizzaSizes();
    this.fetchOrderPizza();
  },
};
</script>

<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="pizza-slice" class="me-2" />
        Pizzas por Orden
      </h1>
      <button
        @click="newOrderPizza"
        class="btn btn-danger d-flex align-items-center"
      >
        <font-awesome-icon icon="plus" class="me-2" />
        Agregar Pizza a Orden
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-bordered align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>ID</th>
            <th>Orden</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Fecha de creación</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderPizzas" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.order_id }}</td>
            <td>${{ Number(item.pizza_size_price).toFixed(2) }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.created_at }}</td>
            <td class="text-center">
              <button
                @click="editOrderPizza(item.id)"
                class="btn btn-sm btn-warning me-2"
                title="Editar"
              >
                <font-awesome-icon icon="pencil" />
              </button>
              <button
                @click="deleteOrderPizza(item.id)"
                class="btn btn-sm btn-danger"
                title="Eliminar"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="orderPizzas.length === 0">
            <td colspan="6" class="text-center py-4 text-muted">
              No hay registros de pizzas en órdenes.
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
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPizzaSlice,
  faPlus,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPizzaSlice, faPlus, faPencil, faTrash);

export default {
  name: "OrderPizzaView",
  data() {
    return {
      orderPizzas: [],
    };
  },
  methods: {
    fetchOrderPizzas() {
      axios
        .get("http://127.0.0.1:8000/api/order_pizzas")
        .then((res) => {
          this.orderPizzas = res.data;
        })
        .catch((err) => {
          console.error("Error al obtener las pizzas por orden:", err);
        });
    },
    deleteOrderPizza(id) {
      Swal.fire({
        title: `¿Eliminar pizza en orden con ID ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/order_pizzas/${id}`)
            .then((res) => {
              this.orderPizzas = res.data;
              Swal.fire(
                "Eliminado",
                "Pizza eliminada correctamente.",
                "success"
              );
            })
            .catch((error) => {
              console.error("Error al eliminar:", error);
              Swal.fire("Error", "No se pudo eliminar el registro.", "error");
            });
        }
      });
    },
    editOrderPizza(id) {
      this.$router.push({ name: "EditOrderPizza", params: { id: `${id}` } });
    },
    newOrderPizza() {
      this.$router.push({ name: "NewOrderPizza" });
    },
  },
  mounted() {
    this.fetchOrderPizzas();
  },
};
</script>

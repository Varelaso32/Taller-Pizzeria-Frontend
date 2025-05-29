<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="pepper-hot" class="me-2" />
        {{ $t("orderExtra.title") }}
      </h1>
      <button
        @click="newOrderExtra"
        class="btn btn-danger d-flex align-items-center"
      >
        <font-awesome-icon icon="plus" class="me-2" />
        {{ $t("orderExtra.newButton") }}
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>{{ $t("orderExtra.table.order") }}</th>
            <th>{{ $t("orderExtra.table.client") }}</th>
            <th>{{ $t("orderExtra.table.extraIngredient") }}</th>
            <th>{{ $t("orderExtra.table.quantity") }}</th>
            <th class="text-center">{{ $t("orderExtra.table.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orderExtras" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.client_name }}</td>
            <td>{{ item.extra_ingredient_name }}</td>
            <td>{{ item.quantity }}</td>
            <td class="text-center">
              <button
                @click="editOrderExtra(item.id)"
                class="btn btn-sm btn-warning me-2"
              >
                <font-awesome-icon icon="pencil" />
              </button>
              <button
                @click="deleteOrderExtra(item.id)"
                class="btn btn-sm btn-danger"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="orderExtras.length === 0">
            <td colspan="6" class="text-center py-4 text-muted">
              {{ $t("orderExtra.table.noRecords") }}
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
  name: "OrderExtra",
  data() {
    return {
      orderExtras: [],
    };
  },
  methods: {
    fetchOrderExtras() {
      axios
        .get("http://127.0.0.1:8000/api/order_extra_ingredients")
        .then((response) => {
          this.orderExtras = response.data;
        })
        .catch((error) => {
          console.error("Error al cargar los datos:", error);
        });
    },
    deleteOrderExtra(id) {
      Swal.fire({
        title: this.$t("orderExtra.confirmDeleteTitle", { id }),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: this.$t("orderExtra.table.actions").toLowerCase() === 'eliminar' ? 'Eliminar' : 'Delete',
        cancelButtonText: this.$t("orderExtra.cancel"),
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/order_extra_ingredients/${id}`)
            .then(() => {
              Swal.fire(
                this.$t("orderExtra.deletedSuccess"),
                "",
                "success"
              );
              this.fetchOrderExtras();
            })
            .catch(() => {
              Swal.fire("Error", this.$t("orderExtra.deleteError"), "error");
            });
        }
      });
    },
    editOrderExtra(id) {
      this.$router.push({ name: "Order_extraEdit", params: { id: `${id}` } });
    },
    newOrderExtra() {
      this.$router.push({ name: "Order_extraNew" });
    },
  },
  mounted() {
    this.fetchOrderExtras();
  },
};
</script>

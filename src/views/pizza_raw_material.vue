<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="pizza-slice" class="me-2" />
        {{ $t("pizza_raw_material.title") }}
      </h1>
      <button @click="newIngredient" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        {{ $t("pizza_raw_material.new") }}
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>{{ $t("pizza_raw_material.table.number") }}</th>
            <th>{{ $t("pizza_raw_material.table.pizza") }}</th>
            <th>{{ $t("pizza_raw_material.table.raw_material") }}</th>
            <th>{{ $t("pizza_raw_material.table.quantity") }}</th>
            <th class="text-center">{{ $t("pizza_raw_material.table.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in ingredients" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.pizza_name }}</td>
            <td>{{ item.raw_material_name }}</td>
            <td>{{ item.quantity }}</td>
            <td class="text-center">
              <button @click="editIngredient(item.id)" class="btn btn-sm btn-warning me-2">
                <font-awesome-icon icon="pencil" />
              </button>
              <button @click="deleteIngredient(item.id)" class="btn btn-sm btn-danger">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="ingredients.length === 0">
            <td colspan="5" class="text-center py-4 text-muted">
              {{ $t("pizza_raw_material.no_data") }}
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
  name: "PizzaRawMaterialList",
  data() {
    return {
      ingredients: [],
    };
  },
  methods: {
    fetchIngredients() {
      axios
        .get("http://127.0.0.1:8000/api/pizza-raw-materials")
        .then((response) => {
          this.ingredients = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteIngredient(id) {
      Swal.fire({
        title: this.$t("pizza_raw_material.messages.confirm_delete", { id }),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: this.$t("pizza_raw_material.table.delete"),
        cancelButtonText: this.$t("pizza_raw_material.form.cancel"),
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/pizza-raw-materials/${id}`)
            .then((response) => {
              Swal.fire(this.$t("pizza_raw_material.messages.deleted"), this.$t("pizza_raw_material.messages.deleted_success"), "success");
              this.ingredients = response.data;
            })
            .catch((error) => {
              console.error(error);
              Swal.fire("Error", this.$t("pizza_raw_material.messages.delete_error"), "error");
            });
        }
      });
    },
    editIngredient(id) {
      this.$router.push({ name: "EditarMateriaPrima", params: { id } });
    },
    newIngredient() {
      this.$router.push({ name: "NuevaMateriaPrima" });
    },
  },
  mounted() {
    this.fetchIngredients();
  },
};
</script>

<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="carrot" class="me-2" />
        {{ $t("extraIngredient.title") }}
      </h1>
      <button @click="newExtraIngredient" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        {{ $t("extraIngredient.new") }}
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>{{ $t("extraIngredient.name") }}</th>
            <th>{{ $t("extraIngredient.price") }}</th>
            <th class="text-center">{{ $t("extraIngredient.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ingredient, index) in extraIngredients" :key="ingredient.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ ingredient.name }}</td>
            <td>{{ Number(ingredient.price).toFixed(2) }}</td>
            <td class="text-center">
              <button
                @click="editExtraIngredient(ingredient.id)"
                class="btn btn-sm btn-warning me-2"
              >
                <font-awesome-icon icon="pencil" />
              </button>
              <button
                @click="deleteExtraIngredient(ingredient.id)"
                class="btn btn-sm btn-danger"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="extraIngredients.length === 0">
            <td colspan="4" class="text-center py-4 text-muted">
              {{ $t("extraIngredient.noExtraIngredients") }}
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "ExtraIngredientsList",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      extraIngredients: [],
    };
  },
  methods: {
    fetchExtraIngredients() {
      axios
        .get("http://127.0.0.1:8000/api/extra_ingredients")
        .then((response) => {
          this.extraIngredients = response.data;
        })
        .catch(() => {
          Swal.fire(
            this.$t("extraIngredient.loadError"),
            this.$t("extraIngredient.loadError"),
            "error"
          );
        });
    },
    deleteExtraIngredient(id) {
      Swal.fire({
        title: this.$t("extraIngredient.deleteConfirm", { id }),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: this.$t("extraIngredient.buttons.delete"),
        cancelButtonText: this.$t("extraIngredient.buttons.cancel"),
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/extra_ingredients/${id}`)
            .then(() => {
              Swal.fire(
                this.$t("extraIngredient.deleteSuccess"),
                "",
                "success"
              );
              this.fetchExtraIngredients();
            })
            .catch(() => {
              Swal.fire(
                this.$t("extraIngredient.deleteError"),
                "",
                "error"
              );
            });
        }
      });
    },
    editExtraIngredient(id) {
      this.$router.push({ name: "EditExtraIngredient", params: { id: `${id}` } });
    },
    newExtraIngredient() {
      this.$router.push({ name: "NewExtraIngredient" });
    },
  },
  mounted() {
    this.fetchExtraIngredients();
  },
};
</script>

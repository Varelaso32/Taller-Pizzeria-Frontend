<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="pepper-hot" class="me-2" />
        {{ $t("ingredients.title") }}
      </h1>
      <button
        @click="newIngredient"
        class="btn btn-danger d-flex align-items-center"
      >
        <font-awesome-icon icon="plus" class="me-2" />
        {{ $t("ingredients.new") }}
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>{{ $t("ingredients.name") }}</th>
            <th class="text-center">{{ $t("ingredients.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ingredient, index) in ingredients" :key="ingredient.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ ingredient.name }}</td>
            <td class="text-center">
              <button
                @click="editIngredient(ingredient.id)"
                class="btn btn-sm btn-warning me-2"
                :title="$t('ingredients.edit')"
              >
                <font-awesome-icon icon="pencil" />
              </button>
              <button
                @click="deleteIngredient(ingredient.id)"
                class="btn btn-sm btn-danger"
                :title="$t('ingredients.delete_confirm_button')"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="ingredients.length === 0">
            <td colspan="3" class="text-center py-4 text-muted">
              {{ $t("ingredients.no_ingredients") }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "IngredientsView",
  data() {
    return {
      ingredients: [],
      error: "",
    };
  },
  methods: {
    async getIngredients() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/ingredients");
        this.ingredients = res.data;
      } catch (e) {
        this.error = this.$t("ingredients.load_error");
      }
    },
    deleteIngredient(id) {
      Swal.fire({
        title: this.$t("ingredients.delete_confirm_title", { id }),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: this.$t("ingredients.delete_confirm_button"),
        cancelButtonText: this.$t("ingredients.delete_cancel_button"),
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/ingredients/${id}`)
            .then(() => {
              Swal.fire(
                this.$t("ingredients.deleted_success"),
                "",
                "success"
              );
              this.getIngredients();
            })
            .catch(() => {
              this.error = this.$t("ingredients.delete_error");
              Swal.fire(this.$t("ingredients.delete_error"), "", "error");
            });
        }
      });
    },
    editIngredient(id) {
      this.$router.push({ name: "Edit Ingredients", params: { id: `${id}` } });
    },
    newIngredient() {
      this.$router.push({ name: "New Ingredients" });
    },
  },
  mounted() {
    this.getIngredients();
  },
};
</script>

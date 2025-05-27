<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("branches.newTitle") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("branches.header") }}</div>
      <div class="card-body">
        <form @submit.prevent="saveBranch">
          <!-- Nombre -->
          <div class="mb-3">
            <label for="name" class="form-label">{{
              $t("branches.name")
            }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="building" />
              </span>
              <input
                type="text"
                id="name"
                v-model="branch.name"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Dirección -->
          <div class="mb-3">
            <label for="address" class="form-label">{{
              $t("branches.address")
            }}</label>
            <div class="input-group">
              <span class="input-group-text">
                <font-awesome-icon icon="map-marker-alt" />
              </span>
              <input
                type="text"
                id="address"
                v-model="branch.address"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Botones -->
          <button
            type="submit"
            class="btn text-white"
            style="background-color: #c1121f"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
            {{ loading ? $t("buttons.saving") : $t("buttons.save") }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">
            {{ $t("buttons.cancel") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "NewBranch",
  data() {
    return {
      branch: {
        name: "",
        address: ""
      },
      loading: false
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Branches" });
    },
    async saveBranch() {
      this.loading = true;
      
      try {
        const response = await axios.post("/api/branches", this.branch);
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("branches.createdSuccess"),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Branches" });
      } catch (error) {
        console.error("Error creating branch:", error);
        
        let errorMsg = this.$t("branches.createError");
        if (error.response?.data?.msg) {
          errorMsg = error.response.data.msg;
        }
        
        Swal.fire({
          icon: "error",
          title: this.$t("errors.title"),
          text: errorMsg,
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
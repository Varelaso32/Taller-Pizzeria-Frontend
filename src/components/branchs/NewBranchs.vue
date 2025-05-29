<template>
  <div class="container text-start">
    <h1 class="text-success fw-bold">{{ $t("branches.new") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("branches.form_title") }}</div>
      <div class="card-body">
        <form @submit.prevent="createBranch">
          <!-- Nombre -->
          <div class="mb-3">
            <label for="name" class="form-label"
              >{{ $t("branches.name") }}:</label
            >
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
            <label for="address" class="form-label"
              >{{ $t("branches.address") }}:</label
            >
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
            style="background-color: #2b9348"
          >
            {{ $t("branches.save") }}
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">
            {{ $t("branches.cancel") }}
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
  name: "CrearBranch",
  data() {
    return {
      branch: {
        name: "",
        address: "",
      },
    };
  },
  methods: {
    async createBranch() {
      try {
        await axios.post("http://127.0.0.1:8000/api/branchs", this.branch);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("branches.created_success"),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Branchs" });
      } catch (error) {
        const msg =
          error.response?.data?.msg || this.$t("branches.create_error");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: msg,
        });
      }
    },
    cancel() {
      this.$router.push({ name: "Branchs" });
    },
  },
};
</script>

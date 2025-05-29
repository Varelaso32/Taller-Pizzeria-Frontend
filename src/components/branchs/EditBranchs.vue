<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold">{{ $t("branches.edit") }}</h1>
    <div class="card">
      <div class="card-header fw-bold">{{ $t("branches.form_title") }}</div>
      <div class="card-body">
        <form @submit.prevent="updateBranch">
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
            style="background-color: #c1121f"
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
  name: "EditarBranch",
  data() {
    return {
      branch: {
        name: "",
        address: "",
      },
    };
  },
  methods: {
    async fetchBranch() {
      const id = this.$route.params.id;
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/branchs/${id}`);
        this.branch = res.data;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: this.$t("branches.load_error"),
        });
        this.$router.push({ name: "Branchs" });
      }
    },
    async updateBranch() {
      const id = this.$route.params.id;
      try {
        await axios.put(`http://127.0.0.1:8000/api/branchs/${id}`, this.branch);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.$t("branches.updated_success"),
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "Branchs" });
      } catch (error) {
        const msg =
          error.response?.data?.msg || this.$t("branches.update_error");
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
  mounted() {
    this.fetchBranch();
  },
};
</script>

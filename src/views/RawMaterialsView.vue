<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="box-open" class="me-2" />
        {{ $t("rawMaterials.title") }}
      </h1>
      <button @click="newRawMaterial" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        {{ $t("rawMaterials.new") }}
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>{{ $t("rawMaterials.name") }}</th>
            <th>{{ $t("rawMaterials.unit") }}</th>
            <th>{{ $t("rawMaterials.current_stock") }}</th>
            <th>{{ $t("rawMaterials.created") }}</th>
            <th>{{ $t("rawMaterials.updated") }}</th>
            <th class="text-center">{{ $t("rawMaterials.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(material, index) in rawMaterials" :key="material.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ material.name }}</td>
            <td>{{ material.unit }}</td>
            <td>{{ material.current_stock }}</td>
            <td>{{ formatDate(material.created_at) }}</td>
            <td>{{ formatDate(material.updated_at) }}</td>
            <td class="text-center">
              <button @click="editRawMaterial(material.id)" class="btn btn-sm btn-warning me-2">
                <font-awesome-icon icon="pencil" />
              </button>
              <button @click="deleteRawMaterial(material.id)" class="btn btn-sm btn-danger">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="rawMaterials.length === 0">
            <td colspan="7" class="text-center py-4 text-muted">
              {{ $t("rawMaterials.noMaterials") }}
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
  name: "RawMaterialsView",
  data() {
    return {
      rawMaterials: [],
    };
  },
  methods: {
    fetchRawMaterials() {
      axios
        .get("http://127.0.0.1:8000/api/raw-materials")
        .then((response) => {
          this.rawMaterials = response.data;
        })
        .catch((error) => {
          console.error(this.$t("rawMaterials.errorLoad"), error);
        });
    },
    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleString();
    },
    newRawMaterial() {
      this.$router.push({ name: "NewRawMaterials" });
    },
    editRawMaterial(id) {
      this.$router.push({ name: "EditRawMaterials", params: { id } });
    },
    deleteRawMaterial(id) {
      Swal.fire({
        title: this.$t("rawMaterials.deleteTitle", { id }),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: this.$t("rawMaterials.deleteConfirm"),
        cancelButtonText: this.$t("rawMaterials.deleteCancel"),
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/raw-materials/${id}`)
            .then(() => {
              Swal.fire(
                this.$t("rawMaterials.deleted"),
                this.$t("rawMaterials.deletedMsg"),
                "success"
              );
              this.fetchRawMaterials();
            })
            .catch((error) => {
              console.error(this.$t("rawMaterials.deleteError"), error);
              Swal.fire(this.$t("alerts.error"), this.$t("rawMaterials.deleteError"), "error");
            });
        }
      });
    },
  },
  mounted() {
    this.fetchRawMaterials();
  },
};
</script>

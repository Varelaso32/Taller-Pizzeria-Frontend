<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="store" class="me-2" />
        Sucursales
      </h1>
      <router-link
        to="/branchs/new"
        class="btn btn-success d-flex align-items-center"
      >
        <font-awesome-icon icon="plus" class="me-2" />
        Nueva Sucursal
      </router-link>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(branch, index) in branches" :key="branch.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ branch.name }}</td>
            <td>{{ branch.address }}</td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-warning me-2"
                @click="editBranch(branch.id)"
              >
                <font-awesome-icon icon="pencil" />
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="deleteBranch(branch.id)"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="branches.length === 0">
            <td colspan="4" class="text-center py-4 text-muted">
              No hay sucursales registradas.
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
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStore,
  faPlus,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

library.add(faStore, faPlus, faPencil, faTrash);

export default {
  name: "BranchsList",
  data() {
    return {
      branches: [],
    };
  },
  methods: {
    fetchBranches() {
      axios
        .get("http://127.0.0.1:8000/api/branchs")
        .then((res) => {
          this.branches = res.data;
        })
        .catch((err) => {
          console.error("Error al obtener sucursales:", err);
          Swal.fire("Error", "No se pudieron cargar las sucursales", "error");
        });
    },
    deleteBranch(id) {
      Swal.fire({
        title: `¿Eliminar la sucursal con ID ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/branchs/${id}`)
            .then(() => {
              Swal.fire(
                "Eliminado",
                "Sucursal eliminada correctamente",
                "success"
              );
              this.fetchBranches();
            })
            .catch((err) => {
              console.error("Error al eliminar sucursal:", err);
              Swal.fire("Error", "No se pudo eliminar la sucursal", "error");
            });
        }
      });
    },
    editBranch(id) {
      this.$router.push({ name: "EditarBranch", params: { id } });
    },
    newBranch() {
      this.$router.push({ name: "NuevaBranch" });
    },
  },
  mounted() {
    this.fetchBranches();
  },
};
</script>

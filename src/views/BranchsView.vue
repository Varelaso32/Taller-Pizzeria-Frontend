<template>
  <div class="container text-start">
    <h1 class="text-danger fw-bold mb-4">Sucursales</h1>
    <router-link to="/branchs/new" class="btn btn-success mb-3">
      Nueva Sucursal
    </router-link>
    <div class="card">
      <div class="card-header fw-bold">Listado de Sucursales</div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="branch in branches" :key="branch.id">
              <td>{{ branch.name }}</td>
              <td>{{ branch.address }}</td>
              <td>
                <router-link
                  class="btn btn-warning btn-sm me-2"
                  :to="{ name: 'EditarBranch', params: { id: branch.id } }"
                >
                  Editar
                </router-link>
                <button
                  class="btn btn-danger btn-sm"
                  @click="deleteBranch(branch.id)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="error" class="text-danger">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      branches: [],
      error: ''
    };
  },
  created() {
    this.getBranches();
  },
  methods: {
    async getBranches() {
      try {
        const res = await fetch('/api/branchs');
        this.branches = await res.json();
      } catch (e) {
        this.error = 'No se pudieron cargar las sucursales.';
      }
    },
    async deleteBranch(id) {
      if (!confirm('¿Eliminar sucursal?')) return;
      try {
        const res = await fetch(`/api/branchs/${id}`, {
          method: 'DELETE'
        });
        this.branches = await res.json();
      } catch (e) {
        this.error = 'Error eliminando sucursal.';
      }
    }
  }
};
</script>

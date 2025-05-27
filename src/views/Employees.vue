<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="user-tie" class="me-2" /> Listado de Empleados
      </h1>
      <button @click="newEmployee" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        Nuevo Empleado
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Cargo</th>
            <th>Identificación</th>
            <th>Salario</th>
            <th>Fecha de Contratación</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employees" :key="employee.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ employee.user_name }}</td>
            <td>{{ employee.user_email }}</td>
            <td>{{ employee.user_role }}</td>
            <td>{{ employee.position }}</td>
            <td>{{ employee.identification_number }}</td>
            <td>${{ Number(employee.salary).toFixed(2) }}</td>
            <td>{{ formatDate(employee.hire_date) }}</td>
            <td class="text-center">
              <button
                @click="editEmployee(employee.id)"
                class="btn btn-sm btn-warning me-2"
              >
                <font-awesome-icon icon="pencil" />
              </button>
              <button
                @click="deleteEmployee(employee.id)"
                class="btn btn-sm btn-danger"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="employees.length === 0">
            <td colspan="9" class="text-center py-4 text-muted">
              No hay empleados registrados.
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
  name: "EmployeesList",
  data() {
    return {
      employees: [],
    };
  },
  methods: {
    fetchEmployees() {
      axios
        .get("http://127.0.0.1:8000/api/employees")
        .then((response) => {
          this.employees = response.data;
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
        });
    },
    deleteEmployee(id) {
      Swal.fire({
        title: `¿Deseas eliminar al empleado con ID ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/employees/${id}`)
            .then((response) => {
              Swal.fire(
                "¡Eliminado!",
                "El empleado ha sido eliminado.",
                "success"
              );
              this.employees = response.data;
            })
            .catch((error) => {
              console.error("Error deleting employee:", error);
              Swal.fire("Error", "No se pudo eliminar el empleado.", "error");
            });
        }
      });
    },
    editEmployee(id) {
      this.$router.push({ name: "EditarEmpleado", params: { id: `${id}` } });
    },
    newEmployee() {
      this.$router.push({ name: "NuevoEmpleado" });
    },
    formatDate(dateStr) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateStr).toLocaleDateString("es-ES", options);
    },
  },
  mounted() {
    this.fetchEmployees();
  },
};
</script>

<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-danger">
        <font-awesome-icon icon="user-tie" class="me-2" />
        {{ $t("employees.list_title") }}
      </h1>
      <button @click="newEmployee" class="btn btn-danger d-flex align-items-center">
        <font-awesome-icon icon="plus" class="me-2" />
        {{ $t("employees.new_employee") }}
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-striped align-middle mb-0">
        <thead class="table-dark text-white">
          <tr>
            <th>#</th>
            <th>{{ $t("employees.name") }}</th>
            <th>{{ $t("employees.email") }}</th>
            <th>{{ $t("employees.role") }}</th>
            <th>{{ $t("employees.position") }}</th>
            <th>{{ $t("employees.identification_number") }}</th>
            <th>{{ $t("employees.salary") }}</th>
            <th>{{ $t("employees.hire_date") }}</th>
            <th class="text-center">{{ $t("employees.actions") }}</th>
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
              <button @click="editEmployee(employee.id)" class="btn btn-sm btn-warning me-2" :title="$t('buttons.update')">
                <font-awesome-icon icon="pencil" />
              </button>
              <button @click="deleteEmployee(employee.id)" class="btn btn-sm btn-danger" :title="$t('buttons.delete')">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
          <tr v-if="employees.length === 0">
            <td colspan="9" class="text-center py-4 text-muted">
              {{ $t("employees.no_employees") }}
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
        title: this.$t("employees.delete_confirm", { id }),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: this.$t("buttons.delete"),
        cancelButtonText: this.$t("buttons.cancel"),
        confirmButtonColor: "#c1121f",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/employees/${id}`)
            .then((response) => {
              Swal.fire(
                this.$t("employees.deleted_title"),
                this.$t("employees.deleted_message"),
                "success"
              );
              this.employees = response.data;
            })
            .catch((error) => {
              console.error("Error deleting employee:", error);
              Swal.fire(this.$t("alerts.error"), this.$t("employees.delete_error"), "error");
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
      return new Date(dateStr).toLocaleDateString(this.$i18n.locale, options);
    },
  },
  mounted() {
    this.fetchEmployees();
  },
};
</script>

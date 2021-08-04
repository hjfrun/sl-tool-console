<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h3>User Management</h3>
    </v-app-bar>

    <v-main class="mx-5 mt-2">
      <user-table></user-table>
    </v-main>
  </v-app>
</template>

<script>

import UserTable from './views/UserTable.vue'

export default {
  name: 'App',
  components: {
    UserTable
  }
}
</script>

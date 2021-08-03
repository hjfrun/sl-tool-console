<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>User Management</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
    </v-main>
  </v-app>
</template>

<script>

import API from './api'

export default {
  name: 'App',

  data() {
    return {
      headers: [
        {
          text: 'Email',
          align: 'start',
          value: 'email'
        },
        {
          text: 'Role',
          align: 'start',
          value: 'role'
        },
        {
          text: 'Last login time',
          align: 'end',
          value: 'last_login_time'
        }
      ],
      users: []
    }
  },
  async created() {
    const user = await API.getAllUsers()
    this.users = user.users
  }
}
</script>

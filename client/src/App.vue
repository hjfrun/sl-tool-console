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
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Current User List</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New User
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Add New User</span>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="newUser.email"
                    label="Email"
                  ></v-text-field>
                  <v-text-field
                    v-model="newUser.role"
                    label="Role"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
      </v-data-table>
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
      users: [],
      dialog: false,
      newUser: {
        email: '',
        role: ''
      },
      emptyUser: {
        email: '',
        role: ''
      }
    }
  },
  async created() {
    const user = await API.getAllUsers()
    this.users = user.users
  },
  methods: {
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.newUser = Object.assign({}, this.emptyUser)
      })
    },
    async save() {
      this.dialog = false
      // save new user to mongo db
      const res = await API.addNewUser(this.newUser)
      console.log(res)
      // update the ui
      // const user = await API.getAllUsers()
      // this.users = user.users
    }
  }
}
</script>

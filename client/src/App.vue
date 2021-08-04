<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>User Management</v-app-bar-title>
    </v-app-bar>

    <v-main class="mx-5 mt-2">
      <v-alert type="warning" v-model="alert" dismissible>
        This user already exists, please check the account carefully!
      </v-alert>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="15"
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
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card-text>
                    <v-text-field
                      v-model="newUser.email"
                      label="Email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    <v-select
                      :items="roles"
                      v-model="newUser.role"
                      label="Role"
                    ></v-select>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                      :disabled="!valid"
                      >Save</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this user?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.actions="{ item }">
          <v-icon class="pl-3" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-main>
  </v-app>
</template>

<script>

import moment from 'moment'
import API from './api'

export default {
  name: 'App',

  data() {
    return {
      alert: false,
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
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ],
      users: [],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      newUser: {
        email: '',
        role: 'rw'
      },
      valid: false,
      emptyUser: {
        email: '',
        role: 'rw'
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'E-mail must be valid'
      ],
      roles: ['admin', 'rw']
    }
  },
  async created() {
    const user = await API.getAllUsers()
    this.users = user.users.map(e => {
      if (Object.prototype.hasOwnProperty.call(e, 'last_login_time')) {
        e.last_login_time = moment(e.last_login_time).format('YYYY-MM-DD HH:mm:ss')
      } else {
        e.last_login_time = 'Never'
      }
      return e
    })
  },
  methods: {
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.newUser = Object.assign({}, this.emptyUser)
      })
    },
    async save() {
      if (this.$refs.form.validate()) {
        // check for duplicate
        const lowerCaseEmail = this.newUser.email.toLowerCase()
        if (this.users.some(d => d.email.toLowerCase() === lowerCaseEmail)) {
          this.alert = true
        } else {
          // save new user to mongo db
          await API.addNewUser(this.newUser)
          // update the ui
          const user = await API.getAllUsers()
          this.users = user.users
        }
        this.close()
      }
    },
    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      // send request to delete in db
      await API.deleteUser(this.editedItem.email)
      this.users.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.emptyUser)
        this.editedIndex = -1
      })
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  }
}
</script>

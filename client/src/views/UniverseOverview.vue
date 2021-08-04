<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="universes"
      :items-per-page="15"
      class="elevation-1"
      :loading="universeLoading"
      loading-text="Loading... Please wait"
      :search="search"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-arrow-left',
        nextIcon: 'mdi-arrow-right',
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Current Universe List</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn dark color="indigo" class="mx-2 mb-2" @click="downloadBtnClick"
            >Download
            <v-icon class="pl-2" dark> mdi-cloud-download </v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment'
import XLSX from 'xlsx'
import API from '../api'

export default {
  name: 'UniverseOverview',
  data() {
    return {
      search: '',
      universeLoading: true,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        {
          text: 'Name',
          align: 'start',
          value: 'name'
        },
        {
          text: 'Status',
          align: 'start',
          value: 'status'
        },
        {
          text: 'Volume',
          align: 'start',
          value: 'data_volume'
        },
        {
          text: 'Owner',
          align: 'start',
          value: 'owner'
        },
        {
          text: 'Updated Time',
          align: 'start',
          value: 'universe_updated_time'
        }
      ],
      universes: []
    }
  },
  async created() {
    this.universeLoading = true
    const universes = await API.getAllUniverses()
    console.log(universes)

    this.universeLoading = false
  },
  methods: {
    downloadBtnClick() {
      const header = ['email', 'role', 'last_login_time']
      const usersSheet = XLSX.utils.json_to_sheet(this.users, { header })
      usersSheet.A1.v = 'Email'
      usersSheet.B1.v = 'Role'
      usersSheet.C1.v = 'Last Login Time'

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, usersSheet, 'accounts')
      const timeTag = moment().format('YYYYMMDDHHmmss')
      XLSX.writeFile(wb, `SL-${timeTag}-users.xlsx`)
    }
  }
}
</script>

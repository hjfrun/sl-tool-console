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
          <v-toolbar-title>All Universe List</v-toolbar-title>
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
          value: 'id',
          filterable: false
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Volume',
          value: 'volume',
          filterable: false
        },
        {
          text: 'Owner',
          value: 'owner'
        },
        {
          text: 'Updated Time',
          value: 'updated_time',
          filterable: false
        }
      ],
      universes: []
    }
  },
  async created() {
    this.universeLoading = true
    const universes = await API.getAllUniverses()
    this.universes = universes.map(e => {
      return {
        id: e._id,
        name: e.name,
        status: e.status,
        volume: e.data_volume.toLocaleString('en'),
        owner: e.access_control.owner,
        updated_time: e.universe_updated_time
      }
    })

    this.universeLoading = false
  },
  methods: {
    downloadBtnClick() {
      const header = ['id', 'name', 'status', 'volume', 'owner', 'updated_time']
      const universesSheet = XLSX.utils.json_to_sheet(this.universes, { header })
      universesSheet.A1.v = 'ID'
      universesSheet.B1.v = 'Name'
      universesSheet.C1.v = 'Status'
      universesSheet.A1.v = 'Volume'
      universesSheet.B1.v = 'Owner'
      universesSheet.C1.v = 'Updated Time'

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, universesSheet, 'universes')
      const timeTag = moment().format('YYYYMMDDHHmmss')
      XLSX.writeFile(wb, `SL-${timeTag}-universes.xlsx`)
    }
  }
}
</script>

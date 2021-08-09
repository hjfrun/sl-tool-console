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
          <v-toolbar-title>Universe List</v-toolbar-title>
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

export default {
  name: 'UniverseOverview',
  data() {
    return {
      search: '',
      universeLoading: true,
      headers: [
        {
          text: 'Name',
          value: 'name',
          width: '40%'
        },
        {
          text: 'Volume',
          value: 'volume',
          align: 'start',
          filterable: false,
          width: '10%',
          sort: (a, b) => parseFloat(a.replace(/,/g, '')) - parseFloat(b.replace(/,/g, ''))
        },
        {
          text: 'Owner',
          value: 'owner',
          width: '20%'
        },
        {
          text: 'Updated Time',
          value: 'updated_time',
          align: 'end',
          width: '15%'
        },
        {
          text: 'ID',
          value: 'id',
          width: '15%'
        }
      ],
      universes: []
    }
  },
  async created() {
    this.universeLoading = true
    const { data: universes } = await this.$http.get('/universe')
    this.universes = universes.map(e => {
      return {
        id: e._id,
        name: e.name,
        volume: e.data_volume.toLocaleString('en'),
        owner: e.access_control.owner,
        updated_time: e.universe_updated_time
      }
    })

    this.universeLoading = false
  },
  methods: {
    downloadBtnClick() {
      const header = ['name', 'volume', 'owner', 'updated_time', 'id']
      const universesSheet = XLSX.utils.json_to_sheet(this.universes, { header })
      universesSheet.A1.v = 'Name'
      universesSheet.B1.v = 'Volume'
      universesSheet.C1.v = 'Owner'
      universesSheet.D1.v = 'Updated Time'
      universesSheet.E1.v = 'ID'

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, universesSheet, 'universes')
      const timeTag = moment().format('YYYYMMDDHHmmss')
      XLSX.writeFile(wb, `SL-${timeTag}-universes.xlsx`)
    }
  }
}
</script>

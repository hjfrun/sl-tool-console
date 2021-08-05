<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Social Listening Tool</v-list-item-title>
          <v-list-item-subtitle>Console</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Social Listening Tool Console</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout"
        >Logout
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'Main',
  data() {
    return {
      drawer: false,
      items: [
        { title: 'User Management', icon: 'mdi-account-multiple', link: '/' },
        { title: 'Universe Overview', icon: 'mdi-database', link: '/universe-overview' },
        { title: 'About', icon: 'mdi-help-box', link: '/about' }
      ]
    }
  },
  methods: {
    logout() {
      sessionStorage.token = ''
      this.$router.push('/login')
    }
  }
}
</script>

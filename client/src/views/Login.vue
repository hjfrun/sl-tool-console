<template>
  <v-app>
    <v-main>
      <v-alert
        class="mx-auto"
        v-model="alert"
        prominent
        type="error"
        max-width="600"
        border="left"
        dismissible
        >Please enter the corrent username and password!</v-alert
      >
      <v-card width="500" class="login-card" elevatino="6">
        <v-card-title style="justify-content: center"
          >Social Listening Tool Console</v-card-title
        >
        <v-card-text>
          <v-text-field
            label="Username"
            v-model="username"
            prepend-icon="mdi-account-circle"
            :rules="nameRules"
            required
          />
          <v-text-field
            label="Password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="passwordRules"
            @keydown="keydownClick"
            required
          />
        </v-card-text>

        <v-card-actions>
          <v-btn class="mx-auto" large color="success" @click="login"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      alert: false,
      username: '',
      password: '',
      showPassword: false,
      nameRules: [
        v => !!v || 'Username is required'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  methods: {
    login() {
      if (this.username !== 'owsocial' || this.password !== 'owsocial') {
        this.alert = true
        return
      }

      sessionStorage.token = 'admin-login'
      this.$router.push('/')
    },
    keydownClick(key) {
      if (key.key === 'Enter') {
        this.login()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
}
</style>

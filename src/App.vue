<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item  v-on:click="imenu = 'C'">
          <v-list-item-action>
            <v-icon>mdi-account-cash</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Criar conta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-on:click="imenu = 'S'">
          <v-list-item-action>
            <v-icon>mdi-bank</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Saldo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

           <v-list-item v-on:click="imenu = 'D'">
          <v-list-item-action>
            <v-icon>mdi-cash-usd</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Depósito</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

           <v-list-item v-on:click="imenu = 'W'">
          <v-list-item-action>
            <v-icon>mdi-cash-usd-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Saque</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="grey"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><img class="logo" src="./assets/logo.png" /></v-toolbar-title>
    </v-app-bar>

    <v-main>

          <Home :imenu="imenu"/>
       
    </v-main>
    <v-footer
      color="grey"
      app
      dark
    >
      <span class="white--text">&copy; André Souza {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',

  components: {
    Home,
  },

props: {
      source: String,
    imenu:String,
    },
    data: () => ({
      drawer: null,
      
    }),
  }
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  
  width: 9rem;
}
</style>

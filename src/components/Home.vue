<template>
  <div class="home" align="center">
    <!-- Card  Criar Conta-->
    <v-container v-if="imenu === 'C'" class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="grey" dark>
              <v-toolbar-title text-color="black">Criar Conta</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-alert v-if="false" type="success">Conta {{account.conta}} criada com sucesso.</v-alert>
              <v-form>
                <v-text-field
                  label="Numero da Conta"
                  name="conta"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="account.conta"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Senha"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="account.senha"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-on:click="newAccount(account.conta,account.senha)" color="primary">Criar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- End Card -->

    <!-- Card  Saldo-->

    <v-container v-if="imenu == 'S'" class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="grey" dark>
              <v-toolbar-title text-color="black">Saldo</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-alert v-if="vsaldo" type="success">Seu saldo é {{account.saldo}} $</v-alert>
              <v-form @submit.prevent="balance">
                <v-text-field
                  label="Numero da Conta"
                  name="conta"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="conta"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Senha"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-on:click="balance(conta)" color="primary">Ver Saldo</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- End Card -->

    <!-- Card  Deposito-->

    <v-container v-if="imenu == 'D'" class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="grey" dark>
              <v-toolbar-title text-color="black">Depósito</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Numero da Conta"
                  name="conta"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="account.conta"
                ></v-text-field>

                <v-text-field
                  id="valor"
                  label="Valor"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="text"
                  v-model="account.valor"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-on:click="transaction(account,'D')" color="primary">Depositar</v-btn>
              
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- End Card -->

    <!-- Card  Saque-->

    <v-container v-if="imenu == 'W'" class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="grey" dark>
              <v-toolbar-title text-color="black">Saque</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  label="Numero da Conta"
                  name="conta"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="account.conta"
                ></v-text-field>
                <v-text-field
                  label="Valor"
                  name="valor"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="account.valor"
                ></v-text-field>
                <v-text-field
                  id="senha"
                  label="Senha"
                  name="senha"
                  prepend-icon="mdi-lock"
                  type="password"
                  required
                  v-model="account.senha"
                 :rules="[v => !!v || 'Senha é obrigatório']"  
                  
                  
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              
              <v-btn v-on:click="transaction(account,'W')" color="primary">Sacar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- End Card 
-->
    <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Conta</th>
          <th class="text-left">Saldo</th>
          <th class="text-left">Ultima Transacão</th>
          
        </tr>
      </thead>

      <tbody>
        <tr v-for="account of accounts" :key="account.id">
          <td>{{ account.conta }}</td>
          <td>{{ account.saldo }}</td>
          <td>{{ account.tipo_transacao}} / {{account.valor}}</td>
        </tr>
      </tbody>
       </template>
  </v-simple-table>
  </div>
</template>

<script>
import Account from "../services/accounts";

export default {
  name: "Home",
  data() {
    return {
      account: {
        id: '',
        conta: '',
        saldo: '',
        valor: '',
        tipo_transacao: '',
        senha: '',
      },
      accounts: [],
      errors: [],
      msg: "Bem vindo ao banco Capgemini",
      vsaldo: true,
    };
  },
  mounted() {
    this.listar();
  },

  methods: {
    balance(conta) {
      Account.balance(conta)
        .then((resposta) => {
          console.log(resposta.data);
          this.account = resposta.data;
          this.vsaldo = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    listar() {
      Account.listar()
        .then((resposta) => {
          console.log(resposta.data);
          this.accounts = resposta.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newAccount() {
      Account.newAccount(this.account)
        .then((resposta) => {
          console.log(resposta.data);
          this.account = {};
          alert("Cadastrado com sucesso!");
          this.listar();
          this.errors = {};
        })
        .catch((e) => {
          this.errors = e.response.data.errors;
        });
    },

    transaction(account, tipo_transacao) {
      if(tipo_transacao === 'W'){
        this.$refs.form.validate()
      }  
      account.tipo_transacao = tipo_transacao;
      Account.transaction(account)
        .then((resposta) => {
          console.log(resposta.data);
          this.account = {};
          this.errors = {};
          alert("Atualizado com sucesso!");
          this.listar();
        })
        .catch((e) => {
          this.errors = e.response.data.errors;
          console.log(this.errors);
        });
        
    },
 
  },
  editar(account) {
    this.account = account;
  },

  props: {
    cconta: Boolean,
    imenu: String,
    
  },

};
</script>


<style scoped>
h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>

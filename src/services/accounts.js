import {
    http
} from './config'

export default {

    newAccount: (account) => {
        return http.post('/', account);
    },

    transaction: (account) => {
        console.log(account)
        return http.put(`transaction/${account.conta}`, account);
    },

    balance: (account) => {
        return http.get(`/${account}`, account)
    },

    listar: () => {
        return http.get('/')
    },

    //apagar:(produto)=>{
    //	return http.delete('produto', { data: produto })
    //}
}
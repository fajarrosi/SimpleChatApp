<template >
    <div>
        <q-form @submit="submitForm">
            <q-input rounded outlined v-model="formData.name" label="Name"  class="q-mb-md" v-if="tab === 'register'"/>
            <q-input rounded outlined v-model="formData.email" label="Email" type="email"  class="q-mb-md"/>
            <q-input rounded outlined v-model="formData.password" label="Password" type="password" class="q-mb-md"/>
            <div class="row">
                <q-space />
                <q-btn color="primary"
                :label="tab"
                type="submit"
                />
            </div>
        </q-form>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props:['tab'],
    data(){
        return{
            formData:{
                name:'test2',
                email:'test2@gmail.com',
                password:'12345678'
            }
        }
    },
    methods: {
        ...mapActions('stores',['registerUser','loginUser']),
        submitForm(){
            if(this.tab == 'login'){
                this.loginUser(this.formData)
            }else{
                this.registerUser(this.formData)
            }
        }
    },
}
</script>
<style >
    
</style>
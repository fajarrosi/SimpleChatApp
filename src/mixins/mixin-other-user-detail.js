export default{
    computed:{
        them(){
            if(this.$store.state.stores.users[this.$route.params.userId]){
                return this.$store.state.stores.users[this.$route.params.userId]
            }
            return {}
        }
    }
}
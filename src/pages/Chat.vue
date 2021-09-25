<template>
  <q-page padding class="flex column">
     <q-banner class="bg-grey-4 text-center">
      User is Offline
    </q-banner>
    <div class="q-pa-md column col  justify-end">
      <q-chat-message v-for="message in Msg" :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from === 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
            <q-form
            class="full-width"
            @submit="sendMsg"
            > 
            <q-input  v-model="newMsg" label="Message" dense
            bg-color="white"
            rounded
            outlined
            class="full-width"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="send" color="white" @click="sendMsg"/>
              </template>
            </q-input>
            
              <!-- <q-field filled :model-value="newMsg" label="Message" dense
              bg-color="white"
              rounded
              outlined
              >
                <template v-slot:after>
                  <q-btn round dense flat icon="send" type="submit"/>
                </template>
              </q-field> -->
            </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data(){
    return {
      newMsg:'',
      messages:[
        {
          text:'Hy Jim How Are You?',
          from:'me'
        },
        {
          text:'Fine and you ?',
          from:'them'
        },
        {
          text:'very good ',
          from:'me'
        },
      ]
    }
  },
  methods: {
    sendMsg(){
      this.messages.push({
        text: this.newMsg,
        from:'me'
      })
    },
    ...mapActions('stores',['firebaseGetMsg']),
    
  },
  computed:{
      ...mapState('stores',['Msg'])
  },
  mounted() {
    this.firebaseGetMsg(this.$route.params.userId)
  },
}
</script>

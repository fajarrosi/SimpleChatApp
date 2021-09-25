<template>
  <q-page padding class="flex column" ref="pageChat">
     <q-banner class="bg-grey-4 text-center" v-if="!them.online">
      {{them.name}} is Offline
    </q-banner>
    <div class="q-pa-md column col  justify-end"
    :class="{'invisible' : !showmsg}"
    >
      <q-chat-message v-for="(message,index) in Msg" :key="index"
        :name="message.from === 'me' ? userDetails.name : them.name"
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
import mixinOtherUserDetail from 'src/mixins/mixin-other-user-detail.js'
export default {
  mixins:[
    mixinOtherUserDetail
  ],
  data(){
    return {
      newMsg:'',
      showmsg:false,
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
      this.firebaseSendMsg({
        message:{
          text: this.newMsg,
          from:'me'
        },
        otherUserId: this.$route.params.userId
      })
    },
    ...mapActions('stores',['firebaseGetMsg','firebaseSendMsg']),
    scrollToBottom(){
      let pageChat = this.$refs.pageChat.$el
      setTimeout(() => {
        window.scrollTo(0,pageChat.scrollHeight)
      }, 20);
      console.log("pageChate",pageChat.scrollHeight)
    }
    
  },
  watch:{
    Msg: function(val){
      if(Object.keys(val).length){
        this.scrollToBottom()
        setTimeout(() => {
          this.showmsg = true
        }, 200);
      }
      console.log("watch msg", val)
    }
  },
  computed:{
      ...mapState('stores',['Msg','userDetails']),
      // me(){
      //   return this.$store.state.stores.userDetails.name
      // },
      // them(){
      //   return this.$store.state.stores.users[this.$route.params.userId]
      // }
  },
  mounted() {
    this.firebaseGetMsg(this.$route.params.userId)
  },
}
</script>

<template>
  <q-page class="flex q-pa-md">
     <q-list  class="full-width"
     separator
     >
      <q-item v-for="(contact,key) in users" :key="key"  clickable v-ripple
      :to="'/chat/' + key"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ contact.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="contact.online ? 'light-green-3' : 'grey-4'">
          {{contact.online ? 'Online' : 'Offline'}}
          </q-badge>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
const contacts = [ {
  id: 1,
  name: 'Ruddy Jedrzej',
  email: 'rjedrzej0@discuz.net',
  online: true
}, {
  id: 2,
  name: 'Mallorie Alessandrini',
  email: 'malessandrini1@marketwatch.com',
  online: true
}, {
  id: 3,
  name: 'Elisabetta Wicklen',
  email: 'ewicklen2@microsoft.com',
  online: false
}, {
  id: 4,
  name: 'Seka Fawdrey',
  email: 'sfawdrey3@wired.com',
  online: false
} ]


export default {
  setup () {
    return {
      contacts
    }
  },
  computed:{
    users(){
      let userfilter = {}
      Object.keys(this.$store.state.stores.users).forEach(key =>{
        if(key !== this.$store.state.stores.userDetails.userId){
          userfilter[key] = this.$store.state.stores.users[key]
        }
      })
      return userfilter
      // .filter((user)=> user.userId !== this.$store.state.stores.userDetails.userId)
    }
  },
  methods: {
    test(key){
      console.log("key dari user",key);
    }
  },
}
</script>

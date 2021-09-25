<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat icon="arrow_back" label="Kembali" class="text-white" no-caps dense v-if="$route.fullPath.includes('/chat')" @click="$router.push('/')"/>
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
        <q-btn flat icon="account_circle" label="Login" class="text-white absolute-right q-pr-sm" no-caps dense  @click="$router.push('/auth')" v-if="!userDetails.userId"/>
        <q-btn flat icon="account_circle" :label="`Logout ${userDetails.name}`" class="text-white absolute-right q-pr-sm" no-caps dense  v-else @click="logoutUser">
      
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import mixinOtherUserDetail from 'src/mixins/mixin-other-user-detail.js'
export default ({
  mixins:[
    mixinOtherUserDetail
  ],
  computed:{
    title(){
      let currentPath = this.$route.fullPath
      if(currentPath == '/') return 'SmackChat'
      else if(currentPath.includes('/chat')) return this.them.name
      else if (currentPath == '/auth') return 'Login'
      else return ''
    },
    ...mapState('stores',['userDetails']),
  },
  methods: {
    ...mapActions('stores',['logoutUser'])
  },
})
</script>

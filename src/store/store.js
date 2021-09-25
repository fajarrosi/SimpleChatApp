import { firebaseAuth } from "src/boot/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { firebaseDb } from "src/boot/firebase";
import { ref, set, onValue,update,child } from "firebase/database"
const state ={
    userDetails:{},
    users:{},
    Msg:{}
}
const mutations={
    setUserDetails(state,payload){
        state.userDetails = payload
    },
    setUsers(state,payload){
        // state.users[payload.userId] = payload.userDetails
        state.users = payload
    },
    setMsg(state,payload){
        state.Msg = payload
    }
}
const actions={
    registerUser({}, payload){
        createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
                set(ref(firebaseDb, 'users/' + user.uid), {
                    name: payload.name,
                    email: payload.email,
                    online: true
                });
            console.log("user created",user)
            console.log("response",userCredential)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error code",errorCode)
            console.log("error msg",errorMessage)

        });
    },
    loginUser({},payload){
        signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("user login",user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error code",errorCode)
            console.log("error msg",errorMessage)
            console.log("error s",error)
        });
    },
    handleAuthStateChanged({ commit,dispatch,state }){
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log("user aktif",user)
                const userData = ref(firebaseDb, 'users/' + uid );
                onValue(userData, (snapshot) => {
                const data = snapshot.val();
                console.log("data usr yang login dari db ",data)
                commit('setUserDetails',{
                    name:data.name,
                    email:data.email,
                    online:data.online,
                    userId:uid
                })
                })
                dispatch('firebaseUpdateUser',{
                    userId:uid,
                    updates:{
                        online:true
                    }
                })
                dispatch('firebaseGetUsers')
                this.$router.push('/')

            } else {
                dispatch('firebaseUpdateUser',{
                    userId:state.userDetails.userId,
                    updates:{
                        online:false
                    }
                })
                commit('setUserDetails',{})
                this.$router.push('/auth')
              // User is signed out
              // ...
            }
          });
    },
    firebaseGetUsers({commit}){
        const userData = ref(firebaseDb);
        onValue(child(userData, 'users/'), (snapshot) => {
        const userDetails = snapshot.val();
            console.log("seluruh users",userDetails)
            commit('setUsers',userDetails)
        })
    },
    firebaseUpdateUser({},payload){
        console.log("payload",payload)
        if (payload.userId) {
        //     // const data = ref(firebaseDb,'users/' + payload.userId)
        //     const updating = {}
        //     updating['users/' + payload.userId] = payload.updates
            update(ref(firebaseDb,'users/' + payload.userId),payload.updates)
        }
    },
    logoutUser(){
        firebaseAuth.signOut()
        console.log("logout user")
    },
    firebaseGetMsg({state, commit},payload){
        let userId = state.userDetails.userId
        console.log("userId",payload)
        const chatMsg = ref(firebaseDb, 'chats/' + userId + '/');
        onValue(child(chatMsg, payload),(snapshot)=>{
            const msg = snapshot.val()
            console.log("Msg dari " + userId + "adalah " + msg)
            commit('setMsg',msg)
        })
    }
}
const getters={

}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
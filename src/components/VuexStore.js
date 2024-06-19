import Vue from 'vue'
import Vuex from 'vuex'
import { signInWithEmailAndPassword, updateProfile, deleteUser } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    amigos: [],
    amigo: null,
    userCredentials: null // Nueva propiedad en el estado
  },
  mutations: {
    setLoggedIn(state, status) {
      state.loggedIn = status
    },
    SET_USER(state, { nombre, contraseña }) {
      state.user = { nombre, contraseña };
    },
    SET_USER_CREDENTIALS(state, credentials) { // Nueva mutación para actualizar las credenciales
      state.userCredentials = credentials;
    },
    AddFriends(state) {
      state.amigos = [state.amigo, ...state.amigos]
    },
    UPDATE_USER(state, CurrentUse_NewName) {
      state.updateUser = CurrentUse_NewName;
    }
  },
  actions: {
    addFriend_action(context) {
      context.commit('AddFriends');
    },
    async AuthenticationGoogle({ commit }) {
      const provider = new GoogleAuthProvider();
      try {
        const UserCredentials = await signInWithPopup(auth, provider);
        commit('setLoggedIn', true);
        commit('SET_USER_CREDENTIALS', UserCredentials); // Guardar credenciales en el estado
        return { status: true, credentials: UserCredentials };
      } catch (error) {
        console.error("Error while authenticating: ", error);
        commit('setLoggedIn', false);
      }
    },
    async logIn({ commit }, { nombre, contraseña }) {
      commit('SET_USER', { nombre, contraseña });
      try {
        const UserCredentials = await signInWithEmailAndPassword(auth, this.state.user.nombre, this.state.user.contraseña);
        commit('setLoggedIn', true);
        commit('SET_USER_CREDENTIALS', UserCredentials); // Guardar credenciales en el estado
        return true;
      } catch (error) {
        console.error(error)
        return false;
      }
    },
    UpdateUser({ commit }, { NewName }) {
      commit('UPDATE_USER', { NewName });
      const user = auth.currentUser;
      updateProfile(user, {
        displayName: NewName
      }).then(() => {
        return true;
      })
    },
    DelateAccount() {
      const user = auth.currentUser;
      deleteUser(user).then((suffec) => {
        console.log('user deleted correctly ' , suffec);
      })
        .catch((error) => {
          console.error(error);
        })
    },
    logOut({ commit }) {
      commit('setLoggedIn', false);
      commit('SET_USER_CREDENTIALS', null); // Limpiar credenciales en el estado
    }
  },
  getters: {
    // Getter para acceder a las credenciales desde otros componentes
    userCredentials: (state) => state.userCredentials
  }
})

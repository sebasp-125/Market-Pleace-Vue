import Vue from 'vue'
import Vuex from 'vuex'
import { signInWithEmailAndPassword, updateProfile, deleteUser, updateEmail, sendEmailVerification, updatePassword } from "firebase/auth";
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
    SET_USER_CREDENTIALS(state, credentials) {
      state.userCredentials = credentials;
    },
    AddFriends(state) {
      state.amigos = [state.amigo, ...state.amigos]
    },
    UPDATE_USER(state, CurrentUse_NewName) {
      state.updateUser = CurrentUse_NewName;
    },
    UPDATE_EMAIL(state, Email) {
      state.UpdateEmail = Email;
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
    //Edita ok actualizar el perfil del usuario post.
    UpdateUser({ commit }, { NewName }) {
      if (NewName === '') {
        return false;
      }
      commit('UPDATE_USER', { NewName });
      const user = auth.currentUser;
      updateProfile(user, {
        displayName: NewName
      }).then(() => {
        return true;
      })
    },
    //Elima la cuenta por completo.
    DelateAccount() {
      const user = auth.currentUser;
      deleteUser(user)
        .then((suffec) => {
          console.log('user deleted correctly ', suffec);
        })
        .catch((error) => {
          console.error(error);
        })
    },
    //Edita el correo actual por uno nuevo, debe de estar autenticado
    XUpdateEmail({ commit }, { ParameterVuex }) {
      updateEmail(auth.currentUser, ParameterVuex)
        .then((promisse) => {
          commit('UPDATE_EMAIL', { ParameterVuex });
          console.log(promisse)
        })
        .catch((error) => {
          console.error(error);
        })
    },
    //Mensaje de validacion. Envia un correo 
    async EmailVerification() {
      await sendEmailVerification(auth.currentUser);
      return { status: true };
    },
    //Editar contraseña
    UpdatePassword(newPassword) {
      updatePassword(auth.currentUser, newPassword)
        .then((promisse) => {
          console.log("update successful ", promisse)
        })
        .catch((error) => {
          console.error(error);
        })
    },
    logOut({ commit }) {
      commit('setLoggedIn', false);
      commit('SET_USER_CREDENTIALS', null);
    }
  },
  getters: {
    userCredentials: (state) => state.userCredentials
  }
})

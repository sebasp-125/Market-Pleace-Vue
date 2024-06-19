<template>
    <div>
        <div class="ImgContent" v-if="userProfile">
            <h2>Perfil Usuario</h2>
            <img class="imagenButton" :src="userProfile?.user.photoURL" :alt="userProfile.user.email">
        </div>
        <div v-if="userProfile">
            <p><strong>IDENTIFICACIÓN UID:</strong> {{ userProfile.user.uid || 'No disponible' }}</p>
            <p><strong>Nombre:</strong> {{ userProfile.user.displayName || 'No disponible' }}</p>
            <p><strong>Email:</strong> {{ userProfile.user.email || 'No disponible' }}</p>
        </div>
        <div v-else>
            <p>No hay datos de usuario disponibles.</p>
        </div>
        <div v-if="StatusUser" class="StatusUser">
            <b-button variant="success" class="logOut" @click.prevent="CloseSesionStatus">Cerrar Sesión</b-button>
            <b-button variant="danger" class="logOut" @click.prevent="UserDeleted">Eliminar cuenta</b-button>

            <div>
                <b-button variant="warning" v-b-modal.modal-1>Abrir Modal</b-button>

                <b-modal id="modal-1" @ok="validateInputs">
                    <b-row class="my-1">
                        <b-col sm="3">
                            <label for="input-username">Nombre de Usuario</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input id="input-username" v-model="username" :state="usernameState"
                                placeholder="Nombre de Usuario"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="3">
                            <label for="input-email">Correo Electrónico</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input id="input-email" v-model="email" :state="emailState"
                                placeholder="Correo Electrónico"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="3">
                            <label for="input-password">Contraseña</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input id="input-password" v-model="password" :state="passwordState"
                                placeholder="Contraseña"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-button variant="success" @click.prevent="UpdateIformatin_CurrentUser">Enviar datos.</b-button>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from '../components/VuexStore';

export default {
    name: 'ProfileUser',
    data() {
        return {
            StatusUser: false,
            username: '',
            email: '',
            password: '',
            usernameState: null,
            emailState: null,
            passwordState: null
        }
    },
    computed: {
        ...mapGetters(['userCredentials']),
        userProfile() {
            return this.userCredentials;
        }
    },
    methods: {
        CloseSesionStatus() {
            store.state.loggedIn = false;
        },
        status() {
            this.StatusUser = store.state.loggedIn;
        },
        validateInputs() {
            this.usernameState = this.username ? true : false;
            this.emailState = this.email ? true : false;
            this.passwordState = this.password ? true : false;
            if (this.usernameState && this.emailState && this.passwordState) {
                this.$bvModal.hide('modal-1');
            }
        },
       async UserDeleted() {
            await this.$store.dispatch('DelateAccount')
        },
        async UpdateIformatin_CurrentUser() {
            try {
                await this.$store.dispatch('UpdateUser', { NewName: this.username });
                this.$toast.success('¡Usuario Modificado Correctamente!', {
                    position: "top-right",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            } catch (error) {
                this.$toast.error('¡Usuario Autenticado Correctamente!', {
                    position: "top-right",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            }
        }
    },
    mounted() {
        this.status();
    }
};
</script>

<style scoped>
.ImgContent {
    display: grid;
    grid-template-columns: repeat(6, 5fr);
}

.ImgContent img {
    grid-column: 6;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    border: 3px solid rgb(195, 107, 107);
}
</style>

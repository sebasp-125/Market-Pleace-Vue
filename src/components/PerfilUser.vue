<template>
    <div>
        <div>
            <b-sidebar id="sidebar-right" right shadow>
                <div class="px-3 py-2">
                    <b-img :src="userProfile?.user.photoURL" fluid thumbnail></b-img>
                    <div v-if="!userProfile.user.emailVerified">
                        <p style="color:red">
                            your account no is this verified. Please check your account
                        </p>
                        <b-button variant="success" @click.prevent="VerificationEmail">verified!</b-button>
                    </div>
                    <p v-else style="color:green">
                        your account is verified. thanks!
                    </p>
                    <p>
                        Hola {{ userProfile.user.displayName }} estas son las configuraciones extras de tu cuenta:
                        <strong>{{ userProfile.user.uid }}</strong>
                    </p>
                    <b-button variant="success" class="logOut" @click.prevent="CloseSesionStatus">Cerrar
                        Sesión</b-button>
                    <b-button variant="danger" class="logOut" @click.prevent="UserDeleted">Eliminar cuenta</b-button>
                    <div>
                        <b-tabs content-class="mt-3">
                            <!-- Se puede agregar el "disable" para deshabilitar alguna -->
                            <b-tab title="Cambiar correo electronico" active @ok="validateInputs">
                                <b-col sm="auto">
                                    <label for="input-email-current">Correo Nuevo</label>
                                    <b-form-input id="input-email" v-model="email" :state="emailState"
                                        :placeholder="userProfile.user.email"></b-form-input>
                                </b-col>
                                <b-button type="success" @click.prevent="UpdateEmail_CurrentUser">Enviar nuevo
                                    Correo</b-button>
                            </b-tab>
                            <b-tab title="Cambiar la contraseña" active>
                                <p>Colocar foto de perfil</p>
                            </b-tab>
                            <b-tab title="Config 3">
                                <p>Cambiar Contraseña de Market - Pleace</p>
                            </b-tab>
                            <b-tab title="Nombre de Usuario">
                                <p v-if="userProfile.user.displayName"><strong>Cambiar nombre de usuario</strong></p>
                                <p v-else><strong>Añadir nombre de usuario</strong></p>
                                <b-col sm="9">
                                    <b-form-input id="input-username" v-model="username" :state="usernameState"
                                        placeholder="Nombre de Usuario"></b-form-input>
                                </b-col>
                                <b-button variant="success" @click.prevent="UpdateIformatin_CurrentUser">Enviar
                                    datos.</b-button>

                            </b-tab>
                            <b-tab title="Config 4">
                                <p>Otros..</p>
                            </b-tab>
                        </b-tabs>
                    </div>
                </div>
            </b-sidebar>
        </div>

        <div class="ImgContent" v-if="userProfile">
            <b-button v-b-toggle.sidebar-right variant="falses">Opciones</b-button>
            <img class="imagenButton" :src="userProfile?.user.photoURL" :alt="userProfile.user.email">
            <div v-if="!userProfile?.user.photoURL">
                <b-button variant="success">Añadir foto de Perfil</b-button>
            </div>
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
            <div>
                <b-button variant="warning" v-b-modal.modal-1>Abrir Modal</b-button>
                <b-modal id="modal-1" @ok="validateInputs">
                    <b-row class="my-1">
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="3">
                            <label for="input-email">Correo Electrónico</label>
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
        async VerificationEmail() {
            let StatusVerification = await this.$store.dispatch('EmailVerification')
            console.log(StatusVerification)
            if (StatusVerification.status) {
                console.log(store.state.userCredentials);
                this.$toast.success(`Hemos enviando un email a ${this.userProfile.user.email}`,  {
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
            } else {
                console.log(StatusVerification.VerificationError)
                this.$toast.error('Tenemos problemas con verificar tu cuenta', {
                    position: "top-right",
                    timeout: 6000,
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
        },
        async UpdateEmail_CurrentUser() {
            console.log("Correo Cambiado a _ ", this.email);
            await this.$store.dispatch('XUpdateEmail', { ParameterVuex: this.email });
            console.log(store.state.userCredentials);

        },
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

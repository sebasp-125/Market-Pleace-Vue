<template>
    <div>
        <h2>Log In Security</h2>
        <form @submit.prevent="logIn">
            <div>
                <label for="username">Username:</label>
                <input type="text" v-model="username" id="username" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" id="password" required>
            </div>
            <a href="/register">Register</a>
            <b-button type="submit" variant="success">Acceder</b-button>
        </form>
        <div>
            <button class="googlebtn" @click.prevent="GooglePop">Google</button>
        </div>
    </div>
</template>

<script>
import VuexStore from '../VuexStore';
export default {
    name: "Log_Security",
    data() {
        return {
            username: '',
            password: '',
            amigo: '',
        }
    },
    methods: {
        async GooglePop() {
            try {
                const response = await this.$store.dispatch('AuthenticationGoogle');
                if (response) {
                    this.$toast.success('¡Usuario Autenticado Correctamente!', {
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
                    this.$router.push('/');
                }
            } catch (error) {
                this.$toast.error('Error al autenticar con Google: ' + error.message, {
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
        },
        async logIn() {
            try {
                const response = await VuexStore.dispatch('logIn', { nombre: this.username, contraseña: this.password });
                if (response) {
                    this.$toast.success('¡Usuario Autenticado Correctamente!', {
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
                    this.$router.push('/');

                } else {
                    this.$toast.error('Contraseña o Correo incorrecto', {
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
            } catch (error) {
                this.$toast.error('Error ', error.message, {
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
    }
}


</script>


<style scoped></style>

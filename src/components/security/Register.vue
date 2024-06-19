<template>
    <div>
        <form @submit.prevent="RegisterUser">
            <div>
                <label for="email">Correo Electrónico</label>
                <input id="email" type="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Contraseña</label>
                <input id="password" type="password" v-model="password" required minlength="8" />
            </div>
            <button type="submit">Registrar</button>
        </form>
    </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';

export default {
    name: "UserRegister",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async RegisterUser() {
            try {
                await createUserWithEmailAndPassword(auth, this.email, this.password);
                this.$toast.success('¡Usuario registrado correctamente!', {
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
                this.$toast.error('Error al registrar usuario. Inténtelo de nuevo más tarde.', {
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
                console.error("Error al registrar usuario:", error);
            }
        }
    }
}
</script>

<style scoped>
</style>

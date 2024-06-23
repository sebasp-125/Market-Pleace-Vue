<template lang="en">
    <div>
    <b-navbar class="nav" type="dark">
        <b-navbar-nav class="navbar-content">
          <b-navbar-brand class="text-sub-nav">Market - Pleace</b-navbar-brand>
          <b-navbar-brand class="text-sub-nav" v-if="ImageButton"
            @click.prevent="loggedInButton">{{ ImageButton.user.displayName ? ImageButton.user.displayName :
              ImageButton.user.email }}</b-navbar-brand>
          <b-navbar-brand class="text-nav">
            <input type="text" placeholder="Search....">
          </b-navbar-brand>
        </b-navbar-nav>
      </b-navbar>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'HHomes',
    computed: {
        ...mapGetters(['userCredentials']),
        loggedIn() {
            return this.$store.state.loggedIn;
        },
        ImageButton() {
            return this.userCredentials;
        }
    },
    methods: {
        loggedInButton() {
            this.$router.push('/Perfil');
        }
    },
    mounted() {
        console.log(this.userCredentials)
    }
}
</script>

<style>
.text-sub-nav {
    margin: 0px;
}

.sub-nav-sex {
    background: rgb(62, 62, 62);
}

.nav-general {
    background-color: #1c1c1c;
    border-bottom: 10px solid #fbc827;
}

.general-grid {
    align-items: center;
    display: grid;
    grid-template-columns: repeat(3, 100px) 1fr;
}

.select-plataform {
    background: #fbc827;
    border-radius: 2px;
}


.navbar-nav .navbar-content {
    margin: 0px;

}

.nav {
    background-color: #1c1c1c;
}

.text-nav {
    color: #fff;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    text-align: center;
}

.navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
</style>

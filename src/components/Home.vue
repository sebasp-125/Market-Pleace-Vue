<template>
  <div>
    <b-navbar class="nav-general" type="dark">
      <b-navbar-nav class="navbar-content">
        <b-navbar-brand class="text-nav">
          <div class="general-grid">
            <div class="pro-items-bussinnes">
              <img
                src="https://res.cloudinary.com/dbwgsrqgm/image/upload/v1718496473/Zapatos/mark-small___6c4cbc2f0deec0b6bb656428e014804c_x70vky.svg"
                alt="" class="vtex-store">
            </div>
            <div class="pro-items-bussinnes">
              <img
                src="https://res.cloudinary.com/dbwgsrqgm/image/upload/v1718494432/Zapatos/dash-small___219cd3cb91bfdcd82c95fffb07b0c80b_ggen3i.svg"
                alt="" class="vtex-store">
            </div>
            <div class="pro-items-bussinnes select-plataform">
              <img
                src="https://res.cloudinary.com/dbwgsrqgm/image/upload/v1718494427/Zapatos/grid-small___91f37ff58dfecf81d6eb211942d2b30d_puwc5z.svg"
                alt="" class="vtex-store">
            </div>
          </div>
        </b-navbar-brand>
        <b-navbar-brand class="text-nav">ENVÍO GRATIS CON COMPRAS SUPERIORES A $119.999 - 12 CUOTAS SIN
          INTERÉS*</b-navbar-brand>
        <b-navbar-brand class="text-nav">Ajá</b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>

    <!-- <b-navbar class="nav" type="dark">
      <b-navbar-nav class="navbar-content">
        <b-navbar-brand class="text-sub-nav">Market - Pleace</b-navbar-brand>
        <b-navbar-brand class="text-sub-nav" v-if="ImageButton"
          @click.prevent="loggedInButton">{{ ImageButton.user.displayName ? ImageButton.user.displayName :
            ImageButton.user.email }}</b-navbar-brand>
        <b-navbar-brand class="text-nav">
          <input type="text" placeholder="Search....">
        </b-navbar-brand>
      </b-navbar-nav>
    </b-navbar> -->

    <b-navbar class="sub-nav-sex">
      <b-navbar-nav class="navbar-content">
        <b-img src="https://grid0.vtexassets.com/arquivos/newin.png" fluid alt="NEW-IN"></b-img>
        <b-navbar-brand class="text-sub-nav-sex">HOMBRE</b-navbar-brand>
        <b-navbar-brand class="text-sub-nav-sex">MUJER</b-navbar-brand>
        <b-navbar-brand class="text-sub-nav-sex">NIÑOS</b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>

    <!-- Main Content -->
    <HelloWorld />

  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'HHomes',
  components: {
    HelloWorld,

  },
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

<template>
  <div class="father">
    <main v-if="Es_IsArray.length > 0">
      <p class="checkout" @click="checkout">Ir al carro de compras {{ Es_IsArray.length }}</p>
    </main>
    <CarruLanding_Page/>
    <div class="container Home">
      <b-row>
        <b-col class="b-col" v-for="(product, index) in products" :key="index" cols="12" md="6" lg="4">
          <b-card :img-src="product.image" img-alt="Image" img-top tag="article" class="mb-2 small-card">
            <b-card-text>
              <p class="text-secondary text-center mx-auto" style="width: fit-content;">{{ product.category }}</p>
              <p class="text-dark">{{ product.title }}</p>
              <p><a href="#" class="text-success">Price: ${{ product.price }}</a></p>
              <b-button variant="success" @click="addToCart(product)">Go Buy</b-button>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    <sexoCart/>

    </div>
  </div>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import store from '../components/VuexStore';
import CarruLanding_Page from '../modules/CarruLanding_Page.vue'
import sexoCart from '../modules/sexoCart.vue'

export default {
  name: 'ProductList',
  components: {
    CarruLanding_Page,
    sexoCart
  },
  data() {
    return {
      products: [],
      Es_IsArray: [],
      IsArray: [],
      StatusUser: ''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  },
  methods: {
    loggedInButton() {
      this.$router.push('/Perfil');
    },
    CallDataBase() {
      const productosRef = collection(db, "zapatos");
      getDocs(productosRef)
        .then((resp) => {
          this.products = resp.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
        });
    },
    addToCart(product) {
      if (!this.Es_IsArray) {
        this.Es_IsArray = [];
      }
      this.Es_IsArray.push(product);
      console.warn("Product added to cart ", this.Es_IsArray);
    },
    checkout() {
      this.$router.push({ path: '/Products', query: { products: this.Es_IsArray } });
    },
    status() {
      store.state.loggedIn
      this.StatusUser = store.state.loggedIn;
    }
  },
  mounted() {
    this.CallDataBase();
    this.status();
  }
}
</script>

<style scoped>
.father {
  padding: 20px;
}

.Home {
  padding: 20px;
  margin: 0 auto;
  /* Center the container */
}

.b-col {
  width: 15rem;
}

.b-card.small-card {
  max-width: 5rem;
  /* Reduce the width of the cards */
}

.b-card-text {
  font-size: 0.8rem;
  /* Optionally reduce the font size */
}

.b-card-title {
  font-size: 1rem;
  /* Optionally reduce the font size for the title */
}

.b-button {
  font-size: 0.8rem;
  /* Optionally reduce the button size */
}

.mb-2 {
  margin-bottom: 10px;
  /* Optionally adjust the bottom margin */
}
</style>

<template>
    <div>
        <div class="container">
            <div class="product-list">
                <div v-for="(producto, index) in productosData" :key="index">
                    <div>
                        <b-img :src="producto.image" :alt="producto.title" fluid></b-img>
                    </div>
                    <section class="product-info">
                        <hr>
                        <h2>Information you shopping</h2>
                        <p>{{ producto.title }}</p>
                        <p><strong>{{ producto.price }}</strong></p>
                    </section>
                </div>
            </div>
        </div>
        <main class="SummaryShopping">
            <h2 class="Summary">
            </h2>
        </main>
    </div>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default {
    name: "Select-Product",
    data() {
        return {
            Response_To_id: [],
            productosData: []
        };
    },
    methods: {
        async fetchProductData(productId) {
            try {
                const productRef = doc(db, "zapatos", productId);
                const docSnapshot = await getDoc(productRef);
                if (docSnapshot.exists()) {
                    return docSnapshot.data();
                } else {
                    console.error(`No product found with ID: ${productId}`);
                    return null;
                }
            } catch (error) {
                console.error("Error getting document:", error);
                return null;
            }
        },
        async Mark_Please() {
            const promises = this.Response_To_id.map(this.fetchProductData);
            const products = await Promise.all(promises);
            this.productosData = products.filter(product => product !== null);
        },
        ThisRouter() {
            const serializedArray = this.$route.query.sent;
            this.Response_To_id = JSON.parse(serializedArray);
        }
    },
    mounted() {
        this.ThisRouter();
        this.Mark_Please();
    }
}
</script>

<style scoped></style>

<template>
    <div>
        <div class="container">
            <div class="product-list">
                <div v-for="producto in productosData" :key="producto.id" class="product-item">
                    <div>
                        <img :src="producto.image" :alt="producto.title" />
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
                <Summary>Your shopping</Summary>
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
            Id_Actually: [],
            productosData: []
        }
    },
    methods: {
        Mark_Please() {
            this.Id_Actually.forEach((AllId_ProducSelect) => {
                const productosRef = doc(db, "zapatos", AllId_ProducSelect);
                getDoc(productosRef)
                    .then((doc) => {
                        if (doc.exists()) {
                            this.productosData.push(doc.data());
                        } else {
                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
            })

        },
        ThisRouter() {
            const serializedArray = this.$route.query.products;
            console.warn(serializedArray);
            this.Id_Actually = serializedArray
        },
        TotalPrice() {

        }

    },
    mounted() {
        this.ThisRouter();
        this.Mark_Please();
    },
}
</script>
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
}

.product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 1200px;
    width: 100%;
}

.product-item {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: center;
    width: calc(33.333% - 20px);
    box-sizing: border-box;
}

.product-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-info {
    padding: 10px;
    background-color: #fafafa;
}

.product-info p {
    margin: 10px 0;
    font-size: 1rem;
}
</style>
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
}

.product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 1200px;
    width: 100%;
}

.product-item {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: center;
    width: calc(33.333% - 20px);
    box-sizing: border-box;
}

.product-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-info {
    padding: 10px;
    background-color: #fafafa;
}

.product-info p {
    margin: 10px 0;
    font-size: 1rem;
}
</style>

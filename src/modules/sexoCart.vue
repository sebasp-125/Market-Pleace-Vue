<template lang="">
    <div>
        <div class="card-sex">
            <div class="card" v-for="(data , index) in ImageSexoIS_Array" :key="data">
                <b-img  class="img-card" :src="data" fluid :alt="index"></b-img>
                <div class="btn-select-card_sex">
                    <b-button variant="light" class="select-button-sex">Calzado</b-button>
                    <b-button variant="light"  class="select-button-sex">Inumentaria</b-button>
                    <b-button variant="light"  class="select-button-sex">Accesorios</b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ImageSexoIS_Array: [
                "https://res.cloudinary.com/dbwgsrqgm/image/upload/v1718497377/Zapatos/96aa8aa0-77ed-4296-b618-8761ab6ef6bd___012b98c193404ea4126d363b739edb21_a8a74u.jpg",
                "https://res.cloudinary.com/dbwgsrqgm/image/upload/v1718497412/Zapatos/5847a3cf-7b68-4c19-9c6c-5dda93af18aa___6b5cdbf7e2a387f623f357fc92d8a1f2_szbziy.jpg",
                "https://res.cloudinary.com/dbwgsrqgm/image/upload/v1718497424/Zapatos/2e2116de-a48f-406a-bb8e-971a2aaa31c9___8779880abb8d5f51e760cb480809856b_bo0gai.jpg"
            ]
        }
    },
    methods: {
      
    },
    mounted() {
    },
}
</script>
<style>
.card-sex {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    gap: 20px;
    border-radius: 5px;
    width: 100%;
}

.card .img-card {
    width: 100%;
}

.btn-select-card_sex .select-button-sex {
    width: 100%;
    transition: transform .3s ease;
}
</style>
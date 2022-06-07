<template>
    <div class="text-center">
        <i class="bi bi-check-circle-fill text-success iconsize"></i>

        <div class="text-center">
            <h2 class="display-3">Bonne Journée</h2>

            <p>Vos informations de pointage on été enregistrées.</p>
            
            <router-link to="/" custom v-slot="{navigate, href}">
                <a :href="href" class="btn btn-primary mb-4" @click="navigate">Terminer</a>
            </router-link>

            <!-- <router-link :to="{name:'EditPointage'}" custom v-slot="{navigate, href}">
                <a :href="href" class="btn btn-success mx-4 mb-4" @click="navigate">
                    <i class="bi bi-pencil-square pe-2"></i>
                    Modifier
                </a>
            </router-link> -->
        </div>
    </div>

    <router-view :personnel="personnel"></router-view>
</template>

<style scoped>
    .iconsize {
        font-size: 200px;
    }
</style>


<script>
export default {
    inheritAttrs: false,

    props: {
        payload: Object
    },

    computed: {
        personnel() {
            return this.payload;
        },
    },
}
</script>
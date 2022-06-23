<template>
    <div id="workspace-goodbye-wrapper">
        <div id="workspace-goodbye">
            <div class="text-center">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 60px;"></i>
                <h2 class="display-3">Bonne Journée</h2>
                <p>Vos informations de pointage ont été enregistrées.</p>
            </div>
            <div>
                <summaryItem :personnel="personnel" @mounted="resize()"></summaryItem>
            </div>
            <div class="fixed-bottom text-center bg-light p-3 border-top shadow">
                <router-link to="/" custom v-slot="{navigate, href}">
                    <a :href="href" class="btn btn-primary mx-2" @click="navigate">Terminer</a>
                </router-link>
                <router-link :to="{name:'EditPointage'}" custom v-slot="{navigate, href}">
                    <a :href="href" class="btn btn-outline-secondary mx-2" @click="navigate"><i class="bi bi-pencil-square pe-2"></i>Modifier</a>
                </router-link>
            </div>
        </div>
    </div>

    <router-view :personnel="personnel" :pin="pin" @std-updated="updatePersonnel"></router-view>
</template>
<!--
<style scoped>
    .iconsize {
        font-size: 140px;
    }
</style>
-->

<script>
import SummaryItem from '../components/SummaryItem.vue';
import centerWorkspace from '@/js/center-workspace.js';

export default {
    inheritAttrs: false,

    props: {
        payload: Object,
        pin: String
    },

    data() {
        return {
            personnel: {}
        }
    },

    components: {
        SummaryItem
    },

    methods: {
		/**
		 * Mesure la taille des éléments présents dans la vue afin de les centrer verticalement.
		 */
		resize() {
            this.$nextTick(() => {
                centerWorkspace('workspace-goodbye');
            });
		},

        /**
         * Met à jour la veriable du personnel.
         * @param {Object} personnel Objet contenant l'ensmeble des informations du personnel et de son pointage
         */
        updatePersonnel(personnel) {
            this.personnel = personnel;
        }
	},

    mounted() {
		window.addEventListener('resize', this.resize);
		this.resize();
	},

    beforeMount() {
        this.updatePersonnel(this.payload);
    },

    updated() {
        this.resize();
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.resize);
    }
}


</script>
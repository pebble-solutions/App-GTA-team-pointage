<template>
    <AppModal title="Récap">    
        <summaryItem :data="pointage" title="Récap" :last-el="true" :can-edit="false"/>
    </AppModal>
</template>



<script>

import SummaryItem from '@/components/SummaryItem.vue';
import AppModal from '@/components/pebble-ui/AppModal.vue';

export default {

    props: {
        pointage: Object
    },

    components: {
        SummaryItem,
        AppModal
    },

    methods: {
        /**
         * Permet d'envoyer au composant parent l'étape a suivre : cancel(retour) ou suivant(submit)
         * @param {String} options 
         */
        stepAction(options) {
            //verif si les champs on été rempli avant de passer a l'étape suivant 
            return this.$emit('step', options)
        },
    }
}

</script>
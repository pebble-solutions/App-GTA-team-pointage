<template>
    <AppModal id="editPointage" title="Modifier mon pointage" :close-btn="true" :submit-btn="true" @submit="action()" @modal-hide="routeToList()">
        <summary-item :edit="true" :personnel="personnel" :pointage="tmpPointage" :gtaDeclarations="tmpGtaDeclarations"></summary-item>
    </AppModal>
</template>

<script>
import AppModal from '@/components/pebble-ui/AppModal.vue'
import SummaryItem from '@/components/SummaryItem.vue';

import { ref } from 'vue';

export default {
    props: {
        personnel: Object
    },

    data() {
        return {
            tmpPointage: {
                dd_date: null,
                dd_time: null,
                df_date: null,
                df_time: null
            },
            tmpGtaDeclarations: null
        }
    },

    components: {
        AppModal,
        SummaryItem
    },


    methods: {
        /**
         * Redirige le router vers la vue de liste du personnel
         */
        routeToList() {
            this.$router.push({name: 'Goodbye'});
        },

        /**
         * retour Uniquement lheure et les minutes d'une date
         * @param {Date} date 
         */
        displayTime(date) {
            if(date) {
                let newDate = new Date(date);
    
                let dateFormat = {weekday: "short", day:"numeric", hour: '2-digit', minute: '2-digit'};
    
                return newDate.toLocaleDateString('fr-FR', dateFormat);
            }
        }
    },

    beforeMount() {
        let dd = new Date(this.personnel.oStructureTempsDeclaration.dd);

        let ddH = dd.getHours() ;
        let ddM = dd.getMinutes();

        this.tmpPointage.dd_date = ref(dd);
        this.tmpPointage.dd_time = ref({
            hours : ddH,
            minutes : ddM
        });

        let df = new Date(this.personnel.oStructureTempsDeclaration.df);

        let dfH = df.getHours();
        let dfM = df.getMinutes();

        this.tmpPointage.df_date = ref(df);
        this.tmpPointage.df_time = ref({
            hours: dfH,
            minutes: dfM
        });

        console.log(this.personnel.oStructureTempsDeclaration);

        if(this.personnel.oStructureTempsDeclaration.gta_declarations) {
            this.tmpGtaDeclarations = this.personnel.oStructureTempsDeclaration.gta_declarations
        }
    }
}
</script>

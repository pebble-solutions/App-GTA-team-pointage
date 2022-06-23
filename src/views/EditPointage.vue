<template>
    <AppModal id="editPointage" title="Modifier mon pointage" :close-btn="true" :submit-btn="true" @submit="record()" @modal-hide="routeToList()" close-label="Annuler">
        <AlertMessage variant="danger" v-if="errorMessage">{{errorMessage}}</AlertMessage>

        <summary-item 
            :edit="true" 
            :personnel="personnel" 
            :pointage="tmpPointage" 
            :gta-declarations="tmpGtaDeclarations"></summary-item>

        <hr>

        <div class="mb-3">
            <label for="edition_reason" class="form-label">Justifiez</label>
            <textarea name="reason" id="edition_reason" rows="3" class="form-control" v-model="reason" placeholder="Indiquez les raisons de la modification de la déclaration ici."></textarea>
        </div>
    </AppModal>
</template>

<script>
import AppModal from '@/components/pebble-ui/AppModal.vue'
import SummaryItem from '@/components/SummaryItem.vue';

import { ref } from 'vue';
import '@/js/date.js'
import AlertMessage from '../components/pebble-ui/AlertMessage.vue';

export default {
    props: {
        personnel: Object,
        pin: String
    },

    data() {
        return {
            tmpPointage: {
                dd_date: null,
                dd_time: null,
                df_date: null,
                df_time: null
            },
            tmpGtaDeclarations: null,
            reason: '',
            errorMessage: null
        }
    },

    components: {
    AppModal,
    SummaryItem,
    AlertMessage
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
        },

        /**
         * Enregistrement des modifications
         */
        record() {
            let dd = new Date(this.tmpPointage.dd_date);
            dd.setHours(this.tmpPointage.dd_time.hours);
            dd.setMinutes(this.tmpPointage.dd_time.minutes);
            dd.setSeconds(0);

            let df = new Date(this.tmpPointage.df_date);
            df.setHours(this.tmpPointage.df_time.hours);
            df.setMinutes(this.tmpPointage.df_time.minutes);
            df.setSeconds(0);

            this.$app.apiPost('structurePersonnel/POST/'+this.personnel.id+'/editClockByPin/'+this.personnel.oStructureTempsDeclaration.id, {
                pin: this.pin, 
                dd: dd.getSqlDate(true), 
                df: df.getSqlDate(true), 
                gta_declarations: JSON.stringify(this.tmpGtaDeclarations),
                reason: this.reason
            })
            .then((data) => {
                this.$emit('std-updated', data);
                this.routeToList();
            })
            // .catch(this.$app.catchError);
            .catch((error) => {
                let message = this.$app.catchError(error, {
                    mode: 'message'
                });
                alert(message.replace('Error:', ''));
            });
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

        if(this.personnel.oStructureTempsDeclaration.gta_declarations) {

            this.tmpGtaDeclarations = JSON.parse(JSON.stringify(this.personnel.oStructureTempsDeclaration.gta_declarations));
        }
    }
}
</script>

<template>
    <AppModal id="editPointage" title="Modifier mon pointage" :close-btn="true" :submit-btn="true" @modal-hide="routeToList()">
        <form >
            
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="d-flex align-items-center justify-content-center">
                        <h2 class="pe-2 text-center">{{personnel.cache_nom}}</h2>
                    </div>
                </li>
            
                <li class="list-group-item" >
                    <div class="d-flex align-items-center" >
                        <span class="pe-2">Horaires:</span> 

                        <Datepicker v-model="date" :time-picker-component="timePicker" />
                        <Datepicker v-model="date" :time-picker-component="timePicker" />
                        <i class="bi bi-chevron-right"></i> 
                        <Datepicker v-model="tmpPointage.dd" timePicker />
                        <!-- <span>{{displayTime(personnel.oStructureTempsDeclaration.df)}} </span> -->
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="d-flex align-items-center">
                        <span class="pe-2">  {{}} </span>
                        <span class="badge btn-success ms-auto">  <i class="bi bi-check-lg"></i></span>
                        <span class="badge btn-danger ms-auto"><i class="bi bi-x-lg"></i></span>
                    </div>
                </li>
            </ul>
        </form>
    </AppModal>
</template>

<script>
import AppModal from '@/components/pebble-ui/AppModal.vue'

import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    props: {
        personnel: Object
    },

    data() {
        return {
            tmpPointage: {
                dd:null,
                df:null
            },
            configdate : false,
        }
    },

    components: {
        AppModal,
        Datepicker
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

    mounted() {
        this.tmpPointage.dd = ref({
            hours : 4,
            minutes : 15
        })
    }


}
</script>

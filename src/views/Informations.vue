<template>
    <AppModal id="infosPersonnelPointage" title="Informations" :close-btn="true" @modal-hide="routeToList()">
        <div class="text-center">
            <h2 class="mb-0">{{personnel.cache_nom}}</h2>
            <p>{{personnel.oStructureTempsDeclaration.poste}}</p>

            <div class="d-flex align-items-center justify-content-center fs-3">
                <span v-if="personnel.clock_status">{{displayTime(personnel.oStructureTempsDeclaration.dd)}}</span> 
            
                <i class="bi bi-chevron-compact-right mx-2" v-if="personnel.clock_status == 'over' || personnel.clock_status== 'open'"></i> 
                <span v-else>-</span>

                <span v-if="personnel.clock_status == 'open'" >En Cours</span>
                <span v-if="personnel.clock_status == 'over'">{{displayTime(personnel.oStructureTempsDeclaration.df)}}</span>
            </div>

            <router-link :to="{name: 'ClockByPinForPresentStaff', params: {id: personnel.id}}" custom v-slot="{navigate, href}" v-if="personnel.clock_status == 'open'">
                <a :href="href" @click="navigate" class="text-decoration-none btn btn-primary mt-3">
                    Terminer mon pointage
                </a>
            </router-link>
        </div>
    </AppModal>
</template>

<script>

import AppModal from '@/components/pebble-ui/AppModal.vue';
import sqlDateToIso from '../js/sqlDateToIso';

export default {
    props: {
        personnelList: Array
    },

    components: {
        AppModal
    },

    computed: {
        /**
         * Retourne l'objet représentant le personnel passé en url depuis son ID
         * @return {Object}
         */
        personnel() {
            let personnelId = this.$route.params.id;
            let personnel = this.personnelList.find((e) => e.id == personnelId);
            return personnel;
        },
    },

    methods: {
        /**
         * Redirige le router vers la vue de liste du personnel
         */
        routeToList() {
            this.$router.push({name: 'PersonnelPresent'});
        },

        /** METTRE DANS UN FICHIER JS GLOBAL*/
        /**
         * retour Uniquement lheure et les minutes d'une date
         * @param {Date} date 
         */
        displayTime(date) {
            if(date) {
                let newDate = new Date(sqlDateToIso(date));
    
                let dateFormat = {weekday: "short", day:"numeric", hour: '2-digit', minute: '2-digit'};
    
                return newDate.toLocaleDateString('fr-FR', dateFormat);
            }
        }
    },
}
</script>
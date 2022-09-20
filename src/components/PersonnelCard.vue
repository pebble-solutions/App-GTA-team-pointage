<template>
    <div class="card shadow mb-2"
        :class="{
            'border-success': data.clock_status == 'over',
            'border-warning': data.clock_status == 'open',
            'border-primary': data.clock_status == null
        }">
        <ul class="list-group list-group-flush">
            <li class="list-group-item text-center">
                <h3 class="my-0">{{displayName(data.cache_nom)}}</h3>
            </li>

            <li class="list-group-item text-center border-top"
                :class="{
                    'border-success': data.clock_status == 'over',
                    'border-warning': data.clock_status == 'open',
                    'border-primary': data.clock_status == null
                }" 
                :style="backgroundColorStyle()">
                <div class="d-flex align-items-center justify-content-center">
                    <span v-if="data.clock_status">{{displayTime(data.oStructureTempsDeclaration.dd)}}</span> 
                
                    <i class="bi bi-chevron-compact-right mx-2" v-if="data.clock_status == 'over' || data.clock_status== 'open'"></i> 
                    <span v-else>-</span>

                    <span v-if="data.clock_status == 'open'" >En Cours</span>
                    <span v-if="data.clock_status == 'over'">{{displayTime(data.oStructureTempsDeclaration.df)}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import sqlDateToIso from '../js/sqlDateToIso';

export default {
    props: {
        data: Object
    },
    data() {
        return {
            timeNow : null,
            late : false,
        }
    },
    methods: {
        /**
         * retourn une liste de style en fonction des date de début et fin
         */
        backgroundColorStyle() {
            let styleList = '';

            switch (this.data.clock_status) {
                case "over":
                    styleList += ' background-color : #cdf6d7;';
                    break;

                case "open":
                    styleList += ' background-color : #f8ed82;';
                    break;
            
                default:
                    styleList += ' background-color : #c7f8ff;';
                    break;
            }

            return styleList;
        },

        /**
         * Retourn le nom et le premier lettre du prenom via un cache_nom
         * @param {String} cache_nom 
         * 
         * @return {String}
         */
        displayName(cache_nom) {

            let newCache_nom = 'Sans-nom';

            if (typeof cache_nom === 'string') {
                let nom_prenom = cache_nom.split(' ');
                
                let nom = nom_prenom[0];
                let prenom = nom_prenom[1].charAt(0);
                
                newCache_nom = nom + ' ' + prenom;
            }

            return newCache_nom;
        },

        /** METTRE DANS UN FICHIER JS GLOBAL*/
        /**
         * retour Uniquement lheure et les minutes d'une date
         * @param {Date} date 
         */
        displayTime(date) {
            if(date) {
                let newDate = new Date(sqlDateToIso(date));
                let dateNow = new Date();
    
                let dateFormat = {weekday: "short", day:"numeric", hour: '2-digit', minute: '2-digit'};
                let timeFormat = {hour: '2-digit', minute: '2-digit'};

                if(newDate.toLocaleDateString() == dateNow.toLocaleDateString()) {
                    return newDate.toLocaleTimeString('fr-FR', timeFormat);
                } else {
                    return newDate.toLocaleDateString('fr-FR', dateFormat);
                }
            }
        }
    },
    beforeMount() {
        let dateNow = new Date();
        this.timeNow = dateNow.toLocaleTimeString();
    }
}
</script>

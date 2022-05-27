<template>
    <div class="card mb-3 mx-4 shadow"
        style="font-size:2rem;"
        :class="{
            'border-success': data.clock_status == 'over',
            'border-warning': data.clock_status == 'open',
            'border-primary': data.clock_status == null
        }">
        <ul class="list-group list-group-flush">
            <li class="list-group-item text-center">
                <h3>{{displayName(data.cache_nom)}}</h3>
            </li>

            <li class="list-group-item text-center border-top"
                :class="{
                    'border-success': data.clock_status == 'over',
                    'border-warning': data.clock_status == 'open',
                    'border-primary': data.clock_status == null
                }" 
                :style="backgroundColorStyle()">
                <div class="d-flex align-items-center justify-content-center">
                    <span v-if="data.clock_status" class="fs-4 pe-1">{{displayTime(data.oStructureTempsDeclaration.dd)}}</span> 
                
                    <i class="bi bi-chevron-compact-right" v-if="data.clock_status == 'over' || data.clock_status== 'open'"></i> 
                    <span v-else>-</span>

                    <span class="ps-1 fs-4" v-if="data.clock_status == 'open'" >En Cours</span>
                    <span v-if="data.clock_status == 'over'" class="fs-4">{{displayTime(data.oStructureTempsDeclaration.df)}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

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
            let nom_prenom = cache_nom.split(' ');
            
            let nom = nom_prenom[0];
            let prenom = nom_prenom[1].charAt(0);
            
            let newCache_nom = nom + ' ' + prenom;

            return newCache_nom;
        },

        /** METTRE DANS UN FICHIER JS GLOBAL*/
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
        let dateNow = new Date();
        this.timeNow = dateNow.toLocaleTimeString();
    }
}
</script>

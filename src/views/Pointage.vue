<template>
    <div class="d-flex flex-column justify-content-center align-items-center" v-if="personnel">
        <i v-if="personnel.clock_status == 'open'" class="bi bi-check-circle-fill text-success" style="font-size: 150px;"></i>

        <h1 class="display-3">{{displayDate('date')}}</h1>

        <div class="d-flex justify-content-center align-items-baseline">
            <div class="pe-3">
                <span class="fs-2" v-if="personnel.clock_status == 'open'" >Début :</span>
                <span class="fs-2" v-else>Fin :</span>
            </div>
    
            <span class="fs-1">{{displayDate('time')}}</span>
        </div>

        <div  v-if="personnel.clock_status=='over' && personnel.oStructureTempsDeclaration.gta_codages">
            <div v-for="question in personnel.oStructureTempsDeclaration.gta_codages" :key="'question-' + question.id">
                <div class="card my-3" v-if="question.public_label">
                    <div class="card-body" >
                        <div class="text-center">
                            <h2 class="mb-4">{{question.public_label}}</h2>
                
                            <button type="button" class="btn btn-success me-2 w-25" @click="actionBtnPointage('valider')">
                                <i class="bi bi-check-lg"></i>
                            </button>
        
                            <button type="button" class="btn btn-danger w-25" @click="actionBtnPointage('cancel')">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="personnel.clock_status == 'open'" class="mt-5">
            <router-link to="/" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate" class="btn btn-outline-secondary">
                    <i class="bi bi-house pe-2"></i>
                    Retour
                </a>
            </router-link>
        </div>

        <div v-if="personnel.clock_status == 'over'" class="mt-5 mb-4">
            <router-link :to="{name: 'Summary'}" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate" class="btn btn-primary fs-3 px-4" :class="{'disabled': !canValidated}" role="button" :aria-disabled="!canValidated">
                    Valider
                </a>
            </router-link>
        </div>

        <router-view :pointage="pointage"/>        
    </div>
</template>

<script>

export default {  

    props: {
        payload: Object
    },

    data() {
        return {
            canValidated : false,
            question: []
        }
    },

    computed: {
        personnel() {
            return this.payload;
        },
    },

    methods: {
        actionBtnPointage(action){
            console.log(action)
            if(action == 'validate'){
                // this.$router.push("/summary");
            } else {
                // this.$router.push("/summary");
            }
        },
        
        /**
         * Permet de retourner une date dans un format specifique
         * return soit une date au format Jour de semain, num jour, mois
         * ou return une date au format Heures:minutes
         * 
         * @param {String} format 
         */
        displayDate(format) {
            let newDate;
            let dateFormat = {weekday: "long", month: "long", day: "numeric"};
            let timeFormat = {hour: '2-digit', minute: '2-digit'};
            
            switch (this.personnel.clock_status) {
                case 'open':
                    newDate = new Date(this.personnel.oStructureTempsDeclaration.dd);
                    break;

                /*** when clock_status is 'over' */
                default:
                    newDate = new Date(this.personnel.oStructureTempsDeclaration.df);
                    break;
            }

            if(format == 'date') {
                let displayDate = newDate.toLocaleDateString('fr-FR', dateFormat);
                let tmpDate = displayDate.split(' ');

                let day = tmpDate[0].charAt(0).toUpperCase() + tmpDate[0].substring(1) ;
                let month = tmpDate[2].charAt(0).toUpperCase() + tmpDate[2].substring(1) ;

                tmpDate[0] = day;
                tmpDate[2] = month;

                displayDate = tmpDate.join(' ');

                return displayDate;
            } else {
                return newDate.toLocaleTimeString('fr-FR', timeFormat);
            }
        }
    },
}
</script>
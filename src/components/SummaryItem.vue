<template>
    <div class="border-dark border-2 pb-2 my-2" >
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="d-flex align-items-center justify-content-center">
                    <h2 class="pe-2 text-center">{{displayDay(this.personnel.oStructureTempsDeclaration.dd)}}</h2>
                </div>
            </li>

            <li class="list-group-item" >
                <div class="d-flex align-items-center" v-if="!edit">
                    <span class="pe-2">Amplitude:</span>
                    <span class="badge summary_badge text-primary">{{workHours('start', this.personnel.oStructureTempsDeclaration.dd)}} <i class="bi bi-chevron-right"></i> 
                    {{workHours('end', this.personnel.oStructureTempsDeclaration.df)}} </span>
                    <span class="ms-auto">{{amplitude}}</span>
                </div>

                <div class="pb-2" v-else>
                        <div class="mb-3" v-if="tmpPointage">
                            <span class="pe-2">Date de début:</span>

                            <div class="d-flex align-items-content">
                                <Datepicker class="pe-2" v-model="tmpPointage.dd_date" autoApply :enableTimePicker="false" position="left" :format="frFormat" readonly/>
                                <Datepicker class="ps-2" v-model="tmpPointage.dd_time" timePicker modeHeight="120" position="right" required>
                                    <template #input-icon>
                                        <i class="bi bi-clock px-2"></i>
                                    </template>
                                </Datepicker>
                            </div>
                        </div>
                        
                        <div v-if="tmpPointage">
                            <span>Date de fin:</span>
                            
                            <div class="d-flex align-itmes-content">
                                <Datepicker class="pe-2" v-model="tmpPointage.df_date" autoApply :enableTimePicker="false" position="left" :format="frFormat" required/>
                                <Datepicker class="ps-2" v-model="tmpPointage.df_time" timePicker modeHeight="120" position="right" required>
                                    <template #input-icon>
                                        <i class="bi bi-clock px-2"></i>
                                    </template>
                                </Datepicker>
                            </div>
                        </div>
                    </div>
            </li>

            <li class="list-group-item">
                <div class="d-flex align-items-center py-1" v-for ='question in this.tmpGtaDeclarations' :key ="'question' + question.id">
                    <!-- <span class="pe-2">{{question.public_label}}</span> -->
                    <span class="pe-2">{{getGtaLabelFromDeclaration(question)}}</span>

                    <div class="btn-group ms-auto">
                        <span class="btn btn-outline-success" :class="{'active': question.qte}" v-if="edit" @click="editQuestionAnswer(question, 'oui')">
                            <i class="bi bi-check-lg"></i>
                        </span>
                        <i class="bi bi-check-lg text-success" v-if="!edit && question.qte == 1"></i>


                        <span class="btn btn-outline-danger" :class="{'active': question.qte == 0} " v-if="edit " @click="editQuestionAnswer(question, 'non')">
                            <i class="bi bi-x-lg"></i>
                        </span>
                        <i class="bi bi-x-lg text-danger" v-if="!edit && question.qte == 0"></i>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>


.summary_badge {
    background-color: #e3f2fd;
}
</style>


<script>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css';

export default {

    props: {
        personnel: Object,
        pointage: Object,
        gtaDeclarations: Object,
        edit: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            tmpPointage: null,
            tmpGtaDeclarations: null,
        }
    },

    components: {
        Datepicker
    },

    computed: {
        /**
         * Calcule l'amplitude entre la date de début et la date de fin 
         */
       
        amplitude() {
            console.log(this.personnel.oStructureTempsDeclaration.dd);
            let dd = new Date(this.personnel.oStructureTempsDeclaration.dd);
            let df = new Date(this.personnel.oStructureTempsDeclaration.df);
            console.log(dd.toLocaleDateString("fr"));
            
            let amplitude = Math.abs(df - dd);
            console.log(amplitude);

            let minutes = Math.floor((amplitude / (1000 * 60)) % 60),
                hours = Math.floor((amplitude / (1000 * 60 * 60)) % 24);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;

            return hours + ":" + minutes;

            
            
        }
    },

    methods: {     
        /**
         * extraction de paramètre de la date pour affichage
         * displayDay pour le jour en abrégé
         * displayHour pour les horaires
         * @param {Date} date 
         */
        displayDay(date) {
            if(date) {
                let newDate = new Date(date);
   
                let dateFormat = {weekday: "short", day:"numeric", month:"short"};
   
                return newDate.toLocaleDateString('fr-FR', dateFormat);
            }
        },

        // /**
        //  * Get the Timming (l'heure et minutes) from date
        //  * @param {Date} date 
        //  */
        // displayHour(date) {
        //     if(date) {
        //         let dateObj = new Date(date);
        //         let minutes = dateObj.getMinutes();

        //         if(minutes.toString().length == 1) {
        //         minutes = '0' + minutes;
        //         }
        //         return dateObj.getHours(date) + ':' + minutes;
        //     }
        // },

        /**
         * Get timming of start and end from date
         * @param {String} periode 
         */
        workHours(periode, date) {
            let dateObj = new Date(date);
            let minutes = dateObj.getMinutes();

            if(minutes.toString().length == 1) {
                minutes = '0' + minutes;
            }
           
            if(periode == "end") {
                let ddDate = new Date(this.personnel.oStructureTempsDeclaration.dd)
                if(ddDate.toLocaleDateString() < dateObj.toLocaleDateString()) {
                    return dateObj.getHours() + ':' + minutes + ' J+1';
                }
            }          
           
            // if(periode == "endBreak") {
            //     let dpdDate = new Date(this.personnel.oStructureTempsDeclaration.dpd);
            //     if(dpdDate.toLocaleDateString() < dateObj.toLocaleDateString()) {
            //         return dateObj.getHours() + ':' + minutes + ' J+1';
            //     }
            // }          

            return dateObj.getHours() + ':' + minutes;
        },

        /**
         * Change the question answer
         * 
         * @param {Object} question 
         * @param {String} type 
         */
        editQuestionAnswer(question, type){
            if(type == "oui") {
                question.qte = 1;
            } else {
                question.qte = 0;
            }
        },

        /**
         * retourne le libellé (public_label) d'un gtaCodage en fonction d'une gtaDeclaration.
         * si public_label est vide alors on return le nom.
         * 
         * @param {Object} declaration représentation d'une gtaDeclaration
         * @returns {String}
         */
        getGtaLabelFromDeclaration(declaration){
            let gtaCodage = this.personnel.oStructureTempsDeclaration.gta_codages.find(e => e.id === declaration.gta__codage_id);
            let label;
            if (gtaCodage.public_label){
                label = gtaCodage.public_label;
            }
            else if (gtaCodage.nom){
                label = gtaCodage.nom;
            }
            else {label = 'libellé non défini';}

            //let publicLabel = gtaCodage.find (label => label.nom === 'public_label');
            //console.log(publicLabel.value);
            return label;
            // find retrouver le libellé
        },
    },

    mounted() {
        console.log('pointage',this.pointage)
        if(this.pointage) {
            this.tmpPointage = this.pointage;
        }

        if(this.gtaDeclarations) {
            this.tmpGtaDeclarations = this.gtaDeclarations;
        } else {
            this.tmpGtaDeclarations = this.personnel.oStructureTempsDeclaration.gta_declarations
        }

        this.$emit('mounted');
    },

     setup() {

        const frFormat = (date) => {
            const day = date.getDate();
            const month = date.getMonth() +1;
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        };

        return {
            frFormat
        };
     }
}

</script> 
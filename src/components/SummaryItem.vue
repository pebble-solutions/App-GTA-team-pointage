<template>
    <div class="border-dark border-2 pb-2 my-2">
        <ul class="list-group list-group-flush">
            <li 
                class="list-group-item"
                                
                @click="editPointage()"
            >
                <div class="d-flex align-items-center" >
                    <span class="pe-2">Horaires:</span> 
                    
                    <span>{{workHours('start', data.dd)}}</span> 
                    <i class="bi bi-chevron-right"></i> 
                    <span>{{workHours('end', data.df)}}      </span>
                    
                    <i class="bi bi-pencil-fill text-secondary ms-auto"></i>
                </div>
            </li>
    
            <!-- <li 
                class="list-group-item"
                               
                v-if="data.dpd"
                
                @click="editPointage('WorkBreakForm')"
            >
                <div class="d-flex align-items-center">
                    <span class="pe-2">Pause:</span> 
                    <span>
                        {{workHours('startBreak', data.dpd)}} <i class="bi bi-chevron-right"></i> {{workHours('endBreak', data.dfp)}}
                    </span>
                    <i class="bi bi-pencil-fill text-secondary ms-auto" v-if="data.valider == 'NON'"></i>
                </div>
            </li> -->
    
            <!-- <li 
                class="list-group-item"
                               
                @click="editPointage('InformationsGeneralesForm')"
            >
                <div class="d-flex align-items-center">
                    <span class="pe-2">Projet: </span>
                    <span :class="{'badge  summary_badge text-primary': data.valider == 'NON'}">{{data.projet}}</span>
                    <i class="bi bi-pencil-fill text-secondary ms-auto" v-if="data.valider == 'NON'"></i>
                </div>
            </li>
    
            <li 
                class="list-group-item"
                :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}" 
                
                @click="editPointage('InformationsGeneralesForm')"
            >
                <div class="d-flex align-items-center">
                    <span class="pe-2">Poste:</span>
                    <span :class="{'badge  summary_badge text-primary': data.valider == 'NON'}">{{data.poste}}</span>
                    <i class="bi bi-pencil-fill text-secondary ms-auto" v-if="data.valider == 'NON'"></i>
                </div>
            </li> -->
        </ul>
    </div>
</template>



<script>

export default {

    props: {
        data: Object,
        pointage: Object
    },
    data() {
        return {
            pointage_test : null
        }
    },
    methods: {
        /**
         * Get the timming of start and end from the date 
         * @param {String} periode 
         */
        workHours(periode, date) {
            let dateObj = new Date(date);
            let minutes = dateObj.getMinutes();

            if(minutes.toString().length == 1) {
                minutes = '0' + minutes;
            }
            
            if(periode == "end") {
                let ddDate = new Date(this.data.dd)
                if(ddDate.toLocaleDateString() < dateObj.toLocaleDateString()) {
                    return dateObj.getHours() + ':' + minutes + ' J+1';
                }
            }           
            
            if(periode == "endBreak") {
                let dpdDate = new Date(this.data.dpd);
                if(dpdDate.toLocaleDateString() < dateObj.toLocaleDateString()) {
                    return dateObj.getHours() + ':' + minutes + ' J+1';
                }
            }           

            return dateObj.getHours() + ':' + minutes;
        },

        editPointage() {
             this.$emit('edit-pointage', this.pointage);

            this.$router.push({name : 'Pointage', params : {id : this.data.id}});
        }
    },

    beforeMount() {
        this.pointage_test = this.data;

        console.log(this.data);
    }
}

</script>
<template>
    <div style="margin:auto;">
        <h2 class="py-4 text-center" style="font-size: 4rem;">Personnel Présent</h2>
        
        <div class="d-flex justify-content-start flex-wrap">
            <div style="width: 25%;" v-for="personnel in personnelList" :key="'personnel-'+ personnel.id">
                <PersonnelCard :data="personnel" />
            </div>
        </div>
    </div>
</template>


<script>
import PersonnelCard from '@/components/PersonnelCard.vue'

export default {
    components: {
        PersonnelCard
    },

    data() {
        return {
            personnelList : [],
            pending: {
                personnel: true
            }
        }
    },

    computed: {
        /**
         * Retourne uniquement la liste du personnel avec un pointage en cours
         * 
         * @return {Array}
         */
        personnelActif() {
            return this.personnelList.filter(e => e.clock_status == 'open');
        }
    },

    mounted() {
        this.$app.apiGet('structurePersonnel/GET/list', {
            clock_status: true
        })
        .then((data) => {
            this.personnelList = data;
            this.pending.personnel = false;
        })
        .catch(this.$app.catchError);
    }

}
</script>
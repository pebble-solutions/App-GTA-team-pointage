<template>
    <div>
        <h2 class="py-4 text-center">Sélectionnez votre personnel</h2>

        <div class="d-flex justify-content-start flex-wrap px-4">
            <div style="width: 25%;" v-for="personnel in personnelList" :key="'personnel-'+ personnel.id">
                <router-link :to="{name: 'ClockByPin', params: {id: personnel.id}}" custom v-slot="{navigate, href}">
                    <a :href="href" @click="navigate" class="text-decoration-none">
                        <PersonnelCard :data="personnel"/>
                    </a>
                </router-link>
            </div>
        </div>
    </div>

    <router-view :personnel-list="personnelList" @pin-validate="pinValidate"></router-view>
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

    
    methods: {
        /**
         * Transfert les données de pointage à l'élément parent.
         * @param {Object} payload Objet contenant le personnel, son status de pointage, son temps déclaration
         */
        pinValidate(payload) {
            this.$emit('transfer-payload', payload);
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
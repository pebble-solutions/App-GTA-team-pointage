<template>
    <div style="margin:auto;">
        <div v-if="pending.personnel" class="text-center text-secondary py-4">
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            
            <div class="fs-4">Chargement en cours...</div>
        </div>
        
        <div v-else>
            <h2 class="py-4 text-center">Personnel présent</h2>

            <div class="alert alert-warning text-center" role="alert" v-if="personnelActif.length == 0 && pending.personnel == false">
                Aucune personne présente!
            </div>
            
            <div class="row">
                <div class="col-xs-12 col-md-3" v-for="personnel in personnelActif" :key="'personnel-'+ personnel.id">
                    <router-link :to="{name: 'Informations', params: {id: personnel.id}}" custom v-slot="{navigate, href}">
                        <a :href="href" class="text-decoration-none" @click="navigate">
                            <PersonnelCard :data="personnel" />
                        </a>
                    </router-link>
                </div>
            </div>
        </div>
    </div>

    <router-view :personnel-list="personnelList" @pin-validate="pinValidate" @pin-change="pinChange"></router-view>
</template>


<script>
import PersonnelCard from '@/components/PersonnelCard.vue'

export default {
    inheritAttrs: false,
    
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

    methods: {
        /**
         * Transfert les données de pointage à l'élément parent.
         * @param {Object} payload Objet contenant le personnel, son status de pointage, son temps déclaration
         */
        pinValidate(payload) {
            this.$emit('transfer-payload', payload);
        },

        /**
         * Transmet le code pin saisis au composant parent
         * @param {Number} pin Le code pin
         */
        pinChange(pin) {
            this.$emit('pin-change', pin);
        }
    },

    mounted() {
        this.$app.apiGet('structurePersonnel/GET/list', {
            clock_status: true,
            linked_only: true
        })
        .then((data) => {
            this.personnelList = data;
            this.pending.personnel = false;
        })
        .catch(this.$app.catchError);
    }

}
</script>
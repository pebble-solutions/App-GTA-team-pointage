<template>
    <div v-if="gtaCodage">
        <div class="card my-3" v-if="gtaCodage.saisie_personnel === 'OUI'">
            <div class="card-body" >
                <div class="text-center">
                    <h2 class="mb-4" v-if="gtaCodage.public_label">{{gtaCodage.public_label}}</h2>
                    <h2 class="mb-4" v-else>{{gtaCodage.nom}}</h2>
    
                    <div v-if="'int' == gtaCodage.type_value || 'float' == gtaCodage.type_value" class="input-group w-50 m-auto" role="group">
                        <button type="button" class="btn btn-outline-dark" @click="incrementValue(-1)">
                            <i class="bi bi-dash-lg">1</i>
                        </button>

                        <button type="button" class="btn btn-outline-dark" @click="incrementValue(-0.1)" v-if="'float' == gtaCodage.type_value">
                            <i class="bi bi-dash-lg">0,1</i>
                        </button>

                        <input type="number" class="text-center form-control w-25" :step="'float' == gtaCodage.type_value ? 0.1 : 1" v-model="value" />

                        <button type="button" class="btn btn-outline-dark" @click="incrementValue(0.1)" v-if="'float' == gtaCodage.type_value">
                            <i class="bi bi-plus-lg">0,1</i>
                        </button>

                        <button type="button" class="btn btn-outline-dark" @click="incrementValue(1)">
                            <i class="bi bi-plus-lg">1</i>
                        </button>
                    </div>
                    
                    <div v-else>
                        <button type="button" class="btn mx-2 w-25" @click="setValue(true)" :class="btnClass('success')">
                            <i class="bi bi-check-lg"></i>
                        </button>
    
                        <button type="button" class="btn mx-2 w-25" @click="setValue(false)" :class="btnClass('danger')">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>

export default {
    props: {
        gtaCodage: Object,
        gtaDeclaration: Object,
    },

    data() {
        return {
            value: null
        }
    },

    emits: ['qte-change'],

    watch: {
        /**
         * Vérifie les contraintes du GtaCodage pour affecter une nouvelle
         * valeur à la déclaration.
         * @param {Mixed} newVal Nouvelle valeur à affecter
         * @param {Mixed} oldVal Ancienne valeur
         */
        value(newVal, oldVal) {
            if (this.gtaCodage.max_occurence_periode && newVal > this.gtaCodage.max_occurence_periode || this.value < 0) {
                this.value = oldVal;
            } else {
                this.$emit('qte-change', newVal);
            }
        }
    },

    methods: {
        /**
         * Retourne la classe à affecter à un bouton en fonction de la valeur d'une déclaration
         * 
         * @param {String} type Le type de bouton
         */
        btnClass(type) {
            let declaration = this.gtaDeclaration;

            if (!declaration) {
                return "btn-outline-" + type;
            }
            else {
                if ((!this.value && type == "success") || (this.value && type == "danger") || this.value === null || typeof this.value === 'undefined') {
                    return "btn-outline-" + type;
                }
                else {
                    return "btn-" + type;
                }
            }
        },

        /**
         * Incrémente une valeur à la déclaration
         * 
         * @param {Number} value  La valeur a ajouter ou enlever
         */
        incrementValue(value) {
            this.value = parseFloat((value + this.value).toFixed(2));
        },

        /**
         * Affecte une nouvelle valeur à la déclaration.
         * 
         * @param {Mixed} value Valeur à affecter
         */
        setValue(value) {
            this.value = value;
        }
    }
}

</script>
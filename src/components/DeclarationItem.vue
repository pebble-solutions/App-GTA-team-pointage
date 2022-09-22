<template>
    <div v-if="gtaCodage">
        <div class="card my-3" v-if="gtaCodage.saisie_personnel === 'OUI'">
            <div class="card-body" >
                <div class="text-center">
                    <h2 class="mb-4" v-if="gtaCodage.public_label">{{gtaCodage.public_label}}</h2>
                    <h2 class="mb-4" v-else>{{gtaCodage.nom}}</h2>
    
                    <div v-if="'int' == gtaCodage.type_value || 'float' == gtaCodage.type_value" class="input-group w-50 m-auto" role="group">
                        <button type="button" class="btn btn-outline-dark" @click="actionClick(-1)">
                            <i class="bi bi-dash-lg">1</i>
                        </button>

                        <button type="button" class="btn btn-outline-dark" @click="actionClick(-0.1)" v-if="'float' == gtaCodage.type_value">
                            <i class="bi bi-dash-lg">0,1</i>
                        </button>

                        <input type="number" class="text-center form-control w-25" :step="'float' == gtaCodage.type_value ? 0.1 : 1" v-model="qteQuestion" />

                        <button type="button" class="btn btn-outline-dark" @click="actionClick(0.1)" v-if="'float' == gtaCodage.type_value">
                            <i class="bi bi-plus-lg">0,1</i>
                        </button>

                        <button type="button" class="btn btn-outline-dark" @click="actionClick(1)">
                            <i class="bi bi-plus-lg">1</i>
                        </button>
                    </div>
                    
                    <div v-else>
                        <button type="button" class="btn mx-2 w-25" @click="actionBtnPointage(true)" :class="btnClass('success')">
                            <i class="bi bi-check-lg"></i>
                        </button>
    
                        <button type="button" class="btn mx-2 w-25" @click="actionBtnPointage(false)" :class="btnClass('danger')">
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
        gtaDeclarations: Array,
    },

    data() {
        return {
            qteQuestion: 0,
            declarationPointage: []
        }
    },

    watch: {
        qteQuestion(newVal, oldVal) {
            let declaration;
            let value;

            if (this.gtaCodage.max_occurence_periode != 0 && newVal > this.gtaCodage.max_occurence_periode || this.qteQuestion < 0) {
                value = oldVal;
            } else {
                if ('int' == this.gtaCodage.type_value) {
                    console.log('int');
                    newVal = Math.round(parseInt(newVal));
                }

                if ('float' == this.gtaCodage.type_value) {
                    console.log('float');
                    newVal = parseFloat(newVal).toFixed(1);
                }

                console.log(typeof this.qteQuestion);
                console.log(this.qteQuestion);
                console.log(newVal);

                value = newVal;
            }
            
            let found = this.declarationPointage.find(e => e.gta__codage_id == this.gtaCodage.id);

            if (found) {
                declaration = found;
            } else {
                declaration = {
                    gta__codage_id: this.gtaCodage.id
                };
                this.declarationPointage.push(declaration);
            }

            declaration.qte = this.qteQuestion;
            this.qteQuestion = value;
        }
    },

    methods: {
        /**
         * Retourne la classe à affecter à un bouton en fonction de la valeur d'une déclaration
         * 
         * @param {String} type Le type de bouton
         */
         btnClass(type) {
            let declaration = this.declarationPointage.find(e => e.gta__codage_id == this.gtaCodage.id);

            if (!declaration) {
                return "btn-outline-" + type;
            }
            else {
                if ((!declaration.qte && type == "success") || (declaration.qte && type == "danger")) {
                    return "btn-outline-" + type;
                }
                else {
                    return "btn-" + type;
                }
            }
        },

        /**
         * Met à jour les informations du codage
         *
         * @param {Number} value La valeur à enregistrer
         */
         actionBtnPointage(value) {
            let declaration;
            let found = this.declarationPointage.find(e => e.gta__codage_id == this.gtaCodage.id);
            if (found) {
                declaration = found;
            }
            else {
                declaration = {
                    gta__codage_id: this.gtaCodage.id
                };
                this.declarationPointage.push(declaration);
            }
            declaration.qte = value;
        },

        /**
         * Action a réaliser sur la variable qteQuestion
         * 
         * @param {Number} action  La valeur a ajouter ou enlever
         */
        actionClick(action) {
            this.qteQuestion += action;
        }
    },

    mounted() {
        this.declarationPointage = this.gtaDeclarations;

        let declaration;

        let found = this.declarationPointage.find(e => e.gta__codage_id == this.gtaCodage.id);

        if (found) {
            declaration = found;
        } else {
            declaration = {
                gta__codage_id: this.gtaCodage.id
            };
            this.declarationPointage.push(declaration);
        }

        declaration.qte = this.qteQuestion;
    }
}

</script>
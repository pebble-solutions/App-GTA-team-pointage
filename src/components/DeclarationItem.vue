<template>
    <div v-if="gtaCodage">
        <div class="card my-3" v-if="gtaCodage.saisie_personnel === 'OUI'">
            <div class="card-body" >
                <div class="text-center">
                    <h2 class="mb-4" v-if="gtaCodage.public_label">{{gtaCodage.public_label}}</h2>
                    <h2 class="mb-4" v-else>{{gtaCodage.nom}}</h2>
    
                    <div v-if="'int' == gtaCodage.type_value || 'float' == gtaCodage.type_value" class="btn-group form-control p-0 w-50" role="group">
                        <button type="button" class="btn btn-outline-dark" @click="actionClick(gtaCodage, 'less')">
                            <i class="bi bi-dash-lg">1</i>
                        </button>

                        <button type="button" class="btn btn-outline-dark" @click="actionClick(gtaCodage, 'littleLess')" v-if="'float' == gtaCodage.type_value">
                            <i class="bi bi-dash-lg">0,1</i>
                        </button>

                        <input type="number" class="text-center w-25" :step="'float' == gtaCodage.type_value ? 0.1 : 1" v-model="qteQuestion"/>

                        <button type="button" class="btn btn-outline-dark" @click="actionClick(gtaCodage, 'littleAdd')" v-if="'float' == gtaCodage.type_value">
                            <i class="bi bi-plus-lg">0,1</i>
                        </button>

                        <button type="button" class="btn btn-outline-dark" @click="actionClick(gtaCodage, 'add')">
                            <i class="bi bi-plus-lg">1</i>
                        </button>
                    </div>
                    
                    <div v-else>
                        <button type="button" class="btn mx-2 w-25" @click="actionBtnPointage(gtaCodage, true)" :class="btnClass(gtaCodage, 'success')">
                            <i class="bi bi-check-lg"></i>
                        </button>
    
                        <button type="button" class="btn mx-2 w-25" @click="actionBtnPointage(gtaCodage, false)" :class="btnClass(gtaCodage, 'danger')">
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

    methods: {
        /**
         * Retourne la classe à affecter à un bouton en fonction de la valeur d'une déclaration
         * 
         * @param {Object} gtaCodage Les informations du codage
         * @param {String} type Le type de bouton
         */
         btnClass(gtaCodage, type) {
            let declaration = this.declarationPointage.find(e => e.gta__codage_id == gtaCodage.id);
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
         * @param {Object} gtaCodage Les informations concernant le codage
         * @param {Number} value La valeur à enregistrer
         */
         actionBtnPointage(gtaCodage, value) {
            let declaration;
            let found = this.declarationPointage.find(e => e.gta__codage_id == gtaCodage.id);
            if (found) {
                declaration = found;
            }
            else {
                declaration = {
                    gta__codage_id: gtaCodage.id
                };
                this.declarationPointage.push(declaration);
            }
            declaration.qte = value;
        },

        /**
         * Action a réaliser sur la variable qteQuestion
         * 
         * @param {Object} gtaCodage Les informations concernant le codages
         * @param {String} action L'action 
         */
        actionClick(gtaCodage, action) {
            let declaration;

            if ("less" == action && this.qteQuestion >= 1) {
                if ('float' == gtaCodage.type_value) {
                    this.qteQuestion = parseFloat(this.qteQuestion) - 1;
                    this.qteQuestion = this.qteQuestion.toFixed(1);
                } else {
                    this.qteQuestion = parseInt(this.qteQuestion) - 1;
                    this.qteQuestion = Math.round(this.qteQuestion);
                }
            }

            if ("littleLess" == action && this.qteQuestion > 0) {
                this.qteQuestion -= 0.1;
                this.qteQuestion = this.qteQuestion.toFixed(1);

            }

            if ("add" == action) {
                if (gtaCodage.max_occurence_periode > 0) {
                    if (this.qteQuestion < gtaCodage.max_occurence_periode) {
                        if ('float' == gtaCodage.type_value) {
                            this.qteQuestion = parseFloat(this.qteQuestion) + 1;
                            this.qteQuestion = this.qteQuestion.toFixed(1);
                        } else {
                            this.qteQuestion = parseInt(this.qteQuestion) + 1;
                            this.qteQuestion = Math.round(this.qteQuestion);
                        }
                    }
                } else {
                    if ('float' == gtaCodage.type_value) {
                        this.qteQuestion = parseFloat(this.qteQuestion) + 1;
                        this.qteQuestion = this.qteQuestion.toFixed(1);
                    } else {
                        this.qteQuestion = parseInt(this.qteQuestion) + 1;
                        this.qteQuestion = Math.round(this.qteQuestion);
                    }
                }
            }

            if ("littleAdd" == action) {
                if (gtaCodage.max_occurence_periode > 0) {
                    if (this.qteQuestion < gtaCodage.max_occurence_periode) {
                        this.qteQuestion =  parseFloat(this.qteQuestion) + 0.1;
                        this.qteQuestion = this.qteQuestion.toFixed(1);
                    }
                } else {
                    this.qteQuestion = parseFloat(this.qteQuestion) + 0.1;
                    this.qteQuestion = this.qteQuestion.toFixed(1);
                }
            }

            let found = this.declarationPointage.find(e => e.gta__codage_id == gtaCodage.id);

            if (found) {
                declaration = found;
            } else {
                declaration = {
                    gta__codage_id: gtaCodage.id
                };
                this.declarationPointage.push(declaration);
            }

            declaration.qte = this.qteQuestion;
        }
    },

    mounted() {
        this.declarationPointage = this.gtaDeclarations
    }
}

</script>
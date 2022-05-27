<template>
    <div class="px-2">
        <h2 class="text-center pb-2">{{title}}</h2>

        <slot></slot>

        <div class="d-flex pt-4 btn-group" role="group" aria-label="Bouton de validation ou d'annulation">

            <button v-if="submitButton" class="btn w-50" :class="btnClass('success')" type="button" @click.prevent="$emit('submit')">
                <span v-if="successLabel">{{successLabel}}</span>

                <i class="bi bi-check-lg" v-else></i>
            </button>
            
            <button v-if="cancelButton" class="btn w-50" :class="btnClass('danger')" type="button" @click.prevent="$emit('cancel')">
                <span v-if="dangerLabel">{{dangerLabel}}</span>
                <i class="bi bi-x-lg" v-else></i>
            </button>

        </div>
    </div>
</template>


<script>
export default {
    props: {
        title: String,
        successLabel: {
            type: String,
            default() {
                return null;
            }
        },
        successClass: {
            type: String,
            default() {
                return null;
            }
        },
        dangerLabel: {
            type: String,
            default() {
                return null;
            }
        },
        dangerClass: {
            type: String,
            default() {
                return null;
            }
        },
        displayButton: {
            type : Boolean,
            default() {
                return true;
            }
        },
        submitButton: {
            type: Boolean,
            default() {
                return true;
            }
        },
        cancelButton: {
            type: Boolean,
            default() {
                return true;
            } 
        },
        btnOrder: {
            type: String,
            default() {
                return 'submitFirst' // cancelFirst
            }
        }
    },


    methods: {

        /**
         * Retourne la classe d'un bouton en fonction de son paramétrage. Si une chaine de caractère existe au niveau
         * de la prop associé, alors elle est utilisée. Sinon, on utilise danger ou success 
         * 
         * @param {String} btn Le type de bouton à analyser
         * 
         * @returns {String}
         */
        btnClass(btn) {
            let varName = btn+'Class';

            let className = this[varName];

            if (className) {
                return className;
            }
            else {
                return 'btn-outline-'+btn;
            }
        }

    }
}
</script>
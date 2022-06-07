<template>
    <AppModal id="clockByPin" :title="titelModal" :footer="false" @modal-hide="routeToList()" @modal-show="displayCodePin()">
        <div class="text-center">
            <div v-if="personnel.clock_status=='over'" class="alert alert-warning text-start d-flex align-items-center" role="alert">
                <i class="bi bi-exclamation-triangle me-3 fs-4"></i>
                <span class="text-left">Vous avez déjà une période déclarée aujourd'hui, la saisie du code pin déclenchera une nouvelle période de travail.</span>
            </div>
            <div v-if="pinError" class="alert alert-danger text-center" role="alert">
                Code Pin invalide
            </div>

            <h3 class="fs-1">{{personnel.cache_nom}}</h3>
            <label class="fs-3 mb-4">Saisisez votre code pin</label>
            
            <div class="my-4 d-flex justify-content-center">
                <input type="text" class="pincode-input form-control mx-2 secretNum" v-model="pinCode.pin1" :style="{'border-success': pinValide, 'border-danger': pinError}" inputmode="numeric" >
                <input type="text" class="pincode-input form-control mx-2 secretNum" v-model="pinCode.pin2" :style="{'border-success': pinValide, 'border-danger': pinError}" inputmode="numeric">
                <input type="text" class="pincode-input form-control mx-2 secretNum" v-model="pinCode.pin3" :style="{'border-success': pinValide, 'border-danger': pinError}" inputmode="numeric">
                <input type="text" class="pincode-input form-control mx-2 secretNum" v-model="pinCode.pin4" :style="{'border-success': pinValide, 'border-danger': pinError}" inputmode="numeric">
            </div>
        </div>
    </AppModal>
</template>

<style>
    .pincode-input {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 1.5rem;
    }

    .secretNum {
        -webkit-text-security: disc;
    }
</style>


<script>

import AppModal from '@/components/pebble-ui/AppModal.vue'

export default {
    props: {
        personnelList: Array
    },
    
    data() {
        return {
            pinCode : {
                pin1 : null,
                pin2 : null,
                pin3 : null,
                pin4 : null
            },
            pinError : false,
            pinValide : false
        }
    },

    components: {
        AppModal
    },

    computed: {
        /**
         * Retourne l'objet représentant le personnel passé en url depuis son ID
         * @return {Object}
         */
        personnel() {
            let personnelId = this.$route.params.id;
            let personnel = this.personnelList.find((e) => e.id == personnelId);
            return personnel;
        },

        /**
         * Retourne le titre de la modal en fonction si le pointage est en cours ou pas
         * 
         * @return {String}
         */
        titelModal() {
            let title = "";

            if(this.personnel.clock_status=="open") {
                title = "Terminer mon pointage";
            } else {
                title = "Démarrer mon pointage" 
            }

            return title;
        }
    },

    methods: {
        /**
         * Redirige le router vers la vue de liste du personnel
         */
        routeToList() {
            this.$router.push({name: 'PersonnelList'});
        },

        /**
         * Recupere les inputs du code pin
         * block les utilisateurs a pouvoir mettre que un nombre dans le input avec le focus next
         * Si codePin mauvais, message d'error sinon passe au pointage 
         */
        displayCodePin() {
            let inputs = document.querySelectorAll(".pincode-input");

            if (inputs[0]) {
                inputs[0].focus();
            }

            inputs.forEach((input, index) => {
                input.addEventListener("input", () => {
                    if(inputs.length -1 == index) {
                        input.blur();
                        let pin = '';
                        
                        for( let pinNumber in this.pinCode) {
                            pin += this.pinCode[pinNumber];
                        }

                        this.$app.apiPost('structurePersonnel/POST/'+this.personnel.id+'/clockByPin', {
                            pin
                        })
                        .then((data) => {
                            this.$emit('pin-validate', data);
                            this.$emit('pin-change', pin);
                            this.$router.push({name : 'Pointage', params : {id: data.id}});
                        })
                        .catch(() => {
                            let refPinCode = {
                                pin1: null,
                                pin2: null,
                                pin3: null,
                                pin4: null
                            }

                            this.pinError = true;

                            this.pinCode = refPinCode;
                            inputs[0].focus();
                        });
                    } else {
                        inputs[index+1].focus();
                    }
                });
            });
        }
    },

    mounted() {
        //this.displayCodePin();
    }
}
</script>
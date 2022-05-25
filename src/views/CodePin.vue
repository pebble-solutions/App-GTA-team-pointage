<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <label class="fs-1 my-3">Saisiser votre code pin</label>
        
        <div v-if="pinError" class="alert alert-danger text-center w-50" role="alert">
            Code Pin invalide
        </div>

        <div v-if="pinValide" class="alert alert-success text-center w-50" role="success">
            Code Pin valide
        </div>

        <div class="my-4">
            <input type="number" class="pincode-input mx-2 secretNum" v-model="pinCode.pin1">
            <input type="number" class="pincode-input mx-2 secretNum" v-model="pinCode.pin2">
            <input type="number" class="pincode-input mx-2 secretNum" v-model="pinCode.pin3">
            <input type="number" class="pincode-input mx-2 secretNum" v-model="pinCode.pin4">
        </div>
    </div>
</template>

<style>
    .pincode-input {
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 3px;
        border: 2px solid grey;
        text-align: center;
        font-size: 1.5rem;
    }

    .secretNum {
        -webkit-text-security: disc;
    }
</style>


<script>

export default {
    data() {
        return {
            pinCode : {
                pin1 : null,
                pin2 : null,
                pin3 : null,
                pin4 : null
            },
            pinError : false,
            pinValide : false,
            personnelPinValide: [
                '1234',
                '4567',
                '7899'
            ]
        }
    },

    mounted() {
        let inputs = document.querySelectorAll(".pincode-input");

        inputs.forEach((input, index) => {
            input.addEventListener("input", () => {
                if(this.pinCode.pin1.toString().length > 0) {
                    if(inputs.length -1 == index) {
                        let pin = '';
                        
                        for( let pinNumber in this.pinCode) {
                            pin += this.pinCode[pinNumber];
                        }

                        let checkPin = this.personnelPinValide.find((pinV) => pinV == pin);

                        if(checkPin){
                            this.pinError = false;
                            this.pinValide = true;

                            input.blur();

                            setTimeout(() => {
                                this.$router.push('/pointage');
                            }, 1500);
                        } else {
                            /**** VOIR AVEC GUILLAUME SI IL Y A UNE MEILLEURE FACON DE FAIRE */
                            let refPinCode = {
                                pin1: null,
                                pin2: null,
                                pin3: null,
                                pin4: null
                            }

                            this.pinError = true;

                            this.pinCode = refPinCode;
                            inputs[0].focus();
                        }
                    } else {
                        input.nextElementSibling.focus();                   
                    }
                }
            });
        });


    }
}
</script>
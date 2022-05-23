<template>
	<div v-if="$store.state.login">
		<Carousel />

		<div class="maskCarousel d-block w-100 h-100">

		</div>

		<div class="overCarousel w-75">
			<h2 class="titleSize">Au Comptoire Venitien</h2>

			<div class="d-flex justify-content-evenly" style="margin-top: 400px;">
				<button type="button" class="btn btn-outline-primary bg-white px-3 py-2 fs-1 button-size-custom" @click="$router.push({name: 'QrCode'})">
					<i class="bi bi-qr-code pe-2"></i>
					QrCode
				</button>

				<button type="button" class="btn btn-outline-primary bg-white px-3 py-2 fs-1 button-size-custom" @click="$router.push({name: 'PersonnelList'})">
					<i class="bi bi-person-lines-fill pe-2 "></i>
					Liste Personnel
				</button>

				<button type="button" class="btn btn-outline-primary bg-white px-3 py-2 fs-1 button-size-custom" @click="$router.push({name: 'PersonnelPresent'})">
					<i class="bi bi-person-check-fill pe-2"></i>
					Personnel Présent
				</button>
				
				<!-- <button type="button" class="btn btn-primary" >
					Planning
				</button> -->
			</div>
		</div>
	</div>
</template>

<style>
	.maskCarousel {
		background-color: rgb(0,0,0,0.7);
		position: absolute;
		top: 0px;
		left: 0px;
	}

	.overCarousel {
		position: absolute;
		top: 50%;
		left: 50%;
		color: white;
		transform: translate(-50%,-50%);
		text-align: center;
	}

	.titleSize {
		font-size: 100px;
		/**Recup la font du resto */
		font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	}

	.button-size-custom {
		width: 450px;
		height: 80px;
	}
</style>

<script>

import {mapState} from 'vuex';
import Carousel from '@/components/Carousel.vue';

export default {
    name: "Home",
    data() {
        return {
            pending: {
                element: false
            }
        };
    },

	components: { 
		Carousel 
	},

    computed: {
        ...mapState(["tmpElement"])
    },

    methods: {
        /**
         * Enregistre un nouvel élément.
         * Étape 1 : appel la fonction record
         * Étape 2 : enregistre la modification dans le store
         * Étape 3 : redirige la route vers le nouvel élément
         */
        recordNew() {
            this.$app.record(this, this.tmpElement, {
                id: 0,
                pending: this.pending.element
            }).then((data) => {
                console.log(data);
                this.$store.dispatch("refreshElements", {
                    elements: [data]
                });
                this.$router.push("/element/" + data.id);
            }).catch(this.$app.catchError);
        }
    },
	beforeMount() {
		/**** call api get personnelListe */
		// this.$store.commit('injectPeronnels', )
	}



}
</script>

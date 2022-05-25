<template>
	<div class="text-center d-flex justify-content-center align-items-center" >
		<!-- <Carousel />

		<div class="maskCarousel d-block w-100 h-100">

		</div>

		<div class="overCarousel w-75"> -->
		<div>
			<h1 class="my-4 display-3" :style="'font-family:' + structure.font_family">{{structure.nom}}</h1> <!-- class="titleSize" -->

			<div class="card my-4">
				<div class="card-body">
					<h2 class="mb-3 display-6">Pointer</h2>
					<div class="d-flex justify-content-center pb-4">
						<router-link to="/qrcode" custom v-slot="{navigate, href}">
							<a :href="href" class="btn btn-outline-primary p-4 d-flex flex-column mx-4 " @click="navigate">
								<i class="bi bi-qr-code fs-1"></i>
								<span class="fs-3">QrCode</span>
							</a>
						</router-link>
		
						<router-link to="/codepin" custom v-slot="{navigate, href}">
							<a :href="href" class="btn btn-outline-primary p-4 d-flex flex-column" @click="navigate">
								<i class="bi bi-unlock fs-1"></i>
								<span class="fs-3">Code PIN</span>
							</a>
						</router-link>
					</div>
				</div>
			</div>

			<div class="my-4">
				<h2 class="mb-3 display-6">Équipe</h2>
				<div class="d-flex justify-content-center align-items-center">
					<router-link to="/personnel-list" custom v-slot="{navigate, href}">
						<a :href="href" class="btn btn-outline-primary bg-white fs-6 mx-4" @click="navigate">
							<i class="bi bi-person-lines-fill pe-2"></i>
							Liste Personnel
						</a>
					</router-link>
	
					<router-link to="/personnel-present" custom v-slot="{navigate, href}">
						<a :href="href" class="btn btn-outline-primary bg-white fs-6" @click="navigate">
							<i class="bi bi-person-check-fill pe-2"></i>
							Personnel Présent
						</a>
					</router-link>
				</div>
			</div>
		</div>

		<router-view/> <!-- v-if="isConnectedUser"-->
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
		margin-bottom: 50px;
	}

	.button-size-custom {
		width: 450px;
		height: 80px;
	}
</style>

<script>

import {mapState} from 'vuex';
// import Carousel from '@/components/Carousel.vue';

export default {
    name: "Home",

	props: {
		cfg: Object,
		cfgSlots: Object,
		structure: Object
	},

    data() {
        return {
            pending: {
                element: false
            },
			content_height: 0,
			cfg_slots: null
        };
    },

	// components: { 
	// 	Carousel 
	// },

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
	},

	mounted() {
		this.cfg_slots = this.cfgSlots;
		this.cfg_slots.menu = false;
	},

}
</script>

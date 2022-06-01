<template>
	<div class="d-flex flex-column justify-content-around py-4" >
		<div>
			<h1 class="card-title text-center my-4">{{structure.nom}}</h1>

			<!-- <div class="card my-4">
				<div class="card-body">
					<h2 class="mb-3 display-6">Gestion de l'équipe</h2> -->

					<div class="text-center my-4">
						<router-link :to="{name: 'PersonnelList'}" custom v-slot="{navigate, href}">
							<a :href="href" class="btn btn-outline-primary col-3 m-2" @click="navigate">
								<i class="bi bi-person-lines-fill fs-1 d-block"></i>
								<span class="fs-2">Pointer</span>
							</a>
						</router-link>

                        <!--Bouton QR code commenté pour le moment
                        <router-link to="/qrcode" custom v-slot="{navigate, href}">
                            <a :href="href" class="btn btn-outline-primary col-2 m-2" @click="navigate">
                                <div><i class="bi bi-qr-code fs-1"></i></div>
                                <div class="fs-2">QR Code</div>
                            </a>
                        </router-link>
                        fin de bouton QR code commenté-->

						<!--<router-link to="/personnel-present" custom v-slot="{navigate, href}">
							<a :href="href" class="btn btn-outline-primary col-3 m-2" @click="navigate">
								<i class="bi bi-person-check-fill fs-1 d-block"></i>
								<span class="fs-2">Équipe présente</span>
							</a>
						</router-link>-->
					</div>
				<!-- </div>
			</div> -->
		</div>
	</div>
</template>

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

	mounted() {
		this.cfg_slots = this.cfgSlots;
		this.cfg_slots.menu = false;
	},

}
</script>

<template>
	<div id="workspace-wrapper-home">
		<div id="workspace-home">
			<h1 class="text-center" v-if="activeStructure">{{activeStructure.nom_interne}}</h1>

			<!-- <div class="card my-4">
				<div class="card-body">
					<h2 class="mb-3 display-6">Gestion de l'équipe</h2> -->
			<div class="row">
				<div class="col-xs-12 col-md-6">
					<router-link :to="{name: 'PersonnelList'}" custom v-slot="{navigate, href}">
						<a :href="href" class="d-block my-2 btn btn-outline-success" @click="navigate">
							<i class="bi bi-person-check-fill fs-1 d-block"></i>
							<span class="fs-3">Arrivée</span>
						</a>
					</router-link>
				</div>
				<div class="col-xs-12 col-md-6">

					<!--Bouton QR code commenté pour le moment
					<router-link to="/qrcode" custom v-slot="{navigate, href}">
						<a :href="href" class="d-block my-2 btn btn-outline-primary col-2 m-2" @click="navigate">
							<div><i class="bi bi-qr-code fs-1"></i></div>
							<div class="fs-2">QR Code</div>
						</a>
					</router-link>
					fin de bouton QR code commenté-->

					<router-link :to="{name: 'PersonnelPresent'}" custom v-slot="{navigate, href}">
						<a :href="href" class="d-block my-2 btn btn-outline-danger" @click="navigate">
							<i class="bi bi-person-x fs-1 d-block"></i>
							<span class="fs-3">Départ</span>
						</a>
					</router-link>
				</div>
			</div>
				<!-- </div>
			</div> -->
		</div>
	</div>
</template>


<script>

import {mapGetters} from 'vuex';

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

    computed: {
		...mapGetters(['activeStructure'])
    },

	methods: {
		/**
		 * Mesure la taille des éléments présents dans la vue afin de les centrer verticalement.
		 */
		resize() {
			let height = window.innerHeight;
			let header = document.getElementById('app-header');
			let headerHeight = 0;

			if (header) {
				headerHeight = header.offsetHeight;
			}

			let footer = document.getElementById('app-footer');
			let footerHeight = 0;

			if (footer) {
				footerHeight = footer.offsetHeight;
			}

			let workspaceAvailable = height - headerHeight - footerHeight;

			let workspace = document.getElementById('workspace-home');
			let workspaceHeight = workspace.offsetHeight;

			let freespace = workspaceAvailable - workspaceHeight;
			let padding = 0;

			if (freespace > 0) {
				padding = freespace / 2;
			}

			let workspaceWrapper = document.getElementById('workspace-wrapper-home');
			workspaceWrapper.style.paddingTop = padding+'px';
			workspaceWrapper.style.paddingBottom = padding+'px';
		}
	},

	mounted() {
		this.cfg_slots = this.cfgSlots;
		this.cfg_slots.menu = false;

		window.addEventListener('resize', this.resize);

		this.resize();
	},

	beforeUnmount() {
		window.removeEventListener('resize', this.resize);
	}

}
</script>

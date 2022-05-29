<template>

	<AppWrapper
		:cfg="cfg"
		:cfg-menu="cfgMenu"
		:cfg-slots="cfgSlots"
		
		@auth-change="setLocal_user"
		@structure-change="switchStructure">


		<template v-slot:menu>
			<AppMenu>
				<AppMenuItem href="/qrcode" look="dark" icon="bi bi-qr-code">QrCode</AppMenuItem>
				<AppMenuItem href="/codepin" look="dark" icon="bi bi-unlock">Code Pin</AppMenuItem>
				<AppMenuItem href="/personnel-list" look="dark" icon="bi bi-person-lines-fill">Tous le personnel</AppMenuItem>
				<AppMenuItem href="/personnel-present" look="dark" icon="bi bi-person-check-fill">Equipe présente</AppMenuItem>
			</AppMenu>
		</template>

		<template v-slot:list>
			<AppMenu>
				<AppMenuItem :href="'/element/'+el.id" icon="bi bi-file-earmark" v-for="el in elements" :key="el.id">{{el.name}}</AppMenuItem>
			</AppMenu>
		</template>

		<template v-slot:core>
			<div class="bg-light px-3">
				<router-view 
					:cfg="cfg" 
					:cfg-slots="cfgSlots" 
					:structure="structure" 
					@pin-change="pinChange" 
					:payload="payload" 
					:pin="pin"
					@transfer-payload="updatePayload" /> <!-- v-if="isConnectedUser"-->
			</div>
		</template>

	</AppWrapper>
	
</template>

<script>

import AppWrapper from '@/components/pebble-ui/AppWrapper.vue'
import AppMenu from '@/components/pebble-ui/AppMenu.vue'
import AppMenuItem from '@/components/pebble-ui/AppMenuItem.vue'
import { mapActions, mapState } from 'vuex'

import CONFIG from "@/config.json"

export default {

	data() {
		return {
			cfg: CONFIG.cfg,
			cfgMenu: CONFIG.cfgMenu,
			cfgSlots: CONFIG.cfgSlots,
			pending: {
				elements: true
			},
			isConnectedUser: false,
			events: ['touch', 'touchList', 'scroll', 'load', 'click', 'mousemove', 'keypress'],
			content_height: 0,
			homeTimer : null,
			structure: {
				nom: "Au Comptoir Vénitien",
				font_family: "Cambria"
			},
			pin: null,
			payload: null
		}
	},

	computed: {
		...mapState(['elements', 'openedElement'])
	},

	// watch: {
	// 	pin(val) {
	// 		if (val) {
	// 			/** On redirige obligatoirement la route vers l'action de pointage */
	// 			this.$router.push('/Pointage.vue')
	// 		}
	// 	}
	// },

	methods: {
		/**
		 * Met à jour les informations de l'utilisateur connecté
		 * @param {Object} user Un objet LocalUser
		 */
		setLocal_user(user) {
			if (user) {
				this.$store.dispatch('login', user);
				this.isConnectedUser = true;
			}
			else {
				this.$store.dispatch('logout');
				this.isConnectedUser = false;
			}
		},

		/**
		 * Envoie une requête pour lister les éléments et les stocke dans le store
		 * 
		 * @param {Object} params Paramètre passés en GET dans l'URL
		 * @param {String} action 'update' (défaut), 'replace', 'remove'
		 */
		listElements(params, action) {
			action = typeof action === 'undefined' ? 'update' : action;
			this.$app.listElements(this, params)
			.then((data) => {
				this.$store.dispatch('refreshElements', {
					action,
					elements: data
				});
			})
			.catch(this.$app.catchError);
		},

		/**
		 * Change de structure, vide le store
		 * 
		 * @param {Integer} structureId
		 */
		switchStructure(structureId) {
			this.$router.push('/');
			this.$store.dispatch('switchStructure', structureId);
			this.listElements();
		},

		/**
		 * set le timer a 1min une fois le timer fini , revoi vers la methods homeTimeOut()
		 */
		setHomeTimer() {
			this.homeTimer = setTimeout(this.homeTimeOut, 60000);
		},

		/**
		 * revoi vers la route (URL) de la home
		 */
		homeTimeOut() {
			this.$router.push('/');
		},

		/**
		 * vide et relance le timer
		 */
		resetHomeTimer() {
			clearTimeout(this.homeTimer);

			this.setHomeTimer();
		},

		/**
		 * calcule la hauteur du core de l'application
		 * 
		 * @return {Number}
		 */
		calculateContentHeight() {
			let header = document.getElementById('app-header');
			let footer = document.getElementById('app-footer');

			let header_height = header.offsetHeight;
			let footer_height = footer.offsetHeight;

			let win_height = window.innerHeight;

			let content_height = win_height - header_height - footer_height - 40;

			return content_height;
		},

		/**
		 * Modifie le code pin du personnel enregistré
		 * @param {Number} payload Code pin du personnel
		 */
		pinChange(payload) {
			this.pin = payload;
		},

		/**
		 * Met à jour la clé payload en fonction des informations héritées depuis les enfants
		 * @param {Mixed} payload Le payload à transférer
		 */
		updatePayload(payload) {
			this.payload = payload;
		},

		...mapActions(['closeElement'])
	},

	components: {
		AppWrapper,
		AppMenu,
		AppMenuItem
	},

	mounted() {
		this.content_height = this.calculateContentHeight();

		document.addEventListener('resize', () => {
			this.content_height = this.calculateContentHeight();
		});

		this.events.forEach((event) => {
			window.addEventListener(event, this.resetHomeTimer)
		});

		this.setHomeTimer();
	},
}
</script>
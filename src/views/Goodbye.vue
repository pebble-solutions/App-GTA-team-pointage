<template>
    <div id="workspace-wrapper-goodbye">
        <div id="workspace-goodbye">
            <div class="text-center">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 60px;"></i>
                <h2 class="display-3">Bonne Journée</h2>
                <p>Vos informations de pointage ont été enregistrées.</p>
            </div>
            <div>
                <summaryItem :personnel="payload" @mounted="resize()"></summaryItem>
            </div>
            <div class="fixed-bottom text-center bg-light p-3 mb-5">
                <router-link to="/" custom v-slot="{navigate, href}">
                    <a :href="href" class="btn btn-primary mx-2" @click="navigate">Terminer</a>
                </router-link>
                <router-link :to="{name:'EditPointage'}" custom v-slot="{navigate, href}">
                    <a :href="href" class="btn btn-outline-secondary mx-2" @click="navigate"><i class="bi bi-pencil-square pe-2"></i>Modifier</a>
                </router-link>
            </div>
        </div>
    </div>

    <router-view :personnel="personnel"></router-view>
</template>
<!--
<style scoped>
    .iconsize {
        font-size: 140px;
    }
</style>
-->

<script>
import SummaryItem from '../components/SummaryItem.vue';

export default {
    inheritAttrs: false,

    props: {
        payload: Object
    },

    computed: {
        personnel() {
            return this.payload;
        },
    },

    components: {
        SummaryItem
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

			let workspace = document.getElementById('workspace-goodbye');
			let workspaceHeight = workspace.offsetHeight;

			let freespace = workspaceAvailable - workspaceHeight;
			let padding = 0;

			if (freespace > 0) {
				padding = freespace / 2;
			}

			let workspaceWrapper = document.getElementById('workspace-wrapper-goodbye');
			workspaceWrapper.style.paddingTop = padding+'px';
			workspaceWrapper.style.paddingBottom = padding+'px';
		}
	},

    mounted() {
		window.addEventListener('resize', this.resize);

		this.resize();
	},

    updated() {
        this.resize();
    },

    //@mounted="resize()"

    beforeUnmount() {
        window.removeEventListener('resize', this.resize);
    }
}


</script>
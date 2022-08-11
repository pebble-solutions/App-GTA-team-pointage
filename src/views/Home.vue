<template>
	<div id="workspace-home-wrapper">
		<div id="workspace-home">
			<h1 class="text-center" v-if="activeStructure">{{activeStructure.nom_interne}}</h1>
			<div class="position-relative" v-if="birthday.length">
                <BirthdayCake />
                <div class="text-center my-2">
                    <h2 class="text-dark">Bon anniversaire !</h2>
                    <div class="text-dark lead">{{birthdayString}}</div>
                </div>
			</div>	

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

					<router-link :to="{name: 'PersonnelPresent'}" custom v-slot="{navigate, href}">
						<a :href="href" class="d-block my-2 btn btn-outline-danger" @click="navigate">
							<i class="bi bi-person-x fs-1 d-block"></i>
							<span class="fs-3">Départ</span>
						</a>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>


<script>

import {mapGetters} from 'vuex';
import centerWorkspace from '@/js/center-workspace.js';
import BirthdayCake from '../components/BirthdayCake.vue';

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
            cfg_slots: null,
            birthday: []
        };
    },
    computed: {
        ...mapGetters(["activeStructure"]),
        birthdayString() {
            let birthdayNames = [];
            this.birthday.forEach (birthday => {
                birthdayNames.push (birthday.cache_nom);
            })

            return birthdayNames.join(', ');
        }
    },
    methods: {
        /**
         * Centre verticalement les éléments de la vue
         */
        resize() {
            centerWorkspace("workspace-home");
        },
        /**
         * Récupère le personnel né le jour courrant
         */
        personnelByBirthday() {
            this.$app.apiGet("structurePersonnel/GET/getByBirthday")
            .then(data => {
                this.birthday = data;
            })
            .catch(this.$app.catchError);
        }
    },
    mounted() {
        this.cfg_slots = this.cfgSlots;
        this.cfg_slots.menu = false;
        window.addEventListener("resize", this.resize);
        this.resize();
        this.personnelByBirthday();
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.resize);
    },
    updated() {
        this.resize();
    },
    components: { BirthdayCake }
}
</script>

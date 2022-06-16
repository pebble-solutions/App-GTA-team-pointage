<template>
    <div id="workspace-wrapper-pointage">
        <div id="workspace-pointage">
            <div class="text-center py-2" v-if="personnel">
                <div v-if="personnel.clock_status == 'open'">
                    <i class="bi bi-check-circle-fill text-success" style="font-size: 150px;"></i>
                    <div class="text-success text-center">Votre pointage est ouvert. </div>
                </div>

                <h1 class="display-3">{{displayDate('date')}}</h1>

                <div class="fs-2">
                    <span class="fs-2" v-if="personnel.clock_status == 'open'" >Début : </span>
                    <span class="fs-2" v-else>Fin : </span>
            
                    <strong>{{displayDate('time')}}</strong>
                </div>

                <div  v-if="personnel.clock_status == 'over' && personnel.oStructureTempsDeclaration.gta_codages">
                    <div v-for="gtaCodage in personnel.oStructureTempsDeclaration.gta_codages" :key="'gtaCodage-' + gtaCodage.id">
                        <div class="card my-3" v-if="gtaCodage.saisie_personnel === 'OUI'">
                            <div class="card-body" >
                                <div class="text-center">
                                    <h2 class="mb-4" v-if="gtaCodage.public_label">{{gtaCodage.public_label}}</h2>
                                    <h2 class="mb-4" v-else>{{gtaCodage.nom}}</h2>
                        
                                    <button type="button" class="btn mx-2 w-25" @click="actionBtnPointage(gtaCodage, true)" :class="btnClass(gtaCodage, 'success')">
                                        <i class="bi bi-check-lg"></i>
                                    </button>
                
                                    <button type="button" class="btn mx-2 w-25" @click="actionBtnPointage(gtaCodage, false)" :class="btnClass(gtaCodage, 'danger')">
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="personnel.clock_status == 'open'" class="mt-5">
                    <router-link to="/" custom v-slot="{navigate, href}">
                        <a :href="href" @click="navigate" class="btn btn-outline-secondary">
                            <i class="bi bi-house pe-2"></i>
                            Retour
                        </a>
                    </router-link>
                </div>

                <div v-if="personnel.clock_status == 'over'" class="mb-5 p-3 fixed-bottom bg-light">
                    <button @click.prevent="validateGta()" class="btn btn-primary col-6" :disabled="!formReady || pending.validate">
                        <span v-if="pending.validate">En cours...</span>
                        <span v-else>Valider</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    inheritAttrs: false,

    props: {
        payload: Object,
        pin: String
    },

    data() {
        return {
            gtaDeclarations: [],
            pending: {
                validate: false
            }
        }
    },

    computed: {
        personnel() {
            return this.payload;
        },

        /**
         * Retourne true si le formulaire est prêt.
         * @returns {Boolean}
         */
        formReady() {
            let codages = this.personnel.oStructureTempsDeclaration.gta_codages.filter(e => e.saisie_personnel === 'OUI');
            let status = codages.length == this.gtaDeclarations.length;
            return status;
        }
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

			let workspace = document.getElementById('workspace-pointage');
			let workspaceHeight = workspace.offsetHeight;
            console.log(workspaceHeight);

			let freespace = workspaceAvailable - workspaceHeight;
			let padding = 0;
            console.log(freespace);

			if (freespace > 0) {
				padding = freespace / 2;
			}

			let workspaceWrapper = document.getElementById('workspace-wrapper-pointage');
			workspaceWrapper.style.paddingTop = padding+'px';
			workspaceWrapper.style.paddingBottom = padding+'px';
		},

        /**
         * Met à jour les informations du codage
         * 
         * @param {Object} gtaCodage Les informations concernant le codage
         * @param {Number} value La valeur à enregistrer
         */
        actionBtnPointage(gtaCodage, value){
            let declaration;

            let found = this.gtaDeclarations.find(e => e.gta__codage_id == gtaCodage.id);
            if (found) {
                declaration = found;
            }
            else {
                declaration = {
                    gta__codage_id: gtaCodage.id
                };

                this.gtaDeclarations.push(declaration);
            }

            declaration.qte = value;
        },

        /**
         * Retourne la classe à affecter à un bouton en fonction de la valeur d'une déclaration
         * @param {Object} gtaCodage Les informations du codage
         * @param {String} type Le type de bouton
         */
        btnClass(gtaCodage, type) {
            let declaration = this.gtaDeclarations.find(e => e.gta__codage_id == gtaCodage.id);
            if (!declaration) {
                return 'btn-outline-'+type;
            }

            else {
                if ((!declaration.qte && type == 'success') || (declaration.qte && type == 'danger')) {
                    return 'btn-outline-'+type;
                }
                else {
                    return 'btn-'+type;
                }
            }
        },
        
        /**
         * Permet de retourner une date dans un format specifique
         * return soit une date au format Jour de semain, num jour, mois
         * ou return une date au format Heures:minutes
         * 
         * @param {String} format 
         */
        displayDate(format) {
            let newDate;
            let dateFormat = {weekday: "long", month: "long", day: "numeric"};
            let timeFormat = {hour: '2-digit', minute: '2-digit'};
            
            switch (this.personnel.clock_status) {
                case 'open':
                    newDate = new Date(this.personnel.oStructureTempsDeclaration.dd);
                    break;

                /*** when clock_status is 'over' */
                default:
                    newDate = new Date(this.personnel.oStructureTempsDeclaration.df);
                    break;
            }

            if(format == 'date') {
                let displayDate = newDate.toLocaleDateString('fr-FR', dateFormat);
                let tmpDate = displayDate.split(' ');

                let day = tmpDate[0].charAt(0).toUpperCase() + tmpDate[0].substring(1) ;
                let month = tmpDate[2].charAt(0).toUpperCase() + tmpDate[2].substring(1) ;

                tmpDate[0] = day;
                tmpDate[2] = month;

                displayDate = tmpDate.join(' ');

                return displayDate;
            } else {
                return newDate.toLocaleTimeString('fr-FR', timeFormat);
            }
        },


        /**
         * Envoie une demande de validation du pointage
         */
        validateGta()
        {
            let declarations = JSON.stringify(this.gtaDeclarations);

            this.pending.validate = true;

            this.$app.apiPost('structurePersonnel/POST/'+this.personnel.id+'/clockByPin', {
                pin: this.pin,
                gta_declarations: declarations
            })
            .then((data) => {
                this.$emit('transfer-payload', data);
                this.$router.push({name : 'Goodbye'});
            })
            .catch(this.$app.catchError);
        }
    },

    mounted() {

		window.addEventListener('resize', this.resize);

		this.resize();
	},

    beforeUnmount() {
        window.removeEventListener('resize', this.resize);
    }
}
</script>
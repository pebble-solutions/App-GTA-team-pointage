<template>
    <div style="margin:auto;">
        <h2 class="py-4 text-center" style="font-size: 4rem;">Liste du personnel</h2>

        <div class="d-flex justify-content-start flex-wrap px-4">
            <div style="width: 25%;" v-for="personnel in personnelList" :key="'personnel-'+ personnel.id">
                <PersonnelCard :data="personnel" />
            </div>
        </div>
    </div>
</template>

<script>
import PersonnelCard from '@/components/PersonnelCard.vue'

export default {
    components: {
        PersonnelCard
    },
    data() {
        return {
            personnelList : [
                {
                    id:45,
                    picture:'@/assets/profilePict.png',
                    fullname: "Amandine DOE",
                    firstname: 'Amandine',
                    lastname: 'DOE',
                    poste: 'Serveuse',
                    dd : '08:00',
                    df : '18h30',
                    status: 1
                },
                {
                    id:18,
                    picture:'@/assets/profilePict.png',
                    fullname: "Amandine DOE2",
                    firstname: 'Amandine',
                    lastname: 'DOE2',
                    poste: 'pontgiste',
                    dd : '08:00',
                    df : null,
                    status: 1
                },
                {
                    id:69,
                    picture:'@/assets/profilePict.png',
                    fullname: "Amandine DOE3",
                    firstname: 'Amandine',
                    lastname: 'DOE3',
                    poste: 'Chef cuisto',
                    dd : null,
                    df : null,
                    ddc : '08:00:00',
                    status: 1
                },
                {
                    id:25,
                    picture:'@/assets/profilePict.png',
                    fullname: "Amandine DOE3",
                    firstname: 'Amandine',
                    lastname: 'DOE3',
                    poste: 'Chef cuisto',
                    dd : null,
                    df : null,
                    ddc : '18:00:00',
                    status: 1
                },
                {
                    id:58,
                    picture:'@/assets/profilePict.png',
                    fullname: "Sébastien HELIGON",
                    firstname: 'Amandine',
                    lastname: 'DOE3',
                    poste: 'CCO',
                    dd : null,
                    df : null,
                    status: 0
                }
            ]
        }
    }

}
</script>
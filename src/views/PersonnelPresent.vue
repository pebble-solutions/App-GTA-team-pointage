<template>
    <div style="margin:auto;">
        <h2 class="py-4 text-center" style="font-size: 4rem;">Personnel Présent</h2>

        <div class="d-flex justify-content-start flex-wrap">
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
                    id:18,
                    picture:'@/assets/profilePict.png',
                    fullname: "Amandine DOE",
                    firstname: 'Amandine',
                    lastname: 'DOE',
                    poste: 'pontgiste',
                    dd : '08:00',
                    df : null,
                    status: 1
                },
                {
                    id:56,
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
                    id:18,
                    picture:'@/assets/profilePict.png',
                    fullname: "Amandine DOE",
                    firstname: 'Amandine',
                    lastname: 'DOE',
                    poste: 'pontgiste',
                    dd : '08:00',
                    df : null,
                    status: 1
                },
                {
                    id:56,
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
                    id:18,
                    picture:'@/assets/profilePict.png',
                    fullname: "Amandine DOE",
                    firstname: 'Amandine',
                    lastname: 'DOE',
                    poste: 'pontgiste',
                    dd : '08:00',
                    df : null,
                    status: 1
                },
            ]
        }
    }

}
</script>
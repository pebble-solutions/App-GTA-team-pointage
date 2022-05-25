<template>
    <div class="card mb-3 mx-4 shadow"
        style="font-size:2rem;"
        :class="{
            'border-success': data.dd && data.df,
            'border-warning': data.dd && !data.df,
            'border-primary': !data.dd && !late && data.status,
            'border-danger': late,
            'border-secondary': !data.status
        }">
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex">
                <img class="w-25 rounded-circle border border-dark" src="@/assets/profilePict.png" alt="profile picture"/>
                <b-avatar variant="info" src="https://placekitten.com/300/300"></b-avatar>
                <div class="d-flex flex-column ps-4 pt-2">
                    <h3>{{data.fullname}}</h3>
                    <p class="m-0">{{data.poste}}</p>
                </div>
            </li>

            <li class="list-group-item text-center border-top"
                :class="{
                    'border-success': data.dd && data.df,
                    'border-warning': data.dd && !data.df,
                    'border-primary': !data.dd && !late && data.status,
                    'border-danger': late,
                    'border-secondary': !data.status
                }" 
                :style="backgroundColorStyle()">
                <span>
                    {{data.dd}} 
                
                    <i class="bi bi-chevron-compact-right" v-if="data.df || data.dd && !data.df"></i> 
                    <span v-else-if="!data.dd && !data.df && !data.status">En Repos</span>
                    <span v-else-if="!data.dd && !data.df && data.status && late" >En Retard</span>
                    <span v-else>-</span>

                    <span class="ps-1" v-if="data.dd && !data.df">En Cours</span>
                    {{data.df}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
        data: Object
    },
    data() {
        return {
            timeNow : null,
            late : false,
        }
    },
    methods: {
        /**
         * retourn une liste de style en fonction des date de début et fin
         */
        backgroundColorStyle() {
            let styleList = '';

            if(this.data.status == 0) {
                styleList += ' background-color: #ebebeb;';
            } else {
                if(this.data.dd && this.data.df){
                    styleList += ' background-color: #cdf6d7;';
                } else if(this.data.dd && !this.data.df) {
                    styleList += ' background-color: #f8ed82;';
                } else {
                    if(!this.data.dd && this.data.ddc > this.timeNow && this.data.status) {
                        styleList += ' background-color : #ff5376;';
                        this.late = true;
                    } else {
                        styleList += ' background-color : #c7f8ff;';
                    }
                }


            }


            return styleList;
        }
    },
    beforeMount() {
        let dateNow = new Date();
        this.timeNow = dateNow.toLocaleTimeString();
    }
}
</script>

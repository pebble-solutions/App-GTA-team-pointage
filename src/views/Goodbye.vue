<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <i class="bi bi-check-circle-fill text-success" style="font-size: 200px;"></i>

        <div class="text-center">
            <h2 class="display-3">Bonne Journée</h2>
            
            <router-link to="/" custom v-slot="{navigate, href}">
                <a :href="href" class="btn btn-outline-secondary" @click="navigate">Retour</a>
            </router-link>
        </div>
    </div>
</template>
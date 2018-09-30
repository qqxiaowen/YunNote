<template>
    <div class="Layout">
        <Header></Header>
        <div class="w1170 content">
            <router-view/>

        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    export default {
        components:{
            Header
        }
        
    }
</script>

<style scoped>

</style>
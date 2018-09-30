<template>
    <div class="bigbox">
        <div class="letf_box fll">   
            <Banner></Banner>
            <Notelist></Notelist>
        </div>
        <div class=" flr">
            <Userlogin></Userlogin>
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/Banner'
    import Notelist from '@/components/Notelist'
    import Userlogin from '@/components/Userlogin'
    export default {
        components:{
            Banner,
            Notelist,
            Userlogin
        }
        
    }
</script>

<style scoped>
.bigbox{
    margin-top: 50px;
}
.letf_box{
    width: 720px;
}
</style>
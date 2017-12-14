<template>
    <div id="app">
        <elderHomeHeader></elderHomeHeader>
        <elderHomeFullpage></elderHomeFullpage>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import elderHomeHeader from './components/elderHome_header.vue'
import elderHomeFullpage from './components/elderHome_fullpage.vue'
        //  :style="{
        //     height: viewHeight + 'px',
        // }"
export default {
    name: 'app',
    components: {
        elderHomeHeader,
        elderHomeFullpage,
    },
    data () {
        return{
            viewHeight: 0,
        }
    },
    computed: {
        ...mapGetters([
          'platform',
          'quizIndex',
          'webTitle'
        ]),
    },
    methods: {
        ...mapActions([
            'detectDevice',
            'getWebTitle'
        ]),  
    },
    created() {
        // this.viewHeight = window.innerHeight - 4
        this.detectDevice()
        this.getWebTitle()
    },
    mounted() {
        console.log(this.platform)
        console.log(this.webTitle)
    },
    updated() {

    }
};

</script>
<style lang="scss" scoped>
#app{
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
}
</style>

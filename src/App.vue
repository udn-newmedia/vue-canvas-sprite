<template>
    <div id="app"
         :style="{
            height: viewHeight + 'px',
        }">
        <elderHomeHeader></elderHomeHeader>
        <elderHomeFullpage></elderHomeFullpage>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import elderHomeHeader from './components/elderHome_header.vue'
import elderHomeFullpage from './components/elderHome_fullpage.vue'

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
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            this.viewHeight = window.innerHeight - 4
        } else {
            this.viewHeight = window.innerHeight
        }
        this.detectDevice()
        this.getWebTitle()        
    },
    mounted() {
        window.addEventListener('resize', ()=> {
            if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                this.viewHeight = window.innerHeight - 4
            } else {
                this.viewHeight = window.innerHeight
            }
        })
    },
};

</script>
<style lang="scss">
#app{
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    transition: height .6s linear;
}
</style>

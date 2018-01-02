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
import _throttle from 'lodash.throttle'
// import $ from 'jquery'
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
        resizeHeight: _throttle(function() {
            let vh = window.innerHeight
            if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                this.viewHeight = vh - 4
            } else {
                this.viewHeight = vh
            }
            console.log('this work')
        }, 16, {leading: true, trailing: false}),
    },
    created() {
        this.detectDevice()
        this.getWebTitle()        
    },
    mounted() {
        this.resizeHeight()
        this.$nextTick(function(){
            window.addEventListener('resize', this.resizeHeight)
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
}
</style>

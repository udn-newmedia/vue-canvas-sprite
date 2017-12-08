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
        ]),
    },
    methods: {
        ...mapActions([
            'detectDevice',
        ]),  
    },
    created() {
        this.viewHeight = window.innerHeight
        this.detectDevice()
    },
    mounted() {
        console.log(this.platform)
    },
    updated() {

    }
};

</script>
<style lang="scss" scoped>
#app{
    width: 100%;
    position: relative;
    overflow: hidden;
}
</style>

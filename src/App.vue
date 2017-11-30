<template>
    <div id="app">
        <elderHomeHeader></elderHomeHeader>
        <elderHomeFullpage></elderHomeFullpage>
    </div>
</template>
<script>
// import { Indicator, ContentContainer, Quote, Editor, Relate, FBComment, Share, Logo, Foot } from 'udn-newmedia-vue-components';
// import HeadBar from './components/Header.vue'
// import FullPage from './components/fullpage.vue'
// import test from './components/test.vue'
import elderHomeHeader from './components/elderHome_header.vue'
import elderHomeFullpage from './components/elderHome_fullpage.vue'
// import Utils from 'udn-newmedia-utils'

export default {
    name: 'app',
    components: {
        elderHomeHeader,
        elderHomeFullpage,
    },
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

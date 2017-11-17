<template>
    <div id="app">
        <elderHome_header></elderHome_header>
        <elderHome_fullpage></elderHome_fullpage>
    </div>
</template>
<script>
import { Indicator, ContentContainer, Quote, Editor, Relate, FBComment, Share, Logo, Foot } from 'udn-newmedia-vue-components';
import HeadBar from './components/Header.vue'
import FullPage from './components/fullpage.vue'
import test from './components/test.vue'
import elderHome_header from './components/elderHome_header.vue'
import elderHome_fullpage from './components/elderHome_fullpage.vue'

export default {
    name: 'app',
    components: {
        Indicator,
        ContentContainer,
        Quote,
        Editor,
        Relate,
        FBComment,
        Share,
        Logo,
        Foot,
        HeadBar,
        FullPage,
        test,
        elderHome_header,
        elderHome_fullpage,
    }
};

</script>
<style lang="scss" scoped>
// #app {
//     padding-top: 50px;
// }
// @media screen and (max-width: 1024px) {
//     #app {
//         padding-top: 46px;
//     }
// }

</style>

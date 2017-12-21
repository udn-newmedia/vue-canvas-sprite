<template>
    <div class="logo-block" style="margin-left: 0;">
        <div class="logo">
            <a href="https://shopping.udn.com/mall/Cc1a00.do?gclid=EAIaIQobChMIkIyox42a2AIVih0rCh3etwCLEAAYASAAEgLkr_D_BwE&gclsrc=aw.ds" target="_blank"><img :src="imgUdnShopping" alt="udn買東西" title="udn買東西"></a>
        </div>
        <div class="logo">
            <a href="https://udn.com/upf/newmedia/udn_newmedia/" target="_blank"><img src="https://udn.com/upf/newmedia/image/nmd-logo.svg" title="新媒體中心"></a>
        </div>
    </div>
</template>

<script>
import imgUdnShopping from '../assets/stage/udnshopping_logo.jpg';
export default {
    name: 'logo',
    data () {
        return{
            imgUdnShopping : imgUdnShopping,
        }
    },

}
</script>

<style scoped>
    .logo{
        width: 140px;
        display: inline-block;
    }
    @media screen and (max-width: 1024px){
        .logo-block{
            margin-top: 32px;
        }
    }
    @media screen and (min-width: 1025px){
        .logo-block{
            float: right;
            margin-top: -45px;
        }
    }
</style>
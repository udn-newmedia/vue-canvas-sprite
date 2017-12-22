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
import imgUdnShopping from '../assets/stage/udnshopping_logo.png';
export default {
    name: 'logo',
    data () {
        return{
            imgUdnShopping : imgUdnShopping,
        }
    },
}
</script>

<style lang="scss" scoped>
    .logo-block{
        display: flex; 
        align-items: center;
        justify-content: center;
        float: none;
    }
    .logo{
        width: 140px;
        display: block;
        margin-left: auto;
        opacity: 1;
    }
    @media screen and (max-width: 1024px){
        .logo-block{
            margin-top: 0;
        }
        .logo{
            width: 120px;
            margin-left: 15px;
        }        
    }
    @media screen and (min-width: 1025px){
        .logo-block{
            margin-top: 0;
        }
        .logo{
            width: 120px;
            margin-left: 15px;
        }
    }
</style>
<template>
    <div class="logo-block" style="margin-left: 0;">
        <div class="logo">
            <a href="https://shopping.udn.com/mall/Cc1a00.do?gclid=EAIaIQobChMIkIyox42a2AIVih0rCh3etwCLEAAYASAAEgLkr_D_BwE&gclsrc=aw.ds" target="_blank"><img :src="imgUdnShopping" alt="udn買東西" title="udn買東西"></a>
        </div>
        <div class="logo ulab">
            <a href="https://udn.com/upf/newmedia/udn_newmedia/" target="_blank"><img :src="imgUnionMedia" title="融媒體發展部" alt="融媒體發展部"></a>
        </div>
    </div>
</template>

<script>
import imgUdnShopping from '../assets/stage/udnshopping_logo.png';
import imgUnionMedia from '../assets/stage/Ulab.png'
export default {
    name: 'logo',
    data () {
        return{
            imgUdnShopping: imgUdnShopping,
            imgUnionMedia: imgUnionMedia
        }
    },
}
</script>

<style lang="scss" scoped>
    .logo-block{
        display: flex; 
        align-items: center;
        justify-content: space-around;
        float: none;
    }
    .logo{
        display: block;
        margin: 0;
        opacity: 1;
        img{
            display: block;
            height: 35px;
            width: auto;
        }
    }
    .ulab{
        img{
            display: block;
            height: 22px;
            width: auto;
        }   
    }
    @media screen and (max-width: 1024px){
        .logo-block{
            margin-top: 0;
        }
        .logo{
            margin: 0 6px;
        }
    }
    @media screen and (min-width: 1025px){
        .logo-block{
            margin-top: 0;
        }
        .logo{
            margin: 0 6px;
        }        
    }
</style>
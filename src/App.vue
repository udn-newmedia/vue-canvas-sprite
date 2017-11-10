<template>
    <div id="app">
        <Indicator />
        <HeadBar BgColor="">
            <div class="hbutton">第一分頁</div>
            <div class="hbutton">第二分頁</div>
        </HeadBar>
        <FullPage></FullPage>
        <ContentContainer>
            <Share href="https://udn.com/upf/newmedia/index.html" />
            <Logo/>
            <Editor>
                <div>製作人、文字：連珮宇、蔡佩蓉</div>
                <div>插畫動態：黃微庭、許藹雯</div>
                <div>視覺設計、攝影：許瑋琳</div>
                <div>網頁製作：廖克樸、方泰鈞</div>
                <div>監製：蔡幸怡、董谷音</div>
                <div>2017.11.03</div>
            </Editor>
            <Relate title="延伸閱讀">
                <a slot="relate-1" href="http://p.udn.com.tw/upf/newmedia/2017_data/20170303_3dmedia/index.html" target="_blank">
                <img src="https://udn.com/upf/newmedia/2017_data/20170508_marketing/image/3Dmodel.jpg">
                <p>3D模型新聞應用 簡易入門分享</p>
            </a>
                <a slot="relate-2" href="http://p.udn.com.tw/upf/newmedia/2017_data/20170222_maps/index.html" target="_blank">
                <img src="https://udn.com/upf/newmedia/2017_data/20170508_marketing/image/maps.jpg">
                <p>新聞✖地圖✖資訊 新媒體菜鳥的QGIS心得</p>
            </a>
                <a slot="relate-3" href="http://p.udn.com.tw/upf/newmedia/2017_data/20170208_vrarmr2/index.html" target="_blank">
                <img src="https://udn.com/upf/newmedia/2017_data/20170508_marketing/image/vr.jpg">
                <p>實境科技發展 給媒體的未來啟示</p>
            </a>
                <a slot="relate-4" href="https://www.facebook.com/groups/UDNNEWMEDIA/?fref=ts" target="_blank">
                <img src="https://udn.com/upf/newmedia/2017_data/20170508_marketing/image/salon.jpg">
                <p>聯。沙龍</p>
            </a>
            </Relate>
            <p>
                <br/>
            </p>
            <FBComment href="https://udn.com/upf/newmedia/index.html" />
        </ContentContainer>
        <Foot/>
    </div>
</template>
<script>
import { Indicator, ContentContainer, Quote, Editor, Relate, FBComment, Share, Logo, Foot } from 'udn-newmedia-vue-components';
import HeadBar from './components/Header.vue'
import FullPage from './components/fullpage.vue'

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

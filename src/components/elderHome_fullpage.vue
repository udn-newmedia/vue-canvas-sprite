<template>
	<main id="scrollPage"
		 :style="{
					backgroundColor: startBgc,
					// backgroundImage: 'url('+ imgSrc.gradLine +')',
				}">
		<div class="grandma"
			 :class="{stageTrans: stageTrans}"
			 :style="{left: landing.grandma + '%',zIndex: isLast}">
			<img :src="imgSrc.grandma" alt="奶奶">
		</div>
		<div class="herDog"
			 v-if="dogIn"
			 :class="{dogRush: dogRush, dogChase: dogChase, stageTrans: stageTrans}"
			 :style="{left: landing.herDog + '%',zIndex: isLast}">
			<img :src="imgSrc.dog" alt="狗">
		</div>						
		<div class="scrollContainer"
			 :style="{ 
			 			transition: scrollSpeed +'s linear',
			 		    transform: 'translateX('+ quizIndex * -100 + '%)',
			 		}">					 		
			<div id="scane"
				 @scroll.passive="showScrollLeft"
				 @wheel.passive="handleMouseWheel"
				 @mousewheel.passive="handleMouseWheel"
				 @DOMMouseScroll.passive="handleMouseWheel">
				<div class="banner">
					<div class="titleBox">
						<h1>讓家<br/>準備好與你一起變老</h1>
						<p>過年前，為老爸老媽打造更安全的「大人宅」</p>
						<p class="toNext" style="margin-right: 15px;margin-left: auto;" @click.once="handleIntroArrow" :style="{opacity: arrowOpacity}">
							<svg fill="#000000" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
							    <path d="M8 5v14l11-7z"/>
							    <path d="M0 0h24v24H0z" fill="none"/>
							</svg>
						</p>			
					</div>
					<div class="chair" :style="{backgroundImage: 'url('+ imgSrc.opening +')'}"></div>					
				</div>
				<div class="horizen" style="position: fixed;width: 100%;">
					<img :src="imgSrc.horizen1">
				</div>
				<div class="abstract">
					<p :style="{opacity: showIntro}">
						國健署統計，每年「三個老人一個跌」，
						輕則受傷恐懼、畫地限縮活動空間，加速退化；重則失能，要人照顧一輩子。
						打造適合高齡居住的「大人宅」，成迎接高齡社會關鍵。
						<br/>
						但家中的潛在危險，究竟藏在哪？
					</p>
					<div class="forShare"
						 :style="{opacity: showIntro}">
						<Share href="./index.html"/>
					</div>
					<div id="start" @click="startGame">
						<span>開始遊戲</span>
						<span class='arrow'>
							<svg fill="#000000" height="30" width="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							    <path d="M8 5v14l11-7z"/>
							    <path d="M0 0h24v24H0z" fill="none"/>
							</svg>							
						</span>
					</div>					
				</div>	
			</div>
			<div class="quizSection"
				 v-for="(quiz, index) in quizs">
				<div class="question">
					<h5 class="sug"><span>{{quiz.sug}}</span></h5>
					<h2>{{quiz.question.ask}}</h2>
					<div class="optionBlock">
						<p class="optionA"
						   @click="choseA(index)">
						    {{quiz.question.optionA}}
						</p>
						<p class="optionB"
						   @click="choseB(index)">
						    {{quiz.question.optionB}}
						</p>						
						<span class="hint">選一個答案以進入下一頁</span>
					</div>
					<div class="stage" :class="quiz.name"
						 :style="{backgroundImage: 'url('+ quiz.background +')'}">
						<img v-for="(img, index) in quiz.img" 
							 :class="img.class" :src="img.src"
							 :alt="img.alt" :title="img.title"
							 :style="{display: quiz.display}">
					</div>
					<div class="horizen">
						<img :src="quiz.question.horizen">
					</div>					
				</div>
				<div class="answer">
					<div class="answerPage" :style="{display: quiz.answer.display}">
						<h2 v-if="quiz.answer.showA">{{quiz.answer.answerA}}</h2>
						<h2 v-else>{{quiz.answer.answerB}}</h2>
						<p class="answer_article">{{quiz.answer.anay1}}</p>
						<p class="answer_article">{{quiz.answer.anay2}}</p>
						<div class="directionBox">
							<p class="toNext" @click="toNext(index)">
								<svg fill="#000000" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
								    <path d="M8 5v14l11-7z"/>
								    <path d="M0 0h24v24H0z" fill="none"/>
								</svg>								
							</p>
						</div>
					</div>	
					<div class="horizen">
						<img :src="quiz.answer.horizen">
					</div>					
				</div>							
			</div>
			<div class="quizCount"
				 v-if="showStep"
				 :style="{transform: 'translateX(' + quizIndex * 100 + '%)'}">
				 <p class="toPrev" @click="prevQuiz(quizIndex)" v-if="countQuiz"><img :src="imgSrc.dArrow" alt="上一頁"> 上一頁</p>
				<span v-if="countQuiz"
					  v-for="(navi, index) in quizs" 
					  :class="{answered: navi.answered, answering: navi.answering}">
				</span>
			</div>
			<elderHomeDemand></elderHomeDemand>
		</div>
	</main>
</template>
<script>

import _debounce from 'lodash.debounce'
import _delay from 'lodash.delay'

import { mapGetters, mapActions } from 'vuex'
import Share from '../components/Share.vue';
import Logo from '../components/Logo.vue'
import elderHomeDemand from '../components/elderHome_demand.vue'

import horizen1 from '../assets/stage/horizen/1-2.png'
import horizen3 from '../assets/stage/horizen/3.png'
import horizen4 from '../assets/stage/horizen/4.png'
import horizen6 from '../assets/stage/horizen/6.png'
import horizen7 from '../assets/stage/horizen/7.png'
import horizen8 from '../assets/stage/horizen/8.png'
import horizen9 from '../assets/stage/horizen/9.png'
import horizen10 from '../assets/stage/horizen/10.png'
import horizen11 from '../assets/stage/horizen/11.png'
import imgGrandma from '../assets/stage/grandma.gif'
import imgOpening from '../assets/stage/opening.gif'
import imgDog from '../assets/stage/dog.gif'
// import imgRightArrow from '../assets/stage/rightArrow.png'
// import imgLeftArrow from '../assets/stage/leftArrow.png'
import dArrow from '../assets/dArrow.svg'

import roomBg from '../assets/stage/room/roomBg.png'
import bed from '../assets/stage/room/bed.png'
import handsup from '../assets/stage/room/handsup.png'
import lamp from'../assets/stage/room/lamp.png'
import locker from'../assets/stage/room/locker.gif'
import slipper from'../assets/stage/room/slipper.png'
import weighter from'../assets/stage/room/weighter.png'

import mealBg from '../assets/stage/meal/mealBg.png'
import earBowl from '../assets/stage/meal/earBowl.png'
import fork from '../assets/stage/meal/fork.png'
import iceBox from '../assets/stage/meal/iceBox.png'
import rag from '../assets/stage/meal/rag.png'
import spoon from '../assets/stage/meal/spoon.png'
import pot from '../assets/stage/meal/pot.png'
import vega from '../assets/stage/meal/vega.png'
import toma1 from '../assets/stage/meal/toma1.png'
import toma2 from '../assets/stage/meal/toma2.png'

import outDoorBg from '../assets/stage/outDoor/outDoorBg.png'
import bus from '../assets/stage/outDoor/bus.png'
import cart from '../assets/stage/outDoor/cart.png'
import crutch from '../assets/stage/outDoor/crutch.png'
import signal from '../assets/stage/outDoor/signal.png'
import parkChair from '../assets/stage/outDoor/parkChair.gif'

import bathBg from '../assets/stage/bathroom/bathBg.png'
import wash from '../assets/stage/bathroom/wash.png'
import tub from '../assets/stage/bathroom/tub.png'
import toothBrush from '../assets/stage/bathroom/toothBrush.png'
import tessiue from '../assets/stage/bathroom/tessiue.png'
import bubble from '../assets/stage/bathroom/bubble.png'
import bathChair from '../assets/stage/bathroom/bathChair.png'
// import gradLine from '../assets/stage/p3.png'

export default {
	name: 'elderHome_fullpage',
	components: {
		Share,
		elderHomeDemand,
		Logo,
	},
	data: function() {
		return {
			stageTrans: false,
			imgSrc: {
				grandma: imgGrandma,
				dog: imgDog,
				opening: imgOpening,
				// gradLine: gradLine,
				horizen1: horizen1,
				dArrow: dArrow
				// rightArrow : imgRightArrow,
				// leftArrow: imgLeftArrow
			},
			watchScrollLeft: 0,
			startBgc: '#fff',
			scrollSpeed: .8,
			countQuiz: false,
			showStep: true,
			showIntro: 0,
			abstractX: 100,
			isLast: 40,
			arrowOpacity: 1,
			canScroll: false,
			landing:{
				grandma: -45,
				herDog: -50,
			},
			dogRush: false,
			dogChase: false,
			dogIn: true,
			quizs: [
				{
					"name": 'room',
					"sug": "大人臥房注意事項...",
					"display": "none",
					"background": roomBg,
					"answered": false,
					"answering": false,
					"question": {
						"ask": "早安！經過一夜好眠，開啟新的一天，我要···",
						"optionA": "一張開眼就跳下床，展現活力！",
						"optionB": "賴床一下好了",
						"horizen": horizen3,
					},
					"answer": {
						"display": 'none',
						"showA": true,
						"answerA": '這樣不行啦！',
						"answerB": '沒錯！',
						"horizen": horizen4,
						"anay1": '八里療養院職能治療科主任張自強叮嚀，早晨是心腦血管疾病高發時段，且入冬後，身體離開被窩接觸到外面空氣，冷熱溫差更大，長輩們應格外當心。',
						"anay2": '張自強建議，每日醒來後，雙手各握拳、放開10下，腳趾與膝蓋也彎曲、伸直10下，讓四肢暖和後，再起身坐好、坐穩，才扶著床櫃等，可支撐的輔助物下床。',
					},
					'img': [
						{
							"class": "bed",
							"src": bed,
							"alt": '床',
							"title": null,
						},
						{	
							"class": "handsup",
							"src": handsup,
							"alt": '起身輔助拉環',
							"title": "起身輔助拉環",
						},
						{
							"class": "lamp",
							"src": lamp,
							"alt": '檯燈',
							"title": null,
						},
						{
							"class": "locker",
							"src": locker,
							"alt": '櫃子',
							"title": null,
						},
						{
							"class": "slipper",
							"src": slipper,
							"alt": '拖鞋',
							"title": null,
						},
						{
							"class": "weighter",
							"src": weighter,
							"alt": '體脂計',
							"title": "體脂計",
						},							
					],					
				},
				{
					"name": "meal",
					"sug": "大人用餐注意事項...",
					"display": "none",
					"background": mealBg,
					"answered": false,
					"answering": false,
					"question": {
							"ask": "午餐時間，該吃什麼好呢？",
							"optionA": "年紀大了，粗茶淡飯，清淡最好",
							"optionB": "食量小，更要重視營養攝取夠不夠",
							"horizen": horizen6,
						},
					"answer": {
						"display": 'none',
						"showA": true,
						"answerA": '觀念過時啦！',
						"answerB": '正確！',
						"horizen": horizen7,
						"anay1": '別再只吃白飯配湯！營養師王郁琁表示，粗茶淡飯，容易造成營養不良，反而會加速老化。若家中長輩食量變小，則建議少量多餐，補足身體所需營養。',
						"anay2": '此外，與其奉行少鹽少油，她更建議活用天然食物的特性調味，增加食慾，例如九層塔、番茄、香菇等，並依烹調方式，選用新鮮未經精煉的好油。',
					},
					'img': [		
						{
							"class": "earBowl",
							"src": earBowl,
							"alt": '手柄湯碗',
							"title": '手柄湯碗',
						},
						{	
							"class": "fork",
							"src": fork,
							"alt": '可彎矽膠餐具',
							"title": "可彎矽膠餐具",
						},
						{
							"class": "iceBox",
							"src": iceBox,
							"alt": '冰箱',
							"title": null,
						},
						{
							"class": "rag",
							"src": rag,
							"alt": '抹布',
							"title": null,
						},
						{
							"class": "spoon",
							"src": spoon,
							"alt": '可彎矽膠餐具',
							"title": "可彎矽膠餐具",
						},
						{
							"class": "pot",
							"src": pot,
							"alt": '鍋子',
							"title": null,
						},
						{
							"class": "vega",
							"src": vega,
							"alt": '蔬菜',
							"title": null,
						},
						{
							"class": "toma1",
							"src": toma1,
							"alt": '番茄',
							"title": null,
						},
						{
							"class": "toma2",
							"src": toma2,
							"alt": '番茄',
							"title": null,
						},																									
					],					
				},
				{
					"name": "outDoor",
					"sug": "大人運動注意事項...",
					"display": "none",
					"background": outDoorBg,
					"answered": false,
					"answering": false,
					"question": {
							"ask": "清爽的午後，來活動一下筋骨好了！",
							"optionA": "努力維持運動習慣，保持活力！",
							"optionB": "好懶得動，在家還比較安全",
							"horizen": horizen8,
						},
					"answer": {
						"display": 'none',
						"showA": true,
						"answerA": '給你一百個讚！',
						"answerB": '不行啦！',
						"horizen": horizen9,
						"anay1": '物理治療師彭品維表示，對抗老化，關鍵仍在維持運動習慣。除最簡單的快走，也推薦游泳，就算只是泡在水裡行走，水壓可助血液跟淋巴循環、浮力助減緩關節載重，是很適合長者的運動。',
						"anay2": '八里療養院職能治療科主任張自強也補充，長輩外出建議穿鮮艷、螢光色系衣物，也建議使用助行輔具，老人家若抗拒，則可考慮拐杖傘，或平地用登山杖等，形象較正面、健康的輔具。',
					},
					'img' :[
						{
							"class": "bus",
							"src": bus,
							"alt": '公車',
							"title": null,
						},
						{
							"class": "cart",
							"src": cart,
							"alt": '助行購物推車',
							"title": '助行購物推車',
						},
						{
							"class": "crutch",
							"src": crutch,
							"alt": '手杖',
							"title": '手杖',
						},
						{
							"class": "signal",
							"src": signal,
							"alt": '紅綠燈',
							"title": null,
						},
						{
							"class": "parkChair",
							"src": parkChair,
							"alt": '公園椅',
							"title": null,
						},						
					]
				},
				{
					"name": "bathroom",
					"sug": "大人浴廁注意事項...",
					"display": "none",
					"background": bathBg,
					"answered": false,
					"answering": false,
					"question": {
							"ask": "洗個熱呼呼的熱水澡，但浴室老是濕濕滑滑的···",
							"optionA": "我身體勇健，不需要身心障礙扶手",
							"optionB": "扶手要裝！還要選最亮色！",
							"horizen": horizen10,
						},
					"answer": {
						"display": 'none',
						"showA": true,
						"answerA": '不是這樣的！',
						"answerB": '沒錯！',
						"horizen": horizen11,
						"anay1": '張自強表示，無論長輩是不是身心障礙者，都建議在浴廁安裝身心障礙扶手，尤其馬桶側邊，與淋浴空間如浴缸等，設施與牆面對比色盡量明顯，以確保長輩在視覺能力較差的狀況下，仍能有效的在危急時刻抓到扶手。',
						"anay2": '物理治療師彭品維也建議，除了扶手，最好也在所有水會噴濺到的地面、浴缸底部都貼上止滑墊。',
					},
					'img': [
						{
							"class": "wash",
							"src": wash,
							"alt": '起身支撐扶手',
							"title": "起身支撐扶手",
						},
						{	
							"class": "tub",
							"src": tub,
							"alt": '浴缸',
							"title": null,
						},
						{
							"class": "toothBrush",
							"src": toothBrush,
							"alt": '牙刷',
							"title": null,
						},
						{
							"class": "tessiue",
							"src": tessiue,
							"alt": '衛生紙',
							"title": null,
						},
						{
							"class": "bubble",
							"src": bubble,
							"alt": '泡泡',
							"title": null,
						},
						{
							"class": "bathChair",
							"src": bathChair,
							"alt": '收納式淋浴椅',
							"title": "收納式淋浴椅",
						},							
					],					
				},																						
			],
		};
	},
  	computed: {
		...mapGetters([
	  	  'quizIndex',
	  	  'platform',
	  	  'headerBgc',
	  	  'webTitle'
	  	]),
  	},
  	watch: {
  		watchScrollLeft() {
  			this.watchScrollLeft === window.innerWidth ? 
  				_delay(() => {this.canScroll = true}, 600) : (this.canScroll = false)
  		}
  	},
	methods: {
		...mapActions([
			'handle_quizIndex',
			'handle_dequizIndex',
			'handle_lookDemand',
			'handle_headerBgc'
		]),
		showScrollLeft: function(e) {
			const scrollTarget = document.getElementById('scane')
			const scrollW = scrollTarget.clientWidth - scrollTarget.scrollLeft
			this.watchScrollLeft = scrollTarget.scrollLeft
			this.arrowOpacity = 0
			if(scrollTarget.scrollLeft > scrollW * 5){
				this.showIntro = 1
				this.abstractX = 0
				this.startBgc = '#fffabf'
			} else {
				this.showIntro = 0
				this.abstractX = 100
				this.startBgc = '#fff'				
			}
		},
		prevQuiz: _debounce(function(index) {
			if(this.quizIndex !== 0){
				this.handle_dequizIndex()	
			}
	        ga("send", {
	            "hitType": "event",
	            "eventCategory": "button", 
	            "eventAction": "返回上一頁",	 
	            "eventLabel": "[" + this.platform + "]["+ this.webTitle +"][返回上一頁]"
	        });			
			switch(index){
				case 1:
					_delay(() => {
						this.startBgc = '#fffabf'
					}, 400)
					_delay(() => {
						this.quizs[0].display = 'none'
					}, 800)			
					break;
				case 2:
					this.quizs[0].display = 'block'
					_delay(() => {
						this.quizs[0].answer.display = 'none'
					}, 800)					
					break;
				case 3:
					this.quizs[0].answered = false
					this.quizs[0].answering = true
					this.quizs[1].answering = false
					this.quizs[0].answer.display = 'none'
					_delay(() => {
						this.quizs[1].display = 'none'
					}, 800)			
					break;
				case 4:
					this.quizs[1].display = 'block'
					_delay(() => {
						this.quizs[1].answer.display = 'none'
					}, 800)										
					this.dogIn = true
					this.dogRush = false
					this.dogChase = false					
					break;
				case 5:
					this.quizs[1].answered = false
					this.quizs[1].answering = true
					this.quizs[2].answering = false	
					this.quizs[1].answer.display = 'none'
					_delay(() => {
						this.quizs[2].display = 'none'
					}, 800)					
					break;
				case 6:
					this.quizs[2].display = 'block'
					_delay(() => {
						this.quizs[2].answer.display = 'none'
					}, 800)										
					this.dogIn = false
					break;
				case 7:
					this.quizs[2].answered = false
					this.quizs[2].answering = true
					this.quizs[2].answer.display = 'none'
					this.quizs[3].answering = false	
					_delay(() => {
						this.quizs[3].display = 'none'
					}, 800)					
					break;
				case 8:
					this.quizs[3].display = 'block'
					_delay(() => {
						this.quizs[3].answer.display = 'none'
					}, 800)										
					break;
			}
		}, 800, {leading: true, trailing: false}),
		nextQuiz: _debounce(function(index) {
			this.countQuiz = true
			this.stageTrans = true
			this.handle_quizIndex()
			if(this.quizIndex < this.quizs.length*2 +1){
				this.quizs[index].answering = true
				this.quizs[index].display = 'block'
				if(index > 0) {
					this.quizs[index-1].answered = true
					this.quizs[index-1].answering = false
				}
			} else if(this.quizIndex === this.quizs.length*2 +1) {
				this.scrollSpeed = 1.5	
				this.landing.herDog = 100
				this.handle_headerBgc()
			} else {
				this.handle_lookDemand()
			}
		}, 800, {leading:true, trailing:false}),
		startGame: _debounce(function() {
			this.nextQuiz(0)
	        ga("send", {
	            "hitType": "event",
	            "eventCategory": "button", 
	            "eventAction": "點擊開始遊戲",	 
	            "eventLabel": "[" + this.platform + "]["+ this.webTitle +"][點擊開始遊戲]"
	        });
		}, 800, {leading:true, trailing:false}),
		toNext: _debounce(function(index) {
			this.nextQuiz(index + 1)
	        ga("send", {
	            "hitType": "event",
	            "eventCategory": "button", 
	            "eventAction": "點擊下一題按鈕",	 
	            "eventLabel": "[" + this.platform + "]["+ this.webTitle +"][點擊下一題按鈕]"
	        });			
		}, 800, {leading:true, trailing:false}),
		choseA: _debounce(function(index) {
			this.handle_quizIndex()
			this.quizs[index].answer.showA = true;
			_delay(() => {
				this.quizs[index].display = 'none'
			}, 800)
	        ga("send", {
	            "hitType": "event",
	            "eventCategory": "button", 
	            "eventAction": "選擇左邊答案",	 
	            "eventLabel": "[" + this.platform + "][" + this.webTitle + "][選擇第一個答案]"
	        });	
		}, 800, {leading:true, trailing:false}),
		choseB: _debounce(function(index) {
			this.handle_quizIndex()
			this.quizs[index].answer.showA = false;
			_delay(() => {
				this.quizs[index].display = 'none'
			}, 800)			
	        ga("send", {
	            "hitType": "event",
	            "eventCategory": "button", 
	            "eventAction": "選擇右邊答案",	 
	            "eventLabel": "[" + this.platform + "][" + this.webTitle + "][選擇第二個答案]"
	        });			
		}, 800, {leading:true, trailing:false}),
		handleMouseWheel: function(e){
			let w = window.innerWidth
			const scrollTarget = document.getElementById('scane')
			if(e.deltaY >= 1 && e.deltaX < 5){
				scrollTarget.scrollLeft += w/21		
				if(this.canScroll === true){
					this.canScroll = false
					this.nextQuiz(0)
			        ga("send", {
			            "hitType": "event",
			            "eventCategory": "wheel", 
			            "eventAction": "藉由滾輪開始遊戲",	 
			            "eventLabel": "[" + this.platform + "]["+ this.webTitle +"][藉由滾輪開始遊戲]"
			        });						
				}		
			} else if (e.deltaY <= -1 && e.deltaX < 5){
				scrollTarget.scrollLeft -= w/21
			}
		},
		handleIntroArrow(e) {
			document.getElementById('scane').scrollLeft = window.innerWidth
	        ga("send", {
	            "hitType": "event",
	            "eventCategory": "button", 
	            "eventAction": "點擊",	 
	            "eventLabel": "[" + this.platform + "]["+ this.webTitle +"][點擊主標題按鈕到底]"
	        });			
		}
	},	
	mounted() {
		_delay(() => {
			this.landing.grandma = 50
			this.landing.herDog = 50			
		}, 333)
	},
	beforeUpdate() {
		if(this.quizIndex > this.quizs.length*2){
			_delay(() => {
				this.isLast = 0	
			}, 400)
		}
		if(this.quizIndex === 4) {
			this.dogRush = true
		}
	},
	updated: function() {
		if(this.quizIndex >= this.quizs.length*2 +1){
			this.showStep = false
			this.countQuiz = false
			this.scrollSpeed = 1.5
			this.stageTrans = false
		}
		_delay(() => {
			switch(this.quizIndex){
				case 0:
					this.countQuiz = false
					break
				case 2:
					this.startBgc = '#ffe4ea'
					this.quizs[0].answer.display = 'flex'
					break;
				case 4:
					this.startBgc = '#e9fdbb'
					this.quizs[1].answer.display = 'flex'
					break;
				case 6: 
					this.startBgc = '#fffabf'
					this.quizs[2].answer.display = 'flex'
					_delay(() => {
						this.dogChase = true	
						this.dogIn = true;
					}, 700)				
					break;
				case 8:
					this.startBgc = '#cbf3ff'
					this.quizs[3].answer.display = 'flex'
					break;
				default:
					this.startBgc = '#fff'
					break;
			}				
		}, 400)		
	}
}
</script>
<style lang="scss">
#scrollPage {
	flex-shrink: 0;
	position: relative;
	z-index: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	padding-top: 50px;
	display: flex;
	transition: background-color 400ms linear;
	background-size: contain;
	.scrollContainer {
		flex-shrink: 0;
		display: flex;
		width: 100%;
		height: 100%;
		transform: translate(-100%, 0);
		transition: .8s linear;
		z-index: 30;
	}
}
.stageTrans{
	transition: left .8s linear !important;
}
.grandma{
	position: fixed;
	z-index: 48;
	bottom: 39px;
	left: -45%;
	transition: left 4.5s linear;
	width: 30%;
	margin-left: -25%;
	img{
		display: block;
	}
}
.dogRush{
	animation-name: Rush;
	animation-duration: 1500ms;
	animation-fill-mode: forwards;
	animation-timing-function: ease-in;
}
.dogChase{
	animation-name: Chase;
	animation-duration: 1500ms;
	animation-fill-mode: forwards;	
	animation-timing-function: ease-in-out;
}
@keyframes Rush {
	0%{
		transform: translate(0, 0);
	}
	100%{
		transform: translate(100vw, 0);
	}
}
@keyframes Chase {
	from{
		transform: translate(-100vw, 0);
	}
	to{
		transform: translate(0, 0);
	}
}
.herDog{
	position: fixed;
	z-index: 49;
	bottom: 39px;
	left: -50%;
	transition: left 2.5s ease-out;
	width: 30%;
	img{
		display: block;
	}
}
#introArrow{
	position: absolute;
	z-index: auto;
	top: 100%;
	right: 20px;
	animation: next .8s linear infinite;
	transition: 2s;
	width: 55px;
	height: 55px;
	border: 1px solid black;
	border-radius: 50%;
	font-size: 36px;
	text-align: right;
	cursor: pointer;
}
#scane {
	flex-shrink: 0;
	position: relative;
	display: flex;
	width: 100%;
	height: 100%;
	overflow-x: scroll;
	overflow-y: hidden;		
}
#scane::-webkit-scrollbar{
	display: none;
}
.banner{
	flex-shrink: 0;
	width: 100%;
	height: 100%;	
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
	.titleBox{
		position: relative;
		margin-top: 15%;
		z-index: 1;
		h1{
			font-weight: bold;
			text-shadow: none;
			text-align: left;
		}		
		p{
			padding: 0 30px;
			font-size: 15px;
		}
	}
	.chair{
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 60%;
		bottom: 39px;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center bottom;
		border: none;
	}
}
.abstract{
	flex-shrink: 0;
	width: 100%;
	height: 100%;		
	overflow: hidden;
	p{
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		color: black;
		padding: 0 15px;
		margin-top: 15%;
		transition: 1.2s ease-in-out;
		line-height: 1.5;
	}
}
#start{
	position: relative;
	cursor: pointer;
	width: 80px;
	height: 80px;
	border: 2px solid black;
	border-radius: 50%;
	margin-left: auto;
	margin-right: 15px;
	z-index: 60;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	span{
		position: relative;
		top: -5px;
	}
	.arrow{
		position: absolute;
		top: 50%;
		left: 50%;
		display: block;
		font-size: 30px;
		margin-left: -15px;
		margin-top: 0;
		svg{
			animation: next 1s ease-in infinite alternate;;	
		}
	}
}
@keyframes startArrow {
	from{
		transform: translate(0, 0);
	}
	to{
		transform: translate(5px ,0);
	}
}
.quizSection {
	flex-shrink: 0;
	display: flex;
	z-index: 40;
	height: 100%;
	width: 200%;
	position: relative;
}
.question {
	flex-shrink: 0;
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	padding-top: 10px;
	padding-bottom: 40px;
	h2 {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: left;
		width: 100%;
		padding: 0 15px;
		margin-top: 10px;
	}
}
.optionBlock {
	width: 100%;
	height: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 20;
	background-color: transparent;
	p {
		position: relative;
		display: flex;
		align-items: center;			
		width: 80%;
		border: 1px solid #898989;
		cursor: pointer;
		padding: 5px 10px;
		line-height: 1.5;
		border-radius: 20px;
		background-color: rgba(#fff, .8);
		transition: all .3s ease-in-out;
		transform-origin: center;
	}
	p:hover {
		background-color: rgba(#d2d2d2, .8);
	}
}
.hint{
	display: block;
	width: 100%;
	text-align: center;
	font-size: 14px;
}
.sug{
	display: flex;
	align-items: flex-end;
	justify-content: center;
	width: 100%;
	margin: 10px auto 0 auto;
	span{
		font-size: 14px;
		border-bottom: .6px solid #9fa0a0;
		text-align: center;
		// text-decoration: #9fa0a0 underline;
	}
}
.stage{
	position: relative;
	width: 100%;
	height: 60%;
	max-width: 880px;
	margin: 0 auto;
	overflow-x: hidden;
	overflow-y: visible;
	z-index: 10;
	background-color: rgba(#fff, .7);
	img{
		position: absolute;
		left: 50%;
		bottom: 0;
		animation-duration: .6s;
		animation-delay: .8s;
		animation-timing-function: linear;
		animation-fill-mode: forwards;
		visibility: hidden;
	}
}
.bathroom{
	background: transparent center no-repeat;
	background-size: contain;
	.bathChair{
		width: 30%;
		margin-left: -45%;
		margin-bottom: 10%;
		z-index: 0;
		transform: rotate(-25deg);
		animation-name: dropIn;
	}
	.bubble{
		width: 80%;
		top: 10%;
		margin-left: -40%;
		z-index: 7;
		visibility: visible;
		animation-name: scaler;
		animation-duration: 2.5s;
		animation-iteration-count: infinite;
		animation-direction: alternate-reverse;
		transform-origin: 10% 0%;
		opacity: .8;
	}
	.tessiue{
		width: 40%;
		margin-left: -30%;
		margin-bottom: 8%;
		z-index: 4;
		animation-name: grow;
		transform-origin: center bottom;
	}
	.toothBrush{
		width: 13%;
		margin-left: -15%;
		margin-bottom: 10%;
		z-index: 3;
		animation-name: dropIn;
		animation-delay: 1.2s;
	}
	.tub{
		width: 45%;
		margin-left: 0;
		margin-bottom: 10%;
		z-index: 6;
		transform: translate(300px, 0);
		animation-name: grow;
		transform-origin: center bottom;
		animation-delay: .6s;
	}	
	.wash{
		width: 55%;
		margin-left: -25%;
		margin-bottom: 10%;
		z-index: 2;
		visibility: visible;
	}
}
.outDoor{
	background: transparent center no-repeat;
	background-size: contain;
	.bus{
		width: 60%;
		z-index: 3;
		margin-left: -40%;
		margin-bottom: 15%;
		animation-name: slideTo0;
		// animation-iteration-count: infinite;
		transform: translate(-50px, 50px);
		opacity: 0;
	}
	.crutch{
		width: 17%;
		z-index: 3;
		margin-left: -35%;
		margin-bottom: 10%;
		animation-delay: .6s;
		animation-name: dropIn;		
	}
	.cart{
		width: 20%;
		margin-left: -5%;
		margin-bottom: 10%;
		z-index: 5;
		animation-name: grow;
		animation-delay: 2s;
		transform-origin: center bottom;
	}
	.parkChair{
		width: 40%;
		margin-left: 10%;
		margin-bottom: 7%;
		z-index: 10;
		visibility: visible;
	}
	.signal{
		z-index: 0;
		width: 65%;
		margin-bottom: 10%;
		margin-left: -5%;
		animation-delay: 1.4s;
		animation-name: dropIn;
	}
}
.meal{
	background: transparent center no-repeat;
	background-size: contain;
	.earBowl{
		width: 25%;
		margin-left: -15%;
		z-index: 10;
		animation-name: grow;
		animation-duration: .4s;
		animation-delay: 1.2s;
		transform-origin: 50% 100%;
		opacity: 1;
	}
	.iceBox{
		width: 40%;
		margin-left: -40%;
		z-index: 5;
		animation-name: dropIn;
	}
	.rag{
		width: 30%;
		margin-left: -50%;
		margin-bottom: 30%;
		z-index: 2;
		animation-name: fadeInRag;
		animation-delay: 1s;
	}
	.fork{
		width: 15%;
		margin-left: -10%;
		z-index: 6;
		animation-delay: .7s;
		animation-name: grow;
		transform-origin: 50% 100%;		
	}
	.spoon{
		width: 13%;
		z-index: 6;
		margin-left: 5%;
		margin-bottom: 15%;
		visibility: visible;
	}
	.pot{
		width: 25%;
		z-index: 7;
		visibility: visible;
	}
	.vega{
		z-index: 5;
		width: 60%;
		margin-left: -5%;
		margin-bottom: 5%;
		opacity: 0;
		transform: translate(50px, 0);
		animation-name: slideTo0;
	}
	.toma1{
		width: 15%;
		z-index: 10;
		margin-left: 18%;
		animation-name: rollIn;
		animation-delay: 1.6s;
	}
	.toma2{
		width: 15%;
		z-index: 9;
		margin-left: 25%;
		animation-delay: 2s;
		animation-name: rollIn;
	}
}
.room{
	background: transparent center no-repeat;
	background-size: contain;
	.bed{
		width: 60%;
		margin-left: -15%;
		z-index: 10;
		visibility: visible;
	}
	.handsup{
		width: 40%;
		margin-left: -48%;
		margin-bottom: 5%;
		z-index: 9;
		animation-duration: 1s;
		animation-name: dropIn;
	}
	.weighter{
		width: 35%;
		margin-left: -27%;
		margin-bottom: 10%;
		z-index: 8;
		visibility: visible;
	}
	.lamp{
		width: 30%;
		margin-left: -35%;
		margin-bottom: 30%;
		z-index: 5;
		opacity: 1;
		animation-name: grow;
		animation-delay: 1.2s;
		transform: rotate(-45deg);
		transform-origin: right bottom;
	}
	.locker{
		width: 40%;
		margin-left: -5%;
		margin-bottom: 10%;
		z-index: 7;
		animation-name: dropIn;
		animation-delay: 1.4s;
	}
	.slipper{
		width: 30%;
		margin-left: 25%;
		margin-bottom: 15%;
		z-index: 6;
		transform-origin: left bottom;
		animation-delay: 1.6s;
		animation-name: grow;
		opacity: 1;
	}
}
@keyframes dropIn{
  0% {
  	display: block;
    visibility: visible;
    transform:  translate(0px,-200%)  scaleX(1.00) scaleY(1.00) ;
  }
  27% {
    transform:  translate(0px,0px)  scaleX(1) scaleY(1.05) ;
  }
  39% {
  	transform:  translate(0px,-70px)  scaleX(1) scaleY(1) ;
  }
  56% {
    transform:  translate(0px,0px)  scaleX(1.00) scaleY(1) ;
  }
  76% {
    transform:  translate(0px,-10px)  scaleX(1) scaleY(1.02) ;
  }
  100% {
  	display: block;
    visibility: visible;
    transform:  translate(0px,0px)  scaleX(1.00) scaleY(1.00);
  }
}
@keyframes scaler{
	0%{
		display: block;
		visibility: visible;
		transform: scale(1) translate(10px,0) rotate(2deg);
	}
	100%{
		display: block;
		visibility: visible;
		transform: scale(1.05) translate(-10px,0) rotate(-2deg);
	}
}
@keyframes slideTo0 {
	to{
		display: block;
		visibility: visible;
		transform: translate(0, 0);	
		opacity: 1;
		display: block;
	}
}
@keyframes fadeInRag {
	from {
		display: block;
		visibility: visible;
		opacity: 0;
		transform: translate(10px, 10px);
		display: block;
	}
	to {
		display: block;
		visibility: visible;		
		opacity: 1;
		transform: translate(0, 0);
	}
}
@keyframes grow {
	0%{
		display: block;
		visibility: visible;
		transform: scale(0);
	}
	80%{
		display: block;
		visibility: visible;		
		transform: scale(1.05);
	}
	100%{
		display: block;
		visibility: visible;
		transform: scale(1);
	}
}
@keyframes rollIn {
	0%{
		display: block;
		visibility: visible;		
		transform: translate(300px, 0) rotate(360deg);
	}
	20%{
		display: block;
		visibility: visible;		
		transform: translate(240px, 0) rotate(300deg);
	}
	40%{
		display: block;
		visibility: visible;		
		transform: translate(180px, 0) rotate(240deg);
	}
	60%{
		display: block;
		visibility: visible;		
		transform: translate(120px, 0) rotate(180deg);
	}
	80%{
		display: block;
		visibility: visible;		
		transform: translate(60px, 0) rotate(90deg);
	}
	100%{
		display: block;
		visibility: visible;		
		transform: translate(0, 0) rotate(0deg);
	}
}
.horizen{
	position: absolute;
	z-index: auto;
	width: 100vw;
	height: 12px;
	bottom: 35px;
	left: 0;
	img{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}
.answer {
	position: relative;
	z-index: 0;
	flex-shrink: 0;
	width: 100vw;
	overflow: hidden;
}
.answerPage{
	position: relative;
	z-index: auto;
	display: none;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 880px;
	margin: 0 auto;
	h2 {
		padding: 0 15px;
		margin-bottom: 10px;
		animation-name: pageFadeIn;
		animation-duration:  450ms;
		animation-fill-mode: forwards;
		animation-timing-function: ease-in-out;
		animation-delay: 400ms;
		visibility: hidden;		
	}	
	p{
		animation-name: pageFadeIn;
		animation-duration:  450ms;
		animation-fill-mode: forwards;
		animation-timing-function: ease-in-out;
		animation-delay: 600ms;
		visibility: hidden;		
	}
}
@keyframes pageFadeIn {
	from{
		transform: translate(0, 50px);
		opacity: 0;
		visibility: visible;
	}
	to{
		transform: translate(0, 0);
		opacity: 1;
		visibility: visible;
	}
}
.answer_article{
	padding: 0 15px;
	line-height: 1.5;
}
.directionBox{
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: flex-end;
}
.toNext{
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	z-index: 30;
	padding: 0 !important;
	width: 50px;
	height: 50px;
	margin-right: 15px;
	cursor: pointer;
	transition: .8s;
	border: 1px solid gray;
	border-radius: 50%;
	color: black;
	font-size: 2em;
	img{

	}
	svg{
		display: block;
		height: 30px;
		width: 30px;
		animation: next 1s ease-in infinite alternate;;	
	}
}
.toPrev{
	position: absolute;
	top: 0;
	left: 0;
	height: 40px;
	margin-left: 15px;
	border: none;
	cursor: pointer;
	color: black;
	font-size: 18px;
	z-index: 30;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 1;
	transition: opacity .6s linear, color .6s linear;
	margin-bottom: 0;
	white-space: nowrap;
	&:hover{
		opacity: 1;
		color: black;
	}
	img{
		display: block;
		width: 30px;
		transform: rotatez(180deg);
	}	
}
@keyframes prev {
	from{
		transform: translate(0, 0);
	}
	to{
		transform: translate(-5px, 0);
	}
}
@keyframes next {
	from{
		fill: #000000;
	}
	to{
		fill: transparent;
	}
}
.quizCount{
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 45;
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform .8s linear;
	overflow: visible;
	span{
		width: 8px;
		height: 8px;
		background-color: black;
		border-radius: 50%;
		margin: 10px;
		opacity: .3;
		transition: .6s;
		overflow: visible;
	}
	.answered{
		opacity: 1;
	}
	.answering{
		transform: scale(1.4);
	}
}
.forShare{
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	transition: 3s;
	padding: 0 15px;
}
@media screen and (max-width: 374px){
	h2{
		font-size: 24px;
	}
	.question{
		padding-bottom: 30px;
		h2{
			margin-top: 10px;
			font-size: 24px;
		}
	}
	p{
		font-size: 16px;
	}
	.banner{
		.titleBox{
			margin-top: 10%;
			h1{
				font-size: 28px;
				line-height: 1;
			}
			p{
				font-size: 13px;
			}
		}
		p{
			font-size: 15px;
		}
		h2{
			font-size: 24px;
		}		
	}
	.optionBlock{
		p{
			width: 90%;
			white-space:nowrap;
			line-height: 1;
		}
	}
	.toPrev{
		margin-left: 5px;
		height: 25px;
		font-size: 15px;
		img{
			height: 20px;
			width: 20px;
		}
	}
	.hint{
		font-size: 12px;
	}
	.grandma{
		width: 25%;
		bottom: 30px;
	}
	.herDog{
		width: 25%;
		bottom: 30px;	
	}	
	#start{
		transform: scale(.8);
	}
	.stage {
		img{
			bottom: 0;
		}
	}
	.quizCount{
		height: 25px;
	}
	.horizen{
		bottom: 25px;
	}	
.room{
	background: transparent center no-repeat;
	background-size: contain;
	.bed{
		width: 55%;
		margin-left: -15%;
		z-index: 10;
		visibility: visible;
	}
	.handsup{
		width: 35%;
		margin-left: -48%;
		margin-bottom: 5%;
		z-index: 9;
		animation-duration: 1s;
		animation-name: dropIn;
	}
	.weighter{
		width: 30%;
		margin-left: -27%;
		margin-bottom: 10%;
		z-index: 8;
		visibility: visible;
	}
	.lamp{
		width: 25%;
		margin-left: -35%;
		margin-bottom: 30%;
		z-index: 5;
		opacity: 1;
		animation-name: grow;
		animation-delay: 1.2s;
		transform: rotate(-45deg);
		transform-origin: right bottom;
	}
	.locker{
		width: 35%;
		margin-left: -5%;
		margin-bottom: 10%;
		z-index: 7;
		animation-name: dropIn;
		animation-delay: 1.4s;
	}
	.slipper{
		width: 25%;
		margin-left: 25%;
		margin-bottom: 15%;
		z-index: 6;
		transform-origin: left bottom;
		animation-delay: 1.6s;
		animation-name: grow;
		opacity: 1;
	}
}	
}
@media screen and (min-width: 768px) and (max-width: 1023px){
	.optionBlock{
		align-items: center;
		p{
			max-width: 30%;
			max-height: 60%;
		}			
	}
	.stage{
		height: 60%;
	}
}
@media screen and (min-width: 1024px) {
	.dogChase{
		animation-duration: 2000ms;
	}
	#scrollPage{
		padding-top: 55px;
	}
	.banner{
		.titleBox{
			margin-top: 5%;
			h1{
				padding: 0;
			}
			p{
				padding: 0;
			}
		}
		.chair{
			position: absolute;
			z-index: -1;
			width: 80%;
			height: 60%;
			bottom: 59px;
			left: 10%;
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center bottom;
			border: none;
		}		
	}	
	.abstract{
		p{
			margin-top: 10%;
			margin-left: auto;
			margin-right: auto;
			width: 880px;
		}
	}
	.toPrev{
		opacity: .6;
		height: 50px;
		// color: transparent;
	}
	.answerPage{
		padding-top: 5%;
	}
	.grandma{
		bottom: 55px;
		width: 10%;
		margin-left: -15%;
	}
	.herDog{
		bottom: 55px;
		width: 10%;
	}	
	#introArrow{
		right: 0;
		font-size: 36px;
		text-align: right;
	}
	.forShare{
		width: 880px;
		margin: 0 auto;
	}
	#start{
		margin-right: calc(50% - 440px)
	}
	.question{
		padding-bottom: 55px;
		h2{
			margin-top: 20px;
		}
	}	
	.optionBlock{
		p{
			width: 45%;
			padding: 5px 15px;
		}		
	}
	.horizen{
		bottom: 50px;
	}
	.quizCount{
		height: 50px;
	}
	.stage{
		overflow: visible;
	}
	.bathroom{
		.bathChair{
			width: 23%;
			margin-left: -38%;
			margin-bottom: 5%;
		}
		.bubble{
			width: 65%;
			margin-left: -25%;
		}
		.tessiue{
			width: 40%;
			margin-left: -30%;
			margin-bottom: 0%;
		}
		.toothBrush{
			width: 10%;
			margin-left: -12%;
			margin-bottom: 2%;
		}
		.tub{
			width: 40%;
			margin-left: 0;
			margin-bottom: 0;
		}	
		.wash{
			width: 55%;
			margin-left: -25%;
			margin-bottom: 0;
		}
	}	
	.outDoor{
		.bus{
			width: 45%;
			margin-left: -35%;
			margin-bottom: 3%;
		}
		.crutch{
			width: 12%;
			margin-left: -30%;
			margin-bottom: 5%;
		}
		.cart{
			width: 20%;
			margin-left: -5%;
			margin-bottom: 0;
		}
		.parkChair{
			width: 25%;
			margin-left: 10%;
			margin-bottom: 5%;
		}
		.signal{
			width: 35%;
			margin-left: 5%;
			margin-bottom: 6%;
		}
	}	
	.meal{
		.earBowl{
			width: 18%;
			margin-left: -10%;
			z-index: 10;
		}
		.iceBox{
			width: 25%;
			margin-left: -30%;
		}
		.rag{
			width: 20%;
			margin-left: -40%;
			margin-bottom: 15%;
		}
		.fork{
			width: 15%;
			margin-left: -10%;
		}
		.spoon{
			width: 10%;
			margin-left: 5%;
			margin-bottom: 15%;
		}
		.pot{
			width: 20%;
		}
		.vega{
			width: 50%;
			margin-left: -5%;
			margin-bottom: 0;
		}
		.toma1{
			width: 10%;
			margin-left: 15%;
		}
		.toma2{
			width: 9%;
			margin-left: 23%;
		}
	}	
	.room{
		.bed{
			width: 35%;
			margin-left: -5%;
		}
		.handsup{
			width: 25%;
			margin-left: -25%;
			margin-bottom: 5%;
		}
		.weighter{
			width: 15%;
			margin-left: -10%;
			margin-bottom: 10%;
		}
		.lamp{
			width: 15%;
			margin-left: -15%;
			margin-bottom: 20%;
		}
		.locker{
			width: 20%;
			margin-left: 0;
			margin-bottom: 10%;
		}
		.slipper{
			width: 20%;
			margin-left: 15%;
			margin-bottom: 5%;
		}
	}
}
</style>

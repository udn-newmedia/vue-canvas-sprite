<template>
	<main id="scrollPage"
		 :style="{
					backgroundColor: startBgc,
					backgroundImage: 'url('+ gradLine +')',
		 		}">
		<div id="grandma" :style="{left: landing.grandma + '%'}">
			<img :src="grandMa" alt="奶奶">
		</div>
		<div id="herDog" :style="{left: landing.herDog + '%'}">
			<img :src="dog" alt="狗">
		</div>			
		<div class="scrollContainer"
			 :style="{ 
			 			transition: scrollSpeed+'s',
			 		    transform: 'translateX('+ quizIndex * -100 + '%)',
			 		    zIndex: isLast,
			 		}"
			 >		 
			<div class="scane"
				 @scroll="showScrollLeft"
				 @mousewheel.stop="handleMouseWheel">
				<div class="banner">
					<div class="titleBox">
						<h1>讓家<br/>準備好與你一起變老</h1>
						<p>安全居家 長輩樂活 家人快活</p>						
					</div>
					<div class="chair" :style="{backgroundImage: 'url('+ op +')'}"></div>	
					<div class="horizen" style="background-color: #eb6202">
						<img :src="horizen">
					</div>								
				</div>
				<div class="abstract">
					<p :style="{transform: 'translate('+ abstractX +'%, 0)'}">
						國健署統計，每年「三個老人一個跌」，
						輕則受傷恐懼、畫地限縮活動空間，加速退化，重則從此失能，需要家人照顧一輩子。
						打造適合高齡居住的「大人宅」，成為迎接高齡社會關鍵。
						<br/>
						你的老後一日，會是甚麼模樣？			
					</p>
					<div class="forShare"
						 :style="{opacity: showIntro}">
						<Share href="../../index.html"/>	
					</div>
					<div id="start" @click.once="startGame">
						<span>開始遊戲</span>
					</div>
					<div class="horizen" style="background-color: #ebd202">
						<img :src="horizen">
					</div>									
				</div>				
			</div>
			<div class="quizSection"
				 v-for="(quiz, index) in quizs">
				<div class="question">
					<h2>{{quiz.question.ask}}</h2>
					<div class="optionBlock">
						<p class="optionA"
						   @click.once="choseA(index)">
						    {{quiz.question.optionA}}
						</p>
						<p class="optionB"
						   @click.once="choseB(index)">
						    {{quiz.question.optionB}}
						</p>						
					</div>
					<div class="stage" :class="quiz.name"
						 :style="{backgroundImage: 'url('+ quiz.background +')'}">
						<img v-for="(img, index) in quiz.img" 
							 :class="img.class" :src="img.src"
							 :alt="img.alt" :title="img.title"
							 :style="{display: quiz.display}">
					</div>
					<div class="horizen"
						 :style="{backgroundColor: quiz.question.horizen}">
						<img :src="horizen">
					</div>					
				</div>
				<div class="answer">
					<div class="answerPage">
						<h2 v-if="quiz.answer.showA">{{quiz.answer.answerA}}</h2>
						<h2 v-else>{{quiz.answer.answerB}}</h2>
						<p class="answer_article">{{quiz.answer.anay1}}</p>
						<p class="answer_article">{{quiz.answer.anay2}}</p>
						<p class="toNext" @click.once="toNext(index)">→</p>
					</div>	
					<div class="horizen" :style="{backgroundColor: quiz.answer.horizen}">
						<img :src="horizen">
					</div>						
				</div>							
			</div>
			<div class="quizCount"
				 v-if="showStep"
				 :style="{transition: scrollSpeed+'s', transform: 'translate('+quizIndex*100+'%)'}">
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
import { mapGetters, mapActions } from 'vuex'
import Share from '../components/Share.vue';
import elderHomeDemand from '../components/elderHome_demand.vue'

import imgHorizen from '../assets/h_line.png'
import imgGrandma from '../assets/stage/grandma.gif'
import imgOpening from '../assets/stage/opening.gif'
import imgDog from '../assets/stage/dog.gif'

import roomBg from '../assets/stage/room/roomBg.png'
import bed from '../assets/stage/room/bed.png'
import handsup from '../assets/stage/room/handsup.png'
import lamp from'../assets/stage/room/lamp.png'
import locker from'../assets/stage/room/locker.png'
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
import parkChair from '../assets/stage/outDoor/parkChair.png'

import bathBg from '../assets/stage/bathroom/bathBg.png'
import wash from '../assets/stage/bathroom/wash.png'
import tub from '../assets/stage/bathroom/tub.png'
import toothBrush from '../assets/stage/bathroom/toothBrush.png'
import tessiue from '../assets/stage/bathroom/tessiue.png'
import bubble from '../assets/stage/bathroom/bubble.png'
import bathChair from '../assets/stage/bathroom/bathChair.png'
import gradLine from '../assets/stage/p3.png'

export default {
	name: 'elderHome_fullpage',
	components: {
		Share,
		elderHomeDemand,
	},
	data: function() {
		return {
			gradLine: gradLine,
			startBgc: '#fff',
			scrollSpeed: .8,
			countQuiz: false,
			showStep: true,
			showIntro: 0,
			abstractX: 100,
			isLast: 40,
			horizen: imgHorizen,
			grandMa: imgGrandma,
			op: imgOpening,
			dog: imgDog,
			canScroll: false,
			landing:{
				grandma: -45,
				herDog: -50,
			},
			quizs: [
				{
					"name": 'room',
					"display": "none",
					"background": roomBg,
					"answered": false,
					"answering": false,
					"question": {
						"ask": "早安！經過一夜好眠，開啟新的一天，我要···",
						"optionA": "一張開眼就跳下床，展現活力！",
						"optionB": "賴床一下好了",
						"horizen": "#e4544d",
					},
					"answer": {
						"showA": true,
						"answerA": '這樣不行啦！',
						"answerB": '沒錯！',
						"horizen": "#ea68a2",
						"anay1": '八里療養院職能治療科主任張自強叮嚀，早晨是心腦血管疾病高發時段，且入冬後，身體離開被窩接觸到外面空氣，冷熱溫差更大，銀髮族應格外當心。',
						"anay2": '張自強建議長輩，每日醒來後，雙手各握拳、放開10下，腳趾與膝蓋也彎曲、伸直10下，讓四肢暖和後，再起身坐好、坐穩，才扶著床櫃等，可支撐的輔助物下床。',
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
					"display": "none",
					"background": mealBg,
					"answered": false,
					"answering": false,
					"question": {
							"ask": "午餐時間，該吃甚麼好呢？",
							"optionA": "年紀大了，粗茶淡飯，清淡最好",
							"optionB": "食量變小，更要重視營養攝取夠不夠",
							"horizen": "#23ac39",
						},
					"answer": {
						"showA": true,
						"answerA": '觀念過時啦！',
						"answerB": '正確！',
						"horizen": "#638c0b",
						"anay1": '別再只吃白飯配湯！營養師陳郁旋表示，粗茶淡飯，容易造成營養不良，反而會加速老化。若家中長輩食量變小，則建議少量多餐，補足身體所需營養。',
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
					"display": "none",
					"background": outDoorBg,
					"answered": false,
					"answering": false,
					"question": {
							"ask": "清爽的午後，來活動一下筋骨好了！",
							"optionA": "努力維持運動習慣，保持活力！",
							"optionB": "好懶得動，在家還比較安全",
							"horizen": "#e1bc33",
						},
					"answer": {
						"showA": true,
						"answerA": '給你一百個讚！',
						"answerB": '不行啦！',
						"horizen": "#cfa972",
						"anay1": '物理治療師彭品維說，減緩身體機能老化，關鍵還是在維持運動的好習慣，除了最簡單的快走，也推薦游泳，就算只是泡在水裡踩踩腿，水的壓力、浮力都能幫助血液循環，也更適合關節疼痛者。',
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
					"display": "none",
					"background": bathBg,
					"answered": false,
					"answering": false,
					"question": {
							"ask": "洗個熱呼呼的熱水澡，但浴室老是濕濕滑滑的···",
							"optionA": "我身體勇健，不需要身心障礙扶手",
							"optionB": "醜又如何，扶手不只要裝，還要選最亮色！",
							"horizen": "#04a1e9",
						},
					"answer": {
						"showA": true,
						"answerA": '不是這樣的！',
						"answerB": '沒錯！',
						"horizen": "#00b7ee",
						"anay1": '張自強表示，無論長輩是不是身心障礙者，都建議在浴廁安裝身心障礙扶手，尤其馬桶側邊，與淋浴空間如浴缸等，設施與牆面對比色盡量明顯，以確保長輩在視覺能力較差的狀況下，仍能有效的在危及時刻抓到扶手。',
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
	  	]),
  	},
	methods: {
		...mapActions([
			'handle_quizIndex',
			'handle_lookDemand',
			'handle_headerBgc'
		]),
		showScrollLeft: function(e) {
			const scrollW = e.target.clientWidth - e.target.scrollLeft
			if(e.target.scrollLeft > scrollW * 7){
				this.showIntro = 1
				this.abstractX = 0
				this.startBgc = '#fff799'
			} else {
				this.showIntro = 0
				this.abstractX = 100
				this.startBgc = '#fff'				
			}
		},	
		nextQuiz: function(index) {
			this.showStep = 1
			this.countQuiz = true
			this.handle_quizIndex()		
			if(this.quizIndex < this.quizs.length*2 +1){
				this.quizs[index].answering = true
				this.quizs[index].display = 'block'
				if(index > 0) {
					this.quizs[index-1].answered = true
					this.quizs[index-1].answering = false
					this.quizs[index-1].display = 'none'
				}
			} else if(this.quizIndex === this.quizs.length*2 +1) {
				this.scrollSpeed = 2.5	
				this.landing.herDog = 100
				this.quizs[index-1].display = 'none'
				this.handle_headerBgc()
			} else {
				this.handle_lookDemand()
			}
		},
		startGame: function() {
			this.nextQuiz(0)
	        ga("send", {
	            "hitType": "event",
	            "eventCategory": "button", 
	            "eventAction": "點擊開始遊戲",	 
	            "eventLabel": "[" + this.platform + "][點擊開始遊戲]"
	        });		
		},
		toNext: function(index) {
			this.nextQuiz(index + 1)
	        ga("send", {
	            "hitType": "event",
	            "eventCategory": "button", 
	            "eventAction": "點擊下一題按鈕",	 
	            "eventLabel": "[" + this.platform + "][點擊下一題按鈕]"
	        });			
		},
		choseA: function(index) {
			this.handle_quizIndex()
	        ga("send", {
	            "hitType": "event",
	            "eventCategory": "button", 
	            "eventAction": "選擇左邊答案",	 
	            "eventLabel": "[" + this.platform + "][選擇左邊答案]"
	        });	
		},
		choseB: function(index) {
			this.handle_quizIndex()
			this.quizs[index].answer.showA = false;
	        ga("send", {
	            "hitType": "event",
	            "eventCategory": "button", 
	            "eventAction": "選擇右邊答案",	 
	            "eventLabel": "[" + this.platform + "][選擇右邊答案]"
	        });			
		},
		handleMouseWheel: function(e){
			let w = window.innerWidth
			if(e.deltaY > 3 && e.deltaX < 5){
				e.srcElement.parentElement.scrollLeft += w/21						
				if(e.srcElement.parentElement.scrollLeft == w){
					setTimeout(()=>{
						this.canScroll = true
					}, 500)
					if(this.canScroll === true){
						this.canScroll = false
						this.nextQuiz(0)
				        ga("send", {
				            "hitType": "event",
				            "eventCategory": "wheel", 
				            "eventAction": "藉由滾輪開始遊戲",	 
				            "eventLabel": "[" + this.platform + "][藉由滾輪開始遊戲]"
				        });						
					}
				}				
			} else if (e.deltaY < -3 && e.deltaX < 5){
				e.srcElement.parentElement.scrollLeft -= w/21
			}			
		},
	},	
	mounted() {
		setTimeout(()=>{
		this.landing.grandma = 50
		this.landing.herDog = 50
		}, 133)
	},
	beforeUpdate() {
		if(this.quizIndex >= this.quizs.length*2){
			this.isLast = 50
		}
	},
	updated: function() {
		if(this.quizIndex >= this.quizs.length*2 +1){
			this.showStep = false
			this.countQuiz = false
			this.scrollSpeed = 4
		}			
		switch(this.quizIndex){
			case 0:
				break
			case 2:
				this.startBgc = '#eb6777'
				break;
			case 4:
				this.startBgc = '#a2ce47'
				break;
			case 6: 
				this.startBgc = '#fff45c'
				break;
			case 8:
				this.startBgc = '#7ecef4'
				break;
			default:
				this.startBgc = '#fff'
				break;
		}			
	}
}
</script>
<style lang="scss" scoped>
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
	}
}
#grandma{
	position: absolute;
	z-index: 48;
	bottom: 29px;
	left: -45%;
	transition: left 6s linear;
	width: 35%;
	margin-left: -25%;
	img{
		display: block;
	}
}
#herDog{
	position: absolute;
	z-index: 49;
	bottom: 30px;
	left: -50%;
	transition: left 2.5s ease-out;
	width: 35%;
	img{
		display: block;
	}
}
@keyframes rush {
	0%{
		transform: translate(0, 0);
	}
	40%{
		transform: translate(0, 0);
	}
	60%{
		transform: translate(50%, 0);
	}
	100%{
		transform: translate(0, 0);
	}
}
.scane {
	flex-shrink: 0;
	display: flex;
	width: 100%;
	height: 100%;
	overflow-x: scroll;
	overflow-y: hidden;
}
.banner{
	flex-shrink: 0;
	width: 100%;
	height: 100%;	
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
	position: relative;
	.titleBox{
		margin-top: 15%;
		z-index: 1;
		h1{
			text-shadow: none;
		}		
		p{
			padding: 0 30px;
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
	position: relative;
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
	cursor: pointer;
	width: 100px;
	height: 30px;
	border: 2px solid black;
	border-radius: 20px;
	margin-left: auto;
	margin-right: 15px;
	z-index: 60;
	span{
		width: 100%;
		height: 100%;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
.quizSection {
	flex-shrink: 0;
	z-index: 40;
	height: 100%;
	display: flex;
	position: relative;
}
.question {
	flex-shrink: 0;
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	padding-top: 10px;
	h2 {
		flex-shrink: 0;
		width: 100%;
		text-align: center;
	}
}
.stage{
	position: relative;
	width: 100%;
	max-width: 880px;
	height: 50%;
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
		margin-bottom: 20%;
		animation-name: slideTo0;
		// animation-iteration-count: infinite;
		transform: translate(-50px, 50px);
		opacity: 0;
	}
	.crutch{
		width: 17%;
		z-index: 3;
		margin-left: -35%;
		margin-bottom: 15%;
		animation-delay: .6s;
		animation-name: dropIn;		
	}
	.cart{
		width: 20%;
		margin-left: -5%;
		margin-bottom: 15%;
		z-index: 5;
		animation-name: grow;
		animation-delay: 2s;
		transform-origin: center bottom;
	}
	.parkChair{
		width: 30%;
		margin-left: 10%;
		margin-bottom: 17%;
		z-index: 10;
		visibility: visible;
	}
	.signal{
		z-index: 0;
		width: 65%;
		margin-bottom: 20%;
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
    transform:  translate(0px,-200%)  scaleX(1.00) scaleY(1.00) ;
    visibility: visible;
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
    transform:  translate(0px,0px)  scaleX(1.00) scaleY(1.00);
    visibility: visible;
  }
}
@keyframes scaler{
	0%{
		transform: scale(1) translate(10px,0) rotate(2deg);
	}
	100%{
		transform: scale(1.05) translate(-10px,0) rotate(-2deg);
	}
}
@keyframes slideTo0 {
	to{
		visibility: visible;
		transform: translate(0, 0);	
		opacity: 1;
	}
}
@keyframes fadeInRag {
	from {
		visibility: visible;
		opacity: 0;
		transform: translate(10px, 10px);
	}
	to {
		opacity: 1;
		transform: translate(0, 0);
		visibility: visible;	
	}
}
@keyframes grow {
	0%{
		transform: scale(0);
		visibility: visible;
	}
	80%{
		transform: scale(1.05);
	}
	100%{
		transform: scale(1);
		visibility: visible;
	}
}
@keyframes rollIn {
	0%{
		transform: translate(300px, 0) rotate(360deg);
		visibility: visible;
	}
	20%{
		transform: translate(240px, 0) rotate(300deg);
	}
	40%{
		transform: translate(180px, 0) rotate(240deg);
	}
	60%{
		transform: translate(120px, 0) rotate(180deg);
	}
	80%{
		transform: translate(60px, 0) rotate(90deg);
	}
	100%{
		transform: translate(0, 0) rotate(0deg);
		visibility: visible;
	}
}
.horizen{
	position: absolute;
	z-index: auto;
	width: 100%;
	height: 10px;
	bottom: 35px;
	left: 0;
	transition: 1s;
	img{
		display: block;
		width: 100%;
		height: 105%;
	}
}
.optionBlock {
	width: 100%;
	height: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	z-index: 0;
	p {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;				
		margin: 0 10px;
		padding: 0 10px;
		width: 40%;
		height: 100%;
		border: 2px solid #898989;
		cursor: pointer;
		line-height: 1.5;
		box-shadow: 1px 2px 6px 3px rgba(0,0,0,0.1);
	}
	p:hover {
		background-color: rgba(#898989, .2);
	}
	.lampLine{
		display: none;
	}
}
.answer {
	position: relative;
	z-index: 0;
	flex-shrink: 0;
	width: 100vw;
}
.answerPage{
	position: relative;
	z-index: auto;
	display: flex;
	flex-direction: column;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	max-width: 880px;
	margin: 0 auto;
	h2 {
		padding: 0 15px;
		margin-bottom: 10px;
	}	
}
.answer_article{
	padding: 0 15px;
	line-height: 1.5;
}
.toNext{
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	z-index: 30;
	width: 60px;
	height: 60px;
	margin-right: 15px;
	margin-left: auto;
	cursor: pointer;
	transition: .8s;
	border: 1px solid gray;
	border-radius: 50%;
	color: black;
	font-size: 2em;
	&:hover{
		background-color: lightgrey;
	}
}
.quizCount{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	span{
		width: 8px;
		height: 8px;
		background-color: black;
		border-radius: 50%;
		margin: 0 10px;
		opacity: .3;
		transition: .6s;
	}
	.answered{
		opacity: 1;
	}
	.answering{
		width: 12px;
		height: 12px;
	}
}
.forShare{
	transition: 3s;
	padding: 0 15px;
}@media screen and (max-width: 374px){
	.titleBox{
		h1{
			font-size: 30px;
		}
		p{
			font-size: 18px;
		}
	}
	p{
		font-size: 15px;
	}
	h2{
		font-size: 24px;
	}
	.stage {
		margin-top: 5%;
		img{
			bottom: 0;
		}
	}
}
@media screen and (min-width: 768px) and (max-width: 1023px){
	.optionBlock{
		align-items: center;
		height: 20%;
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
	#scrollPage{
		padding-top: 0px;
	}
	.banner{
		.titleBox{
			margin-top: 10%;
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
	.answerPage{
		padding-top: 5%;
	}
	#grandma{
		bottom: 50px;
		width: 10%;
		margin-left: -15%;
	}
	#herDog{
		bottom: 51px;
		width: 10%;
	}	
	.forShare{
		width: 880px;
		margin: 0 auto;
	}
	#start{
		margin-right: calc(50% - 440px)
	}		
	.quizSection{
		padding-top: 50px;
	}
	.optionBlock{
		align-items: flex-start;
		height: 25%;
		p{
			padding: 0 20px;
			max-width: 20%;
			max-height: 60%;
			box-shadow: 1px 2px 6px 3px rgba(0,0,0,0.1);
		}		
	}
	.quizCount{
		height: 60px;
	}
	.horizen{
		bottom: 55px;
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
			margin-bottom: 7%;
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
			width: 30%;
			margin-left: 10%;
			margin-bottom: 5%;
		}
		.signal{
			width: 35%;
			margin-left: 5%;
			margin-bottom: 10%;
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

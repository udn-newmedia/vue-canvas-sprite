<template>
	<main id="scrollPage">
		<div id="grandma"
			 :style="{left: landing.grandma + '%'}"
		>
			<img src="../assets/stage/grandma.gif" alt="the elder">
		</div>
		<div id="herDog"
			 :style="{left: landing.herDog + '%'}"
		>
			<img src="../assets/herGod.png" alt="her dog">
		</div>			
		<div class="scrollContainer"
			 :style="{transition: scrollSpeed+'s', transform: 'translateX('+ quizIndex * -100 + '%)', zIndex: isLast}"
			 >		 
			<div class="scane"
				 @scroll="showScrollLeft"
				 @mousewheel.stop="handleMouseWheel">
				<div class="banner">
					<div class="titleBox">
						<h1>讓家<br/>準備好與你一起變老</h1>
						<p>安全居家 長輩樂活 家人快活</p>						
					</div>
					<div class="chair"></div>				
				</div>
				<div class="abstract">
					<p :style="{transform: 'translate('+ abstractX +'%, 0)'}">
						國健署統計，每年「三個老人一個跌」，
						輕則受傷恐懼、畫地限縮活動空間，加速退化，重則從此失能，需要家人照顧一輩子。
						打造適合高齡居住的「大人宅」，成為迎接高齡社會關鍵。<br/>
						你的老後一日，會是甚麼模樣？			
					</p>
					<div class="forShare"
						 :style="{opacity: showIntro}">
						<Share href="../../index.html"/>	
					</div>
					<div id="start" @click.once="nextQuiz(0)">
						<span>開始遊戲</span>
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
							<span class="lampLine"></span>
						</p>
						<p class="optionB"
						   @click.once="choseB(index)">
							{{quiz.question.optionB}}
							<span class="lampLine"></span>
						</p>
					</div>
					<div class="stage" :class="quiz.name">
						<img v-for="(img, index) in quiz.img" 
							 :class="img.class" :src="img.src"
							 :alt="img.alt" :title="img.title"
							 :style="{display: quiz.display}">
					</div>
					<div class="horizen" style="background-color: black">
						<img :src="horizen">
					</div>					
				</div>
				<div class="answer">
					<div class="answerPage">
						<h2 v-if="quiz.answer.showA">{{quiz.answer.answerA}}</h2>
						<h2 v-else>{{quiz.answer.answerB}}</h2>
						<p class="answer_article">{{quiz.answer.anay1}}</p>
						<p class="answer_article">{{quiz.answer.anay2}}</p>
						<p class="toNext" @click.once="nextQuiz(index +1)">→</p>
					</div>	
					<div class="horizen" style="background-color: green">
						<img :src="horizen">
					</div>						
				</div>							
			</div>
			<div class="horizen" style="background-color: black">
				<img :src="horizen">
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

import bed from '../assets/stage/room/bed.png'
import handsup from '../assets/stage/room/handsup.png'
import lamp from'../assets/stage/room/lamp.png'
import locker from'../assets/stage/room/locker.png'
import slipper from'../assets/stage/room/slipper.png'
import weighter from'../assets/stage/room/weighter.png'

import earBowl from '../assets/stage/meal/earBowl.png'
import fork from '../assets/stage/meal/fork.png'
import iceBox from '../assets/stage/meal/iceBox.png'
import rag from '../assets/stage/meal/rag.png'
import spoon from '../assets/stage/meal/spoon.png'
import pot from '../assets/stage/meal/pot.png'
import vega from '../assets/stage/meal/vega.png'
import toma1 from '../assets/stage/meal/toma1.png'
import toma2 from '../assets/stage/meal/toma2.png'

import bus from '../assets/stage/outDoor/bus.png'
import cart from '../assets/stage/outDoor/cart.png'
import crutch from '../assets/stage/outDoor/crutch.png'
import signal from '../assets/stage/outDoor/signal.png'
import parkChair from '../assets/stage/outDoor/parkChair.png'

import wash from '../assets/stage/bathroom/wash.png'
import tub from '../assets/stage/bathroom/tub.png'
import toothBrush from '../assets/stage/bathroom/toothBrush.png'
import tessiue from '../assets/stage/bathroom/tessiue.png'
import bubble from '../assets/stage/bathroom/bubble.png'
import bathChair from '../assets/stage/bathroom/bathChair.png'

export default {
	name: 'elderHome_fullpage',
	components: {
		Share,
		elderHomeDemand,
	},
	data: function() {
		return {
			scrollSpeed: .7,
			countQuiz: false,
			showStep: true,
			showIntro: 0,
			abstractX: 100,
			isLast: 40,
			horizen: imgHorizen,
			canScroll: false,
			landing:{
				grandma: -45,
				herDog: -50,
			},
			quizs: [
				{
					"name": 'room',
					"display": "none",
					"answered": false,
					"answering": false,
					"question": {
						"ask": "起床",
						"optionA": "一張開眼就跳下床，展現活力！",
						"optionB": "賴床一下好了"
					},
					"answer": {
						"showA": true,
						"answerA": '這樣不行啦！',
						"answerB": '沒錯！',
						"anay1": '八里療養院職能治療科主任張自強叮嚀，早晨是很多心腦血管疾病的高發階段，加上入冬後，身體從離開被窩，到接觸外面空氣，極大的冷熱落差，銀髮族應格外當心。',
						"anay2": '建議長輩，清晨張開眼後，雙手各握拳、放開十下，腳趾與膝蓋也分別彎曲、伸直十下左右，讓四肢暖和後，再起身坐好、坐穩，才扶著床、櫃等可支撐的輔助物下床。',
					},
					'img': [
						{
							"class": "bed",
							"src": bed,
							"alt": '床',
							"title": "床",
						},
						{	
							"class": "handsup",
							"src": handsup,
							"alt": '起身輔具',
							"title": "起身輔具",
						},
						{
							"class": "lamp",
							"src": lamp,
							"alt": '檯燈',
							"title": "檯燈",
						},
						{
							"class": "locker",
							"src": locker,
							"alt": '櫃子',
							"title": "櫃子",
						},
						{
							"class": "slipper",
							"src": slipper,
							"alt": '拖鞋',
							"title": "拖鞋",
						},
						{
							"class": "weighter",
							"src": weighter,
							"alt": '體重計',
							"title": "體重計",
						},							
					],					
				},
				{
					"name": "meal",
					"display": "none",
					"answered": false,
					"answering": false,
					"question": {
							"ask": "用餐",
							"optionA": "年紀大了，粗茶淡飯，清淡最好",
							"optionB": "食量變小，更要重視營養攝取夠不夠"
						},
					"answer": {
						"showA": true,
						"answerA": '觀念過時啦！',
						"answerB": '正確！',
						"anay1": '別再只吃白飯配湯！營養師陳郁旋表示，粗茶淡飯，反而會加速老化。建議長輩，食量變小，更要維持飲食的多樣性。',
						"anay2": '預防老化的兩大重點，魚與肉都要穩定、均衡攝取，不要只吃其中一樣。再者，與其奉行少鹽少油，更建議活用有益健康的香辛料增加食慾，並依烹調方式選用不同的、新鮮未經精煉的好油。',
					},
					'img': [		
						{
							"class": "earBowl",
							"src": earBowl,
							"alt": '耳朵杯',
							"title": '耳朵杯',
						},
						{	
							"class": "fork",
							"src": fork,
							"alt": '叉子',
							"title": "叉子",
						},
						{
							"class": "iceBox",
							"src": iceBox,
							"alt": '冰箱',
							"title": '冰箱',
						},
						{
							"class": "rag",
							"src": rag,
							"alt": '抹布',
							"title": '抹布',
						},
						{
							"class": "spoon",
							"src": spoon,
							"alt": '湯匙',
							"title": "湯匙",
						},
						{
							"class": "pot",
							"src": pot,
							"alt": '鍋子',
							"title": "鍋子",
						},
						{
							"class": "vega",
							"src": vega,
							"alt": '蔬菜',
							"title": "蔬菜",
						},
						{
							"class": "toma1",
							"src": toma1,
							"alt": '番茄',
							"title": '番茄',
						},
						{
							"class": "toma2",
							"src": toma2,
							"alt": '番茄',
							"title": '番茄',
						},																									
					],					
				},
				{
					"name": "outDoor",
					"display": "none",
					"answered": false,
					"answering": false,
					"question": {
							"ask": "外出(助行)",
							"optionA": "努力維持運動習慣，保持活力！",
							"optionB": "好懶得動，在家還比較安全"
						},
					"answer": {
						"showA": true,
						"answerA": '給你一百個讚！',
						"answerB": '不行啦！',
						"anay1": '物理治療師彭品維說，增強體健、減緩退化，關鍵還是在維持運動的好習慣，最簡單的就是快走，游泳也很推薦，就算只是泡在水裡踩踩腿，水的壓力、浮力都能幫助長輩血液循環，也更適合走路會關節疼痛者。',
						"anay2": '八里療養院職能治療科主任張自強補充，長輩外出建議穿鮮艷、螢光色系衣物，也建議使用助行輔具，老人家若抗拒，則可考慮拐杖傘，或平地用登山杖等形象較正面、健康的輔具。',
					},
					'img' :[
						{
							"class": "bus",
							"src": bus,
							"alt": '公車',
							"title": '公車',
						},
						{
							"class": "cart",
							"src": cart,
							"alt": '助步手推車',
							"title": '助步手推車',
						},
						{
							"class": "crutch",
							"src": crutch,
							"alt": '柺杖',
							"title": '柺杖',
						},
						{
							"class": "signal",
							"src": signal,
							"alt": '紅綠燈',
							"title": '紅綠燈',
						},
						{
							"class": "parkChair",
							"src": parkChair,
							"alt": '公園椅',
							"title": '公園椅',
						},						
					]
				},
				{
					"name": "bathroom",
					"display": "none",
					"answered": false,
					"answering": false,
					"question": {
							"ask": "浴廁",
							"optionA": "爸媽都還勇健，還不需要身心障礙扶手",
							"optionB": "醜又如何，扶手不只要裝，還要選最亮色！"
						},
					"answer": {
						"showA": true,
						"answerA": '不是這樣的！',
						"answerB": '沒錯！',
						"anay1": '八里療養院職能治療科主任張自強表示，無論家中長輩是不是身心障礙者，都建議在浴廁空間安裝身心障礙扶手。物理治療師彭品維補充，最關鍵兩處就是馬桶側邊、淋浴空間（浴缸等）。',
						"anay2": '彭品維表示，浴廁空間潮濕，對長輩來說是有安全疑慮的高風險空間，除了堅固的扶手，也建議在所有水會噴濺到的地面、浴缸底部都安裝市售止滑墊。張自強補充，輔助設施對比色盡量明顯，以確保長輩在視覺與色彩辨識能力較差的狀況下，仍能有效的在危險時刻抓到設施。',
					},
					'img': [
						{
							"class": "wash",
							"src": wash,
							"alt": '洗手台',
							"title": "洗手台",
						},
						{	
							"class": "tub",
							"src": tub,
							"alt": '浴缸',
							"title": "浴缸",
						},
						{
							"class": "toothBrush",
							"src": toothBrush,
							"alt": '牙刷',
							"title": "牙刷",
						},
						{
							"class": "tessiue",
							"src": tessiue,
							"alt": '衛生紙',
							"title": "衛生紙",
						},
						{
							"class": "bubble",
							"src": bubble,
							"alt": '泡泡',
							"title": "泡泡",
						},
						{
							"class": "bathChair",
							"src": bathChair,
							"alt": '洗澡椅',
							"title": "洗澡椅",
						},							
					],					
				},																						
			],
		};
	},
  	computed: {
		...mapGetters([
	  	  'quizIndex',
	  	]),
  	},
	methods: {
		...mapActions([
			'handle_quizIndex',
			'handle_lookDemand',
		]),
		showScrollLeft: function(e) {
			const scrollW = e.target.scrollLeft - e.target.clientWidth
			if(e.target.scrollLeft > scrollW*.7){
				this.showIntro = 1
				this.abstractX = 0
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
				}
			} else if(this.quizIndex === this.quizs.length*2 +1) {
				this.scrollSpeed = 3	
				this.landing.herDog = 100
			} else {
				this.handle_lookDemand()
			}			
		},
		choseA: function(index) {
			this.handle_quizIndex()
		},
		choseB: function(index) {
			this.handle_quizIndex()
			this.quizs[index].answer.showA = false
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
					}
				}				
			} else if (e.deltaY < -3 && e.deltaX < 5){
				e.srcElement.parentElement.scrollLeft -= w/21
			}			
		},
	},	
	mounted() {
		setTimeout(()=>{
		this.landing.grandma = 30
		this.landing.herDog = 50
		}, 133)
	},
	beforeUpdate() {
		if(this.quizIndex >= this.quizs.length*2){
			this.isLast = 50
		}
	},
	updated: function() {
		console.log('updated')
		if(this.quizIndex >= this.quizs.length*2 +1){
			this.showStep = false
			this.countQuiz = false
			this.scrollSpeed = 4
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
	.scrollContainer {
		flex-shrink: 0;
		display: flex;
		// z-index: 40;
		width: 100%;
		height: 100%;
		transform: translate(-100%, 0);
	}
}
#grandma{
	// display: none;
	position: absolute;
	z-index: 48;
	bottom: 42px;
	left: -45%;
	transition: left 6s linear;
	opacity: .6;
	img{
		width: 50%;
		margin: 0;
	}
}
#herDog{
	// display: none;
	position: absolute;
	z-index: 49;
	bottom: 42px;
	left: -50%;
	transition: left 2.5s ease-out;
	opacity: .6;
	img{
		display: block;
		width: 80%;
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
		margin-top: 20%;
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
		background-image: url('../assets/stage/opening.gif');
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
		margin-top: 20%;
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
	overflow: hidden;
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
	background: transparent url('../assets/stage/bathroom/bathBg.jpg') center no-repeat;
	background-size: contain;
	.bathChair{
		width: 30%;
		margin-left: -45%;
		margin-bottom: 10%;
		z-index: 0;
		transform: rotate(-25deg);
		opacity: 0;
		animation-name: rotateTo0;
	}
	.bubble{
		width: 80%;
		top: 0;
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
		visibility: visible;
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
		animation-name: slideTo0;
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
	background: transparent url('../assets/stage/outDoor/outDoorBg.jpg') center no-repeat;
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
		animation-name: rollIn;		
	}
	.cart{
		width: 20%;
		margin-left: -5%;
		margin-bottom: 15%;
		z-index: 5;
		animation-name: slideTo0;
		animation-delay: 2s;
		// animation-iteration-count: infinite;
		transform: translate(-50px, 0);
		opacity: 0;
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
	background: transparent url('../assets/stage/meal/mealBg.jpg') center no-repeat;
	background-size: contain;
	.earBowl{
		width: 25%;
		margin-left: -15%;
		z-index: 10;
		animation-name: rotateTo0;
		animation-duration: 2s;
		animation-delay: 1.6s;
		transform: rotate(15deg);
		transform-origin: 50% 50%;
		opacity: 0;
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
		visibility: visible;
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
		visibility: visible;
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
	background: transparent url('../assets/stage/room/roomBg.jpg') center no-repeat;
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
		transform: translate(-50px, 0);
		animation-name: slideTo0;
		opacity: 0;
	}
	.weighter{
		width: 35%;
		margin-left: -27%;
		margin-bottom: 10%;
		z-index: 8;
		visibility: visible;
	}
	.lamp{
		width: 35%;
		margin-left: -35%;
		margin-bottom: 30%;
		z-index: 5;
		opacity: 0;
		animation-name: rotateTo0;
		animation-delay: 1.2s;
		transform: rotate(-45deg);
		transform-origin: bottom;
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
		transform-origin: bottom;
		animation-delay: 1.6s;
		animation-name: rotateTo0;
		transform: rotate(45deg);
		opacity: 0;
	}
}
@keyframes dropIn{
  0% {
    transform:  translate(0px,-200%)  scaleX(1.00) scaleY(1.00) ;
    visibility: visible;
  }
  30% {
    transform:  translate(0px,0px)  scaleX(0.70) scaleY(2.00) ;
  }
  56% {
    transform:  translate(0px,0px)  scaleX(2.00) scaleY(0.60) ;
  }
  76% {
    transform:  translate(0px,0px)  scaleX(0.60) scaleY(1.2) ;
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
@keyframes rotateTo0 {
	to{
		visibility: visible;
		transform: rotate(0);
		opacity: 1;
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
		height: 100%;
	}
}
.optionBlock {
	width: 100%;
	height: 30%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	p {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;				
		margin: 0 10px;
		padding: 10px;
		width: 40%;
		height: 60%;
		border: 2px solid black;
		border-radius: 20px;
		cursor: pointer;
		line-height: 1.5;
	}
	p:hover {
		color: #fff;
		background-color: #000;
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
	align-items: center;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	max-width: 880px;
	margin: 0 auto;
	margin-top: 10px;
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
	position: absolute;
	z-index: 30;
	top: 65%;
	right: 15px;
	width: 60px;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: .8s;
	background-color: transparent;
	border-radius: 50%;
	color: black;
	font-size: 2em;
	&:hover{
		color: #fff;
		background-color: lightgrey;
		border: 1px solid gray;
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
			background-image: url('../assets/stage/opening.gif');
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
	#grandma{
		bottom: 62px;
		opacity: .7;
		img{
			width: 90%;
		}
	}
	#herDog{
		bottom: 62px;
		img{
			width: 100%;
		}
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
		p{
			max-width: 20%;
			max-height: 60%;
		}		
		.lampLine{
			display: none;
			position: absolute;
			top: -300%;
			left: 50%;
			margin-left: -1px;
			width: 2px;
			height: 300%;
			background-color: black;
			transform-origin: top;
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

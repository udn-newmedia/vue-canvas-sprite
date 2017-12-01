<template>
	<main id="scrollPage">
		<div id="grandma"
			 :style="{left: landing.grandma + '%'}"
		>
			<img src="../assets/grandma.png" alt="the elder">
		</div>
		<div id="herDog"
			 :style="{left: landing.herDog + '%'}"
		>
			<img src="../assets/herGod.png" alt="her dog">
		</div>
		<div class="scrollContainer" :style="{transition: scrollSpeed+'s', transform: 'translateX('+ quizIndex * -100 + '%)'}">
			<div class="scane" @scroll="showScrollLeft" @mousewheel.stop="handleMouseWheel">
				<div class="banner">
					<div>
						<h1>讓家<br/>準備好與你一起變老</h1>
						<p>安全居家 長輩樂活 家人快活</p>						
					</div>
				</div>
				<div class="abstract">
					<p :style="{transform: 'translate('+ abstractX +'%, 0)'}">
						國健署統計，每年「三個老人一個跌」，
						輕則受傷恐懼、畫地限縮活動空間，加速退化，重則從此失能，需要家人照顧一輩子。
						打造適合高齡居住的「大人宅」，成為迎接高齡社會關鍵。<br/>
						你的老後一日，會是甚麼模樣？			
					</p>
					<div class="forShare" :style="{opacity: showIntro}">
						<Share href="../../index.html"/>	
					</div>
					<div id="start" @click.once="nextQuiz(0)">
						<span>開始遊戲</span>
					</div>
				</div>
			</div>
			<div class="quizSection" v-for="(quiz, index) in quizs">
				<div class="question">
					<h2>{{quiz.question.ask}}</h2>
					<div class="optionBlock">
						<p class="optionA" @click.once="choseA(index)">
							{{quiz.question.optionA}}
							<span class="lampLine"></span>
						</p>
						<p class="optionB" @click.once="choseB(index)">
							{{quiz.question.optionB}}
							<span class="lampLine"></span>
						</p>
					</div>				
				</div>
				<div class="answer">
					<div class="answerPage">
						<h2 v-if="quiz.answer.showA">{{quiz.answer.answerA}}</h2>
						<h2 v-else>{{quiz.answer.answerB}}</h2>
						<p class="answer_article">{{quiz.answer.anay1}}</p>
						<p class="answer_article">{{quiz.answer.anay2}}</p>
						<p class="toNext" @click.once="nextQuiz(index +1)">下一題</p>
					</div>		
				</div>							
			</div>
			<div class="quizCount" v-if="showStep" :style="{transition: scrollSpeed+'s', transform: 'translate('+quizIndex*100+'%)'}">
				<span v-if="countQuiz" v-for="(navi, index) in quizs" :class="{answered: navi.answered, answering: navi.answering}"></span>
			</div>
			<elderHomeDemand></elderHomeDemand>
		</div>
	</main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Share from '../components/Share.vue';
import elderHomeDemand from '../components/elderHome_demand.vue'

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
			landing:{
				grandma: -45,
				herDog: -50,
			},
			quizs: [
				{
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
					}
				},
				{
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
					}
				},
				{
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
					}
				},
				{
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
					}
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
		]),
		showScrollLeft: function(e) {
			let w = window.innerWidth
			if(e.target.scrollLeft > w*.7){
				this.showIntro = 1
				this.abstractX = 0
			}
		},	
		nextQuiz: function(index) {
			this.handle_quizIndex()
			this.showStep = 1
			this.countQuiz = true
			if(this.quizIndex < this.quizs.length*2 +1){
				this.quizs[index].answering = true
				if(index > 0) {
					this.quizs[index-1].answered = true
					this.quizs[index-1].answering = false
				}
			} else if(this.quizIndex === this.quizs.length*2 +1) {
				this.scrollSpeed = 3	
				this.landing.herDog = 100
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
				e.srcElement.parentElement.scrollLeft += w/10
				
			} else if (e.deltaY < -3 && e.deltaX < 5){
				e.srcElement.parentElement.scrollLeft -= w/10
			}
		}
	},	
	mounted() {
		setTimeout(()=>{
		this.landing.grandma = 45
		this.landing.herDog = 50
		}, 333)
	},
	updated: function() {
		if(this.quizIndex >= this.quizs.length*2 +1){
			this.showStep = false
			this.countQuiz = false
			this.scrollSpeed = 3
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
		width: 100%;
		height: 100%;
		transform: translate(-100%, 0);
	}
}
#grandma{
	position: absolute;
	z-index: auto;
	bottom: 62px;
	left: -45%;
	transition: left 4s ease-out 1.5s;
	img{
		display: block;
		width: 100%;
		margin-left: -50%;
		max-height: auto;
	}
}
#herDog{
	position: absolute;
	z-index: auto;
	bottom: 62px;
	left: -50%;
	transition: left 2.5s ease-out;
	// animation-name: rush;
	// animation-duration: 8s;
	// animation-iteration-count: infinite;
	img{
		display: block;
		width: 100%;
		max-height: auto;
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
	div{
		margin-top: 20%;
		h1{
			text-shadow: none;
		}		
		p{
			padding: 0 30px;
		}
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
		margin-top: 10%;
		transition: 1.2s ease-in-out;
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
	margin-top: 10px;
	h2 {
		flex-shrink: 0;
		width: 100%;
		text-align: center;
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
	}	
}
.answer_article{
	padding: 0 15px;
	line-height: 1.5;
}
.toNext{
	position: absolute;
	z-index: auto;
	top: 65%;
	right: 15px;
	width: 100px;
	height: 40px;
	margin-top: -20px;
	margin-left: -50px;
	margin-bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid black;
	border-radius: 15px;
	cursor: pointer;
}
.quizCount{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 60px !important;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: 4px solid black;
	span{
		width: 10px;
		height: 10px;
		background-color: black;
		border-radius: 50%;
		margin: 0 10px;
		opacity: .3;
		transition: .6s;
	}
	.answered{
		opacity: 1;
		width: 10px;
		height: 10px;
	}
	.answering{
		width: 15px;
		height: 15px;
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
		div{
			margin-top: 10%;
			p{
				padding: 0;
			}
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
			max-width: 250px;
			max-height: 150px;
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
}
</style>

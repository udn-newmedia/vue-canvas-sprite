<template>
	<div id="scrollPage">
		<div class="scrollContainer" :style="{transition: scrollSpeed+'s', transform: 'translate('+quizIndex*-100+'%)'}">
			<div class="scane" @scroll="showScrollLeft($event)">
				<div class="banner"></div>
				<div class="abstract"></div>
				<div class="quizIntro">
					<h2 id="start" @click="nextQuiz">Start Game</h2>
				</div>
			</div>
			<div class="quizSection" v-for="(quiz, index) in quizs">
				<div class="question">
					<h2>{{quiz.question.ask}}</h2>
					<div class="optionBlock">
						<p class="optionA" @click="nextQuiz">{{quiz.question.optionA}}</p>
						<p class="optionB" @click="choseB(index)">{{quiz.question.optionB}}</p>
					</div>
				</div>
				<div class="answer">
					<div class="answerA" v-if="quiz.answer.showA">
						<h2>結果一</h2>
						<p class="answer_article">{{quiz.answer.answerA.article}}</p>
						<a class="sell" :href="quiz.answer.answerA.link" target="_blank"><p>{{quiz.answer.answerA.product}}</p></a>
						<p class="toNext" @click="nextQuiz">下一題</p>
					</div>
					<div class="answerB" v-else>
						<h2>結果二</h2>
						<p class="answer_article">{{quiz.answer.answerB.article}}</p>
						<a class="sell" :href="quiz.answer.answerB.link" target="_blank"><p>{{quiz.answer.answerB.product}}</p></a>
						<p class="toNext" @click="nextQuiz">下一題</p>
					</div>
				</div>				
			</div>		
		</div>
	</div>
</template>
<script>
import elderPic from '../assets/walk-anime.png';

export default {
	name: 'elderHome_fullpage',
	data: function() {
		return {
			scrollSpeed: 1.33,
			quizIndex: 0,
			quizs: [
				{
					"question": {
							"ask": "起床",
							"optionA": "賴床一下好了",
							"optionB": "昨晚聽醫生建議少吃這個，果真一夜好眠補捕。"
						},
					"answer": {
						"showA": true,
						"answerA": {
							"article": "情作病？來通理，會可象竟讀樓國可大千。還臺上開業但臺出業立人的！給之得無可。必不製是相養人：到不許舉四公門感共出一紀位英。益直用灣收員；大共經全度推意兒特！兩麼復事、電下提之帶；聽道多坡的，寫國定朋男我很明以毛做意過燈品故寶解觀天慢？到道石也屋自客速那持亞然經的化腦月的！意了告投坡利好致大……樹克日做專把成年個星明個北，色房不！用加細再物立人情？當香表沒道又度：高來苦面市法家樣好層視個老好生國重動會護頭。之心共？才物話父子流家……我作美。",
							"link": "http://shopping.udn.com/mall/cus/cat/Cc1c02.do?dc_cateid_0=C_001_047_001&dc_cargxuid_0=U010066018",
							"product": "臥床輔具"
						},
						"answerB": {
							"article": "進畫實的媽我之設龍卻，行急一皮不；下且國。參教李的叫麼公登正來是進月到影始……完水紀說光方家的次全盡子的廣子，院多表師都苦有元……開至明得、本血頭醫來……去也但己師：孩製顧知；來比研打亞事們冷學遊心們地能的天應系著個空也一它國知了的坡，主花樓地家十！要開呢線視光專證。不後定起這。電子發海己以中人可，推府一球坡家素指知看。大奇力媽點，中但背理著取中沒個關、樹的中非傳同部商文何外位香。個你業……以據為得委離許，讓一故候原小緊士內一文進質被張任主得明觀全活快為財告這外早文兩天上一的遊西日組言法的足合望好西快？不民在政華。說輕清：後景什是陽水：城星的作我萬金底共在先小點身？時然那飯力，個求簡科？是強市他和精力適獎中山化為非果斯。集童陽政？",
							"link": "http://shopping.udn.com/mall/cus/event/eventPage.do?header=true&UrlRefXuid=999909074gCBwJ5kzCc&kdid=NC02",
							"product": "解放輔具"									
						},
					}
				},
				{
					"question": {
							"ask": "如廁",
							"optionA": "直接拉個屎看看片",
							"optionB": "吃個軟便藥再去拉。"
						},
					"answer": {
						"showA": true,
						"answerA": {
							"article": "情作病？來通理，會可象竟讀樓國可大千。還臺上開業但臺出業立人的！給之得無可。必不製是相養人：到不許舉四公門感共出一紀位英。益直用灣收員；大共經全度推意兒特！兩麼復事、電下提之帶；聽道多坡的，寫國定朋男我很明以毛做意過燈品故寶解觀天慢？到道石也屋自客速那持亞然經的化腦月的！意了告投坡利好致大……樹克日做專把成年個星明個北，色房不！用加細再物立人情？當香表沒道又度：高來苦面市法家樣好層視個老好生國重動會護頭。之心共？才物話父子流家……我作美。",
							"link": "http://shopping.udn.com/mall/cus/cat/Cc1c02.do?dc_cateid_0=C_001_047_001&dc_cargxuid_0=U010066018",
							"product": "痔瘡藥"
						},
						"answerB": {
							"article": "進畫實的媽我之設龍卻，行急一皮不；下且國。參教李的叫麼公登正來是進月到影始……完水紀說光方家的次全盡子的廣子，院多表師都苦有元……開至明得、本血頭醫來……去也但己師：孩製顧知；來比研打亞事們冷學遊心們地能的天應系著個空也一它國知了的坡，主花樓地家十！要開呢線視光專證。不後定起這。電子發海己以中人可，推府一球坡家素指知看。大奇力媽點，中但背理著取中沒個關、樹的中非傳同部商文何外位香。個你業……以據為得委離許，讓一故候原小緊士內一文進質被張任主得明觀全活快為財告這外早文兩天上一的遊西日組言法的足合望好西快？不民在政華。說輕清：後景什是陽水：城星的作我萬金底共在先小點身？時然那飯力，個求簡科？是強市他和精力適獎中山化為非果斯。集童陽政？",
							"link": "http://shopping.udn.com/mall/cus/event/eventPage.do?header=true&UrlRefXuid=999909074gCBwJ5kzCc&kdid=NC02",
							"product": "解放好舒爽"									
						},
					}
				}				
			],
		};
	},
	computed: {

	},
	methods: {
		showScrollLeft: function(e) {

		},
		nextQuiz: function() {
			this.quizIndex++
		},
		choseB: function(index) {
			this.quizIndex++
			this.quizs[index].answer.showA = false
		},		
		touchMove: function(e) {
			console.log(e)
		},
	},	
	mounted: function() {

	},
}
</script>
<style lang="scss" scoped>
#scrollPage {
	position: relative;
	z-index: 0;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	padding-top: 45px;
	display: flex;
	.scrollContainer {
		flex-shrink: 0;
		display: flex;
		width: 100%;
		height: 100%;
		transform: translate(-100%, 0);
	}
}

.scane {
	flex-shrink: 0;
	display: flex;
	width: 100%;
	height: 100%; // background-color: blue;
	overflow-x: scroll;
	div {
		flex-shrink: 0;
		width: 100%;
		height: 100%;
	}
	.banner {
		// background-color: pink;
	}
	.abstract {
		// background-color: lightyellow;
	}
	.quizIntro {
		// background-color: lightblue;
		display: flex;
		justify-content: center;
	}
}

.quizSection {
	flex-shrink: 0;
	height: 100%;
	display: flex;
}
.question {
	flex-shrink: 0;
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
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
	p {
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
}
.answer {
	position: relative;
	z-index: 0;
	flex-shrink: 0;
	width: 100vw;
	height: 100%;
	div {
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
		h2 {
			padding: 0 15px;
		}
	}
}
.answer_article{
	padding: 0 15px;
	height: 30%;
	overflow: scroll;
}
.sell{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 120px;
	height: 40px;
	margin-left: auto;
	margin-right: 15px;
	border: 2px solid lightblue;
	border-radius: 15px;
	p{
		margin: 0;
		padding: 0;
	}
}
.toNext{
	position: absolute;
	z-index: auto;
	top: 85%;
	left: 50%;
	width: 100px;
	height: 40px;
	margin-left: -50px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid black;
	border-radius: 15px;
	cursor: pointer;
}
@media screen and (min-width: 1024px) {
	#scrollPage{
		padding-top: 0px;
		padding-bottom: 80px;
	}
	.optionBlock{
		p{
			max-width: 300px;
			max-height: 150px;
		}
	}
}
</style>

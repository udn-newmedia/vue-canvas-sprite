<template>
	<div id="scrollPage">
		<canvas id="elder" :width="canvasWidth" :height="canvasHeight"></canvas>
		<div class="scrollContainer" :style="{transition: scrollSpeed+'s', transform: 'translate('+quizIndex*-100+'%)'}">
			<div class="scane" @scroll="showScrollLeft($event)">
				<div class="banner"></div>
				<div class="abstract"></div>
				<div class="quizIntro">
					<h2 id="start" @click="nextQuiz">Start Game</h2>
				</div>
			</div>
			<div class="quizSection">
				<div class="quiz" v-for="(quiz, index) in quizs">
					<h2>{{quiz.ask}}</h2>
					<div class="optionBlock">
						<p class="optionA" @click="nextQuiz">{{quiz.optionA}}</p>
						<p class="optionB" @click="choseB(index)">{{quiz.optionB}}</p>
					</div>
				</div>
			</div>
			<div class="answerSection" @scroll="showScrollLeft($event)">
				<div class="answer" v-for="answer in answers">
					<div class="answerA" v-if="answer.showA">
						<h2>{{answer.answerA.suggestion}}</h2>
						<a :href="answer.answerA.link">{{answer.answerA.promotion}}</a>
					</div>
					<div class="answerB" v-else>
						<h2>{{answer.answerB.suggestion}}</h2>
						<a :href="answer.answerB.link">{{answer.answerB.promotion}}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import elderPic from '../assets/walk-anime.png';

export default {
	name: 'fullpage',
	data: function() {
		return {
			scrollSpeed: 1.33,
			quizIndex: 0,
			quizs: [
				{
					ask: "家裡是否有大螢幕電視",
					optionA: "有",
					optionB: "沒有"
				},
				{
					ask: "謝謝的日文是哪一個？",
					optionA: "ありがとう",
					optionB: "あるがと"
				},
				{
					ask: "誰がこのすばの女神",
					optionA: "アークア",
					optionB: "恵ちゃん"
				},
				{
					ask: "我在雙週會表演的曲子是？",
					optionA: "Wings~ you are the hero",
					optionB: "Mother"
				},
				{
					ask: "像柯文哲的吉他演奏家是？",
					optionA: "中川砂人",
					optionB: "岡崎倫典"
				},
				{
					ask: "董事長叫什麼名字",
					optionA: "Donkey",
					optionB: "Duncan"
				}
			],
			answers: [
				{
					showA: true,
					answerA: {
						suggestion: "那要不要再換一台呢？",
						link: "https://shopping.udn.com/mall/Cc1a00.do",
						promotion: "詳細請點我吧",
					},
					answerB: {
						suggestion: "那要不要買一台呢？",
						link: "https://shopping.udn.com/mall/Cc1a00.do",
						promotion: "詳細請點我吧",
					},
				},
				{
					showA: true,
					answerA: {
						suggestion: "恭喜你答對了",
						link: "https://zh.wikibooks.org/wiki/Category:%E6%97%A5%E8%AA%9E",
						promotion: "點我了解進修資訊",
					},
					answerB: {
						suggestion: "可惜答錯囉！",
						link: "https://zh.wikibooks.org/wiki/Category:%E4%BA%94%E5%8D%81%E9%9F%B3",
						promotion: "點我學習吧！",
					},
				},
				{
					showA: true,
					answerA: {
						suggestion: "答對囉，雖然女神都是女神經病",
						link: "https://shopping.udn.com/mall/Cc1a00.do",
						promotion: "點我看神經病經典錄",
					},
					answerB: {
						suggestion: "那要不要買一台呢？",
						link: "https://shopping.udn.com/mall/Cc1a00.do",
						promotion: "點我學學怎麼エクスプロージョン",
					},
				},
				{
					showA: true,
					answerA: {
						suggestion: "WoW 我講那麼小聲也聽得到",
						link: "https://www.youtube.com/watch?v=yIp481buXzU",
						promotion: "聽聽看原作者的專輯吧"
					},
					answerB: {
						suggestion: "可惜答錯囉",
						link: "https://www.youtube.com/watch?v=sn17Up7TzyA",
						promotion: "雖然答錯了但也聽聽這首Mother吧"
					},
				},
				{
					showA: true,
					answerA: {
						suggestion: "可惜答錯囉",
						link: "http://a2.att.hudong.com/80/46/20300000009075131424469180850_s.jpg",
						promotion: "點我看看照片"
					},
					answerB: {
						suggestion: "恭喜答對囉",
						link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSIvq79gJb3GY_8yuJbfd0Zc6f-o4G0-b9QdiO3oyDRygB-MRT",
						promotion: "點我看看是不是真的像"
					},
				},
				{
					showA: true,
					answerA: {
						suggestion: "答錯囉你要再來一次新人訓練",
						link: "http://a3.att.hudong.com/13/71/01300000065995121218711701774_s.jpg",
						promotion: "這才是Donkey!"
					},
					answerB: {
						suggestion: "恭喜你答對了",
						link: "http://img.appledaily.com.tw/images/ReNews/20141209/640_b4443698ce9edcf93755f08d656daf88.jpg",
						promotion: "阿不就好棒棒"
					},
				}
			],
			canvasWidth: 108,
			canvasHeight: 140,			
			canvasSprite: {
				name: new Image(),
				spriteWidth: 864,
				spriteHeight: 280,
				rows: 2,
				cols: 8,
				curFrame: 0,
				srcX: 0,
				srcY: 0,
			},
			interValDrawElder: 0,
		}
	},
	computed: {
		srcWidth: function() {
			return this.canvasSprite.spriteWidth / this.canvasSprite.cols
		},
		srcHeight: function() {
			return this.canvasSprite.spriteHeight / this.canvasSprite.rows
		}
	},
	mounted: function() {
		if(this.interValDrawElder == 0){
			this.interValDrawElder = setInterval(this.drawElder, 125);
			console.log(this.interValDrawElder)
		}
		this.canvasSprite.name.src = elderPic
	},
	methods: {
		showScrollLeft: function(e) {

		},
		nextQuiz: function() {
			this.quizIndex++
		},
		choseB: function(index) {
			this.quizIndex++
			this.answers[index].showA = false;
		},		
		touchMove: function(e) {
			console.log(e)
		},
		drawElder: function() {
			const sprite = this.canvasSprite
			const canvas = document.getElementById('elder');
			const ctx = canvas.getContext("2d");
			sprite.curFrame = ++sprite.curFrame % sprite.cols;
			sprite.srcX = sprite.curFrame * this.srcWidth;
			ctx.clearRect(0, 0, this.srcWidth, this.srcHeight);
			ctx.drawImage(sprite.name, sprite.srcX, sprite.srcY, this.srcWidth, this.srcHeight, 0, 0, this.srcWidth, this.srcHeight);
		}
	}
}
</script>
<style lang="scss" scoped>
#elder {
	position: fixed;
	top: 70%;
	left: 50%;
	margin-left: -54px;
	z-index: 99999;
	pointer-events: none;
}

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
	.quiz {
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
		.optionBlock {
			width: 100%;
			height: 200px;
			display: flex;
			justify-content: center;
			align-items: center;
			p {
				margin: 0 10px;
				width: 150px;
				text-align: center;
				border: 2px dashed black;
				border-radius: 15px;
				cursor: pointer;
			}
			p:hover {
				color: #fff;
				background-color: #000;
			}
		}
	}
}

.answerSection {
	flex-shrink: 0;
	height: 100%;
	width: 100%;
	display: flex;
	overflow: scroll;
	border: none;
	.answer {
		position: relative;
		z-index: 0;
		flex-shrink: 0;
		width: 100vw;
		height: 100%;
		div {
			position: absolute;
			z-index: auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			h2 {
				padding: 0 15px;
			}
		}
		.answerA {
			background-color: green;
		}
		.answerB {
			background-color: red;
		}
	}
}

</style>

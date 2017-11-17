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
				<div class="quiz" v-for="(quiz, index) in ajaxTest">
					<h2>{{quiz.gsx$question.$t}}</h2>
					<div class="optionBlock">
						<p class="optionA" @click="nextQuiz">{{quiz.gsx$optiona.$t}}</p>
						<p class="optionB" @click="choseB(index)">{{quiz.gsx$optionb.$t}}</p>
					</div>
				</div>
			</div>
			<div class="answerSection" @scroll="showScrollLeft($event)">
				<div class="answer" v-for="(test, index) in ajaxTest">
					<div class="answerA" v-if="answers[index].showA">
						<h2>{{test.gsx$ansasuggest.$t}}</h2>
						<a :href="test.gsx$ansalink.$t">{{test.gsx$ansapromotion.$t}}</a>
					</div>
					<div class="answerB" v-else>
						<h2>{{test.gsx$ansbsuggest.$t}}</h2>
						<a :href="test.gsx$ansbsuggest.$t">{{test.gsx$ansbpromotion.$t}}</a>
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
			answers: [
				{
					"showA": true,
				},
				{
					"showA": true,
				},
				{
					"showA": true,
				},
				{
					"showA": true,
				},
				{
					"showA": true,
				},
				{
					"showA": true,
				}
			],
			ajaxTest: {},
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
	created: function() {
		this.canvasSprite.name.src = elderPic
		this.getData()
	},
	mounted: function() {
		console.log(this.interValDrawElder);
		if(this.interValDrawElder == 0){
			this.interValDrawElder = setInterval(this.drawElder, 125);
			console.log(this.interValDrawElder)
		}
		console.log(this.ajaxTest)
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
			console.log(this.answers[index].showA)
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
		},
		getData: function() {
			const vm = this;
			const sheetUrl = 'https://spreadsheets.google.com/feeds/list/1loEISDptaHu1MqFcPmN7zW6aSgAr6tbkypQ2APZDzsk/1/public/values?alt=json'
			axios.get(sheetUrl)
			.then(function(reponse){
				vm.ajaxTest = reponse.data.feed.entry
				console.log(vm.ajaxTest)
				console.log(reponse)
			})		
		},
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

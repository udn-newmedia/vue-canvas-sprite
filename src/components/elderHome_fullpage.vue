<template>
	<main id="scrollPage">
		<div id="elderLogo">
			<img src="../assets/elderHome_logo.png" alt="大人宅">
		</div>
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
					<h1>準備好與你一起變老</h1>
					<p>打造安全的家 長輩樂活、家人快活</p>
				</div>
				<div class="abstract">
					<p :style="{transform: 'translate('+ abstractX +'%, 0)'}">
						據統計，每年「三個老人一個跌」，輕則受傷恐懼、畫地限縮活動空間，加速退化，重則從此失能，需要家人照顧一輩子。打造適合高齡居住的大人宅，成為迎接高齡社會關鍵。							
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
					<div class="answerPage" v-if="quiz.answer.showA">
						<h2>結果一</h2>
						<p class="answer_article">{{quiz.answer.answerA.article}}</p>
						<a class="sell" :href="quiz.answer.answerA.link" target="_blank"><p>{{quiz.answer.answerA.product}}</p></a>
						<p class="toNext" @click.once="nextQuiz(index +1)">下一題</p>
					</div>
					<div class="answerPage" v-else>
						<h2>結果二</h2>
						<p class="answer_article">{{quiz.answer.answerB.article}}</p>
						<a class="sell" :href="quiz.answer.answerB.link" target="_blank"><p>{{quiz.answer.answerB.product}}</p></a>
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
// import Utils from 'udn-newmedia-utils'
// import elderPic from '../assets/walk-anime.png';
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
							"ask": "起床1",
							"optionA": "賴床一下好了",
							"optionB": "掌握身體健康數據不偷懶ღ"
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
					"answered": false,
					"answering": false,
					"question": {
							"ask": "如廁2",
							"optionA": "趕快解放完，來去吃早餐",
							"optionB": "昨晚聽醫生建議吃「這個」，果真一夜好眠！"
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
				},
				{
					"answered": false,
					"answering": false,
					"question": {
							"ask": "如廁3",
							"optionA": "一起床就吃！即時補充能量ღ",
							"optionB": "切個水果當早餐好了～。"
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
				},
				{
					"answered": false,
					"answering": false,
					"question": {
							"ask": "如廁4",
							"optionA": "好懶得動，能曬曬太陽就好了",
							"optionB": "努力維持運動習慣保持活力"
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
				},
				{
					"answered": false,
					"answering": false,
					"question": {
							"ask": "如廁5",
							"optionA": "閱讀助抗老！來看個報ღ",
							"optionB": "能站就不坐，利用看電視時間活動筋骨。"
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
				},
				{
					"answered": false,
					"answering": false,
					"question": {
							"ask": "如廁6",
							"optionA": "上週洗澡差點滑跤，怕怕的不想洗",
							"optionB": "涼涼的天泡澡真舒服。"
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
			if(this.quizIndex < 13){
				this.quizs[index].answering = true
				if(index > 0) {
					this.quizs[index-1].answered = true
					this.quizs[index-1].answering = false
				}
			} else if(this.quizIndex === 13) {
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
		// console.log(this.quizIndex)
		if(this.quizIndex >= 13){
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
	height: 100vh;
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
#elderLogo{
	position: absolute;
	z-index: 10;
	top: 50px;
	left: 0;
	width: 100%;
	background-color: #fff;
	img{
		display: block;
		width: 50px;
		height: 50px;
		margin: auto;
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
	animation-name: rush;
	animation-duration: 8s;
	animation-iteration-count: infinite;
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
	h1{
		text-shadow: none;
		margin-top: 40%;
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
		margin-top: 30%;
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
	margin-top: 50px;
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
	margin-top: 50px;
	h2 {
		padding: 0 15px;
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
	top: 75%;
	left: 75%;
	width: 100px;
	height: 40px;
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
	border-top: 5px solid black;
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
		h1{
			text-shadow: none;
			margin-top: 10%;
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

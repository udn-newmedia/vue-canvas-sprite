import Utils from 'udn-newmedia-utils'

export const handle_quizIndex = state => {
	state.quizIndex ++
}
export const handle_lookDemand = state => {
	state.quizIndex = 9
}
export const detectDevice = state => {
	state.platform = Utils.detectPlatform()
}
export const getWebTitle = state => {
	state.webTitle = document.getElementsByTagName('title')[0].text
}
export const handle_headerBgc = state => {
	state.headerBgc === '#fff' ?
		state.headerBgc = 'transparent' : state.headerBgc = '#fff'		
}
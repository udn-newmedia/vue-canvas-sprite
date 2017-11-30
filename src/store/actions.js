// export const increment = ({ commit }) => commit('increment')
// export const decrement = ({ commit }) => commit('decrement')

// export const incrementIfOdd = ({ commit, state }) => {
//   if ((state.count + 1) % 2 === 0) {
//     commit('increment')
//   }
// }

// export const incrementAsync = ({ commit }) => {
//   setTimeout(() => {
//     commit('increment')
//   }, 1000)
// }

export const handle_quizIndex = ({commit}) => commit('handle_quizIndex')
export const handle_lookDemand = ({commit}) => commit('handle_lookDemand')
export const handle_playAgain = ({commit}) => commit('handle_playAgain')

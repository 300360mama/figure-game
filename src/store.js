import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    namespaced: true,
    state: {
        figuresLeft: [],
        figuresRight: [],
        angle: 0
    },
    getters: {
        figuresLeft: (state) => {
            return state.figuresLeft;
        },
        figuresRight: (state) => {
            return state.figuresRight;
        },
        angle: (state) => {
            return state.angle;
        }
    },
    mutations: {
        addFigureLeft: (state, params) => {
            state.figuresLeft.push(params);
            console.log(state.figuresLeft);
        },
        changeFigureLeft: (state, obj) => {
            state.figuresLeft.splice(obj.key, 1, obj.params);
        },
        addFigureRight: (state, params) => {
            state.figuresRight.push(params);
            console.log(state.figuresRight);
        },
        changeFigureRight: (state, obj) => {
            state.figuresLeft.splice(obj.key, 1, obj.params);
        },
        setAngle: (state, angle) => {
            state.angle = angle;
        }
    
    },
    actions: {
        changeFigureLeft: (context, obj) => {
            context.commit("changeFigureLeft", obj);
        },
        addFigureLeft: (context, params) => {
            context.commit("addFigureLeft", params);
        },
        changeFigureRight: (context, obj) => {
            context.commit("changeFigureRight", obj);
        },
        addFigureRight: (context, params) => {
            context.commit("addFigureRight", params);
        },
        setAngle: (context, angle) => {
            context.angle = angle;
        }
    }
});

export default store;
<template>
  <div
    class="content"
    ref="content"
    @keyup.left="moveLeft"
    @keyup.right="moveRight"
    tabindex="0"
   
  >
    <Figure
      v-for="(figure, index) in figuresLeft"
      :key="index"
      :params="figure"
      :angle="setAngle"
      >{{
    }}</Figure>

    <Basis class="basis" :angle="setAngle"></Basis>

    <div id="start" @click="startGame" v-show="figuresLeft.length < 1">
      Start game
    </div>
  </div>
</template>

<script>
import Figure from "./Figure.vue";
import Basis from "./Basis.vue";
import { mapState } from "vuex";
import {eventBus} from '../main'
export default {
  name: "Content",
  components: {
    Figure,
    Basis,
  },
  props: {},
  data: function () {
    return {
      params: {
        top: 0,
        left: 0,
        angle: 0,
        width: 300,
        height: 300,
        type: "triangle",
      },
    };
  },
  computed: {
    ...mapState({
      figuresLeft: (state) => state.figuresLeft,
      figuresRight: (state) => state.figuresRight,
      angle: (state) => state.angle,
    }),
    setAngle() {
      return this.$store.angle;
    },
  },
  methods: {
    setDefaultParams() {
      this.params = {
        top: 0,
        left: 0,
        angle: 0,
        width: 300,
        height: 300,
        type: "circle",
      };
    },
    moveLeft() {
      let lastFigure = this.figuresLeft.length - 1;
      let params = this.figuresLeft[lastFigure];
      let height =
        this.figuresLeft[lastFigure].type == "trianlge"
          ? this.figuresLeft[lastFigure].width
          : this.figuresLeft[lastFigure].height;
      if (this.figuresLeft[lastFigure].top + height < this.getCoordsLine().top) {
        params.left = params.left - 10;

        console.log(this.figuresLeft[lastFigure].top + height);
        console.log(this.getCoordsLine().top);

        this.changeFigureLeft(lastFigure, params);
      }
    },
     moveRight() {
      let lastFigure = this.figuresLeft.length - 1;
      let params = this.figuresLeft[lastFigure];
      let height =
        this.figuresLeft[lastFigure].type == "trianlge"
          ? this.figuresLeft[lastFigure].width
          : this.figuresLeft[lastFigure].height;
      if (this.figuresLeft[lastFigure].top + height < this.getCoordsLine().top) {
        params.left = params.left + 10;

        console.log(this.figuresLeft[lastFigure].top + height);
        console.log(this.getCoordsLine().top);

        this.changeFigureLeft(lastFigure, params);
      }
    },
    addFigureLeft(params) {
      this.$store.dispatch("addFigureLeft", params);
    },
    changeFigureLeft(key, params) {
      let obj = {
        key: key,
        params: params,
      };
      this.$store.dispatch("changeFigureLeft", obj);
    },
    getCoords(elem) {
      var box = elem.getBoundingClientRect();
      let coords = {
        top: 0,
        left: 0,
      };
      coords.top = box.top + pageYOffset;
      coords.left = box.left + pageXOffset;

      return coords;
    },
    getCoordsLine() {
      let line = document.querySelector("#line");
      let coords = this.getCoords(line);

      return coords;
    },
    startGame() {
      this.setDefaultParams();
      this.addFigureLeft(this.params);
    },
    generateRandomFigure() {
      let min = 20;
      let max = 100;
      let type = [
        "triangle",
        "circle",
        "square"
      ];
      let randType = Math.floor(Math.random() * type.length); 
      console.log("rand" + randType);
      let width = Math.floor(Math.random() * (max - min) + min);
      let height = Math.floor(Math.random() * (max - min) + min);
      console.log("test");
       let params = {
        top: 0,
        left: 0,
        angle: 0,
        width: width,
        height: height,
        type: type[randType],
      };
      this.addFigureLeft(params);
    }
  },
  created: function() {
    eventBus.$on("test", this.generateRandomFigure);
  },
  mounted: function () {
    setInterval(
      function () {
        let lastFigure = this.figuresLeft.length - 1;
        let params = this.figuresLeft[lastFigure];
        params.top = params.top + 10;
        this.changeFigureLeft(lastFigure, params);
        let height =
          this.figuresLeft[lastFigure].type == "trianlge"
            ? this.figuresLeft[lastFigure].width
            : this.figuresLeft[lastFigure].height;

        if (
          Number(this.figuresLeft[lastFigure].top) + height >=
          Number(this.getCoordsLine().top)
        ) {
          eventBus.$emit("test");
        }
      }.bind(this),
      100
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#start {
  display: flex;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.3);
  width: 140px;
  height: 25px;
  border-radius: 3px;
  justify-content: center;
  margin: 0 auto;
}
.content {
  margin: 0 auto;
  padding: 0;
  height: 100vh;
  margin-bottom: 40px;
  position: relative;
}

.content:focus {
  border: none;
  outline: none;
}

.visible {
  transform: matrix(1, 0, 0, 1, 0, 400);
}
.basis {
  position: absolute;
  bottom: 0;
}

#changePos {
  margin: 10px 5px;
  background: red;
}
</style>

<template>
  <div class="wrapper">
    <div id="line" class="line" :style="setStyle"></div>
    <div class="basis-triangle"></div>
  </div>
</template>

<script>
export default {
  name: "Basis",
  components: {},
  props: {
    angle: Number,
  },
  data: function () {
    return {
    };
  },
  computed: {
    setStyle() {
      return {
        transform: `rotate(${this.angle}deg)`,
      };
    },
  },
  methods: {},
};
</script>

<style scoped>
.wrapper {
  position: relative;
  height: 220px;
  width: 100%;
  min-width: 800px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.line {
  position: absolute;
  width: 900px;
  height: 10px;
  background: #000;
  transition:  transform 0.3 linear;
}
.basis-triangle {
  position: absolute;
  display: block;
  width: 0px;
  height: 0px;
  top: 15px;
  border: 100px solid transparent;
  border-bottom: 100px solid yellow;
}
</style>

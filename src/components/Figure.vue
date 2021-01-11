<template>
  <div
    class="figure"
    :class="params.type"
    :style="setStyle"
    ref="figure"
  >
    {{ weight }}
  </div>
</template>

<script>
export default {
  name: "Figure",
  props: {
    type: String,
    params: Object,
  },
  data: function () {
    return {
      weight: 1,
    };
  },
  computed: {
    setStyle() {
      if (this.params.type === "triangle") {
        return {
          width: "0px",
          height: "0px",
          border: this.params.width + "px solid transparent",
          borderBottom: this.params.width + "px solid yellow",
          top: this.params.top + "px",
          left: this.params.left + "px",
        };
      }

      return {
        width: this.params.width + "px",
        height: this.params.height + "px",
        top: this.params.top + "px",
        left: this.params.left + "px",
      };
    },
  },
  methods: {
    setWeight() {
      switch (this.params.type) {
        case "triangle":
          this.weight = Math.round(
            (Math.sqrt(3) / 4) * this.params.width * this.params.width
          );
          break;
        case "circle":
          this.weight = Math.round(
            Math.PI * this.params.width * this.params.height
          );
          break;
        default:
          this.weight = Math.round(this.params.width * this.params.height);
          break;
      }
    },
    test() {
      console.log(123232131);
      this.$emit("test");
    },
  },
  watch: {},
  mounted() {
    this.setWeight();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.figure {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  transition: top 3s linear, left 0.2s linear;
}
.circle {
  border-radius: 50%;
  background: red;
}

.square {
  background: green;
}

.triangle {
  display: block;
  width: 0;
  height: 0;
}
</style>

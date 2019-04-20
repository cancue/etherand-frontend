<template>
  <div>
    <h3 @click="play">
      {{ result }}
    </h3>
    <div class="roulette-container" @click="start" :style="degree">
      <img id="roulette" src="https://cdn1.iconfinder.com/data/icons/sin-city-memories/128/roulette-512.png" :class="rotateClass">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isRotating: false,
      accDec: 0,
      result: "PRESS ME!",
    }
  },
  computed: {
    rotateClass () {
      return this.isRotating ?
        { rotate: true } : { rotate: true, stop: true }
    },
    degree () {
      return { transform: `rotate(${this.accDec}deg)` }
    }
  },
  methods: {
    start () {
      this.isRotating = true
    },
    setResult (deg) {
      this.isRotating = false
      this.accDec = this.accDec + 360 + deg
      this.result = (getRouletteDeg() + this.accDec) % 360
    },
    async play () {
      this.start()
      const getUnsafeEntropy = window.onchain.etherand.methods.getUnsafeEntropy.call
      const res = await getUnsafeEntropy()
      setTimeout(() => this.setResult(Number(res) % 360), 5000)
    },
  }
}

const getRouletteDeg = () => {
  const matrix = $("#roulette").css("transform")
  let angle = 0

  if (matrix !== "none") {
    const [a, b] = matrix.split("(")[1].split(")")[0].split(",")
    angle = Math.round(Math.atan2(b, a) * (180 / Math.PI))
  }

  return (angle < 0) ? angle + 360 : angle
}
</script>

<style lang="scss" scoped>
$speed: 0.8s;

h3 {
  margin: 2rem;
  padding: 2rem;
  cursor: pointer;
  background-color: gray;
  word-break: break-all;
}
.roulette-container {
  transition: transform 2s ease-out;
}
#roulette {
  cursor: pointer;
}
.rotate {
  animation: spin ($speed * 2) ease-in 1, spin ($speed) linear ($speed * 2) infinite;
}
.stop {
  animation-play-state: paused;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

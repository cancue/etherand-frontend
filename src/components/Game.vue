<template>
  <div>
    <h3 @click="play">
      {{ entropy }}
    </h3>
  </div>
</template>

<script>
export default {
  data () {
    return {
      entropy: "PRESS ME!"
    }
  },
  methods: {
    play () {
      this.getUnsafeEntropy()
        .then(res => {
          this.entropy = res
        })
    },
    async getUnsafeEntropy () {
      const entropy = await window.onchain.etherand.methods.getUnsafeEntropy.call()
      return entropy
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 2rem;
  padding: 2rem;
  cursor: pointer;
  background-color: gray;
  word-break: break-all;
}
</style>

<template>
  <div>
    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#requestEntropy">
      requestEntropy
    </button>
    <button class="btn btn-warning" @click="increaseEntropy">
      increaseEntropy
    </button>
    <button class="btn btn-warning" @click="getEntropy">
      getEntropy
    </button>
    <button class="btn btn-primary" @click="getUnsafeEntropy">
      getUnsafeEntropy
    </button>

    <div class="modal fade" id="requestEntropy" tabindex="-1" role="dialog" aria-labelledby="requestEntropyLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="requestEntropy">Request Entropy</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input class="form-control mb-3" placeholder="From (Address)" v-model="fromAddress">
            <input class="form-control mb-3" placeholder="BlockCount" v-model="blockCount">
            <input class="form-control" placeholder="EntropyCount" v-model="entropyCount">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" @click="requestEntropy">requestEntropy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fromAddress: "",
      blockCount: 0,
      entropyCount: 0
    }
  },
  methods: {
    requestEntropy () {
      window.onchain.etherand.methods.requestEntropy(
        this.fromAddress,
        this.blockCount,
        this.entropyCount
      )
        .send({ from: window.onchain.account })
        .once("transactionHash", (hash) => {
          $("#requestEntropy").modal("hide")
          console.info(hash)
        })
        .once("receipt", (receipt) => console.log(receipt))
        .on("error", console.warn)
    },
    increaseEntropy () {
      const num = prompt("Enter entropy number")
      window.onchain.etherand.methods.increaseEntropy(num).send({
        from: window.onchain.account
      })
        .once("transactionHash", (hash) => console.info(hash))
        .once("receipt", (receipt) => console.log(receipt))
        .on("error", console.warn)
    },
    getEntropy () {
      const num = prompt("Enter entropy number")
      window.onchain.etherand.methods.getEntropy(num).send({
        from: window.onchain.account
      })
        .on("transactionHash", (hash) => console.info(hash))
        .on("error", console.warn)
        .on("receipt", console.warn)
        .then(receipt => {
          console.log(receipt)
        })
    },
    getUnsafeEntropy () {
      window.onchain.etherand.methods.getUnsafeEntropy.call()
        .then(res => alert(res))
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: block;
  margin: 1rem auto;
}
</style>

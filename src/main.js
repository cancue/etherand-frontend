import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Web3 from "web3"
import Etherand from "../Etherand.json"
import "@/assets/styles/common.scss"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

// Web3 Settings
const setWeb3 = () => {
  const onchain = window.onchain = {}

  // set web3
  if (typeof window.web3 !== "undefined") {
    console.info("Using web3 detected from external source.")
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    console.warn("No web3 detected from external source. Read-only mode")
    window.web3 = new Web3(
      Web3.providers.HttpProvider("mainnet.infura.io/v3/26fde8284a7a44a4bd3a5583d97b3ba0")
    )
  }

  // set account
  window.web3.eth.getAccounts()
    .then((accs) => {
      if (accs.length === 0 && !onchain.networkAlerted) {
        console.warn("Your account is not detected.")
        onchain.networkAlerted = true
      } else {
        onchain.account = accs[0]
      }
    })

  // set network
  window.web3.eth.net.getId()
    .then((netId) => {
      onchain.netId = netId
    })
    .catch(console.log)

  // set contract
  onchain.etherand = new window.web3.eth.Contract(
    Etherand.abi,
    Etherand.networks["5777"].address
  )

  // Enable ethereum
  if (
    window.ethereum &&
    window.ethereum.enable &&
    typeof window.ethereum.enable === "function"
  ) {
    window.ethereum.enable()
  }

  // Check web3 changes
  setInterval(() => {
    window.web3.eth.getAccounts((err, accs) => {
      if (err != null) return
      window.web3.eth.net.getId()
        .then((netId) => {
          if (accs[0] !== undefined &&
            ((accs[0] !== onchain.address) ||
              (netId !== onchain.network))) {
            window.location.reload()
          }
        })
    })
  }, 1000)
}

setWeb3()

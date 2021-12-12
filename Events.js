export default class connection extends EventTarget {
  constructor(evnt, funct) {
    this.onFire = funct
    this.evnt = evnt
    evnt.connections.push(this)
    this.addEventListener("fire", this.onFire)
  }
  Disconnect() {
    this.evnt.connections = this.evnt.connections.filter(function(val) {
      return val !== this
    })
    this.evnt = "ToBeConnected"
  }
  changeHandler(funct) {
    this.removeEventListener("fire", onFire)
    this.onFire = funct
    this.addEventListener("fire", onFire)
  }
  reConnect(evnt) {
    if (this.evnt == "ToBeConnected") {
      this.evnt = evnt
      evnt.connections.push(this)
    }
  }
}
export default class bindableEvent extends CustomEvent {
  constructor(nme, funct, isSubEvent) {
    if (!isSubEvent) {
      this.onDestroy = new bindableEvent("onDestroy", function(funct) {
        while (this.connections !== undefined) {}
        funct.fire("")
      }, true)
    }
    this.isSubEvent = false
    this.connections = []
    this.controller = funct
    this.type = "fire"
    this.name = nme
    this.controller.fire = function(inputs) {
      this.this.detail = inputs
      this.this.connections.forEach(function(val) {
        val.dispatchEvent(this)
      })
    }
    this.controller.this = this(async () => this.controller(...arguments))(this.controller);
  }
  connect(funct) {
    return new connection(this, funct)
  }
  Destroy() {
    this.connections.forEach(function(val) {
      val.Disconnect()
    })
    this.connections = undefined
    this.getOwnPropertyNames().forEach((val) => {
      this[val] = undefined
    })
  }
}

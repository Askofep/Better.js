export default class ClassFunction extends Function {
  /*extentionOf can be a class function of any type,
  or an array of class functions.*/
  constructor(constr, extentionOf, proto) {
    super()
    multiSet.withObject(this, ['call', 'bind', 'apply',
      'arguments', 'displayName',
      'toString', 'toSource'
    ], constr)
    this.funtName = constr.name
    Object.defineProperty(this, 'name', {
      value: constr.name,
      get: () => Object.getOwnPropertyDescriptor(this, 'name').value,
      set: function(val) {
        Object.defineProperty(this, 'name', {
          value: val
        })
      }
    })
    this.prototype = proto
    if (extentionOf instanceof Array) {
      let ext = class {}
      for (let i in extentionOf) {
        Object.setPrototypeOf(ext.prototype, extentionOf[i].prototype)
      }
      for (let i in extentionOf) {
        Object.setPrototypeOf(ext, extentionOf[i])
      }
      Object.setPrototypeOf(this.prototype, ext.prototype)
      Object.setPrototypeOf(this, ext)
      this.super = ext
    } else {
      Object.setPrototypeOf(this.prototype, extentionOf.prototype)
      Object.setPrototypeOf(this, extentionOf)
      this.super = extentionOf
    }
    Object.setPrototypeOf(this.prototype, {
      __proto__: proto
    })
  }

	set Prototype(proto){
		this.prototype.__proto__ = proto
		this.super = this.super
	}
  get Prototype() {
    return this.prototype.__proto__
  }
	get super() {return Object.getOwnPropertyDescriptor(this, 'super').value}
  set super(val) {
    let proto = this.prototype.proto
    this.prototype = proto
    let extentionOf = val
    if (extentionOf instanceof Array) {
      let ext = class {}
      for (let i in extentionOf) {
        Object.setPrototypeOf(ext.prototype, extentionOf[i].prototype)
      }
      for (let i in extentionOf) {
        Object.setPrototypeOf(ext, extentionOf[i])
      }
      Object.setPrototypeOf(this.prototype, ext.prototype)
      Object.setPrototypeOf(this, ext)
      Object.defineProperty(this, 'super', {
        value: ext
      })
    } else {
      Object.setPrototypeOf(this.prototype, extentionOf.prototype)
      Object.setPrototypeOf(this, extentionOf)
      Object.defineProperty(this, 'super', {
        value: extentionOf
      })
      Object.setPrototypeOf(this.prototype, {
        proto: proto
      })
    }
	}
}

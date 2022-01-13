export default {
  any() {
    return {
      type: null
    }
  },
  string(d?: string) {
    return {
      type: String,
      default: d
    }
  },
  number(d?: number) {
    return {
      type: Number,
      default: d
    }
  },
  bool(d = false) {
    return {
      type: Boolean,
      default: d
    }
  },
  object(d = {}) {
    return {
      type: Object,
      default: function () {
        return d
      }
    }
  },
  array<T>(d?: Array<any>) {
    return {
      type: Array,
      default: function () {
        return d
      }
    }
  },
  func(d?: any) {
    if (d !== undefined) {
      return {
        type: Function,
        default: function () {
          return d
        }
      }
    } else {
      return {
        type: Function
      }
    }
  },
  oneOfType(list: Array<any>, d?: any) {
    const types = list.map(prop => {
      return prop['type']
    })
    return {
      type: types,
      default: d
    }
  },
  oneOfString(list: Array<any>, d?: any) {
    return {
      validator: function (value: string) {
        return list.indexOf(value) !== -1
      },
      default: d
    }
  },
  date(d?: Date) {
    return {
      type: Date,
      default: d
    }
  }
}
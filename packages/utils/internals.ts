function _isPlaceholder(a: any): boolean {
    return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true
  }
  
  export function _arity<T, F extends(...args: any[]) => T>(n: number, fn: F): F {
    switch (n) {
      case 0:
        return function(this: any) {
          return fn.apply(this, arguments as any)
        } as F
  
      case 1:
        return function(this: any) {
          return fn.apply(this, arguments as any)
        } as F
  
      case 2:
        return function(this: any) {
          return fn.apply(this, arguments as any)
        } as F
  
      case 3:
        return function(this: any) {
          return fn.apply(this, arguments as any)
        } as F
  
      case 4:
        return function(this: any) {
          return fn.apply(this, arguments as any)
        } as F
  
      case 5:
        return function(this: any) {
          return fn.apply(this, arguments as any)
        } as F
  
      case 6:
        return function(this: any) {
          return fn.apply(this, arguments as any)
        } as F
  
      case 7:
        return function(this: any) {
          return fn.apply(this, arguments as any)
        } as F
  
      case 8:
        return function(this: any) {
          return fn.apply(this, arguments as any)
        } as F
  
      case 9:
        return function(this: any) {
          return fn.apply(this, arguments as any)
        } as F
  
      case 10:
        return function(this: any) {
          return fn.apply(this, arguments as any)
        } as F
  
      default:
        throw new Error('First argument to _arity must be a non-negative integer no greater than ten')
    }
  }
  
  export function _curry1(fn: Function) {
    return function f1(this: any, a: any) {
      if (arguments.length === 0 || _isPlaceholder(a)) {
        return f1
      } else {
        return fn.apply(this, arguments)
      }
    }
  }
  
  export function _curry2(fn: Function) {
    return function f2<A, B>(a: A, b: B) {
      switch (arguments.length) {
        case 0:
          return f2
  
        case 1:
          return _isPlaceholder(a) ? f2 : _curry1(function(_b: B) {
            return fn(a, _b)
          })
  
        default:
          return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a: A) {
            return fn(_a, b)
          }) : _isPlaceholder(b) ? _curry1(function(_b: B) {
            return fn(a, _b)
          }) : fn(a, b)
      }
    }
  }
  
  export function _cloneRegExp(pattern: RegExp): RegExp {
    return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''))
  }
  
  export function _clone<T>(value: T, refFrom: any[], refTo: any[], deep: boolean): T {
    const copy = function copy(copiedValue: T): T {
      const len = refFrom.length
      let idx = 0
  
      while (idx < len) {
        if (value === refFrom[idx]) {
          return refTo[idx]
        }
  
        idx += 1
      }
  
      refFrom[idx + 1] = value
      refTo[idx + 1] = copiedValue
  
      for (const key in value) {
        copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key]
      }
  
      return copiedValue
    }
  
    switch (type(value)) {
      case 'Object':
        return copy({} as any)
  
      case 'Array':
        return copy([] as any)
  
      case 'Date':
        return new Date((value as any as Date).valueOf()) as any
  
      case 'RegExp':
        return _cloneRegExp(value as any) as any
  
      default:
        return value
    }
  }
  
  export function _isNumber(x: any): boolean {
    return Object.prototype.toString.call(x) === '[object Number]'
  }
  
  export function _arrayFromIterator<T>(iter: Iterator<T>): T[] {
    const list = []
    let next: any
    while (!(next = iter.next()).done) {
      list.push(next.value)
    }
    return list
  }
  
  export function _includesWith(pred: (a: any, b: any) => boolean, x: any, list: any[]): boolean {
    let idx = 0
  
    while (idx < list.length) {
      if (pred(x, list[idx])) {
        return true
      }
  
      idx += 1
    }
  
    return false
  }
  
  export function _functionName(f: Function): string {
    // String(x => x) evaluates to "x => x", so the pattern may not match.
    const match = String(f).match(/^function (\w*)/)
    return match == null ? '' : match[1]
  }
  
  export function _has<T>(prop: PropertyKey, obj: T) {
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }
  
  function _objectIsFunc(a: any, b: any): boolean {
    // SameValue algorithm
    if (a === b) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return a !== 0 || 1 / a === 1 / b
    } else {
      // Step 6.a: NaN == NaN
      // eslint-disable-next-line no-self-compare
      return a !== a && b !== b
    }
  }
  
  export const _objectIs = typeof Object.is === 'function' ? Object.is : _objectIsFunc
  
  export const _isArguments = (function() {
    return Object.prototype.toString.call(arguments) === '[object Arguments]' ? function _isArguments(x: any) {
      return Object.prototype.toString.call(x) === '[object Arguments]'
    } : function _isArguments(x: any) {
      return _has('callee', x)
    }
  }())
  
  function _uniqContentEquals<A, B>(aIterator: Iterator<A>, bIterator: Iterator<B>, stackA: A[], stackB: B[]) {
    const a = _arrayFromIterator(aIterator)
  
    const b = _arrayFromIterator(bIterator)
  
    function eq(_a: A, _b: B) {
      return _equals(_a, _b, stackA.slice(), stackB.slice())
    } // if *a* array contains any element that is not included in *b*
  
    return !_includesWith(function(b, aItem) {
      return !_includesWith(eq, aItem, b)
    }, b, a)
  }
  
  export function _equals(a: any, b: any, stackA: any[], stackB: any[]): boolean {
    if (_objectIs(a, b)) {
      return true
    }
  
    const typeA = type(a)
  
    if (typeA !== type(b)) {
      return false
    }
  
    if (a == null || b == null) {
      return false
    }
  
    if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
      return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a)
    }
  
    if (typeof a.equals === 'function' || typeof b.equals === 'function') {
      return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a)
    }
  
    switch (typeA) {
      case 'Arguments':
      case 'Array':
      case 'Object':
        if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
          return a === b
        }
  
        break
  
      case 'Boolean':
      case 'Number':
      case 'String':
        if (!(typeof a === typeof b && _objectIs(a.valueOf(), b.valueOf()))) {
          return false
        }
  
        break
  
      case 'Date':
        if (!_objectIs(a.valueOf(), b.valueOf())) {
          return false
        }
  
        break
  
      case 'Error':
        return a.name === b.name && a.message === b.message
  
      case 'RegExp':
        if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
          return false
        }
  
        break
    }
  
    let idx = stackA.length - 1
  
    while (idx >= 0) {
      if (stackA[idx] === a) {
        return stackB[idx] === b
      }
  
      idx -= 1
    }
  
    switch (typeA) {
      case 'Map':
        if (a.size !== b.size) {
          return false
        }
  
        return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]))
  
      case 'Set':
        if (a.size !== b.size) {
          return false
        }
  
        return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]))
  
      case 'Arguments':
      case 'Array':
      case 'Object':
      case 'Boolean':
      case 'Number':
      case 'String':
      case 'Date':
      case 'Error':
      case 'RegExp':
      case 'Int8Array':
      case 'Uint8Array':
      case 'Uint8ClampedArray':
      case 'Int16Array':
      case 'Uint16Array':
      case 'Int32Array':
      case 'Uint32Array':
      case 'Float32Array':
      case 'Float64Array':
      case 'ArrayBuffer':
        break
  
      default:
        // Values of other types are only equal if identical.
        return false
    }
  
    const keysA = keys(a)
  
    if (keysA.length !== keys(b).length) return false
  
    const extendedStackA = stackA.concat([a])
    const extendedStackB = stackB.concat([b])
    idx = keysA.length - 1
  
    while (idx >= 0) {
      const key = keysA[idx]
  
      if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
        return false
      }
      idx -= 1
    }
  
    return true
  }
  
  const hasEnumBug = !Object.prototype.propertyIsEnumerable.call({ toString: null }, 'toString')
  const nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']
  
  const hasArgsEnumBug = (function() {
    'use strict'
    return Object.prototype.propertyIsEnumerable.call(arguments, 'length')
  }())
  
  const contains = function contains<T>(list: T[], item: T) {
    let idx = 0
  
    while (idx < list.length) {
      if (list[idx] === item) return true
      idx += 1
    }
  
    return false
  }
  
  export const keys = typeof Object.keys === 'function' && !hasArgsEnumBug
    ? _curry1(function keys<T>(obj: T) {
      return Object(obj) !== obj ? [] : Object.keys(<object>obj)
    })
    : _curry1(function keys<T>(obj: T) {
      if (Object(obj) !== obj) {
        return []
      }
  
      let prop, nIdx
      const ks = []
  
      const checkArgsLength = hasArgsEnumBug && _isArguments(obj)
  
      for (prop in obj) {
        if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
          ks[ks.length] = prop
        }
      }
  
      if (hasEnumBug) {
        nIdx = nonEnumerableProps.length - 1
  
        while (nIdx >= 0) {
          prop = nonEnumerableProps[nIdx]
          if (_has(prop, obj) && !contains(ks, prop)) ks[ks.length] = prop
          nIdx -= 1
        }
      }
  
      return ks
    })
  
  export const type = _curry1(function type(val: any): string {
    return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1)
  })
  
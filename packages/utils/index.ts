import { _arity, _curry1, _curry2, _clone, _isNumber, _equals } from './internals'
const once = _curry1(function once<T, F extends(...args: any[]) => T>(fn: F): F {
  let called = false
  let result: T
  return _arity(fn.length, function(this: any) {
    if (called) return result

    called = true
    result = fn.apply(this, arguments as any)
    return result
  } as F)
})

const clone = _curry1(function clone<T extends { clone?: Function }>(value: T): T {
  return value != null && typeof value.clone === 'function'
    ? value.clone()
    : _clone(value, [], [], true)
})

const range = _curry2(function range(from: any, to: any): number[] {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers')
  }

  const result = []
  let n = from

  while (n < to) {
    result.push(n)
    n += 1
  }
  return result
})

const omit = _curry2(function omit<T>(names: (keyof T)[], obj: T): Partial<T> {
  const result = {} as Partial<T>
  const index = {} as { [key in keyof T]: number }
  let idx = 0

  while (idx < names.length) {
    index[names[idx]] = 1
    idx += 1
  }

  for (const prop in obj) {
    if (!Object.prototype.hasOwnProperty.call(index, prop)) {
      result[prop] = obj[prop]
    }
  }

  return result
})

const pick = _curry2(function pick<T>(names: (keyof T)[], obj: any): Partial<T> {
  const result = {} as { [key in keyof T]: any }
  let idx = 0

  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]]
    }
    idx += 1
  }

  return result
})

const equals = _curry2(function equals(a: any, b: any) {
  return _equals(a, b, [], [])
})
export { once, clone, range, omit, pick, equals }

export function evalRight(fn: string) {
  const Fun = Function
  return new Fun('return ' + fn)()
}


/**
 * merge default option & transmit params option
 * if you try Object.assign is nothing or deep merge property
 */
export function __assignDefaultProperty<T extends object, U extends object>(defaultOptions: T, options: U): T & U {
  const __assign = Object.assign || function() {
    return [...new Set([...Object.keys(defaultOptions), ...Object.keys(options)])].reduce((newObj, k) => {
      if (__isObject(options[k as keyof typeof options]) && __isObject(defaultOptions[k as keyof typeof defaultOptions])) {
        (<any>newObj)[k as keyof typeof newObj] = __assignDefaultProperty(defaultOptions[k as keyof typeof defaultOptions] as T, options[k as keyof typeof options] as U)
        return newObj
      }
      (<any>newObj)[k] = options[k as keyof typeof options] || defaultOptions[k as keyof typeof defaultOptions]
      return newObj
    }, <T & U>{})
  }
  return __assign({}, defaultOptions, options)
}


function __isObject(val: any): boolean {
  return typeof val === 'object'
}


import { extend } from 'vee-validate'
import { required, alpha_num, integer, max, min } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'Пожалуйста, заполните это поле.'
})

extend('alpha_num', {
  ...alpha_num,
  message: 'Это поле только для букв и цифр'
})

extend('integer', {
  ...integer,
  message: 'Это поле только для чисел'
})

extend('max', {
  ...max,
  validate(value, { length }) {
    return value.length <= length
  },
  params: ['length'],
  message: 'Длина поля должна быть не больше {length}'
})

extend('min', {
  ...min,
  validate(value, { length }) {
    return value.length >= length
  },
  params: ['length'],
  message: 'Длина поля должна быть хотя бы {length}'
})

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max
  },
  params: ['min', 'max'],
  message: 'Длина поля должна быть от {min} до {max} символов'
})

// extend('min_value', {
//   ...required,
//   message: '   '
// })

// extend('numeric', {
//   ...required,
//   message: '   '
// })
// extend('oneOf', {
//   ...required,
//   message: '   '
// })
// extend('regex', {
//   ...required,
//   message: '   '
// })
// extend('required_if', {
//   ...required,
//   message: '   '
// })
import {_ps} from '../../services/helpers/componentHelpers'
import '../../services/rules'

export default {
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: _ps,
    name: _ps,
    label: _ps,
    placeholder: _ps,
    hint: _ps,
    veerules: {
      type: String | Object,
      default: ''
    },
    validation: {
      type: Object | String,
      default: () => {}
    },
    dispatchValidation: {
      type: Boolean,
      default: true
    },
    floated: {
      type: Boolean,
      default: true
    },
    state: {
      type: Object | String | Boolean,
      default: false
    }
  },
  data() {
    return {
      isModifed: false
    }
  },
  computed: {
    isEmpty() {
      return this.value.length === 0 ? true : false
    },
    isError() {
      return false
    },
    isSuccess() {
      return (!this.isError && !this.isEmpty && this.isModifed) ? true : false
    },
    classList() {
      return this.classListBase.join(' ')
    },
  },
  methods: {
    onInput(event) {      
      this.$emit('input', event.target.value);
    },
    onChange(event) { // Supports .lazy
      this.$emit('change', event.target.value);
    },
  },
}
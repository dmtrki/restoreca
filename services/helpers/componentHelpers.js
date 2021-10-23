const _ps = {
  type: String,
  default: ''
}

const _pbf = {
  type: Boolean,
  default: false
}

const _themeProps = {
  theme: {
    type: String | Boolean,
    default: false
  },
  primary: _pbf,
  secondary: _pbf,
  accent: _pbf,
  link: _pbf,
  info: _pbf,
}

const _stateProps = {
  success: _pbf,
  warning: _pbf,
  error: _pbf,
}

const _sizeProps = {
  size: {
    type: String | Boolean,
    default: false
  },
  small: _pbf,
  large: _pbf,
  xsmall: _pbf,
  smallest: _pbf,
  xlarge: _pbf,
}

const _axisOffsetProps = {
  offsetY: {
    type: Number,
    default: 0
  },
  offsetX: {
    type: Number,
    default: 0
  }
}

export {
  _pbf,
  _ps,
  _themeProps,
  _stateProps,
  _sizeProps,
  _axisOffsetProps
}
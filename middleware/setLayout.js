export default function (context) {
  context.layout = context.$device.isDesktop ? 'desktop' : 'default'
}
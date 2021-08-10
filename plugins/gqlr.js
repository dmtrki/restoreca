export default ({$graphql}, inject) => {
  inject('gqlr', (query, variables) => $graphql.default.request(query, variables))
  inject('log', msg => console.log(msg))
}
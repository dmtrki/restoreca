export default function mixin() {
  return {
    data() {
      return {
        isLoading: false,
      };
    },
    methods: {
      async $gql(request) {
        try {
          this.isLoading = true;

          const res = await this.$graphql.request(request);

          return res;
        } catch (error) {
          throw new Error(error.message);
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
}
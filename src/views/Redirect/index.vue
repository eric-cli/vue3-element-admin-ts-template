<script>
  export default {
    beforeMount: () => {
      const route = useRoute()
      const router = useRouter()
      const {
        params: { path },
        query
      } = route
      router.replace({
        path: `/${path}`,
        query
      })
    },
    render(h) {
      return h() // avoid warning message
    }
  }
</script>

<style lang="scss" scoped></style>

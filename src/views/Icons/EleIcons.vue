<script>
  export default {
    name: "EleIcons",
    functional: true,
    props: {
      icon: {
        type: Object,
        default: {}
      }
    },
    render() {
      return this.icon.render()
    }
  }
</script>

<style scoped>
  .icon {
    color: currentColor;
    width: 1em;
    height: 1em;
  }
</style>

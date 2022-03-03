<script lang="ts">
  import { formateElIcons } from "@/utils/"

  export default defineComponent({
    props: {
      icon: {
        type: String,
        default: ""
      },
      title: {
        type: String,
        default: ""
      }
    },
    render(props) {
      const { title, icon } = props
      const vnodes: any = []
      if (icon) {
        if (icon.includes("el-icon")) {
          vnodes.push(
            h(
              resolveComponent("el-icon"),
              {
                class: "sub-el-icon"
              },
              h(resolveComponent(formateElIcons(icon)))
            )
          )
        } else {
          vnodes.push(
            h(resolveComponent("svg-icon"), {
              "icon-class": icon
            })
          )
        }
      }

      if (title) {
        vnodes.push(h("span", {}, title))
      }
      return vnodes
    }
  })
</script>

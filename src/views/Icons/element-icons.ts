import * as Icons from "@element-plus/icons-vue"

interface elementItems {
  name: string
  icon: any
}

const elementIcons: elementItems[] = []
// for (const [key, value] of Object.entries(Icons)) {
//   console.log(key, value)

//   const items: elementItems = {
//     name: key,
//     icon: value
//   }
//   elementIcons.push(items)
// }
Object.entries(Icons).forEach((ele) => {
  const items: elementItems = {
    name: ele[0],
    icon: ele[1]
  }
  elementIcons.push(items)
})
export default elementIcons

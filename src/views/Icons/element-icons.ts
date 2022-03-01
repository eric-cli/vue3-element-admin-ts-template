interface elementItems {
  name: string
  icon: any
}

let elementIcons: elementItems[] = []

import * as Icons from "@element-plus/icons-vue"
for (let [key, value] of Object.entries(Icons)) {
  const items: elementItems = {
    name: key,
    icon: value
  }
  elementIcons.push(items)
}

export default elementIcons

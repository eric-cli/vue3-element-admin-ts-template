let elementIcons = [];

import * as Icons from "@element-plus/icons-vue";
for (let [key, value] of Object.entries(Icons)) {
  elementIcons.push({
    name: key,
    icon: value,
  });
}

export default elementIcons;

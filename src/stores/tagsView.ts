import { defineStore } from "pinia"

const cachedViews: any[] = []
const visitedViews: any[] = []

const useTagsViewStore = defineStore({
  id: "tagsView", // id必填，且需要唯一
  state: () => {
    return {
      visitedViews,
      cachedViews
    }
  },
  actions: {
    addVisitedView(view: any) {
      // console.log(111, view);

      if (this.visitedViews.some((v: { path: any }) => v.path === view.path)) return
      this.visitedViews.push({ ...view, title: view.meta.title || "no-name" })
    },
    addCachedView(view: any) {
      if (this.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name)
      }
    },
    updateVisitedView(view: any) {
      this.visitedViews.forEach((v) => {
        if (v.path === view.path) {
          v = Object.assign(v, view)
        }
      })
    },
    delView(view: any) {
      return new Promise((resolve) => {
        this.delVisitedView(view)
        this.delCachedView(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delOthersViews(view: any) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view)
        this.delOthersCachedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.cachedViews = []
        resolve([...this.cachedViews])
      })
    },
    delAllVisitedViews() {
      return new Promise((resolve) => {
        // keep affix tags
        const affixTags = this.visitedViews.filter(
          (tag: { meta: { affix: any } }) => tag.meta.affix
        )
        this.visitedViews = affixTags
        resolve([...this.visitedViews])
      })
    },
    delAllViews() {
      return new Promise((resolve) => {
        this.delAllVisitedViews()
        this.delAllCachedViews()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delOthersCachedViews(view: any) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name)
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = []
        }
        resolve([...this.cachedViews])
      })
    },
    delOthersVisitedViews(view: any) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v: { meta: { affix: any }; path: any }) => {
          return v.meta.affix || v.path === view.path
        })
        resolve([...this.visitedViews])
      })
    },
    delVisitedView(view: any) {
      return new Promise((resolve) => {
        this.visitedViews.forEach((ele, i) => {
          // TODO 错误验证
          if (ele.path === view.path) {
            this.visitedViews.splice(i, 1)
          }
        })
        resolve([...this.visitedViews])
      })
    },
    delCachedView(view: any) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name)
        index > -1 && this.cachedViews.splice(index, 1)
        resolve([...this.cachedViews])
      })
    },
    addView(view: any) {
      this.addVisitedView(view)
      this.addCachedView(view)
    }
  }
})

export default useTagsViewStore

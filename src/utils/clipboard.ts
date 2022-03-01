const { isSupported, copy } = useClipboard()

function clipboardSuccess() {
  ElMessage({
    message: "Copy successfully",
    type: "success",
    duration: 1500
  })
}

function clipboardError() {
  ElMessage({
    message: "Copy failed",
    type: "error"
  })
}

export default function handleClipboard(text) {
  console.log(text)

  if (!isSupported) {
    ElMessage({
      message: "浏览器不支持，请更换浏览器后重试",
      type: "error"
    })
    return
  }

  copy(text)
    .then(() => {
      clipboardSuccess()
    })
    .catch(() => {
      clipboardError()
    })
}

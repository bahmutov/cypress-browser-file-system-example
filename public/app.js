let fileHandle
document.getElementById('read-file').addEventListener('click', async () => {
  // Destructure the one-element array.
  ;[fileHandle] = await window.showOpenFilePicker()
  const file = await fileHandle.getFile()
  const contents = await file.text()
  document.getElementById('output').textContent = contents
})

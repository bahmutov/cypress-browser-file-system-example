document.getElementById('read-file').addEventListener('click', async () => {
  let fileHandle
  // Destructure the one-element array.
  try {
    ;[fileHandle] = await window.showOpenFilePicker()
    const file = await fileHandle.getFile()
    const contents = await file.text()
    document.getElementById('output').textContent = contents
  } catch (err) {
    console.log(err)
    alert('Error: ' + err.message)
  }
})

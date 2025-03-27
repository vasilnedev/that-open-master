const showModal= id => {
  const modal = document.getElementById(id)
  if (modal) {
    modal.showModal()
  } else {
    console.warn("The provided modal wasn't found. ID: ", id)
  }
}

// This document object is provided by the browser, and its main purpose is to help us interact with the DOM.
const newProjectBtn = document.getElementById("new-project-btn")
if (newProjectBtn) {
  newProjectBtn.addEventListener("click", () => showModal("new-project-modal"))
} else {
  console.warn("New projects button was not found")
}

const projectForm = document.getElementById("new-project-form")
if (projectForm) {
  projectForm.addEventListener("reset", (e) => {
    projectForm.parentElement.close()
  })
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let msg='You enerered the following data:\n'
    const formData = new FormData(projectForm)
    formData.forEach((value, key) => {
      msg+=`${key}: ${value}\n`
    })
    projectForm.reset()
    alert(msg)
    projectForm.parentElement.close()
  })
} else {
	console.warn("The project form was not found. Check the ID!")
}

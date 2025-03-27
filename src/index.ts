import { IProject , ProjectStatus , UserRole } from "./classes/Project.ts"
import { ProjectsManager } from "./classes/ProjectsManager.ts"

// This function receives the ID of a modal dialog and toggles its visibility.
const toggleModal = ( id:string ) => {
  const modal = document.getElementById( id )
  if ( modal && modal instanceof HTMLDialogElement ) {
    modal.open ? modal.close() : modal.showModal()
  } else {
    console.warn("The provided modal wasn't found. ID: ", id)
  }
}

const projectsListUI = document.getElementById( "projects-list" ) as HTMLDivElement
const projectsManager = new ProjectsManager( projectsListUI ) 

// This document object is provided by the browser, and its main purpose is to help us interact with the DOM.
const newProjectBtn = document.getElementById("new-project-btn")
if (newProjectBtn) {
  newProjectBtn.addEventListener("click", () => toggleModal("new-project-modal"))
} else {
  console.warn("New projects button was not found")
}

const projectForm = document.getElementById("new-project-form")
if ( projectForm && projectForm instanceof HTMLFormElement ) {
  // Close the dialog when press Cancel button
  projectForm.addEventListener("reset", e => {
    if( projectForm.parentElement && projectForm.parentElement instanceof HTMLDialogElement ){
      toggleModal("new-project-modal")
    }
  })
  
  // Handle the form submission
  projectForm.addEventListener("submit", e => {
    e.preventDefault()
    const formData = new FormData( projectForm )
    const data:IProject = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as ProjectStatus,
      userRole: formData.get("userRole") as UserRole,
      finishDate: new Date( formData.get("finishDate") as string )
    }
    const project = projectsManager.newProject( data )
    console.log( project )
    projectForm.reset()
  })
} else {
	console.warn("The project form was not found. Check the ID!")
}

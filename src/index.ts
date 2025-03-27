import { IProject , ProjectStatus , UserRole } from "./classes/Project.ts"
import { ProjectsManager } from "./classes/ProjectsManager.ts"

// Toggle modal dialog visibility.
const toggleModal = ( id:string ) => {
  const modal = document.getElementById( id )
  if ( modal && modal instanceof HTMLDialogElement ) {
    modal.open ? modal.close() : modal.showModal()
  } else {
    console.warn("The provided modal wasn't found. ID: ", id)
  }
}

// Container to render all projects and initialize the ProjectsManager.
const projectsListUI = document.getElementById( "projects-list" ) as HTMLDivElement
const projectsManager = new ProjectsManager( projectsListUI ) 

// New project button event handling - open the new project form.
const newProjectBtn = document.getElementById("new-project-btn")
if (newProjectBtn) {
  newProjectBtn.addEventListener("click", () => toggleModal("new-project-modal"))
} else {
  console.warn("New projects button was not found")
}

// New project form events handling
const projectForm = document.getElementById("new-project-form")
if ( projectForm && projectForm instanceof HTMLFormElement ) {

  // Reset event when Cancel button is pressed. Clears and closes the form.
  projectForm.addEventListener("reset", e => toggleModal("new-project-modal"))
  
  // Submit event when Accept button is pressed
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
    projectForm.reset() // Triggers the reset event to clear the form and close the form
  })
} else {
	console.warn("The project form was not found. Check the ID!")
}

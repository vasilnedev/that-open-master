import { IProject , ProjectStatus , UserRole } from "./classes/Project.ts"
import { ProjectsManager } from "./classes/ProjectsManager.ts"
import errorMsg from "./classes/ErrorMsg.ts"

// Set the default date for the finishDate input field to today's date.
// Get today's date in the format YYYY-MM-DD
const today = new Date().toISOString().split('T')[0]
const dateInput = document.querySelector('input[name="finishDate"]') as HTMLInputElement
if (dateInput) {
  dateInput.setAttribute('min', today); // Set the minimum date to today
  dateInput.setAttribute('value', today); // Set the default value to today
} else {
  console.warn("The date input was not found. Check the ID!")
}

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
    try {
      const project = projectsManager.newProject( data )
      projectForm.reset() // Triggers the reset event to clear the form and close the form
    } catch (error) {
      console.error( error )
      errorMsg.showError( `Creating the project: ${error}` )
    }
  })
} else {
	console.warn("The project form was not found. Check the ID!")
}

// Export and import projects buttons event handling
const exportProjectsBtn = document.getElementById("export-projects-btn")
if ( exportProjectsBtn ) {
  exportProjectsBtn.addEventListener("click", e => projectsManager.exportToJSON() )
} else {
	console.warn("The export projects button was not found. Check the ID!")
}

const importProjectsBtn = document.getElementById("import-projects-btn")
if ( importProjectsBtn ) {
  importProjectsBtn.addEventListener("click", e => projectsManager.importFromJSON() )
} else {
	console.warn("The import projects button was not found. Check the ID!")
}

// Main page navigation buttons event handling
const switchPage = pageId => {
  const pageIds = [
    "projects-page",
    "project-details",
    "users-page"
  ]
  if(!pageIds.includes(pageId)) return
  pageIds.forEach( id => {
    const page = document.getElementById( id )
    if( !page ) return
    if( id === pageId ) {
      page.style.display = "flex"
    } else {
      page.style.display = "none"
    }
  })
}

const projectsNavBtn = document.getElementById("projects-nav-btn")
if ( projectsNavBtn ) {
  projectsNavBtn.addEventListener("click", e => switchPage( "projects-page" )
)} else {
	console.warn("The projects navigation button was not found. Check the ID!")
}

const usersNavBtn = document.getElementById("users-nav-btn")
if ( usersNavBtn ) {
  usersNavBtn.addEventListener("click", e => switchPage( "users-page" )
)} else {
	console.warn("The users navigation button was not found. Check the ID!")
}

// Edit project button event handling - open the Edit Project Form.
const editProjectBtn = document.getElementById("edit-project-btn")
if (editProjectBtn) {
  editProjectBtn.addEventListener("click", () => toggleModal("edit-project-modal"))
} else {
  console.warn("Edit projects button was not found")
}

// Edit project form events handling
const editForm = document.getElementById("edit-project-form")
if ( editForm && editForm instanceof HTMLFormElement ) {
  
  // Submit event when Accept button is pressed
  editForm.addEventListener("submit", e => {
    e.preventDefault()
    toggleModal("edit-project-modal")
    if( e && e.submitter && e.submitter['name'] === 'accept' ){
      const formData = new FormData( editForm )

      const data = {
        id: formData.get("id") as string,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        status: formData.get("status") as ProjectStatus,
        userRole: formData.get("userRole") as UserRole,
        finishDate: new Date( formData.get("finishDate") as string ),
        cost: parseInt( formData.get("cost") as string ),
        progress: parseInt( formData.get("progress") as string ),
      }
      try { 
        const project = projectsManager.deleteProject( data.id )
        projectsManager.newProject( data )
        switchPage( "projects-page" )
      } catch (error) {
        console.error( error )
        errorMsg.showError( `Editing project: ${error}` )
      }
    }else{
      console.warn("The form was cancelled")
    }
  })
} else {
	console.warn("The project form was not found. Check the ID!")
}


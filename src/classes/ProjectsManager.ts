import { Project, IProject } from './Project'

// The ProjectsManager class is responsible for managing the list of projects
// and rendering them in the UI.
export class ProjectsManager {
  list: Project[] = []

  ui: HTMLDivElement

  constructor( container: HTMLDivElement ) {

    // UI container to render the projects
    this.ui = container

    // Create the initial project
    const initialProject = new Project({
      name: "Initial Project",
      description: "This is the first project",
      status: "active",
      userRole: "developer",
      finishDate: new Date()
    })
    this.newProject( initialProject )
  }

  // A method to add a new project to the list
  newProject( data: IProject ) {
    const project = new Project( data )
    this.ui.appendChild( project.ui )
    this.list.push( project )
    return project
  }
}

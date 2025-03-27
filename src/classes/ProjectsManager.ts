import { Project, IProject , ProjectStatus , UserRole } from './Project'

export class ProjectsManager {
  list: Project[] = []

  ui: HTMLDivElement

  constructor( container: HTMLDivElement ) {
    this.ui = container
    const initialProject = new Project({
      name: "Initial Project",
      description: "This is the first project",
      status: "active",
      userRole: "developer",
      finishDate: new Date()
    })
    this.newProject( initialProject )
  }

  newProject( data: IProject ) {
    const project = new Project( data )
    this.ui.appendChild( project.ui )
    this.list.push( project )
    return project
  }
}

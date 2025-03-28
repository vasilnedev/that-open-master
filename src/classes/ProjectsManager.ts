import { Project, IProject } from './Project'
import errorMsg from "./ErrorMsg.ts"

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
    const projectNames = this.list.map( project => project.name )
    const nameInUse = projectNames.includes( data.name )
    if( nameInUse ) throw new Error( `The project name "${data.name}" is already in use` )
    const project = new Project( data )
    this.ui.appendChild( project.ui )
    this.list.push( project )
    return project
  }

  getProject( id:string ){
    return this.list.find( project => project.id === id )
  }

  getProjectByName( name:string ){
    return this.list.find( project => project.name === name )
  }

  getTotalCost(){
    return this.list.reduce( ( total, project) => total + project.cost, 0 )
  }

  deleteProject( id:string ){
    const index = this.list.findIndex( project => project.id === id )
    if( index === -1 ) return
    this.list[index].ui.remove()
    this.list.splice( index, 1 )
  }

  exportToJSON( fileName:string = "projects.json" ){
    const json = JSON.stringify( this.list, null ,2)
    const blob = new Blob( [json], { type: "application/json" } )
    const url = URL.createObjectURL( blob )
    const link = document.createElement( "a" )
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL( url )
  }

  importFromJSON(){
    const input = document.createElement( "input" )
    input.type = "file"
    input.accept = "application/json"
    const reader = new FileReader()
    reader.addEventListener( "load", e => {
      const json = reader.result
      if( !json ) return
      this.list = []         // clear the list
      this.ui.innerHTML = "" // clear the UI
      const projects: Project[] = JSON.parse( json as string )
      for( const project of projects ){
        try {
          project.ui = undefined as unknown as HTMLDivElement // Clear the UI from JSON
          this.newProject( project )
        } catch (error) {
          console.error( error )
          errorMsg.showError( `Uploading projects: ${error}` )
        }
      }
    })
    input.addEventListener( "change", e => {
      const fileList = input.files
      if( !fileList ) return
      reader.readAsText( fileList[0] )
    })
    input.click()
  }

}

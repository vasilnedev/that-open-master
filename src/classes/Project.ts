import { v4 as uuidv4 } from 'uuid'

export type ProjectStatus = "pending" | "active" | "finished"
export type UserRole = "architect" | "engineer" |"developer"

export interface IProject{
  name: string
  description: string
  status: "pending" | "active" | "finished"
  userRole: "architect" | "engineer" |"developer"
  finishDate: Date
}

// The Project class represents a project with its properties and methods.
// It also contains the UI elements to render the project in the DOM.
export class Project implements IProject{
  name: string
  description: string
  status: ProjectStatus
  userRole: UserRole
  finishDate: Date
  cost: number = 1000
  progress: number = 0
  id: string

  ui: HTMLDivElement

  constructor( data: IProject ){
    this.name = data.name
    this.description = data.description
    this.status = data.status
    this.userRole = data.userRole
    this.finishDate = data.finishDate
    this.id = uuidv4()
    this.render()
  }

  render() {
    if( this.ui ) return // Avoid duplicating the UI
    this.ui = document.createElement("div")
    this.ui.className = "project-card"
    this.ui.innerHTML = `
      <div class="card-header">
        <p style="background-color: #ca8134; padding: 10px; border-radius: 8px; aspect-ratio: 1;">HC</p>
        <div>
          <h5>${ this.name }</h5>
          <p>${ this.description}</p>
        </div>
      </div>
      <div class="card-content">
        <div class="card-property">
          <p style="color: #969696;">Status</p>
          <p>${ this.status }</p>
        </div>
        <div class="card-property">
          <p style="color: #969696;">Role</p>
          <p>${ this.userRole}</p>
        </div>
        <div class="card-property">
          <p style="color: #969696;">Cost</p>
          <p>$${ this.cost }</p>
        </div>
        <div class="card-property">
          <p style="color: #969696;">Estimated Progress</p>
          <p>${ this.progress}%</p>
        </div>
      </div>
    `
  }
}
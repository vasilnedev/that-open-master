/*
  The ErrorMsg class adds an 'auto popover div' element to the body. 
  Refer to the link below about the popovers:
  https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover

  The sole property that the class holds a reference to the popover element.
  The sole method is to show the popover i.e. inside a 'catch' statement.
  The auto popovers can be closed by clicking anywhere on the screen or by pressing the Esc key 
  so no additional event handlers will be created.

  The module will export a singelton object, which can be imported by any module that needs to catch errors, 
  without the need to create an instance of the ErrorMsg class.
*/

class ErrorMsg {
  ui: HTMLElement

  constructor(  ) {
    let errorMessage = document.createElement("div")
    errorMessage.popover = "auto"
    errorMessage.className = "error-msg" // .error-msg class is set in the main style.css file
    this.ui = document.body.appendChild( errorMessage )
  }

  showError( message: string ) {
    this.ui.innerHTML = `
      <div style="margin: 10px; display: flex; align-items: center; gap: 10px; justify-content: center;">
        <span class="material-icons-round">error</span>
        <p>${ message }</p>
      </div>
    `
    this.ui.showPopover()
  }
}

// Create a singelton of the ErrorMsg class to export
const errorMsg = new ErrorMsg()

export default errorMsg

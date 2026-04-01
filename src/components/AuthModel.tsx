import React from 'react'
/*open: boolean → true/false (is modal open?)
onClose: () => void → a function with no return
 This is called Type Definition (TypeScript)*/ 
type propType={
    open:boolean, 
    onClose:()=>void
}//Destructuring props which Extract values directly from object
function AuthModel({ open, onClose }:propType) {
  return (
    <div>
      
    </div>
  )
}
/*Parent controls state (open)
Passes it as prop
Child (AuthModel) reads it
When close button clicked → onClose() runs
Parent updates state → modal closes */
export default AuthModel

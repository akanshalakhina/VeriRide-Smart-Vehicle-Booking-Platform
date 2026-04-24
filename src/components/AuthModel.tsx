"use client";
import { motion } from "motion/react";
import { MotionConfig } from "motion/react";
import React, { use } from "react";
/*open: boolean → true/false (is modal open?)
onClose: () => void → a function with no return
 This is called Type Definition (TypeScript)*/
type propType = {
  open: boolean;
  onClose: () => void;
}; //Destructuring props which Extract values directly from object
function AuthModel({ open, onClose }: propType) {
  return (
    <>
      {open && (<>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md"
        >
        </motion.div>
        </>)}
      
    </>
  );
}
/*Parent controls state (open)
Passes it as prop
Child (AuthModel) reads it
When close button clicked → onClose() runs
Parent updates state → modal closes */
export default AuthModel;

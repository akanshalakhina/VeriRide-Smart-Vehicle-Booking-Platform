"use client";
import { motion } from "motion/react";
import { MotionConfig } from "motion/react";
import React, { use } from "react";
import { X } from "lucide-react";
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
          <motion.div
          initial={{ y: 40,scale:0.95, opacity: 0 }}
          animate={{ y: 0, opacity: 1, scale:1 }}
          transition={{ duration: 0.35,ease:"easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black">
            <div className="absolute right-4 top-4 text-gray-500 hover:text-black transition" onClick={onClose}>
            <X size={20}/>
            </div>
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-extrabold trackking-wideset">VERIRIDE</h1>
              <p className="mt-1 text-xs text-gray-500">Premium Vechile Booking</p>
              
              
          
            </div>
            </div>

          </motion.div>
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
export default AuthModel;

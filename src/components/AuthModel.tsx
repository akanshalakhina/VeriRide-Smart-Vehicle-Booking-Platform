"use client";

import { AnimatePresence, motion } from "motion/react";
import { MotionConfig } from "motion/react";
import React, { useState } from "react";
import { Mail, X, Lock, User, CircleDashed } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { signIn } from "next-auth/webauthn";
import { useSession } from "next-auth/react";
/*open: boolean → true/false (is modal open?)
onClose: () => void → a function with no return
 This is called Type Definition (TypeScript)*/
type propType = {
  open: boolean;
  onClose: () => void;
}; //Destructuring props which Extract values directly from object
type setType = "login" | "signup" | "Otp"; //Union type for step state

function AuthModel({ open, onClose }: propType) {
  const [step, setStep] = useState<setType>("login");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const[otp, setOtp]=useState(["","","","","","","",""]);
  
  const session=useSession();
  console.log(session);
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      console.log(data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      setErr(error.response.data.message ?? "Something went wrong ");
    }
  };
  const handleLogin = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    console.log(res);
  };
  const handleGoogleLogin = async()=>{
    await signIn("google");

  }

  return (
    <AnimatePresence>
      {" "}
      /*AnimatePresence: Animate presence of components (mounting/unmounting)*/
      {open && (
        <>
          {" "}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 40, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            >
              <div className="relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black">
                <div
                  className="absolute right-4 top-4 text-gray-500 hover:text-black transition"
                  onClick={onClose}
                >
                  <X size={20} />
                </div>
                <div className="mb-6 text-center">
                  <h1 className="text-3xl font-extrabold tracking-wideset">
                    VERIRIDE
                  </h1>
                  <p className="mt-1 text-xs text-gray-500">
                    Premium Vehicle Booking
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition"
                  onClick={handleGoogleLogin}
                >
                  <Image
                    src="/google.png"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Continue with Google
                </button>
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-black/10" />
                  <div className="text-xs text-gray-500">OR</div>
                  <div className="flex-1 h-px bg-black/10" />
                </div>
                <div>
                  {step == "login" && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      <h1 className="text-xl font-semibold">Welcome back</h1>
                      <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail size={18} className="text-gray-500" />
                          <input
                            type="text"
                            placeholder="Email"
                            className="bg-transparent border-none focus:outline-none text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock size={18} className="text-gray-500" />
                          <input
                            type="password"
                            placeholder="Password"
                            className="bg-transparent border-none focus:outline-none text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                          />
                        </div>
                        <button
                          className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
                          onClick={handleLogin}
                        >
                          {!loading ? (
                            "Log In"
                          ) : (
                            <CircleDashed
                              size={18}
                              color="white"
                              className="animate-spin"
                            />
                          )}
                          Login
                        </button>
                      </div>
                      <p className=" mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <span
                          onClick={() => setStep("signup")}
                          className="text-black font-medium hover:underline cursor-pointer"
                        >
                          Sign up
                        </span>
                      </p>
                    </motion.div>
                  )}
                  {step == "signup" && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      <h1 className="text-xl font-semibold">
                        Create an account
                      </h1>
                      <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <User size={18} className="text-gray-500" />
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-transparent border-none focus:outline-none text-sm"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                          />
                        </div>
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail size={18} className="text-gray-500" />
                          <input
                            type="text"
                            placeholder="Email"
                            className="w-full bg-transparent border-none focus:outline-none text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock size={18} className="text-gray-500" />
                          <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-transparent border-none focus:outline-none text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                          />
                        </div>
                        {err && <p className="text-red-500 text-sm">*{err}</p>}
                        <button
                          className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex-justify-center items-center gap-2"
                          disabled={loading}
                          onClick={handleSignUp}
                        >
                          {!loading ? (
                            "Sign Up"
                          ) : (
                            <CircleDashed
                              size={18}
                              color="white"
                              className="animate-spin"
                            />
                          )}
                          Sign Up
                        </button>
                      </div>

                      <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <div
                          onClick={() => setStep("login")}
                          className="text-black font-medium hover:underline cursor-pointer"
                        >
                          Login
                        </div>
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
/*Parent controls state (open)
Passes it as prop
Child (AuthModel) reads it
When close button clicked → onClose() runs
Parent updates state → modal closes */
export default AuthModel;

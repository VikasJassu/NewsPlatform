import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSignupData } from "../redux/slices/authSlice"
import { signUp } from "../services/InvokingAPIs"


function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const [formData, setFormData] = useState({
   
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { name, email, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()
    

    const {name, email, password, confirmPassword} = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    console.log("printing formData",formData);

    dispatch(setSignupData(formData))
    dispatch(signUp(name, email, password, confirmPassword, navigate));

    console.log("k haal h");
   
    // Reset
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }

 

  return (
    <div className="w-5/12 max-sm:w-9/12 border border-red-300 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-opacity-30 p-14 py-20 max-sm:px-3 max-sm:py-5 flex mx-auto translate-y-16">
     
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4 ">
        <div className="flex gap-x-4">
          <label>
            <input
              required
              type="text"
              name="name"
              value={name}
              onChange={handleOnChange}
              placeholder="Enter Your Name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className=" sm:min-w-[25.70rem] max-sm:w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        <label className="w-full">
         
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
           
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[12px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
           
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[12px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-500 hover:bg-yellow-50 transition-all py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
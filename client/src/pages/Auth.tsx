import { useState } from "react";

const Auth = () => {
  const [loginForm, _] = useState<boolean>(true);

  const handleSubmit = () => {
    if(loginForm){

    } else {
      
    }
  }

  return (
    <div className="border-2 bg-slate-100 flex flex-col h-screen items-center justify-center">
      <h2 className="text-3xl mx-auto my-4">{loginForm ? "Login" : "Register"}</h2>
      <form action="" method="post" className="flex flex-col w-1/3 mx-auto">
        {!loginForm && 
          <input 
            type="text" 
            name="username" 
            id="username" 
            placeholder="Username"
            className="border-2 border-black rounded-md p-2 my-3"/>}
        <input 
          type="text" 
          name="email" 
          id="email" 
          placeholder="Email"
          className="border-2 border-black rounded-md p-2 my-3"/>
        <input 
          type="text" 
          name="password" 
          id="password" 
          placeholder="Password"
          className="border-2 border-black rounded-md p-2 my-3"
          autoComplete="off" />
        <button 
          className="bg-black text-white inline-block w-fit mx-auto mt-2 px-3 py-1 rounded-md"
          onClick={handleSubmit}>
            {loginForm ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  )
}

export default Auth
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toast";

function Signin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    if(auth_token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const signinHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ user_name: userName,
          password}),
        headers: { "Content-type": "application/json" }
      });
      const data = await res.json();
      if(res.ok) {
        toast("Logged in");
        localStorage.setItem("auth_token", data.data);
        window.location.href = "/dashboard";
      } else {
        toast(data.message);
      }
    } catch (err: any) {
      toast.info(err.message)
      console.log(err);
    }

  }

  return (
    <div className="bg-[url('/images/bg-library.jpg')] bg-center bg-cover">
      <div className="min-h-screen w-full bg-black/75 py-8 px-4">
        <Link to="/"><h1 className="text-white text-3xl text-center">ATGS</h1></Link>
        <form action="" onSubmit={signinHandler} method="post" className="max-w-sm mx-auto bg-white rounded py-6 px-4 mt-8">
          <p className="text-center text-xl">Login</p>
          <input
            type="text"
            name="uname"
            placeholder="Username"
            className="w-full rounded border border-zinc-300 p-2 my-2"
            id="username"
            onChange={e => setUserName(e.target.value)}
            required
          />
          <input
            type="password"
            name="pass"
            placeholder="Password"
            className="w-full rounded border border-zinc-300 p-2 my-2"
            id="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button name="login" type="submit" className="text-center w-full bg-zinc-900 text-white rounded py-1">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;

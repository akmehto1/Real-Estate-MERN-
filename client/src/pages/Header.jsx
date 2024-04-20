import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Header() {

  const currentUser=useSelector(state=>state.user).currentUser;
  console.log(currentUser);

  return (
    <header>
    <div className="bg-slate-300 flex justify-around">
      <h1 className="text-sm font-bold font-size-300 max-w-6xl  p-4">
        <span className="text-blue-600   ">Real </span>
        <span>Estate</span>
      </h1>
      <form className="border bg-slate-300 p-4 rounded-lg">
        <input placeholder="Search... "></input>
      </form>
      <div className="flex items-center space-x-2">
      
      <Link className="p-2 text-fuchsia-600 font-semibold " to={"/home"}><p>Home</p></Link>
      <Link   className="p-2 text-fuchsia-600 font-semibold " to={"/sign-up"}><p>Signup</p></Link>
      {
        currentUser? <Link  className="p-2 text-fuchsia-600 font-semibold " to={"/profile"}>  <p>profile</p></Link>:
        <Link  className="p-2 text-fuchsia-600 font-semibold " to={"/sign-in"}> <p>Signin</p></Link>
      }
  
    
      </div>
      
    </div>
    
    </header>
  )
}

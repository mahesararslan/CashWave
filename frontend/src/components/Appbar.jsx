import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export function Appbar({ letter }) {
    const navigate = useNavigate();

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                <div className="flex"> 
                    <img className="mt-1 w-5 h-5" src={logo} alt="" />
                    <h1 className="pl-2">CashWave</h1>
                </div>
            </div>
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {letter}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full mr-4">
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/signin");
                    }} type="button" className="mt-2 mr-2 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                        <svg className="w-4 h-4 me-2 -ms-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

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
            </div>
        </div>
    );
}

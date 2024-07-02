import { useNavigate, useSearchParams } from "react-router-dom";
import doneImg from "../assets/verify.png";

export function MoneySent() {
  const [searchParams] = useSearchParams(); // to get access to query parameters, to send the money to the right person.
  const amount = searchParams.get("amount");
  const name = searchParams.get("name");

  const navigate = useNavigate();

  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
          <img src={doneImg} alt="done-img" className="h-20 w-20 mb-4"/>
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Amount Sent: ${amount}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Date: {date} <br /> Time: {time} <br /> Money Sent to {name}
          </p>
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
          type="button"
          className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}

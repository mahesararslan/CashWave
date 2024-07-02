import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const useFetchHistory = () => {
    const [loading, setLoading] = useState(true);
    const [historyDetails, setHistoryDetails] = useState(null);
  
    const getHistory = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/history", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setHistoryDetails(response.data.userData.history);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      getHistory();
    }, []);
  
    return {
      loading,
      historyDetails,
    };
  };

export const HistoryComp = () => {
  const details = useFetchHistory();
  console.log(details);

  if (details.historyDetails === null) {
    return "Loading....";
  }

  return (
    <div className="w-full col-span-5 flex flex-col items-center px-5">
      <h1 className="text-xl py-5  font-bold">History</h1>
      {details.historyDetails.map((detail) => (
        <div
          key={detail._id}
          className="w-full flex items-center justify-between shadow-md py-5 border px-3 mb-2"
        >
          <div className="flex flex-col justify-between ">
            <div className="font-bold ">
              <h3>{detail.name}</h3>
            </div>
            <div>{dayjs(detail.timestamp).format("MMM, ddd D h:mm A")}</div>
          </div>

          <div className={`${detail.sent ? "text-green-500 font-bold" : "text-red-500 font-bold"}`}>
            Amount : <span className="font-bold">$</span>
            {detail.amount}
          </div>
        </div>
      ))}
    </div>
  );
};

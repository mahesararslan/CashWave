import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Authentication() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/signin");
            return; 
        }

        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(function(response) {
            if (response.data.balance) {
                navigate("/dashboard");
            } else {
                navigate("/signin");
            }
        })
        .catch(function(error) {
            console.log("Error fetching balance:", error);
            navigate("/signin"); // Navigate to signin page on error
        });
    }, []);

    return <div></div>;
}

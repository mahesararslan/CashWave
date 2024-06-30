import axios from "axios"
import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [firstLetterOfName, setFirstLetterOfName] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                // Round the balance to two decimal places
                const roundedBalance = parseFloat(response.data.balance).toFixed(2);
                setBalance(roundedBalance);
                setName(response.data.name)
                const letter = response.data.name.charAt(0).toUpperCase();
                setFirstLetterOfName(letter);
            })
    })

    return <div>
        <Appbar letter={firstLetterOfName}/>
        <div className="m-8">
            <Balance balance={balance} />
            <Users name={name} />
        </div>
    </div>
}
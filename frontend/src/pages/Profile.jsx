import axios from "axios"
import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Sidebar } from "../components/Sidebar"
import { UpdateProfile } from "../components/UpdateProfile"

export function Profile() {
    const [firstLetterOfName, setFirstLetterOfName] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                const letter = response.data.name.charAt(0).toUpperCase();
                setFirstLetterOfName(letter);
            })
    })

    return <div>
        <Appbar letter={firstLetterOfName}/>
        <div className="grid grid-cols-6">
            <Sidebar className="col-span-1" />
            <UpdateProfile className="m-8 col-span-5" />
        </div>
    </div>
}
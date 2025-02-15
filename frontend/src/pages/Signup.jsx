import axios from "axios";
import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { PasswordInput } from "../components/PasswordInput";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"}></Heading>
                <SubHeading label={"Enter your information to create an account"}></SubHeading>
                <InputBox onChange={e => {
                    setFirstName(e.target.value);
                }} label={"First Name"} placeholder={"John"} ></InputBox>
                <InputBox onChange={e => {
                    setLastName(e.target.value);
                }} label={"Last Name"} placeholder={"Doe"} ></InputBox>
                <InputBox onChange={e => {
                    setUsername(e.target.value);
                }} label={"Email Name"} placeholder={"John@gmail.com"} ></InputBox>
                <PasswordInput
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
                <div className="pt-4">
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            password,
                            firstName,
                            lastName 
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    }} label={"Sign Up"} ></Button>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/Signin"}  />
            </div>
        </div>
    </div>
}
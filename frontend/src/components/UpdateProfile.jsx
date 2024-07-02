import React, { useEffect, useState } from "react";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { PasswordInput } from "./PasswordInput"; 

export const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [res, setRes] = useState("");

  const getData = async () => {
    try {
      const userData = await axios.get("http://localhost:3000/api/v1/user/", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      setFirstName(userData.data.user.firstName);
      setLastName(userData.data.user.lastName);
      setUsername(userData.data.user.username);
      setPassword(userData.data.user.password);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="ml-8 flex flex-col items-center col-span-2">
      <h1 className="text-xl py-5 font-bold">Update</h1>
      {error && <p>{error}</p>}
      {res && <p className="text-green-400">{res}</p>}
      <div >
        <InputBox
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          value={firstName}
          placeholder="John"
          label={"First Name"}
        />
        <InputBox
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          value={lastName}
          placeholder="Doe"
          label={"Last Name"}
        />
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          placeholder="abc@gmail.com"
          label={"Email"}
        />
        <PasswordInput
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="123456"
          label={"Password"}
        />
        <div className="mt-10">
          <Button
            onClick={async () => {
              try {
                const res = await axios.put(
                  "http://localhost:3000/api/v1/user/",
                  { firstName, lastName, username, password },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );
                console.log(res);
                setRes(res.data.message);
                setError("");
              } catch (error) {
                setError(error);
              }
            }}
            label={"Update"}
          />
        </div>
      </div>
    </div>
  );
};

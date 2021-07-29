import React, { useEffect } from "react";
import axios from "axios";
import Pantry from "./pantry";

const user = () => {
    const [user, setUser] = React.useState()

    useEffect(() => {
        console.log("use effect ran")

        axios({
            method: 'get',
            url: `/users/name/mikeyMike`,
            headers: { 'Content-Type': 'application/json' },

        }).then((response) => {
            setUser(response.data)
            console.log(response.data)
        })
    }, [])

    const pantry = user ?  <Pantry user={user}></Pantry> : <div>Loading...</div>

    return (
        <div className="container">
           {pantry}
        </div>
    );
}

export default user;
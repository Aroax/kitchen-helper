import React, { useEffect } from "react";
import axios from "axios";

const user = () => {
    const [user, setUser] = React.useState([])

    useEffect(() => {
        console.log("use effect ran")

        axios({
            method: 'get',
            url: `/users/name/mikeyMike`,
            headers: { 'Content-Type': 'application/json' },

        }).then((response) => {
            console.log(user)
            setUser(response.data)
        })
    })

    return (
        <div className="container">
            {user}
        </div>
    );
}

export default user;
import React, { useEffect } from "react";
import axios from "axios";

const user = () => {
    const [user, setUser] = React.useState({})

    useEffect(() => {
        axios({
            method: 'get',
            url: `/users/mikeyMike`,
            headers: { 'Content-Type': 'application/json' },

        }).then((data) => {
            // setUser(data)
            console.log(data)
        })
    }, [user])

    return (
        <div className="container">
            {user}
        </div>
    );
}

export default user;
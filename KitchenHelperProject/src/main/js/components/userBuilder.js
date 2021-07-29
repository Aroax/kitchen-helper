import React, { useEffect } from "react";
import axios from "axios";

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

    getPosts() {
      return user.map(user =>
        <User key={user.id} data={user}/>
      );
    }

    const userName = user ? user.displayName : ""

    return (
        <div className="container">
            {userName}
        </div>
    );
}

export default user;

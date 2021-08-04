import React from 'react';
import PrimaryButton from "./buttonPrimary";
import TextField from "@material-ui/core/TextField";

const searchBar = ({ label, color, onClick, onChange, onSubmit }) => {
    return (
        <form
            onSubmit={onSubmit}
            style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}
        >
            <TextField
                id="outlined"
                label={label}
                color={color}
                variant="outlined"
                style={{ marginRight: 8, width: "100%" }}
                onChange={onChange}
            />
            <PrimaryButton color={color} text="search" onClick={onClick} />
        </form>
    );
};

export default searchBar;

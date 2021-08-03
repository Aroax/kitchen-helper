import React from 'react';
import Button from "@material-ui/core/Button";

const buttonPrimary = ({ text, onClick, color }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color={color}
      disableElevation
    >
      {text}
    </Button>
  );
};

export default buttonPrimary;

import React from 'react';
import Button from "@material-ui/core/Button";

const buttonSecondary = ({ text, onClick, color }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      color={color}
      disableElevation
    >
      {text}
    </Button>
  );
};

export default buttonSecondary;

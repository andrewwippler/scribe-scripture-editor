import React from "react";
import { useStyles } from "./useStyles";

const ReferencePanel = (props) => {
  const classes = useStyles();
  console.log(props);
  return (
    <div className={classes.root}>
      <div
        dangerouslySetInnerHTML={{
          __html: props.refContent,
        }}
      />
    </div>
  );
};

export default ReferencePanel;

import React from "react";
import spinner from "../../../../images/spinner/light_progress2.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};

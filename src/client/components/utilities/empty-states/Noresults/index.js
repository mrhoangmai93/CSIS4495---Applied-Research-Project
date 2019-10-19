import React from "react";

const NoResults = props => {
  return (
    <div className="products">
      <div className="no-results">
        <img
          src="https://res.cloudinary.com/sivadass/image/upload/v1494699523/icons/bare-tree.png"
          alt="Empty Tree"
        />
        <h2>{props.message}</h2>
      </div>
    </div>
  );
};

export default NoResults;

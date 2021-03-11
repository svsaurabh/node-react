import React from "react";

const PublishItem = ({ publish }) => {
    return (
    <div className="profile bg-light">
      <div>
          <h3>{publish.technology}</h3>
          <h4>{publish.type}</h4>
          {publish.detail}
          <h2>published by: {publish.user_id.name}</h2>
      </div>
    </div>
    );
  };
  
  
  export default PublishItem;
  
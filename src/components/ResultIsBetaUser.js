import React from "react";

const ResultIsBetaUser = (props) => {
  return (
    <div class="success-message">
      {props.result ? (
        <div class="success-message">Es Beta User</div>
      ) : (
        <div class="success-message">No es Beta User</div>
      )}
    </div>
  );
};

export default ResultIsBetaUser;

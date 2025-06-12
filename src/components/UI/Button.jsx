import React from "react";

function ButtonColored() {
  function Btn({ text, className }) {
    return <div className={className}>{text}</div>;
  }

  return (
    <div>
      <Btn text="view" />
    </div>
  );
}

export default ButtonColored;

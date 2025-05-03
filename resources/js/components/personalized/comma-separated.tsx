import React from "react";

interface CommaProps {
  items: React.ReactNode[];
}

function Comma({ items }: CommaProps) {
  return (
    <>
      {items.map((item, index) => (
        <span key={index}>
          {item}
          {index < items.length - 1 && ", "}
        </span>
      ))}
    </>
  );
}

export default Comma;

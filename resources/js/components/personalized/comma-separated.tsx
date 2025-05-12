import React from "react";

interface CommaProps {
  items: React.ReactNode[];
}

function Comma({ items }: CommaProps) {
  return (
    <>
      {items.map((item, index) => (
        <span key={index} className="mr-1">
          {item}
          {index < items.length - 1 && ", "}
        </span>
      ))}
    </>
  );
}

export default Comma;

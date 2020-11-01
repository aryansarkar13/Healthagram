import React from "react";
import Icons from "assets/icons/icons.svg"; // Path to your icons.svg

const Icon = ({ name, color, size }) => (
  <svg
    className={`olymp olymp-${name}`}
    fill={color}
    width={size}
    height={size}
  >
    <use xlinkHref={`${Icons}#olymp-${name}`} />
  </svg>
);

export default Icon;

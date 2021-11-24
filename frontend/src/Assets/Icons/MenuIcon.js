import React from "react";
import Svg, { Path } from "react-native-svg";

function MenuIcon(props) {
  return (
    <Svg
      width={23}
      height={15}
      viewBox="0 0 23 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.5 7.5h22M11.5.5h11M.5 14.5h11"
        stroke="#7A7777"
        strokeLinecap="square"
      />
    </Svg>
  );
}

export default MenuIcon;

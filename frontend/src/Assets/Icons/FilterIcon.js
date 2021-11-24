import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const FilterIcon = (props) => {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.87 9.217v5.479M12.87 1.304V3.13M8 14.087v.609M8 1.304V8M3.13 9.217v5.479M3.13 1.304V3.13"
        stroke="#7A7777"
        strokeLinecap="square"
      />
      <Circle
        cx={12.87}
        cy={4.957}
        r={1.826}
        transform="rotate(-180 12.87 4.957)"
        stroke="#7A7777"
        strokeLinecap="square"
      />
      <Circle
        cx={8}
        cy={9.826}
        r={1.826}
        transform="rotate(-180 8 9.826)"
        stroke="#7A7777"
        strokeLinecap="square"
      />
      <Circle
        cx={3.13}
        cy={4.957}
        r={1.826}
        transform="rotate(-180 3.13 4.957)"
        stroke="#7A7777"
        strokeLinecap="square"
      />
    </Svg>
  );
};

export default FilterIcon;

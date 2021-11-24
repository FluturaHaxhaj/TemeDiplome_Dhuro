import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const SearchIcon = (props) => {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.619 16.286l-3.048-3.048"
        stroke="#fff"
        strokeLinecap="square"
      />
      <Circle
        cx={7.476}
        cy={7.143}
        r={6.095}
        stroke="#fff"
        strokeLinecap="square"
      />
      <Path d="M4.429 7.143a3.048 3.048 0 013.047-3.048" stroke="#fff" />
    </Svg>
  );
};

export default SearchIcon;

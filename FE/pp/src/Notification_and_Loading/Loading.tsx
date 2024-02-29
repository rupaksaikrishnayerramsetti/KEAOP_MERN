import { HashLoader } from "react-spinners";
import { globalColors } from "../styles/Colors";

type propstype = {
  sizevalue: number;
};

export const Loading = ({ sizevalue }: propstype) => {
  return (
    <div>
      <HashLoader color={globalColors.navbarcolor} size={300} />
    </div>
  );
};

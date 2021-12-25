import { WifiLoader } from "react-awesome-loaders";
const Loading = () => {
  return (
    <div className="loading">
      <WifiLoader
        background={"transparent"}
        desktopSize={"150px"}
        mobileSize={"150px"}
        text={"Loading"}
        backColor="#E8F2FC"
        frontColor="#4645F6"
      />
    </div>
  );
};
export default Loading;

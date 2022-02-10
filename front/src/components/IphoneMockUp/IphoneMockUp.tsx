import React from "react";
import "./IphoneMockUp.scss";

type IphoneMockUpProps = {
  children: React.ReactNode;
  width: number;
};

const IphoneMockUp: React.FC<IphoneMockUpProps> = ({ children, width }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.style.setProperty("--width", width + "px");
  }, [width]);
  return (
    <div className="iphone-mockup" ref={ref}>
      <img src="/img/iphone-mockup.png" alt="iphone" />
      <div className="mockup-content">{children}</div>
    </div>
  );
};

export default IphoneMockUp;

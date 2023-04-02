import React from "react";
import styles from "./IphoneMockUp.module.scss";
import clsx from "clsx";

type IphoneMockUpProps = {
  children: React.ReactNode;
  width: number;
  className?: string;
};

const IphoneMockUp: React.FC<IphoneMockUpProps> = ({
  children,
  width,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.style.setProperty("--width", width + "px");
  }, [width]);
  return (
    <div className={clsx(styles.iphone_mockup, className)} ref={ref}>
      <img src="/img/iphone-mockup.png" alt="iphone" />
      <div className={clsx(styles.mockup_content)}>{children}</div>
    </div>
  );
};

export default IphoneMockUp;

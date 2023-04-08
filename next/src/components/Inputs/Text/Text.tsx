import React from "react";
import styles from "./text.module.scss";
import clsx from "clsx";

export type TextInputProps = {
  icon: React.ReactNode;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  type?: "text" | "password";
};

const TextInput: React.FC<TextInputProps> = ({
  icon,
  value,
  onChange,
  placeholder,
  className = "",
  type = "text",
}) => {
  const timeout = React.useRef<NodeJS.Timeout | null>(null);
  const [inputValue, setInputValue] = React.useState(value || "");
  React.useEffect(() => {
    setInputValue(value || "");
  }, [value]);
  React.useEffect(() => {
    timeout.current && clearTimeout(timeout.current);
    inputValue !== value &&
      (timeout.current = setTimeout(() => {
        onChange(inputValue);
      }, 500));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);
  return (
    <div className={clsx(styles.text_input, className)}>
      <div className={styles.icone}>{icon}</div>
      <input
        className={clsx("section-head", styles.input)}
        type={type}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default TextInput;

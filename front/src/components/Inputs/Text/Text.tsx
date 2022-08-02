import React from "react";
import "./Text.scss";

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
  type = "text"
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
  }, [inputValue]);
  return (
    <div className={"text-input "+className}>
      <div className="icone">{icon}</div>
      <input
        className="section-head"
        type={type}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default TextInput;

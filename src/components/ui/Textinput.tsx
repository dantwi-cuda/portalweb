import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface TextinputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  defaultValue?: string;
}

const Textinput: React.FC<TextinputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  className = "",
  register,
  error,
  defaultValue,
  ...rest
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <input
        {...register(name)}
        type={type}
        className={`form-control ${className} ${error ? "is-invalid" : ""}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

export default Textinput;

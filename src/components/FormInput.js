import { useState } from "react";
import "../styles/formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
		<div className="input-group mb-3">
		<span className="input-group-text">{label}</span>
		<input className="form-control" id={id}
		{...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
		/>
		</div>
  );
};

export default FormInput
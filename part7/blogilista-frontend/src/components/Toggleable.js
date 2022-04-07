import { useState, useImperativeHandle, forwardRef } from "react";
import { ButtonNoMargin } from "./Styles";
import PropTypes from "prop-types";

const Toggleable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <ButtonNoMargin id="new-blog" onClick={toggleVisibility}>
          {props.buttonLabel}
        </ButtonNoMargin>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <ButtonNoMargin onClick={toggleVisibility}>cancel</ButtonNoMargin>
      </div>
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Toggleable.displayName = "Toggleable";

export default Toggleable;

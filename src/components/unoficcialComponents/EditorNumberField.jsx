import React from "react";

import {
  FormControl,
  FormHelperText,
  TextField as MuiTextField,
  withStyles,
} from "@material-ui/core";
import clsx from "clsx";

export const styles = {
  root: {
    width: "100%"
  },
  input: {
    "-moz-appearance": "textfield",
    "&::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0
    },
    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0
    }
  }
};
const EditorNumberField = (
  props
) => {
  const {
    schema,
    value,
    readonly,
    required,
    disabled,
    onChange,
    classes,
  } = props;

  const handleChange = React.useCallback(
    event => {
      let newValue = event.target.value;

      if (newValue === "") {
        newValue = undefined;
      }

      if (onChange) {
        onChange(newValue ? parseInt(newValue, 10) : null);
      }
    },
    [onChange]
  );

  return (
    <FormControl className={classes.root}>
      <MuiTextField
        autoComplete="off"
        label={schema.title || ""}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        type={"number"}
        defaultValue={schema.default}
        inputProps={{
          readOnly: readonly,
          "aria-label": schema.description || "",
          className: clsx(classes.input)
        }}
        value={value}
      />
      <FormHelperText>
        {schema.description}
      </FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles, { name: "DcEditorNumberField" })(
  EditorNumberField
);

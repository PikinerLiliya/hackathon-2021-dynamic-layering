import React from "react";

import {
  FormControl,
  FormHelperText,
  TextField as MuiTextField,
  withStyles,
} from "@material-ui/core";

export const styles = {
  root: {
    width: "100%"
  }
};
const EditorTextField = (
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
        onChange(newValue);
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
        defaultValue={schema.default}
        multiline={true}
        rowsMax={value && value.length > 1000 ? 5 : 1}
        inputProps={{
          readOnly: readonly,
          "aria-label": schema.description || ""
        }}
        value={value}
      />
      <FormHelperText>
        {schema.description}
      </FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles, { name: "DcEditorTextField" })(
  EditorTextField
);

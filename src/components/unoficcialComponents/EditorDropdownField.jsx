import React from "react";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  withStyles,
} from "@material-ui/core";
import clsx from "clsx";

const values = {
  "TL": "Top Left",
  "TC": "Top Center",
  "TR": "Top Right",
  "ML": "Middle Left",
  "MC": "Middle Center",
  "MR": "Middle Right",
  "BL": "Bottom Left",
  "BC": "Bottom Center",
  "BR": "Bottom Right"
}

export const styles = {
  root: {
    width: "100%"
  },

  selectTitle: {
    display: "block",
    fontSize: "14px",
    textTransform: "uppercase",
    padding: 16,
    fontWeight: 500
  }
};

const EditorDropdownField = (
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
  const [localValue, setValue] = React.useState(value || schema.default || "");

  const handleChange = React.useCallback(
    event => {
      const newValue = event.target.value;
      if (onChange) {
        onChange(newValue);
        setValue(newValue)
      }
    },
    [onChange]
  );

  const enumValues = schema.enum || [];

  return (
    <FormControl className={classes.root}>
      <InputLabel required={required}>{schema.title || ""}</InputLabel>
      <Select
        autoWidth={true}
        disabled={disabled}
        onChange={handleChange}
        inputProps={{
          readOnly: readonly,
          "aria-label": schema.description || ""
        }}
        value={localValue}
      >
        <InputLabel className={clsx(classes.selectTitle)}>
          {schema.title || ""}
        </InputLabel>
        <MenuItem value={undefined}>None</MenuItem>
        {enumValues.map((enumValue) => (
          <MenuItem key={enumValue} value={enumValue}>
            {`${values[enumValue]}`}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {schema.description}
      </FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles, { name: "DcEditorDropdownField" })(
  EditorDropdownField
);

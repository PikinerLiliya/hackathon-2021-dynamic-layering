import React, { useState } from "react";

import {
  FormControl,
  FormHelperText,
  withStyles,
  Slider,
  InputLabel
} from "@material-ui/core";

export const styles = {
  root: {
    width: "100%",
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
const EditorRangeField = (
  props
) => {
  const {
    schema,
    value = 0,
    disabled,
    onChange,
    classes,
    sign = '',
  } = props;

  const [sliderValue, setSliderValue] = useState(value || schema.default || 0);

  if (!value && schema.default){
    if (onChange) {
      onChange(schema.default);
    }
  }

  const handleChange = React.useCallback(
    (newValue) => {

      setSliderValue(newValue)

      if (onChange) {
        onChange(parseInt(newValue, 10));
      }
    },
    [onChange]
  );

  return (
    <FormControl className={classes.root}>

      <InputLabel shrink>
        {schema.title}
      </InputLabel>
      <Slider
        value={sliderValue}
        onChange={(e, newValue) => handleChange(newValue)}
        aria-labelledby="input-slider"
        min={schema.minimum || 0}
        max={schema.maximum || 100}
        valueLabelDisplay={true}
        valueLabelFormat={(value) => `${value}${sign}`}
        style={{marginTop: '40px', padding: 0, height: '8px', marginBottom: '2px'}}
        disabled={disabled}
        defaultValue={sliderValue}
      />
      <FormHelperText>
        {schema.description}
      </FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles, {name: "DcEditorRangeField"})(
  EditorRangeField
);

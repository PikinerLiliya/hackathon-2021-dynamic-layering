import { Grid, Paper } from "@material-ui/core";
import { useExtensionContext } from "../core/ExtensionContext";
import EditorDropdownField from "./unoficcialComponents/EditorDropdownField";
import EditorNumberField from "./unoficcialComponents/EditorNumberField";
import EditorTextField from "./unoficcialComponents/EditorTextField";
import EditorRangeField from "./unoficcialComponents/EditorRangeField";
import { useEditorContext } from "../core/EditorContext";
import { useEffect, useState } from "react";
import { SelectAllOutlined } from "@material-ui/icons";

const ConfigOptions = () => {
  const {sdk, sdkConnected, field, setField} = useExtensionContext();
  const {disabled, setDisabled, selected} = useEditorContext();
  const [config, setConfig] = useState({});

  useEffect(() => {
    if (field && field.overlays && field.overlays.length && field.overlays[0].overlayImage) {
      setDisabled(false);
    }
    if (field && field.overlays && field.overlays.length) {
      setConfig(field.overlays[selected] ? field.overlays[selected].config : {})
    }
  }, [field, selected]);


  const changeConfig = (fieldName, value) => {
    const newOverlays = [...field.overlays];
    if (!newOverlays[selected]) {
      newOverlays[selected] = {};
    }

    newOverlays[selected].config = {
      ...(newOverlays[selected].config || {}),
      [fieldName]: value
    }
    setField({...field, overlays: newOverlays});
  }

  return sdkConnected ? (
    <div key={Math.random()} style={{display: 'flex', marginTop: '10px'}}>
      <Paper elevation={3}>
        <span className="ext-title" style={{color: "#039be5"}}>{!disabled ? `Layer ${selected + 1}` : ''}</span>
      <Grid container>

        <Grid item style={{maxWidth: '300px', margin: '20px'}}>
          <EditorNumberField disabled={disabled}
                             value={config.width}
                             onChange={(value) => changeConfig('width', value)}
                             schema={sdk.field.schema.properties.overlays.items.properties.config.properties.width}/>
          <EditorNumberField disabled={disabled}
                             value={config.height}
                             onChange={(value) => changeConfig('height', value)}
                             schema={sdk.field.schema.properties.overlays.items.properties.config.properties.height}/>
          <EditorRangeField disabled={disabled}
                            value={config.quality}
                            onChange={(value) => changeConfig('quality', value)}
                            schema={sdk.field.schema.properties.overlays.items.properties.config.properties.quality}/>
          <EditorRangeField disabled={disabled}
                            value={config.opacity}
                            onChange={(value) => changeConfig('opacity', value)}
                            schema={sdk.field.schema.properties.overlays.items.properties.config.properties.opacity}/>

          <EditorTextField disabled={disabled}
                           value={config.custom}
                           onChange={(value) => changeConfig('custom', value)}
                           schema={sdk.field.schema.properties.overlays.items.properties.config.properties.custom}/>
        </Grid>
        <Grid item style={{minWidth: '300px', margin: '20px'}}>
          <EditorDropdownField disabled={disabled}
                               value={config.anchor}
                               onChange={(value) => changeConfig('anchor', value)}
                               schema={sdk.field.schema.properties.overlays.items.properties.config.properties.anchor}/>
          <EditorRangeField disabled={disabled}
                            value={config.top}
                            sign={"%"}
                            onChange={(value) => changeConfig('top', value)}
                            schema={sdk.field.schema.properties.overlays.items.properties.config.properties.top}/>
          <EditorRangeField disabled={disabled}
                            value={config.bottom}
                            sign={"%"}
                            onChange={(value) => changeConfig('bottom', value)}
                            schema={sdk.field.schema.properties.overlays.items.properties.config.properties.bottom}/>
          <EditorRangeField disabled={disabled}
                            value={config.left}
                            sign={"%"}
                            onChange={(value) => changeConfig('left', value)}
                            schema={sdk.field.schema.properties.overlays.items.properties.config.properties.left}/>
          <EditorRangeField disabled={disabled}
                            value={config.right}
                            onChange={(value) => changeConfig('right', value)}
                            sign={"%"}
                            schema={sdk.field.schema.properties.overlays.items.properties.config.properties.right}/>
        </Grid>
      </Grid>
      </Paper>

    </div>) : ''
}


export default ConfigOptions;
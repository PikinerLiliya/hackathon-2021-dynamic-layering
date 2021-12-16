import { useExtensionContext } from "../core/ExtensionContext";
import Image from "./Image";
import { useEditorContext } from "../core/EditorContext";

const Overlays = () => {
  const {sdk, field, sdkConnected, setField} = useExtensionContext();
  const {setDisabled, setSelected, selected} = useEditorContext();
  if (!sdkConnected){
    return ''
  }
  const maxItems = sdk.field.schema.properties.overlays.maxItems;
  const addMore = field && field.overlays && field.overlays.length < maxItems;

  const changeImage = (image, index) => {
    const newOverlays = [...field.overlays];
    if (!newOverlays[index]){
      newOverlays[index] = {
        config: {}
      };
    }
      newOverlays[index].overlayImage = image;
  
    if (!image){
      newOverlays.splice(index, 1);
    }
    if (image && !selected){
      setSelected(index);
      setDisabled(false)
    }
    if (!newOverlays || !newOverlays.length){
      setDisabled(true);
    }
    setSelected(index);
    setField({...field, overlays: newOverlays})
  }

  console.log(field.overlays)
  return sdkConnected ? (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {field.overlays.map(({overlayImage}, index) => (
      <Image index={index+1} onClick={() => {setSelected(index)}} key={Math.random()} selected={selected === index} onChange={(image) => changeImage(image, index)} value={overlayImage}/>))}
      {addMore ? (<Image key={Math.random()} value={null} onChange={(image) => changeImage(image, field.overlays.length)}/>) : ''}
  </div>): ''
}


export default Overlays;
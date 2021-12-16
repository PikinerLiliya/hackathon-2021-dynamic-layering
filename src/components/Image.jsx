import { useExtensionContext } from "../core/ExtensionContext";
import { useState } from "react";

const Image = ({value, onClick, onChange, selected, index}) => {
  const {sdk, sdkConnected} = useExtensionContext();
  const [image, setImage] = useState(value);
  const src = image ? `https://${sdk.stagingEnvironment}/i/${image.endpoint}/${image.name}` : '';

  const addImage = async () => {
    const image = await sdk.mediaLink.getImage();
    setImage(image);
    onChange(image);
  }

  return sdkConnected ? (<>
    {!image ? (<div onClick={onClick} className={`content-card`}>
      <button onClick={addImage} title="Add Image" className="add-btn">
        <img alt="Add" src={'./ic-asset-card-add.svg'}/>
      </button>
    </div>) : (<div onClick={onClick} title={image.name} className={`content-card selected ${selected ? 'selected-card' : ''}`}>
      <p className={"label"}>Layer {index} ({image.name})</p>
      <img alt={image.name} className="content-background" src={src}/>

      <button onClick={addImage} title="Edit" className="add-btn edit">
        <img alt="Edit" src={'./ic-asset-card-edit.svg'}/>
      </button>
      <button onClick={() => {
        setImage(null);
        onChange(null);
      }} title="Remove" className="add-btn delete">
        <img alt="Remove" src={'./ic-asset-delete.svg'}/>
      </button>

    </div>)}

  </>) : ''
}


export default Image;
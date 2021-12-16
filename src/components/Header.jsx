import { useExtensionContext } from "../core/ExtensionContext";

const Header = () => {
  const {sdk, sdkConnected} = useExtensionContext();
  return sdkConnected ? (<div>
    <span className="ext-title">{sdk.field.schema.title}</span>
  </div>) : ''
}


export default Header;
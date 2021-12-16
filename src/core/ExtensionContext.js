import React, { useEffect, useState } from "react";
import { AutoResizer } from "./AutoResize";
import { getSdk } from "./ExtensionSDK";

const defaultExtensionState = {
  sdkConnected: false
};

const ExtensionContext = React.createContext(defaultExtensionState);

export function WithExtensionContext({
                                       children,
                                     }) {
  const [state, setState] = useState(defaultExtensionState);

  useEffect(() => {
    getSdk().then(async (sdk) => {
      new AutoResizer(sdk);

      const params = { ...sdk.params.installation, ...sdk.params.instance };
      const field = await sdk.field.getValue();

      const state = { params, sdk, field, sdkConnected: true };

      state.setField = (field) => {
        sdk.field.setValue(field);
        setState({ ...state, field });
      }

      setState(state);
    }).catch((e) => {
      console.error(e);
    });
  }, []);

  return (
    <ExtensionContext.Provider value={state}>
      {children}
    </ExtensionContext.Provider>
  );
}

export function useExtensionContext() {
  return React.useContext(ExtensionContext);
}
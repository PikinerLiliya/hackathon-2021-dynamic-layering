import React, { useState } from "react";

const dummySetter = () => {
  /* */
};


const defaultEditorState = {
  disabled: true,
  setDisabled: dummySetter,
  selected: 0,
  setSelected: dummySetter
};

const EditorContext = React.createContext(defaultEditorState);

export function WithEditorContext({
                                    children,
                                  }) {
  const [state, setState] = useState(defaultEditorState);

  state.setDisabled = (disabled) => {
    setState({ ...state, disabled});
  }

  state.setSelected = (selected) => {
    setState({ ...state, selected })
  }

  return (
    <EditorContext.Provider value={state}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  return React.useContext(EditorContext);
}
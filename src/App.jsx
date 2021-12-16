import Header from "./components/Header";
import Overlays from "./components/Overlays";
import { WithExtensionContext } from "./core/ExtensionContext";
import ConfigOptions from "./components/ConfigOptions";
import { WithEditorContext } from "./core/EditorContext";

function App() {
  return (
    <div className="App">
      <WithEditorContext>
        <WithExtensionContext>
              <Header/>
              <ConfigOptions/>
              <Overlays/>
        </WithExtensionContext>
      </WithEditorContext>
    </div>
  );
}

export default App;

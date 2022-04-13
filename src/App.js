import Layout from "./components/Layout/Layout";
import "./App.css";
import ContextLayers from "./components/ContextLayers/ContextLayers";

function App() {
  return (
    <div className="App">
      <ContextLayers>
        <Layout />
      </ContextLayers>
    </div>
  );
}

export default App;

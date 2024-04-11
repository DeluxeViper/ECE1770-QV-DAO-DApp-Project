import { EthProvider } from "./contexts/EthContext/";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import React from 'react';

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Demo />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;

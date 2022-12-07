import React from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdviceScreen from "./screens/AdviceScreen";

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: "#333", color: "#FFF" },
          }}
        />
        <Header />
        <AdviceScreen />
        <Footer />
      </div>
    </>
  );
}

export default App;

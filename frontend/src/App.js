import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdviceScreen from "./screens/AdviceScreen";

function App() {
  return (
    <>
      <div>
        <ToastContainer />
        <Header />
        <AdviceScreen />
        <Footer />
      </div>
    </>
  );
}

export default App;

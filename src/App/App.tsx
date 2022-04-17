import "./App.css";
import React, { useState } from "react";
import FormPlate from "../components/FormPlate/FormPlate";
import Card from "../components/Card/Card";
function App(): JSX.Element {
  //states
  const [prediction, setPrediction] = useState({
    std: false,
    dayNumber: 1,
    time: "",
    platesList: [1, 2],
  });

  const [openPrediction, setOpenPrediction] = useState(false);

  return (
    <>
      <h1 className="title">Pico & Placa</h1>
      <FormPlate
        setOpenPrediction={setOpenPrediction}
        setPrediction={setPrediction}
      />

      {openPrediction && (
        <Card prediction={prediction}/>
      )}
    </>
  );
}

export default App;

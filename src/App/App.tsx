import React, { useState } from "react";
import config from "../config/config";
import {
  picoPlacaChecker,
  getDayNumber,
  getNotPermitPlatesNumbers,
} from "../utils/pico-placa-checker";
import "./App.css";
interface IForm {
  [key: string]: any;
  plate: string;
  date: string;
}
interface IMessage {
  [key: string]: any;
  plate: boolean;
  date: boolean;
}

function App(): JSX.Element {
  //states
  const [messageError, setMessageError] = useState<IMessage>({
    plate: true,
    date: true,
  });

  const [formModel, setFormModel] = useState<IForm>({
    date: new Date(Date.now() - 60 * 60000 * 5).toISOString().slice(0, -8),
    plate: "",
  });
  const [prediction, setPrediction] = useState({
    std: false,
    dayNumber: 1,
    time: "",
    platesList: [1, 2],
  });

  const [openPrediction, setOpenPrediction] = useState(false);

  //handlers
  const predictHandler = (e: React.FormEvent) => {
    e.preventDefault();
    //validations
    const fields = Object.keys(formModel);
    const validate = fields.reduce(
      (acc, field) => acc && messageError[field] && formModel[field] !== "",
      true
    );
    //if validations are true then open card and make a prediction
    setOpenPrediction(validate);
    if (validate) {
      const { plate, date } = formModel;
      //obtain time and date to the input
      const [newDate, time] = date.split("T");
      //setting Prediction
      const dayNumber = getDayNumber(newDate);
      const platesList = getNotPermitPlatesNumbers(dayNumber);
      const newPrediction = picoPlacaChecker(plate, newDate, time);
      setPrediction({ std: newPrediction, dayNumber, platesList, time });
    }
  };
  return (
    <>
      <h1 className="title">Pico & Placa</h1>
      <form className="form_prediction" onSubmit={predictHandler}>
        <fieldset>
          <legend>Plate Number</legend>
          <input
            type="text"
            placeholder="TBD-5695 or TBD5695"
            value={formModel.plate}
            onChange={(e) => {
              setFormModel({ ...formModel, plate: e.target.value });
              setMessageError({
                ...messageError,
                plate: /(^[A-Z]{3}-?[0-9]{4}|^[0-9]{4})$/.test(e.target.value),
              });
            }}
          />
        </fieldset>
        {!messageError.plate && (
          <span className="msg_error">Please enter a valid plate Number</span>
        )}
        <fieldset>
          <legend>Date</legend>
          <input
            type="datetime-local"
            value={formModel.date}
            onChange={(e) => {
              setFormModel({ ...formModel, date: e.target.value });
              setMessageError({ ...messageError, date: e.target.value !== "" });
            }}
          />
        </fieldset>
        {!messageError.date && (
          <span className="msg_error"> Please enter a date</span>
        )}
        <input className="button" type="submit" value="Predict" />
      </form>
      {openPrediction && (
        <div className="card">
          {prediction.platesList.length > 0 ? (
            <p>
              The plates numbers that can't circulate on{" "}
              {config.dayList[prediction.dayNumber - 1]} are{" "}
              {prediction.platesList.join(",")}
            </p>
          ) : (
            <p>
              All plates numbers can circulate on{" "}
              {config.dayList[prediction.dayNumber - 1]}
            </p>
          )}

          <p>
            Remember the horary for Pico and Placa was{" "}
            {`${config.startMorning} to ${config.endMorning} and ${config.startAfternoon} to ${config.endAfternoon}`}
          </p>

          <p className={`prediction ${prediction.std?"reject":""}`}>
            Your car {prediction.std ? "have" : "don't have"} pico y placa on
            {config.dayList[prediction.dayNumber - 1]} at {prediction.time}
          </p>
        </div>
      )}
    </>
  );
}

export default App;

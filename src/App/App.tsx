import React, { useState } from "react";
import {picoPlacaChecker,getDayNumber,getNotPermitPlatesNumbers} from "../utils/pico-placa-checker";
function App(): JSX.Element {
  //constants
  const regexPlateNumber = /(^[A-Z]{3}-?[0-9]{4}|^[0-9]{4})$/;
  interface IForm {
    [key: string]: any;
    plateNumber: string;
    date: string;
  }
  interface IMessage {
    [key: string]: any;
    plateNumber: boolean;
    date: boolean;
  }
  //states
  const [messageError, setMessageError] = useState<IMessage>({
    plateNumber: true,
    date: true,
  });

  const [formModel, setFormModel] = useState<IForm>({
    date: new Date(Date.now() - 60 * 60000 * 5).toISOString().slice(0, -8),
    plateNumber: "",
  });
  const [openPrediction, setOpenPrediction] = useState(false);
  const [prediction, setPrediction] = useState(false)
  //handlers
  const predictHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const { plateNumber, date } = formModel;
    const fields = Object.keys(formModel);
    const validate = fields.reduce(
      (acc, field) => acc && messageError[field],
      true
    );
    setOpenPrediction(validate);
    if (validate) {
      const [newDate, time] = date.split("T");
      console.log(newDate,time,plateNumber)
      const newPrediction = picoPlacaChecker(plateNumber, newDate, time);
      console.log(newPrediction)
      setPrediction(newPrediction);
    }
  };
  return (
    <>
      <h1>Pico and placa predictor</h1>
      <form onSubmit={predictHandler}>
        <fieldset>
          <label htmlFor="plateNumber">Plate Number</label>
          <input
            id="plateNumber"
            type="text"
            placeholder="TBD-5695 or TBD5695"
            value={formModel.plateNumber}
            onChange={(e) => {
              setFormModel({ ...formModel, plateNumber: e.target.value });
              setMessageError({
                ...messageError,
                plateNumber: regexPlateNumber.test(e.target.value),
              });
            }}
          />
          {!messageError.plateNumber && (
            <span>Please enter a valid plate Number</span>
          )}
        </fieldset>
        <fieldset>
          <label htmlFor="date">Date</label>
          <input
            type="datetime-local"
            id="date"
            value={formModel.date}
            onChange={(e) => {
              setFormModel({ ...formModel, date: e.target.value });
              setMessageError({ ...messageError, date: e.target.value !== "" });
            }}
          />
          {!messageError.date && <span> Please enter a date</span>}
        </fieldset>
        <input type="submit" value="Predict" />
      </form>
      {openPrediction && <div className="card">
            your car {prediction?"have":"dont have"} pico y placa at dist moment
            <span>{getDayNumber(formModel.date.split("T")[0])}</span>
            <span>{getNotPermitPlatesNumbers(getDayNumber(formModel.date.split("T")[0]))}</span>
        </div>}
    </>
  );
}

export default App;

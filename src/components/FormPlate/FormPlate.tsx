import React, { useState } from 'react'
import {
  picoPlacaChecker,
  getDayNumber,
  getNotPermitPlatesNumbers,
} from "../../utils/pico-placa-checker";

//interfaces
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
interface IPrediction{
    std: boolean;
    dayNumber: number;
    time: string;
    platesList: number[];
}
interface IProps{
  setOpenPrediction: React.Dispatch<React.SetStateAction<boolean>>;
  setPrediction: React.Dispatch<React.SetStateAction <IPrediction>>;
}

const FormPlate = (props:IProps):JSX.Element => {
  const {setOpenPrediction,setPrediction} = props;
  //state
  const [Errors, setErrors] = useState<IMessage>({
    plate: true,
    date: true,
  });

  const [formModel, setFormModel] = useState<IForm>({
    date: new Date(Date.now() - 60 * 60000 * 5).toISOString().slice(0, -8),
    plate: "",
  });
  //handlers
  const plateInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const plateRegex = /(^[A-Z]{3}-?[0-9]{4}|^[0-9]{4})$/;
    setFormModel({ ...formModel, plate: e.target.value });
    setErrors({ ...Errors, plate: plateRegex.test(e.target.value) });
  };

  const dateInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormModel({ ...formModel, date: e.target.value });
    setErrors({ ...Errors, date: e.target.value !== "" });
  }

  const predictHandler = (e: React.FormEvent) => {
    e.preventDefault();
    //validations
    const fields = Object.keys(formModel);
    const validate = fields.reduce(
      (acc, field) => acc && Errors[field] && formModel[field] !== "",
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
    <form className="form_prediction" onSubmit={predictHandler}>
    <fieldset>
      <legend>Plate Number</legend>
      <input
        type="text"
        placeholder="TBD-5695 or TBD5695"
        value={formModel.plate}
        onChange={plateInputHandler}
      />
    </fieldset>
    {!Errors.plate && (
      <span className="msg_error">Please enter a valid plate Number</span>
    )}
    <fieldset>
      <legend>Date</legend>
      <input
        type="datetime-local"
        value={formModel.date}
        onChange={dateInputHandler}
      />
    </fieldset>
    {!Errors.date && (
      <span className="msg_error"> Please enter a date</span>
    )}
    <input className="button" type="submit" value="Predict" />
  </form>
  )
}

export default FormPlate
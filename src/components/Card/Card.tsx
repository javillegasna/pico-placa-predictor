import React from "react";
import config from "../../config/config";

interface IPrediction {
  std: boolean;
  dayNumber: number;
  time: string;
  platesList: number[];
}

interface IProps {
  prediction: IPrediction;
}

const Card = (props: IProps) => {
  const { prediction } = props;
  return (
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

      <p className={`prediction ${prediction.std ? "reject" : ""}`}>
        Your car {prediction.std ? "have" : "don't have"} pico y placa on{" "}
        {config.dayList[prediction.dayNumber - 1]} at {prediction.time}
      </p>
    </div>
  );
};

export default Card;

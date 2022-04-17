import { render, screen, fireEvent } from "@testing-library/react";
import FormPlate from "./FormPlate";

describe("<FormPlate/>", () => {
  const mockOpen = jest.fn();
  const mockPrediction = jest.fn();

  const setup = () =>
    render(
      <FormPlate setOpenPrediction={mockOpen} setPrediction={mockPrediction} />
    );

  test("render form", () => {
    setup();
    const form = screen.getByText("Plate Number");
    expect(form).toBeInTheDocument();
  });

  test("openPrediction must be false if Plate Number is empty", () => {
    setup();
    const buttonElement = screen.getByText("Predict");
    fireEvent.click(buttonElement);
    expect(mockOpen).toHaveBeenCalledWith(false);
  });

  test("Prediction std must be false if 2022-04-14T22:03 and TBD5695 is provided", () => {
    setup();
    const testPrediction = {
      dayNumber: 4,
      platesList: [7, 8],
      std: false,
      time: "22:03",
    };
    const buttonElement = screen.getByText("Predict");
    const inputPlate = screen.getByDisplayValue("");
    const inputDate = screen.getByDisplayValue(/2022-/i);
    fireEvent.change(inputDate, { target: { value: "2022-04-14T22:03" } });
    fireEvent.change(inputPlate, { target: { value: "TBD5695" } });
    fireEvent.click(buttonElement);
    expect(mockOpen).toHaveBeenCalledWith(true);
    expect(mockPrediction).toHaveBeenCalledWith(testPrediction);
  });
});

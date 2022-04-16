import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders title", () => {
  render(<App />);
  const h1Element = screen.getByText("Pico & Placa");
  expect(h1Element).toBeInTheDocument();
});

test("render form", () => {
  render(<App />);
  const formElement = screen.getByText("Plate Number");
  expect(formElement).toBeInTheDocument();
});

test("If button click with empty plate or date prediction will be hidden", () => {
  render(<App />);
  const buttonElement = screen.getByText("Predict");
  fireEvent.click(buttonElement);
  const cardElement = screen.queryByText(/The plates numbers/i);
  expect(cardElement).not.toBeInTheDocument();
});

test("When plate input have a valid plate card will be render", () => {
  render(<App />);
  const buttonElement = screen.getByText("Predict");
  const inputPlate = screen.getByDisplayValue("");
  const inputDate = screen.getByDisplayValue(/2022-/i);
  fireEvent.change(inputDate,{target:{value:"2022-04-14T22:03"}})
  fireEvent.change(inputPlate, { target: { value: "TBD5695"}});
  fireEvent.click(buttonElement);
  const cardElement = screen.getByText(/The plates numbers/i)
  expect(cardElement).toBeInTheDocument();
});
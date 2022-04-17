import { render, screen } from "@testing-library/react";
import Card from "./Card";
interface IPrediction{
  std: boolean;
  dayNumber: number;
  time: string;
  platesList: number[];
}
describe("<Card/>",()=>{
  const testPrediction = {
    dayNumber: 4,
    platesList: [7, 8],
    std: false,
    time: "22:03",
  };
  const setup=(prediction:IPrediction)=>render(<Card prediction={prediction}/>)
  test("Render",()=>{
    setup(testPrediction);
    const card = screen.getByText(/The plates numbers/i);
    expect(card).toBeInTheDocument();
  })
  test("if std is false the text must be don't have",()=>{
    setup(testPrediction);
    const text = screen.getByText(/don't have/i);
    expect(text).toBeInTheDocument();
  })
  test("if std is true the text must be have",()=>{
    setup({...testPrediction, std:true});
    const text = screen.getByText(/have/i);
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("reject")
  })

});
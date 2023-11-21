import { render, fireEvent } from '@testing-library/react';
import Bmi from './components/Bmi';

describe("BMI-Calculator", ()=>{
  test('allows entry in weight and height fields', () => {
    const { container } = render(<Bmi />);
    const weightInput = container.querySelector(".weight-input");
    const heightInput = container.querySelector(".height-input");
    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '170' } });
    expect(weightInput.value).toBe('70');
    expect(heightInput.value).toBe('170');
  });
  
  test('calculates BMI correctly', () => {
    const { container, getByText } = render(<Bmi />);
    const weightInput = container.querySelector(".weight-input");
    const heightInput = container.querySelector(".height-input");
    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '170' } });
    fireEvent.click(getByText("Calculate BMI"));
    const bmiValue = getByText(/Your current BMI is/);
    expect(bmiValue).toHaveTextContent("24.2"); // Based on the input values
  });
  test('shows an alert for incorrect input', () => {
    window.alert = jest.fn();
    const { container, getByText } = render(<Bmi />);
    const calculateButton = getByText("Calculate BMI");
    fireEvent.click(calculateButton);
    expect(window.alert).toHaveBeenCalledWith("Please enter correct height or weight");
  });
  test('displays underweight message for low BMI', () => {
    const { container, getByText } = render(<Bmi />);
    const weightInput = container.querySelector(".weight-input");
    const heightInput = container.querySelector(".height-input");
    fireEvent.change(weightInput, { target: { value: '50' } });
    fireEvent.change(heightInput, { target: { value: '180' } });
    fireEvent.click(getByText("Calculate BMI"));
    const message = container.querySelector(".message p");
    expect(message.textContent).toBe("You are underweight");
  });
  test('reset button clears the inputs and messages', () => {
    const { container, getByText } = render(<Bmi />);
    const weightInput = container.querySelector(".weight-input");
    const heightInput = container.querySelector(".height-input");
    const resetButton = getByText("Reset");
  
    // Set some values
    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '170' } });
    fireEvent.click(getByText("Calculate BMI"));
  
    // Reset
    fireEvent.click(resetButton);
  
    // Check if values are reset
    expect(weightInput.value).toBe('0');
    expect(heightInput.value).toBe('0');
    expect(container.querySelector(".message h3").textContent).toBe("Your current BMI is : ");
    expect(container.querySelector(".message p").textContent).toBe("");
  });
})



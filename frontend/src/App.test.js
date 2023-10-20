import { render, screen } from "@testing-library/react";
import App from "./App";

test("Defaults to Log In page", () => {
  render(<App />);
  const h1 = screen.getByText("Log In or Sign Up");
  expect(h1).toBeInTheDocument();
});

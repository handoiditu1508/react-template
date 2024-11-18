import App from "@/App";
import { customRender } from "@/common/testUtils";
import "@testing-library/jest-dom";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  customRender(<App />);
  expect(true).toBeTruthy();
});

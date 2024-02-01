import { render, screen } from "@testing-library/react"

import Dashboard from "."

test("inputs should be initially empty", () => {
  render(<Dashboard />)

  const xValueInput = screen.getByTestId<HTMLInputElement>("xValueInput")

  expect(xValueInput.value).toBe("0")
})

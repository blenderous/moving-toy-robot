import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import Dashboard from "."

describe("testing the UI used to control the robot", () => {
  test("default position of the robot should be the first square", () => {
    render(<Dashboard />)

    // simulate click on REPORT button
    fireEvent.click(screen.getByRole("button", { name: "Report" }))

    const alertElement = screen.getByTestId("output")

    expect(alertElement.textContent).toBe("0,0,NORTH")
  })

  test("clicking on Place button and initial position of robot", () => {
    render(<Dashboard />)

    // simulate click on PLACE button
    fireEvent.click(screen.getByRole("button", { name: "Place" }))

    // simulate click on REPORT button
    fireEvent.click(screen.getByRole("button", { name: "Report" }))

    const alertElement = screen.getByTestId("output")

    expect(alertElement.textContent).toBe("0,0,NORTH")
  })

  test("setting the position of the robot and direction", () => {
    render(<Dashboard />)

    // enter "2" in the input for X position
    const inputX = screen.getByLabelText("X")
    fireEvent.input(inputX, { target: { value: "2" } })

    // enter "3" in the input for Y position
    const inputY = screen.getByLabelText("Y")
    fireEvent.input(inputY, { target: { value: "3" } })

    fireEvent.change(screen.getByTestId("direction"), {
      target: { value: "South" },
    })

    // simulate click on PLACE button
    fireEvent.click(screen.getByRole("button", { name: "Place" }))

    // simulate click on REPORT button
    fireEvent.click(screen.getByRole("button", { name: "Report" }))

    const alertElement = screen.getByTestId("output")

    expect(alertElement.textContent).toBe("2,3,SOUTH")
  })

  test("placing the robot and moving it using the move button", () => {
    render(<Dashboard />)

    // enter "2" in the input for X position
    const inputX = screen.getByLabelText("X")
    fireEvent.input(inputX, { target: { value: "2" } })

    // enter "3" in the input for Y position
    const inputY = screen.getByLabelText("Y")
    fireEvent.input(inputY, { target: { value: "3" } })

    fireEvent.change(screen.getByTestId("direction"), {
      target: { value: "South" },
    })

    // simulate click on PLACE button
    fireEvent.click(screen.getByRole("button", { name: "Place" }))

    // simulate click on MOVE button
    fireEvent.click(screen.getByRole("button", { name: "Move" }))

    // simulate click on REPORT button
    fireEvent.click(screen.getByRole("button", { name: "Report" }))

    const alertElement = screen.getByTestId("output")

    expect(alertElement.textContent).toBe("2,2,SOUTH")
  })

  test("placing the robot and turning it to the right using the right button", () => {
    render(<Dashboard />)

    // enter "2" in the input for X position
    const inputX = screen.getByLabelText("X")
    fireEvent.input(inputX, { target: { value: "2" } })

    // enter "3" in the input for Y position
    const inputY = screen.getByLabelText("Y")
    fireEvent.input(inputY, { target: { value: "3" } })

    fireEvent.change(screen.getByTestId("direction"), {
      target: { value: "South" },
    })

    // simulate click on PLACE button
    fireEvent.click(screen.getByRole("button", { name: "Place" }))

    // simulate click on RIGHT button
    fireEvent.click(screen.getByRole("button", { name: "Right" }))

    // simulate click on REPORT button
    fireEvent.click(screen.getByRole("button", { name: "Report" }))

    const alertElement = screen.getByTestId("output")

    expect(alertElement.textContent).toBe("2,3,WEST")
  })

  test("placing the robot and turning it to the left using the left button", () => {
    render(<Dashboard />)

    // enter "2" in the input for X position
    const inputX = screen.getByLabelText("X")
    fireEvent.input(inputX, { target: { value: "2" } })

    // enter "3" in the input for Y position
    const inputY = screen.getByLabelText("Y")
    fireEvent.input(inputY, { target: { value: "3" } })

    fireEvent.change(screen.getByTestId("direction"), {
      target: { value: "South" },
    })

    // simulate click on PLACE button
    fireEvent.click(screen.getByRole("button", { name: "Place" }))

    // simulate click on LEFT button
    fireEvent.click(screen.getByRole("button", { name: "Left" }))

    // simulate click on REPORT button
    fireEvent.click(screen.getByRole("button", { name: "Report" }))

    const alertElement = screen.getByTestId("output")

    expect(alertElement.textContent).toBe("2,3,EAST")
  })

  test("showing the error alert when the user tries to move the robot outside the table", () => {
    render(<Dashboard />)

    // enter "2" in the input for X position
    const inputX = screen.getByLabelText("X")
    fireEvent.input(inputX, { target: { value: "4" } })

    // enter "3" in the input for Y position
    const inputY = screen.getByLabelText("Y")
    fireEvent.input(inputY, { target: { value: "4" } })

    // simulate click on PLACE button
    fireEvent.click(screen.getByRole("button", { name: "Place" }))

    // simulate click on MOVE button
    fireEvent.click(screen.getByRole("button", { name: "Move" }))

    const errorAlertElement = screen.getByTestId("error-alert")

    expect(errorAlertElement).toBeInTheDocument()
  })
})

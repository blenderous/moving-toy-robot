import { useRef, useState } from "react"
import { FaRobot } from "react-icons/fa6"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"
import CodeEditor from "./components/CodeEditor"

function App() {
  const [xValue, setxValue] = useState<number>(0)
  const [yValue, setyValue] = useState<number>(0)
  const [inputxValue, setInputxValue] = useState<number>(0)
  const [inputYValue, setInputYValue] = useState<number>(0)
  const [direction, setDirection] = useState<string>("North")
  const [showOutput, setShowOutput] = useState<boolean>(false)
  const [thrownOff, setThrownOff] = useState<boolean>(false)
  const directionRef = useRef<HTMLSelectElement>(null)

  const onPlaceSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setxValue(inputxValue)
    setyValue(inputYValue)
    if (directionRef.current) {
      setDirection(directionRef.current.value)
    }
    setThrownOff(false)
  }

  const onMoveSubmit = () => {
    switch (direction) {
      case "North": {
        if (yValue < 4) {
          setThrownOff(false)
          setyValue(yValue + 1)
        } else {
          setThrownOff(true)
        }
        break
      }
      case "South": {
        if (yValue > 0) {
          setThrownOff(false)
          setyValue(yValue - 1)
        } else {
          setThrownOff(true)
        }
        break
      }
      case "East": {
        if (xValue < 4) {
          setThrownOff(false)
          setxValue(xValue + 1)
        } else {
          setThrownOff(true)
        }
        break
      }
      case "West": {
        if (xValue > 0) {
          setThrownOff(false)
          setxValue(xValue - 1)
        } else {
          setThrownOff(true)
        }
        break
      }
    }
  }

  const onRightSubmit = () => {
    switch (direction) {
      case "North":
        setDirection("East")
        break
      case "South":
        setDirection("West")
        break
      case "East":
        setDirection("South")
        break
      case "West":
        setDirection("North")
        break
    }
  }

  const onLeftSubmit = () => {
    switch (direction) {
      case "North":
        setDirection("West")
        break
      case "South":
        setDirection("East")
        break
      case "East":
        setDirection("North")
        break
      case "West":
        setDirection("South")
        break
    }
  }

  const onReportSubmit = () => {
    setShowOutput(true)
    setTimeout(() => {
      setShowOutput(false)
    }, 1500);
  }

  return (
    <>
      <h1>
        Moving Toy Robot{" "}
        <span>
          <FaRobot />
        </span>
      </h1>
      <div className="ToyBot">
        <CodeEditor/>
        <div className="ToyBot__controls--dashboard mb-4">
          <h2>Or use controls</h2>
          <form
            className="mb-2"
            onSubmit={onPlaceSubmit}
          >
            <label
              htmlFor="placeControlX"
              className="form-label"
            >
              X
            </label>
            <input
              type="number"
              min="0"
              max="4"
              className="form-control"
              id="placeControlX"
              placeholder="0"
              value={inputxValue}
              onChange={(e) => setInputxValue(parseInt(e.target.value))}
            ></input>
            <label
              htmlFor="placeControlY"
              className="form-label"
            >
              Y
            </label>
            <input
              type="number"
              min="0"
              max="4"
              className="form-control"
              id="placeControlY"
              placeholder="0"
              value={inputYValue}
              onChange={(e) => setInputYValue(parseInt(e.target.value))}
            ></input>
            <select
              className="form-select"
              aria-label="Direction"
              ref={directionRef}
              defaultValue={"North"}
            >
              <option value="North">NORTH</option>
              <option value="South">SOUTH</option>
              <option value="East">EAST</option>
              <option value="West">WEST</option>
            </select>
            <button
              type="submit"
              className="btn btn-outline-primary"
            >
              Place
            </button>
          </form>
          <button
            className="btn btn-outline-primary mb-2"
            onClick={onMoveSubmit}
          >
            Move
          </button>
          <button
            className="btn btn-outline-primary mb-2"
            onClick={onRightSubmit}
          >
            Right
          </button>
          <button
            className="btn btn-outline-primary mb-2"
            onClick={onLeftSubmit}
          >
            Left
          </button>
          <button
            className="btn btn-primary"
            onClick={onReportSubmit}
          >
            Report
          </button>
        </div>
        <div className="ToyBot__output">
          {thrownOff && (
            <p
              className="alert alert-danger"
              role="alert"
            >
              Oops! Can't move!
            </p>
          )}
          { showOutput && <p
            className="alert alert-primary"
            role="alert"
          >
            {xValue + ", " + yValue + ", " + direction.toUpperCase()}
          </p>}
        </div>
      </div>
    </>
  )
}

export default App

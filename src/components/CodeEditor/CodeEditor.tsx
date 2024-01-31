import React, { useRef } from "react"

const CodeEditor = () => {

  const codeAreaRef = useRef<HTMLTextAreaElement>(null)

  const onCodeEditorSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (codeAreaRef.current) {
      const commandsArray = codeAreaRef.current.value.split("\n")
      // console.log(commandsArray)
      commandsArray.forEach(command => console.log(command))
    }
  }

  return (
    <div className="ToyBot__controls--code-editor">
      <h2>Type it out</h2>
      <form className="mb-4" onSubmit={onCodeEditorSubmit}>
        <div className="mb-3">
          <label
            htmlFor="codeExecutionArea"
            className="form-label"
          >
            Write code here
          </label>
          <textarea
            className="form-control"
            id="codeExecutionArea"
            rows={3}
            ref={codeAreaRef}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Execute
        </button>
      </form>
    </div>
  )
}

export default CodeEditor

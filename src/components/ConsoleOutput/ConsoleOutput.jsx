import './console_output_style.css'

const ConsoleOutput = ({ childrens }) => {
  return (
    <div id="previous_commands_container">
      {childrens.map((children) => (<>{children}</>))}
    </div>
  )
}

export default ConsoleOutput

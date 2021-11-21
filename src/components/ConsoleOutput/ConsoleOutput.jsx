import './console_output_style.css'

const ConsoleOutput = ({ childrens }) => {
  return (
    <div id="previous_commands_container">
      {childrens.map((children, index) => (<span key={index}>{children}</span>))}
    </div>
  )
}

export default ConsoleOutput

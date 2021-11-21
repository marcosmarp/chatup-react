import './commands_list_style.css'

const CommandsList = () => {
  return (
    <table className='h6' id='commands_help_table'>
      <tr>
        <th>CATEGORY</th>
        <th>COMMAND</th>
        <th>DESCRIPTION</th>
      </tr>
      <tr>
        <td>Users</td>
        <td>register</td>
        <td>Starts registration process for new user</td>
      </tr>
      <tr>
        <td>Users</td>
        <td>log in</td>
        <td>Starts log in process for existing user</td>
      </tr>
      <tr>
        <td>Users</td>
        <td>log out</td>
        <td>Close existing user session</td>
      </tr>
    </table>
  )
}

export default CommandsList

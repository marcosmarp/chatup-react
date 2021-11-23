import { useState, useEffect } from 'react';

const LogOut = ({logOut}) => {
  const [serverResponse, setServerResponse] = useState('');

  useEffect(() => {
    const getLogOutResponse = async () => {
      const response = await logOut();
      setServerResponse(response);
    }

    getLogOutResponse();
  }, []);
  
  return (
    <span>
      {serverResponse}
    </span>
  )
}

export default LogOut

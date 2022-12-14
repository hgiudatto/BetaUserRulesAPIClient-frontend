import { useEffect, useState } from "react";
import axios from "axios";

const CheckBetaUser = () => {
  const [backendData, setBackendData] = useState({});

  useEffect(() => {
    axios("/checkBetaUser").then((response) => {
      console.log(`Response: ${response.data.theStatus}`);
      setBackendData(response.data);
    });
  }, []);

  return <>{backendData.theStatus === 200 && <p>Status: Ok</p>}</>;
};

export default CheckBetaUser;

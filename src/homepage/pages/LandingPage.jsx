import React ,{ useState,useEffect }  from "react";
import { useHttpClient } from "../../util/http-hook";

import { useFormik } from "formik";
import { Form, Card, Button, Icon, Header } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";

const LandingPage = () => {
  //query al database per ottenere i pacchetti
  const { sendRequest, isLoading } = useHttpClient();
  const [pacchetti, setPacchetti] = useState();
  console.log(process.env.REACT_APP_FRONT_URL)

  useEffect(() => {
    const getPacchetti = async() => {


  try {
      async function getPackages() {
        const response = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/packages",
          "GET",
          null
        )
        setPacchetti(response)
      }
      getPacka©ges()
    } catch(error) {
      Swal.fire({
        icon: "error",
        title: "Qualcosa è andato storto...",
        text: error.message,
      });
    }

    }
    getPacchetti();
    
  },[sendRequest])

  return (
    <React.Fragment>
      {/* usare un component in cui importare i dati per formattarli nel frontend */}
      <div className="jumbotron">
        <div className="container mt-2">
          <h1>Welcome to Telcom</h1>
          <p>The newest company for mobile and fixed telehone! </p>
          <hr />
          <h3>Have a look to our available packages</h3>
          {JSON.stringify(pacchetti)}
        </div>
      </div>
    </React.Fragment>
  );

};

export default LandingPage;


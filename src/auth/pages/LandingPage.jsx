import React from 'react-bootstrap';
import ReactBootstrap from 'react-bootstrap';

const rawHTML = "<div><h1>Welcome to Telcom</h1><p>The newest company for mobile and fixed telehone! </p><hr/><h3>Have a look to our available packages</h3></div></div>";
const LandingPage = () => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: rawHTML }}></div>
    </div>
  );
}

export default LandingPage
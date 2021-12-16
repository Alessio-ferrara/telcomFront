import React from "react-bootstrap"
import { Image } from "react-bootstrap";


const Footer = () => <footer style={{marginTop:"25vh"}} className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Cosa è telcom</h5>
                <p>Telcom is an optional project proposed by the professor Pietro Fraternali and developed by the students Francesco Mazzola and Alessio Ferrara
                </p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md mb-md-0 mb-3">
                <h5 className="text-uppercase">Useful Links</h5>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />

            </div>

            {/* <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Link 1</a></li>
                    <li><a href="#!">Link 2</a></li>
                    <li><a href="#!">Link 3</a></li>
                    <li><a href="#!">Link 4</a></li>
                </ul>
            </div> */}
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2020 Copyright:
        <a> Fralessio Mazzara</a>
        <i class="fa fa-android" aria-hidden="true"></i>
    </div>

</footer>

export default Footer
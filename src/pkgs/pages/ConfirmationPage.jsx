// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useHttpClient } from "../../util/http-hook";
// import {
//   faCartPlus,
//   faShoppingCart,
//   faShoppingBag,
//   faBroadcastTower,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { useFormik } from "formik";
// import { Form, Button, Label, Header, Segment } from "semantic-ui-react";
// import Swal from "sweetalert2";
// import * as Yup from "yup";
// import ListaServizi from "../components/ListaServizi";
// import ListaOptional from "../components/ListaOptional";
// import authService from "../../services/authService";
// import moment from "moment";

// const orderSchema = Yup.object().shape({
//   OrderID: Yup.number().integer().required(),
//   refUser: Yup.number().integer().required(),
//   refPkg: Yup.number().integer().required(),
//   datetime: Yup.date().required(),
//   paid: Yup.number().integer().required(), //0,1
//   amount: Yup.number().test(
//     "is-decimal",
//     "invalid decimal",
//     (value) => (value + "").match(/^\d*\.{1}\d*$/) //regex to check if decimal
//   ),
//   startingdate: Yup.date().required(),
//   duration: Yup.number().integer().required(),
// });

// const ConfirmationPage = (props) => {
//   const location = useLocation();
//   const data = location.state;
//   console.log(Math.round(Math.random()));
//   const utente = authService.getCurrentToken();

//   const orderData = useFormik({
//     initialValues: {
//       //     OrderID: ,
//       // refUser: ,
//       // refPkg: ,
//       // datetime: ,
//       // paid: ,
//       // amount: ,
//       // startingdate: ,
//       // duration:
//     },
//     validationSchema: orderSchema,
//     onSubmit: async (values) => {
//       try {
//         const responseData = await sendRequest(
//           process.env.REACT_APP_JAVA_BASE_URL + "/order/createOrder/",
//           "POST",
//           JSON.stringify({
//             username: values.username,
//             password: values.password,
//           }),
//           {
//             "Content-Type": "application/json",
//           }
//         );
//         console.log(responseData);
//         authService.login(
//           responseData.username,
//           responseData.token,
//           responseData.type
//         );
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Qualcosa è andato storto...",
//           text: error.message,
//         });
//       }
//     },
//   });

//   return (
//     <div className="container mt-3">
//       <div className="display-6 col-6">
//         Service Package:
//         {" " + data.name}
//       </div>
//       <div className="row h4">
//         <div className="col-8 text-muted">
//           Description:
//           <span> {data.description}</span>
//         </div>
//       </div>
//       <hr />
//       <div className="row">
//         <div className="col-6">
//           <h4 style={{ fontWeight: "bold" }}>Included services:</h4>
//         </div>
//         <span className="col-6">
//           <ul>
//             {data.services.map((service) => (
//               <Label color="blue" size="large" className="mb-2">
//                 {service.name}
//               </Label>
//             ))}
//           </ul>
//         </span>
//       </div>
//       <div className="row">
//         <div className="col-6">
//           <h4 style={{ fontWeight: "bold" }}>Added optionals:</h4>
//         </div>
//         <span className="col-6">
//           <ul>
//             {data.optionals.map((optional) => (
//               <Label color="blue" size="large" className="mb-2">
//                 {optional.name}
//               </Label>
//             ))}
//           </ul>
//         </span>
//       </div>
//       <Segment className="mt-3 rounded-pill text-center" secondary attached>
//         Confirming the purchase will lead to the payment page, not completing
//         the payment the unpaid order will be added to your "Unpaid Orders" in
//         order to let you complete the purchasing.
//       </Segment>
//       {/* <div style={{marginTop: "100px"}}>
//         Confirming the purchase will lead to the payment page, not completing the payment the unpaid order will be added to your "Unpaid Orders" in order to 
//         let you complete the purchasing.
//         </div> */}
//       <div style={{ marginTop: "50px" }}>
//         <div
//           className="display-6 col-md-12 col-12"
//           style={{ fontWeight: "", textAlign: "right" }}
//         >
//           <span style={{ fontWeight: "normal", marginRight: "15px" }}>
//             Total Cost: €{data.price}
//           </span>
//           <br />
//           <p
//             style={{
//               fontWeight: "",
//               fontSize: "20px",
//               textAlign: "right",
//               marginRight: "35px",
//             }}
//           >
//             Validity:
//             {" " + data.validity + " months"}
//             <p
//               style={{
//                 marginRight: "-10px",
//               }}
//             >
//               Starting from:
//               {" " + moment(data.date).format("DD/MM/YYYY")}
//             </p>
//           </p>
//           <div className="mt-3">
//             {!utente ? (
//               <div>
//                 <Button.Group size="huge">
//                   <Button color="blue">&nbsp;Log-in&nbsp;</Button>
//                   <Button.Or />
//                   <Button>Sign-up</Button>
//                 </Button.Group>
//               </div>
//             ) : (
//               <Button
//                 onClick={() => {
//                   //use a random function to tell if the order will be completed
//                   //Math.round(Math.random())
//                 }}
//               >
//                 Conferma Acquisto
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ConfirmationPage;

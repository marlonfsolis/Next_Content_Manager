// import Layout from "components/Layout";
// import { useEffect } from "react";

// import { Form, Field, FormElement } from "@progress/kendo-react-form";
// import { Error } from "@progress/kendo-react-labels";
// import { Input } from "@progress/kendo-react-inputs";

// const emailValidator = (value) => {
//   const emailRegex = new RegExp(/\S+@\S+\.\S+/);
//   return emailRegex.test(value) ? "" : "Please enter a valid email.";
// }

// const requiredValidator = (value) => {
//   return value ? "" : "Field required.";
// }

// const EmailInput = (fieldRenderProps) => {
//   const { validationMessage, visited, ...others } = fieldRenderProps;
//   return (
//     <div>
//       <Input {...others} />
//       {
//         visited && validationMessage
//           ? <Error>{validationMessage}</Error>
//           : <label>Personal email address.</label>
//       }
//     </div>
//   );
// };

// export default function AddResourcePage() {

//   const handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));

//   useEffect(() => {
//     // addResource();
//   });

//   return (
//     <Layout>
//       <div className="columns">
//         <div className="column is-offset-3 is-6">
//           <h1 className="title">Create New Resource</h1>

//           <div className="field">
//             <label className="label">Title</label>
//             <div className="control">
//               <input className="input" type="text" placeholder="Text input" />
//             </div>
//           </div>

//           <h3 className="title">KendoUI Form</h3>
//           <Form
//             onSubmit={handleSubmit}
//             render={(formRenderProps) => (
//               <FormElement
//                 style={{
//                   maxWidth: 650,
//                 }}
//               >
//                 <fieldset className={"k-form-fieldset"}>
//                   <legend className={"k-form-legend"}>
//                     Please fill in the fields:
//                   </legend>

//                   <div className="mb-3">
//                     <Field name={"firstName"} component={Input} label={"First name"} />
//                   </div>

//                   <div className="mb-3">
//                     <Field name={"lastName"} component={Input} label={"Last name"}
//                       validator={requiredValidator} />
//                   </div>

//                   <div className="mb-3">
//                     <Field name={"email"} component={EmailInput} label={"Email"}
//                       type={"email"}
//                       validator={emailValidator} />
//                   </div>
//                 </fieldset>

//                 <div className="k-form-buttons">
//                   <button
//                     type={"submit"}
//                     className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
//                     disabled={!formRenderProps.allowSubmit}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </FormElement>
//             )}
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// }


// const addResource = () => {

//   const data = {
//     title: "My new resource",
//     description: "My new resource description",
//     resource_link: "https://my-link.com",
//     imageUrl: "https://my-images.com",
//     priority: 1,
//     timeToFinish: 20,
//     active: true,
//     createdAt: "2022-02-11"
//   };

//   fetch('http://localhost:5179/api/resources', {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   })
//     .then(() => {
//       console.log("Post complete");
//     })
//     .catch((error) => {
//       console.log(error);
//     });

// }
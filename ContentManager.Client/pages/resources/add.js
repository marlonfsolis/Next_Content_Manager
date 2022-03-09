import Layout from "components/Layout";
import { useEffect } from "react";

export default function AddResourcePage() {

  useEffect(() => {
    // addResource();
  });

  return (
    <Layout>
      <div className="columns">
        <div className="column is-offset-3 is-6">
          <h1 className="title">Add page</h1>

          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" placeholder="Text input" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}


const addResource = () => {

  const data = {
    title: "My new resource",
    description: "My new resource description",
    resource_link: "https://my-link.com",
    imageUrl: "https://my-images.com",
    priority: 1,
    timeToFinish: 20,
    active: true,
    createdAt: "2022-02-11"
  };

  fetch('http://localhost:5179/api/resources', { 
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
    .then(() => {
      console.log("Post complete");
    })
    .catch((error) => {
      console.log(error);
    });

}
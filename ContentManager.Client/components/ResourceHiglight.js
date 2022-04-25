import React from "react";
import moment from 'moment';
import { useRouter } from 'next/router';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ResourceHiglight({ resources, deleteResource }) {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  // Delete a resource
  const [showDeleteResourcePopup, setShowDeleteResourcePopup] = React.useState(false);
  const [deleteResourceId, setDeleteResourceId] = React.useState(false);
  const deleteResourcePopupClose = () => setShowDeleteResourcePopup(false);
  const deleteResourcePopupShow = (resourceId) => {
    setDeleteResourceId(resourceId);
    setShowDeleteResourcePopup(true);
  };
  const deleteResourcePopup = () => {
    // console.log(deleteResourceId);
    deleteResourcePopupClose();
    deleteResource(deleteResourceId);


    // const deleteUrl = `http://localhost:5179/api/resources/${deleteResourceId}`;
    // fetch(deleteUrl, {
    //   method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors', // no-cors, *cors, same-origin
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin', // include, *same-origin, omit
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   redirect: 'follow', // manual, *follow, error
    //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // })
    //   .then(() => {
    //     // setShowSuccessfulMsg(true);
    //     router.replace("/home");
    //     console.log("Post complete");
    //   })
    //   .catch((error) => {
    //     // setShowFailMdsg(false);
    //     console.log(error);
    //   });
  };

  return (
    <>
      {/* Cards */}
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {
          resources.map((r) => {
            const createdAt = moment(r.createdAt).format('MMMM Do YYYY');

            return (
              <div key={r.resourceId} className="mx-2" style={{ width: "500px" }}>
                <div className="card border-dark mb-3">
                  <div className="card-header">{createdAt}</div>
                  <div className="card-body text-dark">
                    <h5 className="card-title">{r.title}</h5>
                    <p className="card-text">{r.description}</p>
                    <div className="d-grid gap-2 d-sm-block">
                      <button className="btn btn-info col-sm-2"
                        type="button"
                        onClick={() => navigateTo("/resources/details")}>Details
                      </button>
                      <button className="btn btn-warning col-sm-2 mx-sm-2"
                        type="button">Edit
                      </button>
                      <button className="btn btn-danger col-sm-2"
                        type="button"
                        onClick={() => deleteResourcePopupShow(r.resourceId)}>Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>

      {/* Popup */}
      <Modal
        show={showDeleteResourcePopup}
        onHide={deleteResourcePopupClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this Resource?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteResourcePopup}>Yes</Button>
          <Button variant="primary" onClick={deleteResourcePopupClose}>No</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

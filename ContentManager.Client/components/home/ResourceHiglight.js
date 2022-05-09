import React from "react";
import moment from 'moment';
import { useRouter } from 'next/router';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ResourceHiglight({ resources, deleteResource }) {
  const router = useRouter();


  ////////////////////////////////////////////////////////////////////////////////////
  // Functions 
  ////////////////////////////////////////////////////////////////////////////////////

  const navigateToDetails = (resourceId) => {
    router.push({
      pathname: "/resources/details",
      query: { rid: resourceId }
    });
  };

  const navigateToEdit = (resourceId) => {
    router.push({
      pathname: "/resources/edit",
      query: { rid: resourceId }
    });
  };

  // Delete a resource
  const [showDeleteResourcePopup, setShowDeleteResourcePopup] = React.useState(false);
  const [deleteResourceId, setDeleteResourceId] = React.useState(false);
  const closeDeleteResourcePopupFn = () => setShowDeleteResourcePopup(false);
  const showDeleteResourcePopupFn = (resourceId) => {
    setDeleteResourceId(resourceId);
    setShowDeleteResourcePopup(true);
  };
  const deleteResourcePopup = () => {
    // console.log(deleteResourceId);
    closeDeleteResourcePopupFn();
    deleteResource(deleteResourceId);
  };



  ////////////////////////////////////////////////////////////////////////////////////
  // Content Output 
  ////////////////////////////////////////////////////////////////////////////////////

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
                        onClick={() => navigateToDetails(r.resourceId)}> Details
                      </button>
                      <button className="btn btn-warning col-sm-2 mx-sm-2"
                        type="button"
                        onClick={() => navigateToEdit(r.resourceId)}> Edit
                      </button>
                      <button className="btn btn-danger col-sm-2"
                        type="button"
                        onClick={() => showDeleteResourcePopupFn(r.resourceId)}> Delete
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
        onHide={closeDeleteResourcePopupFn}
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
          <Button variant="primary" onClick={closeDeleteResourcePopupFn}>No</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

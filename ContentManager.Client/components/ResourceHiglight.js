import React from "react";
import moment from 'moment';
import { useRouter } from 'next/router';

export default function ResourceHiglight({ resources }) {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  const [showDeleteResourcePopup, setShowDeleteResourcePopup] = useState(false);
  const deleteResourcePopupClose = () => setShowDeleteResourcePopup(false);
  const deleteResourcePopupShow = () => setShowDeleteResourcePopup(true);


  const deleteResource = (resourceId) => {
    // console.log(resourceId);
    
    deleteResourcePopupShow(true);
    
  };

  return (
    <>
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
                        onClick={() => deleteResource(r.resourceId)}>Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  );
}

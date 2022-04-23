import React from "react";
import moment from 'moment';
import { useRouter } from 'next/router';

export default function ResourceHiglight({ resources }) {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
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

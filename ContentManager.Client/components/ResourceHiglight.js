import React from "react";
import moment from 'moment';
import {useRouter} from 'next/router';

export default function ResourceHiglight ({ resources }) {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };
  
  return (
    <>
      <section className="hero ">
        <div className="hero-body">
          <div className="container is-fluid">
            {
              resources.map((r) => {
                const today = new Date();
                const subtitle = moment(r.createdAt).format('MMMM Do YYYY');
                
                return (
                  <section key={r.resourceId} className="section is-small">
                    <div className="columns">
                      <div className="column is-8 is-offset-2">
                        <div className="content is-medium">
                          <h2 className="subtitle is-4">{subtitle}</h2>
                          <h1 className="title">{r.title}</h1>
                          <p>
                            {r.description}
                          </p>
                          <div className="buttons">
                            <button className="button is-info" 
                              type="button" 
                              onClick={() => navigateTo("/resources/details")}>Details</button>
                            <button className="button is-warning" type="button">Edit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })
            }
          </div>
        </div>
      </section>
    </>
  );
}

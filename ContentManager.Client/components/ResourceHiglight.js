import React from "react";
import moment from 'moment';

export default function ResourceHiglight ({ resources }) {
  return (
    <div>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            {
              resources.map((r) => {
                const today = new Date();
                const subtitle = moment(r.createdAt).format('MMMM Do YYYY');
                
                return (
                  <section key={r.id} className="section">
                    <div className="columns">
                      <div className="column is-8 is-offset-2">
                        <div className="content is-medium">
                          <h2 className="subtitle is-4">{subtitle}</h2>
                          <h1 className="title">{r.title}</h1>
                          <p>
                            {r.description}
                          </p>
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
    </div>
  );
}

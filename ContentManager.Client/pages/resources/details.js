import Layout from "components/shared/Layout";
import Card from "react-bootstrap/Card";
import { useRouter } from 'next/router';

export default function DetailsResourcePage({ resource }) {
  const router = useRouter();

  const { rid } = router.query;
  // console.log(resource);

  const CardField = ({ title, content }) => {
    return (
      <Card className="card-shadow my-2">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Layout>
      <main className="col-8 mx-auto" id="resource_detail">
        <div className="d-flex flex-column">
          <header className="d-flex justify-content-center">
            <h1>Resource Details</h1>
          </header>

          <section className="" id="main_content">


            <CardField title={"Title"} content={resource.title}></CardField>
            <CardField title={"Description"} content={resource.description}></CardField>
            <article>
              <h5>Description</h5>
              <p>Lorem dle from forthem si cao.</p>
            </article>
            <article>
              <h5>Link</h5>
              <p>Lorem dle from forthem si cao.</p>
            </article>
            <article>
              <h5>Image</h5>
              <p>Lorem dle from forthem si cao.</p>
            </article>
            <div className="d-flex flex-row">
              <article>
                <h5>Priority</h5>
                <p>1</p>
              </article>
              <article>
                <h5>Created At</h5>
                <p><time>05/23/1983</time></p>
              </article>
              <article>
                <h5>Time to Finish</h5>
                <p><time>120 minutes</time></p>
              </article>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}


export async function getServerSideProps(context) {
  let data = {};
  const { rid } = context.query;

  try {

    let response = {};
    try {
      response = await fetch(`http://localhost:5179/api/resources/${rid}`, {
        method: "GET",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.log("Error getting the resource!");
    }


    const responseJson = await response.json();
    if (responseJson?.error === null) {
      data = responseJson.data;
    } else {
      console.log("Response Error: ", responseJson.error);
    }
  } catch (error) {
    console.log("Unhandled Error: ", error);
  }

  return {
    props: {
      resource: data
    }
  }
}
import Layout from "components/Layout";
import ResourceHiglight from "components/ResourceHiglight";
import Newsletter from "components/Newsletter";
import ResourceList from "components/ResourceList";

export default function Home({resources}) {
  return (
    <>
      <Layout>
        <section className="text-center mx-5">
          <h1 className="my-3">Resources</h1>
          <ResourceHiglight resources={resources} />
        </section>
        
        {/* 
        <Newsletter />
        <ResourceList resources={resources} /> */}
      </Layout>
    </>
  );
}

/**
 * This method is call on every request rather than getStaticProps that is called only once
 * Important: These methods only work on pages [NOT ON COMPONENTS]. You should fetch the data on the page
 * and pass it down to components. 
 */
export async function getServerSideProps() {
  
  /**
   * Here we are calling an api endpoint on express located on pages/api folder.
   * On directory (pages/api) Next.js allow us to build api endpoints.
   * But we can use any other external api. Just need to fetch from the right URL.
   * 
   * For CORS you can use Next.js API as proxy sending the request from Client to Next API
   * and on the API you send the request to exernal API.
   * Or just configure the CORS on the external API and send directly the request.
   * 
   * On this method (getServerSideProps) like the name says is on the server side so 
   * CORS will not affect.
   */

  let data = [];
  try {
    
    let response = {};
    try {
       response = await fetch('http://localhost:5179/api/resources', {
        method: "GET",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      response = await fetch('http://localhost:3000/api/resources');
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
      resources: data
    }
  }
}


/**
 * Cannot be used together with getServerSideProps
 */
// export async function getStaticProps() {
  
//   const resData = await fetch('http://localhost:3000/api/resources');
//   const data = await resData.json();

//   return {
//     props: {
//       resources: data
//     }
//   }
// }
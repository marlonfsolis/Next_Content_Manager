import Layout from "components/Layout";
import ResourceHiglight from "components/ResourceHiglight";
import Newsletter from "components/Newsletter";
import ResourceList from "components/ResourceList";
import Footer from "components/Footer";

export default function Home({resources}) {
  return (
    <>
      <Layout>
        <ResourceHiglight resources={resources} />
        <Newsletter />
        <ResourceList resources={resources} />
        <Footer />
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
   * Here (pages/api) Next.js allow us to build api endpoints.
   * But we can use any other external api. Just need to fetch from the right URL.
   */
  const resData = await fetch('http://localhost:3000/api/resources');
  //const resData = await fetch('http://localhost:5179/api/resources', { method: "POST"});
  const data = await resData.json();

  console.log(resData);

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
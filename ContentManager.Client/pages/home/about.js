import Layout from "components/Layout";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function About() {
  /**
   * Fetching data on client side. This will fetch tha data
   * on client side after the page is rendered.
   * Good for Dashboards and Internal pages that do not need the SEO feature.
   * Install swr: npm install swr
   * Then use it like here
   */
  const { data, error } = useSWR("../api/about", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <div className="container">
        {/* <section className="hero">
          <div className="hero-body">
            <p className="title">About Content Manager</p>
            <p className="subtitle">An app to learn Next.js</p>
            <p className="content">{data.message}</p>
          </div>
        </section> */}


        <section className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">About Content Manager</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              An app to learn Next.js.
              The app is guided by&nbsp;
              <a href="https://www.udemy.com/user/filip-jerga/">Filip Jerga</a>
              on Udemy course&nbsp;
              <a href="https://www.udemy.com/course/awesome-nextjs-with-react-and-node-amazing-portfolio-app/">
                Complete Next.js with React & Node - Beautiful Portfolio App
              </a>
            </p>
            <p className="lead mb-4">Here we are using Hero snipped from <a href="https://getbootstrap.com/docs/5.0/examples/heroes/">Bootstrap Examples page</a>.</p>
          </div>
        </section>

      </div>
    </Layout >
  );
}

import Layout from "components/Layout";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function About() {
  /**
   * Fetching data on client side. This will fetch tha data
   * on client side after the page is rendered.
   * Good for Dashboards and Internal pages that do not need the SEO feature.
   * Install swr: npm install swr
   * THen use it like here
   */
  const { data, error } = useSWR("../api/about", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <div className="container">
        <section className="hero">
          <div className="hero-body">
            <p className="title">About Content Manager</p>
            <p className="subtitle">An app to learn Next.js</p>
            <p className="content">{data.message}</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

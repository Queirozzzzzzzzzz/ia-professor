import "/components/css/index.css";
import Layout from "/components/layout.js";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

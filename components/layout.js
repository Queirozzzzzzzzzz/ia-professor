import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Professor IA</title>
        <link rel="icon" href="/static/img/icon.ico" />
      </Head>
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}

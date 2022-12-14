import Footer from "./Footer";
import Navbar from "./Navbar";
// import { Head } from "next/head";

export default function Layout({ items, children }) {
  return (
    <>
      {/* <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head> */}
      <div className="flex min-h-screen flex-col">
        <Navbar items={items} />
        <main className="mt-20 mb-6 grow xl:mt-32">{children}</main>
        <Footer />
      </div>
    </>
  );
}

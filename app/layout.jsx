import "@styles/globals.css";
import NavBar from "@components/NavBar";
import Provider from "@components/Provider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export const metadata = {
  title: "Promptopia",
  description: "Khám phá và tạo prompt mới mỗi ngày",
};
const RootLayout = ({ children }) => {
  return (
    <>
      <html lang="vi">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <link rel="icon" href="/assets/images/logo.svg" />
        </head>
        <body>
          <Provider>
            <div className="main">
              <div className="gradient" />
            </div>
            <main className="app">
              <NavBar />
              {children}
              <ToastContainer />
            </main>
          </Provider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;

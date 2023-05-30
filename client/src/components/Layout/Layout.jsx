import React from "react";
import Footer from "../Footer/Footer";
function Layout({ children }) {
  return (
    <div style={{ minHeight: "70vh", position: "relative" }}>
      {children}
      <Footer style={{ position: "absolute", bottom: 0, width: "100%" }} />
    </div>
  );
}

export default Layout;

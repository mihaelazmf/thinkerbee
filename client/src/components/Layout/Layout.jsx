import React from "react";
import Footer from "../Footer/Footer";

function Layout({ children }) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: "1 0 auto", paddingBottom: "100px" }}>{children}</div>
      <Footer style={{ flexShrink: 0 }} />
    </div>
  );
}

export default Layout;

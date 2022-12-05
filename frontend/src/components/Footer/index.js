import React from "react";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const Footer = () => {
  return (
    <footer>
      Made with <span style={{ color: "red" }}>❤</span> by{"  "}
      <span
        onClick={() => openInNewTab("https://linkedin.com/in/patel-aniket")}
        style={{
          cursor: "pointer",
          textDecorationLine: "underline",
          fontFamily: "monospace",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Aniket Patel
      </span>
    </footer>
  );
};

export default Footer;

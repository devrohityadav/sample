import React from "react";

export const Footer = ({ organization }) => (
  <footer className="page-footer">
    &copy; {`${organization} ${new Date().getFullYear()}`}
  </footer>
);

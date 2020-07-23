import React from "react";

export const Footer = ({ organization }) => (
  <footer class="page-footer">
    <div class="terms">
      <a
        href="http://shillongcollege.ac.in/wp-content/uploads/2020/terms_conditions.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms and conditions
      </a>
      |
      <a
        href="http://shillongcollege.ac.in/wp-content/uploads/2020/terms_conditions.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Refund policy
      </a>
      |
      <a
        href="http://shillongcollege.ac.in/wp-content/uploads/2020/terms_conditions.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Disclaimer Policy
      </a>
      |
      <a
        href="http://shillongcollege.ac.in/wp-content/uploads/2020/terms_conditions.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Cancellation Policy
      </a>
      |
      <a
        href="https://shillongcollege.ac.in/wp-content/uploads/2020/privacy_policy.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>
    </div>
    &copy; {`${organization} ${new Date().getFullYear()}`}
  </footer>
);

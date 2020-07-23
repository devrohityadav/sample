import React from "react";

import { Form } from "./form";
import { Footer } from "./footer";

export const Main = (props) => (
  <div>
    <main id="main-content">
      <Form
        url={props.formURL}
        notice={props.notice}
        bplUploadUrl={props.bplUploadUrl}
        imgUploadUrl={props.imgUploadUrl}
        pwdUploadUrl={props.pwdUploadUrl}
      />
    </main>
    <Footer organization={props.organization} />
  </div>
);

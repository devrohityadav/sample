import React from "react";

import { Form } from "./form";
import { Footer } from "./footer";

export const Main = (props) => (
  <div>
    <main id="main-content">
      <Form
        url="/students/1"
        notice="Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati enim tempora, in quis ducimus veniam aliquid hic vero sequi, assumenda quam repellat deleniti autem inventore sapiente labore quos quisquam provident?"
      />
    </main>
    <Footer organization="Shillong College" />
  </div>
);

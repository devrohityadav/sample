import React, { Component } from "react";

import { Main } from "./components";

const config = {
  bplUploadUrl: "/api/uploads/bpl",
  pwdUploadUrl: "/api/uploads/pwd",
  imgUploadUrl: "/api/uploads/selfie",

  notice:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati enim tempora, in quis ducimus veniam aliquid hic vero sequi, assumenda quam repellat deleniti autem inventore sapiente labore quos quisquam provident?",

  organization: "Shillong College",
};

class App extends Component {
  render() {
    return <Main {...config} />;
  }
}

export default App;

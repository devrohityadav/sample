import React from "react";

function App() {
  return (
    <form
      method="post"
      action="http://localhost:8080/process"
      enctype="multipart/form-data"
    >
      <p>Upload Photo</p>
      <input type="file" name="img" />
      <input type="submit" name="Submit" />
    </form>
  );
}

export default App;

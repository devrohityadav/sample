import qs from "qs";
import React, { Component } from "react";

import { getData } from "./database";

class App extends Component {
  state = {
    data: {},
    pd: null,
    bpl: null,
    img: null,
    error: null,
    loading: true,
    success: false,
  };

  componentDidMount() {
    const { id } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    const data = getData(id);
    this.setState(() => ({ data, loading: false }));
  }

  handleChange = (key, file) => {
    this.setState(() => ({ [key]: file }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState(() => ({ loading: true }));

    const { pd, bpl, img } = this.state;
    const data = { pd, bpl, img };

    const formData = new FormData();

    for (const attribute in data) {
      formData.append(attribute, data[attribute]);
    }

    const url = "http://localhost:8080/students/abc-123";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (response.status === 200) {
        this.setState(() => ({ success: true }));
      } else {
        throw new Error(
          `Status: ${response.status} , error: ${JSON.stringify(json.error)}`
        );
      }
    } catch (error) {
      this.setState(() => ({ error: error.message }));
    } finally {
      this.setState(() => ({ loading: false }));
    }
  };

  render() {
    const { data, loading } = this.state;

    if (loading) return <h1>Loading</h1>;

    if (data === undefined)
      return (
        <div>
          <h1>Please select a student id</h1>
          <p>
            1. Use{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://localhost:3000?id=1"
            >
              localhost:3000?id=1
            </a>
          </p>
          <p>
            2. Use{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://localhost:3000?id=2"
            >
              localhost:3000?id=2
            </a>
          </p>
          <p>
            3. Use{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://localhost:3000?id=3"
            >
              localhost:3000?id=3
            </a>
          </p>
          <p>
            4. Use{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://localhost:3000?id=4"
            >
              localhost:3000?id=4
            </a>
          </p>
        </div>
      );

    return (
      <div style={{ margin: 16, padding: 16 }}>
        {this.state.success && <p>Form Successfully submitted</p>}
        <div style={{ color: "red" }}>
          {!!this.state.error && <p>[Error occurred]: {this.state.error}</p>}
        </div>

        <p>Name: {data.name}</p>
        <form onSubmit={this.handleSubmit}>
          {data.bpl && (
            <div>
              <label htmlFor="bpl_certificate_upload">
                {!!this.state.bpl && (
                  <span role="img" aria-label="tick">
                    ✅
                  </span>
                )}{" "}
                Upload Bpl certificate
              </label>
              <input
                required
                name="bpl"
                type="file"
                id="bpl_certificate_upload"
                onChange={(e) => this.handleChange("bpl", e.target.files[0])}
              />
            </div>
          )}

          {data.pd && (
            <div>
              <label htmlFor="pd_certificate_upload">
                {!!this.state.pd && (
                  <span role="img" aria-label="tick">
                    ✅
                  </span>
                )}{" "}
                Upload Physical Disablities certificate
              </label>
              <input
                required
                name="pd"
                type="file"
                id="pd_certificate_upload"
                onChange={(e) => this.handleChange("pd", e.target.files[0])}
              />
            </div>
          )}

          <div>
            <label htmlFor="img-upload">
              {!!this.state.img && (
                <span role="img" aria-label="tick">
                  ✅
                </span>
              )}{" "}
              Upload Photo
            </label>
            <input
              required
              name="img"
              type="file"
              id="img-upload"
              onChange={(e) => this.handleChange("img", e.target.files[0])}
            />
          </div>

          <input
            required
            type="submit"
            name="Submit"
            style={{ marginTop: 16 }}
          />
        </form>
      </div>
    );
  }
}

export default App;

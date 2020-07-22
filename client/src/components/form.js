import qs from "qs";
import React, { Component } from "react";

import { Notice } from "./notice";
import { validate } from "./validator";
import { FileUpload } from "./fileUpload";

class Form extends Component {
  state = {
    loading: true,

    nri: false,
    religion: "",
    studentId: "",
    nationality: "",
    blood_group: "",
    marital_status: "Single",
    annual_family_income: "",
    email: "rohit@gmail.com",

    area: "",
    // Current Address
    current_address_line_1: "",
    current_address_line_2: "",
    current_city: "",
    current_state: "",
    current_zip_code: "",
    current_country: "India",

    // Permanent Address
    permanent_address_line_1: "",
    permanent_address_line_2: "",
    permanent_city: "",
    permanent_state: "",
    permanent_zip_code: "",
    permanent_country: "India",

    // father's details
    father_name: "",
    father_email: "",
    father_phone: "",
    father_occupation: "",

    // mother's details
    mother_name: "",
    mother_email: "",
    mother_phone: "",
    mother_occupation: "",

    // documents
    bpl: {
      fileName: "",
      filePath: "",
      size: 0,
    },
    img: {
      fileName: "",
      filePath: "",
      size: 0,
    },
    pwd: {
      fileName: "",
      filePath: "",
      size: 0,
    },

    // Social Feeds
    twitter: "",
    facebook: "",
    instagram: "",
  };

  componentDidMount() {
    const { studentId } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    //  fetch student details

    this.setState(() => ({ studentId, loading: false }));
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState(() => ({ loading: true }));

    const data = {
      ...this.state,
      pwd: this.state.pwd.filePath,
      bpl: this.state.bpl.filePath,
      img: this.state.img.filePath,
    };

    const errors = validate(data);
    console.log({ errors });
    if (errors.length > 0) return;

    const formData = new FormData();

    for (const attribute in data) {
      formData.append(attribute, data[attribute]);
    }

    try {
      const response = await fetch(this.props.url, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (response.status === 201) {
        // success
      } else {
        console.log({ [response.status]: json.error });
        throw new Error(json.error);
      }
    } catch (error) {
      this.setState(() => ({ error: error.message }));
    } finally {
      this.setState(() => ({ loading: false }));
    }
  };

  setUploadedFile = ({ id, ...data }) => {
    this.setState(() => ({ [id]: data }));
  };

  handleCheckBox = (event) => {
    const { name, value } = event.target;

    this.setState(() => ({ [name]: value === "yes" }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(() => ({ [name]: value }));
  };

  render() {
    console.log(this.state);
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2>Personal Information</h2>

        <Notice notice={this.props.notice} />

        {/* <!-- Blood Group --> */}
        <div className="form-row">
          <div className="select-field">
            <label htmlFor="bloodGroup">
              Blood Group <i className="req">*</i>
            </label>
            <select
              id="bloodGroup"
              name="blood_group"
              onChange={this.handleChange}
              value={this.state.blood_group}
            >
              <option value="">Select Option</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <span aria-hidden="true" role="presentation">
              <svg
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
              </svg>
            </span>
          </div>
        </div>

        {/* <!-- Religion --> */}
        <div className="form-row">
          <label htmlFor="religion">
            Religion <i className="req">*</i>
          </label>
          <input
            type="text"
            id="religion"
            name="religion"
            onChange={this.handleChange}
            value={this.state.religion}
          />
        </div>

        {/* NRI */}
        <fieldset>
          <legend>NRI ( Non-Resident Indian )</legend>
          <label className="als-radio">
            <input
              type="radio"
              name="nri"
              value="yes"
              checked={this.state.nri}
              onChange={this.handleCheckBox}
            />
            <span className="als-radio_checkmark">&nbsp;</span> Yes
          </label>
          <label className="als-radio">
            <input
              name="nri"
              type="radio"
              value="no"
              checked={!this.state.nri}
              onChange={this.handleCheckBox}
            />
            <span className="als-radio_checkmark">&nbsp;</span> No
          </label>
        </fieldset>

        {/* <!-- Marital Status --> */}
        <fieldset>
          <legend>
            Marital Status <i className="req">*</i>
          </legend>
          <label className="als-radio">
            <input
              type="radio"
              value="Married"
              name="marital_status"
              onChange={this.handleChange}
              checked={this.state.marital_status === "Married"}
            />
            <span className="als-radio_checkmark">&nbsp;</span> Married
          </label>
          <label className="als-radio">
            <input
              type="radio"
              value="Single"
              name="marital_status"
              onChange={this.handleChange}
              checked={this.state.marital_status === "Single"}
            />
            <span className="als-radio_checkmark">&nbsp;</span> Single
          </label>
          <label className="als-radio">
            <input
              type="radio"
              value="Widow"
              name="marital_status"
              onChange={this.handleChange}
              checked={this.state.marital_status === "Widow"}
            />
            <span className="als-radio_checkmark">&nbsp;</span> Widow
          </label>
        </fieldset>

        {/* <!-- Income --> */}
        <div className="form-row">
          <label htmlFor="income">
            Annual Family Income State <i className="req">*</i>
          </label>
          <input
            id="income"
            type="number"
            placeholder="Approx."
            name="annual_family_income"
            onChange={this.handleChange}
            value={this.state.annual_family_income}
          />
        </div>

        {/* <!-- Area --> */}
        <fieldset>
          <legend>
            Area <i className="req">*</i>
          </legend>
          <label className="als-radio">
            <input
              type="radio"
              name="area"
              value="Rural"
              onChange={this.handleChange}
            />
            <span className="als-radio_checkmark">&nbsp;</span> Rural
          </label>
          <label className="als-radio">
            <input
              type="radio"
              name="area"
              value="Urban"
              onChange={this.handleChange}
            />
            <span className="als-radio_checkmark">&nbsp;</span> Urban
          </label>
        </fieldset>

        {/* <!-- Nationality --> */}
        <div className="form-row">
          <label htmlFor="nationality">
            Nationality <i className="req">*</i>
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            onChange={this.handleChange}
            value={this.state.nationality}
          />
        </div>

        <br />

        {/* <!-- Current Address --> */}
        <fieldset className="float-labels">
          <legend>
            Current Address <i className="req">*</i>
          </legend>
          <label htmlFor="c-street">
            Address Line 1 <i className="req">*</i>
          </label>
          <input
            type="text"
            id="c-street"
            name="current_address_line_1"
            onChange={this.handleChange}
            value={this.state.current_address_line_1}
          />

          <label htmlFor="c-street2">Address Line 2</label>
          <input
            type="text"
            id="c-street2"
            onChange={this.handleChange}
            name="current_address_line_2"
            value={this.state.current_address_line_2}
          />

          <div className="row">
            <div className="md-2">
              <label htmlFor="c-city">
                City <i className="req">*</i>
              </label>

              <input
                type="text"
                id="c-city"
                name="current_city"
                onChange={this.handleChange}
                value={this.state.current_city}
              />
            </div>
            <div className="md-2">
              <label htmlFor="c-state">
                State <i className="req">*</i>
              </label>
              <input
                type="text"
                id="c-state"
                name="current_state"
                onChange={this.handleChange}
                value={this.state.current_state}
              />
            </div>
          </div>

          <div className="row">
            <div className="md-2">
              <label htmlFor="c-zip">
                Postal / Zip Code <i className="req">*</i>
              </label>
              <input
                id="c-zip"
                type="text"
                name="current_zip_code"
                onChange={this.handleChange}
                value={this.state.current_zip_code}
              />
            </div>
            <div className="md-2">
              <div className="select-field">
                <label htmlFor="c-country">
                  Country <i className="req">*</i>
                </label>
                <select
                  id="c-country"
                  name="current_country"
                  onChange={this.handleChange}
                  value={this.state.current_country}
                >
                  <option value="India">India</option>
                </select>
                <span aria-hidden="true" role="presentation">
                  <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </fieldset>

        <br />

        {/* <!-- Permanent --> */}
        <fieldset className="float-labels">
          <legend>
            Permanent Address <i className="req">*</i>
          </legend>
          <label htmlFor="p-street">
            Address Line 1 <i className="req">*</i>
          </label>
          <input
            type="text"
            id="p-street"
            name="permanent_address_line_1"
            onChange={this.handleChange}
            value={this.state.permanent_address_line_1}
          />

          <label htmlFor="p-street2">Address Line 2</label>
          <input
            type="text"
            id="p-street2"
            name="permanent_address_line_2"
            onChange={this.handleChange}
            value={this.state.permanent_address_line_2}
          />

          <div className="row">
            <div className="md-2">
              <label htmlFor="p-city">
                City <i className="req">*</i>
              </label>
              <input
                type="text"
                id="p-city"
                name="permanent_city"
                onChange={this.handleChange}
                value={this.state.permanent_city}
              />
            </div>
            <div className="md-2">
              <label htmlFor="p-state">
                State <i className="req">*</i>
              </label>
              <input
                type="text"
                id="p-state"
                name="permanent_state"
                onChange={this.handleChange}
                value={this.state.permanent_state}
              />
            </div>
          </div>

          <div className="row">
            <div className="md-2">
              <label htmlFor="p-zip">
                Postal / Zip Code <i className="req">*</i>
              </label>
              <input
                type="text"
                id="p-zip"
                name="permanent_zip_code"
                onChange={this.handleChange}
                value={this.state.permanent_zip_code}
              />
            </div>
            <div className="md-2">
              <div className="select-field">
                <label htmlFor="p-country">
                  Country <i className="req">*</i>
                </label>
                <select
                  id="p-country"
                  name="permanent_country"
                  onChange={this.handleChange}
                  value={this.state.permanent_country}
                >
                  <option value="India">India</option>
                </select>
                <span aria-hidden="true" role="presentation">
                  <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </fieldset>

        <br />

        {/* <!-- Father --> */}
        <fieldset className="float-labels">
          <legend>Fathers Detail</legend>

          <label htmlFor="f-fullName">
            Fathers Name <i className="req">*</i>
          </label>
          <input
            type="text"
            id="f-fullName"
            name="father_name"
            onChange={this.handleChange}
            value={this.state.father_name}
          />

          <label htmlFor="f-email">Fathers Email</label>
          <input
            type="email"
            id="f-email"
            name="father_email"
            onChange={this.handleChange}
            value={this.state.father_email}
          />

          <label htmlFor="f-mobile">
            Fathers Mobile <i className="req">*</i>
          </label>
          <input
            type="tel"
            id="f-mobile"
            name="father_phone"
            onChange={this.handleChange}
            value={this.state.father_phone}
          />

          <label htmlFor="f-occupation">
            Fathers Occupation <i className="req">*</i>
          </label>
          <input
            type="tel"
            id="f-occupation"
            name="father_occupation"
            onChange={this.handleChange}
            value={this.state.father_occupation}
          />
        </fieldset>

        <br />

        {/* <!-- Mother --> */}
        <fieldset className="float-labels">
          <legend>Mothers Detail</legend>

          <label htmlFor="m-fullName">
            Mothers Name <i className="req">*</i>
          </label>
          <input
            type="text"
            id="m-fullName"
            name="mother_name"
            onChange={this.handleChange}
            value={this.state.mother_name}
          />

          <label htmlFor="m-email">Mothers Email</label>
          <input
            type="email"
            id="m-email"
            name="mother_email"
            onChange={this.handleChange}
            value={this.state.mother_email}
          />

          <label htmlFor="m-mobile">
            Mothers Mobile <i className="req">*</i>
          </label>
          <input
            type="tel"
            id="m-mobile"
            name="mother_phone"
            onChange={this.handleChange}
            value={this.state.mother_phone}
          />

          <label htmlFor="m-occupation">
            Mothers Occupation <i className="req">*</i>
          </label>
          <input
            type="tel"
            id="m-occupation"
            name="mother_occupation"
            onChange={this.handleChange}
            value={this.state.mother_occupation}
          />
        </fieldset>

        <br />

        {/* <!-- Social Media --> */}
        <fieldset className="float-labels">
          <legend>Social Media</legend>

          <label htmlFor="fb">Facebook</label>
          <input
            id="fb"
            type="text"
            name="facebook"
            onChange={this.handleChange}
            value={this.state.facebook}
          />

          <label htmlFor="tw">Twitter</label>
          <input
            id="tw"
            type="text"
            name="twitter"
            value={this.state.twitter}
            onChange={this.handleChange}
          />

          <label htmlFor="ig">
            Instagram <i className="req">*</i>
          </label>
          <input
            id="ig"
            type="tel"
            name="instagram"
            onChange={this.handleChange}
            value={this.state.instagram}
          />
        </fieldset>

        <FileUpload
          id="img"
          fileTag="Image"
          uploadedFile={this.state.img}
          uploadUrl="/students/uploads/selfie"
          setUploadedFile={this.setUploadedFile}
        />
        <FileUpload
          id="pwd"
          fileTag="Pwd Certificate"
          uploadedFile={this.state.pwd}
          uploadUrl="/students/uploads/pwd"
          setUploadedFile={this.setUploadedFile}
        />
        <FileUpload
          id="bpl"
          fileTag="Bpl Certificate"
          uploadedFile={this.state.bpl}
          uploadUrl="/students/uploads/bpl"
          setUploadedFile={this.setUploadedFile}
        />

        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export { Form };

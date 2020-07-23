import qs from "qs";
import React, { Component } from "react";

import { Notice } from "./notice";
import { Message } from "./message";
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

    area: "Urban",
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

    // Errors
    errors: {
      blood_group: "Select Blood Group",
      religion: "Enter Religion",
      annual_family_income: "Enter Annual family Income",
      nationality: "Enter Nationality",
      current_address_line_1: "Enter Address",
      current_city: "Enter City",
      current_state: "Enter State",
      current_zip_code: "Enter Zip Code",
      permanent_address_line_1: "Enter Address",
      permanent_city: "Enter City",
      permanent_state: "Enter State",
      permanent_zip_code: "Enter Zip Code",
      father_name: "Enter Father's Name",
      father_phone: "Enter Father's Mobile Number",
      father_occupation: "Enter Father's Occupation",
      mother_name: "Enter Mother's Name",
      mother_phone: "Enter Mother's Mobile Number",
      mother_occupation: "Enter Mother's Occupation",
    },
  };

  componentDidMount() {
    const { studentId } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    //  fetch student details

    this.setState(() => ({ studentId, loading: false }));
  }

  mapErrors = (errors) => {
    let placeholder = {};
    errors.forEach((error) => (placeholder[error.param] = error.msg));
    this.setState(() => ({ errors: placeholder }));
    document.getElementById(errors[0].param).focus();
    return;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState(() => ({ loading: true, errors: {} }));

    const data = {
      ...this.state,
      pwd: this.state.pwd.filePath,
      bpl: this.state.bpl.filePath,
      img: this.state.img.filePath,
    };

    const errors = validate(data);

    if (errors.length > 0) {
      this.mapErrors(errors);
      return;
    }

    const formData = new FormData();

    for (const attribute in data) {
      formData.append(attribute, data[attribute]);
    }

    try {
      const response = await fetch(this.props.url, {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        window.location.href = "/success.html";
        return;
      }

      if (response.status === 400) {
        const json = await response.json();
        this.mapErrors(json.error);
      } else {
        throw new Error("Internal Server error!");
      }
    } catch (error) {
      this.setState(() => ({ errors: { server: error.message } }));
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

    const { errors } = this.state;
    if (value.length > 0) {
      errors[name] = null;
    }

    this.setState(() => ({ [name]: value, errors }));
  };

  render() {
    console.log(this.state);
    const { errors } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2>Personal Information</h2>

        <Notice notice={this.props.notice} />

        {/* <!-- Blood Group --> */}
        <div className="form-row">
          <div className="select-field">
            <label htmlFor="blood_group">
              Blood Group <i className="req">*</i>
            </label>
            <select
              id="blood_group"
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
          {!!errors.blood_group && <Message message={errors.blood_group} />}
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
          {!!errors.religion && <Message message={errors.religion} />}
        </div>

        {/* NRI */}
        <fieldset>
          <legend>NRI ( Non-Resident Indian )</legend>
          <label className="als-radio">
            <input
              type="radio"
              name="nri"
              id="nri"
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
        <fieldset id="marital_status">
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
          {!!errors.marital_status && (
            <Message message={errors.marital_status} />
          )}
        </fieldset>

        {/* <!-- Income --> */}
        <div className="form-row">
          <label htmlFor="annual_family_income">
            Annual Family Income State <i className="req">*</i>
          </label>
          <input
            id="annual_family_income"
            type="number"
            placeholder="Approx."
            name="annual_family_income"
            onChange={this.handleChange}
            value={this.state.annual_family_income}
          />
          {!!errors.annual_family_income && (
            <Message message={errors.annual_family_income} />
          )}
        </div>

        {/* <!-- Area --> */}
        <fieldset>
          <legend>
            Area <i className="req">*</i>
          </legend>
          <label className="als-radio">
            <input
              id="area"
              name="area"
              type="radio"
              value="Rural"
              onChange={this.handleChange}
              checked={this.state.area === "Rural"}
            />
            <span className="als-radio_checkmark">&nbsp;</span> Rural
          </label>
          <label className="als-radio">
            <input
              type="radio"
              name="area"
              value="Urban"
              onChange={this.handleChange}
              checked={this.state.area === "Urban"}
            />
            <span className="als-radio_checkmark">&nbsp;</span> Urban
          </label>
          {!!errors.area && <Message message={errors.area} />}
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
          {!!errors.nationality && <Message message={errors.nationality} />}
        </div>

        <br />

        {/* <!-- Current Address --> */}
        <fieldset className="float-labels">
          <legend>
            Current Address <i className="req">*</i>
          </legend>
          <label htmlFor="current_address_line_1">
            Address Line 1 <i className="req">*</i>
          </label>
          <input
            type="text"
            id="current_address_line_1"
            name="current_address_line_1"
            onChange={this.handleChange}
            value={this.state.current_address_line_1}
          />
          {!!errors.current_address_line_1 && (
            <Message message={errors.current_address_line_1} />
          )}

          <label htmlFor="current_address_line_2">Address Line 2</label>
          <input
            type="text"
            id="current_address_line_2"
            onChange={this.handleChange}
            name="current_address_line_2"
            value={this.state.current_address_line_2}
          />

          <div className="row">
            <div className="md-2">
              <label htmlFor="current_city">
                City <i className="req">*</i>
              </label>

              <input
                type="text"
                id="current_city"
                name="current_city"
                onChange={this.handleChange}
                value={this.state.current_city}
              />
              {!!errors.current_city && (
                <Message message={errors.current_city} />
              )}
            </div>
            <div className="md-2">
              <label htmlFor="current_state">
                State <i className="req">*</i>
              </label>
              <input
                type="text"
                id="current_state"
                name="current_state"
                onChange={this.handleChange}
                value={this.state.current_state}
              />
              {!!errors.current_state && (
                <Message message={errors.current_state} />
              )}
            </div>
          </div>

          <div className="row">
            <div className="md-2">
              <label htmlFor="current_zip_code">
                Postal / Zip Code <i className="req">*</i>
              </label>
              <input
                id="current_zip_code"
                type="text"
                name="current_zip_code"
                onChange={this.handleChange}
                value={this.state.current_zip_code}
              />
              {!!errors.current_zip_code && (
                <Message message={errors.current_zip_code} />
              )}
            </div>
            <div className="md-2">
              <div className="select-field">
                <label htmlFor="current_country">
                  Country <i className="req">*</i>
                </label>
                <select
                  id="current_country"
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
                {!!errors.current_country && (
                  <Message message={errors.current_country} />
                )}
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
          <label htmlFor="permanent_address_line_1">
            Address Line 1 <i className="req">*</i>
          </label>
          <input
            type="text"
            id="permanent_address_line_1"
            name="permanent_address_line_1"
            onChange={this.handleChange}
            value={this.state.permanent_address_line_1}
          />
          {!!errors.permanent_address_line_1 && (
            <Message message={errors.permanent_address_line_1} />
          )}

          <label htmlFor="permanent_address_line_2">Address Line 2</label>
          <input
            type="text"
            id="permanent_address_line_2"
            name="permanent_address_line_2"
            onChange={this.handleChange}
            value={this.state.permanent_address_line_2}
          />

          <div className="row">
            <div className="md-2">
              <label htmlFor="permanent_city">
                City <i className="req">*</i>
              </label>
              <input
                type="text"
                id="permanent_city"
                name="permanent_city"
                onChange={this.handleChange}
                value={this.state.permanent_city}
              />
              {!!errors.permanent_city && (
                <Message message={errors.permanent_city} />
              )}
            </div>
            <div className="md-2">
              <label htmlFor="permanent_state">
                State <i className="req">*</i>
              </label>
              <input
                type="text"
                id="permanent_state"
                name="permanent_state"
                onChange={this.handleChange}
                value={this.state.permanent_state}
              />
              {!!errors.permanent_state && (
                <Message message={errors.permanent_state} />
              )}
            </div>
          </div>

          <div className="row">
            <div className="md-2">
              <label htmlFor="permanent_zip_code">
                Postal / Zip Code <i className="req">*</i>
              </label>
              <input
                type="text"
                id="permanent_zip_code"
                name="permanent_zip_code"
                onChange={this.handleChange}
                value={this.state.permanent_zip_code}
              />
              {!!errors.permanent_zip_code && (
                <Message message={errors.permanent_zip_code} />
              )}
            </div>
            <div className="md-2">
              <div className="select-field">
                <label htmlFor="permanent_country">
                  Country <i className="req">*</i>
                </label>
                <select
                  id="permanent_country"
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
                {!!errors.permanent_country && (
                  <Message message={errors.permanent_country} />
                )}
              </div>
            </div>
          </div>
        </fieldset>

        <br />

        {/* <!-- Father --> */}
        <fieldset className="float-labels">
          <legend>Fathers Detail</legend>

          <label htmlFor="father_name">
            Fathers Name <i className="req">*</i>
          </label>
          <input
            type="text"
            id="father_name"
            name="father_name"
            onChange={this.handleChange}
            value={this.state.father_name}
          />
          {!!errors.father_name && <Message message={errors.father_name} />}

          <label htmlFor="father_email">Fathers Email</label>
          <input
            type="email"
            id="father_email"
            name="father_email"
            onChange={this.handleChange}
            value={this.state.father_email}
          />

          <label htmlFor="father_phone">
            Fathers Mobile <i className="req">*</i>
          </label>
          <input
            type="tel"
            id="father_phone"
            name="father_phone"
            onChange={this.handleChange}
            value={this.state.father_phone}
          />
          {!!errors.father_phone && <Message message={errors.father_phone} />}

          <label htmlFor="father_occupation">
            Fathers Occupation <i className="req">*</i>
          </label>
          <input
            type="tel"
            id="father_occupation"
            name="father_occupation"
            onChange={this.handleChange}
            value={this.state.father_occupation}
          />
          {!!errors.father_occupation && (
            <Message message={errors.father_occupation} />
          )}
        </fieldset>

        <br />

        {/* <!-- Mother --> */}
        <fieldset className="float-labels">
          <legend>Mothers Detail</legend>

          <label htmlFor="mother_name">
            Mothers Name <i className="req">*</i>
          </label>
          <input
            type="text"
            id="mother_name"
            name="mother_name"
            onChange={this.handleChange}
            value={this.state.mother_name}
          />
          {!!errors.mother_name && <Message message={errors.mother_name} />}

          <label htmlFor="m-email">Mothers Email</label>
          <input
            type="email"
            id="m-email"
            name="mother_email"
            onChange={this.handleChange}
            value={this.state.mother_email}
          />

          <label htmlFor="mother_phone">
            Mothers Mobile <i className="req">*</i>
          </label>
          <input
            type="tel"
            id="mother_phone"
            name="mother_phone"
            onChange={this.handleChange}
            value={this.state.mother_phone}
          />
          {!!errors.mother_phone && <Message message={errors.mother_phone} />}

          <label htmlFor="mother_occupation">
            Mothers Occupation <i className="req">*</i>
          </label>
          <input
            type="tel"
            id="mother_occupation"
            name="mother_occupation"
            onChange={this.handleChange}
            value={this.state.mother_occupation}
          />
          {!!errors.mother_occupation && (
            <Message message={errors.mother_occupation} />
          )}
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
          uploadUrl={this.props.imgUploadUrl}
          setUploadedFile={this.setUploadedFile}
        />
        <FileUpload
          id="pwd"
          fileTag="Pwd Certificate"
          uploadedFile={this.state.pwd}
          uploadUrl={this.props.pwdUploadUrl}
          setUploadedFile={this.setUploadedFile}
        />
        <FileUpload
          id="bpl"
          fileTag="Bpl Certificate"
          uploadedFile={this.state.bpl}
          uploadUrl={this.props.bplUploadUrl}
          setUploadedFile={this.setUploadedFile}
        />

        {!!errors.server && <Message message={errors.server} />}

        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export { Form };

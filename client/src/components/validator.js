import { isIn, isNumeric } from "validator";

export const validate = (params) => {
  const errors = [];

  /* 
    Check if these params have values
    Alignment of params array should match the dom element alignment
  */

  [
    "blood_group",
    "religion",
    "annual_family_income",
    "nationality",

    "current_address_line_1",
    "current_city",
    "current_state",
    "current_zip_code",
    "current_country",

    "permanent_address_line_1",
    "permanent_city",
    "permanent_state",
    "permanent_zip_code",
    "permanent_country",

    "father_name",
    "father_phone",
    "father_occupation",

    "mother_name",
    "mother_phone",
    "mother_occupation",
  ].forEach((param) => {
    if (!exists(params[param])) errors.push({ msg: "Invalid Value!", param });
  });

  // Check area
  if (!isIn(params.area, ["Urban", "Rural"])) {
    errors.push({
      msg: "Invalid Value!",
      param: "area",
    });
  }

  // Check marital_status
  if (!isIn(params.marital_status, ["Single", "Widow", "Married"])) {
    errors.push({
      msg: "Invalid Value!",
      param: "marital_status",
    });
  }

  return errors;
};

const exists = (param) => {
  if (typeof param === "number") return isNumeric(param);
  if (typeof param === "string") return param.length > 0;

  return false;
};

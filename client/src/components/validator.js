import { isIn, isNumeric } from "validator";

export const validate = (params) => {
  const errors = [];

  // Check if these params have values
  [
    "religion",
    "blood_group",
    "nationality",
    "annual_family_income",

    "father_phone",
    "father_name",
    "father_occupation",

    "mother_phone",
    "mother_name",
    "mother_occupation",

    "permanent_city",
    "permanent_state",
    "permanent_country",
    "permanent_zip_code",
    "permanent_address_line_1",

    "current_city",
    "current_state",
    "current_country",
    "current_zip_code",
    "current_address_line_1",
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

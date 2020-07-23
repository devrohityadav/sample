import { body, param } from "express-validator";

export const validator = () => {
  return [
    param("studentId").exists({ checkNull: true, checkFalsy: true }),
    body("nri").isBoolean(),
    body("email").exists().isEmail(),
    /*
      Check if these params have values
      Alignment of params array should match the dom element alignment
    */
    body([
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
    ])
      .notEmpty()
      .exists()
      .isString(),
    body([
      "twitter",
      "facebook",
      "instagram",

      "father_email",
      "mother_email",

      "current_address_line_2",
      "permanent_address_line_2",
    ]).isString(),
    body("area").exists().isIn(["Urban", "Rural"]),
    body("marital_status").exists().isIn(["Single", "Widow", "Married"]),
  ];
};

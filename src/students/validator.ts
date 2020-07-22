import { body, param } from "express-validator";

export const validator = () => {
  return [
    param("studentId").exists({ checkNull: true, checkFalsy: true }),
    body("nri").isBoolean(),
    body("email").exists().isEmail(),
    body([
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
    ])
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

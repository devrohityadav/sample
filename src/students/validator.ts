import { body, param } from "express-validator";

export const validator = () => {
  return [
    param("studentId").exists({ checkNull: true, checkFalsy: true }),
    body("nri").isBoolean(),
    body("email").exists().isEmail(),
    body([
      "_state",
      "father_name",
      "mother_name",
      "blood_group",
      "nationality",
      "annual_family_income",
    ])
      .exists()
      .isString(),
    body([
      "religion",
      "twitter",
      "facebook",
      "instagram",
      "father_email",
      "father_phone",
      "mother_email",
      "mother_phone",
      "current_address",
      "permanent_address",
      "father_occupation",
      "mother_occupation",
    ]).isString(),
    body("area").exists().isIn(["urban", "rural"]),
    body("marital_status").exists().isIn(["single", "widow", "married"]),
  ];
};

import { v4 as uuidV4 } from "uuid";

import db from "../db";

interface Student {
  id: any;
  nri: Boolean;
  name: String;
  religion: String;
  studentId: String;
  nationality: String;
  blood_group: String;
  marital_status: String;
  annual_family_income: String;

  // Postal Address
  area: String;

  // Permanent Address
  permanent_address_line_1: String;
  permanent_address_line_2: String;
  permanent_city: String;
  permanent_state: String;
  permanent_zip_code: String;
  permanent_country: String;

  // Current Address
  current_address_line_1: String;
  current_address_line_2: String;
  current_city: String;
  current_state: String;
  current_zip_code: String;
  current_country: String;

  // father's details
  father_name: String;
  father_email: String;
  father_phone: String;
  father_occupation: String;

  // mother's details
  mother_name: String;
  mother_email: String;
  mother_phone: String;
  mother_occupation: String;

  // documents
  bpl: String;
  img: String;
  pwd: String;

  // Social Feeds
  twitter: String;
  facebook: String;
  instagram: String;
}

const create = (student: Student) => {
  const id = uuidV4();

  return db.query(
    "INSERT INTO students (id, studentId, nri, name, religion, nationality, blood_group, marital_status, annual_family_income, area, permanent_address_line_1, permanent_address_line_2, permanent_city, permanent_state, permanent_zip_code, permanent_country, current_address_line_1, current_address_line_2, current_city, current_state, current_zip_code, current_country, father_name, father_email, father_phone, father_occupation, mother_name, mother_email, mother_phone, mother_occupation, bpl, img, pwd, twitter, facebook, instagram) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36) RETURNING id;",
    [
      id,
      student.studentId,
      student.nri,
      student.name,
      student.religion,
      student.nationality,
      student.blood_group,
      student.marital_status,
      student.annual_family_income,

      student.area,

      student.permanent_address_line_1,
      student.permanent_address_line_2,
      student.permanent_city,
      student.permanent_state,
      student.permanent_zip_code,
      student.permanent_country,

      student.current_address_line_1,
      student.current_address_line_2,
      student.current_city,
      student.current_state,
      student.current_zip_code,
      student.current_country,

      student.father_name,
      student.father_email,
      student.father_phone,
      student.father_occupation,

      student.mother_name,
      student.mother_email,
      student.mother_phone,
      student.mother_occupation,

      student.bpl,
      student.img,
      student.pwd,

      student.twitter,
      student.facebook,
      student.instagram,
    ]
  );
};

const getById = (id: string) => {
  return db.query("SELECT * FROM students WHERE studentId=$1;", [id]);
};

const getAll = () => {
  return db.query("SELECT * FROM students;");
};

export { create, getAll, getById };

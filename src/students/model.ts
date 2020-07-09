import { v4 as uuidV4 } from "uuid";

import db from "../db";

interface Student {
  id: any;
  nri: Boolean;
  email: String;
  religion: String;
  studentId: String;
  nationality: String;
  blood_group: String;
  marital_status: String;
  annual_family_income: String;

  // Postal Address
  area: String;
  state: String;
  current_address: String;
  permanent_address: String;

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
    "INSERT INTO students (id, studentId, nri, email, religion, nationality, blood_group, marital_status, annual_family_income, area, _state, current_address, permanent_address, father_name, father_email, father_phone, father_occupation, mother_name, mother_email, mother_phone, mother_occupation, bpl, img, pwd, twitter, facebook, instagram) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27) RETURNING id;",
    [
      id,
      student.studentId,
      student.nri,
      student.email,
      student.religion,
      student.nationality,
      student.blood_group,
      student.marital_status,
      student.annual_family_income,
      student.area,
      student.state,
      student.current_address,
      student.permanent_address,
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
  return db.query("SELECT * FROM students WHERE id=$1;", [id]);
};

const getAll = () => {
  return db.query("SELECT * FROM students;");
};

export { create, getAll, getById };

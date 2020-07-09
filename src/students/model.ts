import db from "../db";

interface Address {
  state: "string";
  current?: "string";
  permanent?: "string";
  area: "urban" | "rural";
}

interface ParentDetails {
  name?: "string";
  email: "string";
  phone: "string";
  occupation: "string";
}

interface Father extends ParentDetails {}
interface Mother extends ParentDetails {}

interface Documents {
  bpl: "string";
  img: "string";
  pwd: "string";
}

interface SocialFeeds {
  twitter: "string";
  facebook: "string";
  instagram: "string";
}

interface Student {
  id: any;
  nri: "boolean";
  father: Father;
  mother: Mother;
  email?: "string";
  religion: "string";
  documents: Documents;
  nationality?: "string";
  blood_group?: "string";
  postal_address: Address;
  social_feeds: SocialFeeds;
  annual_family_income?: "string";
  marital_status?: "single" | "widow" | "married";
}

const create = (student: Student) => {
  return db.query(
    "INSERT INTO students (nri, email, religion, nationality, blood_group, marital_status, annual_family_income, postal_address, father, mother, documents, social_feeds,id) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13) RETURNING id",
    [
      student.nri,
      student.email,
      student.religion,
      student.nationality,
      student.blood_group,
      student.marital_status,
      student.annual_family_income,
      student.postal_address,
      student.father,
      student.mother,
      student.documents,
      student.social_feeds,
      student.id,
    ]
  );
};

const getById = (id: string) => {
  return db.query("SELECT * FROM students WHERE id=$1", [id]);
};

export { create, getById };

const forms = [
  {
    form_id: "1",
    name: "John Doe",
    bpl: true,
    pd: false,
  },
  {
    form_id: "2",
    name: "Jennie Doe",
    bpl: true,
    pd: true,
  },
  {
    form_id: "3",
    name: "Sophie Doe",
    bpl: false,
    pd: false,
  },
  {
    form_id: "4",
    name: "Boris Doe",
    bpl: false,
    pd: true,
  },
];

export const getData = (id) => {
  return forms.filter((form) => form.form_id === id)[0];
};

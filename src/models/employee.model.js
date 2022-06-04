export default function(db) {
  return {
    findAll() {
      return db.data.employees;
    },
  };
};

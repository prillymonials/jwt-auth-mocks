export default function(db) {
  return {
    async create(payload) {
      const user = {
        ...payload,
        id: db.data._userId,
      };

      db.data.users.push(user);

      db.data._userId += 1;

      await db.write();

      return user;
    },
    findByUsername(username) {
      return db.data.users.find(
        user => user.username === username,
      );
    },
    findByEmail(email) {
      return db.data.users.find(
        user => user.email === email,
      );
    },
    findById(id) {
      return db.data.users.find(user => user.id === id);
    },
  };
};

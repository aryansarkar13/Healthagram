class Users {
  constructor() {
    this.users = [];
  }

  //id refers to socketId
  //userId refers to the id of the user save in database
  AddUserData(id, userId, name, image, room) {
    const user = {
      id,
      userId,
      name,
      image,
      room
    };
    this.users.push(user);
    return user;
  }

  RemoveUser(id) {
    const user = this.GetUser(id);
    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return user;
  }

  GetUser(id) {
    const getUser = this.users.filter(user => {
      return user.id === id;
    })[0];
    return getUser;
  }

  GetUsersList(room) {
    const users = this.users.filter(user => user.room === room);
    const namesArray = users.map(user => {
      return { name: user.name, image: user.image, id: user.userId };
    });
    return namesArray;
  }
}

module.exports = Users;

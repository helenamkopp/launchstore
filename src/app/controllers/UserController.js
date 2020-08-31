class UserController {
  constructor(name, address) {
    this.name = name
  }

  getName() {
    this.name
  }
}

module.exports = new UserController("Mayk", "Rua x")
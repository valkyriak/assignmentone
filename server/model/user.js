class User {

    constructor(username, password, email, age, birthdate, valid) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.birthdate = birthdate;
        this.valid = false
    }

}
module.exports = {
    User: User
}

class userDTO {
    constructor(user) {
        this.firstName = user.name;
        this.lastName = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role;
    }
}

export default userDTO;
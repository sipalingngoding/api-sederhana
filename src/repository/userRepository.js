class userRepository{
    #users;
    constructor(users) {
        this.#users = users;
    }

    findAll(){
        return this.#users;
    }

    findById(id){
        const user = this.#users.find(u => u.id === id);
        return user ?? null;
    }

    findIndex(id){
        return this.#users.findIndex(u => u.id === id);
    }

    add({id,username,address,country})
    {
        this.#users.push({id,username,address,country});
        return true;
    }

    update(index,{id,username,address,country}){
        this.#users.splice(index,1,{id,username,address,country});
        return true;
    }

    delete(index){
        this.#users.splice(index,1);
        return true;
    }

    lastId(){
        const users = this.findAll();
        const userLast = users[users.length - 1];
        return userLast.id;
    }

}

export default userRepository;
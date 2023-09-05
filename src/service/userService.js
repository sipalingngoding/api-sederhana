import NotFoundError from "../error/notFoundError.js";
import ClientError from "../error/clientError.js";

class userService{
    #userRepository
    constructor(userRepository) {
        this.#userRepository = userRepository;
    }

    getAll(){
        return this.#userRepository.findAll();
    }

    getById(id){
        const user = this.#userRepository.findById(+id);
        if(!user) throw new NotFoundError('user not found');
        return user;
    }

    search({username,address,country}){
        const usersFilter = this.#userRepository.findAll().filter(u => {
            const usernameResult = username ? new RegExp(username,'i').test(u.username) : true;
            const addressResult = address ? new RegExp(address,'i').test(u.address): true;
            const countryResult = country  ? new RegExp(country,'i').test(u.country) : true;
            return usernameResult && addressResult && countryResult;
        });
        if(usersFilter.length === 0) throw new NotFoundError('user not found');
        return usersFilter;
    }

    add({username, address,country}){
        this.validateAdd({username,address,country});
        const id = this.#userRepository.lastId() + 1 ;
        return this.#userRepository.add({id,username,address,country});
    }

    validateAdd({username,address,country})
    {
        if(!username || !address || !country) throw new ClientError('username, address, or country cannot blank');
        const user = this.#userRepository.findAll().find(u => new RegExp(username,'i').test(u.username));
        if(user) throw new ClientError('username already exist');
    }

    update({id, username, address, country}){
        const user = this.#userRepository.findById(+id);
        if(!user) throw new NotFoundError('user not found');

        if(username === null) username = user.username;
        if(address === null) address = user.address;
        if(country === null) country = user.country;

        this.validateAdd({username,address,country});
        const index = this.#userRepository.findIndex(+id);
        return this.#userRepository.update(index,{id,username,address,country});
    }

    delete(id){
        const user = this.#userRepository.findById(+id);
        if(!user) throw new NotFoundError('user not found');
        const index = this.#userRepository.findIndex(+id);
        return this.#userRepository.delete(index);
    }

}

export default userService;
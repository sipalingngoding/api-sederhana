import userRepository from "../src/repository/userRepository.js";
import users from "../src/data/users.js";

const userRepo = new userRepository(users);
const addUserTest = ({id,username,address,country})=>{
    userRepo.add({id,username,address,country});
};

const removeTestUser = ()=>{
    userRepo.delete(2);
};

export {
    addUserTest,removeTestUser
}
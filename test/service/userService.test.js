import {describe, test, expect, beforeEach, afterEach} from '@jest/globals';

import userService from '../../src/service/userService.js';
import userRepository from '../../src/repository/userRepository.js';
import users from '../../src/data/users.js';

let userServiceTest;
let userRepo;

const userNew = {id:4,username : 'rendi',address:'Papua',country : 'Indonesia'};
const userUpdate = {id: 4,username:'sinagadiory',address :'Jakarta',country:'Indonesia'};

beforeEach(()=>{
    userRepo= new userRepository(users);
    userRepo.add(userNew);
    userServiceTest = new userService(userRepo);
});

afterEach(()=>{
    userRepo.delete(2);
});

describe('Test user service',()=>{
    test('Test getAll users',()=>{
        const users = userServiceTest.getAll();
        expect(users).toHaveLength(3);
        expect(users).toContainEqual(userNew);
    });

    test('Test Found Get By Id',()=>{
        const user = userServiceTest.getById(4);
        expect(user).not.toBeNull();
        expect(user).toStrictEqual(userNew);
    });

    test('Test Not Found Get By Id',()=>{
        expect(()=>{
            userServiceTest.getById(2);
        }).toThrow(/user not found/i)
    });

    test('Search users by country',()=>{
        const users = userServiceTest.search({username : null,address : null,country: 'Indonesia'});
        expect(users).toHaveLength(3);
    });

    test('Search user by username',()=>{
        const user = userServiceTest.search({username : 'rendi',address:null,country:null});
        expect(user).toHaveLength(1);
        expect(user).toContainEqual(userNew);
    });

    test('Search user not found',()=>{
        expect(()=>{
            userServiceTest.search({username :'rendi',address:null,country:'Inggris'})
        }).toThrow(/user not found/i)
    });

    test('add user success',()=>{
        userRepo.delete(2);
        expect(userServiceTest.add({username : userNew.username, address : userNew.address, country : userNew.country})).toBeTruthy();
        const users = userServiceTest.getAll();
        expect(users).toHaveLength(3);
        expect(users).toContainEqual(userNew);
    });

    test('Add user fail, username already exist ',()=>{
        userRepo.delete(2);
        expect(()=>{
            userServiceTest.add({username : 'diorypribadi',address : 'Pekanbaru',country : 'Indonesia'});
        }).toThrow(/username already exist/i);
        const users = userServiceTest.getAll();
        expect(users).toHaveLength(2);
        expect(users).not.toContainEqual({username : 'diorypribadi',address : 'Pekanbaru',country : 'Indonesia'});
    });

    test('add user fail',()=>{
        expect(()=>{
            userServiceTest.add({username : null, address: 'Bandung', country :'Indonesia'})
        }).toThrow(/username, address, or country cannot blank/i)
    });

    test('Update user success',()=>{
        expect(userServiceTest.update(userUpdate)).toBeTruthy();
        const user = userServiceTest.getById('4');
        expect(user).toStrictEqual(userUpdate);
    });

    test('Update user fail with not found',()=>{
        expect(()=>{
            userServiceTest.update({...userUpdate,id:2});
        }).toThrow(/user not found/i);
    });

    test('Update user fail, field blank',()=>{
        expect(()=>{
            userServiceTest.update({...userUpdate,username : ''});
        }).toThrow(/username, address, or country cannot blank/i);
    });

    test('Delete user success',()=>{
        expect(userServiceTest.delete('4')).toBeTruthy();
        const users = userServiceTest.getAll();
        expect(users).toHaveLength(2);
        expect(users).not.toContainEqual(userNew);
    });

    test('Delete user fail. User not found',()=>{
        expect(()=>{
            userServiceTest.delete('5');
        }).toThrow(/user not found/i);
    });

});
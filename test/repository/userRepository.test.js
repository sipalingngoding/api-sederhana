import {describe, test, expect, beforeEach, afterEach} from '@jest/globals';

import userRepository from '../../src/repository/userRepository.js';
import users from '../../src/data/users.js';

let userRepositoryTest;

const userNew = {id:4,username : 'rendi',address:'Papua',country : 'Indonesia'};
const userUpdate = {id: 1,username:'sinagadiory',address :'Jakarta',country:'Indonesia'};

beforeEach(()=>{
    userRepositoryTest = new userRepository(users);
    userRepositoryTest.add(userNew);
});

afterEach(()=>{
    userRepositoryTest.delete(2);
});

describe('Test user repository',()=>{
    test('find all users',()=>{
        const users = userRepositoryTest.findAll();
        expect(users).toHaveLength(3);
        expect(users).toContainEqual({
            id :1,
            username : 'diorypribadi',
            address : 'Bandung',
            country : 'Indonesia'
        });
        expect(users).toContainEqual({
            id: 3,
            username : 'budiman',
            address : 'Jakarta',
            country : 'Indonesia',
        });
        expect(users).toContainEqual(userNew);
    });

    test('Find By Id Found',()=>{
        const user = userRepositoryTest.findById(1);
        expect(user).not.toBeNull();
        expect(user).toHaveProperty('id',1);
        expect(user).toHaveProperty('username','diorypribadi');
        expect(user).toHaveProperty('address','Bandung');
        expect(user).toHaveProperty('country','Indonesia');
    });


    test('Find By Id Not Found',()=>{
        const user = userRepositoryTest.findById(2);
        expect(user).toBeNull();
    });

    test('Find Index Found',()=>{
        const index = userRepositoryTest.findIndex(1);
        expect(index).toBe(0);
    });

    test('Find Index Not Found',()=>{
        const index = userRepositoryTest.findIndex(2);
        expect(index).toBe(-1);
    });

    test('Add user success',()=>{
        userRepositoryTest.delete(2);
        expect(userRepositoryTest.add(userNew)).toBeTruthy();
        const users = userRepositoryTest.findAll();
        expect(users).toHaveLength(3);
        expect(users).toContainEqual(userNew);
    });

    test('Update user success',()=>{
        userRepositoryTest.update(2,userUpdate);
        const users = userRepositoryTest.findAll();
        expect(users).toHaveLength(3);
        expect(users[2]).toEqual(userUpdate);
    });

    test('Delete user success',()=>{
        expect(userRepositoryTest.delete(2)).toBeTruthy();
        const users = userRepositoryTest.findAll();
        expect(users).toHaveLength(2);
        expect(users).not.toContainEqual(userNew);
    });
});
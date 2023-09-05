import supertest from 'supertest';
import {describe, test, expect, afterEach, beforeEach} from '@jest/globals';
import app from '../src/app/index.js';
import {addUserTest, removeTestUser} from "./util.js";


const userNew = {id:4,username : 'rendi',address:'Papua',country : 'Indonesia'};
const userUpdate = {id: 4,username:'sinagadiory',address :'Jakarta',country:'Indonesia'};

describe('GET /users',()=>{
    test('should get users all',async ()=>{
        const response = await supertest(app).get('/users');

        expect(response.status).toBe(200);
        const users = response.body.data.users;
        expect(users).toHaveLength(2);
    })
});

describe('GET /user/:id',()=>{
    test('should get user by id success',async ()=>{
        const response = await supertest(app).get('/users/1');
        expect(response.status).toBe(200);
        const user = response.body.data.user;
        expect(user).toStrictEqual({id:1,username :'diorypribadi',address :'Bandung',country:'Indonesia'});
    });

    test('fail get user by id, not found',async ()=>{
        const response = await supertest(app).get('/users/2');
        expect(response.status).toBe(404);
        const message = response.body.message;
        expect(message).toMatch(/user not found/i);
    });
});

describe('GET /search',()=>{
    test('get users by username = diorypribadi',async ()=>{
        const response = await supertest(app).get('/search?username=diorypribadi');
        expect(response.status).toBe(200);
        const users = response.body.data.users;
        expect(users).toHaveLength(1);
        expect(users[0]).toHaveProperty('username','diorypribadi');
        expect(users[0]).toHaveProperty('address','Bandung');
        expect(users[0]).toHaveProperty('country','Indonesia');
    });

    test('get user by country = Indonesia',async ()=>{
        const response = await supertest(app).get('/search?country=Indonesia');
        expect(response.status).toBe(200);
        const users = response.body.data.users;
        expect(users).toHaveLength(2);
    });

    test('get user not found',async ()=>{
        const response = await supertest(app).get('/search?username=diorypribadi&address=Jakarta');
        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/user not found/i);
    });
});

describe('POST /user',()=>{
    afterEach(()=>{
        removeTestUser();
    });
    test('add user success',async ()=>{
        const response = await supertest(app)
            .post('/user')
            .set('Accept','application/json')
            .send({username : userNew.username, address :userNew.address,country : userNew.country});
        expect(response.status).toBe(201);
        expect(response.body.message).toMatch(/add user success/i);
    });

    test('add user fail, with username already',async ()=>{
        const response = await supertest(app)
            .post('/user')
            .set('Accept','application/json')
            .send({username:'diorypribadi',address :'Papua',country:'Indonesia'});
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/username already exist/i)
    });

    test('add user fail, username blank',async ()=>{
        const response = await supertest(app)
            .post('/user')
            .set('Accept','application/json')
            .send({...userNew,username : ''});
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/username, address, or country cannot blank/i)
    });
});

describe('UPDATE /users/:id',() =>{
    beforeEach(()=>{
        addUserTest(userNew);
    });

    afterEach(() => {
        removeTestUser();
    });

    test('update user success',async ()=>{
        const response = await supertest(app)
            .put('/users/4')
            .set('Accept','application/json')
            .send(userUpdate);
        expect(response.status).toBe(200);
        expect(response.body.message).toMatch(/update user success/i);
    });

    test('update user fail, user not found',async ()=>{
        const response = await supertest(app)
            .put('/users/2')
            .set('Accept','application/json')
            .send(userUpdate);
        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/user not found/i);
    });

    test('update user fail, username blank',async ()=>{
        const response = await supertest(app)
            .put('/users/4')
            .set('Accept','application/json')
            .send({...userUpdate,username :''});
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/username, address, or country cannot blank/i);
    });
});

describe('DELETE /users/:id',()=>{
    beforeEach(()=>{
        addUserTest(userNew);
    });

    afterEach(() => {
        removeTestUser();
    });

    test('Delete user success',async ()=>{
        const response = await supertest(app)
            .delete('/users/4');
        expect(response.status).toBe(200);
        expect(response.body.message).toMatch(/delete user success/i)
    });

    test('Delete user fail, not found',async ()=>{
        const response = await supertest(app)
            .delete('/users/2');
        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/user not found/i);
    });
});

import userService from '../service/userService.js';
import userRepository from '../repository/userRepository.js';
import users from '../data/users.js';

const UserService = new userService(new userRepository(users));

class userController{
    static getAll(req,res){
        const users = UserService.getAll();
        res.json({
            status :'success',
            data : {
                users,
            },
        });
    }

    static getById(req,res,next){
        try{
            const user = UserService.getById(req.params.id);
            return res.json({
                status : 'success',
                data : {
                    user,
                },
            });
        }catch (err){
            next(err);
        }
    }

    static search(req,res,next){
        try{
            const {username = null, address = null, country = null} = req.query;
            const result = UserService.search({username,address,country});
            return res.json({
                status : 'success',
                data : {
                    users: result,
                },
            })
        }catch (err){
            next(err);
        }
    }

    static add(req,res,next){
        try{
            UserService.add(req.body);
            return res.status(201).json({
                status :'success',
                message : 'add user success',
            });
        }catch (err){
            next(err);
        }
    };

    static update(req,res,next){
        try{
            const {username = null, address = null, country =null} = req.body;
            UserService.update({id:req.params.id,username,address,country});
            return res.json({
                success : 'success',
                message : 'update user success',
            });
        }catch (err){
            next(err);
        }
    }

    static delete(req,res,next){
        try{
            UserService.delete(req.params.id);
            return res.json({
                status  : 'success',
                message : 'delete user success',
            });
        }catch (err){
            next(err);
        }
    }
}

export default userController;

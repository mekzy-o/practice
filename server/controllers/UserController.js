import bcryptjs from 'bcryptjs';
import db from '../model/db';
import { createToken } from '../middlewares/authentication';
import {
  userSignup,
  // userDetails,
  // fullName,
  // userId,
  //  updateUsers,
} from '../model/userQuery';


class UserController {

  static async userSignUp(req, res) {
    try {
      const {
        firstName,
        lastName,
        otherName,
        email,
        phoneNumber,
        passportUrl,
      } = req.body;
      const salt = await bcryptjs.genSalt(10);
      const password = await bcryptjs.hash(req.body.password, salt);

      const values = [firstName, lastName, otherName, email, password, phoneNumber, passportUrl];
      const result = await db.query(userSignup, values);
      const token = createToken(result);
      return res.header('x-auth-token', token).status(201).json({
        status: 201,
        data: {
          token,
          user: {
            id: result.rows[0].id,
            firstName: result.rows[0].firstname,
            lastName: result.rows[0].lastname,
            otherName: result.rows[0].othername,
            email,
            phoneNumber: result.rows[0].phonenumber,
            passportUrl: result.rows[0].passporturl,
            isAdmin: result.rows[0].isadmin,
          },
        },
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  // static async userLogin(req, res) {
  //   try{
        
  //   }
  // }
}


export default UserController;

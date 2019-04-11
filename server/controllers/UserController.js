import bcryptjs from 'bcryptjs';
import db from '../model/db';
import Authenticator from '../middlewares/authentication';

import {
  userSignup, userDetails,
  // fullName,
  // userId,
  //  updateUsers,
} from '../model/userQuery';

const { createToken } = Authenticator;

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
      const user = result.rows[0];
  
      const token = createToken(user);
      return res.header('x-auth-token', token).status(201).json({
        status: 201,
        data: {
          token,
          user: {
            id: user.id,
            firstName:user.firstname,
            lastName: user.lastname,
            otherName: user.othername,
            email: user.email,
            phoneNumber: user.phonenumber,
            passportUrl: user.passporturl,
            isAdmin: user.isadmin,
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

  // eslint-disable-next-line consistent-return
  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const emailQuery = await db.query(userDetails, [email]);
      if (!emailQuery.rows.length) {
        return res.status(400).json({
          status: 400,
          error: 'invalid email or password',
        });
      }
      const userPassword = await bcryptjs.compare(password, emailQuery.rows[0].password);
      if ((!emailQuery.rows[0]) || (userPassword === false)) {
        return res.status(400).json({
          status: 400,
          error: 'invalid email or password',
        });
      }
      if (userPassword) {
        const user = { ...emailQuery.rows[0] };
        
        const token = createToken(user);

        return res.header('x-auth-token', token).status(200).json({
          status: 200,
          data: {
            token,
            user: {
              id: user.id,
              firstName: user.firstname,
              lastName: user.lastname,
              otherName: user.othername,
              email: user.email,
              phoneNumber: user.phonenumber,
              passportUrl: user.passporturl,
              isAdmin: user.isadmin,
            },
          },
        });
      }
    } catch (err) {

      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  // static isAdmin(req, res, next) {
  //   try {
  //     const authorization = req.headers.authorization.split(' ')[1] || req.headers.token;

  //     if (!authorization) {
  //       return res.status(401).json({ status: 401, message: 'Only an Admin has the right to create a party' });
  //     }

  //     const verifiedToken = verifyToken(authorization);
  //     if (!verifiedToken.isadmin) {
  //       return res.status(401).json({ status: 401, message: 'Only an Admin has the right to create a party' });
  //     }
  //   } catch (err) {
  //     return res.status(401).json({ status: 401, message: 'Only an Admin has the right to create a party' });
  //   }
  //   return next();
  // }

}


export default UserController;

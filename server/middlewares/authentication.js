import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const createToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRETKEY);
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.x-auth-token || req.body.token;
  if (!token) {
    return res.status(403).json({
      status: 403,
      message: 'No Token was supplied',
    });
  }
  jwt.verify(token, process.env.SECRETKEY, (error, authData) => {
    if (error) {
      return res.status(403).json({
        status: 403,
        message: 'Invalid Token supplied',
      });
    }
    req.authData = authData;
    return next();
  });
};

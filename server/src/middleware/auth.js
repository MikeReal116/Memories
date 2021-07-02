import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) throw new Error();
    const isCustomAuth = token.lenth < 500;
    let decoded;
    if (isCustomAuth) {
      decoded = jwt.verify(token, process.env.JWT_PRIVATE);
      req.userId = decoded?.id;
    } else {
      decoded = jwt.decode(token);
      req.userId = decoded?.sub;
    }
    next();
  } catch (error) {
    res.status(401).send('please authenticate');
  }
};

export default auth;

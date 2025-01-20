import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import {User} from '../db.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret_key', // Замените на свой секретный ключ
};

const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

export default (passport) => {
  passport.use(jwtStrategy);
};

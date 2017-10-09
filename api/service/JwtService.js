import jwt from 'jsonwebtoken';
import randtoken from 'rand-token';

class JwtService {

    generateRefreshToken() {
        return randtoken.uid(256);
    }

    generateJWT(payload, expiresIn = '3d') {
        return jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn });
    }
}

export default new JwtService();

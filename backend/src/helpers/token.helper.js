const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');

// Internal files
const tokenAge = process.env.TOKEN_AGE;
const secretKey = process.env.SECRET_KEY;
const maxTokens = process.env.MAX_NUMBER_OF_TOKENS;
// const codeError = require('./codeError.helper');
const {
    TOKEN_EXPIRED,
    INVALID_TOKEN,
} = require('../errorDefinition/errors.map');

class Token {
    constructor(expired_at, token) {
        this.access = 'auth';
        this.expired_at = expired_at;
        this.token = token;
    }

    static async generate(user) {
        const expireAt = Date.now() + tokenAge;
        const token = new Token(
            String(expireAt),
            jwt.sign(
                {
                    uid: user.uid,
                    email: user.email,
                    expired_at: expireAt,
                    access: 'auth',
                },
                secretKey,
                {
                    expiresIn: '1d',
                }
            )
        );
        const refreshToken = await this.generateRefreshToken();
        const result = UserModel.findOneAndUpdate(
            {
                uid: user.uid,
            },
            {
                $push: {
                    tokens: {
                        $each: [token],
                        $position: 0,
                    },
                },
                $set: {
                    refresh_token: refreshToken,
                },
            },
            (err, result) => {
                if (err) {
                    // log the error
                    console.log(err);
                    return;
                }

                if (!user.tokens) {
                    return;
                }

                if (user.tokens.length + 1 > maxTokens) {
                    UserModel.findOneAndUpdate(
                        {
                            uid: user.uid,
                        },
                        {
                            $pop: {
                                tokens: 1,
                            },
                        },
                        (err, result) => {
                            if (err) {
                                // log the error
                                console.log(err);
                            }
                            return;
                        }
                    );
                }
            }
        );

        return { generatedToken: token, refreshToken };
    }

    static async verify(token) {
        let user = null;

        // verify validation
        try {
            user = await jwt.verify(token, secretKey, {
                ignoreExpiration: true,
            });
        } catch (e) {
            console.log(e);
            switch (e.name) {
                case 'JsonWebTokenError':
                    throw INVALID_TOKEN;
                case 'TokenExpiredError':
                    throw TOKEN_EXPIRED;
                default:
                    throw INVALID_TOKEN;
            }
        }

        return user;
    }

    static async generateRefreshToken() {
        const refreshToken = jwt.sign({}, secretKey, { expiresIn: '7d' });

        return refreshToken;
    }

    static async getUserFromToken(token) {
        let user = null;

        if (!token) {
            throw INVALID_TOKEN;
        }
        let tokenWithoutBearer = token.replace(/^Bearer\s/, '');

        try {
            user = await jwt.verify(
                tokenWithoutBearer.replace(/['"]+/g, ''),
                secretKey,
                {
                    ignoreExpiration: true,
                }
            );

            return user;
        } catch (error) {
            console.log(error);
            throw INVALID_TOKEN;
        }
    }
}

module.exports = Token;

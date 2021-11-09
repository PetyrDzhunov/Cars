exports.PORT = process.env.PORT || 4000;
exports.DB_CONNECTION_STRING = "mongodb+srv://PetyrDjunov:secretPassword@cubicles.hdzkr.mongodb.net/Cars-shop?retryWrites=true&w=majority";
exports.SALT_ROUNDS = 10;
exports.AUTH_COOKIE_NAME = 'token';
exports.JWT_SECRET = 'theBestSecretThatExist';
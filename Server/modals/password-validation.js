var passwordValidator = require('password-validator');

const schema = new passwordValidator();
schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()

console.log(schema.validate('validPASS123'));


module.exports = schema

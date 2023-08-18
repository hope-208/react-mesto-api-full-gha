const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const { errors } = require('celebrate');
const { errorLogger } = require('./middlewares/logger');

const { CentralizedError } = require('./errors/CentralizedError');

const PORT = process.env.PORT || 3000;

const app = require('./routes/index');

app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(errorLogger);

app.use(errors());

app.use(CentralizedError);

app.listen(PORT);

/*

require('dotenv').config();

console.log(process.env.NODE_ENV); // production

const { NODE_ENV, JWT_SECRET } = process.env;

const token = jwt.sign(
  { _id: user._id },
  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
);
*/

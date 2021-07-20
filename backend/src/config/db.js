const mongoose = require('mongoose');

const db = process.env.TIME_SHEET_DB;

const connectDB = async () => {
    let attempts = 10;

    /* try to connect more than once in case MongoDB container takes some time to be up
     */
    while (attempts) {
        try {
            mongoose.set('useNewUrlParser', true);
            mongoose.set('useFindAndModify', false);
            mongoose.set('useCreateIndex', true);
            mongoose.set('useUnifiedTopology', true);
            await mongoose.connect(db);
            console.log('Time Sheet DB connected...');
            break;
        } catch (err) {
            console.log('Error: ', err.message);
            attempts -= 1;
            console.log(`connection attempts left: ${attempts}`);
            await new Promise((res) => setTimeout(res, 10000));
        }
    }
};

module.exports = { connectDB };

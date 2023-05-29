const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config()

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const User = require('./models/user')

app.use((req, res, next) => {
    User.findById('64744ee6293ba0151be98970')
        .then(user => {
            req.user = user
            next()
        }).catch(err => console.log(err))

})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@cluster0.6ksoj3r.mongodb.net/shop?retryWrites=true&w=majority`)
    .then(() => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Praveen Gautam',
                    email: 'gautam@123',
                    cart: {
                        items: []
                    }
                })
                user.save()
            }
        })
        console.log('mongoDb connected!')
        app.listen(3000, () => {
            console.log('server started at port 3000')
        })
    })
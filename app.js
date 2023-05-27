const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const mongoConnect = require('./util/database').mongoConnect;

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const User = require('./models/user')

app.use((req, res, next) => {
    User.findById('6471f83dd87a7a5b7c5f1d0e')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id)
            next()
        }).catch(err => console.log(err))

})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    console.log("connected to db")

    app.listen(3000, () => {
        console.log('connected to server on port 3000')
    })
})

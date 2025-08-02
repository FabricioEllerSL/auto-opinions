require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();
const port = process.env.PORT

const Opinion = require('./models/Opinion')
const User = require('./models/User')
const opinionRoutes = require('./routes/opinionRoutes')
const authRoutes = require('./routes/authRoutes')

app.engine('hbs', exphbs.engine({extname: 'hbs'}));
app.set('view engine', 'hbs');

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(session({
    name: "session",
    secret: "our_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: ()=>{},
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
}))

app.use(flash())

app.use(express.static('public'))

app.use((req, res, next) => {
    if(req.session.userid){
        res.locals.session = req.session
    }

    next()
})

app.use('/opinion', opinionRoutes)
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.render('landing')
})

const conn = require('./db/conn')

// conn.sync({force:true}).then(
conn.sync().then(
    () => {
        app.listen(port)
        console.log(`App listening on port ${port}`)
    }
).catch(
    (err) => {
        console.log(err)
    }
)
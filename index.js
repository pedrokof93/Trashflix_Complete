const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const Bcrypt = require('bcrypt')
const connection = require('./database/conection')
const cadastroUser = require('./database/cadastro_user')
const { where } = require('sequelize')
const usuario = require('./database/cadastro_user')

//configurando o body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//configurando ejs
app.set('view engine', 'ejs')

//configurando para usar css/html/bootstrap
app.use(express.static('public'))

//configuração do banco de dados
connection
.authenticate()
.then(()=>{
    console.log('Conxão foi um sucesso')
}).catch((error)=>{
    console.log(error)
})

// rota principal
app.get('/', (req, res)=>{
    res.render('index')
})
//rota home
app.get('/home', (req, res)=>{
    res.send('<h1>Pagina home acessada com sucesso</h1>')
})

//rota main
app.get('/main' , (req, res)=>{
    res.render('main')
})

//rota Novidades
app.get('/novidades', (req, res)=>{
    res.render('novidades')
})

//rota Em Destaque
app.get('/destaque', (req, res)=>{
    res.render('destaque')
})

// rota Favoritos
app.get('/favoritos', (req,res)=>{
    res.render('favoritos')
})

// rota Filmes
app.get('/filmes', (req,res)=>{
    res.render('filmes')
})

//rota Franquias
app.get('/franquias', (req,res)=>{
    res.render('franquias')
})

//rota Links
app.get('/links', (req,res)=>{
    res.render('links')
})

//rota Sexta feira 13
app.get('/sexta', (req,res)=>{
    res.render('sexta')
})

//rota evil
app.get('/evil', (req,res)=>{
    res.render('evil')
})
// rota gremlins
app.get('/gremlins', (req,res)=>{
    res.render('gremlins')
})

//rota filme terrifier
app.get('/terrifier', (req,res)=>{
    res.render('terrifier')
})

//rota filme evil dead
app.get('/evilmovie', (req,res)=>{
    res.render('evilmovie')
})


//rota login
app.get('/login',(req, res)=>{
    res.render('login')
})

//rota Cadastro
app.get('/cadastro', (req, res)=>{
    res.render('cadastro')
})

//rota do cadastro no banco de dados
app.post('/cadastro-user', (req, res)=>{
    var email = req.body.email
    var senha = req.body.senha

    var salt= Bcrypt.genSaltSync(10)
    var hash= Bcrypt.hashSync(senha, salt)

    cadastroUser.create({
        email: email,
        senha: hash,
        senha_2: req.body.senha_2
    }).then(function(){
        res.redirect('/login')
    }).catch(function(erro){
        res.send("Houve um erro no cadastro de usuario!!!" + erro)
    })
})

//rota de login com sucesso
app.post('/logado', (req, res)=>{
    var email = req.body.email
    var senha = req.body.senha

    cadastroUser.findOne({where:{email:email}}).then(usuario =>{
        if(usuario!=undefined){
            var correct= Bcrypt.compareSync(senha, usuario.senha)
            if(correct){
                res.redirect('/main')
            }else{
                res.redirect('/cadastro')
            }
        }else{
            res.send('/cadastro')
        }
    })

})

//iniciando o servidor
app.listen(port , ()=>{
    console.log('Servidor Online!')
})

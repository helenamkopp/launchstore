const User = require('../models/User')

async function post(req, res, next) {

  //verificar se todos os campos estao preenchidos
const keys = Object.keys(req.body)

for (key of keys) {
  if (req.body[key] == "") {
    return res.render('user/register', {
      user: req.body,
      error: 'Preencha todos os campos.'
    })
  }
}

// verificar se o usuário já existe no cadastro 
let { email, cpf_cnpj, password, passwordRepeat } = req.body 

cpf_cnpj = cpf_cnpj.replace(/\D/g,"")

const user = await User.findOne({ 
    where: { email },
    or: { cpf_cnpj }
})

if (user) return res.render('user/register', {
  user: req.body,
  error: 'Usuário já cadastrado.'
})

// verificar se a senha e repetição de senha são iguais  

if (password != passwordRepeat) return res.render('user/register', {
    user: req.body,
    error: 'A senha e repetição de senha precisam ser iguais.'
  })
next()



}

module.exports = {
  post
}



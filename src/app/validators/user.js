const User = require('../models/User')
const { compare } = require('bcryptjs')


function checkAllFields (body) {
   //verificar se todos os campos estao preenchidos
   const keys = Object.keys(body)

   for (key of keys) {
     if (body[key] == "") {
       return {
         user: body,
         error: 'Preencha todos os campos.'
       }
     }
   }
}

async function show(req, res, next) {
  const { userId: id } = req.session

    const user = await User.findOne({ where: {id} })

    if (!user) return res.render("user/register", {
      error: "Usuário não encontrado"
    })

    req.user = user 

    next()
}

async function post(req, res, next) {

  const fillAllFields = checkAllFields(req.body)

  if(fillAllFields){
    return res.render("user/register", fillAllFields)
  }

  // verificar se o usuário já existe no cadastro 
  console.log(req.body)
  let { email, cpf_cnpj, password, passwordRepeat } = req.body
  console.log(email)
  cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj }
  })
  console.log("aqui")
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

async function update(req, res, next) {

  const fillAllFields = checkAllFields(req.body)
  
  if(fillAllFields){
    return res.render("user/index", fillAllFields)
  }

  const { id, password } = req.body

  if (!password) return res.render("user/index", {
    user: req.body,
    error: "Coloque sua senha para atualizar seu cadastro."
  })

  const user = await User.findOne({ where: {id} })

  const passed = await compare(password, user.password)

  if(!passed) return res.render("user/index", {
    user: req.body,
    error: "Senha incorreta."
  })

  req.user = user

  next()

}

module.exports = {
  post,
  show,
  update
}



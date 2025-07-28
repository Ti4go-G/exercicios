function tudoCerto() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Tudo certo!")
        }, 1000)
    }
    )
}
tudoCerto().then((res) => console.log(res))

function login(user, password) {
    return new Promise((resolve, reject) => {
        if (user === "admin" && password === "1234") {
            return resolve("login bem-sucedido!")// preciso usar return pra garantir que o que vier depois nao vai ser executado
        }
        reject("credenciais inválidas")
    })
}
login("admin", "1234")
    .then((msg) => console.log("sucesso:", msg))
    .catch((err) => console.log("erro:", err))

function pegarUsuario() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, nome: 'Ana' })
        }, 1000)
    })
}
function pegarPerfil(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ profisso: 'Dev' })
        }, 1000)
    })
}
pegarUsuario()
    .then((usuario) => {
        console.log("Usuário:", usuario);
        return pegarPerfil(usuario.id); //retorna uma nova promise(de pegar o perfil do user) para o proximo then
    })
    .then((perfil) => {
        console.log("Perfil:", perfil);
    });

const usuariosDB = [
    { id: 1, nome: "Ana", email: "ana@example.com", profissao: "Designer" },
    { id: 2, nome: "Carlos", email: "carlos@example.com", profissao: "Dev" },
    { id: 3, nome: "Maria", email: "maria@example.com", profissao: "Médica" },
];

function encontraUser(id) {
    return new Promise((resolve, reject) => {
        const user = usuariosDB.find(us => us.id === id)
        setTimeout(() => {
            if (user) {
                resolve(user)
            }
            return reject("usuario nao encontrado")
        }, 1000)
    })
}
function nomeUser(user) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(user.nome), 500)
    })
}
function emailUser(id) {
    return new Promise((resolve) => {
        const user = usuariosDB.find(us => us.id === id)
        setTimeout(() => resolve(user.email), 500)
    })
}
function profissaoUser(id) {
    return new Promise((resolve) => {
        const user = usuariosDB.find(us => us.id === id)
        setTimeout(() => resolve(user.profissao), 500)
    })
}
// encontraUser(2)
// .then(user=>{
//     console.log("user encontrado: ", user)
//     return nomeUser(user).then((nome)=>{
//         return {user, nome}
//     })
// })
// .then(({user, nome})=>{
//     console.log("nome: ", nome);
//     return emailUser(user).then((email)=>{
//         return {user, nome, email}
//     })
// })
const promises = [encontraUser(3),
    emailUser(3),
    profissaoUser(3)]
Promise.all(promises).then(values=> console.log(values))
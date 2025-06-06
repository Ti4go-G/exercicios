// fetch('https://jsonplaceholder.typicode.com/users')
// .then(response =>{
//     return response.json()
// }).then(users => console.log(users))

/*
****EXERCÍCIO COM FETCH(POST, GET, PATCH, PUT, DELETE)
*/
async function criarPost(post) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        const data = await response.json()
        console.log('post criado com sucesso', data)
    } catch (error) {
        console.error('erro ao criar post:', error)
    }


    // }).then(response => response.json())//fetch sempre retorna uma promise, eu passo essa promise pra json
    // .then(data => console.log('post criado:', data))// utilizo a response do then anterior para mostrar oq foi enviado
    // .catch(error=>console.error('erro ao criar post:', error))

}
criarPost({
    title: 'novo post',
    body: 'conteudo do post'
})

async function getPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        const firstPosts = data.slice(0, 5)

        console.log('posts encontrados:', firstPosts)
    } catch (error) {
        console.error(error)
    }
}
getPosts()

async function updatePostTitle(id, title) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
            method:'PATCH', 
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(title)//posso passar { title } se eu quiser usar apenas uma string no parametro da funcao
        });
        const data = await response.json();
        console.log('titulo alterado com sucesso, novo título:', data.title)
    } catch (error) {
        console.error('Erro ao alterar titulo do post:', error)
    }
}
updatePostTitle(1, {title:"titulo alterado com patch"})

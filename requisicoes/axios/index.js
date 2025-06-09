/*
****EXERCÍCIO COM AXIOS(POST, GET, PATCH, PUT, DELETE)
*/
import axios from 'axios'

async function criarPost({title, body}) {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: title,
            body: body
        })
        console.log('post criado com sucesso', response.data)
    } catch (error) {
        console.error('erro ao criar post:', error)
    }
}
async function getPosts() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const filteredPosts = response.data.filter((el,index)=> index <=4);
        console.log('posts encontrados:', filteredPosts)
    } catch (error) {
        console.error('erro ao filtrar posts', error)
    }
}
getPosts()
async function updatePostTitle(id, title) {
    try {
        const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            title: title
        })
        console.log('titulo alterado com sucesso, novo titulo: ', response.data)
    } catch (error) {
        console.error('erro ao atualizar titulo do post', error)
    }
    
}
async function updatePost({userId, id, title, body}) {
    try{
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            userId: userId,
            id: id, 
            title: title,
            body: body
        })
        console.log('post atualizado com sucesso, novo post: ', response.data)
    }catch{
        console.error('erro ao atualizar o post: ', error)
    }
}

async function deletePost(id) {
    try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        console.log('post deletado com sucesso')
        if(response.statusText.toLowerCase()!== 'ok' ){
            throw new Error(`erro ao deletar post, código: ${response.status}`)
        }
    } catch (error) {
        console.log(error.message)
    }
}
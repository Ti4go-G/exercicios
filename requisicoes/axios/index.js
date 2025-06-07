/*
****EXERCÍCIO COM AXIOS(POST, GET, PATCH, PUT, DELETE)
*/
import axios from 'axios'

async function criarPost(post) {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts')
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
        
    } catch (error) {
        
    }
    
}
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./api_test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    await User.deleteMany({})
})


describe('get blogs', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('id is defined', async () => {
        const response = await api.get('/api/blogs')

        const ids = response.body.map(blog => blog.id)
        expect(ids).not.toContain(undefined)
    })

})

describe('add a blog', () => {

    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: "The smurfs",
            author: "Papa smurf",
            url: "https://smurfs.com/",
            likes: 15,
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const contents = blogsAtEnd.map(n => n.title)
        expect(contents).toContain(
            'The smurfs'
        )
    })

    test('missing likes = 0 likes', async () => {
        const newBlog = {
            title: "The smurfs",
            author: "Papa smurf",
            url: "https://smurfs.com/"
        }
    
        const blogAdded = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
    
        expect(blogAdded.body.likes).toBe(0)
    })

    test('not missing likes = X likes', async () => {
        const newBlog = {
            title: "The smurfs",
            author: "Papa smurf",
            url: "https://smurfs.com/",
            likes: 25
        }
    
        const blogAdded = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
    
        expect(blogAdded.body.likes).toBe(25)
    })

    test('blog without fields is not added', async () => {
        const newBlog = {
            author: "Smurf"
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

})

describe('delete a blog', () => {

    test('delete a blog: status code 204', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const contents = blogsAtEnd.map(r => r.title)

        expect(contents).not.toContain(blogToDelete.title)
    })

})

describe('update a blog', () => {

    test('update a blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
            title: "The smurfs",
            author: "Papa smurf",
            url: "https://smurfs.com/",
            likes: 25
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
        const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

        expect(updatedBlog.title).toBe(newBlog.title)
        expect(updatedBlog.author).toBe(newBlog.author)
        expect(updatedBlog.url).toBe(newBlog.url)
        expect(updatedBlog.likes).toBe(newBlog.likes)
    })

})

describe('users', () => {

    test('create a user', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            name: "test2",
            username: "test2",
            password: "test2"
        }
    
        await api
            .post(`/api/users`)
            .send(newUser)
            .expect(201)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        expect(usersAtEnd.map( user => user.username) ).toContain(newUser.username)    
    })

    test('missing username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            name: "test3",
            password: "test3"
        }
    
        await api
            .post(`/api/users`)
            .send(newUser)
            .expect(400)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length) 
    })

    test('short password', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: "test3",
            password: "t"
        }
    
        await api
            .post(`/api/users`)
            .send(newUser)
            .expect(400)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length) 
    })

})

afterAll(() => {
    mongoose.connection.close()
}) 
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const middleware = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate("user", { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post("/", middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    }

    const newBlog = new Blog(blog)

    const result = await newBlog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
})

blogsRouter.delete("/:id", middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({ error: "blog not found" })
    }
    else if (user.id === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id)

        user.blogs = user.blogs.filter(blog => blog._id.toString() !== request.params.id )
        await user.save()

        response.status(204).end()
    }
    else {
        return response.status(401).json({ error: "user not authorized to delete" })
    }
})

blogsRouter.put("/:id", (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter
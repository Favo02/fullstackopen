const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(
        (totLikes, blog) => totLikes + blog.likes,
        0
    )
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const max = Math.max(...likes)
    const blog = blogs[likes.indexOf(max)]
    return blog !== undefined 
        ?
            {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        : undefined
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    let blogsForAuthor = new Map()
    const authors = blogs.map(blog => blog.author)
    authors.forEach(author => {
        blogsForAuthor.set(
            author, 
            (blogsForAuthor.has(author) 
                ? blogsForAuthor.get(author) + 1
                : 1)
        )
    })
    const [ au, bl ] = [...blogsForAuthor.entries()].reduce(
        (maxBlogs, blogs) =>
        blogs[1] > maxBlogs[1] 
            ? blogs 
            : maxBlogs
    )
    return {
        'author': au,
        'blogs': bl
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    let likesForAuthor = new Map()

    const authors = blogs.map(blog => 
        {
            return (
                { 
                    'name': blog.author,
                    'likes': blog.likes
                }
            )
        }
    )

    authors.forEach(author => {
        likesForAuthor.set(
            author.name, 
            (likesForAuthor.has(author.name) 
                ? likesForAuthor.get(author.name) + author.likes
                : author.likes)
        )
    })

    const [ au, li ] = [...likesForAuthor.entries()].reduce(
        (maxLikes, likes) =>
        likes[1] > maxLikes[1] 
            ? likes 
            : maxLikes
    )
    return {
        'author': au,
        'likes': li
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
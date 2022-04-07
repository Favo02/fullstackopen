const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(
        (totLikes, blog) => totLikes + blog.likes,
        0
    )
}

const mostLikes = (blogs) => {
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

module.exports = {
    dummy,
    totalLikes,
    mostLikes
}
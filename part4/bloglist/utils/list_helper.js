const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(
        (totLikes, blog) => totLikes + blog.likes,
        0
    )
}
  
module.exports = {
    dummy,
    totalLikes
}
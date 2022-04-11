import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, username }) => {
    const [viewDetails, setViewDetails] = useState(false)

    const blogStyle = {
        'border': '1px solid black',
        'borderRadius': '5px',
        'marginBottom': '5px',
        'padding': '5px 10px',
        'maxWidth': '400px'
    }

    const handleDelete = (blog) => {
        if (window.confirm(`Are you sure to delete ${blog.title}?`)) {
            deleteBlog(blog.id)
        }
    }

    if (viewDetails) {
        console.log('Blog.js - ', blog);
        return (
            <div style={blogStyle}>
                {blog.title} <button onClick={() => setViewDetails(false) }>hide</button><br />
                {blog.url}<br />
                {blog.likes} <button onClick={() => likeBlog(blog) }>like</button><br />
                {blog.url}<br />
                {username === blog.user.username ? <button onClick={() => handleDelete(blog) }>delete</button> : <></>}
            </div>
        )
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author} <button onClick={() => setViewDetails(true) }>view</button>
        </div>
    )
}

export default Blog
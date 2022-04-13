import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, likeBlog, deleteBlog, username }) => {
    const [viewDetails, setViewDetails] = useState(false)

    const blogStyle = {
        "border": "1px solid black",
        "borderRadius": "5px",
        "marginBottom": "5px",
        "padding": "5px 10px",
        "maxWidth": "400px"
    }

    const handleDelete = (blog) => {
        if (window.confirm(`Are you sure to delete ${blog.title}?`)) {
            deleteBlog(blog.id)
        }
    }

    if (viewDetails) {
        return (
            <div className="blog-div" style={blogStyle}>
                {blog.title} <button id="hideBlog-button" onClick={() => setViewDetails(false) }>hide</button><br />
                {blog.author}<br />
                <span id="likes">{blog.likes}</span>
                <button id="likeBlog-button" onClick={() => likeBlog(blog) }>like</button><br />
                {blog.url}<br />
                {username === blog.user.username ? <button id="deleteBlog-button" onClick={() => handleDelete(blog) }>delete</button> : <></>}
            </div>
        )
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author} <button id="viewBlog-button" onClick={() => setViewDetails(true) }>view</button>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
}

export default Blog
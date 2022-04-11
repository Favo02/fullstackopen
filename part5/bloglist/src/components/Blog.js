import { useState } from 'react'

const Blog = ({blog}) => {
    const [viewDetails, setViewDetails] = useState(false)

    const blogStyle = {
        'border': '1px solid black',
        'borderRadius': '5px',
        'marginBottom': '5px',
        'padding': '5px 10px',
        'maxWidth': '400px'
    }

    if (viewDetails) {
        return (
            <div style={blogStyle}>
                {blog.title} <button onClick={() => setViewDetails(false) }>hide</button><br />
                {blog.url}<br />
                {blog.likes} <button>like</button><br />
                {blog.url}<br />
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
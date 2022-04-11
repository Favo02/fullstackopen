import Blog from "./Blog"
import PropTypes from 'prop-types'

const Blogs = ({ blogs, likeBlog, deleteBlog, username }) => (
    <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
            <Blog
                key={blog.id}
                blog={blog}
                likeBlog={likeBlog}
                deleteBlog={deleteBlog}
                username={username}
            />
        )}  
    </div>
                  
)

Blogs.propTypes = {
    blogs: PropTypes.array.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
}

export default Blogs
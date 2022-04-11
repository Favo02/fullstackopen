import Blog from "./Blog"

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

export default Blogs
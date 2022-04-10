const NewBlog = ({ handleNewBlog, newBlogTitle, setNewBlogTitle, newBlogAuthor, setNewBlogAuthor, newBlogUrl, setNewBlogUrl }) => {
    return (
        <>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
            title:
            <input
                type="text"
                value={newBlogTitle}
                name="title"
                onChange={({ target }) => setNewBlogTitle(target.value)}
            />
            <br />
            author:
            <input
                type="text"
                value={newBlogAuthor}
                name="author"
                onChange={({ target }) => setNewBlogAuthor(target.value)}
            />
            <br />
            url:
            <input
                type="text"
                value={newBlogUrl}
                name="url"
                onChange={({ target }) => setNewBlogUrl(target.value)}
            />
            <br />
            <button type="submit">add</button>
        </form>
        </>
    )
}

export default NewBlog
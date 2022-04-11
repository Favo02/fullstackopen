import { useState } from "react"
import PropTypes from "prop-types"

const NewBlog = ({ newBlog }) => {

    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogAuthor, setNewBlogAuthor] = useState("")
    const [newBlogUrl, setNewBlogUrl] = useState("")

    const handleNewBlog = (event) => {
        event.preventDefault()

        const newBlogObject = {
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl
        }

        newBlog(newBlogObject)

        setNewBlogTitle("")
        setNewBlogAuthor("")
        setNewBlogUrl("")
    }

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

NewBlog.propTypes = {
    newBlog: PropTypes.func.isRequired
}

export default NewBlog
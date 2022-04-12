describe("Blog app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        const user = {
            name: "test",
            username: "test",
            password: "test"
        }
        cy.request("POST", "http://localhost:3003/api/users/", user)
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function() {
        cy.contains("Log in to application")
    })

    describe("Login",function() {
        it("succeeds with correct credentials", function() {
            cy.get("#username-input").type("test")
            cy.get("#password-input").type("test")
            cy.get("#login-button").click()

            cy.contains("test logged in")
        })

        it("fails with wrong credentials", function() {
            cy.get("#username-input").type("ehehe")
            cy.get("#password-input").type("wrong")
            cy.get("#login-button").click()

            cy.contains("wrong credentials")
                .should("have.css", "color", "rgb(255, 0, 0)")

            cy.get("html").should("not.contain", "test logged in")
        })
    })

    describe("When logged in", function() {
        beforeEach(function() {
            cy.login({ username: "test", password: "test" })
        })

        it("A blog can be created", function() {
            cy.contains("new blog").click()
            cy.get("#title-input").type("a blog created by cypress")
            cy.get("#author-input").type("aucypress")
            cy.get("#url-input").type("https://cypress.com")
            cy.get("#addBlog-button").click()

            cy.contains("a blog created by cypress")
            cy.contains("aucypress")
        })
    })
})
const user = {
  name: "Cypress Test User",
  username: "cypress-test-user",
  password: "password1234",
};

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.contains("Username");
    cy.contains("Password");
  });

  describe("Login", function () {
    it("login button can be clicked with empty form resulting in wrong username or password notification", function () {
      cy.contains("login").click();
      cy.get(".error").contains("Wrong username or password");
    });

    it("user can login", function () {
      cy.get("input:first").type(user.username);
      cy.get("input:last").type(user.password);
      cy.contains("login").click();
      cy.contains(`Logged in as ${user.name}`);
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("input:first").type(user.username);
      cy.get("input:last").type(user.password);
      cy.contains("login").click();
      cy.contains(`Logged in as ${user.name}`);

      cy.contains("new blog").click();
      cy.get(`[aria-label="Title"]`).type("Test Blog");
      cy.get(`[aria-label="Author"]`).type("Test Author");
      cy.get(`[aria-label="URL"]`).type("testurl.com");
      cy.contains("Create").click();
    });

    it("A blog can be created", function () {
      cy.contains("Test Blog Test Author");
    });

    it("A blog can be liked", function () {
      cy.contains("show").click();
      cy.contains("Likes: 0");
      cy.contains("Like").click();
      cy.contains("Likes: 1");
    });

    it("A blog can be deleted", function () {
      cy.contains("show").click();
      cy.contains("remove").click();
      cy.contains("show").should("not.exist");
    });

    it("If not creator of blog, blog cannot be deleted", function () {
      cy.contains("logout").click();
      const secondaryUser = {
        username: "cypress-test-user2",
        name: "Secondary Cypress Test User",
        password: "password1234",
      };
      cy.request("POST", "http://localhost:3003/api/users/", secondaryUser);
      cy.get("input:first").type(secondaryUser.username);
      cy.get("input:last").type(secondaryUser.password);
      cy.contains("login").click();
      cy.contains(`Logged in as ${secondaryUser.name}`);
      cy.contains("show").click();
      cy.contains("remove").click();
      cy.get(".error").contains(
        "AxiosError: Request failed with status code 401"
      );
    });

    it.only("Blogs are ordered by number of likes", function () {
      cy.get(".toggleVisibility").click();
      cy.get(`[aria-label="Title"]`).type("Test Blog with first most likes");
      cy.get(`[aria-label="Author"]`).type("Test Author");
      cy.get(`[aria-label="URL"]`).type("testurl.com");
      cy.contains("Create").click();

      cy.get(".toggleVisibility").click();
      cy.get(`[aria-label="Title"]`).type("Test Blog with second most likes");
      cy.get(`[aria-label="Author"]`).type("Test Author");
      cy.get(`[aria-label="URL"]`).type("testurl.com");
      cy.contains("Create").click();

      cy.get(".toggleBlogVisibilityButton").eq(0).click();

      cy.get(".toggleBlogVisibilityButton").eq(1).click();
      cy.get(".likeButton").eq(1).click();
      cy.get(".likeButton").eq(1).click();
      cy.get(".likeButton").eq(1).click();

      cy.get(".toggleBlogVisibilityButton").eq(2).click();
      cy.get(".likeButton").eq(2).click();

      cy.wait(500);
      cy.reload();

      cy.get(".blog")
        .eq(0)
        .should("contain", "Test Blog with first most likes");
      cy.get(".blog")
        .eq(1)
        .should("contain", "Test Blog with second most likes");
    });
  });
});

describe("happy path", () => {
  it("should render 100 posts", () => {
    cy.visit("/1");
    cy.get('[data-testid="Posts"]').should("exist");
    cy.get('[data-testid="Post"]').should("have.length", 100);
  });
});

describe("modifying responses", () => {
  it("should display a custom post", () => {
    const post = {
      title: "custom title",
      body: "custom body",
      userId: "custom user id",
    };

    cy.produceSSRResponse().as("setup").wait("@setup");

    cy.visit("/custom");

    cy.get('[data-testid="Single Post"] [data-testid="Post Title"]').should(
      "have.text",
      post.title
    );
    cy.get('[data-testid="Single Post"] [data-testid="Post Body"]').should(
      "have.text",
      post.body
    );
    cy.get('[data-testid="Single Post"] [data-testid="Post Author"]').should(
      "have.text",
      `Author: ${post.userId}`
    );
  });
});

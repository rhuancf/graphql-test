const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphql } = require("graphql");
const { typeDefs } = require("../schema/type-defs.js");

describe("GraphQL Schema", () => {
  let schema;

  beforeAll(() => {
    schema = makeExecutableSchema({ typeDefs });
  });

  test("Schema should be defined", () => {
    expect(schema).toBeDefined();
  });

  it("Should have correct type definitions", async () => {
    const query = `
        {
          __schema {
            types {
              name
              kind
            }
          }
        }
      `;

    const result = await graphql({ schema, source: query });
    expect(result.errors).toBeUndefined();
    const typeNames = result.data.__schema.types.map((type) => type.name);
    expect(typeNames).toContain("User");
    expect(typeNames).toContain("Movie");
    expect(typeNames).toContain("Query");
    expect(typeNames).toContain("Mutation");
    expect(typeNames).toContain("Gender");
    expect(typeNames).toContain("CreateUserInput");
    expect(typeNames).toContain("SearchMovieInput");
  });

  test("Query should return correct fields for User", async () => {
    const query = `
        {
          __type(name: "User") {
            name
            fields {
              name
              type {
                name
                kind
                ofType {
                  name
                  kind
                }
              }
            }
          }
        }
      `;

    const result = await graphql({ schema, source: query });
    expect(result.errors).toBeUndefined();
    const userFields = result.data.__type.fields.map((field) => field.name);
    expect(userFields).toContain("id");
    expect(userFields).toContain("name");
    expect(userFields).toContain("username");
    expect(userFields).toContain("age");
    expect(userFields).toContain("nationality");
    expect(userFields).toContain("gender");
    expect(userFields).toContain("friends");
    expect(userFields).toContain("favoriteMovies");
  });

  test("Query should return correct fields for Movie", async () => {
    const query = `
        {
          __type(name: "Movie") {
            name
            fields {
              name
              type {
                name
                kind
                ofType {
                  name
                  kind
                }
              }
            }
          }
        }
      `;

    const result = await graphql({ schema, source: query });
    expect(result.errors).toBeUndefined();
    const movieFields = result.data.__type.fields.map((field) => field.name);
    expect(movieFields).toContain("id");
    expect(movieFields).toContain("name");
    expect(movieFields).toContain("yearOfPublication");
    expect(movieFields).toContain("isInTheaters");
  });
});

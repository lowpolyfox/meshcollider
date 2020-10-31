const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve("src/templates/BlogPost.js");

  return graphql(`
    {
      allMdx {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    const posts = result.data.allMdx.nodes;

    posts.forEach((post, index) => {
      const previous = index === 0 ? null : posts[index - 1];
      const next = index === posts.length - 1 ? null : posts[index + 1];

      createPage({
        path: post.fields.slug,
        component: postTemplate,
        context: {
          slug: post.fields.slug,
          previous,
          next,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

const {
    createFilePath
} = require("gatsby-source-filesystem")
const path = require(`path`)

exports.onCreateNode = ({
    node,
    getNode,
    actions
}) => {
    const {
        createNodeField
    } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({
            node,
            getNode,
            basePath: `pages`
        })

        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

exports.createPages = async ({
    graphql,
    actions
}) => {
    const { createRedirect, createPage} = actions;

    createRedirect({
        fromPath: "/newsletter",
        toPath: "/",
        isPermanent: true
    });

    const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve("./src/templates/article.tsx"),
            context: {
                slug: node.fields.slug,
            },
        })
    })
    

    const posts = result.data.allMarkdownRemark.edges
    const postsPerPage = 10
    const numPages = Math.ceil(posts.length / postsPerPage)

    for (let i = 0; i < numPages; i++) {
        createPage({
            path: `/articles/${i === 0 ? '' : `${i + 1}`}`,
            component: path.resolve("./src/templates/articles.tsx"),
            context: {
                limit: postsPerPage,
                skip: postsPerPage * i,
                numPages,
                currentPage: i + 1
            }
        })
    }
}
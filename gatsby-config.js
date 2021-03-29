/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    siteUrl: "https://nicozerpa.com",
    title: "Nico Zerpa, Your JavaScript Friend",
    description: "Whether you’re a beginner or advanced, I’ll help you level up your JavaScript skills"
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "articles",
        path: `${__dirname}/src/articles/`,
      },
    },
    "gatsby-plugin-typescript",
    "gatsby-transformer-remark",
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `query{
          allSitePage(
            filter: {componentChunkName: {ne: "component---src-templates-article-tsx"}}
          ) {
            nodes {
              path
            }
          }
          allMarkdownRemark(filter: {frontmatter: {published: {eq: 1}}}) {
            nodes {
              fields {
                slug
              }
            }
          }
        }
        `,
        resolveSiteUrl: () => `https://nicozerpa.com/`,
        serialize: ({ allSitePage, allMarkdownRemark}) => {
          
          const basicPages = allSitePage.nodes.map(node => node.path)
          const articlePages = allMarkdownRemark.nodes.map(node => node.fields.slug)

          return basicPages.concat(articlePages).map(function (url) {
            return {
              url: `https://nicozerpa.com${url}`,
              changefreq: "daily",
              priority: 0.7
            }
          })
        }
      }
    },
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: 1,
        matomoUrl: "https://matomo.nicozerpa.com",
        siteUrl: "https://nicozerpa.com"
      }
    }
  ],
}

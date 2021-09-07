/* eslint-disable no-undef */
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
    "gatsby-plugin-meta-redirect",
    {
      resolve: "gatsby-remark-related-posts",
      options: {
        posts_dir: `${__dirname}/src/articles`,
        doc_lang: "en",
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `query {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }`,
        feeds: [
          {
            query: `{
              allMarkdownRemark(
                filter: {frontmatter: {published: {eq: true}}}
                sort: {fields: frontmatter___id, order: DESC}
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      id
                    }
                  }
                }
              }
            }
            `,
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {

                const year = String(edge.node.frontmatter.id).substr(0, 4);
                const month = String(edge.node.frontmatter.id).substr(4, 2);
                const day = String(edge.node.frontmatter.id).substr(6, 2);

                const date = `${year}-${month}-${day}`;

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            output: "rss.xml",
            title: "Nico Zerpa RSS Feed"
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        query {
          allSitePage(
            filter: {componentChunkName: {ne: "component---src-templates-article-tsx"}, path: {ne: "/--code--/"}}
          ) {
            nodes {
              path
            }
          }
          allMarkdownRemark(filter: {frontmatter: {published: {eq: true}}}) {
            nodes {
              fields {
                slug
              }
            }
          }
        }        
        `,
        resolveSiteUrl: () => `https://nicozerpa.com/`,
        resolvePages: ({ allSitePage: { nodes: pages }, allMarkdownRemark: {nodes: articles }}) => {
          return [
            ...pages,
            ...articles.map(article => ({ path: article.fields.slug }))
          ];
        },


        serialize: ({ path }) => {
          return {
            url: `https://nicozerpa.com${path}`,
            changefreq: "daily",
            priority: 0.7
          }
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

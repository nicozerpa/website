/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Nico Zerpa, Your JavaScript Friend",
    description: "Whether you’re a beginner or advanced, I’ll help you level up your JavaScript skills"
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/src/blog/`,
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: 1,
        matomoUrl: "https://matomo.nicozerpa.com/",
        siteUrl: "https://nicozerpa.com"
      }
    }
  ],
}

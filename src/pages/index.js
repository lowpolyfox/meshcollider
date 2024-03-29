import React from "react";
import Img from "gatsby-image";
import { graphql, Link } from "gatsby";
import { Layout } from "./../js/components/Layout";
import { useSiteMetadata } from "./../js/hooks/useSiteMetadata";
import SEO from "react-seo-component";
import "./../css/index.sass";


export default ({ data }) => {
  const {
    description,
    title,
    image,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
  } = useSiteMetadata();

  return (
    <Layout>
      <main>
        <SEO
          title={title}
          description={description}
          image={`${siteUrl}${image}`}
          pathname={siteUrl}
          siteLanguage={siteLanguage}
          siteLocale={siteLocale}
          twitterUsername={twitterUsername}
        />
        {data.allMdx.nodes.map(({ id, frontmatter, fields }) => (
          <article key={id}>
            <Link to={fields.slug}>
              {!!frontmatter.cover ? (
                <Img sizes={frontmatter.cover.childImageSharp.sizes} />
              ) : null}
              <h1>{frontmatter.title}</h1>
              <p>{frontmatter.date}</p>
            </Link>
          </article>
        ))}
      </main>
    </Layout>
  );
};

export const query = graphql`
  query SITE_INDEX_QUERY {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY MMMM Do")
          cover {
            publicURL
            childImageSharp {
              sizes(maxWidth: 2000, traceSVG: { color: "#639" }) {
                ...GatsbyImageSharpSizes_tracedSVG
              }
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }
`;

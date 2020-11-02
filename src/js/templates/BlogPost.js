import React from "react";
import Img from "gatsby-image";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Layout } from "../components/Layout";
import { useSiteMetadata } from "../hooks/useSiteMetadata";
import SEO from "react-seo-component";

import moment from "moment";

import "normalize.css";

export default ({ data, pageContext }) => {
  const { frontmatter, body, fields, excerpt } = data.mdx;
  const { title, date, cover } = frontmatter;
  const { previous, next } = pageContext;

  const {
    image,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
    authorName,
  } = useSiteMetadata();

  return (
    <div className="post">
      <div className="post__deco">
        <div />
      </div>

      <Layout>
        <SEO
          title={title}
          description={excerpt}
          image={
            cover === null
              ? `${siteUrl}${image}`
              : `${siteUrl}${cover.publicURL}`
          }
          pathname={`${siteUrl}${fields.slug}`}
          siteLanguage={siteLanguage}
          siteLocale={siteLocale}
          twitterUsername={twitterUsername}
          author={authorName}
          article={true}
          publishedDate={date}
          modifiedDate={new Date(Date.now()).toISOString()}
        />

        <main className="post-content">
          <div className="container">
            <div className="row">
              <div className="col-6 post-info">
                <h1>{frontmatter.title}</h1>

                <div>
                  {frontmatter.date}
                </div>

                {!!frontmatter.cover ? (
                  <Img sizes={frontmatter.cover.childImageSharp.sizes} />
                ) : null}
              </div>
            </div>
          </div>
        </main>

        <MDXRenderer>{body}</MDXRenderer>

        {previous === false ? null : (
          <>
            {previous && (
              <Link to={previous.fields.slug}>
                <p>Previous</p>
                <p>{previous.frontmatter.title}</p>
              </Link>
            )}
          </>
        )}
        {next === false ? null : (
          <>
            {next && (
              <Link to={next.fields.slug}>
                <p>Next</p>
                <p>{next.frontmatter.title}</p>
              </Link>
            )}
          </>
        )}
      </Layout>
    </div>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
        cover {
          publicURL
          childImageSharp {
            sizes(maxWidth: 2000, traceSVG: { color: "#639" }) {
              ...GatsbyImageSharpSizes_tracedSVG
            }
          }
        }
      }
      body
      excerpt
      fields {
        slug
      }
    }
  }
`;

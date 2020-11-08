import React from "react";
import Img from "gatsby-image";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Layout } from "../components/Layout";
import { useSiteMetadata } from "../hooks/useSiteMetadata";
import SEO from "react-seo-component";

import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";

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

        <main className="post-main">
          <div className="container">
            <div className="row">
              <div className="col-6 post-header">
                <h1>{frontmatter.title}</h1>
                <p>{frontmatter.date}</p>
              </div>
            </div>

            <div className="row post-content">
              <div className="col-6">
                {!!frontmatter.cover ? (
                  <div className="post-cover">
                    <Img fluid={frontmatter.cover.childImageSharp.fluid} />
                  </div>
                ) : null}
              </div>

              <div className="col-5 post-body">
                <MDXRenderer>{body}</MDXRenderer>
              </div>
            </div>
          </div>
        </main>

        <div className="post-bar container">
          <div className="row">
            <div className="col-6">
              <div className="navigator">
                {previous === false ? null : (
                  <>
                    {previous && (
                      <Link to={previous.fields.slug} className="navigator-arrow left">
                        <BsChevronLeft />
                      </Link>
                    )}
                  </>
                )}

                <span>Navegar</span>

                {next === false ? null : (
                  <>
                    {next && (
                      <Link to={next.fields.slug} className="navigator-arrow right">
                        <BsChevronRight />
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "dddd, Do MMMM YYYY")
        cover {
          publicURL
          childImageSharp {
            fluid(maxWidth: 700, quality: 100, traceSVG: { color: "#000" }) {
              ...GatsbyImageSharpFluid_tracedSVG
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

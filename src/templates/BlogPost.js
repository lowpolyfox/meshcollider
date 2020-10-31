import React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Layout } from "../components/Layout";
import Dump from "../components/Dump";

export default ({ data, pageContext }) => {
  const { frontmatter, body } = data.mdx;
  const { previous, next } = pageContext;

  return (
    <Layout>
      <Dump previous={previous} />
      <Dump next={next} />

      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>

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
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
      }
    }
  }
`;

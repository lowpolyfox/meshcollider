import React from "react";
import styled from "styled-components";
import { useSiteMetadata } from "../hooks/useSiteMetadata";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  const { title } = useSiteMetadata();

  return (
    <>
      <Header title={title} />
      {children}
    </>
  );
};

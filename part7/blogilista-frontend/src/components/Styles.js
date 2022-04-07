import styled from "styled-components";
import BlogList from "./BlogList";
import { Link } from "react-router-dom";

export const Content = styled.div`
  padding: 1em;
`;

export const StyledText = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  display: inline;
`;

export const Title = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
`;

export const SmallTitle = styled.h3`
  font-family: Arial, Helvetica, sans-serif;
`;

export const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid;
  border-radius: 3px;
`;

export const ButtonNoMargin = styled(Button)`
  margin: 0;
`;

export const Input = styled.input`
  margin: 0.25em 1em;
  padding: 0.25em;
  border: 1px solid;
  border-radius: 3px;
`;

export const Page = styled.div`
  margin: 1em;
  background: white;
  border: 1px solid;
`;

export const Navigation = styled.div`
  background: #f0f3f5;
  border-bottom: 1px solid;
  padding: 0.5em;
`;

export const StyledBlogList = styled(BlogList)`
  background-color: white;
  border-bottom: 1px solid;
  padding: 0.5em;
  margin: 0.25em 0em;
`;

export const StyledLink = styled(Link)`
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  color: black;
`;

export const ListItem = styled.li`
  font-family: Arial, Helvetica, sans-serif;
`;

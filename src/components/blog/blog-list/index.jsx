import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import { Link } from "react-router-dom";
import "./list.css";

export default class BlogList extends Component {
  state = {
    posts: [],
  };

  fetchAllPosts = async () => {
    try {
      let response = await fetch(process.env.REACT_APP_LOCAL_HOST, {
        mehod: "GET",
      });
      if (response.ok) {
        let postData = await response.json();
        console.log(postData);
        this.setState({ posts: postData });
      } else {
        alert("posts were not loaded");
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = () => {
    this.fetchAllPosts();
  };

  render() {
    return (
      <Row>
        {this.state.posts.length > 0 &&
          this.state.posts.map((post, index) => (
            <Col md={4} style={{ marginBottom: 50 }} key={index}>
              <Link to={`/blogPosts/${post._id}`} className="single-post-link">
                <BlogItem {...post} />
              </Link>
            </Col>
          ))}
      </Row>
    );
  }
}

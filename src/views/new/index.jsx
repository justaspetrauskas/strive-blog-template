import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {
  state = {
    post: {
      category: null,
      title: "",
      cover: "",
      readTime: {
        value: 2,
        unit: "minute",
      },
      author: {
        name: "Justas Petrauskas",
        avatar: "",
      },
      content: "",
    },
  };

  sendPost = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:3001/blogPosts`, {
        method: "POST",
        body: JSON.stringify(this.state.post),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        console.log("post was submitted");
        {
          this.props.fetchComments();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  reset = (e) => {
    this.setState({
      post: {
        category: null,
        title: "",
        cover: "",
        readTime: {
          value: 2,
          unit: "minute",
        },
        author: {
          name: "Justas Petrauskas",
          avatar: "",
        },
        content: "",
      },
    });
  };

  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={this.sendPost}>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              value={this.state.post.title}
              onChange={(e) =>
                this.setState({
                  post: {
                    ...this.state.post.title,
                    title: e.target.value,
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              value={this.state.post.category}
              onChange={(e) =>
                this.setState({
                  post: {
                    category: e.target.value,
                  },
                })
              }
            >
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.post.content}
              onChange={(e) => this.setState({ post: { content: e } })}
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button
              type="reset"
              size="lg"
              variant="outline-dark"
              onClick={this.reset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

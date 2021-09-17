import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { withRouter } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import "./style.css";
class EditBlogPost extends Component {
  state = {
    post: {},
    loading: true,
  };

  fetchSinglePost = async (postId) => {
    try {
      let response = await fetch(`http://localhost:3001/blogPosts/${postId}`);
      if (response.ok) {
        let singlePost = await response.json();
        this.setState({
          ...this.state.post,
          loading: false,
          post: singlePost,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleEdit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `http://localhost:3001/blogPosts/${this.state.post._id}`,
        {
          method: "PUT",
          body: JSON.stringify(this.state.post),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("this happened");
        this.props.history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchSinglePost(id);
    if (!this.state.post) {
      this.props.history.push("/404");
    }
  }
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
    if (this.state.loading) {
      return <div>Loading</div>;
    } else {
      return (
        <Container className="new-blog-container">
          <Form className="mt-5" onSubmit={this.handleEdit}>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                size="lg"
                placeholder="Title"
                value={this.state.post.title}
                onChange={(e) =>
                  this.setState({
                    post: {
                      ...this.state.post,
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
                      ...this.state.post,
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
                onChange={(e) =>
                  this.setState({ ...this.state.post, post: { content: e } })
                }
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
                Save Changes
              </Button>
            </Form.Group>
          </Form>
        </Container>
      );
    }
  }
}
export default withRouter(EditBlogPost);

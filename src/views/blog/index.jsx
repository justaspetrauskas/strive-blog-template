import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import { Link } from "react-router-dom";
//import posts from "../../data/posts.json";
import "./styles.css";

class Blog extends Component {
  state = {
    post: {},
    loading: true,
    comments: [],
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
        console.log(this.state.post);
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleDelete = async () => {
    try {
      let response = await fetch(
        `http://localhost:3001/blogPosts/${this.state.post._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("it was deleted");
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

  render() {
    const { loading, post } = this.state;

    if (loading && post) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={post.cover} fluid />
            <h1 className="blog-details-title">{post.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...post.author} />
              </div>
              <div className="blog-details-info">
                <div>{post.createdAt}</div>
                <div>{`${post.readTime.value} ${post.readTime.unit} read`}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            <div className="post-options-btn">
              <Link to={`/blog/edit/${post._id}`}>
                <button className="post-option-btn" /*onClick={handleEdit}*/>
                  Edit
                </button>
              </Link>
              <button className="post-option-btn" onClick={this.handleDelete}>
                Delete
              </button>
            </div>
            <div className="comment-section"></div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);

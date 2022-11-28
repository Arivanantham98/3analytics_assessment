import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/post";
import ReactPaginate from "react-paginate";
import "./paginate.css";
import { useNavigate } from "react-router-dom";

function Posts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParam] = useState(["title", "body"]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handlePageClick = (e) => {
    dispatch(fetchPosts(e.selected + 1));
  };

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) > -1
        );
      });
    });
  }

  const genPosts = () => {
    const allPost = [];
    posts.length > 0 &&
      search(posts).map((post) => {
        allPost.push(<Post {...post} />);
      });

    return allPost;
  };

  const allPost = genPosts();

  return (
    <div className="is-flex is-flex-direction-column is-align-items-center">
      <input
        type="search"
        name="search-form"
        id="search-form"
        className="column is-one-quarter input is-normal is-link my-5"
        placeholder="Search for..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="columns is-multiline is-justify-content-center">{allPost}</div>
      <div className="main">
        <div className="paginate">
          <ReactPaginate
            previousLabel={"Back"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={10}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
}

const Post = (props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`details/${props.id}`)}
      className="is-clickable card mb-5 p-4 column is-one-quarter m-5"
    >
      <div>
        <span className="title is-4">{props.id}. </span>
        <span className="title is-4">{props.title.slice(0, 15)}</span>
      </div>
      <div className="is-flex is-flex-direction-row mt-4">
        <figure className="image is-24x24 mr-3">
          <img
            className="is-rounded"
            src="https://bulma.io/images/placeholders/24x24.png"
            alt="profile"
          />
        </figure>
        <span className="title is-4">User </span>
        <span className="title is-4">{props.userId}</span>
      </div>
      <div>
        <p className="subtitle is-5">{props.body.slice(0, 150)}...</p>
        <div
          className="is-clickable"
          onClick={() => navigate(`details/${props.id}`)}
        >
          <span className="content-link">Read more</span>
        </div>
      </div>
    </div>
  );
};

export default Posts;

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsById, fetchPostById } from "../../store/post";

function PostDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, comments } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPostById({ id: id }));
    dispatch(fetchCommentsById({ id: id }));
  }, [dispatch, id]);

  return (
    <div className="columns is-flex is-justify-content-center mt-5">
      <div className="column is-four-fifths">
        <button
          onClick={() => navigate(-1)}
          className="button is-info is-light mb-4"
        >
          Back
        </button>
        <div className="card">
          <div className="card-content">
            <div className="content">
              <h1 className="title is-4">Post ID &nbsp; {post.id}</h1>
              <div className="is-flex is-flex-direction-row mt-4">
                <figure className="image is-24x24 mr-3">
                  <img
                    className="is-rounded"
                    src="https://bulma.io/images/placeholders/24x24.png"
                    alt="profile"
                  />
                </figure>
                <span className="title is-4">{post.userId}</span>
              </div>
              <span className="title is-4 ml-5">{post.title}</span>
              <p
                className="subtitle is-
               ml-5 mt-5"
              >
                {post.body}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="title is-5 mt-5">Comments</p>
          <div>
            {comments.map((item) => (
              <div className="is-flex is-flex-direction-row pt-5 pb-5">
                <figure className="image is-24x24 mr-3">
                  <img
                    className="is-rounded"
                    src="https://bulma.io/images/placeholders/24x24.png"
                    alt="profile"
                  />
                </figure>
                <div>
                  <p className="title is-6">{item.name}</p>
                  <p className="subtitle is-6 is-spaced mt-2">{item.body}</p>
                  <p className="title is-6">Like &nbsp; Reply</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;

import "./style.scss";
import md5 from 'md5'

function PostPreview(props) {
  return (
    <div className="post-preview flex" onClick={props.clickHandler}>
      <div className="main-container">
        <div className="info-top flex">
          <div className="v-center">
            <div className="profile-icon"></div>
          </div>
          <div className="v-center">
            <div>
              <h3 className="blog-name">{props.blogName}</h3>
              <h3 className="creation-date">Published {props.creationDate}</h3>
            </div>
          </div>
        </div>

        <h2 className="title">{props.title}</h2>

        <p className="content">{props.content.substring(0, 450)} { props.content.length>450 ? '...' : '' }</p>
      </div>

      <div className="thumbnail-container v-center">
        <img src={'https://picsum.photos/seed/'+md5(props.title)+'/1000/800'} alt="" />
      </div>
    </div>
  );
}

export default PostPreview;

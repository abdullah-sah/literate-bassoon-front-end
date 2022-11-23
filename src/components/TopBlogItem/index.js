import "./style.scss";

function TopBlogItem(props) {
  return (
    <div className="top-blog-item flex" onClick={props.clickHandler}>
      <div className="v-center">
        <div className="profile-icon"></div>
      </div>
      <div className="v-center">
        <h3>{ props.name }</h3>
      </div>
    </div>
  );
}

export default TopBlogItem;

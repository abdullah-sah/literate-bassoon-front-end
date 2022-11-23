import './style.scss'

function BlogBanner(props){
    return (
        <div className='blog-banner'>
            <h1>{ props.name }</h1>
            <div className="rule"></div>
        </div>
    )
}

export default BlogBanner

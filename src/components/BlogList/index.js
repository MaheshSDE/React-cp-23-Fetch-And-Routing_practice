// Write your JS code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class BlogList extends Component {
  state = {blogList: [], isLoading: true}

  componentDidMount = () => {
    this.getBlogsItems()
  }

  getBlogsItems = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(eachBlog => ({
      id: eachBlog.id,
      title: eachBlog.title,
      author: eachBlog.author,
      avatarUrl: eachBlog.avatar_url,
      imageUrl: eachBlog.image_url,
      topic: eachBlog.topic,
    }))
    console.log(updatedData)
    this.setState({blogList: updatedData, isLoading: false})
  }

  render() {
    const {blogList, isLoading} = this.state
    return (
      <div className="blog=list-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          blogList.map(eachBlog => (
            <BlogItem blogData={eachBlog} key={eachBlog.id} />
          ))
        )}
      </div>
    )
  }
}
export default BlogList

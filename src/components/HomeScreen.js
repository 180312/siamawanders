import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Loader from './Loader'
import M from 'materialize-css'
import BlogPostsList from './blog/BlogPostsList'
import Navbar from './Navbar'
import BackgroundImage1 from '../images/DSC_0004.jpg'
import BackgroundImage2 from '../images/DSC_0079.jpg'

class HomeScreen extends React.Component {
	componentDidMount = () => {
		M.AutoInit()
	}

	render() {
		return (
			<>
				<Navbar location={this.props.history.location} />
				<div className='parallax-container'>
					<div className='parallax'>
						<img className='responsive-img' src={BackgroundImage1} alt='' />
					</div>
				</div>
				<div className='section white'>
					<div className='container'>
						<div className='row'>
							<h5>Recent Blog Posts</h5>
							{this.props.blogposts ? (
								<BlogPostsList blogposts={this.props.blogposts} />
							) : (
								<Loader />
							)}
						</div>
					</div>
				</div>
				<div className='parallax-container'>
					<div className='parallax'>
						<img className='responsive-img' src={BackgroundImage2} alt='' />
					</div>
				</div>
			</>
		)
	}
}

const mapStateToProps = state => {
	return { blogposts: state.firestore.ordered.blogposts }
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'blogposts', orderBy: ['timestamp', 'desc'] }
	])
)(HomeScreen)

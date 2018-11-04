import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { Link } from 'react-router-dom';
import { deletePost } from '../actions';

class ShowPost extends Component {

	componentDidMount() {

		const { id } = this.props.match.params;
		this.props.fetchPost(id);
	}



	deletePost() {

		const {id} = this.props.match.params;

		this.props.deletePost(id, () => {

			return this.props.history.push('/');
		});
	}

	render() {

		if(!this.props.post) {

			return 'Loading...';
		}

		return (
			<div>

			<Link className="btn btn-primary" to="/"> Back</Link>
			
				<h2>Post Title</h2>
				{ this.props.post.title }
				<h3> Post category: { this.props.post.categories } </h3>
				<h4> Post Content: { this.props.post.content } </h4>
				<button
				onClick={this.deletePost.bind(this)}
				className="btn btn-danger xs-pull-right">Delete</button>
			</div>


			);
	}
}



function mapStateToProps(state, ownProps) {

	return { post: state.posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(ShowPost);
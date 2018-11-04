import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions/index'; 

class PostNew extends Component {

	renderFields(field) {

		const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
			<label><strong>{ field.label }</strong></label>
			<input
			className="form-control" 
			type="text"
			{ ...field.input }
			/>
				<div className="text-help">
			{ field.meta.touched ? field.meta.error : '' }
				</div>
			</div>
			);

	}

	onSubmit(values) {

		//console.log(values);

		this.props.createPost(values, () => {

			this.props.history.push('/');
		});
	}

	render() {

		const { handleSubmit } = this.props;

		return (
			<div>
			<h1 className="text-primary"> Add New Post </h1>

			

			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field 
				label="Title"
				name="title"
				component={this.renderFields}
				/>

				<Field 
				label="Category"
				name="categories"
				component={this.renderFields}
				/>

				<Field 
				label="Content"
				name="content"
				component={this.renderFields}
				/>
					

			<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-warning">Back</Link>
			</form>

				</div>
				

			);
	}
}

	function validate(values) {
		
		const errors = {};

		if(!values.title) {

			errors.title = "Please Enter the Title";
		}

		if(!values.categories) {

			errors.categories = "Category is required";
		}

		if(!values.content) {

			errors.content = "Please Enter the Content";
		}

		return errors;
	}

	export default reduxForm({
	  
	  validate,
	  form: 'PostNewForm'

	})(
	
	connect(null, { createPost })(PostNew)
	);
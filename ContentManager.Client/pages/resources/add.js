import { useEffect, useState } from "react";
import Layout from "components/Layout";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

export default function AddResourcePage() {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();

	const [timeToFinish, setTimeToFinish] = useState(120);

	useEffect(() => {
		// addResource();
	});

	const onSubmit = (dataItem) => {
		/* 
		* Form.Range do not work when the register from hook-form is assigned
		* So lets get the value here bofore send to server.
		*/
		dataItem.timeToFinish = timeToFinish;


		addResource(dataItem);
		// alert(JSON.stringify(dataItem, null, 2));
	};

	const timeToFinish_ChangeHandler = (e) => {
		const time = e.target.value;
		setTimeToFinish(time);
	};

	// Form rules definition
	const errorMsgRenderFn = ({ message }) => <Form.Text className="text-danger">{message}</Form.Text>
	var titleRegister = register("title", {
		required: "Title is required.",
		minLength: { value: 4, message: "Title must be greater then 4 characters." }
	});
	var descRegister = register("description", {
		minLength: { value: 4, message: "Description must be greater then 4 characters." }
	});
	var priorityRegister = register("priority", {
		min: { value: 1, message: "Please select a valid priority option." },
		max: { value: 3, message: "Please select a valid priority option." }
	});
	var createdAtRegister = register("createdAt", {
		required: "Created At date is required."
	});


	const addResource = (data) => {

		// const data = {
		// 	title: "My new resource",
		// 	description: "My new resource description",
		// 	resource_link: "https://my-link.com",
		// 	imageUrl: "https://my-images.com",
		// 	priority: 1,
		// 	timeToFinish: 20,
		// 	active: true,
		// 	createdAt: "2022-02-11"
		// };

		fetch('http://localhost:5179/api/resources', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		})
			.then(() => {
				console.log("Post complete");
			})
			.catch((error) => {
				console.log(error);
			});

	};


	return (
		<Layout>
			<Form className="col-8 mx-auto" onSubmit={handleSubmit(onSubmit)}>
				<Row className="mb-5">
					<Col className="d-flex justify-content-center">
						<h1>Create New Resource</h1>
					</Col>
				</Row>

				<Row className="mb-3">
					<Form.Group as={Col} controlId="title">
						<Form.Label>Title</Form.Label>
						<Form.Control type="text" placeholder="Enter resource title" {...titleRegister} />
						<ErrorMessage errors={errors} name="title" render={errorMsgRenderFn} />
					</Form.Group>

					<Form.Group as={Col} controlId="description">
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" placeholder="Describe the resource" {...descRegister} />
						<ErrorMessage errors={errors} name="description" render={errorMsgRenderFn} />
					</Form.Group>
				</Row>

				<Form.Group as={Col} className="mb-3" controlId="link">
					<Form.Label>Link</Form.Label>
					<Form.Control type="text" placeholder="Link" {...register("link")} />
				</Form.Group>

				<Form.Group as={Col} className=" mb-3" controlId="image">
					<Form.Label>Image</Form.Label>
					<Form.Control type="text" placeholder="Enter the url of the image" {...register("image")} />
				</Form.Group>

				<Row>
					<Form.Group as={Col} className="mb-3" controlId="priority">
						<Form.Label>Priority</Form.Label>
						<Form.Select type="text" aria-label="What is the priority for the resource" {...priorityRegister}>
							<option value={-1}>Select one</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</Form.Select>
						<ErrorMessage errors={errors} name="priority" render={errorMsgRenderFn} />
					</Form.Group>

					<Form.Group as={Col} controlId="createdAt">
						<Form.Label>Created At</Form.Label>
						<Form.Control type="date" {...createdAtRegister} />
						<ErrorMessage errors={errors} name="createdAt" render={errorMsgRenderFn} />
					</Form.Group>
				</Row>

				<Form.Group as={Col} className="mb-3" controlId="timeToFinish">
					<Form.Label>Time To Finish</Form.Label>
					<Form.Range min="0" max="1440" onChange={timeToFinish_ChangeHandler}
						value={timeToFinish} />
					<Form.Text>{timeToFinish} minutes</Form.Text>
				</Form.Group>

				<Form.Group as={Col} controlId="active">
					<Form.Check type="switch" label="Active" id="activeStatus" {...register("active")} />
				</Form.Group>

				<Button type="submit" variant="primary" size="lg" className="mt-5">
					Submit
				</Button>
			</Form>

		</Layout>
	);
}

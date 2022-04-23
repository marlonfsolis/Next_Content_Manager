import { useEffect, useState } from "react";
import Layout from "components/Layout";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

export default function AddResourcePage() {

	const formDefaultValues = {
		title: "Default Title",
		description: "Default description",
		timeToFinish: 120,
		active: true
	};

	const { register, handleSubmit, watch, reset, formState: { errors, isSubmitSuccessful } } = useForm({
		defaultValues: formDefaultValues
	});


	const [timeToFinish, active] = watch(["timeToFinish", "active"]);
	// You can call a function too in case you want to do more stuff
	watch((data, { name, type }) => {
		switch (name) {
			case "title":
				// console log the event
				console.log(`Title has ${type} and current value is ${data?.title}`);
				// and do more stuff if needed
				break;

			default:
				break;
		}
	});

	const [showSuccessfulMsg, setShowSuccessfulMsg] = useState(false);
	const [showFailMdsg, setShowFailMdsg] = useState(false);

	useEffect(() => {
		// addResource();
	}, []);


	const onSubmit = (dataItem) => {
		addResource(dataItem);
		// alert(JSON.stringify(dataItem, null, 2));
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
	var timeToFinishRegister = register("timeToFinish", {
		min: { value: 1, message: "Please set a time greater than 1." },
		max: { value: 1440, message: "Please select a time less than 1440." }
	});
	var linkRegister = register("resource_link", { value: "http://my-link.com" });
	var imageRegister = register("imageUrl", { value: "http://my-image.com" });
	var activeRegister = register("active");


	const addResource = (data) => {
		// console.log(data);

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
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		})
			.then(() => {
				setShowSuccessfulMsg(true);
				reset();
				console.log("Post complete");
			})
			.catch((error) => {
				setShowFailMdsg(false);
				console.log(error);
			});

	};


	return (
		<Layout>
			{showSuccessfulMsg &&
				<div className="m-5">
					<div className="alert alert-success alert-dismissible fade show" role="alert">
						<strong>Well done!</strong> You just created a new Resource.
						<button type="button" className="btn-close"
							data-bs-dismiss="alert" aria-label="Close"
							onClick={() => setShowSuccessfulMsg(false)}></button>
					</div>
				</div>
			}

			{showFailMdsg &&
				<div className="m-5">
					<div className="alert alert-danger alert-dismissible fade show" role="alert">
						<strong>Mmmm!</strong> Somthing went wrong. The Resource was not created.
						<button type="button" className="btn-close"
							data-bs-dismiss="alert" aria-label="Close"
							onClick={() => setShowFailMdsg(false)}></button>
					</div>
				</div>
			}

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

				<Form.Group as={Col} className="mb-3" controlId="resource_link">
					<Form.Label>Link</Form.Label>
					<Form.Control type="text" placeholder="Link" {...linkRegister} />
				</Form.Group>

				<Form.Group as={Col} className=" mb-3" controlId="imageUrl">
					<Form.Label>Image</Form.Label>
					<Form.Control type="text" placeholder="Enter the url of the image" {...imageRegister} />
				</Form.Group>

				<Row>
					<Form.Group as={Col} className="mb-3" controlId="priority">
						<Form.Label>Priority</Form.Label>
						<Form.Select aria-label="What is the priority for the resource" {...priorityRegister}>
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
					<Form.Range min="0" max="1440" {...timeToFinishRegister} />
					<Form.Text>{timeToFinish} minutes</Form.Text>
					<div>
						<ErrorMessage errors={errors} name="timeToFinish" render={errorMsgRenderFn} />
					</div>
				</Form.Group>

				<Form.Group as={Col} controlId="active">
					<Form.Check type="switch" label="Active" id="activeStatus" {...activeRegister} />
				</Form.Group>

				<Button type="submit" variant="primary" size="lg" className="mt-5">
					Submit
				</Button>
			</Form>

		</Layout>
	);
}

import { useEffect, useState } from "react";
import Layout from "components/Layout";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";

export default function AddResourcePage() {
	const { register, handleSubmit, watch, errors } = useForm();

	const onSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));

	const [timeToFinish, setTimeToFinish] = useState(120);

	useEffect(() => {
		// addResource();
	});

	const timeToFinish_ChangeHandler = (e) => {
		const time = e.target.value;
		setTimeToFinish(time);
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
						<Form.Control type="text" placeholder="Enter resource title"
							{...register("title", { required: true, minLength: 4 })} />
						<Form.Text>{errors && "Title is required."}</Form.Text>
					</Form.Group>

					<Form.Group as={Col} controlId="description">
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" placeholder="Describe the resource"
							{...register("description", { minLength: 4 })} />
					</Form.Group>
				</Row>

				<Form.Group as={Col} className="mb-3" controlId="link">
					<Form.Label>Link</Form.Label>
					<Form.Control type="text" placeholder="Link" />
				</Form.Group>

				<Form.Group as={Col} className=" mb-3" controlId="image">
					<Form.Label>Image</Form.Label>
					<Form.Control type="text" placeholder="Enter the url of the image" />
				</Form.Group>

				<Row>
					<Form.Group as={Col} className="mb-3" controlId="priority">
						<Form.Label>Priority</Form.Label>
						<Form.Select type="text" aria-label="What is the priority for the resource">
							<option value={-1}>Select one</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} controlId="createdAt">
						<Form.Label>Created At</Form.Label>
						<Form.Control type="date" />
					</Form.Group>
				</Row>

				<Form.Group as={Col} className="mb-3" controlId="timeToFinish">
					<Form.Label>Time To Finish</Form.Label>
					<Form.Range min="0" max="1440" onChange={timeToFinish_ChangeHandler} value={timeToFinish} />
					<Form.Text>{timeToFinish} minutes</Form.Text>
				</Form.Group>

				<Form.Group as={Col} controlId="active">
					<Form.Check type="switch" label="Active" id="activeStatus" />
				</Form.Group>

				<Button type="submit" variant="primary" size="lg" className="mt-5">
					Submit
				</Button>
			</Form>

		</Layout>
	);
}


const addResource = () => {

	const data = {
		title: "My new resource",
		description: "My new resource description",
		resource_link: "https://my-link.com",
		imageUrl: "https://my-images.com",
		priority: 1,
		timeToFinish: 20,
		active: true,
		createdAt: "2022-02-11"
	};

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

}
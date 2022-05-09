import React from 'react'
import { useRouter } from "next/router";
import Layout from "components/shared/Layout";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import axios from "../../axios";
import moment from "moment";

export default function Edit(props) {
  const router = useRouter();
  const [resource, setResource] = React.useState(props.resource);

  ////////////////////////////////////////////////////////////////////////////////////
  // Form setup 
  ////////////////////////////////////////////////////////////////////////////////////
  const formDefaultValues = {
    title: resource?.title,
    description: resource?.description,
    resource_link: resource?.resource_link,
    imageUrl: resource?.imageUrl,
    priority: resource?.priority,
    timeToFinish: resource?.timeToFinish,
    active: resource?.active,
    createdAt: moment(resource.createdAt).format("YYYY-MM-DD")
  };

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitSuccessful } } = useForm({
    defaultValues: formDefaultValues
  });

  // Observers
  const [timeToFinish, active] = watch(["timeToFinish", "active"]);

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



  ////////////////////////////////////////////////////////////////////////////////////
  // Functions 
  ////////////////////////////////////////////////////////////////////////////////////

  function onSubmit(dataItem) {
    // addResource(dataItem);
    alert(JSON.stringify(dataItem, null, 2));
  }


  ////////////////////////////////////////////////////////////////////////////////////
  // Content Output 
  ////////////////////////////////////////////////////////////////////////////////////
  return (
    <Layout>
      <Form className="col-8 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-5">
          <Col className="d-flex justify-content-center">
            <h1>Edit Resource</h1>
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
  )
}


/**
 * Get server props
 */
export async function getServerSideProps(context) {
  let data = {};
  const { rid } = context.query;

  try {
    const response = await axios.get(`resources/${rid}`);
    const result = response.data;
    data = result.data;
  } catch (error) {
    toast.error("Somthing occurred while trying to read the resource!");

    if (error.response) {
      const result = error.response.data;
      toast.error(result.error.message);
    } else {
      console.log(error.message);
    }
    console.log(error);
  }

  return {
    props: {
      resource: data
    }
  }
}

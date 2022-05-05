import React from 'react'
import Layout from "components/shared/Layout";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import axios from "../../axios";

export default function Edit(props) {



  ////////////////////////////////////////////////////////////////////////////////////
  // Form setup 
  ////////////////////////////////////////////////////////////////////////////////////
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



  return (
    <div>Edit</div>
  )
}

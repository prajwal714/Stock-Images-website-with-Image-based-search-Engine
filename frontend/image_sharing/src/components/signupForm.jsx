import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Alert } from "antd";
import Joi from "joi-browser";
// import auth, { getCurrentUser } from "../services/auth";
// import { registerHost } from "../services/user";
// import http from "../services/http";
import { toast } from "react-toastify";
//import * as jwt_decode from "jwt-decode";
class Register extends Component {
    state = {
        data: { email: "", password: "", name: "", contact: "" },
        errors: {}
    };
    schema = {
        email: Joi.string()
            .email()
            .required()
            .label("email"),
        password: Joi.string()
            .min(5)
            .required()
            .label("Password"),
        name: Joi.string()
            .required()
            .min(1)
            .label("Name"),
        contact: Joi.number()
            .integer()
            .min(1000000000)
            .max(9999999999)
            .required()
            .label("Contact")
    };
    validate = () => {
        const { error } = Joi.validate(this.state.data, this.schema, {
            abortEarly: false
        });
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };
    validateProperty = ({ name, value }) => {
        //console.log("I am validate property");
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        if (!error) return null;
        return error.details[0].message;
    };
    handleChange = ({ currentTarget: input }) => {
        //console.log("I am handle change");
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;

        this.setState({ data, errors });
    };
    handleSubmit = e => {
        e.preventDefault();
        //console.log("I worked");
        const errors = this.validate();
        this.setState({ errors: errors || {} });

        if (errors) return;

        this.doSubmit();
    };
    doSubmit = async () => {
        // try {
        //     const response = await registerHost(this.state.data);
        //     auth.loginWithJwt(response.headers["x-auth-token"]);
        //     toast.success("Successfully Registered as Host");
        //     //window.location = "/";
        //     const currentUser = getCurrentUser();
        //     //console.log(currentUser);
        //     window.location = "/host/" + currentUser._id;
        // } catch (ex) {
        //     if (ex.response && ex.response.status === 400) {
        //         toast.error(ex.response.data);
        //         const errors = { ...this.state.errors };
        //         errors.email = ex.response.data;
        //         this.setState({ errors });
        //     }
        }
   

    componentDidMount() {
        toast.configure({
            autoClose: 8000,
            draggable: false,
            position: toast.POSITION.TOP_CENTER
            //etc you get the idea
        });
    }
    render() {
        return (
            <>
                <div
                    style={{
                        margin: "20px 450px 20px"
                    }}
                >
                    <h1 style={{ color: "white", fontSize: "200%" }}>
                        Register to Check-out your Visitors!
          </h1>
                    <div
                        style={{
                            width: "400px"
                        }}
                    >
                        <form onSubmit={this.handleSubmit} className="login-form">
                            <Input
                                style={{ marginTop: "20px" }}
                                size="large"
                                id={this.state.data.email}
                                name="email"
                                Placeholder="email"
                                value={this.state.data.email}
                                onChange={this.handleChange}
                            />
                            {this.state.errors.email && (
                                <Alert
                                    message={this.state.errors.email}
                                    type="error"
                                    showIcon
                                />
                            )}

                            <Input
                                type="password"
                                style={{ marginTop: "20px" }}
                                size="large"
                                name="password"
                                id={this.state.data.password}
                                Placeholder="Password"
                                value={this.state.data.password}
                                onChange={this.handleChange}
                            />
                            {this.state.errors.password && (
                                <Alert
                                    message={this.state.errors.password}
                                    type="error"
                                    showIcon
                                />
                            )}
                            <Input
                                style={{ marginTop: "20px" }}
                                size="large"
                                name="name"
                                id={this.state.data.name}
                                Placeholder="Name"
                                value={this.state.data.name}
                                onChange={this.handleChange}
                            />
                            {this.state.errors.name && (
                                <Alert message={this.state.errors.name} type="error" showIcon />
                            )}
                            <Input
                                style={{ marginTop: "20px" }}
                                size="large"
                                name="contact"
                                id={this.state.data.contact}
                                Placeholder="Contact"
                                value={this.state.data.contact}
                                onChange={this.handleChange}
                            />
                            {this.state.errors.contact && (
                                <Alert
                                    message={this.state.errors.contact}
                                    type="error"
                                    showIcon
                                />
                            )}
                            <Button
                                size="large"
                                type={this.validate() ? "danger" : "primary"}
                                htmlType="submit"
                                className="login-form-button"
                                style={{ width: "400px", margin: "30px auto" }}
                            >
                                Register
              </Button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
export default Register;
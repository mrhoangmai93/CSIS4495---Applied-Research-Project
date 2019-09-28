import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import withLayout from "../../../hocs/front/Layout";
import './index.scss';
import {Container, Form, Button, InputGroup, Col} from 'react-bootstrap';

function Contact() {
    const [validated, setValidated] = useState(false);
    
      const handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
    
    return (
    <React.Fragment>
        <hr/>
        <Container className="contactContainer">  
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustomEmail">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a email address.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>                    
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustomMessage">
                        <Form.Label>Message</Form.Label>
                        <InputGroup>
                            <Form.Control
                                as="textarea"
                                placeholder="Type your message"
                                rows="5"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please type a message.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>     
                <Button className="formButton" type="submit">Send Message</Button>
            </Form>
        </Container>
        <hr/>
    </React.Fragment>
    );
}



const mapStateToProps = (state, ownProps) => ({});
export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(withLayout(Contact))
);

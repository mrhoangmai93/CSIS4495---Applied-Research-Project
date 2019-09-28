import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export class AboutProject extends Component {
    render() {
        return (
            <Container className="mainContainer">
            <hr/>
                <Row>
                    <Col lg={6}>
                        <img style={{width:'100%'}} src="/images/background-home.jpg" alt="image"/>
                    </Col>
                    <Col lg={6}>
                        <h2>About FoodBy Me</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed voluptate nihil eum consectetur similique? Consectetur, quod, incidunt, harum nisi dolores delectus reprehenderit voluptatem perferendis dicta dolorem non blanditiis ex fugiat.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, magni, aperiam vitae illum voluptatum aut sequi impedit non velit ab ea pariatur sint quidem corporis eveniet. Odit, temporibus reprehenderit dolorum!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>
                    </Col>
                </Row>
                <hr/>
            </Container>
        )
    }
}

export default AboutProject

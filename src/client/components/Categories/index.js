import React from 'react';
import './index.css';
import {Link} from 'react-router-dom'
import {Card, CardGroup} from 'react-bootstrap'

const Categories = (props) => (
    <div class="categories">
    <section>
        <div class="category">
            <Link to="/">
            <header>
                <img src="./images/asian.png" alt="asian food"/>
                <hr/>
                <h3>Category 1</h3>
            </header>
            </Link>
        </div>
    </section>
    <section>
        <div class="category">
        <Link to="/">
            <header>
                <img src="./images/asian.png" alt="asian food"/>
                <hr/>
                <h3>Category 2</h3>
            </header>
        </Link>
        </div>
    </section>
    <section>
        <div class="category">
        <Link to="/">
            <header>
                <img src="./images/asian.png" alt="asian food"/>
                <hr/>
                <h3>Category 3</h3>
            </header>
        </Link>
        </div>
    </section>
    <section>
        <div class="category">
        <Link to="/">
            <header>
                <img src="./images/asian.png" alt="asian food"/>
                <hr/>
                <h3>Category 4</h3>
            </header>
            </Link>
        </div>
    </section>
    <section>
        <div class="category">
        <Link to="/">
            <header>
                <img src="./images/asian.png" alt="asian food"/>
                <hr/>
                <h3>Category 5</h3>
            </header>
            </Link>
        </div>
    </section>
    <section>
        <div class="category">
        <Link to="/">
            <header>
                <img src="./images/asian.png" alt="asian food"/>
                <hr/>
                <h3>Category 6</h3>
            </header>
            </Link>
        </div>
    </section>
</div>
);
  
export default Categories;
  
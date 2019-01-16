import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';


    function RenderDish({dish}) {
        if (dish !== null) {

            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    function RenderComments({comments}) {  
        if (comments !== undefined && comments.length > 0) {
            let formattedComments = comments.map((singleComment) => {
                let options = { year: 'numeric', month: 'short', day: 'numeric' };
                return (
                    <li key = {singleComment.id}>
                        <p>{singleComment.comment}</p>
                        <small>--{singleComment.author}, {new Date(singleComment.date).toLocaleDateString("en-US", options)}</small>
                        <hr/>
                    </li>
                );
            });

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {formattedComments}
                    </ul>
                </div>
            );
        }
        else {
            return <div></div>;
        }
    }

    const DishDetail = (props) => {
        if (props.dish !== undefined) {
            let dish = props.dish;
            let comments = (props.comments !== null) ? props.comments : undefined;
            return  (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/home'>Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to='/menu'>Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {dish.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={dish}/>
                        <RenderComments comments={comments}/>
                    </div>                
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

export default DishDetail;
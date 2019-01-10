import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    renderDish(dish) {
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

    renderComments(comments) {       
        if (comments !== undefined && comments.length > 0) {
            let formattedComments = comments.map((singleComment) => {
                let options = { year: 'numeric', month: 'short', day: 'numeric' };
                return (
                    <div key = {singleComment.id}>
                        <p>{singleComment.comment}</p>
                        <small>--{singleComment.author}, {new Date(singleComment.date).toLocaleDateString("en-US", options)}</small>
                        <hr/>
                    </div>
                );
            });

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {formattedComments}
                </div>
            );
        }
        else {
            return <div></div>;
        }
    }

    render() {
        let dish = this.props.dish;
        let comments = (dish !== null && dish.hasOwnProperty('comments')) ? dish.comments : undefined;
        return  (
            <div className="row">
                {this.renderDish(dish)}
                {this.renderComments(comments)}
            </div>
        );
    }
}

export default DishDetail;
import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Label, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderDish({ dish }) {
  if (dish !== null) {

    return (
      <div className="col-12 col-md-5 m-1">
        <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
          <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    );
  }
  else {
    return (
      <div></div>
    );
  }
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments !== undefined && comments.length > 0) {
    let formattedComments = comments.map((singleComment) => {

      return (
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in>
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                </li>
              </Fade>
            );
          })}
        </Stagger>
      );
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {formattedComments}
        </ul>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  }
  else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  if (props.dish !== null) {
    let dish = props.dish;
    let comments = (props.comments !== null) ? props.comments : undefined;
    return (
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
          <RenderDish dish={dish} />
          <RenderComments comments={comments} postComment={props.postComment} dishId={props.dish.id} />
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


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {


  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleComment(values) {
    this.toggleModal();
    console.log(this.props);
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleComment(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" xs={12}>Rating</Label>
                <Col xs={12}>
                  <Control.select
                    name="rating"
                    className="form-control"
                    model=".rating"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" xs={12}>Your Name</Label>
                <Col xs={12}>
                  <Control.text
                    id="author"
                    name="author"
                    className="form-control"
                    model=".author"
                    placeholder="Your Name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    show="touched"
                    model=".author"
                    messages={{
                      required: 'Required.',
                      minLength: 'Must be greater than 3 characters.',
                      maxLength: 'Must be 15 characters or less.'
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" xs={12}>Comment</Label>
                <Col xs={12}>
                  <Control.textarea
                    id="comment"
                    name="comment"
                    className="form-control"
                    model=".comment"
                    rows="6"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">Submit</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default DishDetail;

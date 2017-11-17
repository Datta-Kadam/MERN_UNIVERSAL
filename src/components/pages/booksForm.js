"use strict";

import React from 'react';
import {Well,Panel,FormControl,FormGroup,ControlLabel,Button,InputGroup,Dropdown,Image
    ,DropdownButton,MenuItem,Row,Col,Feedback, FormControlFeedback} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks,deleteBooks,getBooks,resetButton} from '../../actions/booksActions';
import axios from 'axios';

class BooksForm extends React.Component{

    constructor(props){
        super(props);
        this.state={
            images:[{}],
            img:''
        }

        console.log(this.props.books);
    }
    componentDidMount(){
        this.props.getBooks();
        //GET THE IMAGES
        axios.get('/api/images')
        .then((response)=>{
            this.setState({images:response.data});
        })
        .catch((err)=>{
            this.setState({images:'error loading images', img:''});
        })
    }

    handleSumit(){
        const book=[{
            images:findDOMNode(this.refs.image).value,
            title:findDOMNode(this.refs.title).value,
            description:findDOMNode(this.refs.description).value,
            price:findDOMNode(this.refs.price).value,
        }]
        this.props.postBooks(book);
    }
    resetForm(){
        this.props.resetButton();
        findDOMNode(this.refs.title).value='',
        findDOMNode(this.refs.description).value='',
        findDOMNode(this.refs.price).value=''
        this.setState({img:''});
    }

    onDelete(){
        let bookId=findDOMNode(this.refs.delete).value;        
        this.props.deleteBooks(bookId);
    }

    handleSelect(img){
        this.setState({ img:`/images/${img}`});
    }
    
    render(){
        const booksList=this.props.books.map(function(book){
            return(
                <option key={book._id}>{book._id}</option>
            )
        });

        const imgList=this.state.images.map(function(img,i){
            return (
                <MenuItem onClick={this.handleSelect.bind(this,img.name)} key={i} eventKey={img.name}> {img.name}</MenuItem>
            )
        },this);

        return(
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                    <Panel>
                        <InputGroup>
                            <FormControl type="text" ref="image" value={this.state.img} />
                            <DropdownButton
                            componentClass={InputGroup.Button}
                            id="input-dropdown-addon"
                            title="Select an image"
                            bsStyle="primary">
                               {imgList}
                            </DropdownButton>                        
                        </InputGroup>
                        <img src={this.state.img} responsive/>
                    </Panel>                    
                    </Col>
                    <Col xs={12} sm={6}>
                    <Panel>
                        <FormGroup controlId="title" validationState={this.props.validation}>
                            <ControlLabel>Title</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter Title"
                                ref="title"/>
                            <FormControl.Feedback/>
                        </FormGroup>
                        <FormGroup controlId="description" validationState={this.props.validation}>
                            <ControlLabel>description</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter description"
                                ref="description"/>
                            <FormControl.Feedback/>
                        </FormGroup>
                        <FormGroup controlId="price" validationState={this.props.validation}>
                            <ControlLabel>price </ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter price"
                                ref="price"/>
                            <FormControl.Feedback/>
                        </FormGroup>
                        <Button 
                            onClick={(!this.props.msg)?
                                (this.handleSumit.bind(this)):
                                (this.resetForm.bind(this))} 
                            bsStyle={(!this.props.style)?('primary'):(this.props.style)}>
                             {(!this.props.msg)?('Save book'):(this.props.msg)}
                        </Button>
                    </Panel>
                    <Panel style={{marginTop:'25px'}}>
                        <FormGroup controlId="FormControlsSheet">
                            <ControlLabel>Select a book id to delete</ControlLabel>
                            <FormControl ref="delete" componentClass="select" placeholder="Select">
                                <option value="select">Select</option>
                                {booksList}
                            </FormControl>
                        </FormGroup>
                        <button onClick={this.onDelete.bind(this)} className="btn btn-sm btn-danger">Delete</button>
                    </Panel>
                    </Col>
                </Row>                
            </Well>
        )
    }
}


function mapStateToProps(state){
    return{ 
        books:state.books.books,
        msg:state.books.msg,
        style:state.books.style,
        validation:state.books.validation
    }
}

//for dispatching actions using dispatch
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        postBooks:postBooks,
        deleteBooks:deleteBooks,
        getBooks:getBooks,
        resetButton:resetButton
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BooksForm) ;
import React, { Component } from "react";
import Button from '@material-ui/core/Button';


export default class OrderView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            parentCallback: props.parentCallback
        }
    }

    handleClick = () => {
        this.state.parentCallback('OrderView',{showGrid: true});
    }

    downloadImage = () => {
        //Storage.get(this.state.data.image, {download:true});
        
    }

    render() {
        return (
            <div>
            {
                this.state.data!=null ? 
                <div>
                    <h3>Order view</h3>
                    <p>Name: {this.state.data.name}</p>
                    <p>Description: {this.state.data.description}</p>
                    {this.state.data.image && <img src={this.state.data.image} style={{width: 400}} onClick={this.downloadImage}/>}
                    <a href={this.state.data.image} target="_blank">image name</a>
                    <div><Button variant="contained" onClick={this.handleClick}>Back to Orders</Button></div>
                </div>
            :null 
            }
            </div>
        );
    }
}
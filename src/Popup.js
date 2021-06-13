import React, { Component } from "react"; 

export default class PopUp extends Component {

    constructor(props){
        super(props);
        this.setState({
            className: 'PopUp'
        })
    }


    handleClick = () => {
        this.props.toggle();
    }; 
    
    render() {
        return (
            <div className="modal" style={{backgroundColor: "lightblue"}}>
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>&times;    </span>
                    <p>{this.props.message}</p>
                </div>
            </div>
        );
    }
}
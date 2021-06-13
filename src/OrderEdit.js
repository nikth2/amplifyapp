import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { API, Storage } from 'aws-amplify';
import { createNote as createNoteMutation } from './graphql/mutations';

export default class OrderEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            parentCallback: props.parentCallback
        }
    }


    createNote = async () => {
        if (!this.state.data.name || !this.state.data.description) return;
        console.log("formData.username:" + this.state.data.username);
        await API.graphql({ query: createNoteMutation, variables: { input: this.state.data } });
        if (this.state.data.image) {
            const image = await Storage.get(this.state.data.image);
            this.state.data.image = image;
        }
    }

    onChange = async (e) => {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        this.setState({ data:{image: file.name }});
        await Storage.put(file.name, file);
      }

      setDescription = (e) => {
          this.setState({data:{description: e.target.value}})
      }


    render() {
        return (
            <div>
                <input
                    onChange={e => this.state.data.name= e.target.value }
                    placeholder="Note name"
                    value={this.state.data.name}
                />
                <input
                    onChange={(e) => this.state.data.description= e.target.value }
                    placeholder="Note description"
                    value={this.state.data.description}
                />

                <input
                    type="file"
                    onChange={this.onChange}
                />
                <button onClick={this.createNote}>Create Note</button>
            </div>
        );
    }
}
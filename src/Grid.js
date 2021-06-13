import React, { Component } from "react"; 
import { API, Auth, Storage } from 'aws-amplify';
import { listNotes, listNotesForUser } from './graphql/queries';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

export default class MyGrid extends Component {

    columns = [
        { field: 'id', headerName: 'ID', width: 70, hide: true },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130, flex: 1 },
        { field: 'username', headerName: 'Created By', width: 200 },
        { field: 'image', headerName: 'Image', width: 130, hide: true},
      ];

      rows = [];
    
    constructor(props) {
        super(props);
        this.state = {
            noteItems : [],
            selectedRow: [],
            visible: true,
            className: 'MyGrid'
        };
    }
    

    async fetchNotes() {
        var loggedUser;
        //await Auth.currentUserInfo().then(info => loggedUser = info.username);
        console.log("loggedUser:"+loggedUser);
        //const apiData = await API.graphql({ query: listNotesForUser,  variables:{username: {eq: loggedUser}} });
        
        const apiData = await API.graphql({ query: listNotes });
        const notesFromAPI = apiData.data.listNotes.items;
        await Promise.all(notesFromAPI.map(async note => {
          if (note.image) {
            const image = await Storage.get(note.image);
            note.image = image;
          }
          return note;
        }))
        notesFromAPI.map(note => {
          console.log("username:"+note.username);
          //this.rows.push({id:note.id, name: note.name, description:note.description, image: note.image, username:note.username});
        })
        this.rows = notesFromAPI;

        this.setState({
            noteItems : apiData.data.listNotes.items
        });
      }
      
      componentDidMount(){
        this.fetchNotes();
      }

      handleClick = () => {
          //this.setState({visible: !this.state.visible});
          this.props.parentCallback('Grid', {selectedRow:this.state.selectedRow, showGrid: false});
      }

      selectRow = (selection) => {
          if(selection.isSelected) {
              this.setState({selectedRow: selection.data});
          }
      }

    render(){
        return(
            <div>
                {/* <table style={{border: 10, color: "black"}}>
                    <tbody style={{border: 10, color: "black"}}>
                    {
                        this.state.noteItems.map(item => (
                            <tr style={{border: 10, color: "black"}}>
                                <td style={{border: 10, color: "black"}}>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.username}</td>
                                <td>
                                    {
                                        item.image && <img src={item.image} style={{width: 20}} />
                                    }
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table> */
                }
                {
                    this.state.visible?
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={this.rows} columns={this.columns} pageSize={5} checkboxSelection={true} onRowSelected={this.selectRow} />
                        
                    </div>
                    :null
                }
                    
                <div><Button variant="contained" onClick={this.handleClick}>Select</Button></div>
            </div>
        );
    }
}
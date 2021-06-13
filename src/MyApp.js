import React from 'react';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Popup from './Popup';
import MyGrid from './Grid';
import OrderView from './OrderView';
import OrderEdit from './OrderEdit';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

class MyApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seen: false,
            showGrid: true,
            className: 'MyApp'
        };
        this.getUsername();
    }

    async getUsername() {
        await Auth.currentUserInfo().then(info => this.setState({ username: info.username }));
    }





    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };

    getSelectedRowFromGrid = (data) => {
        this.setState({
            selectedRow: data
        });
        console.log("selected:" + data.name);
    }

    notify = (child, data) => {
        console.log('child:' + child);
        if (child === 'Grid') {
            this.setState({
                selectedRow: data.selectedRow,
                showGrid: data.showGrid
            });
        } else if (child === 'OrderView') {
            this.setState({
                showGrid: data.showGrid
            });
        }

    }

    
    render() {
        return (
            <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      
            <div>
                <h1>Welcome {this.state.username}</h1>
                {/*<div className="n" onClick={this.togglePop}>
                    <button>Click here</button>
                    {this.state.seen ? <Popup toggle={this.togglePop} message="Hello Popup" /> :null}
        </div>*/}
                {
                    <div>
                        <button onClick={this.togglePop}>Create new entry</button>
                        {this.state.seen ? <OrderEdit data={{username:this.state.username}} parentCallback={this.notify} /> :null}
                    </div>
                }
                {
                    this.state.showGrid === true ? <MyGrid parentCallback={this.notify} />
                        : <OrderView data={this.state.selectedRow} parentCallback={this.notify} />
                }
                {
                    this.state.showGrid === false ? <OrderEdit data={this.state.selectedRow} parentCallback={this.notify} /> : null
                }
                <AmplifySignOut />
            </div>
            </React.Fragment>
        );
    }

}

export default withAuthenticator(MyApp);
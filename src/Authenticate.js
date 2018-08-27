import firebase from 'firebase';
import React from 'react';



class Authenticate extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:'',
            error:'',
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleEmailChange(e){
        this.setState({email:e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value });
    }

    handleCreateUser(){
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => {
            this.setState({error: error.message})
            
        });
    }

    handleLogin(){
        firebase.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => {
            this.setState({error: error.message})
            
        });
    }


    render(){
        return (
            <form className="container-fluid col-sm-12 col-lg-4 mt-4 ">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input value={this.state.mail} onChange={this.handleEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input value={this.state.password} onChange={this.handlePasswordChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                    <button onClick={this.handleCreateUser} type="button" className="btn btn-primary m-4">New User</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleLogin}>Sign In</button>
            </form>


        );
    }
}

export default Authenticate;
import React from 'react';
import firebase from 'firebase';
import AddForm from './AddForm';


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [], text: '' }; 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        /** Tasks and AddForm events**/
        this.handleCheck = this.handleCheck.bind(this);

        /** Firebase events */
        this.handleChildChanged = this.handleChildChanged.bind(this);
        this.handleChildAdded = this.handleChildAdded.bind(this);
        this.saveForm = this.saveForm.bind(this);
        
        /** Reference for this user Tasks**/
        const db = firebase.database();
        this.tasksRef = db.ref().child(`tasks/${this.props.user.uid}`);
    }


    componentDidMount() {
		/** To avoid adding tasks to a not yet mounted component, we don't bind
	 	* the firebase callbacks until it mounts**/
        this.tasksRef.on('child_added', this.handleChildAdded);
        this.tasksRef.on('child_changed', this.handleChildChanged);

        
    }

    handleChildAdded(data) {
        const newTask = data.val();
        newTask.id = data.key
        var newTasks = this.state.tasks.concat(newTask);
        this.setState({ tasks: newTasks })
    }


    handleChildChanged(data) {
        /* We fill the new data with the needed data */
        const newTask = data.val();
        newTask.id = data.key

        /* We create a copy of the array to be patched */
        var newTasks = this.state.tasks.concat([]);
        const index = newTasks.findIndex(task => task.id === data.key);

        /* We insert the new task in place */
        newTasks.splice(index, 1, newTask);

        /* We finally rewrite the array*/
        this.setState({ tasks: newTasks })
    }

    handleClick() {
        this.props.onAdd(this.state.value);
        this.setState({ value: "" });
    }


    render() {
        return (
            <div>
                <h2>To Do</h2>
                <h5>{this.props.user.email}</h5>
                <button className="btn btn-primary mb-2" type="button" onClick={() => firebase.auth().signOut()}>Logout</button>
                <AddForm saveForm = {this.saveForm}/>
                <TaskList tasks={this.state.tasks} onCheck={this.handleCheck} />
            </div>
        );
    }

    saveForm(text){
        
        /** if text is empty, don't do anything **/
        if (!text.length) {
            return;
        }
        /** We generate the new reference and then insert the new key **/
        const key = this.tasksRef.push().key;
        this.tasksRef.child(key).set({
            text: text,
            done: false,
        });
        
        
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleCheck(e) {        
        /** The parent has the id **/
        const parent = e.target.closest('.task');
        const taskRef = this.tasksRef.child(parent.id);
        taskRef.update({
            done: e.target.checked
        
        });
    }




    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(prevState => ({
            items: prevState.tasks.concat(newItem),
            text: ''
        }));
    }
}



function TaskList(props) {
    return (<ul>
        {props.tasks.map(task => (
            
            <Task key={task.id} id={task.id} text={task.text} onCheck={props.onCheck} done={task.done}/>
        ))}

    </ul>);
}

function Task(props) {
    
    return (
        
        <div className="task" id={props.id}>
            <input type="checkbox" className="form-check-input" checked={props.done} onChange={props.onCheck} id={`check-${props.id}`} />
            <label>{props.text}</label>
        </div>
    );
}

export default List;
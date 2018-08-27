import React from 'react';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            text: '',
        }
        this.makeEditable = this.makeEditable.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        this.inputRef = React.createRef();
    }

    handleInputChange(e) {
        this.setState({ text: e.target.value });
    }

    makeEditable(e) {
        e.preventDefault();
        this.setState({ editing: true, text: this.props.text });

    }

    handleCancel() {
        this.setState({ editing: false });
    }

    handleEdit() {
        this.props.onEdit(this.state.text, this.props.id);
        this.setState({ editing: false });

    }

    handleKeyUp(e) {
        if (e.keyCode === 13) this.handleEdit(e);
    }

    componentDidUpdate() {
        if (this.state.editing) {
            this.inputRef.current.focus();
        }
    }

    render() {
        if (this.state.editing) {
            return (
                <div className="task" id={this.props.id}>
                    <input ref={this.inputRef} type="text" id={`input-${this.props.id}`} value={this.state.text} onKeyUp={this.handleKeyUp} onChange={this.handleInputChange} />
                    <div className="button-bar"> <button type="button" onClick={this.handleCancel}>cancel</button>
                        <button type="button" onClick={this.handleEdit}>save</button></div>
                </div>
            );
        } else {
            return (
                <div className="task" id={this.props.id}>
                    <input type="checkbox" id={`check-${this.props.id}`} onChange={this.props.onCheck} checked={this.props.done} />
                    <label htmlFor={`check-${this.props.id}`}>{this.props.text}</label>
                    <div className="button-bar"> <button onClick={this.makeEditable}>edit</button> <button onClick={this.props.onDelete}>delete</button></div>
                </div>
            );
        }
    }

}

export default Task;
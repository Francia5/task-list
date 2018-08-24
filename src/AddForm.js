import React from "react";


class AddForm extends React.Component {

    constructor(props) {
        super(props);
        /** You need to store the value in the state **/
        this.state = {
            value: ""
        }

        /** Bind this */
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

   

    }

    render() {
        /** set value and onChange**/
        return (
            <div>
                <input onKeyUp={this.handleKeyUp}  type="text" value={this.state.value} onChange={this.handleChange} />
                <button type="button" onClick={this.handleClick}>Button</button>
            </div>
        );
    }

    handleChange(event) {
        /** Updates the value onChange**/
        this.setState({ value: event.target.value });
    }
    handleClick(e) {
        /* The value is stored in this.state.value, do something with it*/
        this.props.saveForm(this.state.value);
    }

    handleKeyUp(e) {
        if (e.keyCode === 13) this.handleClick();
    }

}

export default AddForm;
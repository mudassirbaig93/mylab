import React, { Component } from "react";

class Counter extends Component {
  state = {
    value: 0, // Instead of using local state, use props for controlled components - single source of truth
    tags: ["tag1", "tag2", "tag3"]
  };

  //   styles = {
  //     fontSize: 10,
  //     fontWeight: "bold"
  //   };
  styles = {};

  constructor(props) {
    super(props);
    //this.state.value = this.props.counter.value;
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  // Our custom fn just to test conditional rendering
  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags !</p>;
    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  // deprecated, using props handler now
  handleIncrement() {
    // value of this is defined how a method is being called..so in our case (referencing this method in Onclick) 'this' would be undefined.
    // so to use 'this' here, we need to use bind in our constructor
    // Another soultion is to use arrow functions instead as they inherit the this object.

    // Directly changing state.count variable won't change the view, so we need this
    this.setState({ value: this.state.value + 1 });
  }

  // deprecated, using props handler now
  handleDecrement = () => {
    if (this.state.value > 0) {
      this.setState({ value: this.state.value - 1 });
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-1">
          <span style={this.styles} className={this.getBadgeClasses()}>
            {this.formatCount()}
          </span>
        </div>
        <div className="col">
          <button
            onClick={() => {
              this.props.onIncrement(this.props.counter);
            }}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>

          <button
            onClick={() => {
              this.props.onDecrement(this.props.counter);
            }}
            className="btn btn-primary btn-sm m-2"
            disabled={this.props.counter.value === 0 ? "disabled" : ""}
          >
            -
          </button>

          <button
            onClick={() => {
              this.props.onDelete(this.props.counter.id);
            }}
            className="btn btn-danger btn-sm "
          >
            Delete
          </button>
        </div>

        {/*this.renderTags()*/}
      </div>
    ); // JSX expression
  }

  getBadgeClasses() {
    let classes = "badge m-2 ";
    classes +=
      this.props.counter.value === 0 ? "badge-warning" : "badge-primary";
    return classes;
  }

  formatCount() {
    const { value: count } = this.props.counter;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;

import { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="flex justify-center items-center  min-h-96">
        <div className="w-5 h-5 rounded-full bg-red-600 animate-ping"></div>
      </div>
    );
  }
}

export default Loader;

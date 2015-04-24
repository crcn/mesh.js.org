var React     = require("react");
var AceEditor = require("react-ace");

// tomorrow
module.exports = React.createClass({
  render: function() {
    return (
      <div className="ide">
        <ul className="nav">
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <AceEditor
          mode="java"
          theme="kuroir"
          height="100%"
          width="100%"
        />
      </div>
    );
  }
});

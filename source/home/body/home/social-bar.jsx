var React = require("react");

module.exports = React.createClass({
  componentDidMount: function() {

    if (!process.browser) return;

    $.ajax({
      dataType: "jsonp",
      url: "https://cdn.api.twitter.com/1/urls/count.json?url=http://mesh.mojojs.com",
      success: function(data) {
        this.setState({ followerCount: data.count });
      }.bind(this)
    });

    $.ajax({
      dataType: "jsonp",
      url: "https://api.github.com/repos/mojo-js/mesh.js",
      success: function(data) {
        this.setState({
          watcherCount : data.data.watchers,
          forkCount    : data.data.forks
        });
      }.bind(this)
    });

    $.ajax({
      dataType: "jsonp",
      url: "https://api.facebook.com/method/links.getStats?urls=mesh.mojojs.com&format=json",
      success: function(data) {
        this.setState({
          fbShareCount : data[0].share_count
        });
      }.bind(this)
    })
  },
  getInitialState: function() {
    return {
      followerCount: void 0,
      watcherCount: void 0,
      forkCount: void 0,
      tweetMessage: "Mesh.js - data synchronization library http://mesh.mojojs.com #meshjs"
    };
  },
  render: function() {
    return <div className="social-bar">
      <div className="content">
        <ul className="social-buttons ionic col-sm-12">
          <li>
            <a href="https://github.com/mojo-js/mesh.js" target="_blank">
              <i className="ion-social-github"></i> <span id="gh-stargazers"></span> {this.state.watcherCount} stars
            </a>
          </li>
          <li>
            <a href="https://github.com/mojo-js/mesh.js/network" target="_blank">
              <i className="ion-fork-repo"></i> <span id="gh-forks"></span> {this.state.forkCount} forks
            </a>
          </li>
          <li>
            <a href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent(this.state.tweetMessage) } target="_blank">
              <i className="ion-social-twitter"></i> <span id="tw-followers">{this.state.followerCount} tweets</span>
            </a>
          </li>
          <li>
            <a href={"http://www.facebook.com/sharer.php?s=100&p[title]="+encodeURIComponent("MeshJS - data synchronization library")+"&p[url]=mesh.mojojs.com&p[summary]="+encodeURIComponent("A universal, streamable interface for synchronizing data")+"&p[images][0]=http://mojo.meshjs.com/images/home/logo-shot.png"} target="_blank">
              <i className="ion-social-facebook"></i> <span id="tw-followers">{this.state.fbShareCount} shares</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  }
});

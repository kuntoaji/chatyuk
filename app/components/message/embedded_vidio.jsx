var React = require('react');
var EmbeddedVidio = React.createClass({
  render: function() {
    var style =  {
      width: '300px',
      height: '169px'
    };

    embed_url = this.props.src.replace(/watch/, 'embed');
    return <iframe style={style} src={embed_url} />
  }
});

module.exports = EmbeddedVidio;

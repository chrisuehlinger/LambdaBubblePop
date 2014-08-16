var Int = React.createClass({displayName: 'Int',
  mixins: [NodeMixins],
  render: function() {
    return React.DOM.span({className: 'int'}, [React.addons.CSSTransitionGroup({transitionName: 'bubble-animation', key: 'bubble-animation'}, this.currentAST().value)]);
  }
});



var Application = React.createClass({displayName: 'Application',
  mixins: [NodeMixins],
  isApplicable: function() {
    return this.props.lineState.index === this.props.lineState.lastIndex &&
           ASTTransformations.isApplicable(this.currentAST());
  },
  apply: _.throttle(function(event) {
    if (this.isApplicable()) {
      this.props.lineState.program.addLineByApplying(this.currentAST().id);
      event.stopPropagation();

      if(!this.props.lineState.program.state.isMuted){
        var poppingSounds = [ 'classic cartoon pop sound 2.wav', 
                              'object1-1-6.wav', 
                              'pop.wav', 
                              'pop1.wav', 
                              'pop2.wav' ].map(function(path){return 'audio/' + path;});
        var fileThisTime = poppingSounds[Math.floor(Math.random() * poppingSounds.length)];
        var soundThisTime = new Audio(fileThisTime);
        console.log(fileThisTime);
        soundThisTime.play();
      }
      
    }
  },500),
  highlight: function(e) {
    e.stopPropagation();
    if (this.isApplicable() && this.currentAST().id !== this.props.lineState.applicationHighlightId) {
      this.previousHighlightApplicationId = this.props.lineState.applicationHighlightId;
      this.props.lineState.program.highlightApplicationId(this.currentAST().id);
    }
  },
  unhighlight: function() {
    if (this.currentAST().id === this.props.lineState.applicationHighlightId) {
      this.props.lineState.program.highlightApplicationId(this.previousHighlightApplicationId);
    }
  },
  render: function() {
    var currentAST = this.currentAST();

    var funcAndArgs = _.flatten(currentAST.arguments.map((function(arg){
      return [Node({lineState: this.props.lineState, id: arg.id, key: arg.id}), (currentAST.functionName.infix ? '' : ' ')];
    }).bind(this)));
    funcAndArgs.pop(); // remove last whitespace

    if (currentAST.functionName.infix) {
      funcAndArgs.splice(1, 0, FunctionName({lineState: this.props.lineState, id: currentAST.functionName.id, key: currentAST.functionName.id}));
      funcAndArgs.splice(1, 0, ' ');
      funcAndArgs.splice(3, 0, ' ');
    } else {
      funcAndArgs.unshift(' ');
      funcAndArgs.unshift(FunctionName({lineState: this.props.lineState, id: currentAST.functionName.id, key: currentAST.functionName.id}));
    }

    var className = 'application';
    if (this.isApplicable() && this.currentAST().id === this.props.lineState.applicationHighlightId) {
      className += ' application-applicable';
    }
    if (this.props.lineState.highlightedLineIndex == this.props.lineState.index && this.currentAST().id === this.props.lineState.clickedComputationId) {
      className += ' application-highlight-clicked-computation';
    }

    return React.addons.CSSTransitionGroup({transitionName: 'bubble-animation', key: 'bubble-animation'},React.DOM.span({
        className: className,
        onClick: this.apply,
        onTouchStart: this.apply,
        onMouseEnter: this.highlight,
        onMouseMove: this.highlight,
        onMouseLeave: this.unhighlight,
        key: currentAST.id
      },  React.addons.CSSTransitionGroup({transitionName: 'bubble-animation', key: 'bubble-animation'},funcAndArgs)
    ));
  }
});

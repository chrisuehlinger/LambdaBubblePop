var HaskellJSProgram = React.createClass({displayName: 'HaskellJSProgram',
  getInitialState: function() {
    return {
      lines: [{ast: HaskellParser.parse(this.props.defaultValue), clickedComputationId: null}],
      applicationHighlightId: null,
      highlightedLineIndex: null,
      editingFirstLine: false,
      showHelpText: true,
      isMuted: false
    };
  },

  addLineByApplying: function(id) {
    var lines = _.cloneDeep(this.state.lines);

    lines[lines.length-1].clickedComputationId = id;

    var applyInfo = ASTTransformations.applyFunction(lines[lines.length-1].ast, id);

    lines.push({
      ast: applyInfo.ast,
      clickedComputationId: null,
      justComputedId: applyInfo.justComputedId
    });

    this.setState({lines: lines.slice(-1), showHelpText: false});
  },

  highlightApplicationId: function(id) {
    this.setState({applicationHighlightId: id});
  },

  highlightLine: function(index) {
    this.setState({highlightedLineIndex: index});
  },

  editFirstLine: function() {
    this.setState({editingFirstLine: true});
  },
  resetProgram: function(){
    this.setState(this.getInitialState());
  },
  toggleMute: function(){
    this.setState({isMuted:!this.state.isMuted});
  },
  /*clearProgram: function() {
    this.setState({
      lines: [this.state.lines[0]],
      applicationHighlightId: null,
      highlightedLineIndex: null,
      editingFirstLine: false,
      showHelpText: false
    });
  },*/

  updateInitialAST: function(id, subtree) {
    var newAST = ASTTransformations.replaceSubtree(this.state.lines[0].ast, id, subtree);

    this.setState({
      lines: [{ast: newAST, clickedComputationId: null}],
      applicationHighlightId: null,
      highlightedLineIndex: null,
      editingFirstLine: false,
      showHelpText: false
    });
  },

  render: function() {
    return Lines(_.extend({}, this.state, {program: this}));
  }
});

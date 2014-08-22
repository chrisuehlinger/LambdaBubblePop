HaskellParser = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart, functionDefinitionList: peg$parsefunctionDefinitionList },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = [],
        peg$c1 = peg$FAILED,
        peg$c2 = function(functionDefinition) { return functionDefinition; },
        peg$c3 = function(functionName, typeSignature, patterns) { return {
            name: functionName.name,
            englishName: functionName.name,
            typeSignature: typeSignature,
            patterns: patterns,
            isValidApplication: function(args) { 
              if(args.length !== typeSignature.length-1)
                return false;


             
              for(var i = 0; i < typeSignature.length-1; i++) {
                var thisType = typeSignature[i];
                var thisArg = args[i];
                var argType;

                if(thisArg.type === "application") {
                  argType = window.functions[thisArg.functionName.name].typeSignature.slice(-1);
                }else{
                  argType = window.astNodeTypes[thisArg.type].typeSignature || thisArg.type;
                }

                if(thisType.typeConstructor === null) {
                  if(thisType.type !== argType && !isGeneric(thisType.type))
                    return false;
                } else if(thisType.typeConstructor === "List") {
                  if(argType !== "[a]")
                    return false;
                } else if(thisType.typeConstructor === "App") {
                  if(argType !== "functionName")
                    return false;
                }
              }

              return true;
        }}; },
        peg$c4 = "::",
        peg$c5 = { type: "literal", value: "::", description: "\"::\"" },
        peg$c6 = function(typesig) { return typesig; },
        peg$c7 = null,
        peg$c8 = function(type, nextType) {return [type].concat(nextType || []);},
        peg$c9 = "->",
        peg$c10 = { type: "literal", value: "->", description: "\"->\"" },
        peg$c11 = "[",
        peg$c12 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c13 = /^[A-Za-z]/,
        peg$c14 = { type: "class", value: "[A-Za-z]", description: "[A-Za-z]" },
        peg$c15 = "]",
        peg$c16 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c17 = function(type) {return {typeConstructor:"List", type:type.join("")};},
        peg$c18 = "(",
        peg$c19 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c20 = ")",
        peg$c21 = { type: "literal", value: ")", description: "\")\"" },
        peg$c22 = function(application) { return {typeConstructor:"App", type:application};},
        peg$c23 = function(type) {return {typeConstructor:null, type:type.join("")};},
        peg$c24 = function(part) { return part; },
        peg$c25 = "=",
        peg$c26 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c27 = function(patternArguments, exp) { return {
            definitionLine: text(),
            numberOfArguments: patternArguments.length,
            doesMatch: function(args) {
              for (var i=0; i<patternArguments.length; i++) {
                if(patternArguments[i].doesMatch && !patternArguments[i].doesMatch(args[i])) return false;
              }
              return true;
            },
            apply: function(functionArguments) { return ASTTransformations.fillInArguments(exp, patternArguments, functionArguments); }
          }; },
        peg$c28 = function(pattern) { return pattern; },
        peg$c29 = function() { return {id: randomId(), type: "emptyListPattern", doesMatch: function(arg) { return arg.type === "list" && arg.items.length === 0; } }; },
        peg$c30 = ":",
        peg$c31 = { type: "literal", value: ":", description: "\":\"" },
        peg$c32 = function(left, right) { return {id: randomId(), type: "listPattern", left: left, right: right, doesMatch: function(arg) { return arg.type === "list" && arg.items.length > 0 } }; },
        peg$c33 = function(integer) { integer.doesMatch = function(arg) { return arg.type === "int" && arg.value === integer.value; }; return integer; },
        peg$c34 = function(exp) { return exp; },
        peg$c35 = function(f, args) {return {functionName: f, type: 'application', id: randomId(), arguments: args}},
        peg$c36 = function(left, f, right) { return {id: randomId(), functionName: f, type: "application", arguments: [left, right]}},
        peg$c37 = function(exp1, list) { list.unshift(exp1); return list; },
        peg$c38 = function(list) { return { id: randomId(), type: "list", items: list || [] }; },
        peg$c39 = ",",
        peg$c40 = { type: "literal", value: ",", description: "\",\"" },
        peg$c41 = function(letters) { return {id: randomId(), type: 'functionName', name: letters.join(""), infix: false}; },
        peg$c42 = "+",
        peg$c43 = { type: "literal", value: "+", description: "\"+\"" },
        peg$c44 = function() { return {id: randomId(), type: 'functionName', name: '+', infix: true}; },
        peg$c45 = "-",
        peg$c46 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c47 = function() { return {id: randomId(), type: 'functionName', name: '-', infix: true}; },
        peg$c48 = function() { return {id: randomId(), type: 'functionName', name: ':', infix: true}; },
        peg$c49 = /^[0-9]/,
        peg$c50 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c51 = function(digits) { return { id: randomId(), type: "int", value: parseInt(digits.join(""), 10)} ; },
        peg$c52 = " ",
        peg$c53 = { type: "literal", value: " ", description: "\" \"" },
        peg$c54 = /^[ \n]/,
        peg$c55 = { type: "class", value: "[ \\n]", description: "[ \\n]" },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parseexpressionWithFunction();

      return s0;
    }

    function peg$parsefunctionDefinitionList() {
      var s0, s1;

      s0 = [];
      s1 = peg$parsefunctionDefinitionPlusWhitespace();
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parsefunctionDefinitionPlusWhitespace();
      }

      return s0;
    }

    function peg$parsefunctionDefinitionPlusWhitespace() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsefunctionDefinition();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhitespace_newline();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsefunctionDefinition() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parsefunctionName();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsefunctionDefinitionTypeSignature();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsefunctionDefinitionPatternLine();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parsefunctionDefinitionPatternLine();
            }
          } else {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c3(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsefunctionDefinitionTypeSignature() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parsewhitespace();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c4) {
          s2 = peg$c4;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c5); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsewhitespace();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsetypeSignatureTypeList();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c6(s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsetypeSignatureTypeList() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsetypeSignatureType();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsearrow_typeSignatureType();
        if (s2 === peg$FAILED) {
          s2 = peg$c7;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c8(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsearrow_typeSignatureType() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsewhitespace();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c9) {
          s2 = peg$c9;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c10); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsewhitespace();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsetypeSignatureType();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsearrow_typeSignatureType();
              if (s5 === peg$FAILED) {
                s5 = peg$c7;
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c8(s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsetypeSignatureType() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c11;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c13.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c14); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c13.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c14); }
            }
          }
        } else {
          s2 = peg$c1;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 93) {
            s3 = peg$c15;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c16); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c17(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c18;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c19); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsetypeSignatureTypeList();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s3 = peg$c20;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c21); }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c22(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];
          if (peg$c13.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c14); }
          }
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              if (peg$c13.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c14); }
              }
            }
          } else {
            s1 = peg$c1;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c23(s1);
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsefunctionDefinitionPatternLine() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsewhitespace_newline();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsefunctionName();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsefunctionDefinitionPatternPartOfLine();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c24(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsefunctionDefinitionPatternPartOfLine() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsepatternWithWhitespace();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsepatternWithWhitespace();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhitespace();
        if (s2 === peg$FAILED) {
          s2 = peg$c7;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s3 = peg$c25;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c26); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhitespace();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseexpressionWithFunction();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c27(s1, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsepatternWithWhitespace() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsewhitespace();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepattern();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c28(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsepattern() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c11;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewhitespace();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewhitespace();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 93) {
            s3 = peg$c15;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c16); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c29();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c18;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c19); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsefunctionName();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 58) {
              s3 = peg$c30;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c31); }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parsefunctionName();
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 41) {
                  s5 = peg$c20;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c21); }
                }
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c32(s2, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parsefunctionName();
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseinteger();
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c33(s1);
            }
            s0 = s1;
          }
        }
      }

      return s0;
    }

    function peg$parseexpression() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c18;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c19); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhitespace();
        if (s2 === peg$FAILED) {
          s2 = peg$c7;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpressionWithFunction();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhitespace();
            if (s4 === peg$FAILED) {
              s4 = peg$c7;
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s5 = peg$c20;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c21); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c34(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parselist();
        if (s0 === peg$FAILED) {
          s0 = peg$parseinteger();
          if (s0 === peg$FAILED) {
            s0 = peg$parsefunctionName();
          }
        }
      }

      return s0;
    }

    function peg$parseexpressionWithFunction() {
      var s0;

      s0 = peg$parseinfixFunctionApplication();
      if (s0 === peg$FAILED) {
        s0 = peg$parsefunctionApplication();
        if (s0 === peg$FAILED) {
          s0 = peg$parseexpression();
        }
      }

      return s0;
    }

    function peg$parsefunctionApplication() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsefunctionName();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhitespace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression_list();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c35(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parseinfixFunctionApplication() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseexpression();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhitespace();
        if (s2 === peg$FAILED) {
          s2 = peg$c7;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseinfixFunctionName();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhitespace();
            if (s4 === peg$FAILED) {
              s4 = peg$c7;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseexpressionWithFunction();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c36(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parseexpression_list() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseexpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewhitespace_expression();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewhitespace_expression();
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c37(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsewhitespace_expression() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsewhitespace();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexpression();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c34(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parselist() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c11;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhitespace();
        if (s2 === peg$FAILED) {
          s2 = peg$c7;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecomma_expression_list();
          if (s3 === peg$FAILED) {
            s3 = peg$c7;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhitespace();
            if (s4 === peg$FAILED) {
              s4 = peg$c7;
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 93) {
                s5 = peg$c15;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c16); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c38(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsecomma_expression_list() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseexpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsecomma_expression();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsecomma_expression();
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c37(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsecomma_expression() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parsewhitespace();
      if (s1 === peg$FAILED) {
        s1 = peg$c7;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 44) {
          s2 = peg$c39;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c40); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsewhitespace();
          if (s3 === peg$FAILED) {
            s3 = peg$c7;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseexpression();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c34(s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsefunctionName() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c13.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c14); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c13.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c14); }
          }
        }
      } else {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c41(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseinfixFunctionName() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 43) {
        s1 = peg$c42;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c44();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c45;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c46); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c47();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 58) {
            s1 = peg$c30;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c31); }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c48();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseinteger() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c49.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c50); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c49.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c50); }
          }
        }
      } else {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c51(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsewhitespace() {
      var s0, s1;

      s0 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s1 = peg$c52;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c53); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (input.charCodeAt(peg$currPos) === 32) {
            s1 = peg$c52;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c53); }
          }
        }
      } else {
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsewhitespace_newline() {
      var s0, s1;

      s0 = [];
      if (peg$c54.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c55); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c54.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c55); }
          }
        }
      } else {
        s0 = peg$c1;
      }

      return s0;
    }


      function isGeneric(myType){
        for(var type in window.functions)
          if(window.functions.hasOwnProperty(type) && window.functions[type].typeSignature === myType)
            return false;

        return true;
      };
      function randomId() { return (window.uuid ? uuid.v4() : 'placeholder'); }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();

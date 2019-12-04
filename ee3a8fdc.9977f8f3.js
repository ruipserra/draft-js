(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{199:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return l}));n(210),n(211),n(207),n(212),n(213),n(214);var o=n(208);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var r={id:"advanced-topics-decorators",title:"Decorators"},c=[{value:"CompositeDecorator",id:"compositedecorator",children:[]},{value:"Decorator Components",id:"decorator-components",children:[{value:"Beyond CompositeDecorator",id:"beyond-compositedecorator",children:[]}]},{value:"Setting new decorators",id:"setting-new-decorators",children:[]}],i={rightToc:c},s="wrapper";function l(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["components"]);return Object(o.b)(s,a({},i,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Inline and block styles aren't the only kind of rich styling that we might\nwant to add to our editor. The Facebook comment input, for example, provides\nblue background highlights for mentions and hashtags."),Object(o.b)("p",null,'To support flexibility for custom rich text, Draft provides a "decorator"\nsystem. The ',Object(o.b)("a",a({parentName:"p"},{href:"https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/tweet"}),"tweet example"),"\noffers a live example of decorators in action."),Object(o.b)("h2",{id:"compositedecorator"},"CompositeDecorator"),Object(o.b)("p",null,"The decorator concept is based on scanning the contents of a given\n",Object(o.b)("a",a({parentName:"p"},{href:"/docs/api-reference-content-block"}),"ContentBlock"),"\nfor ranges of text that match a defined strategy, then rendering them\nwith a specified React component."),Object(o.b)("p",null,"You can use the ",Object(o.b)("inlineCode",{parentName:"p"},"CompositeDecorator")," class to define your desired\ndecorator behavior. This class allows you to supply multiple ",Object(o.b)("inlineCode",{parentName:"p"},"DraftDecorator"),"\nobjects, and will search through a block of text with each strategy in turn."),Object(o.b)("p",null,"Decorators are stored within the ",Object(o.b)("inlineCode",{parentName:"p"},"EditorState")," record. When creating a new\n",Object(o.b)("inlineCode",{parentName:"p"},"EditorState")," object, e.g. via ",Object(o.b)("inlineCode",{parentName:"p"},"EditorState.createEmpty()"),", a decorator may\noptionally be provided."),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Under the hood"),Object(o.b)("p",{parentName:"blockquote"},"When contents change in a Draft editor, the resulting ",Object(o.b)("inlineCode",{parentName:"p"},"EditorState")," object\nwill evaluate the new ",Object(o.b)("inlineCode",{parentName:"p"},"ContentState")," with its decorator, and identify ranges\nto be decorated. A complete tree of blocks, decorators, and inline styles is\nformed at this time, and serves as the basis for our rendered output."),Object(o.b)("p",{parentName:"blockquote"},"In this way, we always ensure that as contents change, rendered decorations\nare in sync with our ",Object(o.b)("inlineCode",{parentName:"p"},"EditorState"),".")),Object(o.b)("p",null,'In the "Tweet" editor example, for instance, we use a ',Object(o.b)("inlineCode",{parentName:"p"},"CompositeDecorator")," that\nsearches for @-handle strings as well as hashtag strings:"),Object(o.b)("pre",null,Object(o.b)("code",a({parentName:"pre"},{className:"language-js"}),"const compositeDecorator = new CompositeDecorator([\n  {\n    strategy: handleStrategy,\n    component: HandleSpan,\n  },\n  {\n    strategy: hashtagStrategy,\n    component: HashtagSpan,\n  },\n]);\n")),Object(o.b)("p",null,"This composite decorator will first scan a given block of text for @-handle\nmatches, then for hashtag matches."),Object(o.b)("pre",null,Object(o.b)("code",a({parentName:"pre"},{className:"language-js"}),"// Note: these aren't very good regexes, don't use them!\nconst HANDLE_REGEX = /\\@[\\w]+/g;\nconst HASHTAG_REGEX = /\\#[\\w\\u0590-\\u05ff]+/g;\n\nfunction handleStrategy(contentBlock, callback, contentState) {\n  findWithRegex(HANDLE_REGEX, contentBlock, callback);\n}\n\nfunction hashtagStrategy(contentBlock, callback, contentState) {\n  findWithRegex(HASHTAG_REGEX, contentBlock, callback);\n}\n\nfunction findWithRegex(regex, contentBlock, callback) {\n  const text = contentBlock.getText();\n  let matchArr, start;\n  while ((matchArr = regex.exec(text)) !== null) {\n    start = matchArr.index;\n    callback(start, start + matchArr[0].length);\n  }\n}\n")),Object(o.b)("p",null,"The strategy functions execute the provided callback with the ",Object(o.b)("inlineCode",{parentName:"p"},"start")," and\n",Object(o.b)("inlineCode",{parentName:"p"},"end")," values of the matching range of text."),Object(o.b)("h2",{id:"decorator-components"},"Decorator Components"),Object(o.b)("p",null,"For your decorated ranges of text, you must define a React component to use\nto render them. These tend to be plain ",Object(o.b)("inlineCode",{parentName:"p"},"span")," elements with CSS classes or\nstyles applied to them."),Object(o.b)("p",null,"In our current example, the ",Object(o.b)("inlineCode",{parentName:"p"},"CompositeDecorator")," object names ",Object(o.b)("inlineCode",{parentName:"p"},"HandleSpan")," and\n",Object(o.b)("inlineCode",{parentName:"p"},"HashtagSpan")," as the components to use for decoration. These are basic\nstateless components:"),Object(o.b)("pre",null,Object(o.b)("code",a({parentName:"pre"},{className:"language-js"}),"const HandleSpan = (props) => {\n  return <span {...props} style={styles.handle}>{props.children}</span>;\n};\n\nconst HashtagSpan = (props) => {\n  return <span {...props} style={styles.hashtag}>{props.children}</span>;\n};\n")),Object(o.b)("p",null,"The Decorator Component will receive various pieces of metadata in ",Object(o.b)("inlineCode",{parentName:"p"},"props"),",\nincluding a copy of the ",Object(o.b)("inlineCode",{parentName:"p"},"contentState"),", the ",Object(o.b)("inlineCode",{parentName:"p"},"entityKey")," if there is one, and the\n",Object(o.b)("inlineCode",{parentName:"p"},"blockKey"),". For a full list of props supplied to a Decorator Component see the\n",Object(o.b)("a",a({parentName:"p"},{href:"https://github.com/facebook/draft-js/blob/master/src/model/decorators/DraftDecorator.js"}),"DraftDecoratorComponentProps type"),"."),Object(o.b)("p",null,"Note that ",Object(o.b)("inlineCode",{parentName:"p"},"props.children")," is passed through to the rendered output. This is\ndone to ensure that the text is rendered within the decorated ",Object(o.b)("inlineCode",{parentName:"p"},"span"),"."),Object(o.b)("p",null,"You can use the same approach for links, as demonstrated in our\n",Object(o.b)("a",a({parentName:"p"},{href:"https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/link"}),"link example"),"."),Object(o.b)("h3",{id:"beyond-compositedecorator"},"Beyond CompositeDecorator"),Object(o.b)("p",null,"The decorator object supplied to an ",Object(o.b)("inlineCode",{parentName:"p"},"EditorState")," need only match the expectations\nof the\n",Object(o.b)("a",a({parentName:"p"},{href:"https://github.com/facebook/draft-js/blob/master/src/model/decorators/DraftDecoratorType.js"}),"DraftDecoratorType"),"\nFlow type definition, which means that you can create any decorator classes\nyou wish, as long as they match the expected type -- you are not bound by\n",Object(o.b)("inlineCode",{parentName:"p"},"CompositeDecorator"),"."),Object(o.b)("h2",{id:"setting-new-decorators"},"Setting new decorators"),Object(o.b)("p",null,"Further, it is acceptable to set a new ",Object(o.b)("inlineCode",{parentName:"p"},"decorator")," value on the ",Object(o.b)("inlineCode",{parentName:"p"},"EditorState"),"\non the fly, during normal state propagation, through immutable means."),Object(o.b)("p",null,"This means that during your app workflow, if your decorator becomes invalid or\nrequires a modification, you can create a new decorator object (or use\n",Object(o.b)("inlineCode",{parentName:"p"},"null")," to remove all decorations) and ",Object(o.b)("inlineCode",{parentName:"p"},"EditorState.set()")," to make use of the new\ndecorator setting."),Object(o.b)("p",null,"For example, if for some reason we wished to disable the creation of @-handle\ndecorations while the user interacts with the editor, it would be fine to do the\nfollowing:"),Object(o.b)("pre",null,Object(o.b)("code",a({parentName:"pre"},{className:"language-js"}),"function turnOffHandleDecorations(editorState) {\n  const onlyHashtags = new CompositeDecorator([{\n    strategy: hashtagStrategy,\n    component: HashtagSpan,\n  }]);\n  return EditorState.set(editorState, {decorator: onlyHashtags});\n}\n")),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"ContentState")," for this ",Object(o.b)("inlineCode",{parentName:"p"},"editorState")," will be re-evaluated with the new\ndecorator, and @-handle decorations will no longer be present in the next\nrender pass."),Object(o.b)("p",null,"Again, this remains memory-efficient due to data persistence across immutable\nobjects."))}l.isMDXComponent=!0}}]);
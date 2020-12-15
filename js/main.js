/*jshint esversion: 6 */
$("document").ready(function() {
  var libs = {};

  /* **************************************************************** */
  /* FRAMEWORKS LISTING ********************************************* */
  var frameworks = {
    "jQuery Compat (edge)": "http://code.jquery.com/jquery-git.js",
  };
  var frameworks_css = {
    "jQuery UI 1.10.3": "http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/css/base/jquery-ui.css",
  };
  /* **************************************************************** */
  /* MENUS TOGGLE *************************************************** */
	
	// Adds tiny carets downward to select lists.
  $(".dropdown-menu li a").click(function(event) {
    event.preventDefault();
    var dropdown = $(this).parents('.btn-group');
    var selText = $(this).text();
    dropdown.find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
	});

  /* **************************************************************** */
  /* ACE BIDING ***************************************************** */
  ace.require("ace/ext/language_tools");
  // ace.config.set('basePath', '/js/ace/'); // for ace-1.4.12.
	/*
	var currEditor;
	var setPad = function(ace,hookId,languageMode,theme){
		  currEditor = ace.edit(hookId);
			currEditor.setTheme("./js/ace/theme/"+theme)
			.getSession()
				.setMode("./js/ace/mode/"+languageMode)
			.setOptions({
				enableBasicAutocompletion: true,
				showPrintMargin: false
			});
			currEditor = null;
	};
	
	var htmlEditor = setPad(ace,'html-editor','html','crimson-editor');
	var cssEditor  = setPad(ace,'css-editor','css','crimson-editor');
	var jsEditor   = setPad(ace,'js-editor','javascript','crimson-editor');
	*/

	
  var htmlEditor = ace.edit("html-editor");
  htmlEditor.setTheme("ace/theme/crimson");
  htmlEditor.getSession().setMode("ace/mode/html");
	htmlEditor.setValue("<div><h2>King Robert</h2><p>Lived an happy life.</p></div>");
  htmlEditor.setOptions({
    enableBasicAutocompletion: true,
    showPrintMargin: false
  });

  var cssEditor = ace.edit("css-editor");
  cssEditor.setTheme("ace/theme/crimson-editor");
  cssEditor.getSession().setMode("ace/mode/css");
	cssEditor.setValue("h2 { color: green; }");
  cssEditor.setOptions({
    enableBasicAutocompletion: true,
    showPrintMargin: false
  });

  var jsEditor = ace.edit("js-editor");
  jsEditor.setTheme("ace/theme/crimson-editor");
  jsEditor.getSession().setMode("ace/mode/javascript");
	jsEditor.setValue("console.log('Hi there !')");
  jsEditor.setOptions({
    enableBasicAutocompletion: true,
    showPrintMargin: false
  });
	
  /* **************************************************************** */
  /* RUN ************************************************************ */
  $("#btnRun").click(function(event) {
    event.preventDefault();

    var previewDoc = window.frames[0].document;

    var css    = ace.edit( "css-editor").getSession().getValue();
    var script = ace.edit(  "js-editor").getSession().getValue();
    var html   = ace.edit("html-editor").getSession().getValue();

    previewDoc.write(`
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="utf-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1">
					<title>Made with ForkableJS</title>
					<style type='text/css'>`+css+`</style>
				</head>
				<body>`+html+`</body>
				<script type='text/javascript'>(function() {`+script+`})();</script>
			</html>
		`);
    previewDoc.close();
  });

  // Preview code on page load
  $("#btnRun").click();

  /* **************************************************************** */
  /* TIDYUP ********************************************************* */
  $("#btnTidyUp").click(function(event) {
    event.preventDefault();

    var html = ace.edit("html-editor").getSession().getValue();
    var html2 = style_html(html);
    ace.edit("html-editor").getSession().setValue(html2);

    var css = ace.edit("css-editor").getSession().getValue();
    var css2 = css_beautify(css);
    ace.edit("css-editor").getSession().setValue(css2);

    var js = ace.edit("js-editor").getSession().getValue();
    var js2 = js_beautify(js);
    ace.edit("js-editor").getSession().setValue(js2);
  });
	
	// Alternative :  CodeMirror
	// Minimal demo : https://jsfiddle.net/d3wehutq/3/
	// TidyUp : https://codemirror.net/2/demo/formatting.html

  /* **************************************************************** */
  /* TOGETHER JS **************************************************** */
  $("#btnTogether").click(function(event) {
    event.preventDefault();
    TogetherJS(this);
    return false;
  });

});

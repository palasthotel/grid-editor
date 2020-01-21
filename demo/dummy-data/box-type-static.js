module.exports = [
	{
		"style":null,
		"classes":[],
		"title":null,
		"titleurl":null,
		"readmore":null,
		"readmoreurl":null,
		"prolog":null,
		"epilog":null,
		"layout":null,
		"language":null,
		"id":null,
		"html":"<div class=\"grid-box-editmode\">\n\tVideo\n\t<\/div>\n",
		"type":"video",
		"content":{
			"url":"",
			"title":0,
			"related":0,
			"html":""
		},
		"contentstructure":[
			{
				"key":"url",
				"label":"Video-URL",
				"type":"text"
			},
			{
				"key":"title",
				"label":"Display title",
				"type":"checkbox"
			},
			{
				"key":"related",
				"label":"Display related videos at the end (YouTube)",
				"type":"checkbox"
			},
			{
				"key":"html",
				"type":"hidden"
			}
		]
	},
	{
		"style":null,
		"classes":[],
		"title":null,
		"titleurl":null,
		"readmore":null,
		"readmoreurl":null,
		"prolog":null,
		"epilog":null,
		"layout":null,
		"language":null,
		"id":null,
		"html":"<div class=\"grid-box-editmode\">\n\tSoundcloud\n\t<\/div>\n",
		"type":"soundcloud",
		"content":{
			"url":"",
			"color":"",
			"height":200
		},
		"contentstructure":[
			{
				"key":"url",
				"label":"URL",
				"type":"text"
			},
			{
				"key":"height",
				"label":"Height",
				"type":"number"
			},
			{
				"key":"color",
				"label":"Hex Color #[...] (optional)",
				"type":"text"
			}
		]
	},
	{"style":null,"classes":[],"title":null,"titleurl":null,"readmore":null,"readmoreurl":null,"prolog":null,"epilog":null,"layout":null,"language":null,"id":null,"html":"<div class=\"grid-box-editmode\">\n\tPlaintext<\/div>\n","type":"plaintext","content":{"plain":""},"contentstructure":[{"key":"plain","type":"textarea","label":"Plaintext"}]},{"style":null,"classes":[],"title":null,"titleurl":null,"readmore":null,"readmoreurl":null,"prolog":null,"epilog":null,"layout":null,"language":null,"id":null,"html":"\n<div class=\"grid-box-editmode\">\n\t<div class='content'>Media-Box<\/div><\/div>\n","type":"media","content":{"fileid":{"id":"","size":""},"url":"","fileinfo":" ","image_tag":"","image_url":"","image_mega_file":"","rendered_html":"Media-Box"},"contentstructure":[{"key":"fileid","type":"wp-mediaselect","label":"Image","media_type":"image"},{"key":"url","type":"text","label":"Hyperlink-URL (optional)"}]},{"style":null,"classes":[],"title":null,"titleurl":null,"readmore":null,"readmoreurl":null,"prolog":null,"epilog":null,"layout":null,"language":null,"id":null,"html":"<div class=\"grid-box-editmode\">\n\tStatic HTML-Content<\/div>\n","type":"wp_html","content":{"html":""},"contentstructure":[{"key":"html","label":"Text","type":"html"}]}];
var assert = require('assert');
	execSync = require('child_process').execSync;
	fs = require('fs');
//	fileName = '2016-05-19-template.md';
	commitRange = process.env['TRAVIS_COMMIT_RANGE'];

console.log(commitRange);

function GetModifedfiles (commitRange) {
	var cmd = "git diff --name-only"+" "+commitRange
	console.log(cmd);

	var stdout = execSync(cmd);
  	var lines = stdout.toString().split('\n');
	var result = {};

	for (var i = 0; i < lines.length; i += 1) {
		if (lines[i].indexOf(".md")>0) {
			result[lines[i]] = lines[i];
		}    	
  	}
  	return result;
}

	var ModifiedFilesArray = GetModifedfiles(commitRange);
	console.log(ModifiedFilesArray);
	console.log(Object.keys(ModifiedFilesArray).length);

describe("Check Files modified", function(){
	it("Nomber of modified files", function () {
		if (Object.keys(ModifiedFilesArray).length == 0)	{
			console.log("No files have been modified");			
		}
		else {
			console.log("Several files modified, verifying");
			for(var filePath in ModifiedFilesArray){
				var fileName = ModifiedFilesArray[filePath];
				console.log("Verifiyng file: " + fileName);
				describe("Check Front Matter", function(){
					var contents = fs.readFileSync(fileName, 'UTF8');
					it("Verify presence of tags", function () {
							
						//frontmatter = /---\s*([\s\S]*?)\s*---/
						frontmatter = /---\s*((layout: )+)([ \r\n\S]*?)((title: )+)([ \r\n\S]*?)((author: )+)([ \r\n\S]*?)((date: )+)([ \r\n\S]*?)((color: "blue")+)([ \r\n\S]*?)((excerpt: )+)([ \r\n\S]*?)\s*---/
						assert.ok (frontmatter.test(contents));

					});
				});
				
				describe("Content of the MD file", function(){
					var contents = fs.readFileSync(fileName, 'UTF8');
					it("Verify customer profile", function () {			
						pattern = /\s*((## [Cc]ustomer [Pp]rofile ##)+)([\s\S]*?)\s*/
						assert.ok (pattern.test(contents));
					});
					
					it("Verify conclusion", function () {
						pattern = /\s*((## [Cc]onclusion ##)+)([\s\S]*?)\s*/
						assert.ok (pattern.test(contents));

					});

					// 	it("Verify resources", function () {
					// 	pattern = /\s*((## [Rr]esources ##)+)([\s\S]*?)\s*/
					// 	assert.ok (pattern.test(contents));

					// });
				});
			}
		}

	});	
});





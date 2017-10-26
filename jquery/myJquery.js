var intervalEnabled = true;	
	var aktuellerIndexProfession = 0;
	var aktuellerIndexJsSkills = 0;
	var aktuellerIndexKnow = 0;
	var aktuellerIndexWrite = 0;
	var aktuellerIndexEmail = 0;
	var aktuellerIndexFacebook = 0;
	var mailHere;
		
	var profession = new Array("a graphic designer", "a conceptual designer", "a type designer", "a web designer", "an animal imitator", "an illustrator"); 
	var jsSkills = new Array("wanting to practise my javascript skills","wanting to amply use Arial on the web");
	var know = new Array("know more about me", "get in touch with me", "collaborate with me", "brighten up my day");
	var write = new Array("send me", "call me ");
	var email = new Array("an email ", "a letter ", "a present ");
	var facebook = new Array ("be my best friend on facebook.", "eat a sausage with me.", "have a look at my portfolio.");
	
	var a = "a\) ";
	var b = "b\) ";
	var ba = "ba\) ";
	var bcd = new Array ("b) ", "c) ", "d) ", "e) ", "f) ");
	var bbbc = new Array ("bb) ", "bc) ");
	/*var aProfessionAktuell;
	var aKnowAktuell;
	var aWriteAkutell;
	var aFacebookAktuell;*/
	
	
	var anzahlProfession = profession.length;
	var anzahlJsSkills = jsSkills.length;
	var anzahlKnow = know.length;
	var anzahlWrite = write.length;
	var anzahlEmail = email.length;
	var anzahlFacebook = facebook.length;
	
	var mainTimerInterval;
	
	//start the main timer, which changes the text every 4000 ms
	function startMainTimer() {
		mainTimerInterval = setInterval(function reset() {
			if ( !intervalEnabled )
				return; // relevant für start.click
			var randomProfession = Math.floor(Math.random()*anzahlProfession);
			var randomJsSkills = Math.floor(Math.random()*anzahlJsSkills);
			var randomKnow = Math.floor(Math.random()*anzahlKnow);
			var randomWrite = Math.floor(Math.random()*anzahlWrite);
			var randomEmail = Math.floor(Math.random()*anzahlEmail);
			var randomFacebook = Math.floor(Math.random()*anzahlFacebook);	
			
			//-----------------------------------------------------------------
			// ungewuenschte Kombinationen unterbinden -------------------------
			var emailIndexPresent = email.indexOf("a present ");
			var emailIndexLetter = email.indexOf("a letter ");
			var knowIndexKnowmore = know.indexOf("know more about me");
			var facebookIndexPortfolio = facebook.indexOf("have a look at my portfolio.");
			// Ausnahme brighten up my day + portfolio
			if ( randomKnow == know.indexOf("brighten up my day")) {
				var facebookCopy = facebook.slice(0);
				var newFacebook = facebookCopy.splice(facebookIndexPortfolio,1); 
				var newFacebookAnzahl = newFacebook.length;
				randomFacebook = Math.floor(Math.random()*newFacebookAnzahl); 
				$('#facebook').text(newFacebook[randomFacebook]);
			}
			// Ausnahme know more about me + letter/present
			if ( randomKnow == know.indexOf("know more about me")) {
				var emailCopy = email.slice(0);
				var newEmail = emailCopy.splice(emailIndexPresent,1); 
				var newEmail2 = newEmail.splice(emailIndexLetter,1); 
				var newEmail2Anzahl = newEmail2.length;
				randomEmail = Math.floor(Math.random()*newEmail2Anzahl); 
				$('#mail').text(newEmail2[randomEmail]);
			}
			// Ausnahme collaborate + present (funktioniert)
			if ( (randomKnow == know.indexOf("collaborate with me")) || (randomKnow == know.indexOf("get in touch with me")) ) {
				var emailCopy = email.slice(0); //email array kopieren
				var newEmail = emailCopy.splice(emailIndexPresent,1); 
				var newEmailAnzahl = newEmail.length;
				randomEmail = Math.floor(Math.random()*newEmailAnzahl); 
				$('#mail').text(newEmail[randomEmail]);
			}
			// Ausnahme call me + email/letter/present (funktioniert)
			var emptyText = "";
			if (randomWrite == write.indexOf("call me ")) {
				$('#mail').text(emptyText);
				}
			else $('#mail').text(email[randomEmail]);
			//-----------------------------------------------------------------			
			
			//-----------------------------------------------------------------
			// set html of span	-----------------------------------------------
			$('#profession').text(profession[randomProfession]);
			$('#jsSkills').text(jsSkills[randomJsSkills]);
			$('#know').text(know[randomKnow]);
			$('#write').text(write[randomWrite]);
			
			$('#facebook').text(facebook[randomFacebook]);
		
			aktuellerIndexProfession = randomProfession;
			aktuellerIndexJsSkills = randomJsSkills;
			aktuellerIndexKnow = randomKnow;
			aktuellerIndexWrite = randomWrite;
			aktuellerIndexEmail = randomEmail;
			aktuellerIndexFacebook = randomFacebook;

			
			}, 4000);
	}
	
	
	//stop the main timer
	function stopMainTimer() {
		clearInterval(mainTimerInterval);
	}
	
	//-----------------------------------------------------------------
	// O N   D O C   R E A D Y  ---------------------------------------
	$(document).ready(function() {
		//-----------------------------------------------------------------
		// hide text if "Go on" is clicked --------------------------------
			$("#uncollapsedText").hide();
			$("#start").hide();
			
			//start the main timer
			startMainTimer();
	//-----------------------------------------------------------------
	// C L I C K   O N   S T O P   I T --------------------------------
	$("#stop").click(function() {
	
		//stop the main timer
		stopMainTimer();
	
		//window.scrollTo(0,0);
		//$('html, body').css('scrollTop', 0); // scroll to top
		//$("#collapsedText").eq(0).scrollTop(0);
		intervalEnabled = false;
		window.communicate.drehungLaeuft = false;
		
		$("#stop").hide(); 
		$("#start").show(); 
		$("#collapsedText").hide();
		$("#uncollapsedText").show();
			
		//-----------------------------------------------------------------
		// profession mit richtiger Anordnung untereinander ---------------
		// profession erste Zeile
		var aProfessionAktuell = a + profession[aktuellerIndexProfession];
		$('#professionAktuell').text(aProfessionAktuell);
		// profession weitere Zeilen 
		var professionCopy = profession.slice(0); 
		professionCopy.splice($.inArray(profession[aktuellerIndexProfession], professionCopy), 1); // Array without professionAktuell
		var professionCopyBcd;
		var professionCopyBcd1 = new Array();
		for (var i=0;i<professionCopy.length;i++) { 
			professionCopyBcd = bcd[i] + professionCopy[i];
			professionCopyBcd1 += professionCopyBcd + '<br>';
		}
		$("#professionUncollapsed").html(professionCopyBcd1);
		//-----------------------------------------------------------------
		
		//-----------------------------------------------------------------
		// jsSkills mit richtiger Anordnung untereinander -----------------
		// jsSkills erste Zeile
		var aJsSkillsAktuell = a + jsSkills[aktuellerIndexJsSkills];
		$('#jsSkillsAktuell').text(aJsSkillsAktuell);
		// jsSkills weitere Zeilen 		
		var jsSkillsCopy = jsSkills.slice(0); 
		jsSkillsCopy.splice($.inArray(jsSkills[aktuellerIndexJsSkills], jsSkillsCopy), 1); // Array without jsSkillsAktuell
		var jsSkillsCopyBcd;
		var jsSkillsCopyBcd1 = new Array();
		for (var i=0;i<jsSkillsCopy.length;i++) { 
			jsSkillsCopyBcd = bcd[i] + jsSkillsCopy[i];
			jsSkillsCopyBcd1 += jsSkillsCopyBcd + '<br>';
		}
		$("#jsSkillsUncollapsed").html(jsSkillsCopyBcd1);
		//-----------------------------------------------------------------
		
		//-----------------------------------------------------------------
		// know mit richtiger Anordnung untereinander ---------------------
		// know erste Zeile
		var aKnowAktuell = a + know[aktuellerIndexKnow];
		$('#knowAktuell').text(aKnowAktuell); 
		// know weitere Zeilen
		var knowCopy = know.slice(0); 
		knowCopy.splice($.inArray(know[aktuellerIndexKnow], knowCopy), 1); // Array without writeAktuell
		var knowCopyBcd;
		var knowCopyBcd1 = new Array();
		for (var i=0;i<knowCopy.length;i++) { 
			knowCopyBcd = bcd[i] + knowCopy[i];
			knowCopyBcd1 += knowCopyBcd + '<br>';
		}
		$("#knowUncollapsed").html(knowCopyBcd1);
		//-----------------------------------------------------------------
		
		//-----------------------------------------------------------------
		// write mit richtiger Anordnung untereinander --------------------
		// write erste Zeile
		var aWriteAktuell = a + write[1]; // = "call me"
		$('#writeAktuell').text(aWriteAktuell);
		$('#writeAktuell').append('<a id="callHereLink" href="" ><span class = "arrow">&#8594;</span> here</a>');
		$('#callHereLink').click(function() {
				window.open('callHere.htm', '', 'width=500px, height=50px, top=200px, left=20px, scrollbars=yes, menubar=no, scrollbars=no, toolbar=no, titlebar= no');
				return false;
			});
		// write weitere Zeilen
		var bWriteAktuell = b + write[0]; // = "send me"
		$('#writeUncollapsedText').text(bWriteAktuell);
		//-----------------------------------------------------------------
		
		//-----------------------------------------------------------------
		// email mit richtiger Anordnung untereinander
		// email erste Zeile 
		var baEmailAktuell = ba + email[aktuellerIndexEmail];
		$('#mailAktuell').text(baEmailAktuell); 
		if (aktuellerIndexEmail == 0) { // Link bei "email"
			mailHere = $('#mailAktuell').append('<span id="mailHereLink1st1"><a href="" target= "_blank" ><span class = "arrow">&#8594;</span> here</a></span>');
			$('#mailHereLink1st1').click(function(){
				window.open('mailHere.htm', '',  'width=500px, height=50px, top=80px, left=150px, scrollbars=yes, menubar=no, scrollbars=no, toolbar=no, titlebar= no');
				return false;
			});
		}
		if (aktuellerIndexEmail == 1) { // Link bei "letter"
			mailHere = $('#mailAktuell').append('<span id=/"mailHereLink1st2/"><a href=/"/" target= /"_blank/" ><span class = "arrow">&#8594;</span> here</a></span>');
			$('#mailHereLink1st2').click(function(){
				window.open('letterHere.html', '',  'width=430px, height=300px, top=220px, left=30px, scrollbars=yes, menubar=no, scrollbars=no, toolbar=no, titlebar= no');
				return false;
			});
		}
		if (aktuellerIndexEmail == 2) { // Link bei "present"
			mailHere = $('#mailAktuell').append('<span id="mailHereLink1st3"><a href="" target= "_blank" ><span class = "arrow">&#8594;</span> here</a></span>');
			$('#mailHereLink1st3').click(function(){
				window.open('letterHere.html', '',  'width=430px, height=300px, top=400px, left=100px, scrollbars=yes, menubar=no, scrollbars=no, toolbar=no, titlebar= no');
				return false;
			});
		}
		// email weitere Zeilen
		var emailCopy = email.slice(0); 
		emailCopy.splice($.inArray(email[aktuellerIndexEmail], emailCopy), 1); // Array without emailAktuell
		var emailCopyBcd;
		var emailCopyBcd1 = new Array();
		for (var i=0;i<emailCopy.length;i++) { 
			if (i == emailCopy.indexOf("an email ")) {
				emailCopy[i] = "an email " + " <span id = 'LinkEmail1st'> <a href = '' target= '_blank' ><span class = 'arrow'>&#8594;</span> here</a></span>";
				}
			if (i == emailCopy.indexOf("a letter ")) {
				emailCopy[i] = "a letter " + " <span id = 'LinkEmail2nd'> <a href = '' target= '_blank' ><span class = 'arrow'>&#8594;</span> here</a></span>";
				}
			if (i == emailCopy.indexOf("a present ")) {
				emailCopy[i] = "a present " + " <span id = 'LinkEmail3rd'> <a href = '' target= '_blank' ><span class = 'arrow'>&#8594;</span> here</a></span>";
				}
			emailCopyBcd = bbbc[i] + emailCopy[i];
			emailCopyBcd1 += emailCopyBcd + '<br>';	
		}
		$("#mailUncollapsed").html(emailCopyBcd1);
		$('#LinkEmail1st a').click(function(){
			window.open('mailHere.htm', '', 'width=500px, height=150px, top=50px, left=150px, menubar=no, scrollbars=no, toolbar=no, titlebar=no');
			return false;
		});
		$('#LinkEmail2nd a').click(function(){
			window.open('letterHere.html', '', 'width=430px, height=300px, top=100px, left=550px, menubar=no, scrollbars=no, toolbar=no, titlebar=no');
			return false;
		});
		$('#LinkEmail3rd a').click(function(){
			window.open('letterHere.html', '', 'width=430px, height=300px, top=300px, left=300px, menubar=no, scrollbars=no, toolbar=no, titlebar=no');
			return false;
		});
	
		//-----------------------------------------------------------------
		
		//-----------------------------------------------------------------
		// facebook mit richtiger Anordnung untereinander -----------------
		// erste Zeile
		aFacebookAktuell = a + facebook[aktuellerIndexFacebook];
		if ( aktuellerIndexFacebook == facebook.indexOf("have a look at my portfolio.")) {
			var aFacebookAktuellHere = "have a look at my portfolio" + " <span id = 'LinkFacebook1st'> <a href = '' target= '_blank' ><span class = 'arrow'>&#8594;</span> here.</a></span>";
			$("#facebookAktuell").html(aFacebookAktuellHere);
			}
		else {
			$('#facebookAktuell').text(aFacebookAktuell);
			}
		$('#LinkFacebook1st').click(function(){
			window.open('Portfolio_AnnaLorenz_web.pdf');
			return false;
		});	
		// weitere Zeilen 
		var facebookCopy = facebook.slice(0); //facebook array kopieren
		facebookCopy.splice($.inArray(facebook[aktuellerIndexFacebook], facebookCopy), 1); // Array ohne facebookAktuell
		var facebookCopyBcd;
		var facebookCopyBcd1 = new Array();
		for (var i=0;i<facebookCopy.length;i++)
			{ 
				if (i == facebookCopy.indexOf("have a look at my portfolio."))
					{
					facebookCopy[i] = "have a look at my portfolio" + " <span id = 'LinkFacebook2nd'> <a href = '' target= '_blank' ><span class = 'arrow'>&#8594;</span> here.</a></span>";
					}
				facebookCopyBcd = bcd[i] + facebookCopy[i];
				facebookCopyBcd1 += facebookCopyBcd + '<br>';
			}	
		$("#facebookUncollapsed").html(facebookCopyBcd1);
		$('#LinkFacebook2nd').click(function(){
			window.open('Portfolio_AnnaLorenz_web.pdf');
			return false;
		});		
		//-----------------------------------------------------------------
		
		//-----------------------------------------------------------------
		// Imprint
		$('a#imprintlink').click(function(){
			window.open('imprint.html', '',  'width=850px, height=600px, top=100px, left=30px, scrollbars=yes, menubar=no, scrollbars=no, toolbar=no, titlebar= no');
			return false;
		});
		//-----------------------------------------------------------------
		$("#fix").show();
		$("#professionAktuell").show();
		$("#professionUncollapsed").show(); 
		$("#jsSkillsAktuell").show();
		$("#jsSkillsUncollapsed").show(); 
		$("#knowAktuell").show();
		$("#knowUncollapsed").show(); 
		$("#writeAktuell").show();
		$("#writeUncollapsed").show();
		$("#mailAktuell").show();
		$("#mailUncollapsed").show();
		$("#mailUncollapsed2").show();
		$("#facebookAktuell").show();
		$("#facebookUncollapsed").show();
		$("#imprint").show();
		return false; // damit der href Link nicht ausgeführt wird
	});
	
	//-----------------------------------------------------------------
	// C L I C K   O N   G O   O N ------------------------------------
	$("#start").click(function() {
	
		//start the main timer again
		startMainTimer();
	
		//$("#mailUncollapsed2").removeAttr("id").attr("id","mailUncollapsed"); //geänderte CSS Eigenschaft wieder rückgängig machen
		window.communicate.drehungLaeuft = true;
		$('body').css('scrollTop', 0); //scroll to top
		$("#stop").show(); 
		$("#start").hide(); 
		$("#collapsedText").show();
		$("#uncollapsedText").hide();
		
		$("#professionAktuell").hide();
		$("#jsSkillsAktuell").hide();
		$("#knowAktuell").hide();
		$("#writeAktuell").hide();
		$("#mailAktuell").hide();
		$("#facebookAktuell").hide();

		$("#professionUncollapsed").hide();
		$("#jsSkillsUncollapsed").hide();
		$("#knowUncollapsed").hide();
		$("#writeUncollapsed").hide();
		$("#mailUncollapsed").hide();
		$("#mailUncollapsed2").hide();
		$("#facebookUncollapsed").hide();
		$("#imprint").hide();
					
		intervalEnabled = true;

		return false;  // damit der href Link nicht ausgeführt wird	
		});
	//-----------------------------------------------------------------
	});	
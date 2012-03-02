/*
FNG UK National Insurance Number Generator and Validator v1.2
Copyright © 2009 Fake Name Generator <http://www.fakenamegenerator.com/>

FNG UK National Insurance Number Generator and Validator v1.2 by the Fake Name
Generator is licensed to you under a Creative Commons Attribution-Share Alike 
3.0 United States License.

For full license details, please visit:
http://www.fakenamegenerator.com/license.php
*/

// For more information on NINO, see:
// http://www.govtalk.gov.uk/gdsc/schemas/CitizenIdentificationTypes-v1-4.xsd

// Create a handy array function
Array.prototype.in_array = function ( obj ) {
	var len = this.length;
	for ( var x = 0 ; x <= len ; x++ ) {
		if ( this[x] == obj ) return true;
	}
	return false;
}

// Setup our groups
var group1 = '';
var group2 = '';
var group3 = '';
var group4 = '';
var group5 = '';
var randomArrayIndex = '';

// Some combinations are not allowed
var	notAllowed = new Array(
	'GB',
	'BG',
	'NK',
	'KN',
	'TN',
	'NT',
	'ZZ'
);

// Some letters can't be first and some can't be second
var firstAllowed = new Array(
	'A',
	'B',
	'C',
	'E',
	'G',
	'H',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'R',
	'S',
	'T',
	'W',
	'X',
	'Y',
	'Z'
);

var secondAllowed = new Array(
	'A',
	'B',
	'C',
	'E',
	'G',
	'H',
	'J',
	'K',
	'L',
	'M',
	'N',
	'P',
	'R',
	'S',
	'T',
	'W',
	'X',
	'Y',
	'Z'
);

// Only certain characters can show up last
var lastAllowed = new Array(
	'A',
	'B',
	'C',
	'D',
	''
);

function generateNINO( style ) {
	// Set a default value for style and make sure it is valid
	var style = (style == null) ? 1 : style;

	if( style < 1 || style > 2 ) {
		style = 1;
	}

	// Generate group1
	while( group1 == '' || notAllowed.in_array(group1) ) {
		// First letter
		randomArrayIndex = Math.floor(Math.random() * firstAllowed.length);
		group1 = firstAllowed[ randomArrayIndex ];
	
		// Second letter
		randomArrayIndex = Math.floor(Math.random() * secondAllowed.length);
		group1 = group1 + secondAllowed[ randomArrayIndex ];
	}

	// Generate group2
	group2 = ''+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);

	// Generate group3
	group3 = ''+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);

	// Generate group4
	group4 = ''+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);

	// Generate group5
	randomArrayIndex = Math.floor(Math.random() * lastAllowed.length);
	group5 = lastAllowed[ randomArrayIndex ];

	if( style == 1 ){
		var final = group1+group2+group3+group4+group5;
	} else {
		var final = group1+" "+group2+" "+group3+" "+group4;
		if( group5 != '' ){
			final = final + " " + group5;
		}
	}
	
	return final;
}

function validateNINO ( nino ) {
	var regex = /^[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z] ?[0-9]{2} ?[0-9]{2} ?[0-9]{2} ?[ABCD]?/;

	if (nino.match(regex)) {
		regex = /^(GB)|^(BG)|^(NK)|^(KN)|^(TN)|^(NT)|^(ZZ)/;
		if ( !nino.match(regex) ) {
			return true;
		}
	}

	return false;
}

/* Example usage */

// document.write( generateNINO(2) );
//document.write( validateNINO ('AA123456D') );
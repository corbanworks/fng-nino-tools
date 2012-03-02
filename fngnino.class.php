<?php

/*
FNG UK National Insurance Number Generator and Validator v1.2
Copyright © 2009 Fake Name Generator <http://www.fakenamegenerator.com/>

FNG UK National Insurance Number Generator and Validator v1.2 by the Fake Name
Generator is licensed to you under a Creative Commons Attribution-Share Alike 
3.0 United States License.

For full license details, please visit:
http://www.fakenamegenerator.com/license.php

*/

class fngnino{

	// For more information on NINO, see:
	// http://www.govtalk.gov.uk/gdsc/schemas/CitizenIdentificationTypes-v1-4.xsd

	// Generate a NINO
	// Style determines how the number is formatted
	// 1: AB123456D
	// 2: AB 12 34 56 D
	function generateNINO($style = 1){
		// Sanity check: is this a valid state?
		if(!is_numeric($style) || $style < 1 || $style > 2){
			$style = 1;
		}

		// Group1: AB
			// Some combinations are not allowed
			$notAllowed = array('GB','BG','NK','KN','TN','NT','ZZ');
			
			// Some letters can't be first and some can't be second
			$firstAllowed = array('A','B','C','E','G','H','J','K','L','M','N','O','P','R','S','T','W','X','Y','Z');
			$secondAllowed = array('A','B','C','E','G','H','J','K','L','M','N','P','R','S','T','W','X','Y','Z');

			// Keep generating until we get a permitted group
			while(in_array($group1,$notAllowed) || !isset($group1)){
				$group1 = $firstAllowed[mt_rand(0,count($firstAllowed)-1)].$secondAllowed[mt_rand(0,count($secondAllowed)-1)];
			}
			
		// Group2: 12
			$group2 = sprintf("%02s",mt_rand(0,99));
		
		// Group3: 34
			$group3 = sprintf("%02s",mt_rand(0,99));
		
		// Group4: 56
			$group4 = sprintf("%02s",mt_rand(0,99));
		
		// Group5: D
			$lastAllowed = array('A','B','C','D','');
			$group5 = $lastAllowed[mt_rand(0,count($lastAllowed)-1)];

		// Combine it all together
		// We use a switch instead of an if-then-else because we might add more styles later
			switch($style){
				case 1:
					$nino = $group1.$group2.$group3.$group4.$group5;
					break;
				case 2:
					$nino = trim($group1.' '.$group2.' '.$group3.' '.$group4.' '.$group5);
					break;
			}

		return $nino;
	}
}

/* Example usage: */

/*
// Generate a NINO

$fngnino = new fngnino();

echo $fngnino->generateNINO(2);
*/


?>
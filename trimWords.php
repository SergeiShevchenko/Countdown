<?php
    $aResult = array();

    if( !isset($_GET['functionname']) ) {
    	 $aResult['error'] = 'No function name!'; 
	}

    if( !isset($aResult['error']) ) {

        switch($_GET['functionname']) {
            case 'trim':
			{
					$lines = file('wordsEn.txt');					
					$myfile = fopen("testfile.txt", "w");
					
					echo "Opened a file\n";
					while (list($key, $line) = each($lines)) {	
						$line = trim($line, "\n\r\t" );	
						
						if (strlen($line)<=9)
						{
							$line.='#'.alphabetize($line)."\n\r";
							fwrite($myfile, $line);
						}										   
					}
					echo "Processed a file";
               }
               break;
			case 'biggest':
			{
				$lines = file('wordsEn.txt');
				
				$search = $_GET['letters'];
				
				//echo $search."\n";
				
				$lets = countTheLetters($search);
				
				
				
				$okay = array();
				
				while (list($key, $line) = each($lines)) {	
						$line = trim($line, "\n\r\t" );	
						
						//list($word, $alpha) = split('#', $line);
						
						$letsDic = countTheLetters($line);
						
						$good = true;
						
						for ($i=0; $i<count($lets); $i++)
						{
							if ($lets[$i]<$letsDic[$i])
							{
								$good = false;
								//echo "Word " . $line . " is out cause of index " .$i ."\n";
								break;
							}
						}	
						if ($good)
							$okay[] = $line;								   
					}	
				
				usort($okay,'sortLen');				
				
				echo $okay[0].", ".$okay[1]." or ".$okay[2];
			} 
			break;
            default:
               $aResult['error'] = 'Not found function '.$_GET['functionname'].'!';
               break;
        }

    }

	function sortLen($a,$b){
	    return strlen($b)-strlen($a);
	}

    function alphabetize($str)
	{
		$stringParts = str_split($str);
		sort($stringParts);
		return implode('', $stringParts);
	}
	
	function countTheLetters($str)
	{
		
		$n = 26;
		for ($i=0;$i<$n;$i++)
		{
			$arr[$i] = 0;
		}
		
		for ($i=0; $i<strlen($str); $i++)
		{
			//echo $str{$i} . ' ' . ord($str{$i}) . "\n";
			$letterNumber = ord($str{$i})-ord('a');
			$arr[$letterNumber]++;
		}
		
		//echo $str . " " . implode('',$arr) . "\n";
		
		return $arr;
	}

?>
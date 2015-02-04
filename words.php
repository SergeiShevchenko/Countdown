<?php
    $aResult = array();

    if( !isset($_GET['functionname']) ) {
    	 $aResult['error'] = 'No function name!'; 
	}

	
    if( !isset($_GET['arguments']) ) 
    {
    	 $aResult['error'] = 'No function arguments!'; 
		 //echo "NO ARGUMENTS";
	}
	

    if( !isset($aResult['error']) ) {

        switch($_GET['functionname']) {
            case 'is':
			{
                    $search      =	$_GET['arguments'];
					$lines       = file('wordsEn.txt');
					$line_number = false;
					//echo "GOT AN ARGUMENT " . $search;
					while (list($key, $line) = each($lines)) {	
						$line = trim($line, "\n\r\t" );	
						//echo $line . ' ' . $search . ' ' . strcmp($line,$search);					
						if (strcmp((string)$line,(string)$search)==0)
						{
							$line_number=true;
							//echo "FOUND";
							break;
						}					   
					}
					//echo "LINE NUMBER " . $line_number;
					if (!$line_number)
						echo "no";
					else 
						echo "yes";
               }
               break;

            default:
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }

    }

    

?>
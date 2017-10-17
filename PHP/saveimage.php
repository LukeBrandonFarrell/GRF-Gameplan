<?php
    session_start();
    
    if (isset($_POST['data']))
    {
      // Get the data
      $imageData=$_POST['data'];

      // Remove the headers (data:,) part.
      // A real application should use them according to needs such as to check image type
      $filteredData=substr($imageData, strpos($imageData, ",")+1);

      // Need to decode before saving since the data we received is already base64 encoded
      $encodedData = str_replace(' ','+',$filteredData);
      $unencodedData=base64_decode($encodedData);

      // Save file. This example uses a hard coded filename for testing,
      // but a real application can specify filename in POST variable
      $str = $_SESSION["newimage"];
      $name = '../Images/GENERATED/' . $str . '.png';
      
      $fp = fopen($name , 'wb' );
      fwrite( $fp, $unencodedData);
      fclose( $fp );
        
      echo $_SESSION["newimage"];
    }
?>
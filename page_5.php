<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <title>Share Team</title>
        <link href="style.css" rel="stylesheet" type="text/css">
    </head>
    
    <body id="p_5">
        <div id="all">
            <img src="Images/GENERATED/<?php echo $_GET["image"]; ?>.png" alt="pitch" class="generated"><br>
            
            <a href="Images/GENERATED/<?php echo $_GET["image"]; ?>.png" download="formation.jpg">
                <div id="save_btn" class="button">SAVE</div>
            </a>
            
            <div id="social">
                <p>Share this fomation with your friends.</p>
                <a href="https://www.facebook.com/sharer/sharer.php?u=http://www.teamgrassroots.co.uk/HTML_Prototype/Images/GENERATED/<?php echo $_GET["image"]; ?>.png" target="_blank" rel="noopener">
                    <img src="Images/facebook.png" alt="facebook" width="38" height="38">
                </a>
                
                 <a href="https://twitter.com/share?url=http://www.teamgrassroots.co.uk/HTML_Prototype/Images/GENERATED/<?php echo $_GET["image"]; ?>.png" target="_blank">
                <img src="Images/twitter.png" alt="twitter" width="38" height="38">
                </a>
            </div>
            
            <a href="index"><p class="back_btn start_over">START OVER</p></a>
        </div>
    </body>
</html>
<?php 
    session_start();
	date_default_timezone_set('Europe/London');
    $_SESSION["newimage"] = str_replace(':', '-', str_replace(' ', '-', strval (date("d-m-Y h:i:s")))) . "-" . strval (microtime(true)); 
?>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <title>Arrange Team</title>
        <link href="style.css" rel="stylesheet" type="text/css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script type="text/javascript">
            //GET VARIABALES
            var players = <?php echo $_GET['players']; ?>;
            var subs = <?php echo $_GET['subs']; ?>;
            var playernames = [];
            var subnames = [];
            
            <?php 
                for($n=0; $n<count($_GET['playername']); $n++){
            ?>
                    playernames.push("<?php echo $_GET['playername'][$n]; ?>");
            <?php
                }
            ?>;
            
            <?php 
                for($s=0; $s<count($_GET['subname']); $s++){
            ?>
                    subnames.push("<?php echo $_GET['subname'][$s]; ?>");
            <?php
                }
            ?>;
            
            //MATCH DETAILS
            <?php if(!empty($_GET['match_time'])){ ?>
                var match_time = "<?php echo $_GET['match_time']; ?>";
            <?php } ?>
            <?php if(!empty($_GET['match_loc'])){ ?>
                var match_loc = "<?php echo $_GET['match_loc']; ?>";
            <?php } ?>
            <?php if(!empty($_GET['match_teams'])){ ?>
                var match_teams = "<?php echo $_GET['match_teams']; ?>";
            <?php } ?>
        </script>
        <script type="text/javascript" src="JS/pitch.js"></script>
    </head>
    
    <body id="p_4">
        <div id="all">
            <h2 class="title"><?php echo $_GET['team']; ?></h2>
            <p class="inst">Arrange your team</p>
            
            <canvas id="canvas" width="400" height="800"></canvas>
            
            <form id="create_image" onsubmit="return CaptureCanvas()">
                <div class="checkbox">
                    <label for="show_names">show names</label>
                    <input type="checkbox" id="show_names">
                </div>
                <input id="real_fixture" type="button" value="MAKE THIS A REAL FIXTURE" style="margin-bottom:6px;">
                <div id="match_details" style="display:none;">
                    <h3 class="sub_title">Match Details</h3>
                    <p>Real match formation? If not, leave blank</p>
                    <label>Kick off time:</label><br>
                    <input name="match_time" type="text" placeholder="5:00pm, 22nd of Feb" maxlength="25"><br>
                    <label>Location:</label><br>
                    <input name="match_loc" type="text" placeholder="ABC Sports Ground" maxlength="25"><br>
                    <label>Teams:</label><br>
                    <input name="match_teams" type="text" placeholder="ABC Juniors vs XYZ JFC" maxlength="25">
                </div>
                <input type="submit" value="CREATE"><br>
            </form>
        </div>
    </body>
</html>
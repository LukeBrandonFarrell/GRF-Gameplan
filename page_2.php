<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <title>Name Team</title>
        <link href="style.css" rel="stylesheet" type="text/css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script type="text/javascript">
            function validateForm(){
                var teamname = $("input[name='team']").val();
                
                if(teamname.length <= 0){
                    $("#error").show();
                    $("#error p").text("Please enter a team name.");
                    return false;
                }
                
                return true;
            }
        </script>
    </head>
    
    <body id="p_2">
        <div id="all">
            <form id="teamname" action="page_3" method="get" onsubmit="return validateForm()">
                <label>Team Name:</label><br>
                <input name="team" type="text" placeholder="Team Grassroots" maxlength="20"><br>
                <input name="players" type="hidden" value="<?php echo $_GET['p']; ?>">
                <input type="submit" value="NEXT">
                <div id="error"><div class="icon"></div><div class="text"><p></p></div></div>
                <a href="index"><p class="back_btn">BACK</p></a>
            </form>
        </div>
    </body>
</html>
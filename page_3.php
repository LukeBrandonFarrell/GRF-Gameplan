<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <title>Match Details</title>
        <link href="style.css" rel="stylesheet" type="text/css">
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script type="text/javascript">
            var substitute_i = 0;
            
            $(document).ready(function(){
                $("#add_substitute").click(function(){
                    if(substitute_i < 9){ //Can't have more than 8 substitutes
                        $("#substitutes_box").append("<label>Sub " + (substitute_i + 1) + ":</label><input id='s" + substitute_i + "' name='subname[]' type='text' maxlength='20'>");
                        substitute_i = substitute_i + 1;
                        $("#subs_amount").val(substitute_i);
                    }else{
                        //Max substitutes
                    }
                });
            });
            
            function validateForm(){
                var players = <?php echo $_GET['players']; ?>;
                var subs = substitute_i;

                for(var p=0; p<players; p++){
                    var input = $("#p" + p).val();

                    if(input.length <= 0){
                        $("#error").show();
                        $("#error p").text("Please give all players a name.");
                        return false;
                    }
                }

                for(var s=0; s<subs; s++){
                    var inputS = $("#s" + s).val();

                    if(inputS.length <= 0){
                        substitute_i = substitute_i - 1;
                        $("#subs_amount").val(substitute_i);
                    }
                }

                return true;
            }
        </script>
    </head>
    
    <body id="p_3">
        <div id="all">
            <form id="matchdetails" method="get" action="page_4" onsubmit="return validateForm()">
                <h2 class="title"><?php echo $_GET['team']; ?></h2>
                
                <p class="inst">Name your players</p>
                
                <?php 
                    for($i=0; $i<intval($_GET['players']); $i++){
                ?>
                        <label>Player <?php echo $i + 1; ?></label><br>
                        <input id="p<?php echo $i; ?>" name="playername[]" type="text" maxlength="20"><br>
                <?php
                    }
                ?>
                <div id="error"><div class="icon"></div><div class="text"><p></p></div></div>
                <?php if(intval($_GET['players']) == 5){ ?>
                    <a href="page_3?team=<?php echo $_GET['team']; ?>&players=4" id="switch_btn"><div class="button">Change to 4-A-Side</div></a>
                <?php }else if(intval($_GET['players']) == 4){ ?>
                    <a href="page_3?team=<?php echo $_GET['team']; ?>&players=5" id="switch_btn"><div class="button">Change to 5-A-Side</div></a>
                <?php } ?>
                
                <h3 class="sub_title">Substitutes</h3>
                <input id="add_substitute" type="button" value="Add Substitute"><br>
                <div id="substitutes_box"></div><br>
                
                <input name="team" type="hidden" value="<?php echo $_GET['team']; ?>">
                <input name="players" type="hidden" value="<?php echo $_GET['players']; ?>">
                <input name="subs" id="subs_amount" type="hidden" value="0">
                
                <input type="submit" value="NEXT"><br>
                <a href="page_2?p=<?php echo $_GET['players']; ?>"><p class="back_btn">BACK</p></a>
            </form>
        </div>
    </body>
</html>
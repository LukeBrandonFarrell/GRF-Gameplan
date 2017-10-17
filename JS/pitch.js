(function($) {  
    $.fn.extend({  
        //Let the user resize the canvas to the size he/she wants  
        resizeCanvas:  function(w, h) {  
            var c = $(this)[0]  
            c.width = w;  
            c.height = h  
        }  
    })  
})(jQuery)

function CaptureCanvas(){
    var canv = document.getElementById("canvas");
    var dataURL = canv.toDataURL("image/png");

    $.post("PHP/saveimage", {
        data: dataURL,
    }, function(url){
        window.location.href = "page_5?image=" + url;
    });

    return false;
}

$(document).ready(function(){
        //CANVAS VARIABLES
        var canvas = $("#canvas");
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");

        var cWidth = c.width;
        var cHeight = c.height;
    
        var isMobile = false;
        //-----------------
                
        //MATCH VARIABLES
        var football_pitch = new Image();

        var football_players = new Array();
        var football_subs = new Array();
    
        var shownames = true;
        var show_match_details = false;
        //-----------------
    
        //COORDINATE VARIBALES
        var match_details_base_y = 0;
        var subs_base_y = 0;
        //-----------------
    
        //DRAG VARIABLES
        var mouseX = 0,
            mouseY = 0;
        var mousePressed = false;
        var dragging = false;
        var dragsize = 40;
        var canPreventDefault = false;
    
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            dragsize = 40;
            isMobile = true;
        }
    
        canvas.mousemove(function(e) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        });
    
        $(document).mousedown(function() {
            mousePressed = true;
        }).mouseup(function() {
            mousePressed = false;
            dragging = false;
        });
    
        c.addEventListener("touchmove", function (e) {
            mouseX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
            mouseY = e.touches[0].pageY - e.touches[0].target.offsetTop;
        }, false);
    
        document.body.addEventListener("touchstart", function (e) {
            mouseX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
            mouseY = e.touches[0].pageY - e.touches[0].target.offsetTop;
            mousePressed = true;
        }, false);
        document.body.addEventListener("touchend", function (e) {
            mousePressed = false;
            dragging = false;
        }, false);
    
        document.body.addEventListener("touchstart", function (e) {
          if (e.target == c && canPreventDefault) {
            e.preventDefault();
          }
        }, false);
        document.body.addEventListener("touchend", function (e) {
          if (e.target == c && canPreventDefault) {
            e.preventDefault();
          }
        }, false);
        document.body.addEventListener("touchmove", function (e) {
          if (e.target == c && canPreventDefault) {
            e.preventDefault();
          }
        }, false);
        //-----------------
    
    
        //EVENTS
        $("#show_names").prop('checked', true);
        $("#show_names").change(function(){
            if($('#show_names:checked').length > 0){
                shownames = true;
            }else{
                shownames = false;
            }
        });
    
        $("#real_fixture").click(function(){
            $("#match_details").toggle();
            show_match_details = !show_match_details;
            loadPitch();
            
            if(show_match_details){
                $(this).val("REMOVE FIXTURE");
            }else{
                $(this).val("MAKE THIS A REAL FIXTURE");
            }
        });
    
        $("input[name=match_time]").on('input',function(e){
            match_time = $(this).val();
            loadPitch();
        });
        $("input[name=match_loc]").on('input',function(e){
            match_loc = $(this).val();
            loadPitch();
        });
        $("input[name=match_teams]").on('input',function(e){
            match_teams = $(this).val();
            loadPitch();
        });
        //-----------------
    
        //INIT
        createPlayers();     
    
        //LOOP
        var loop = setInterval(function() {
            ctx.clearRect(0, 0, cWidth, cHeight);
            ctx.drawImage(football_pitch, 0, 0, cWidth, cHeight);
            ctx.fillStyle = "black";
            ctx.font = "14px sans-serif";
            
            //Football Players
            for(var i=0; i<football_players.length; i++){
                football_players[i].update();
            }
            
            //Football Subs
            for(var j=0; j<football_subs.length; j++){
                football_subs[j].update();
            }
            
            //Text
            if(shownames){
                for(var x=0; x<playernames.length; x++){
                    var x_adjust = ctx.measureText(playernames[x]).width;
                    ctx.fillText(playernames[x], (football_players[x].x + football_players[x].w/2) - (x_adjust/2), football_players[x].y + (football_players[x].h + 15));   
                }

                for(var x=0; x<subnames.length; x++){
                    var x_adjust = ctx.measureText(subnames[x]).width;
                    ctx.fillText(subnames[x], (football_subs[x].x + football_subs[x].w/2) - (x_adjust/2), football_subs[x].y + (football_subs[x].h + 15));   
                }
            }
            
            //Match Details
            ctx.fillStyle = "#e2e2e2";
            ctx.font = "16px sans-serif";
            var match_details_y = [0, 26, 52]; 
            if(subs == 0){match_details_y = [0, 23, 46];}
            if(canvas.width() <= 350){ctx.font = "13px sans-serif"; match_details_y = [0, 20, 40];}
            var match_details_y_count = 0;

            if (!(typeof match_time === 'undefined' || match_time === null)) { 
                ctx.fillText("Kick-off time: " + match_time, 10, match_details_y[match_details_y_count] + match_details_base_y);
                match_details_y_count = match_details_y_count + 1;
            }
            if (!(typeof match_loc === 'undefined' || match_loc === null)) { 
                ctx.fillText("Location: " + match_loc, 10, match_details_y[match_details_y_count] + match_details_base_y); 
                match_details_y_count = match_details_y_count + 1;
            }
            if (!(typeof match_teams === 'undefined' || match_teams === null)) { 
                ctx.fillText("Teams: " + match_teams, 10, match_details_y[match_details_y_count] + match_details_base_y);
                match_details_y_count = match_details_y_count + 1;
            }
        }, 30);
        //-----------------
    
        function createPlayers(){
            loadPitch();
            
            //DEFAULT FORMATION
            var formation = [];
            var adjustedWidth = (cWidth/2) - 17.5;
            
            if(players == 4){
                formation.push({x: adjustedWidth, y: (canvas.height()/16)}); //Goalkeeper
                formation.push({x: adjustedWidth - (canvas.width()/4), y: (canvas.height()/4.5)});
                formation.push({x: adjustedWidth + (canvas.width()/4), y: (canvas.height()/4.5)});
                formation.push({x: adjustedWidth, y: (canvas.height()/2.2)});
            }else if(players == 5){
                formation.push({x: adjustedWidth, y: (canvas.height()/16)}); //Goalkeeper
                formation.push({x: adjustedWidth, y: (canvas.height()/4.5)});
                formation.push({x: adjustedWidth - (canvas.width()/4), y: (canvas.height()/2.2)});
                formation.push({x: adjustedWidth + (canvas.width()/4), y: (canvas.height()/2.2)});
                formation.push({x: adjustedWidth, y: (canvas.height()/1.7)});
            }else if(players == 7){
                formation.push({x: adjustedWidth, y: (canvas.height()/16)}); //Goalkeeper
                formation.push({x: adjustedWidth, y: (canvas.height()/4.5)});
                formation.push({x: adjustedWidth - (canvas.width()/3.8), y: (canvas.height()/4.5)});
                formation.push({x: adjustedWidth + (canvas.width()/3.8), y: (canvas.height()/4.5)});
                formation.push({x: adjustedWidth - (canvas.width()/4.2), y: (canvas.height()/2.2)});
                formation.push({x: adjustedWidth + (canvas.width()/4.2), y: (canvas.height()/2.2)});
                formation.push({x: adjustedWidth, y: (canvas.height()/1.7)});
            }else if(players == 9){
                formation.push({x: adjustedWidth, y: (canvas.height()/16)}); //Goalkeeper
                formation.push({x: adjustedWidth, y: (canvas.height()/4.5)});
                formation.push({x: adjustedWidth - (canvas.width()/3.8), y: (canvas.height()/4.5)});
                formation.push({x: adjustedWidth + (canvas.width()/3.8), y: (canvas.height()/4.5)});
                formation.push({x: adjustedWidth - (canvas.width()/4.2), y: (canvas.height()/2.2)});
                formation.push({x: adjustedWidth + (canvas.width()/4.2), y: (canvas.height()/2.2)});
                formation.push({x: adjustedWidth - (canvas.width()/3.8), y: 375});
                formation.push({x: adjustedWidth + (canvas.width()/3.8), y: 375});
                formation.push({x: adjustedWidth, y: (canvas.height()/1.4)});
            }else if(players == 11){
                formation.push({x: adjustedWidth, y: (canvas.height()/16)}); //Goalkeeper
                formation.push({x: adjustedWidth, y: 125});
                formation.push({x: adjustedWidth - (canvas.width()/3.8), y: (canvas.height()/5)});
                formation.push({x: adjustedWidth + (canvas.width()/3.8), y: (canvas.height()/5)});
                formation.push({x: adjustedWidth - (canvas.width()/3.8), y: (canvas.height()/2.4)});
                formation.push({x: adjustedWidth + (canvas.width()/3.8), y: (canvas.height()/2.4)});
                formation.push({x: adjustedWidth - (canvas.width()/4.6), y: (canvas.height()/2)});
                formation.push({x: adjustedWidth + (canvas.width()/4.6), y: (canvas.height()/2)});
                formation.push({x: adjustedWidth - (canvas.width()/3.8), y: (canvas.height()/1.6)});
                formation.push({x: adjustedWidth + (canvas.width()/3.8), y: (canvas.height()/1.6)});
                formation.push({x: adjustedWidth, y: (canvas.height()/1.4)});
            }
            
            //ADD PLAYER & SUBS
            for(var p=0; p<players; p++){
                var football_player = new DragImage("Images/Player.png", formation[p].x, formation[p].y, dragsize, dragsize, false);
                football_players.push(football_player);
            }
            
            for(var s=0; s<subs; s++){
                var football_sub = new DragImage("Images/Player.png", (45 * s) + 15, subs_base_y, dragsize, dragsize, true);
                football_subs.push(football_sub);
            }
        }
    
        function loadPitch(){
            //WORKOUT WHICH PITCH GRAPHIC TO USE
            var details_exist = false;
            if((!(typeof match_time === 'undefined' || match_time === null) || !(typeof match_loc === 'undefined' || match_loc === null) || !(typeof match_teams === 'undefined' || match_teams === null)) && show_match_details){
               details_exist = true;
            }
            
            var canvas_width = canvas.width();
            var canvas_height = canvas.width() * 1.75;
            dragsize = canvas.width()/10;
            
            if(details_exist == false && subs > 0){ //No Match Details were entered but subs exist
                $("#canvas").resizeCanvas(canvas_width, canvas_height);
                refreshCanvasDim();
                subs_base_y = canvas_height - (canvas_height/8.65);
                football_pitch.src = "Images/Pitch_subs.png";
            }else if(details_exist == true && subs == 0){ //Match details were entered but no subs
                $("#canvas").resizeCanvas(canvas_width, canvas_height);
                refreshCanvasDim();
                match_details_base_y = (canvas_height - (canvas_height/9.1));
                football_pitch.src = "Images/Pitch_info.png";
            }else if(details_exist == false && subs == 0){ //No details or subs
                $("#canvas").resizeCanvas(canvas_width, canvas_height - 100);
                refreshCanvasDim();
                football_pitch.src = "Images/Pitch_only.png";
            }else{
                $("#canvas").resizeCanvas(canvas_width, canvas_height + 100);
                refreshCanvasDim();
                match_details_base_y = (canvas_height + 100) - ((canvas_height + 100)/9.5);
                console.log(match_details_base_y);
                console.log((canvas_height + 100)/9.5);
                subs_base_y = (canvas_height + 100) - ((canvas_height + 100)/4.7);
                football_pitch.src = "Images/Pitch_all.png";
            }
        }
    
        function DragImage(src, x, y, width, height, isSub) {
            var that = this;
            var startX = 0,
                startY = 0;
            var drag = false;
            
            this.w = width;
            this.h = height;
            this.x = x;
            this.y = y;
            this.activated = false;
            this.isSub = isSub;
            var img = new Image();
            img.src = src;
            this.update = function() {
                if(!that.activated && this.isSub){
                    that.y = subs_base_y;
                }
                
                if (mousePressed) {
                    var left = that.x;
                    var right = that.x + that.w;
                    var top = that.y;
                    var bottom = that.y + (that.h * 1.5);

                    if (!drag) {
                        startX = mouseX - that.x;
                        startY = mouseY - that.y;
                    }
                    if (mouseX < right && mouseX > left && mouseY < bottom && mouseY > top) {
                        if (!dragging){
                            that.activated = true;
                            dragging = true;
                            drag = true;
                            canPreventDefault = true;
                        }
                    }
                } else {
                    drag = false;
                    canPreventDefault = false;
                }
                if (drag) {
                    that.x = mouseX - startX;
                    that.y = mouseY - startY;
                }
                if(drag){
                    that.w = (dragsize + 10);
                    that.h = (dragsize + 10);
                }else{
                    that.w = dragsize;
                    that.h = dragsize;
                }
                ctx.drawImage(img, that.x, that.y, that.w, that.h);
            }
        }
    
        function refreshCanvasDim(){
            cWidth = c.width;
            cHeight = c.height;
        }
});
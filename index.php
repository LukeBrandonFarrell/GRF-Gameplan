<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <title>Choose Formation</title>
        <link href="style.css" rel="stylesheet" type="text/css">
    </head>
    
    <body id="p_1">
        <div id="all">
            <h2 class="title">Pick Formation</h2>
            <div>
                <select onchange="location = this.value;" style="margin-bottom:8px;">
                    <option value="index">Pick Formation</option>
                     <option value="page_2?p=4">4-A-Side</option>
                     <option value="page_2?p=5">5-A-Side</option>
                     <option value="page_2?p=7">7-A-Side</option>
                     <option value="page_2?p=9">9-A-Side</option>
                     <option value="page_2?p=11">11-A-Side</option>
                </select>
                <img src="Images/11Aside.jpg">
            </div>
            <br>
            <!--<div class="desktop">
                <div class="formation"><a href="page_2?p=5"><img src="Images/5Aside.jpg"></a><h3>5-A-Side</h3></div>
                <div class="formation"><a href="page_2?p=7"><img src="Images/7Aside.jpg"></a><h3>7-A-Side</h3></div>
                <div class="formation"><a href="page_2?p=9"><img src="Images/9Aside.jpg"></a><h3>9-A-Side</h3></div>
                <div class="formation"><a href="page_2?p=11"><img src="Images/11Aside.jpg"></a><h3>11-A-Side</h3></div>
            </div>-->
        </div>
    </body>
</html>
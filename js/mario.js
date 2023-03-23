function moveRight(countRight)
{
    let mario = $("#mario").position();
    $('#mario img').attr('src','../img/move_right/frame-'+countRight+'.png');
    $('#mario').css({left:mario.left+7}); 
}
function moveLeft(countLeft)
{
    let mario = $("#mario").position();
    $('#mario img').attr('src','../img/move_left/frame-'+countLeft+'.png');
    $('#mario').css({left:mario.left-7});
}
function jumpUpRight()
{
    let mario = $("#mario").position();
    $("#mario").animate({top:mario.top = mario.top - 100},'fast');
    $('#mario img').attr('src','../img/jump-right.png');
    $(document).keydown(false);
    $("#mario").animate({top:mario.top = mario.top + 100},'fast');
    //$('#mario img').attr('src','../img/stand-up.png');
}
class Obstacle
{
    constructor(element)
    {
        var position = element.position();
        this.height = element.height();
        this.width = element.width();
        this.positionX = position.left;
        this.positionY = position.top;
    }

    getHeight()
    {
        return this.height;
    }

    getWidth()
    {
        return this.width;
    }

    getPositionX()
    {
        return this.positionX;
    }

    getPositionY()
    {
        return this.positionY;
    }
}

// class ObstacleManager
// {
//     static obstacles = new Array();
//     static loadObstacles() 
//     {
//         for(let NumObstacle = 0 ; NumObstacle < 6 ; NumObstacle++)
//         {
//             ObstacleManager.obstacles.push(new Obstacle($('.obstacle'+NumObstacle)));
//         }
//     }

//     static getObstacle(obstacles,numObstacle)
//     {
//         return obstacles[numObstacle];
//     }
// }

function checkCollision(obstacles, mario) 
{
    position = mario.position();
    var marioLeft = position.left;
    var marioTop = position.top;
    var marioRight = marioLeft + mario.width();
    var marioBottom = marioTop + mario.height();
    var marioWidth = mario.width();
    var marioHeight = mario.height();
    //console.log(marioRight);
    obstacles.forEach(obstacle => 
    {
        var obstacleLeft = obstacle.getPositionX();
        var obstacleTop = obstacle.getPositionY();
        var obstacleRight = obstacleLeft + obstacle.getWidth();
        var obstacleBottom = obstacleTop + obstacle.getHeight();
        if (marioRight>obstacleLeft) 
        {
            $('#mario').css({left:position.left-10});
            console.log(true);
        }
        else if(marioBottom>obstacleTop)
        {
            console.log(true);
        }
    });
}

$( document ).ready(function() 
{
    //Initialisation des variables
    var countRight = 1;
    var countLeft = 1;
    var obstacles = new Array();
    //Chargement des obstacles
    for(let NumObstacle = 1 ; NumObstacle < 3 ; NumObstacle++)
    {
        obstacles.push(new Obstacle($('.obstacle'+NumObstacle)));
    }
    //console.log(obstacles);

    //Detection des touches
    $(document).keydown(function(e){
        if (e.which == 37) { 
           
            checkCollision(obstacles,$('#mario'));
            //left
            countLeft = countLeft + 1;
            if(countLeft == 12)
            {   
                countLeft = 1;
                moveLeft(countLeft);
            }
            moveLeft(countLeft);
           //return false;
        }
        if (e.which == 32) { 
            checkCollision(obstacles,$('#mario'));
            let position = $('#mario').position();
            jumpUpRight();
            state = true
            
            //up
            //return false;
         }
        if (e.which == 39) { 
            checkCollision(obstacles,$('#mario'));
            //right
            countRight = countRight + 1;
            if(countRight == 12)
            {
                countRight = 1;
                moveRight(countRight);
            }
            moveRight(countRight);
            //return false;
        }
        if (e.which == 40) { 
            checkCollision(obstacles,$('#mario'));

            //down
            //return false;
        }
    });
    $('#mario img').attr('src','../img/stand-up.png');
    
    console.log( "ready!" );
    
});



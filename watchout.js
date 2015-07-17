
var w = window.innerWidth;
var h = window.innerHeight;
var vis = d3.select('body').append('div')
  .style({ width: w + 'px', height: h + 'px' }).attr('class', 'vis')
var duration = 1000;
var score = 0;
var bestScore = 0;
var r = 30;
var n = 10;
var over = false;
var collisionCount = 0;
var maxCollisions = 3;
var mouse = { x: w, y: h };
var rand = function(n){ return Math.random() * n; };
var url = 'http://www.youtube.com/embed/tquaim7OMaQ?'
  + 'autoplay=1&controls=0&showinfo=0&start=8&modestbranding=0'

var astroids = vis.selectAll('div').data(d3.range(n))
      .enter().append('div').attr('class', 'astroid')
      .style({
        left: '-100px',
        top: '-100px',
        width: r * 2 + 'px',
        height: r * 2 + 'px'
      });

// keep track of the mouse position & detect collisions
vis.on('mousemove', function () {
   mouse = { x: d3.mouse(this)[0], y: d3.mouse(this)[1] }
});

// animation loop
var loop = function(astroids){
  astroids.transition().duration(duration).ease('linear')
    .style({
      left: function(){ return rand(w - r*2) + 'px'; },
      top: function(){ return rand(h - r*2) + 'px' ; }
    }).each('end', function(){ loop(d3.select(this)); });
};
loop(astroids);

// score tracking
var scoreTicker = function(){
  score = score + 1;
  if(score > bestScore){
    bestScore = score;
  }
  d3.select('.scoreboard .high span').text(bestScore);
  d3.select('.scoreboard .current span').text(score);
}

setInterval(scoreTicker, 200);

var gameOver = function(){
  if(collisionCount > maxCollisions){
    over = true;
    d3.select('body').append('iframe')
      .attr({ src: url, frameborder: '0', allowfullscreen: '' })
      .attr({ width: w, height: h });
    vis.remove();
  }
  score = -1;
}

var prevCollision = false;
var detectCollisions = function(){
  var collision = false;
  astroids.each(function(){
    var astroid = d3.select(this);
    var cx = parseFloat(astroid.style('left')) + r;
    var cy = parseFloat(astroid.style('top')) + r;
    // the magic of collision detection
    var x = cx - mouse.x;
    var y = cy - mouse.y;
    if( Math.sqrt(x * x + y * y) < r ){
      gameOver();
      collision = true;
    }
  })
  if(collision) {
    vis.style('background-color', 'red');
    if(prevCollision !== collision){
      collisionCount = collisionCount + 1;
      d3.select('.scoreboard .collisions span').text(collisionCount);
    }
  }else{
    vis.style('background-color', 'black');
  }
  prevCollision = collision;
};

d3.timer(detectCollisions);

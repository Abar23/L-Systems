const MAX_TURTLES = 7;

var strings = [[]];
var turtle = [];
var currentTurtle = 0;

function preload()
{
  strings[[0]] = loadStrings("Tree 1.txt");
  strings[[1]] = loadStrings("Tree 2.txt");
  strings[[2]] = loadStrings("Tree 3.txt");
  strings[[3]] = loadStrings("Tree 4.txt");
  strings[[4]] = loadStrings("Tree 5.txt");
  strings[[5]] = loadStrings("Square 1.txt");
  strings[[6]] = loadStrings("Square 2.txt");
}

function setup() {
  createCanvas(1080, 720);
  // Set angle mode to degrees for simmple julia angle step increases
  angleMode(DEGREES);

  for(let i = 0; i < strings.length; i++)
  {
    turtle.push(new Turle(strings[[i]]));
  }

  turtle[currentTurtle].draw();

  var button = createButton("Expand");
  button.mousePressed(expandLSystem);
}

function draw()
{
  if(keyIsDown(LEFT_ARROW))
  {
    turtle[currentTurtle].decreaseAngle();
    turtle[currentTurtle].draw();
  }
  else if(keyIsDown(RIGHT_ARROW))
  {
    turtle[currentTurtle].increaseAngle();
    turtle[currentTurtle].draw();
  }
}

function expandLSystem()
{
  turtle[currentTurtle].expand();
  turtle[currentTurtle].draw();
}

function keyPressed()
{
  if(key == 'R' || key == 'r')
  {
    turtle[currentTurtle].resetTurtle();
    turtle[currentTurtle].draw();
  }
  else if(key == 'C' || key == 'c')
  {
    turtle[currentTurtle].changeColorMode();
    turtle[currentTurtle].draw();
  }
  else if(keyIsDown(UP_ARROW))
  {
    currentTurtle++;
    if(currentTurtle == MAX_TURTLES)
    {
      currentTurtle = 0;
    }
    turtle[currentTurtle].draw();
  }
  else if(keyIsDown(DOWN_ARROW))
  {
    currentTurtle--;
    if(currentTurtle < 0)
    {
      currentTurtle = MAX_TURTLES - 1;
    }
    turtle[currentTurtle].draw();
  }
}

class Turle
{
  rule;
  originalAngle;
  angle;
  originialLength;
  length;
  colorMode;

  constructor(lSystemDef)
  {
    this.rule = new Rules(lSystemDef);
    this.angle = lSystemDef[0];
    this.originalAngle = this.angle;
    this.length = lSystemDef[1];
    this.originialLength = this.length;
    this.colorMode = RGB;
  }

  expand()
  {
    this.rule.expand();
    this.length *= 0.5;
  }

  increaseAngle()
  {
    this.angle++;
  }

  decreaseAngle()
  {
    this.angle--;
  }

  resetTurtle()
  {
    this.rule.resetSentence();
    this.length = this.originialLength;
    this.angle = this.originalAngle;
  }

  changeColorMode()
  {
    (this.colorMode == HSB) ? this.colorMode = RGB: this.colorMode = HSB;
  }

  draw()
  {
    background(255);

    if(this.colorMode == HSB)
    {
      colorMode(HSB, 100);
    }
    else
    {
      colorMode(RGB);
      stroke(0);
    }

    push();
    translate(width / 2, height - 1);
    let sentence = this.rule.sentence;
    for(let i = 0; i < sentence.length; i++)
    {
      if(this.colorMode == HSB)
      {
        stroke(map(i, 0, sentence.length, 0, 100), 100, 75);
      }

      let character = sentence[i];

      if(/^[a-zA-Z()]+$/.test(character))
      {
        if(character == 'f')
        {
          translate(0, -this.length);
        }
        else if(character != 'X' || character != 'Y')
        {
          line(0, 0, 0, -this.length);
          translate(0, -this.length);
        }
      }
      else if(character == '+')
      {
        rotate(this.angle);
      }
      else if(character == '-')
      {
        rotate(-this.angle);
      }
      else if(character == '[')
      {
        push();
      }
      else if(character == ']')
      {
        pop();
      }
    }
    pop();
  }
}

class Rules 
{
  ruleMap;
  initiator = "";
  sentence = "";

  constructor(lSystemDef)
  {
    this.sentence = lSystemDef[2];
    this.initiator = lSystemDef[2];
    this.ruleMap = new Map();
    for(let i = 3; i < lSystemDef.length; i++)
    {
      let rule = lSystemDef[i];
      let axiom = rule[0];
      let expansion = "";
      for(let j = 2; j < rule.length; j++)
      {
        expansion += rule[j];
      }
      this.ruleMap.set(axiom, expansion);
    }
  }

  get sentence()
  {
    return this.sentence;
  }

  resetSentence()
  {
    this.sentence = this.initiator;
  }

  expand()
  {
    let newSentence = "";
    for(let i = 0; i < this.sentence.length; i++)
    {
      let character = this.sentence[i];
      if(this.ruleMap.has(character))
      {
        newSentence += this.ruleMap.get(character);
      }
      else
      {
        newSentence += character;
      }
    }
    this.sentence = newSentence;
  }
}
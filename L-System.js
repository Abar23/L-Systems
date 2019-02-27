// Constants
const MAX_TURTLES = 16;

// 2D array to store the loaded files
var loadedFiles = [[]];
// Array of turtle objects
var turtles = [];
// Inidicates which turle is active
var currentTurtle = 0;

// Control variables for zooming and canvas panning
var xDirection = 0;
var yDirection = 0;
var canvasZoon = 1.0;

// Boolean to indicate when to redraw l-system stored in the turtle
var redrawTurtle = false;

function preload()
{
  // Load all files that containdefinitions for l-systems
  loadedFiles[[0]] = loadStrings("Assets/Tree 1.txt");
  loadedFiles[[1]] = loadStrings("Assets/Tree 2.txt");
  loadedFiles[[2]] = loadStrings("Assets/Tree 3.txt");
  loadedFiles[[3]] = loadStrings("Assets/Tree 4.txt");
  loadedFiles[[4]] = loadStrings("Assets/Tree 5.txt");
  loadedFiles[[5]] = loadStrings("Assets/Square 1.txt");
  loadedFiles[[6]] = loadStrings("Assets/Square 2.txt");
  loadedFiles[[7]] = loadStrings("Assets/Koch Curve 1.txt");
  loadedFiles[[8]] = loadStrings("Assets/Koch Curve 2.txt");
  loadedFiles[[9]] = loadStrings("Assets/Koch Curve 3.txt");
  loadedFiles[[10]] = loadStrings("Assets/Koch Curve 4.txt");
  loadedFiles[[11]] = loadStrings("Assets/Koch Curve 5.txt");
  loadedFiles[[12]] = loadStrings("Assets/Koch Curve 6.txt");
  loadedFiles[[13]] = loadStrings("Assets/Koch Curve 7.txt");
  loadedFiles[[14]] = loadStrings("Assets/Dragon Curve.txt");
  loadedFiles[[15]] = loadStrings("Assets/Sierpinski.txt");
}

function setup() {
  createCanvas(1080, 720);
  // Set angle mode to degrees for simmple julia angle step increases
  angleMode(DEGREES);

  // Create a Turtle object for each file loaded in to the program
  for(let i = 0; i < loadedFiles.length; i++)
  {
    // Add turtle to the list of turtles
    turtles.push(new Turle(loadedFiles[[i]]));
  }

  // draw initial active turtle
  turtles[currentTurtle].draw();

  // Create button to control l-system expansions
  var button = createButton("Expand");
  button.mousePressed(expandLSystem);
  rectMode(CENTER);

  // Clear out memory of the strings that were loaded from the files
  loadedFiles = [];
}

function draw()
{
  // Zoom by scaling canvas
  translate(width/2,height/2);
  scale(canvasZoon, canvasZoon);
  translate(-width/2,-height/2);

  // Move by an x and y direction to control canvas panning
  translate(xDirection, yDirection);
  if(redrawTurtle)
  {
    turtles[currentTurtle].draw();
    redrawTurtle = false;
  }

  // Control the angle used in the l-systems via the left and right arrow keys
  if(keyIsDown(LEFT_ARROW))
  {
    turtles[currentTurtle].decreaseAngle();
    redrawTurtle = true;
  }
  else if(keyIsDown(RIGHT_ARROW))
  {
    turtles[currentTurtle].increaseAngle();
    redrawTurtle = true;
  }
}

/*
 * Expands the sentence that is used to draw the l-system
 */
function expandLSystem()
{
  turtles[currentTurtle].expand();
  redrawTurtle = true;
}

/*
 * Mouse wheel controls the zoom of the canvas
 */
function mouseWheel(event)
{
  // Zoom out
  if(event.delta > 0 && canvasZoon - 0.05 > 0.05)
  {
    canvasZoon -= 0.05;
  }
  // Zoom in
  else
  {
    canvasZoon += 0.05;
  }

  redrawTurtle = true;
}

/*
 * Mouse drag controls canvas panning
 */
function mouseDragged()
{
  // Calculate the new x and y distance to pan the canvas by
  xDirection += mouseX - pmouseX;
  yDirection += mouseY - pmouseY;

  redrawTurtle = true;
}

function keyPressed()
{
  // When r is pressed, reset panning, zooming, and reset the current turtle
  if(key == 'R' || key == 'r')
  {
    xDirection = 0;
    yDirection = 0;
    canvasZoon = 1;
    turtles[currentTurtle].resetTurtle();
    redrawTurtle = true;
  }
  // When z is pressed, reset the zoom and pan
  else if(key == 'Z' || key == 'z')
  {
    xDirection = 0;
    yDirection = 0;
    canvasZoon = 1;
    redrawTurtle = true;
  }
  // When c is pressed, change the color mode for the current turtle
  else if(key == 'C' || key == 'c')
  {
    turtles[currentTurtle].changeColorMode();
    redrawTurtle = true;
  }
  // When the up arrow is pressed, increase the angle that the turtle uses to create the l-system
  else if(keyIsDown(UP_ARROW))
  {
    currentTurtle++;
    if(currentTurtle == MAX_TURTLES)
    {
      currentTurtle = 0;
    }
    xDirection = 0;
    yDirection = 0;
    redrawTurtle = true;
  }
  // When the down arrow is pressed, decrease the angle that the turtle uses to create the l-system
  else if(keyIsDown(DOWN_ARROW))
  {
    currentTurtle--;
    if(currentTurtle < 0)
    {
      currentTurtle = MAX_TURTLES - 1;
    }
    xDirection = 0;
    yDirection = 0;
    redrawTurtle = true;
  }
}

// Turtle class stores the control parameters and drawing of the l-system
class Turle
{
  rule;
  originalAngle;
  angle;
  originialLength;
  length;
  colorMode;
  reductionFactor;

  constructor(lSystemDef)
  {
    // Construct instance of Rule class from the current l-system definition
    this.rule = new Rules(lSystemDef);

    // Extract the angle from the top of the file
    this.angle = lSystemDef[0];
    // Store the angle for future resets
    this.originalAngle = this.angle;

    // Extract the length lines for the l-system
    this.length = lSystemDef[1];
    // Store the length for the future resets
    this.originialLength = this.length;

    // Set initial color mode to RGB
    this.colorMode = RGB;

    // Exctract the reduction factor that will be used to shring the subsequent lines of the l-system as it expands
    this.reductionFactor = lSystemDef[2];
  }

  /*
   * Expand the current sentence of the l-system
   */
  expand()
  {
    // Expand the rule
    this.rule.expand();
    // Reduce the line length by the reduction factor
    this.length *= this.reductionFactor;
  }

  /*
   * Increment the l-system angle
   */
  increaseAngle()
  {
    this.angle++;
  }

  /*
   * Decrement the l-system angle
   */
  decreaseAngle()
  {
    this.angle--;
  }

  /*
   * Reset the turtle to its original state when it was instantiated
   */
  resetTurtle()
  {
    this.rule.resetSentence();
    this.length = this.originialLength;
    this.angle = this.originalAngle;
  }

  /*
   * Change the color mode between HSB and RGB
   */
  changeColorMode()
  {
    (this.colorMode == HSB) ? this.colorMode = RGB: this.colorMode = HSB;

    // Set the color mode for the turtle
    if(this.colorMode == HSB)
    {
      colorMode(HSB, 100);
    }
    else
    {
      colorMode(RGB);
      stroke(0);
    }
  }

  /*
   * Draws the l-system to the screen using the current sentence
   */
  draw()
  {
    // Clear the background
    background(255);

    push();

    // Set the l-system to the bottom-center of the screen
    translate(width / 2, height - 1);

    // Cache sentece from the current Rule object
    let sentence = this.rule.sentence;
    // Iterate through the sentence to draw the l-system
    for(let i = 0; i < sentence.length; i++)
    {
      // Alter the stroke color when the color mode is HSB
      if(this.colorMode == HSB)
      {
        // Map the value of, which will go from 0 to the length of the sentence, to the max hue range for HSB
        stroke(map(i, 0, sentence.length, 0, 100), 100, 75);
      }

      // Get character at i from the sentence
      let character = sentence[i];

      // Check if the character is alphabetic using a regular expression
      if(/^[a-zA-Z()]+$/.test(character))
      {
        // Don't draw a line when the sentence has a lowercase f
        if(character == 'f')
        {
          translate(0, -this.length);
        }
        // Only draw line and move the drawing position when the character is not X or Y
        else if(character != 'X' || character != 'Y')
        {
          line(0, 0, 0, -this.length);
          translate(0, -this.length);
        }
      }
      // Rotate by the angle of the l-system when on +
      else if(character == '+')
      {
        rotate(this.angle);
      }
      // Rotate by negative angle of the l-system when on -
      else if(character == '-')
      {
        rotate(-this.angle);
      }
      // Push current state of the p5's transform matrix onto the matrix stack on [
      else if(character == '[')
      {
        push();
      }
      // Pop current state of the p5's transform matrix from the matrix stack on ]
      else if(character == ']')
      {
        pop();
      }
    }
    pop();
  }
}

// Rules class stores the string that defines the l-system and the rules for expansions
class Rules 
{
  ruleMap;
  initiator = "";
  sentence = "";

  constructor(lSystemDef)
  {
    // Extract initial sentence from the l-system definition
    this.sentence = lSystemDef[3];
    // Store initial sentence again for furture resets of the l-system
    this.initiator = lSystemDef[3];

    // Create Map object to store axioms to their expansions
    this.ruleMap = new Map();
    // Iterate over the remaining lines in the file, which contains axioms and their expansions
    for(let i = 4; i < lSystemDef.length; i++)
    {
      // Etract line from the l-system definition
      let rule = lSystemDef[i];
      // Extract the axiom at 0 position of the string since the remaing parts of the file are in the format of "axiom=expansion"
      let axiom = rule[0];

      // Set expansion to an empty string
      let expansion = "";
      // Iterate over the expansion definition of the string
      for(let j = 2; j < rule.length; j++)
      {
        // Concatinate the expansion into the expansion variable
        expansion += rule[j];
      }
      // Set the axiom and expansion pair in the map
      this.ruleMap.set(axiom, expansion);
    }
  }

  /*
   * Return the current l-system sentence
   */
  get sentence()
  {
    return this.sentence;
  }

  /*
   * Reset the l-system sentence to the initial sentence
   */
  resetSentence()
  {
    this.sentence = this.initiator;
  }

  /*
   * Expand the current sentence based upon the expansion rules
   */
  expand()
  {
    // Create empty string to store the newly built sentence
    let newSentence = "";
    // Iterate over the current sentence and expand the sentence from the rules in the map
    for(let i = 0; i < this.sentence.length; i++)
    {
      // Get character from the initial sentence at position i
      let character = this.sentence[i];

      // Check if the current character is has an associated expansion
      if(this.ruleMap.has(character))
      {
        // Contatinate onto the new sentence the expansion associated with the character
        newSentence += this.ruleMap.get(character);
      }
      else
      {
        // Character has no associated expansion, so add it to the newly constructed sentence
        newSentence += character;
      }
    }
    // Overwrite the current sentence with the new l-system sentence
    this.sentence = newSentence;
  }
}
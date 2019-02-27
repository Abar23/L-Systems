Since we were given the ability to use objects and file loading, I thought that it would be interesting
to implement a program that draws l-systems based upon a defined input file. 

Input file format for the program:

<Angle in degrees>
<Length>
<Reduction Factor>
<Initial Sentence/Axiom>
<Expansion Rules>

To illistrate the above format, here is "Dragon Curve.txt":

90 <- Angle
200 <- Length
.73 <- Reduction Factor
FX <- Initial Sentence/Axiom
X=X+YF+ <- Expansion Rule
Y=-FX-Y <- Expansion Rule

From the file, the program is able to extract all information specified in order to properly store,
expand, and draw the l-system.

Here are all the possible axioms/control characters for defining expansion rules and the initial axiom/sentence:

    1. +: Rotate by the specified angle

    2. -: Rotate by the negative of the specified angle

    3. [: Push current state of the l-system onto the matrix stack

    4. ]: Pop prior state of the l-system off of the matrix stack

    5. f: Move foward without drawing a line

    6. X and Y: Do nothing. Usually used for rational/angular control of the l-system

    7. Capital letters (expect X and Y): Move forward and draw a line.

Using the above information, the program utilizes turtle graphics rendering when creating the l-system. In the program
I have include 16 different l-systems that the program can render.

Keyboard controls for the program:

    1. Up arrow key: Changes to the next l-system
    
    2. Down arrow key: Changes to the previous l-system

    3. Left arrow key: Increases the angle that is used to create the l-system

    4. Rightarrow key: Decreases the angle that is used to create the l-system

    5. R: Reset l-system to the original sentence and reset canvas viewing parameters

    5. Z: Resets the viewing parameters

    5. C: Changes the color mode between RGB nad HSB on the selected l-system
    
Mouse controls:

    1. Mouse wheel: Increases or decreases the zoom of the canvas

    2. Left click: Click and drag on the canvas to pan

GUI control:

    1. Expand button: On click, it will expand the sentence of the l-system and draw it.

NOTE: I have included a screenshots folder which contains all l-systems that are currently used
in the program. The program does not automatically center the l-system, so some require manually
changing the view to see the l-system as it expands.
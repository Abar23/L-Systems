Since we were given the ability to use loops and functions within this project, I decided
to implement a fractal exploration program. The first task that I had to complete was being
able to create a mandelbrot set. I searched online for good mandelbrot generation algorithms.
Every resource that I found used an algorithm called the escape time algorithm. The escape
time algorithm works by taking each pixel and determining if it is within the mandelbrot set.
To determine if a pixel is in the set, two major variables must be set, that is max iterations
and bail out radius. These two variables are necessary because it provides a cutoof for pixels
that are within the set or outside of the set. The algorithm will loop for the max iterations
that have been set and will either kill the loop when the bail out radius of the pixel exceeds
the set bail out radius or the max iterations has been met. If the max iterations has been 
reached, then the pixel is within the mandelbrot set and must. On the other hand, if the bail
out radius exceeded, then the pixel is outside of the bail out radius. The color of the pixel
is based upon the number of iterations that it took to kill the loop. When I implemented the 
time escape algorithm, the resulting mandelbrot set had each pixel's RGB values set from 0 to 
255, which was calculated by dividing the iterations to kill the loop by the max iterations. 
The coloring scheme created a mandelbrot that went from black on the outer pixels to bright 
white for pixels within the set. The image was very intersting to look at, however, the coloring 
scheme was very bland, so I implemented a smooth step coloring system. The the coloring system 
gave the ability to generate mandelbrots with a vast variety of colors. I coloring scheme that 
I chose to keep for the program is a purle/pink/magenta scheme. After creating mandelbrot and 
coloring system, I then implemented the ability to zoom into the fractal space. The zoom is created
when the user clicks, drags, and releases the mouse. The rectangular volume that they create
becomes the zooming factor for the fractal space. Once this was accomplished, I then modified
the mandelbrot algorithm so that I could generate the julia and tricorn set.I then created various
parameters that allowed for changing the overall look and shape of the julia set. The two parameters 
that allow for the creation of a new julia set is the angle and radius of the julia set. 

I also added the ability to animate the julia set and allowed the user to zoom into the mandelbrot set
based upon the position of the mouse. I wanted to implement an automatic zooming system that utilized 
sampling for automatic steering, but I unfortunately don't have the time to implement that feature.

After fiddling with the various parameters of the sets, I created a some keyboard input to make the
program a little more interactive. Here are a list of controls that are possible in the program:

    1. Arrow key up: Increases the number of iterations of that the escape time algorithm uses. The
       result of this change is that the algorithm is able to give more resolution to the set.
    
    2. Arrow key down: Decreases the number of iterations that the esapape time algorithm uses. The 
       result of this change is that the resolution of the set decreases.
    
    3. Arrow key Left: Switches to the next fractal.

    4. Arrow key rigHT: Switches to the previous fractal.

    5. Q: Increases the angle of the julia set.

    6. S: Decreases the angle of the julia set.

    7. W: Increases the radius of the julia set.

    8. S: Decreases the radius of the julia set.

    9. E: Increases the bail out radius.

    10. D: Decreases the bail out radius. Creates interesting effect when it is set to one.

    11. R: Resets all parameters for rendering fractals. However, it does stay on the same 
        fractal that is currently being rendered.

    12. F: Resets the zoom.

    13. P: Pauses and unpauses mouse based zooming on the mandelbrot set and animation of
        the julia set.

Don't forget that there is mouse based manual zooming. To achieve this, simply click, drag, and
release around an area you want to see.

NOTE: I have included a screenshots folder which contains intersting images that were created as
I zoomed into the various sets.
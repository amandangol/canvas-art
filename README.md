# CanvasArt Application

CanvasArt is a simple web application that allows you to create digital art on a canvas. You can draw freehand, use an eraser, change brush sizes, select different colors, clear the canvas, and save your artwork as an image. In this write-up, I'll provide instructions on how to use the site and a detailed walkthrough of how classes, switch statements, and try-catch-finally statements were incorporated into the website.

## How to Use CanvasArt

1. **Drawing Modes**
   - **Freehand**: Click the "Freehand" button to enter freehand drawing mode. You can draw on the canvas by clicking and dragging the mouse.
   - **Eraser**: Click the "Eraser" button to enter eraser mode. You can erase parts of your artwork by clicking and dragging the mouse while in this mode.

2. **Brush Size**
   - Use the "Brush Size" slider to adjust the size of your brush or eraser. Slide it left for a smaller brush and right for a larger one.

3. **Color Picker**
   - Click the color picker to select a color for your brush. Choose any color you like to paint with.

4. **Clear Canvas**
   - Click the "Clear" button to clear the entire canvas and start fresh.

5. **Save Artwork**
   - Click the "Save" button to save your artwork as a PNG image.

6. **Canvas Size**
   - Choose from the "Canvas Size" dropdown to change the size of your canvas (Small, Medium, Large).

## Incorporation of Classes, Switch Statements, and Try-Catch-Finally

Certainly, here's a detailed walkthrough of how classes, switch statements, and try-catch-finally statements were incorporated into my CanvasArt application along with the relevant code segments and explanations:

## Classes
The core structure of the CanvasArt application is based on object-oriented programming principles. The primary class used is `CanvasArt`, which serves as the blueprint for the application's functionality. Here's how classes are utilized:


```javascript
class CanvasArt {
    constructor() {
        // Constructor code here...
    }
    
    // Other methods...
}
```



**Explanation:**

The CanvasArt class encapsulates the entire application, making it more organized and maintainable.
The constructor method is responsible for setting up initial properties and event listeners.
Various methods within the class handle different aspects of the application, such as drawing, erasing, changing brush size, and saving the canvas.

## Switch Statements

Switch statements are employed in the CanvasArt application to manage different drawing modes and button states. Here are code segments and explanations of how switch statements are used:

Handling Drawing Modes
```javascript

handleDrawingMode(mode) {
    try {
        switch (mode) {
            case "freehand":
                // Handle Freehand mode...
                break;
            case "eraser":
                // Handle Eraser mode...
                break;
            case "text":
                // Handle Text mode...
                break;
            default:
                throw new Error("Invalid drawing mode");
        }
    } catch (error) {
        console.error("Error handling drawing mode:", error.message);
    }
}
```


**Explanation:**

The handleDrawingMode method uses a switch statement to conditionally perform actions based on the selected drawing mode ("freehand," "eraser," or "text").
If an invalid mode is provided, it throws an error, which is caught and logged for error handling.

Toggling Button Active State
```javascript

toggleButtonActive(mode) {
    try {
        this.freehandButton.classList.remove("active");
        this.eraserButton.classList.remove("active");
        this.textButton.classList.remove("active");

        switch (mode) {
            case "freehand":
                this.freehandButton.classList.add("active");
                break;
            case "eraser":
                this.eraserButton.classList.add("active");
                break;
            case "text":
                this.textButton.classList.add("active");
                break;
            default:
                throw new Error("Invalid button mode");
        }
    } catch (error) {
        console.error("Error toggling button active state:", error.message);
    }
}
```

**Explanation:**

The toggleButtonActive method uses switch statements to manage the active state of buttons based on the selected mode.
For example, when in freehand mode, the "Freehand" button becomes active by adding a CSS class.

## Try-Catch-Finally Statements
Try-catch-finally statements are implemented in the CanvasArt application for error handling. Here's a code segment and explanation:

```javascript

try {
    // Code that might throw an error...
} catch (error) {
    console.error("Error message:", error.message);
} finally {
    // Code to run regardless of success or failure...
}
```

**Explanation:**

Try-catch blocks are used in methods like handleDrawingMode, toggleButtonActive, and others to catch and handle potential errors gracefully.
If an error occurs, the catch block is executed, and an error message is logged to the console for debugging.
The finally block ensures that certain code runs regardless of whether an error occurred or not, providing proper cleanup and actions.

**Conclusion**
CanvasArt is a well-structured web application that effectively incorporates classes, switch statements, and try-catch-finally statements to manage drawing modes, button states, and error conditions. This approach enhances the application's organization, user-friendliness, and robustness.
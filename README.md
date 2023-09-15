
# CanvasArt Application

CanvasArt is a web application that enables users to create digital art on a canvas. It offers features such as freehand drawing, erasing, brush size adjustment, color selection, canvas clearing, and artwork saving. In this write-up, we will provide instructions on how to use the application and offer a detailed explanation of how classes, switch statements, and try-catch-finally statements were employed to enhance its functionality.

## How to Use CanvasArt

1. **Drawing Modes**
   - **Freehand**: Click the "Freehand" button to enter freehand drawing mode. You can draw on the canvas by clicking and dragging the mouse.
   - **Eraser**: Click the "Eraser" button to enter eraser mode. You can erase parts of your artwork by clicking and dragging the mouse while in this mode.

2. **Brush Size**
   - Utilize the "Brush Size" slider to adjust the size of your brush or eraser. Slide it to the left for a smaller brush and to the right for a larger one.

3. **Color Picker**
   - Click the color picker to select a color for your brush. Choose any color you like to paint with.

4. **Clear Canvas**
   - Click the "Clear" button to clear the entire canvas and start fresh.

5. **Undo and Redo**
    - Undo: Click the "Undo" button to undo the last action you performed on the canvas. You can undo multiple steps.
    - Redo: Click the "Redo" button to redo an action that you previously undone. You can redo multiple steps.

6. **Save Artwork**
   - Click the "Save" button to save your artwork as a PNG image.

7. **Canvas Size**
   - Choose from the "Canvas Size" dropdown to change the size of your canvas (Small, Medium, Large).

## Incorporation of Classes, Switch Statements, and Try-Catch-Finally

Now, let's delve into how classes, switch statements, and try-catch-finally statements were thoughtfully integrated into the CanvasArt application. Here's the relevant code snippets and detailed explanations.

### Classes

The core structure of the CanvasArt application is built on the principles of object-oriented programming. The primary class, `CanvasArt`, serves as the blueprint for the application's functionality:

```javascript
class CanvasArt {
    constructor() {
        // Constructor code here...
         this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    }
    
    // Other methods...
}
```

**Explanation:**

- The `CanvasArt` class encapsulates the entire application, improving organization and maintainability.
- The constructor method initializes initial properties and sets up event listeners.
- Various methods within the class handle different aspects of the application, such as drawing, erasing, changing brush size, and saving the canvas.

### Switch Statements

Switch statements are employed in the CanvasArt application to manage different drawing modes and button states. Here are code segments and explanations of how switch statements are used:

**Handling Drawing Modes**

```javascript
handleDrawingMode(mode) {
    try {
        switch (mode) {
            case "freehand":
                this.drawingShape = false;
                this.erasing = false;
                this.toggleButtonActive("freehand");
                break;
            case "eraser":
                this.drawingShape = false;
                this.erasing = true;
                this.toggleButtonActive("eraser");
                break;
            case "text":
                this.drawingShape = false;
                this.erasing = false;
                this.textMode = true; // Turn on text mode
                this.toggleButtonActive("text");
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

- The `handleDrawingMode` method employs a switch statement to conditionally perform actions based on the selected drawing mode ("freehand," "eraser," or "text").
- In case an invalid mode is provided, it throws an error, which is caught and logged for proper error handling.

**Toggling Button Active State**

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

- The `toggleButtonActive` method utilizes switch statements to manage the active state of buttons based on the selected mode.
- For example, when in freehand mode, the "Freehand" button becomes active by adding a specific CSS class.

### Try-Catch-Finally Statements

Try-catch-finally statements are implemented in the CanvasArt application for error handling. Here's a code segment and an explanation:

```javascript
draw(event) {
    if (!this.painting) return;

    try {
        // Code that might throw an error, such as drawing operations...
        this.ctx.lineWidth = this.brushSize.value;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = this.erasing ? "#ffffff" : this.colorPicker.value;
        this.ctx.lineTo(
            event.clientX - this.canvas.getBoundingClientRect().left,
            event.clientY - this.canvas.getBoundingClientRect().top
        );
        this.ctx.stroke();
    } catch (error) {
        console.error("Error while drawing:", error.message);
    }
}

```

**Explanation:**

- Try-catch blocks are employed in methods such as `handleDrawingMode`, `toggleButtonActive`, and others to gracefully catch and handle potential errors.
- If an error occurs, the catch block executes, and an error message is logged to the console for debugging purposes.
- The finally block ensures that specific code runs regardless of whether an error occurred, ensuring proper cleanup and actions.

### Conclusion

CanvasArt is a well-structured web application that effectively incorporates classes, switch statements, and try-catch-finally statements. These programming concepts enhance the application's organization, user-friendliness, and robustness. It ensures that the application handles errors gracefully and provides an enjoyable digital art creation experience.

---

This write-up offers a comprehensive overview of how classes, switch statements, and try-catch-finally statements were thoughtfully incorporated into the CanvasArt application. These additions enhance the application's structure, user experience, and error-handling capabilities.
class CanvasArt {
    constructor() {
        try {
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.colorPicker = document.getElementById("colorPicker");
            this.brushSize = document.getElementById("brushSize");
            this.clearButton = document.getElementById("clearButton");
            this.saveButton = document.getElementById("saveButton");
            this.eraserButton = document.getElementById("eraserButton");
            this.canvasSizeSelect = document.getElementById("canvasSize");
            this.freehandButton = document.getElementById("freehandButton");
            this.undoButton = document.getElementById("undoButton");
            this.redoButton = document.getElementById("redoButton");
            this.undoStack = [];
            this.redoStack = [];
            this.painting = false;
            this.erasing = false;
            this.startX = 0;
            this.startY = 0;
            const initialCanvasState = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            this.undoStack.push(initialCanvasState);
            this.init();
        } catch (error) {
            console.error("Error initializing CanvasArt:", error.message);
        }
    }

    init() {
        try {
            this.addEventListeners();
            this.changeCanvasSize();
            this.handleDrawingMode("freehand");
        } catch (error) {
            console.error("Error initializing CanvasArt:", error.message);
        }
    }

    addEventListeners() {
        try {
            this.clearButton.addEventListener("click", () => this.clearCanvas());
            this.saveButton.addEventListener("click", () => this.saveCanvas());
            this.eraserButton.addEventListener("click", () => this.handleDrawingMode("eraser"));
            this.freehandButton.addEventListener("click", () => this.handleDrawingMode("freehand"));
            const canvas = document.getElementById("canvas");
            const canvasSizeSelect = document.getElementById("canvasSize");
            canvasSizeSelect.addEventListener("change", () => {
            const selectedWidth = canvasSizeSelect.value;
            canvas.width = selectedWidth;
            });

            this.canvas.addEventListener("mousedown", () => this.startDrawing());
            this.canvas.addEventListener("mouseup", () => this.endDrawing());
            this.canvas.addEventListener("mousemove", (e) => this.draw(e));
            this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
            this.brushSize.addEventListener("input", () => this.updateBrushSize());
            this.undoButton.addEventListener("click", () => this.undo());
            this.redoButton.addEventListener("click", () => this.redo());
        } catch (error) {
            console.error("Error adding event listeners:", error.message);
        }
    }

    startDrawing() {
        try {
            this.painting = true;
            this.startX = event.clientX - this.canvas.getBoundingClientRect().left;
            this.startY = event.clientY - this.canvas.getBoundingClientRect().top;
            this.ctx.beginPath();
            this.ctx.moveTo(this.startX, this.startY);
        } catch (error) {
            console.error("Error starting drawing:", error.message);
        }
    }

    endDrawing() {
        try {
            this.painting = false;
            this.ctx.closePath();
            this.addDrawingToUndoStack();
        } catch (error) {
            console.error("Error ending drawing:", error.message);
        }
    }

    addDrawingToUndoStack() {
        try {
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            this.undoStack.push(imageData);
            this.redoStack = [];
        } catch (error) {
            console.error("Error adding drawing to undo stack:", error.message);
        }
    }

    handleDrawingMode(mode) {
        try {
            switch (mode) {
                case "freehand":
                    this.erasing = false;
                    this.toggleButtonActive("freehand");
                    break;
                case "eraser":
                    this.erasing = true;
                    this.toggleButtonActive("eraser");
                    break;
                default:
                    throw new Error("Invalid drawing mode");
            }
        } catch (error) {
            console.error("Error handling drawing mode:", error.message);
        }
    }

    toggleButtonActive(mode) {
        try {
            this.freehandButton.classList.remove("active");
            this.eraserButton.classList.remove("active");

            switch (mode) {
                case "freehand":
                    this.freehandButton.classList.add("active");
                    break;
                case "eraser":
                    this.eraserButton.classList.add("active");
                    break;
                default:
                    throw new Error("Invalid button mode");
            }
        } catch (error) {
            console.error("Error toggling button active state:", error.message);
        }
    }

    undo() {
        try {
            if (this.undoStack.length > 1) {
                this.redoStack.push(this.undoStack.pop());
                this.ctx.putImageData(this.undoStack[this.undoStack.length - 1], 0, 0);
            }
        } catch (error) {
            console.error("Error undoing:", error.message);
        }
    }

    redo() {
        try {
            if (this.redoStack.length > 0) {
                this.undoStack.push(this.redoStack.pop());
                this.ctx.putImageData(this.undoStack[this.undoStack.length - 1], 0, 0);
            }
        } catch (error) {
            console.error("Error redoing:", error.message);
        }
    }

    clearCanvas() {
        try {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.addDrawingToUndoStack();
        } catch (error) {
            console.error("Error clearing canvas:", error.message);
        }
    }
    

    saveCanvas() {
        try {
            const image = this.canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = image;
            a.download = "canvas_art.png";
            a.click();
        } catch (error) {
            console.error("Error saving canvas:", error.message);
        }
    }

    changeCanvasSize() {
        try {
            const newSize = parseInt(this.canvasSizeSelect.value);
            this.canvas.width = newSize;
            this.canvas.height = newSize;
            this.clearCanvas();
            
            // Clear and reset the undo stack with the new canvas size
            this.undoStack = [];
            const initialCanvasState = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            this.undoStack.push(initialCanvasState);
        } catch (error) {
            console.error("Error changing canvas size:", error.message);
        }
    }
    
    

    draw(event) {
        try {
            if (!this.painting) return;
            this.ctx.lineWidth = this.brushSize.value;
            this.ctx.lineCap = "round";
            this.ctx.strokeStyle = this.erasing ? "#ffffff" : this.colorPicker.value;
            this.ctx.lineTo(
                event.clientX - this.canvas.getBoundingClientRect().left,
                event.clientY - this.canvas.getBoundingClientRect().top
            );
            this.ctx.stroke();
        } catch (error) {
            console.error("Error drawing:", error.message);
        }
    }

    updateBrushSize() {
        try {
            this.ctx.lineWidth = this.brushSize.value;
        } catch (error) {
            console.error("Error updating brush size:", error.message);
        }
    }
}

const canvasArt = new CanvasArt();

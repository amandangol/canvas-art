class CanvasArt {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.colorPicker = document.getElementById("colorPicker");
        this.brushSize = document.getElementById("brushSize");
        this.clearButton = document.getElementById("clearButton");
        this.saveButton = document.getElementById("saveButton");
        this.eraserButton = document.getElementById("eraserButton");
        this.canvasSizeSelect = document.getElementById("canvasSize");
        this.freehandButton = document.getElementById("freehandButton");
        this.circleButton = document.getElementById("circleButton");
        this.rectangleButton = document.getElementById("rectangleButton");
        this.painting = false;
        this.erasing = false;
        this.drawingShape = false;
        this.shapeType = "";
        this.startX = 0;
        this.startY = 0;
        this.init();
    }

    init() {
        this.addEventListeners();
        this.changeCanvasSize();
        this.handleDrawingMode("freehand");
    }

    addEventListeners() {
        this.clearButton.addEventListener("click", () => this.clearCanvas());
        this.saveButton.addEventListener("click", () => this.saveCanvas());
        this.eraserButton.addEventListener("click", () => this.handleDrawingMode("eraser"));
        this.circleButton.addEventListener("click", () => this.handleDrawingMode("circle"));
        this.rectangleButton.addEventListener("click", () => this.handleDrawingMode("rectangle"));
        this.freehandButton.addEventListener("click", () => this.handleDrawingMode("freehand"));
        this.canvasSizeSelect.addEventListener("change", () => this.changeCanvasSize());
        this.canvas.addEventListener("mousedown", (e) => this.startPosition(e));
        this.canvas.addEventListener("mouseup", () => this.endPosition());
        this.canvas.addEventListener("mousemove", (e) => this.draw(e));
        this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
        this.brushSize.addEventListener("input", () => this.updateBrushSize());
    }

    handleDrawingMode(mode) {
        try {
            switch (mode) {
                case "freehand":
                    this.drawingShape = false;
                    this.erasing = false;
                    break;
                case "eraser":
                    this.drawingShape = false;
                    this.erasing = true;
                    break;
                case "circle":
                    this.drawingShape = true;
                    this.shapeType = "circle";
                    this.erasing = false;
                    break;
                case "rectangle":
                    this.drawingShape = true;
                    this.shapeType = "rectangle";
                    this.erasing = false;
                    break;
                default:
                    throw new Error("Invalid drawing mode");
            }
            this.toggleButtonActive(mode);
        } catch (error) {
            console.error("Error handling drawing mode:", error.message);
        }
    }

    toggleButtonActive(mode) {
        try {
            this.freehandButton.classList.remove("active");
            this.circleButton.classList.remove("active");
            this.rectangleButton.classList.remove("active");
            this.eraserButton.classList.remove("active");

            switch (mode) {
                case "freehand":
                    this.freehandButton.classList.add("active");
                    break;
                case "circle":
                    this.circleButton.classList.add("active");
                    break;
                case "rectangle":
                    this.rectangleButton.classList.add("active");
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

    startPosition(e) {
        try {
            this.painting = true;
            this.startX = e.clientX - this.canvas.getBoundingClientRect().left;
            this.startY = e.clientY - this.canvas.getBoundingClientRect().top;
            this.draw(e);
        } catch (error) {
            console.error("Error starting position:", error.message);
        }
    }

    endPosition() {
        try {
            this.painting = false;
            this.ctx.beginPath();
            if (this.drawingShape) {
                this.drawShape();
                this.drawingShape = false;
            }
        } catch (error) {
            console.error("Error ending position:", error.message);
        }
    }

    draw(e) {
        try {
            if (!this.painting) return;
            this.ctx.lineWidth = this.brushSize.value;
            this.ctx.lineCap = "round";
            if (this.erasing) {
                this.ctx.strokeStyle = "#ffffff"; // White color for eraser
            } else {
                this.ctx.strokeStyle = this.colorPicker.value;
            }
            this.ctx.lineTo(
                e.clientX - this.canvas.getBoundingClientRect().left,
                e.clientY - this.canvas.getBoundingClientRect().top
            );
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(
                e.clientX - this.canvas.getBoundingClientRect().left,
                e.clientY - this.canvas.getBoundingClientRect().top
            );
        } catch (error) {
            console.error("Error drawing:", error.message);
        }
    }

    drawShape() {
        if (this.drawingShape) {
            const endX = e.clientX - this.canvas.getBoundingClientRect().left;
            const endY = e.clientY - this.canvas.getBoundingClientRect().top;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            if (this.shapeType === "circle") {
                const radius = Math.sqrt(
                    Math.pow(endX - this.startX, 2) + Math.pow(endY - this.startY, 2)
                );
                this.ctx.beginPath();
                this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
                this.ctx.stroke();
            } else if (this.shapeType === "rectangle") {
                this.ctx.beginPath();
                this.ctx.rect(this.startX, this.startY, endX - this.startX, endY - this.startY);
                this.ctx.stroke();
            }
        }
    }

    clearCanvas() {
        try {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
            console.error("Error while saving canvas:", error.message);
        }
    }

    changeCanvasSize() {
        try {
            const newSize = parseInt(this.canvasSizeSelect.value);
            this.canvas.width = newSize;
            this.canvas.height = newSize;
            this.clearCanvas();
        } catch (error) {
            console.error("Error changing canvas size:", error.message);
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

// Initialize the CanvasArt class
const canvasArt = new CanvasArt();

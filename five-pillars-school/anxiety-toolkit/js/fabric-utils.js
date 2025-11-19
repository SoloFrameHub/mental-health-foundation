/**
 * Fabric.js Utilities for Mental Health Education Platform
 * Reusable functions for creating interactive drawing exercises
 */

class FabricWellnessUtils {
    constructor(canvasId, options = {}) {
        this.canvas = new fabric.Canvas(canvasId, {
            backgroundColor: options.backgroundColor || '#ffffff',
            width: options.width || 1000,
            height: options.height || 600,
            isDrawingMode: false,
            selection: true
        });

        this.currentTool = 'select';
        this.currentColor = options.defaultColor || '#667eea';
        this.brushSize = options.defaultBrushSize || 5;
        this.history = [];
        this.historyStep = 0;

        this.initializeHistory();
    }

    // ============================================
    // HISTORY & UNDO/REDO
    // ============================================

    initializeHistory() {
        const self = this;
        this.canvas.on('object:added', function() {
            self.saveHistory();
        });
        this.canvas.on('object:modified', function() {
            self.saveHistory();
        });
        this.canvas.on('object:removed', function() {
            self.saveHistory();
        });
    }

    saveHistory() {
        const json = JSON.stringify(this.canvas.toJSON());
        this.history = this.history.slice(0, this.historyStep + 1);
        this.history.push(json);
        this.historyStep++;
    }

    undo() {
        if (this.historyStep > 0) {
            this.historyStep--;
            const previous = this.history[this.historyStep];
            this.canvas.loadFromJSON(previous, () => {
                this.canvas.renderAll();
            });
        }
    }

    redo() {
        if (this.historyStep < this.history.length - 1) {
            this.historyStep++;
            const next = this.history[this.historyStep];
            this.canvas.loadFromJSON(next, () => {
                this.canvas.renderAll();
            });
        }
    }

    // ============================================
    // DRAWING TOOLS
    // ============================================

    setTool(tool) {
        this.currentTool = tool;

        switch(tool) {
            case 'pencil':
                this.canvas.isDrawingMode = true;
                this.canvas.selection = false;
                this.canvas.freeDrawingBrush.color = this.currentColor;
                this.canvas.freeDrawingBrush.width = this.brushSize;
                break;
            case 'eraser':
                this.canvas.isDrawingMode = true;
                this.canvas.selection = false;
                this.canvas.freeDrawingBrush.color = '#ffffff';
                this.canvas.freeDrawingBrush.width = this.brushSize * 2;
                break;
            default:
                this.canvas.isDrawingMode = false;
                this.canvas.selection = true;
                break;
        }
    }

    setColor(color) {
        this.currentColor = color;
        if (this.canvas.isDrawingMode) {
            this.canvas.freeDrawingBrush.color = color;
        }
    }

    setBrushSize(size) {
        this.brushSize = size;
        if (this.canvas.isDrawingMode) {
            this.canvas.freeDrawingBrush.width = size;
        }
    }

    // ============================================
    // SHAPES
    // ============================================

    addCircle(x, y, options = {}) {
        const circle = new fabric.Circle({
            left: x,
            top: y,
            radius: options.radius || 50,
            fill: options.fill || this.currentColor,
            stroke: options.stroke || '#000',
            strokeWidth: options.strokeWidth || 0,
            opacity: options.opacity || 1
        });
        this.canvas.add(circle);
        return circle;
    }

    addRectangle(x, y, options = {}) {
        const rect = new fabric.Rect({
            left: x,
            top: y,
            width: options.width || 100,
            height: options.height || 100,
            fill: options.fill || this.currentColor,
            stroke: options.stroke || '#000',
            strokeWidth: options.strokeWidth || 0,
            opacity: options.opacity || 1,
            rx: options.rx || 0,
            ry: options.ry || 0
        });
        this.canvas.add(rect);
        return rect;
    }

    addTriangle(x, y, options = {}) {
        const triangle = new fabric.Triangle({
            left: x,
            top: y,
            width: options.width || 100,
            height: options.height || 100,
            fill: options.fill || this.currentColor,
            stroke: options.stroke || '#000',
            strokeWidth: options.strokeWidth || 0,
            opacity: options.opacity || 1
        });
        this.canvas.add(triangle);
        return triangle;
    }

    addLine(x1, y1, x2, y2, options = {}) {
        const line = new fabric.Line([x1, y1, x2, y2], {
            stroke: options.stroke || this.currentColor,
            strokeWidth: options.strokeWidth || 2,
            strokeDashArray: options.dashed ? [10, 5] : null
        });
        this.canvas.add(line);
        return line;
    }

    addArrow(x1, y1, x2, y2, options = {}) {
        const headLength = options.headLength || 20;
        const angle = Math.atan2(y2 - y1, x2 - x1);

        // Main line
        const line = new fabric.Line([x1, y1, x2, y2], {
            stroke: options.stroke || this.currentColor,
            strokeWidth: options.strokeWidth || 2
        });

        // Arrow head (two lines)
        const head1 = new fabric.Line([
            x2,
            y2,
            x2 - headLength * Math.cos(angle - Math.PI / 6),
            y2 - headLength * Math.sin(angle - Math.PI / 6)
        ], {
            stroke: options.stroke || this.currentColor,
            strokeWidth: options.strokeWidth || 2
        });

        const head2 = new fabric.Line([
            x2,
            y2,
            x2 - headLength * Math.cos(angle + Math.PI / 6),
            y2 - headLength * Math.sin(angle + Math.PI / 6)
        ], {
            stroke: options.stroke || this.currentColor,
            strokeWidth: options.strokeWidth || 2
        });

        const group = new fabric.Group([line, head1, head2]);
        this.canvas.add(group);
        return group;
    }

    // ============================================
    // TEXT
    // ============================================

    addText(text, x, y, options = {}) {
        const fabricText = new fabric.IText(text, {
            left: x,
            top: y,
            fontSize: options.fontSize || 20,
            fill: options.fill || this.currentColor,
            fontFamily: options.fontFamily || 'Arial',
            fontWeight: options.fontWeight || 'normal',
            fontStyle: options.fontStyle || 'normal',
            textAlign: options.textAlign || 'left'
        });
        this.canvas.add(fabricText);
        return fabricText;
    }

    addHeading(text, x, y, level = 1) {
        const sizes = { 1: 32, 2: 28, 3: 24 };
        return this.addText(text, x, y, {
            fontSize: sizes[level],
            fontWeight: 'bold',
            fill: this.currentColor
        });
    }

    // ============================================
    // WELLNESS-SPECIFIC TEMPLATES
    // ============================================

    createBodyOutline() {
        const bodyParts = [
            // Head
            this.addCircle(450, 50, { radius: 50, fill: 'transparent', stroke: '#ccc', strokeWidth: 2 }),
            // Body
            this.addRectangle(430, 120, { width: 90, height: 150, fill: 'transparent', stroke: '#ccc', strokeWidth: 2, rx: 20, ry: 20 }),
            // Left arm
            this.addRectangle(350, 130, { width: 75, height: 20, fill: 'transparent', stroke: '#ccc', strokeWidth: 2, rx: 10, ry: 10 }),
            // Right arm
            this.addRectangle(525, 130, { width: 75, height: 20, fill: 'transparent', stroke: '#ccc', strokeWidth: 2, rx: 10, ry: 10 }),
            // Left leg
            this.addRectangle(440, 270, { width: 30, height: 120, fill: 'transparent', stroke: '#ccc', strokeWidth: 2, rx: 10, ry: 10 }),
            // Right leg
            this.addRectangle(480, 270, { width: 30, height: 120, fill: 'transparent', stroke: '#ccc', strokeWidth: 2, rx: 10, ry: 10 })
        ];

        this.addText('Mark areas of tension, anxiety, or calm', 250, 450, {
            fontSize: 16,
            fill: '#6c757d',
            fontStyle: 'italic'
        });

        return bodyParts;
    }

    createEmotionWheel(segments = 8) {
        const centerX = 500;
        const centerY = 300;
        const radius = 200;

        const circle = this.addCircle(centerX - radius, centerY - radius, {
            radius: radius,
            fill: 'transparent',
            stroke: '#ccc',
            strokeWidth: 2
        });

        // Draw segment dividers
        for (let i = 0; i < segments; i++) {
            const angle = (Math.PI * 2 * i) / segments;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            this.addLine(centerX, centerY, x, y, { stroke: '#ccc' });
        }

        this.addText('Emotions', centerX - 40, centerY - 10, {
            fontSize: 18,
            fontWeight: 'bold'
        });

        return { circle, centerX, centerY, radius };
    }

    createGraph(options = {}) {
        const xStart = options.xStart || 100;
        const yStart = options.yStart || 500;
        const width = options.width || 800;
        const height = options.height || 400;

        // Axes
        const xAxis = this.addLine(xStart, yStart, xStart + width, yStart);
        const yAxis = this.addLine(xStart, yStart, xStart, yStart - height);

        // Y-axis labels
        const yLabels = options.yLabels || ['High', 'Medium', 'Low'];
        yLabels.forEach((label, i) => {
            this.addText(label, xStart - 60, yStart - height + (i * (height / (yLabels.length - 1))), {
                fontSize: 14
            });
        });

        // X-axis labels
        const xLabels = options.xLabels || ['Start', 'Middle', 'End'];
        xLabels.forEach((label, i) => {
            this.addText(label, xStart + (i * (width / (xLabels.length - 1))), yStart + 10, {
                fontSize: 14
            });
        });

        if (options.title) {
            this.addHeading(options.title, xStart + width / 2 - 100, yStart - height - 50, 2);
        }

        return { xAxis, yAxis, xStart, yStart, width, height };
    }

    createTimeline(points = 5) {
        const y = 300;
        const startX = 100;
        const endX = 900;
        const spacing = (endX - startX) / (points - 1);

        this.addLine(startX, y, endX, y, { strokeWidth: 4 });

        const timelinePoints = [];
        for (let i = 0; i < points; i++) {
            const x = startX + (i * spacing);
            const circle = this.addCircle(x - 10, y - 10, {
                radius: 10,
                fill: this.currentColor,
                stroke: '#5568d3',
                strokeWidth: 2
            });
            const text = this.addText(`Point ${i + 1}`, x - 25, y + 20, {
                fontSize: 14
            });
            timelinePoints.push({ circle, text, x, y });
        }

        return timelinePoints;
    }

    createMindMap(branches = 6) {
        const centerX = 500;
        const centerY = 300;
        const branchRadius = 150;

        // Center
        const center = this.addCircle(centerX - 60, centerY - 60, {
            radius: 60,
            fill: this.currentColor,
            stroke: '#5568d3',
            strokeWidth: 3
        });

        this.addText('Main\nIdea', centerX - 20, centerY - 10, {
            fontSize: 18,
            fill: 'white',
            fontWeight: 'bold'
        });

        // Branches
        const branchNodes = [];
        for (let i = 0; i < branches; i++) {
            const angle = (Math.PI * 2 * i) / branches;
            const x = centerX + Math.cos(angle) * branchRadius;
            const y = centerY + Math.sin(angle) * branchRadius;

            // Connection line
            this.addLine(centerX, centerY, x, y, { stroke: '#ccc' });

            // Branch circle
            const circle = this.addCircle(x - 30, y - 30, {
                radius: 30,
                fill: '#f8f9fa',
                stroke: this.currentColor,
                strokeWidth: 2
            });

            const text = this.addText(`Idea ${i + 1}`, x - 20, y - 8, {
                fontSize: 12
            });

            branchNodes.push({ circle, text, x, y });
        }

        return { center, branches: branchNodes };
    }

    createGrid(cellSize = 50) {
        // Vertical lines
        for (let i = 0; i <= this.canvas.width; i += cellSize) {
            this.addLine(i, 0, i, this.canvas.height, {
                stroke: '#e9ecef',
                strokeWidth: 1
            });
        }

        // Horizontal lines
        for (let i = 0; i <= this.canvas.height; i += cellSize) {
            this.addLine(0, i, this.canvas.width, i, {
                stroke: '#e9ecef',
                strokeWidth: 1
            });
        }
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    clear() {
        this.canvas.clear();
        this.canvas.backgroundColor = '#ffffff';
        this.canvas.renderAll();
        this.history = [];
        this.historyStep = 0;
    }

    deleteSelected() {
        const activeObjects = this.canvas.getActiveObjects();
        if (activeObjects.length) {
            activeObjects.forEach(obj => this.canvas.remove(obj));
            this.canvas.discardActiveObject();
            this.canvas.renderAll();
        }
    }

    clone() {
        const activeObjects = this.canvas.getActiveObjects();
        if (activeObjects.length) {
            activeObjects.forEach(obj => {
                obj.clone(cloned => {
                    cloned.set({
                        left: obj.left + 20,
                        top: obj.top + 20
                    });
                    this.canvas.add(cloned);
                });
            });
        }
    }

    bringToFront() {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            this.canvas.bringToFront(activeObject);
        }
    }

    sendToBack() {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            this.canvas.sendToBack(activeObject);
        }
    }

    // ============================================
    // SAVE/LOAD/EXPORT
    // ============================================

    save(key = 'canvas_data') {
        const json = this.canvas.toJSON();
        localStorage.setItem(key, JSON.stringify(json));
        localStorage.setItem(`${key}_timestamp`, new Date().toISOString());
        return json;
    }

    load(key = 'canvas_data') {
        const saved = localStorage.getItem(key);
        if (saved) {
            this.canvas.loadFromJSON(JSON.parse(saved), () => {
                this.canvas.renderAll();
            });
            return true;
        }
        return false;
    }

    exportJSON() {
        return this.canvas.toJSON();
    }

    exportSVG() {
        return this.canvas.toSVG();
    }

    exportPNG(quality = 1) {
        return this.canvas.toDataURL({
            format: 'png',
            quality: quality
        });
    }

    exportJPEG(quality = 0.8) {
        return this.canvas.toDataURL({
            format: 'jpeg',
            quality: quality
        });
    }

    downloadPNG(filename = 'drawing.png') {
        const dataURL = this.exportPNG();
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataURL;
        link.click();
    }

    downloadSVG(filename = 'drawing.svg') {
        const svg = this.exportSVG();
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }

    // ============================================
    // HELPERS
    // ============================================

    getCenter() {
        return {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
    }

    getCursorPosition(event) {
        const rect = this.canvas.upperCanvasEl.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    setBackgroundColor(color) {
        this.canvas.backgroundColor = color;
        this.canvas.renderAll();
    }

    setBackgroundImage(url, callback) {
        fabric.Image.fromURL(url, img => {
            this.canvas.setBackgroundImage(img, callback, {
                scaleX: this.canvas.width / img.width,
                scaleY: this.canvas.height / img.height
            });
        });
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FabricWellnessUtils;
}

class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        this.drawRectangle({x:250,y:200}, {x:400,y:500}, [34,134,34,255], ctx)
        this.drawRectangle({x:350,y:250}, {x:600,y:350}, [115,79,150,255], ctx)
        this.drawRectangle({x:550,y:450}, {x:600,y:500}, [188,56,35,255], ctx)
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        this.drawCircle({x:450,y:150}, 50, [3, 227, 252, 255], ctx)
        this.drawCircle({x:350,y:250}, 350, [115,79,150,255], ctx)
        this.drawCircle({x:250,y:250}, 150, [34,134,34,255], ctx)
        this.drawCircle({x:550,y:400}, 200, [188,56,35,255], ctx)

    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        this.drawBezierCurve({x:50,y:300}, {x:50,y:500}, {x:200,y:500}, {x:200,y:200}, [3, 227, 252, 255], ctx)
        this.drawBezierCurve({x:250,y:500}, {x:250,y:200}, {x:400,y:500}, {x:400,y:350}, [115,79,150,255], ctx)
        this.drawBezierCurve({x:450,y:200}, {x:550,y:350}, {x:600,y:25}, {x:450,y:150}, [34,134,34,255], ctx)
        this.drawBezierCurve({x:300,y:100}, {x:350,y:300}, {x:700,y:350}, {x:750,y:600}, [188,56,35,255], ctx)
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        this.drawBezierCurve({x:50,y:300}, {x:50,y:200}, {x:200,y:200}, {x:200,y:500}, [245, 179, 66, 255], ctx)
        this.drawCircle({x:250,y:350}, 50, [3, 227, 252, 255], ctx)
        this.drawBezierCurve({x:125,y:150}, {x:425,y:50}, {x:225,y:this.canvas.height + 50}, {x:525,y:this.canvas.height-50}, [99, 66, 245,255], ctx)
        //E
        this.drawLine({x:325,y:275}, {x:375,y:400}, [66, 245, 132, 255], ctx)
        this.drawLine({x:375,y:400}, {x:450,y:400}, [66, 245, 132, 255], ctx)
        this.drawLine({x:350,y:345}, {x:425,y:345}, [66, 245, 132, 255], ctx)
        this.drawLine({x:325,y:275}, {x:400,y:275}, [66, 245, 132, 255], ctx)
        this.drawBezierCurve({x:375,y:125}, {x:425,y:400}, {x:525,y:450}, {x:425,y:275}, [242, 66, 245,255], ctx)
        //H
        this.drawLine({x:475,y:275}, {x:525,y:400}, [66, 158, 245, 255], ctx)
        this.drawLine({x:475,y:345}, {x:625,y:345}, [66, 158, 245, 255], ctx)
        this.drawLine({x:500,y:150}, {x:650,y:525}, [66, 158, 245, 255], ctx)
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {

        const left_top = {x:left_bottom.x, y:right_top.y}
        const right_bottom = {x:right_top.x, y:left_bottom.y}

        this.drawLine(left_bottom, left_top, color, ctx)
        this.drawLine(left_top, right_top, color, ctx)
        this.drawLine(right_top, right_bottom, color, ctx)
        this.drawLine(right_bottom, left_bottom, color, ctx)

        // Draw Points
        if(this.show_points){
            this.drawLine(left_bottom, {x:left_bottom.x+1,y:left_bottom.y+1}, [0,0,0,255], ctx)
            this.drawLine(left_top, {x:left_top.x+1,y:left_top.y+1}, [0,0,0,255], ctx)
            this.drawLine(right_top, {x:right_top.x+1,y:right_top.y+1}, [0,0,0,255], ctx)
            this.drawLine(right_bottom, {x:right_bottom.x+1,y:right_bottom.y+1}, [0,0,0,255], ctx)
            
            this.drawLine(left_bottom, {x:left_bottom.x-1,y:left_bottom.y-1}, [0,0,0,255], ctx)
            this.drawLine(left_top, {x:left_top.x-1,y:left_top.y-1}, [0,0,0,255], ctx)
            this.drawLine(right_top, {x:right_top.x-1,y:right_top.y-1}, [0,0,0,255], ctx)
            this.drawLine(right_bottom, {x:right_bottom.x-1,y:right_bottom.y-1}, [0,0,0,255], ctx)
        }

    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        
        const twopi = Math.PI*2
        let radians = twopi/this.num_curve_sections
        let theta = 0

        while(theta < twopi) {
            let x0 = center.x + (radius * Math.cos(theta))
            let y0 = center.y + (radius * Math.sin(theta))
            let x1 = center.x + (radius * Math.cos(theta + radians))
            let y1 = center.y + (radius * Math.sin(theta + radians))


            // Draw Points
            if(this.show_points){
                
                // Draw Center
                this.drawLine(center, {x:center.x+1,y:center.y+1}, [0,0,0,255], ctx)
                // Draw Verticies
                this.drawLine({x:x0,y:y0}, {x:x0+1,y:y0+1}, [0,0,0,255], ctx)
                this.drawLine({x:x0,y:y0}, {x:x0+1,y:y0+1}, [0,0,0,255], ctx)
                this.drawLine({x:x0,y:y0}, {x:x0+1,y:y0+1}, [0,0,0,255], ctx)
                this.drawLine({x:x0,y:y0}, {x:x0+1,y:y0+1}, [0,0,0,255], ctx)
            }


            this.drawLine({x:x0,y:y0}, {x:x1,y:y1}, color, ctx)

            // Shift Color
            color = this.shiftColor(color)

            // Increment Theta
            theta = radians + theta
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        
        let i = 0
        let t = 0

        while(i<this.num_curve_sections){

            // x0, y0
            let x0 = (Math.pow((1-t),3) * pt0.x) + (3 * Math.pow((1-t),2) * t * pt1.x) + (3 * (1-t) * Math.pow(t,2) * pt2.x) + (Math.pow(t,3)*pt3.x)
            let y0 = (Math.pow((1-t),3) * pt0.y) + (3 * Math.pow((1-t),2) * t * pt1.y) + (3 * (1-t) * Math.pow(t,2) * pt2.y) + (Math.pow(t,3)*pt3.y)

            // Increment t and i
            t += 1/this.num_curve_sections
            i++

            // Draw Points
            if(this.show_points){
                // Draw Verticies
                this.drawLine({x:x0-1,y:y0-1}, {x:x0+1,y:y0+1}, [0,0,0,255], ctx)
            }
        
            // x1, y1
            let x1 = (Math.pow((1-t),3) * pt0.x) + (3 * Math.pow((1-t),2) * t * pt1.x) + (3 * (1-t) * Math.pow(t,2) * pt2.x) + (Math.pow(t,3)*pt3.x)
            let y1 = (Math.pow((1-t),3) * pt0.y) + (3 * Math.pow((1-t),2) * t * pt1.y) + (3 * (1-t) * Math.pow(t,2) * pt2.y) + (Math.pow(t,3)*pt3.y)
        
            this.drawLine({x:x0,y:y0}, {x:x1,y:y1}, this.shiftColor(color), ctx)
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }





    /**
     * 
     * Conversion algorithms adapted from https://gist.github.com/mjackson/5311256
     * which were adapted from wikipedia
     */
        shiftColor(color) {

            let h = this.rgbToHsv(color[0],color[1],color[2])*360

            h += (360/this.num_curve_sections)

            h = h/360
            let s = 1
            let v = 1
    
            let r, g, b;
    
            let i = Math.floor(h * 6);
            let f = h * 6 - i;
            let p = v * (1 - s);
            let q = v * (1 - f * s);
            let t = v * (1 - (1 - f) * s);
          
            switch (i % 6) {
              case 0: r = v, g = t, b = p; break;
              case 1: r = q, g = v, b = p; break;
              case 2: r = p, g = v, b = t; break;
              case 3: r = p, g = q, b = v; break;
              case 4: r = t, g = p, b = v; break;
              case 5: r = v, g = p, b = q; break;
            }
          
            return [r*255 , g*255 , b*255 , 255];
        }
    
        rgbToHsv(r, g, b) {
            r /= 255, g /= 255, b /= 255;
          
            let max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h = max;
          
            let d = max - min;
          
            if (max == min) {
              h = 0; // achromatic
            } else {
              switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
              }
          
              h /= 6;
            }
          
            return h;
        }
};

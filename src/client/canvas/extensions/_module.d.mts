import * as PixiGraphicsSmooth from "@pixi/graphics-smooth";
import * as PixiParticles from "@pixi/particle-emitter";
import PixiJS from "pixi.js";

export { default as extendPIXICircle } from "./circle-extension.mjs";
export { default as extendPIXIGraphics } from "./graphics-extension.mjs";
export { default as extendPIXIPolygon } from "./polygon-extension.mjs";
export { default as extendPIXIRectangle } from "./rectangle-extension.mjs";

declare module "pixi.js" {
    export import LegacyGraphics = PixiJS.Graphics;
    export import smooth = PixiGraphicsSmooth;
    export import particles = PixiParticles;

    export namespace Circle {
        /**
         * The recommended vertex density for the regular polygon approximation of a circle of a given radius.
         * Small radius circles have fewer vertices. The returned value will be rounded up to the nearest integer.
         * See the formula described at:
         * https://math.stackexchange.com/questions/4132060/compute-number-of-regular-polgy-sides-to-approximate-circle-to-defined-precision
         * @param radius Circle radius
         * @param epsilon The maximum tolerable distance between an approximated line segment and the true radius.
         *   A larger epsilon results in fewer points for a given radius.
         * @returns The number of points for the approximated polygon
         */
        function approximateVertexDensity(radius: number, epsilon?: number): number;
    }

    export interface Circle {
        /**
         * Determine the center of the circle.
         * Trivial, but used to match center method for other shapes.
         */
        readonly center: PIXI.Point;

        /**
         * Determine if a point is on or nearly on this circle.
         * @param point Point to test
         * @param epsilon Tolerated margin of error
         * @returns Is the point on the circle within the allowed tolerance?
         */
        pointIsOn(point: Point, epsilon?: number): boolean;

        /**
         * Get all intersection points on this circle for a segment A|B
         * Intersections are sorted from A to B.
         * @param a The first endpoint on segment A|B
         * @param b The second endpoint on segment A|B
         * @returns Points where the segment A|B intersects the circle
         */
        segmentIntersections(a: Point, b: Point): Point[];

        /**
         * Calculate an x,y point on this circle's circumference given an angle
         * 0: due east
         * π / 2: due south
         * π or -π: due west
         * -π/2: due north
         * @param angle Angle of the point, in radians
         * @returns The point on the circle at the given angle
         */
        pointAtAngle(angle: number): Point;

        /**
         * Get all the points for a polygon approximation of this circle between two points.
         * The two points can be anywhere in 2d space. The intersection of this circle with the line from this circle center
         * to the point will be used as the start or end point, respectively.
         * This is used to draw the portion of the circle (the arc) between two intersection points on this circle.
         * @param a Point in 2d space representing the start point
         * @param b Point in 2d space representing the end point
         * @param options Options passed on to the pointsForArc method
         * @returns An array of points arranged clockwise from start to end
         */
        pointsBetween(a: Point, b: Point, options: object): Point[];

        /**
         * Get the points that would approximate a circular arc along this circle, given a starting and ending angle.
         * Points returned are clockwise. If from and to are the same, a full circle will be returned.
         * @param fromAngle Starting angle, in radians. π is due north, π/2 is due east
         * @param toAngle Ending angle, in radians
         * @param options Options which affect how the circle is converted
         * @param options.density The number of points which defines the density of approximation
         * @param options.includeEndpoints Whether to include points at the circle where the arc starts and ends
         * @returns An array of points along the requested arc
         */
        pointsForArc(fromAngle: number, toAngle: number, options?: { density?: number; includeEndpoints?: boolean }): Point[];

        /**
         * Approximate this PIXI.Circle as a PIXI.Polygon
         * @param options Options forwarded on to the pointsForArc method
         * @returns The Circle expressed as a PIXI.Polygon
         */
        toPolygon(options: object): PIXI.Polygon;

        /**
         * Intersect this PIXI.Circle with a PIXI.Polygon.
         * @param polygon A PIXI.Polygon
         * @param options Options which configure how the intersection is computed
         * @param options.density The number of points which defines the density of approximation
         * @param options.scalingFactor A scaling factor passed to Polygon#toClipperPoints to preserve precision
         * @param options.clipType The clipper clip type
         * @param options.weilerAtherton Use the Weiler-Atherton algorithm. Otherwise, use Clipper.
         * @returns The intersected polygon
         */
        intersectPolygon(
            polygon: PIXI.Polygon,
            options?: {
                density?: number;
                scalingFactor?: number;
                clipType?: ClipperLib.ClipType;
                weilerAtherton?: boolean;
            },
        ): PIXI.Polygon;

        /**
         * Intersect this PIXI.Circle with an array of ClipperPoints.
         * Convert the circle to a Polygon approximation and use intersectPolygon.
         * In the future we may replace this with more specialized logic which uses the line-circle intersection formula.
         * @param clipperPoints Array of ClipperPoints generated by PIXI.Polygon.toClipperPoints()
         * @param options Options which configure how the intersection is computed
         * @param options.density The number of points which defines the density of approximation
         * @param options.scalingFactor A scaling factor passed to Polygon#toClipperPoints to preserve precision
         * @returns The intersected polygon
         */
        intersectClipper(clipperPoints: Point[], options?: { density?: number; scalingFactor?: number }): Point[];
    }

    export interface Graphics {
        /**
         * Draws a path.
         * @param path The polygon or points.
         * @returns This Graphics instance.
         */
        drawPath(path: number[] | PIXI.IPointData[] | PIXI.Polygon): PIXI.Graphics;
        drawPath(...path: number[] | PIXI.IPointData[]): PIXI.Graphics;

        /**
         * Draws a smoothed polygon.
         * @param path The polygon or points.
         * @param smoothing The smoothness in the range [0, 1]. 0: no smoothing; 1: maximum smoothing.
         * @returns This Graphics instance.
         */
        drawSmoothedPolygon(path: number[] | PIXI.IPointData[] | PIXI.Polygon, smoothing?: number): PIXI.Graphics;
        drawSmoothedPolygon(...args: [number, number, ...number[]]): PIXI.Graphics;
        drawSmoothedPolygon(...args: [...PIXI.IPointData[], PIXI.IPointData | number]): PIXI.Graphics;

        /**W
         * Draws a smoothed path.
         * @param path The polygon or points.
         * @param smoothing The smoothness in the range [0, 1]. 0: no smoothing; 1: maximum smoothing.
         */
        drawSmoothedPath(path: number[] | PIXI.IPointData[] | PIXI.Polygon, smoothing?: number): PIXI.Graphics;
        drawSmoothedPath(...args: [number, number, ...number[]]): PIXI.Graphics;
        drawSmoothedPath(...args: [...PIXI.IPointData[], PIXI.IPointData | number]): PIXI.Graphics;
    }

    export namespace Polygon {
        /**
         * Construct a PIXI.Polygon instance from an array of clipper points [{X,Y}, ...].
         * @param points An array of points returned by clipper
         * @param options Options which affect how canvas points are generated
         * @param options.scalingFactor A scaling factor used to preserve floating point precision
         * @returns The resulting PIXI.Polygon
         */
        function fromClipperPoints(points: Point[], options?: { scalingFactor?: number }): PIXI.Polygon;
    }

    export interface Polygon {
        /**
         * Test whether the polygon is has a positive signed area.
         * Using a y-down axis orientation, this means that the polygon is "clockwise".
         */
        readonly isPositive: boolean;

        /** Clear the cached signed orientation. */
        clearCache(): void;

        /**
         * Compute the signed area of polygon using an approach similar to ClipperLib.Clipper.Area.
         * The math behind this is based on the Shoelace formula. https://en.wikipedia.org/wiki/Shoelace_formula.
         * The area is positive if the orientation of the polygon is positive.
         * @returns The signed area of the polygon
         */
        signedArea(): number;

        /**
         * Reverse the order of the polygon points in-place, replacing the points array into the polygon.
         * Note: references to the old points array will not be affected.
         * @returns This polygon with its orientation reversed
         */
        reverseOrientation(): PIXI.Polygon;

        /**
         * Add a de-duplicated point to the Polygon.
         * @param point The point to add to the Polygon
         * @returns A reference to the polygon for method chaining
         */
        addPoint(point: Point): PIXI.Polygon;

        /**
         * Return the bounding box for a PIXI.Polygon.
         * The bounding rectangle is normalized such that the width and height are non-negative.
         * @returns The bounding PIXI.Rectangle
         */
        getBounds(): PIXI.Rectangle;

        /**
         * Convert a PIXI.Polygon into an array of clipper points [{X,Y}, ...].
         * Note that clipper points must be rounded to integers.
         * In order to preserve some amount of floating point precision, an optional scaling factor may be provided.
         * @param options Options which affect how clipper points are generated
         * @param options.scalingFactor A scaling factor used to preserve floating point precision
         * @returns  An array of points to be used by clipper
         */
        toClipperPoints(options?: { scalingFactor?: number }): Point[];

        /** Determine whether the PIXI.Polygon is closed, defined by having the same starting and ending point. */
        readonly isClosed: boolean;

        /**
         * Intersect this PIXI.Polygon with another PIXI.Polygon using the clipper library.
         * @param other Another PIXI.Polygon
         * @param options Options which configure how the intersection is computed
         * @param options.clipType The clipper clip type
         * @param options.scalingFactor A scaling factor passed to Polygon#toClipperPoints to preserve precision
         * @returns The intersected polygon
         */
        intersectPolygon(other: PIXI.Polygon, options?: { clipType?: ClipperLib.ClipType; scalingFactor?: number }): PIXI.Polygon;

        /**
         * Intersect this PIXI.Polygon with an array of ClipperPoints.
         * @param clipperPoints Array of clipper points generated by PIXI.Polygon.toClipperPoints()
         * @param options Options which configure how the intersection is computed
         * @param options.clipType The clipper clip type
         * @param options.scalingFactor A scaling factor passed to Polygon#toClipperPoints to preserve precision
         * @returns The resulting ClipperPaths
         */
        intersectClipper(clipperPoints: Point[], options?: { clipType?: ClipperLib.ClipType; scalingFactor?: number }): Point[];

        /**
         * Intersect this PIXI.Polygon with a PIXI.Circle.
         * For now, convert the circle to a Polygon approximation and use intersectPolygon.
         * In the future we may replace this with more specialized logic which uses the line-circle intersection formula.
         * @param circle A PIXI.Circle
         * @param options Options which configure how the intersection is computed
         * @param options.density The number of points which defines the density of approximation
         * @param options.scalingFactor A scaling factor passed to Polygon#toClipperPoints to preserve precision
         * @param options.clipType The clipper clip type
         * @returns The intersected polygon
         */
        intersectCircle(circle: PIXI.Circle, options?: { density?: number; scalingFactor?: number; clipType?: ClipperLib.ClipType }): PIXI.Polygon;

        /**
         * Intersect this PIXI.Polygon with a PIXI.Rectangle.
         * For now, convert the rectangle to a Polygon and use intersectPolygon.
         * In the future we may replace this with more specialized logic which uses the line-line intersection formula.
         * @param rect A PIXI.Rectangle
         * @param options Options which configure how the intersection is computed
         * @param options.clipType The clipper clip type
         * @param options.scalingFactor A scaling factor passed to Polygon#toClipperPoints to preserve precision
         * @returns The intersected polygon
         */
        intersectRectangle(rect: PIXI.Rectangle, options?: { clipType?: ClipperLib.ClipType; scalingFactor?: number }): PIXI.Polygon;
    }

    export namespace Rectangle {
        /**
         * Bit code labels splitting a rectangle into zones, based on the Cohen-Sutherland algorithm.
         * See https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm
         *          left    central   right
         * top      1001    1000      1010
         * central  0001    0000      0010
         * bottom   0101    0100      0110
         */
        enum CS_ZONES {
            INSIDE = 0x0000,
            LEFT = 0x0001,
            RIGHT = 0x0010,
            TOP = 0x1000,
            BOTTOM = 0x0100,
            TOPLEFT = 0x1001,
            TOPRIGHT = 0x1010,
            BOTTOMRIGHT = 0x0110,
            BOTTOMLEFT = 0x0101,
        }
    }

    export interface Rectangle {
        /** Calculate center of this rectangle. */
        readonly center: Point;

        /**
         * Return the bounding box for a PIXI.Rectangle.
         * The bounding rectangle is normalized such that the width and height are non-negative.
         */
        getBounds(): PIXI.Rectangle;

        /**
         * Determine if a point is on or nearly on this rectangle.
         * @param p Point to test
         * @returns Is the point on the rectangle boundary?
         */
        pointIsOn(p: Point): boolean;

        /**
         * Calculate the rectangle Zone for a given point located around, on, or in the rectangle.
         * See https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm
         * This differs from _getZone in how points on the edge are treated: they are not considered inside.
         * @param point A point to test for location relative to the rectangle
         * @returns Which edge zone does the point belong to?
         */
        _getEdgeZone(point: Point): PIXI.Rectangle.CS_ZONES;

        /**
         * Get all the points (corners) for a polygon approximation of a rectangle between two points on the rectangle.
         * The two points can be anywhere in 2d space on or outside the rectangle.
         * The starting and ending side are based on the zone of the corresponding a and b points.
         * (See PIXI.Rectangle.CS_ZONES.)
         * This is the rectangular version of PIXI.Circle.prototype.pointsBetween, and is similarly used
         * to draw the portion of the shape between two intersection points on that shape.
         * @param a A point on or outside the rectangle, representing the starting position.
         * @param b A point on or outside the rectangle, representing the starting position.
         * @returns Points returned are clockwise from start to end.
         */
        pointsBetween(a: Point, b: Point): Point[];

        /**
         * Get all intersection points for a segment A|B
         * Intersections are sorted from A to B.
         * @param a Endpoint A of the segment
         * @param b Endpoint B of the segment
         * @returns Array of intersections or empty if no intersection.
         *  If A|B is parallel to an edge of this rectangle, returns the two furthest points on
         *  the segment A|B that are on the edge.
         *  The return object's t0 property signifies the location of the intersection on segment A|B.
         *  This will be NaN if the segment is a point.
         *  The return object's t1 property signifies the location of the intersection on the rectangle edge.
         *  The t1 value is measured relative to the intersecting edge of the rectangle.
         */
        segmentIntersections(a: Point, b: Point): Point[];

        /**
         * Compute the intersection of this Rectangle with some other Rectangle.
         * @param other Some other rectangle which intersects this one
         * @returns The intersected rectangle
         */
        intersection(other: PIXI.Rectangle): PIXI.Rectangle;

        /**
         * Convert this PIXI.Rectangle into a PIXI.Polygon
         * @returns The Rectangle expressed as a PIXI.Polygon
         */
        toPolygon(): PIXI.Polygon;

        /**
         * Get the left edge of this rectangle.
         * The returned edge endpoints are oriented clockwise around the rectangle.
         */
        readonly leftEdge: { A: Point; B: Point };

        /**
         * Get the right edge of this rectangle.
         * The returned edge endpoints are oriented clockwise around the rectangle.
         */
        readonly rightEdge: { A: Point; B: Point };

        /**
         * Get the top edge of this rectangle.
         * The returned edge endpoints are oriented clockwise around the rectangle.
         */
        readonly topEdge: { A: Point; B: Point };

        /**
         * Get the bottom edge of this rectangle.
         * The returned edge endpoints are oriented clockwise around the rectangle.
         */
        readonly bottomEdge: { A: Point; B: Point };

        /**
         * Calculate the rectangle Zone for a given point located around or in the rectangle.
         * https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm
         *
         * @param p Point to test for location relative to the rectangle
         */
        _getZone(p: Point): PIXI.Rectangle.CS_ZONES;

        /**
         * Test whether a line segment AB intersects this rectangle.
         * @param a The first endpoint of segment AB
         * @param b The second endpoint of segment AB
         * @param options Options affecting the intersect test.
         * @param options.inside If true, a line contained within the rectangle will return true.
         * @returns True if intersects.
         */
        lineSegmentIntersects(a: Point, b: Point, options?: { inside?: boolean }): boolean;

        /**
         * Intersect this PIXI.Rectangle with a PIXI.Polygon.
         * Currently uses the clipper library.
         * In the future we may replace this with more specialized logic which uses the line-line intersection formula.
         * @param polygon A PIXI.Polygon
         * @param options Options which configure how the intersection is computed
         * @param options.clipType The clipper clip type
         * @param options.scalingFactor A scaling factor passed to Polygon#toClipperPoints for precision
         * @param options.weilerAtherton Use the Weiler-Atherton algorithm. Otherwise, use Clipper.
         * @param options.canMutate If the WeilerAtherton constructor could mutate or not
         * @returns The intersected polygon
         */
        intersectPolygon(
            polygon: PIXI.Polygon,
            options?: { clipType?: ClipperLib.ClipType; scalingFactor?: number; weilerAtherton?: boolean; canMutate?: boolean },
        ): PIXI.Polygon;

        /**
         * Intersect this PIXI.Rectangle with an array of ClipperPoints. Currently, uses the clipper library.
         * In the future we may replace this with more specialized logic which uses the line-line intersection formula.
         * @param clipperPoints An array of ClipperPoints generated by PIXI.Polygon.toClipperPoints()
         * @param options Options which configure how the intersection is computed
         * @param options.clipType The clipper clip type
         * @param options.scalingFactor A scaling factor passed to Polygon#toClipperPoints to preserve precision
         * @returns The array of intersection points
         */
        intersectClipper(clipperPoints: Point[], options?: { clipType?: ClipperLib.ClipType; scalingFactor?: number }): Point[];

        /**
         * Determine whether some other Rectangle overlaps with this one.
         * This check differs from the parent class Rectangle#intersects test because it is true for adjacency (zero area).
         * @param other Some other rectangle against which to compare
         * @returns Do the rectangles overlap?
         */
        overlaps(other: PIXI.Rectangle): boolean;

        /**
         * Normalize the width and height of the rectangle in-place, enforcing that those dimensions be positive.
         */
        normalize(): PIXI.Rectangle;

        /**
         * Fits this rectangle around this rectangle rotated around the given pivot counterclockwise by the given angle in
         * radians.
         * @param radians The angle of rotation.
         * @param pivot An optional pivot point (normalized).
         * @returns This rectangle.
         */
        rotate(radians: number, pivot?: PIXI.Point): PIXI.Rectangle;

        /**
         * Create normalized rectangular bounds given a rectangle shape and an angle of central rotation.
         * @param x The top-left x-coordinate of the un-rotated rectangle
         * @param y The top-left y-coordinate of the un-rotated rectangle
         * @param width The width of the un-rotated rectangle
         * @param height The height of the un-rotated rectangle
         * @param radians The angle of rotation about the center
         * @param pivot An optional pivot point (if not provided, the pivot is the centroid)
         * @returns The constructed rotated rectangle bounds
         */
        fromRotation(x: number, y: number, width: number, height: number, radians: number, pivot?: PIXI.Point): PIXI.Rectangle;
    }
}

export enum LineMotion {
    TOP_BOTTOM,
    BOTTOM_TOP,
    LEFT_RIGHT,
    RIGHT_LEFT
}

export enum PointCirclePosition {
    INSIDE,
    ON_EDGE,
    OUTSIDE,
    UNKNOWN
}

export enum PointLinePosition {
    BEFORE_EDGE,
    ON_EDGE,
    AFTER_EDGE,
    UNKNOWN
}

export interface Coord3D {
    x?: number,
    y?: number,
    z?: number
}

export interface ColorRGB {
    r: number,
    g: number,
    b: number
}

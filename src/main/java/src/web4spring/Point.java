package src.web4spring;

public class Point {
    private double x;
    private double y;
    private double r;
    private boolean hit;
    public Point(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public void setX(double x) {
        this.x = x;
    }
    public void setY(double y) {
        this.y = y;
    }
    public void setR(double r) {
        this.r = r;
    }
    public double getX() {
        return x;
    }
    public double getY() {
        return y;
    }
    public double getR() {
        return r;
    }
    public boolean isHit() {
        if (x <= 0 && y >= 0 && x >= -r && y <= r) {
            return true;
        }else if (x <= 0 && y <= r && x*x + y*y <= r*r) {
            return true;
        }else if (x >=0 && y >= 0 && y <= -x / 2 + r/2){
            return true;
        }else{
            return false;
        }
    }
}

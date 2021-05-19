export function getBrightness(bgColor) {
    var color = bgColor.substring(1, 7);
    var r = parseInt(color.substring(0, 2), 16); 
    var g = parseInt(color.substring(2, 4), 16); 
    var b = parseInt(color.substring(4, 6), 16); 
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? '#003e4f' : '#ffffff';
}
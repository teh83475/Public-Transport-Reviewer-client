export const ratingColor = (rating:number) => {
  const red = Math.floor((Math.max(5-rating,0))*30+120).toString(16).padStart(2, '0');
  const green = Math.floor((Math.max(rating-1,0))*30+100).toString(16).padStart(2, '0');
  const blue = "00";
  return "#"+red+green+blue;
}

export const ratingColorBorder = (rating:number) => {
  const red = Math.floor((Math.max(5-rating,0))*30+150).toString(16).toUpperCase().padStart(2, '0');
  const green = Math.floor((Math.max(rating-1,0))*30+130).toString(16).toUpperCase().padStart(2, '0');
  const blue = "00";
  return "#"+red+green+blue;
}


const GENERAL_COLORS = (i, transparency = 0.5) => [
    `rgba(255, 99, 132, ${transparency})`,
    `rgba(54, 162, 235, ${transparency})`,
    `rgba(255, 206, 86, ${transparency})`,
    `rgba(75, 192, 192, ${transparency})`,
    `rgba(153, 102, 255, ${transparency})`,
    `rgba(255, 159, 64, ${transparency})`]
                                    [i%6];
export {GENERAL_COLORS};

//TODO: Add the rest of colors
const GENDER_COLORS = {Male : '#7ad8f5', Female : '#9d5783'};
export {GENDER_COLORS}
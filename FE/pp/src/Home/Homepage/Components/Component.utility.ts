export function getCircleColorForSpent(spentpercent: number) {
    if (spentpercent >= 76) {
      return "rgba(0, 128, 0, 1)"; // Dark green for 100 to 76
    } else if (spentpercent >= 51) {
      return "rgba(173, 216, 47, 1)"; // Yellow green for 75 to 51
    } else if (spentpercent >= 26) {
      return "rgba(255, 140, 0, 1)"; // Orange for 50 to 26
    } else {
      return "rgba(255, 0, 0, 1)"; // Red for 25 to 0
    }
}

export function getCircleColorForSavings(savingsPercent: number) {
    if (savingsPercent >= 76) {
      return "rgba(0, 128, 0, 1)"; // Dark green for 100 to 76
    } else if (savingsPercent >= 51) {
      return "rgba(173, 216, 47, 1)"; // Yellow green for 75 to 51
    } else if (savingsPercent >= 26) {
      return "rgba(255, 140, 0, 1)"; // Orange for 50 to 26
    } else {
      return "rgba(255, 0, 0, 1)"; // Red for 25 to 0
    }
}
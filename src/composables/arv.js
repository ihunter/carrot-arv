export function useARV(comps, subject, constants, trendAdjust = false) {
  function calculateARV() {
    let weightedAVG = 0.0;
    let scoreSum = 0.0;

    for (let comp of comps) {
      if (!comp.suggestedDiscard) {
        let updatedARV = computeNewARV(comp, subject, constants, trendAdjust);
        let scoreSq = comp.totalScore * comp.totalScore;
        weightedAVG += updatedARV * scoreSq;
        scoreSum += scoreSq;
      }
    }

    if (scoreSum) {
      weightedAVG = Math.round(weightedAVG / scoreSum);
      return weightedAVG;
    } else {
      return 0;
    }
  }

  function computeNewARV(comp, subject, constants, trendAdjust = false) {
    const bathPriceAdj = calcBathPriceAdj(comp, subject, constants);
    const adjCostSqFt =
      (comp.price + bathPriceAdj + comp.poolAdj + comp.newerBuildAdj) /
      comp.adjLivingArea;
    const subjAdjustedSqFt =
      subject.livingArea + comp.subjAdjLivingDiff + comp.parkArvAdj;

    let newARV = subjAdjustedSqFt * adjCostSqFt;

    // Price trend adjust the ARV with multiplier
    if (trendAdjust && comp.trendAdjust) newARV *= comp.priceMultiplier;

    return newARV;
  }

  function calcBathPriceAdj(comp, subject, constants) {
    const baths = comp.baths;
    const subj_int_baths = Math.floor(subject.baths) === subject.baths;
    const comp_int_baths = Math.floor(baths) === baths;

    const X = subject.baths;
    const Y = baths;
    const A = constants.maxValPerAddlBath;
    const B = constants.relHalfBathAdj;
    const C = constants.higherNumBathAdj;

    let comp_price;
    let subj_price;

    if (comp_int_baths) {
      comp_price = (A * Math.pow(C, Y - 1) * 1) / (1 - C);
    } else {
      comp_price =
        A * Math.pow(C, Y - 1.5) + A * Math.pow(C, Y - 1.5) * (1 - B);
    }

    if (subj_int_baths) {
      subj_price = (A * Math.pow(C, X - 1) * 1) / (1 - C);
    } else {
      subj_price =
        A * Math.pow(C, X - 1.5) + A * Math.pow(C, X - 1.5) * (1 - B);
    }

    return comp_price - subj_price;
  }

  return { calculateARV, computeNewARV, calcBathPriceAdj };
}

(function (root) {
  'use strict';
  var ML_PER_FLOZ = 29.5735295625, ETHANOL_G_PER_ML = 0.789, STD_GRAMS = 14, STD_FLOZ = 0.6;
  function toMl(v, unit) { return unit === 'floz' ? v * ML_PER_FLOZ : v; }
  // One US standard drink = 14 g (0.6 fl oz) of pure alcohol (NIAAA)
  function grams(volMl, abvPct) { return volMl * abvPct / 100 * ETHANOL_G_PER_ML; }
  function stdDrinks(volMl, abvPct) { return grams(volMl, abvPct) / STD_GRAMS; }
  // NIAAA low-risk limits: women 3/day 7/week, men 4/day 14/week, anyone 65+ 3/day 7/week
  var LIMITS = { women: { day: 3, week: 7 }, men: { day: 4, week: 14 }, over65: { day: 3, week: 7 } };
  // NIAAA binge pattern in about 2 hours: women 4+, men 5+ (use 4 for 65+)
  var BINGE = { women: 4, men: 5, over65: 4 };
  function check(profile, today, earlierThisWeek) {
    var L = LIMITS[profile], week = today + earlierThisWeek;
    var overDay = today > L.day, overWeek = week > L.week;
    var status = overDay || overWeek ? 'over' : (today === L.day || week === L.week ? 'at' : 'within');
    return { status: status, overDay: overDay, overWeek: overWeek, week: week, dayLeft: Math.max(0, L.day - today), weekLeft: Math.max(0, L.week - week), binge: today >= BINGE[profile], limits: L };
  }
  // Drinks in a package of given size, rounded to one decimal for display
  function round1(x) { return Math.round(x * 10) / 10; }
  var api = { ML_PER_FLOZ: ML_PER_FLOZ, ETHANOL_G_PER_ML: ETHANOL_G_PER_ML, toMl: toMl, grams: grams, stdDrinks: stdDrinks, LIMITS: LIMITS, BINGE: BINGE, check: check, round1: round1 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Drink = api;
})(typeof window !== 'undefined' ? window : this);

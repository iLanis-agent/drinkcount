var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, tol) { n++; if (!(Math.abs(a - b) <= (tol == null ? 1e-9 : tol))) { bad++; console.log('FAIL', m, a, b); } }
function sd(oz, abv) { return E.stdDrinks(E.toMl(oz, 'floz'), abv); }
// NIAAA: each of these is one standard drink (about 14 g, 0.6 fl oz of pure alcohol)
eq(sd(12, 5), 1, '12 oz beer 5%', 0.01); eq(sd(5, 12), 1, '5 oz wine 12%', 0.01); eq(sd(1.5, 40), 1, '1.5 oz spirits 40%', 0.01);
eq(sd(8.5, 7), 1, 'malt liquor 8-10 oz at 7%', 0.02); eq(sd(3.5, 17), 1, 'fortified 3-4 oz at 17%', 0.02); eq(sd(2.5, 24), 1, 'liqueur 2-3 oz at 24%', 0.02); eq(sd(1.5, 40), sd(1.5, 40), 'self');
// NIAAA: 12 oz at 10% is two standard drinks
eq(sd(12, 10), 2, '12 oz at 10%', 0.02); eq(sd(24, 5), 2, '24 oz at 5%', 0.02);
// 14 g per standard drink
eq(E.grams(E.toMl(12, 'floz'), 5), 14, 'grams in a beer', 0.05); eq(E.grams(E.toMl(0.6, 'floz'), 100), 14, '0.6 fl oz pure ethanol', 0.05);
// metric: 330 ml at 5% = 0.93 drinks; 750 ml at 13.5% = 5.7; 500 ml at 4% = 1.13; 700 ml at 40% = 15.8
eq(E.stdDrinks(330, 5), 0.9299, 'can 330', 1e-3); eq(E.stdDrinks(750, 13.5), 5.706, 'wine bottle', 1e-2); eq(E.stdDrinks(500, 4), 1.127, 'pint', 1e-2); eq(E.stdDrinks(700, 40), 15.78, 'spirit bottle', 0.02);
// linear in volume and ABV, zero at zero
eq(E.stdDrinks(0, 5), 0, 'zero vol'); eq(E.stdDrinks(500, 0), 0, 'zero abv'); eq(E.stdDrinks(200, 10), 2 * E.stdDrinks(100, 10), 'linear vol'); eq(E.stdDrinks(100, 20), 2 * E.stdDrinks(100, 10), 'linear abv');
// units
eq(E.toMl(10, 'ml'), 10, 'ml'); eq(E.toMl(1, 'floz'), 29.5735, 'floz', 1e-4); eq(E.toMl(12, 'floz'), 354.88, 'can', 0.01);
// NIAAA limits
eq(E.LIMITS.women.day, 3, 'w day'); eq(E.LIMITS.women.week, 7, 'w week'); eq(E.LIMITS.men.day, 4, 'm day'); eq(E.LIMITS.men.week, 14, 'm week'); eq(E.LIMITS.over65.day, 3, '65 day'); eq(E.LIMITS.over65.week, 7, '65 week');
var c = E.check('women', 2, 4); eq(c.status === 'within' ? 1 : 0, 1, 'within'); eq(c.dayLeft, 1, 'day left'); eq(c.weekLeft, 1, 'week left'); eq(c.week, 6, 'week total');
c = E.check('women', 3, 0); eq(c.status === 'at' ? 1 : 0, 1, 'at day limit'); eq(c.overDay ? 1 : 0, 0, 'not over');
c = E.check('women', 3.5, 0); eq(c.overDay ? 1 : 0, 1, 'over day'); eq(c.status === 'over' ? 1 : 0, 1, 'over');
c = E.check('men', 2, 12.5); eq(c.overWeek ? 1 : 0, 1, 'over week'); eq(c.overDay ? 1 : 0, 0, 'day ok');
c = E.check('men', 4, 0); eq(c.status === 'at' ? 1 : 0, 1, 'men 4 at'); c = E.check('men', 4.1, 0); eq(c.overDay ? 1 : 0, 1, 'men 4.1 over'); c = E.check('over65', 3.5, 0); eq(c.overDay ? 1 : 0, 1, '65 over day');
c = E.check('men', 0, 14); eq(c.status === 'at' ? 1 : 0, 1, 'week at'); eq(c.weekLeft, 0, 'no week left'); eq(c.dayLeft, 4, 'day left full');
// binge pattern: women 4+, men 5+
eq(E.check('women', 4, 0).binge ? 1 : 0, 1, 'w binge 4'); eq(E.check('women', 3.9, 0).binge ? 1 : 0, 0, 'w no binge'); eq(E.check('men', 5, 0).binge ? 1 : 0, 1, 'm binge 5'); eq(E.check('men', 4.9, 0).binge ? 1 : 0, 0, 'm no binge');
eq(E.round1(1.1773), 1.2, 'round'); eq(E.round1(5.706), 5.7, 'round2');
console.log(n + ' assertions, ' + bad + ' failed'); process.exit(bad ? 1 : 0);

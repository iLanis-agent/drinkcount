# DrinkCount

Standard drink converter and daily tally.

- One US standard drink = 14 g (0.6 fl oz) of pure alcohol: 12 fl oz of 5% beer, 5 fl oz of 12% wine, 1.5 fl oz of 40% spirits (NIAAA)
- grams = volume (ml) x ABV x 0.789 g/ml; standard drinks = grams / 14
- NIAAA low-risk limits: women 3 a day and 7 a week, men 4 a day and 14 a week, anyone 65+ 3 a day and 7 a week
- Binge pattern in about 2 hours: women 4+, men 5+ (4+ used for 65+)

Information only. Not medical advice; never use it to decide whether you can drive.

Static client-side. `node test-engine.js` runs the tests.
Sources: https://www.niaaa.nih.gov/alcohols-effects-health/what-standard-drink , https://arcr.niaaa.nih.gov/volume/39/1/drinking-patterns-and-their-definitions

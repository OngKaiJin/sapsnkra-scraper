# sapsnkra-scraper
Collect Malaysian NRIC numbers using bruteforce, then scrapes name and school code, through https://sapsnkra.moe.gov.my/ibubapa2/semak.php
> only works for newer NRIC

## Usage
### Get NRIC numbers
1. Open https://sapsnkra.moe.gov.my/ibubapa2/semak.php
2. Launch console tab
3. Paste and enter code inside [validifyic.js](https://github.com/OngKaiJin/sapsnkra-scraper/blob/main/validifyic.js) file into console
4. Modify and run in console:
```javascript
validifyic(year, [startMonth, endMonth], placeOfBirth, last4D); 
```
```javascript
/*Example*/
validifyic("05", [1, 3], "04", 1000); 

/*
this would give IC numbers of people born year in year 2005
from January to March
in Malacca state
starting at digit 0000 to 1000
*/
```
#### Note:
* it is suggested to use digit 1000 for low birth rate areas such as Malacca state; 4000 for high birth rate areas such as Selangor state
* results will be outputed into a `.json` file, one file for each month
* it is suggested to scan one month at a time to prevent browser crash

### Scrape information
1. Open https://sapsnkra.moe.gov.my/ibubapa2/semak.php
2. Launch console tab
3. Paste and enter code inside [scraper.js](https://github.com/OngKaiJin/sapsnkra-scraper/blob/main/scraper.js) file into console
4. Modify and run in console:
```javascript
scraper(list); 
```
```javascript
/*Example*/
scraper([{"ic":"050101040016"},{"ic":"050101040024"},{"ic":"050101040032"}]);

/*
use the IC numbers from the json file
*/
```
#### Note:
* sometimes, the school code and class information might not be scraped perfectly, the output might show the person do not have a school code that year even that person has it, this is due to slow server response
* results will be outputed into a `.json` file
* a single IC number might have different owner such as the number 111111111111

## Additional tricks
Directly check a person information by running this inside console in https://sapsnkra.moe.gov.my/ibubapa2/semak.php:
```javascript
semak("050905102913");
/*example (replace with other IC number)*/
```
Then, refresh the page

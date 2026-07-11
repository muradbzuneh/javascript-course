import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = dayjs();
console.log(today);
const afterToday = today.add(5, 'days')
console.log(afterToday.format('D MMMM YYYY dddd'))
const afterMonth = today.add(1, 'months')
const beforMonth = today.subtract(1, 'months')
console.log(beforMonth.format('D MMM YYYY dddd'))
console.log(afterMonth.format('D MMM YYYY dddd'))


function weekEnd(date){
  if( date === 'Saturday'){
    console.log(`it was weekend the day was ${date}`)
  }
  else {
    console.log(`it was not weekend the day was ${date}`)
  }
}

const date = today.add(1, 'days').format('dddd')
weekEnd(date)
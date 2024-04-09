
import { createGlobalState } from 'react-hooks-global-state'
import moment from 'moment'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  createModal: 'scale-0',
  connectedAccount: '',
  user: null,
  contract: null,
  proposals: [],
  isStakeholder: false,
  balance: 0,
  mybalance: 0,
})

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars)
    var end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

const daysRemaining = (days) => {
  const todaysdate = moment()
  days = Number((days + '000').slice(0))
  days = moment(days).format('YYYY-MM-DD')
  days = moment(days)
  days = days.diff(todaysdate, 'days')
  return days == 1 ? '1 day' : days + ' days'
}

// const minutesRemaining = (minutes) => {
// function timeDifferenceInMinutes(providedTimeMs) {
//     const currentTimeMs = new Date().getTime();
//     const differenceMs = currentTimeMs - providedTimeMs;
//     const differenceMinutes = Math.floor(differenceMs / (1000 * 60)); // Convert milliseconds to minutes
//     return `${differenceMinutes} minutes`;
// }
// }

// const minutesRemaining = (minutes) => {
//   const currentTime = moment(); // Current time
//   const futureTime = moment().add(minutes, 'minutes'); // Future time based on minutes
//
//   const remainingMinutes = futureTime.diff(currentTime, 'minutes'); // Calculate difference in minutes
//
//   return remainingMinutes === 1 ? '1 minute' : remainingMinutes + ' minutes'; // Return formatted string
// }
//
// const hoursRemaining = (hours) => {
//   const currentTime = moment(); // Current time
//   const futureTime = moment().add(hours, 'hours'); // Future time based on hours
//
//   const remainingHours = futureTime.diff(currentTime, 'hours'); // Calculate difference in hours
//
//   return remainingHours === 1 ? '1 hour' : remainingHours + ' hours'; // Return formatted string
// }

export {
  truncate,
  setGlobalState,
  useGlobalState,
  getGlobalState,
  daysRemaining,
  // minutesRemaining,
  // hoursRemaining,
}


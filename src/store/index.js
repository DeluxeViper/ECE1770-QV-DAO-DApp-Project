
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

const minutesRemaining = (proposalDuration) => {
  const endProposalTime = Number(proposalDuration + '000')
  const currentTimeMs = new Date().getTime();
  const differenceMs = currentTimeMs - endProposalTime;
  const minutesRemaining = Math.floor(differenceMs / (1000 * 60));
  return minutesRemaining;
}

const secondsRemaining = (proposalDuration) => {
  const endProposalTime = Number(proposalDuration + '000')
  const currentTimeMs = new Date().getTime();
  const differenceMs = endProposalTime - currentTimeMs;
  const secondsRem = Math.floor(differenceMs / (1000));
  return secondsRem;
}

const hoursRemaining = (proposalDuration) => {
  const endProposalTime = Number(proposalDuration + '000')
  const currentTimeMs = new Date().getTime();
  const differenceMs = endProposalTime - currentTimeMs;
  const hoursRem = Math.floor(differenceMs / (1000 * 60 * 60));
  return hoursRem;
}

const timeRemaining = (proposalDuration) => {
  const minutesRem = minutesRemaining(proposalDuration);

  if (new Date().getTime() > Number(proposalDuration + '000')) {
    return 'Expired';
  } else if (minutesRem <= 5) {
    return `${secondsRemaining(proposalDuration)} seconds.`
  } else if (minutesRem > 5 && minutesRem < 60) {
    return `${minutesRem} minutes`
  } else if (minutesRem >= 60) {
    const hoursRem = hoursRemaining(proposalDuration)

    if (hoursRem < 24) {
      return `${hoursRem} hours`;
    } else {
      const daysRem = daysRemaining(proposalDuration)

      return daysRem == 1 ? '1 day' : daysRem + ' days'
    }
  }
  if (minutesRem > 5 && minutesRem < 60) {
    return `${minutesRem} minutes`
  } else if (minutesRem >= 60) {
    const hoursRem = hoursRemaining(proposalDuration)

    if (hoursRem < 24) {
      return `${hoursRem} hours.`
    }
  }
  else {
    return `${secondsRemaining(proposalDuration)} seconds.`
  }
}

export {
  truncate,
  setGlobalState,
  useGlobalState,
  getGlobalState,
  daysRemaining,
  timeRemaining
}


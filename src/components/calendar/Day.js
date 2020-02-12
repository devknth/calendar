import React from 'react'
import styled from 'styled-components'

const isSameDay = (a, b) => {
  const dateA = new Date(a)
  const dateB = new Date(b)

  return dateA.getFullYear() === dateB.getFullYear()
    && dateA.getMonth() === dateB.getMonth()
    && dateA.getDate() === dateB.getDate()
}

const getHHMM = (timestamp) => {
  const date = new Date(timestamp)
  const hh = date.getHours().toString().length === 1 ? '0' + date.getHours().toString() : date.getHours().toString()
  const mm = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes().toString() : date.getMinutes().toString()
  return `${hh}:${mm}`
}

const Day = ({ timestamp, day, selected, schedule }) => {
  const date = new Date(timestamp)

  return (
    <Container selected={selected} day={day}>
      <DateInfo>{date.getDate()} {day}</DateInfo>
      {
        !schedule
          ? null
          : isSameDay(schedule.start, schedule.end)
            ? <QuickTurnSchedule
              color={schedule.color}
              darkMode={schedule.darkMode}
            >
              {
                schedule.to === 'STBY'
                  ? schedule.to
                  : `${schedule.to} ${getHHMM(schedule.start)}→${getHHMM(schedule.end)}`
              }
            </QuickTurnSchedule>
            : <Schedule
              isStart={isSameDay(timestamp, schedule.start)}
              isEnd={isSameDay(timestamp, schedule.end)}
              color={schedule.color}
              darkMode={schedule.darkMode}
            >
              {
                isSameDay(timestamp, schedule.start)
                  ? `${schedule.from}→${schedule.to} ${getHHMM(schedule.start)}`
                  : isSameDay(timestamp, schedule.end)
                    ? `${schedule.to}→${schedule.from} ${getHHMM(schedule.end)}`
                    : null
              }
            </Schedule>
      }
    </Container>
  )
}

export default Day

const Container = styled.div`
  width: 100px;
  height: 100px;
  border: solid 1px lightgray;
  border-radius: 5px;
  margin: 2px;
  padding: 7px;

  ${({ day }) => day === 'Sat'
    ? `color: blue;`
    : day === 'Sun'
      ? `color: red;`
      : ``
  }

  ${({ selected }) => selected &&
    `
    border: solid 1px gray;
    background-color: lightgray;
    color: darkslategray;
    `
  }

  :hover {
    border: solid 1px whitesmoke;
    background-color: gray;
    color: whitesmoke;
  }
`
const DateInfo = styled.h4`
  padding: 0px;
  margin: 0px;
`
const QuickTurnSchedule = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  position: relative;
  top: 59px; 
  left: -3px;
  width: 106px;
  height: 24px;
  border-radius: 12px;
  background-color: lightgray;
  color: darkslategray;
  :hover {
    color: lightgray;
    cursor: pointer;
  }
  
  ${({ color, darkMode }) =>
    `
    background-color: ${color ? color : 'pink'};
    color: ${darkMode ? 'whitesmoke' : 'darkslategray'};
    :hover {
      color: ${darkMode ? 'lightgray' : 'gray'};
    }
    `
  }
`
const Schedule = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  position: relative;
  top: 59px; 
  left: -7px;
  width: 114px;
  height: 24px;
  background-color: lightgray;
  color: darkslategray;
  :hover {
    color: lightgray;
    cursor: pointer;
  }

  ${({ isStart }) => isStart &&
    `
    left: -3px;
    width: 111px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    `
  }
  ${({ isEnd }) => isEnd &&
    `
    right: -3px;
    width: 111px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    `
  }
  ${({ color, darkMode }) =>
    `
    background-color: ${color ? color : 'pink'};
    color: ${darkMode ? 'whitesmoke' : 'darkslategray'};
    :hover {
      color: ${darkMode ? 'lightgray' : 'gray'};
    }
    `
  }
`
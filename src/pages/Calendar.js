import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Day from 'components/calendar/Day'
import queryString from 'query-string'
import Arrow from 'components/common/Arrow'
import { feb } from 'utils/api'

const Calendar = ({ location }) => {
  const query = queryString.parse(location.search)
  const selectedDate = new Date(query.date ? query.date : Date.now())
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
  let indexDate = firstDayOfMonth.getDay() === 0 ? firstDayOfMonth : new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay()))

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let week = []
  let month = []

  let flag = true
  let detailRowIndex = 3


  while (flag) {
    indexDate.getMonth() === lastDayOfMonth.getMonth()
      && indexDate.getDate() === lastDayOfMonth.getDate()
      ? flag = false : flag = true

    week[indexDate.getDay()] = {
      id: indexDate.getTime(),
      month: indexDate.getMonth() + 1,
      date: indexDate.getDate(),
      day: weekDays[indexDate.getDay()],
    }

    if (indexDate.getDay() === 6 || !flag) {
      month = [
        ...month,
        [...week],
      ]
      week = []
    }
    indexDate = new Date(indexDate.setDate(indexDate.getDate() + 1))
  }

  const move = (unit, number) => {
    const thisDate = new Date(selectedDate)
    let targetDate
    switch (unit) {
      case 'month':
        targetDate = new Date(thisDate.setMonth(thisDate.getMonth() + number))
        return `/?date=${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`
      case 'year':
        targetDate = new Date(thisDate.setYear(thisDate.getFullYear() + number))
        return `/?date=${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`

      default:
        break;
    }
  }

  detailRowIndex !== -1 && month.splice(detailRowIndex, 0, 'Hello world')

  return (
    <Container>
      <Month>
        <Link to={move('month', -1)}>
          <Arrow direction='left' size='3' />
        </Link>
        {new Intl.DateTimeFormat('en', { month: 'long' }).format(selectedDate)}
        <Link to={move('month', 1)}>
          <Arrow direction='right' size='3' />
        </Link>
      </Month>
      <Year>
        <Link to={move('year', -1)}>
          <Arrow direction='left' size='3' />
        </Link>
        {selectedDate.getFullYear()}
        <Link to={move('year', 1)}>
          <Arrow direction='right' size='3' />
        </Link>
      </Year>
      <ItemContainer>
        {
          month.map((weekItem) =>
            <Row key={month.indexOf(weekItem)} name='Row'>
              {
                weekItem === 'Hello world' 
                ? 'Hello world'
                : weekItem.map((dayItem) => {
                  let schedule
                  feb.map((item) => {
                    if (dayItem.id === item.id) schedule = item.schedule
                    return null
                  })

                  return <Day
                    key={dayItem.date}
                    name='Day'
                    timestamp={dayItem.id}
                    day={dayItem.day}
                    selected={selectedDate.getDate() === dayItem.date}
                    schedule={schedule}
                  />
                }
                )
              }
            </Row>
          )
        }
      </ItemContainer>
    </Container >
  )
}

export default Calendar

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Year = styled.div`
  display: flex;
  width: 200px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 30px;
`

const Month = styled.div`
  display: flex;
  width: 200px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  margin-top: 30px;
`
const ItemContainer = styled.div`
  display: column;
  flex-direction: flex-start;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
`
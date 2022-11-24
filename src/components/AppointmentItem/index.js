// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onSelected} = props
  const {id, title, date, isStarred} = appointmentDetails
  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const starredAppointment = () => {
    onSelected(id)
  }

  return (
    <li className="appointment-item">
      <div className="title-star">
        <p className="appointment-tile">{title}</p>
        <button
          type="button"
          className="str-btn"
          onClick={starredAppointment}
          testid="star"
        >
          <img
            src={
              isStarred
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt="star"
          />
        </button>
      </div>
      <p className="appointment-date">{formattedDate}</p>
    </li>
  )
}

export default AppointmentItem

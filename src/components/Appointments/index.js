// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isStarred: false,
  }

  onTitleInput = e => {
    if (e.target.value !== '') {
      this.setState({
        title: e.target.value,
      })
    }
  }

  onDateSelect = e => {
    if (e.target.value !== '') {
      this.setState({
        date: e.target.value,
      })
    }
  }

  onAddAppointment = e => {
    e.preventDefault()
    const {title, date} = this.state
    if (title !== '' && date !== '') {
      const newAppointment = {
        id: uuidv4(),
        title,
        date,
        isStarred: false,
      }
      //   console.log(newAppointment)
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  onSelected = id => {
    this.setState(prevStats => ({
      appointmentsList: prevStats.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  filterStarredAppointments = () => {
    this.setState(prevState => ({isStarred: !prevState.isStarred}))
  }

  render() {
    const {appointmentsList, title, date, isStarred} = this.state
    const filteredAppointments =
      isStarred === true
        ? appointmentsList.filter(appointment => appointment.isStarred === true)
        : appointmentsList
    // console.log(filteredAppointments)
    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="form-section">
            <div className="appointment-form">
              <h1 className="heading">Add Appointment</h1>
              <div>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <br />
                <input
                  id="title"
                  className="input-field"
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={this.onTitleInput}
                />
                <br />
                <label id="date" className="label" htmlFor="date">
                  Date
                </label>
                <br />
                <input
                  id="date"
                  className="input-field"
                  type="date"
                  value={date}
                  placeholder="dd/mm/yyyy"
                  onChange={this.onDateSelect}
                />
                <br />
                <button
                  type="button"
                  className="button"
                  onClick={this.onAddAppointment}
                >
                  Add
                </button>
              </div>
            </div>
            <img
              className="appointments-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="horizontal-line-breaker" />
          <div className="list-heading-section">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={
                isStarred
                  ? 'starred-filter-btn btn-filled'
                  : 'starred-filter-btn'
              }
              onClick={this.filterStarredAppointments}
            >
              Starred
            </button>
          </div>
          {/* {filteredAppointments.length > 0 && ( */}
          <ul className="appointments-list">
            {filteredAppointments.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                onSelected={this.onSelected}
              />
            ))}
          </ul>
          {/* )} */}
        </div>
      </div>
    )
  }
}

export default Appointments

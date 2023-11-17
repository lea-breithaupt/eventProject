import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"

const Calendar = () => {
  return (
    <div>
        <FullCalendar 
            plugins={[ dayGridPlugin, interactionPlugin ]}
            dateClick={this.handleDateClick}
        />
    </div>
  )
}

export default Calendar
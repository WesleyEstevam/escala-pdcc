import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../api/api";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

export function Calendario() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}escalas`)
      .then((response) => {
        const formattedEvents = response.data.map((escala) => ({
          title: `${escala.horario_missa} ${escala.capela.nome_capela}-
          ${escala.tipo_cerimonia}`,

          start: escala.data_escala,
          extendedProps: {
            id_escala: escala.id_escala,
            horario_missa: escala.horario_missa,
            capela: escala.capela,
          },
        }));

        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        locale={ptBrLocale}
        timeZone="UTC" // ou 'local' dependendo da sua necessidade
        eventContent={(eventInfo) => <b>{eventInfo.event.title}</b>}
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EventListing = () => {
  const [eventdata, eventdatachange] = useState(null);
  const navigate = useNavigate();

  const EventEdit = (id) => {
    navigate("/event/edit/" + id);
  };

  const EventRemove = (id) => {
    if (window.confirm("Voce realmente quer remover esse evento?")) {
      fetch("http://localhost:8000/event/" + id, {
        method: "DELETE",
      })
        .then((response) => {
          alert("Removido com sucesso");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/event")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        eventdatachange(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="card" style={{ backgroundColor: "#a2b9bc" }}>
        <div className="card-title">
          <h2>Lista de eventos</h2>
        </div>
        <div className="card-body">
          <div className="divbutton">
            <Link to="/event/create" className="btn btn-success">
              Adicionar evento
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Id</td>
                <td>Nome</td>
                <td>Local</td>
                <td>Data</td>
                <td>Preco</td>
                <td>Quantidade ingressos</td>
                <td>Açoes</td>
              </tr>
            </thead>
            <tbody>
              {eventdata &&
                eventdata.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.name}</td>
                    <td>{event.place}</td>
                    <td>{event.date}</td>
                    <td>{event.price}</td>
                    <td>{event.amount}</td>
                    <td>
                      <a
                        onClick={() => {
                          EventEdit(event.id);
                        }}
                        className="btn btn-success"
                      >
                        Editar
                      </a>
                      <a
                        onClick={() => {
                          EventRemove(event.id);
                        }}
                        className="btn btn-danger"
                      >
                        Remover
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventListing;

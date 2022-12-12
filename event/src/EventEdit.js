import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EventEdit = () => {
  const { eventid } = useParams();

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [place, placechange] = useState("");
  const [date, datechange] = useState("");
  const [price, pricechange] = useState("");
  const [amount, amountchange] = useState("");

  const [namevalidation, namevalidationchange] = useState(false);
  const [placevalidation, placevalidationchange] = useState(false);
  const [datevalidation, datevalidationchange] = useState(false);
  const [pricevalidation, pricevalidationchange] = useState(false);
  const [amountvalidation, amountvalidationchange] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/event/" + eventid)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        idchange(response.id);
        namechange(response.name);
        placechange(response.place);
        datechange(response.date);
        pricechange(response.price);
        amountchange(response.amount);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handlesubmit = (i) => {
    i.preventDefault();
    const eventdata = { id, name, place, date, price, amount };

    fetch("http://localhost:8000/event/" + eventid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(eventdata),
    })
      .then((response) => {
        alert("Salvo com sucesso");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ "textAlign:": "left" }}>
              <div className="card-tittle">
                <h2>Editar evento</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        disabled="disabled"
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Nome</label>
                      <input
                        required
                        value={name}
                        onMouseDown={(i) => namevalidationchange(true)}
                        onChange={(i) => namechange(i.target.value)}
                        className="form-control"
                      ></input>
                      {name.length == 0 && namevalidation && (
                        <span className="text-danger">Digite um nome</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Local</label>
                      <input
                        required
                        value={place}
                        onMouseDown={(i) => placevalidationchange(true)}
                        onChange={(i) => placechange(i.target.value)}
                        className="form-control"
                      ></input>
                      {place.length == 0 && placevalidation && (
                        <span className="text-danger">Digite um local</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Data</label>
                      <input
                        required
                        value={date}
                        onMouseDown={(i) => datevalidationchange(true)}
                        onChange={(i) => datechange(i.target.value)}
                        className="form-control"
                      ></input>
                      {date.length == 0 && datevalidation && (
                        <span className="text-danger">Digite uma data</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Preco</label>
                      <input
                        required
                        value={price}
                        onMouseDown={(i) => pricevalidationchange(true)}
                        onChange={(i) => pricechange(i.target.value)}
                        className="form-control"
                      ></input>
                      {price.length == 0 && pricevalidation && (
                        <span className="text-danger">Digite um preco</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Quantidade</label>
                      <input
                        required
                        value={amount}
                        onMouseDown={(i) => amountvalidationchange(true)}
                        onChange={(i) => amountchange(i.target.value)}
                        className="form-control"
                      ></input>
                      {amount.length == 0 && amountvalidation && (
                        <span className="text-danger">
                          Digite a quantidade de ingressos
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Salvar
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Voltar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventEdit;

import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext.js";
import Login from "../components/Login.jsx";

const Home = () => {
  const { state } = useContext(AppContext);

  const [cohorts, setCohorts] = useState([]);
  const [prueba, setPrueba] = useState([]);
  const [status, setStatus] = useState({
    active: 0,
    graduated: 0,
  });

  const handleSelect = ({ target }) => {
    console.log(target.value);
    fetch(
      `https://breathecode.herokuapp.com/v1/admissions/academy/cohort/user?cohorts=${target.value}&roles=STUDENT`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${state.token}`,
          Academy: "2",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let count = {
          active: 0,
          graduated: 0,
          posponed: 0,
          dropped: 0,
          suspended: 0,
        };
        setPrueba(data);
        for (let student of data) {
          if (student.educational_status === "ACTIVE") {
            count.active++;
          }
          if (student.educational_status === "GRADUATED") {
            count.graduated++;
          }
          if (student.educational_status === "POSTPONED") {
            count.posponed++;
          }
          if (student.educational_status === "DROPPED") {
            count.dropped++;
          }
          if (student.educational_status === "SUSPENDED") {
            count.suspended++;
          }
        }
        console.log(count);
        setStatus(count);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(
      `https://breathecode.herokuapp.com/v1/admissions/academy/cohort?limit=20`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${state.token}`,
          Academy: "2",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCohorts(data.results);
        console.log(data.results);
      });
  }, [state.token]);
  return (
    <>
      {state.token === null ? (
        <Login />
      ) : (
        <div className="container">
          <div className="row justify-content-center my-4">
            <div className="col-12 col-md-6">
              {state.token}
              <h1 className="text-center">My dashboard PM</h1>

              <select onChange={handleSelect}>
                <option value="">Selecciona un cohort</option>
                {cohorts &&
                  cohorts.map((cohort) => (
                    <option key={cohort.id} value={cohort.slug}>
                      {`${cohort.name} ${cohort.id}`}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <p>Active {((status.active / prueba.length) * 100).toFixed(2)}</p>
          <p>
            Graduated {((status.graduated / prueba.length) * 100).toFixed(2)}
          </p>
          <p>
            Posponed {((status.posponed / prueba.length) * 100).toFixed(2)}
          </p>
          <p>
            Dropped {((status.dropped / prueba.length) * 100).toFixed(2)}
          </p>
          <p>
            Suspended {((status.suspended / prueba.length) * 100).toFixed(2)}
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
//https://breathecode.herokuapp.com/v1/assignment/task/?stu_cohort=521
//https://breathecode.herokuapp.com/v1/assignment/academy/cohort/546/task?limit=1000&task_type=PROJECT&student=6197&revision_status=PENDING
//https://breathecode.herokuapp.com/v1/admissions/academy/cohort/user?cohorts=caracas-pt-42&roles=STUDENT
//https://breathecode.herokuapp.com/v1/assignment/academy/cohort/546/task?limit=1000

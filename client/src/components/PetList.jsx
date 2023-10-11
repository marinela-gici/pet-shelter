import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PetList = (props) => {
  const { socket, updated, setUpdated } = props;
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets")
      .then((res) => {
        console.log(res.data);
        setPets(res.data);
      })
      .catch((err) => console.log(err));

    socket.on("toClient", (data) => {
      setUpdated(!updated);
    });
  }, [updated]);

  return (
    <div className="md:max-w-[70%] mx-auto px-3">
      <div className="flex justify-between py-4">
        <h1 className="text-4xl">Pet Shelter</h1>
        <Link
          className="text-blue-600 underline hover:no-underline"
          to={"/pets/new"}
        >
          add a pet to the shelter
        </Link>
      </div>
      {pets.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pets
                .sort((a, b) =>
                  a["type"].toLowerCase().localeCompare(b["type"].toLowerCase())
                )
                .map((pet, index) => {
                  return (
                    <tr key={index} className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {pet.name}
                      </th>
                      <td className="px-6 py-4">{pet.type}</td>

                      <td className="px-6 py-4">
                        <div
                          class="inline-flex rounded-md shadow-sm"
                          role="group"
                        >
                          <button
                            onClick={() => navigate(`/pets/${pet._id}`)}
                            type="button"
                            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => navigate(`/pets/${pet._id}/edit`)}
                            type="button"
                            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      {pets.length === 0 && (
        <div
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span class="font-medium">There are no pets in our shelter!</span>
        </div>
      )}
    </div>
  );
};

export default PetList;

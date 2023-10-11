import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const PetDetails = (props) => {
  const { socket, updated, setUpdated, likes, setLikes } = props;
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pets/${id}`)
      .then((res) => {
        console.log(res.data);
        setPet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    socket.on("toClient", (data) => {
      setUpdated(!updated);
    });
  }, [updated]);

  const deletePet = (id) => {
    axios
      .delete(`http://localhost:8000/api/pets/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate("/");
        socket.emit("getDataFromReact", res.data);
        setUpdated(!updated);
      })
      .catch((err) => console.log(err));
  };

  const addLike = () => {
    axios.post(`http://localhost:8000/api/pets/${id}/addLike`).then((res) => {
      console.log(res);
      setPet(res.data);
      socket.emit("getDataFromReact", res.data);

      if (!likes.includes(pet._id)) {
        setLikes((prev) => [...prev, pet._id]);
      }
    });
  };

  return (
    <div className="md:max-w-[70%] mx-auto px-3">
      <div className="flex justify-between py-4">
        <h1 className="text-4xl">Pet Shelter</h1>
        <Link className="text-blue-600 underline hover:no-underline" to={"/"}>
          back to home
        </Link>
      </div>
      <div className="flex justify-between items-center py-4">
        <p className="text-2xl">Details about: {pet.name}</p>
        <button
          onClick={() => deletePet(pet._id)}
          className="capitalize text-white ml-3 bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="mr-2 w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Adopt {pet.name}
        </button>
      </div>

      <div className="border-2 border-gray-800 p-4">
        <div className="flex mb-3">
          <span className="w-1/5 font-bold pr-4">Pet Type:</span>
          <span>{pet.type}</span>
        </div>
        <div className="flex mb-3">
          <span className="w-1/5 font-bold pr-4">Description:</span>
          <span>{pet.description}</span>
        </div>
        <div className="flex mb-3">
          <span className="w-1/5 font-bold pr-4">Skills:</span>
          <span>
            {pet.firstSkill && <p>{pet.firstSkill}</p>}
            {pet.secondSkill && <p>{pet.secondSkill}</p>}
            {pet.thirdSkill && <p>{pet.thirdSkill}</p>}
          </span>
        </div>
        <div className="flex justify-center items-center">
          <button
            disabled={likes.includes(pet._id)}
            type="button"
            onClick={addLike}
            className="text-white ml-3 disabled:bg-gray-400 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
            Like {pet.name}
          </button>
          <p>{pet.likes} like(s)</p>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;

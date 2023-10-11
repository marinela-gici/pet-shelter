import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditPet = (props) => {
  const { socket } = props;
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [firstSkill, setFirstSkill] = useState("");
  const [secondSkill, setSecondSkill] = useState("");
  const [thirdSkill, setThirdSkill] = useState("");
  const [validation, setValidation] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pets/${id}`)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setType(res.data.type);
        setDescription(res.data.description);
        setFirstSkill(res.data.firstSkill);
        setSecondSkill(res.data.secondSkill);
        setThirdSkill(res.data.thirdSkill);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:8000/api/pets/${id}`, {
        name,
        type,
        description,
        firstSkill,
        secondSkill,
        thirdSkill,
      })
      .then((res) => {
        console.log(res);
        socket.emit("getDataFromReact", res.data);
        navigate(`/pets/${id}`);
      })
      .catch((err) => {
        console.log(err);
        setValidation(err.response.data.errors);
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
      <p className="text-3xl pb-4">Know a pet needing a home?</p>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-wrap items-end border-2 border-gray-800 py-4 -mx-3"
      >
        <div className="w-full md:w-1/2 px-3">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Pet Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {validation.name ? (
              <p className="text-sm text-red-600 font-bold">
                {validation.name.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Pet Type
            </label>
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              type="text"
              id="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {validation.type ? (
              <p className="text-sm text-red-600 font-bold">
                {validation.type.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Pet Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {validation.description ? (
              <p className="text-sm text-red-600 font-bold">
                {validation.description.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 px-3">
          Skills (optional)
          <div className="mb-6">
            <label
              htmlFor="first-skill"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Skill 1
            </label>
            <input
              type="text"
              id="first-skill"
              value={firstSkill}
              onChange={(e) => setFirstSkill(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="second-skill"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Skill 2
            </label>
            <input
              type="text"
              id="second-skill"
              value={secondSkill}
              onChange={(e) => setSecondSkill(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="third-skill"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Skill 3
            </label>
            <input
              type="text"
              id="third-skill"
              value={thirdSkill}
              onChange={(e) => setThirdSkill(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white ml-3 bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          Edit Pet
        </button>
      </form>
    </div>
  );
};
export default EditPet;

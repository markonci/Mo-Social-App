import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { FaImage } from "react-icons/fa6";
import { FaFileImage } from "react-icons/fa6";
import axios from "axios";
import { APi_BASEURL } from "./../../../lib/Api";
import { UserContext } from "../../../Context/UserContext";
import toast from "react-hot-toast";
import { GrPowerCycle } from "react-icons/gr";
import { useQueryClient } from "@tanstack/react-query";

export default function Uploadprofilephoto() {
  let queryclinet =useQueryClient()
  let { userLogin } = useContext(UserContext);

  const [isLoding, setisLoding] = useState(false);

  //------------- start open modle--------
  const [modleopen, setmodleopen] = useState(false);

  function handlemodleopen() {
    setmodleopen(!modleopen);
  }
  //------------- end open modle--------

  let { register, handleSubmit } = useForm({
    defaultValues: {
      photo: "",
    },
  });

  function handleUpdateprofilephoto(value) {
    // console.log(value.photo[0]);

    let myphoto = new FormData();
    myphoto.append("photo", value.photo[0]);
    // hna 3az aldata b7aga asmha formdata we dy gowa js bulid in
    setisLoding(true);

    axios
      .put(`${APi_BASEURL}/users/upload-photo`, myphoto, {
        headers: {
          token: userLogin,
        },
      })
      .then((res) => {
        // console.log(res.data.message);
        if (res.data.message === "success") {
          toast.success("Your profile picture is success  my bro 😎 ");
          setmodleopen(false);
          setisLoding(false);
          queryclinet.invalidateQueries({queryKey:['uesrData']})
        }
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        toast.error(err.response.data.error), setmodleopen(false);
        // hna b2olo b3d ma t5ls a2afl al modle set modleopen b false
        setisLoding(false);
      });
  }

  return (
    <>
      <button
        onClick={() => handlemodleopen()}
        className="p-4 bg-red-400 items-center mt-4 cursor-pointer hover:bg-red-500 duration-[0.5s]"
      >
        UploadprofilePhoto
      </button>
      {modleopen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <StyledWrapper>
            <form onSubmit={handleSubmit(handleUpdateprofilephoto)}>
              <div className="modal">
                <div className="modal-header">
                  <div className="modal-logo">
                    {/* ---------start img logo -------*/}
                    <span>
                      <FaFileImage className="text-[27px] text-red-300" />
                    </span>
                    {/* ---------end img logo -------*/}
                  </div>
                  <button className="btn-close" onClick={handlemodleopen}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z" />
                      <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="var(--c-text-secondary)"
                      />
                    </svg>
                  </button>
                </div>
                <div className="modal-body">
                  <p className="modal-title">Upload a file</p>
                  <p className="modal-description">Attach the file below</p>

                  {/* --------------start input--------------  */}
                  <input
                    type="file"
                    id="photo1"
                    className="hidden"
                    {...register("photo")}
                  />
                  {/* --------------start input--------------  */}

                  {/* ----------------start lapel ------------------ */}

                  <label htmlFor="photo1">
                    <div className="border-[2px] border-black/50 p-10 border-dotted hover:border-solid ">
                      {/*---------- start img ---- */}
                      <span>
                        <FaImage className="mx-auto text-[45px] text-red-300" />
                      </span>
                      {/*---------- end img ---- */}
                      <span className="upload-area-title">
                        Drag photo(s) here to upload.
                      </span>
                      <span className="upload-area-description">
                        Alternatively, you can select a photo by <br />
                        <strong>clicking here</strong>
                      </span>
                    </div>
                  </label>

                  {/* ----------------end lapel ------------------ */}
                </div>
                <div className="modal-footer">
                  <button className="btn-secondary " onClick={handlemodleopen}>
                    Cancel
                  </button>
                  <button
                    className="button3 mt-1 cursor-pointer btn-primary"
                    disabled={isLoding}
                  >
                    {isLoding ? (
                      <GrPowerCycle className="animate-spin mx-auto text" />
                    ) : (
                      "Change profile image"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </StyledWrapper>
        </div>
      )}
    </>
  );
}

const StyledWrapper = styled.div`
  .modal {
    width: 90%;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1.5rem 1.5rem 1rem;
  }

  .logo-circle {
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #e9e5ff;
    fill: #1cc972;
  }

  .btn-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 0.25rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .btn-close:hover,
  .btn-close:focus {
    background-color: #e9e5ff;
  }

  .modal-body {
    padding: 1rem 1.5rem;
  }

  .modal-title {
    font-weight: 700;
  }

  .modal-description {
    color: #6a6b76;
  }

  .upload-area {
    margin-top: 1.25rem;
    background-color: transparent;
    padding: 3rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px dashed #6a6b76;
  }

  .upload-area:hover,
  .upload-area:focus {
    cursor: pointer;
    border: 1px solid #6a6b76;
  }

  .upload-area:hover .upload-area-icon,
  .upload-area:focus .upload-area-icon {
    transform: scale(1.3);
    transition-duration: 0.3s;
  }

  .upload-area-icon {
    display: block;
    width: 2.25rem;
    height: 2.25rem;
    fill: #1cc972;
  }

  .upload-area-title {
    margin-top: 1rem;
    display: block;
    font-weight: 700;
    color: #0d0f21;
  }

  .upload-area-description {
    display: block;
    color: #6a6b76;
  }

  .upload-area-description strong {
    color: #1cc972;
    font-weight: 700;
  }

  .modal-footer {
    padding: 1rem 1.5rem 1.5rem;
    display: flex;
    justify-content: flex-end;
  }

  .modal-footer [class*="btn-"] {
    margin-left: 0.75rem;
  }

  .btn-secondary,
  .btn-primary {
    padding: 0.5rem 1rem;
    font-weight: 500;
    border: 2px solid #e5e5e5;
    border-radius: 0.25rem;
    background-color: transparent;
    cursor: pointer;
  }

  .btn-primary {
    color: #fff;
    background-color: #1cc972;
    border-color: #1cc972;
    cursor: pointer;
  }
`;
